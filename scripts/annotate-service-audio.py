#!/usr/bin/env python3
"""Create reviewable paragraph timestamps from a rendered service and recorded audio."""

import argparse
from collections import Counter
from datetime import datetime
from difflib import SequenceMatcher
import hashlib
import json
import math
from pathlib import Path
import re
import sys
import unicodedata


SERVICES = ("pokajanni", "chinPrigotovlenija")
CAPTURE_BLOCKS = """() => {
    const root = document.getElementById('service-text');
    let section = '';
    return Array.from(root.querySelectorAll('h1,h2,h3,h4,p')).flatMap(element => {
        if (!element.getClientRects().length) return [];
        const text = element.innerText.replace(/\\s+/g, ' ').trim();
        if (/^H[1-4]$/.test(element.tagName)) { section = text; return []; }
        return text ? [{ section, text }] : [];
    });
}"""


def normalize(text):
    text = unicodedata.normalize("NFD", text.lower().replace("ё", "е"))
    text = unicodedata.normalize("NFC", text.replace("\u0301", ""))
    text = re.sub(r"\([^)]*\)", " ", text)
    text = re.sub(r"^\s*припев\s*", "", text)
    return re.findall(r"[а-яa-z0-9]+", text)


def reference_blocks(paragraphs, service_id):
    occurrences = Counter()
    blocks = []
    for paragraph in paragraphs:
        tokens = normalize(paragraph["text"])
        if not tokens:
            continue
        digest = hashlib.sha256(" ".join(tokens).encode()).hexdigest()[:16]
        occurrences[digest] += 1
        blocks.append({
            "id": f"{service_id}:{digest}:{occurrences[digest]}",
            "section": paragraph.get("section", ""),
            "text": paragraph["text"],
        })
    return blocks


def capture_reference(service_id, base_url, selected_date):
    try:
        from playwright.sync_api import sync_playwright
    except ImportError as error:
        raise ValueError("Install playwright, or supply a previously exported --reference JSON.") from error
    url = f"{base_url.rstrip('/')}/#/date/{selected_date}/service/{service_id}"
    with sync_playwright() as runtime:
        browser = runtime.chromium.launch()
        try:
            page = browser.new_page()
            page.goto(url, wait_until="domcontentloaded")
            page.wait_for_function("""() => {
                const root = document.getElementById('service-text');
                return root && root.querySelectorAll('p').length > 0 && !root.querySelector('animateTransform');
            }""", timeout=120000)
            # Two identical snapshots after the main Suspense boundary resolves avoid partial lazy text.
            paragraphs = page.evaluate(CAPTURE_BLOCKS)
            for _ in range(10):
                page.wait_for_timeout(500)
                next_paragraphs = page.evaluate(CAPTURE_BLOCKS)
                if next_paragraphs == paragraphs:
                    break
                paragraphs = next_paragraphs
            else:
                raise ValueError("Service text is still changing; capture a settled reference and retry.")
        finally:
            browser.close()
    if not paragraphs:
        raise ValueError("No rendered service paragraphs found.")
    return {
        "serviceId": service_id,
        "language": "ru",
        "date": selected_date,
        "url": url,
        "blocks": reference_blocks(paragraphs, service_id),
    }


def timed_words(transcript):
    words = transcript.get("word_segments")
    if words is None:
        words = [word for segment in transcript.get("segments", []) for word in segment.get("words", [])]
    result = []
    previous_start = -1
    for word in words:
        tokens = normalize(word.get("word", ""))
        if not tokens:
            continue
        start, end = word.get("start"), word.get("end")
        if start is None or end is None:
            continue
        if not isinstance(start, (int, float)) or not isinstance(end, (int, float)):
            raise ValueError("Transcript timestamps must be numbers.")
        if not math.isfinite(start) or not math.isfinite(end) or start < 0 or end < start or start < previous_start:
            raise ValueError("Transcript has invalid or non-monotonic timestamps.")
        previous_start = start
        # Do not invent individual timings if the recognizer grouped multiple tokens.
        result.extend({"token": token, "start": start, "end": end} for token in tokens)
    if not result:
        raise ValueError("Transcript has no word timestamps; provide word_segments or segments[].words.")
    return result


def annotate(reference, transcript, minimum_coverage=0.65):
    blocks = reference["blocks"]
    if not blocks or len({block["id"] for block in blocks}) != len(blocks):
        raise ValueError("Reference must contain nonempty blocks with unique IDs.")
    words = timed_words(transcript)
    tokens_by_block = [normalize(block["text"]) for block in blocks]
    reference_tokens = [token for tokens in tokens_by_block for token in tokens]
    matcher = SequenceMatcher(None, reference_tokens, [word["token"] for word in words], autojunk=False)
    matches = {}
    matched_audio_words = set()
    for match in matcher.get_matching_blocks():
        for offset in range(match.size):
            matches[match.a + offset] = match.b + offset
            matched_audio_words.add(match.b + offset)
    repeated = Counter(tuple(tokens) for tokens in tokens_by_block)
    annotations = []
    cursor = 0
    previous_end = 0
    for block, tokens in zip(blocks, tokens_by_block):
        indices = [matches[index] for index in range(cursor, cursor + len(tokens)) if index in matches]
        cursor += len(tokens)
        coverage = len(indices) / len(tokens) if tokens else 0
        reasons = []
        start = end = None
        if indices and coverage >= minimum_coverage:
            start, end = words[indices[0]]["start"], words[indices[-1]]["end"]
            if end - start > max(30, len(tokens) * 2.5):
                reasons.append("unusually-long-span")
            if start < previous_end:
                reasons.append("overlapping-boundary")
            previous_end = end
            if indices and (matches.get(cursor - len(tokens)) is None or matches.get(cursor - 1) is None):
                reasons.append("inexact-boundary")
        else:
            reasons.append("insufficient-match")
        if repeated[tuple(tokens)] > 1:
            reasons.append("repeated-passage")
        if 0 < coverage < 0.9:
            reasons.append("partial-match")
        annotations.append({**block, "start": start, "end": end, "coverage": round(coverage, 3), "reviewReasons": reasons})
    reference_json = json.dumps(reference, sort_keys=True, ensure_ascii=False).encode()
    return {
        "version": 1,
        "status": "draft",
        "serviceId": reference["serviceId"],
        "language": reference["language"],
        "date": reference.get("date"),
        "referenceSha256": hashlib.sha256(reference_json).hexdigest(),
        "reviewRequired": True,
        "matchedWordFraction": round(len(matched_audio_words) / len(words), 3),
        "unmatchedTranscriptWords": [word for index, word in enumerate(words) if index not in matched_audio_words],
        "blocks": annotations,
    }


def transcribe(audio_path, model_name, device, max_seconds):
    try:
        from faster_whisper import WhisperModel
    except ImportError as error:
        raise ValueError("Install faster-whisper, or supply --transcript with existing word timestamps.") from error
    model = WhisperModel(model_name, device=device, compute_type="int8" if device == "cpu" else "float16")
    options = {"language": "ru", "word_timestamps": True, "vad_filter": True, "beam_size": 5}
    if max_seconds is not None:
        options["clip_timestamps"] = [0, max_seconds]
    segments, info = model.transcribe(str(audio_path), **options)
    result = {"language": info.language, "segments": []}
    for segment in segments:
        result["segments"].append({
            "start": segment.start,
            "end": segment.end,
            "text": segment.text,
            "words": [{"word": word.word, "start": word.start, "end": word.end} for word in (segment.words or [])],
        })
        print(f"Transcribed through {segment.end:.1f}s", file=sys.stderr, flush=True)
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--service", required=True, choices=SERVICES)
    parser.add_argument("--audio", type=Path)
    parser.add_argument("--reference", type=Path, help="Reuse a rendered text snapshot instead of opening a browser")
    parser.add_argument("--transcript", type=Path, help="Reuse word timestamps, including aligned WhisperX JSON")
    parser.add_argument("--base-url", default="http://localhost:3000")
    parser.add_argument("--date", help="Date of the rendered text, YYYY-MM-DD; required when capturing")
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--reference-only", action="store_true")
    parser.add_argument("--model", default="small")
    parser.add_argument("--device", choices=("cpu", "cuda"), default="cpu")
    parser.add_argument("--max-seconds", type=float, help="Limit a first-pass experiment to the start of the audio")
    args = parser.parse_args()
    if not args.reference:
        if not args.date:
            parser.error("--date is required when capturing a reference")
        datetime.strptime(args.date, "%Y-%m-%d")
    if not args.reference_only and (not args.audio or not args.audio.is_file()):
        parser.error("--audio must be an existing recording file")
    if args.max_seconds is not None and (not math.isfinite(args.max_seconds) or args.max_seconds <= 0):
        parser.error("--max-seconds must be a positive finite number")
    reference = json.loads(args.reference.read_text()) if args.reference else capture_reference(args.service, args.base_url, args.date)
    if reference.get("serviceId") != args.service or reference.get("language") != "ru":
        parser.error("Reference must match the service and Russian language")
    args.output.parent.mkdir(parents=True, exist_ok=True)
    if args.reference_only:
        args.output.write_text(json.dumps(reference, ensure_ascii=False, indent=2) + "\n")
        print(f"Exported {len(reference['blocks'])} paragraphs to {args.output}")
        return
    reference_path = args.output.with_suffix(".reference.json")
    reference_path.write_text(json.dumps(reference, ensure_ascii=False, indent=2) + "\n")
    transcript = json.loads(args.transcript.read_text()) if args.transcript else transcribe(args.audio, args.model, args.device, args.max_seconds)
    if transcript.get("language", "ru") != "ru":
        parser.error("Transcript language must be Russian")
    transcript_path = args.output.with_suffix(".transcript.json")
    transcript_path.write_text(json.dumps(transcript, ensure_ascii=False, indent=2) + "\n")
    result = annotate(reference, transcript)
    digest = hashlib.sha256()
    with args.audio.open("rb") as audio:
        for chunk in iter(lambda: audio.read(1024 * 1024), b""):
            digest.update(chunk)
    result["audioSha256"] = digest.hexdigest()
    result["sampleSeconds"] = args.max_seconds
    args.output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
    matched = sum(block["start"] is not None for block in result["blocks"])
    print(f"Draft: {matched}/{len(result['blocks'])} paragraphs have timestamps. Review required: {args.output}")


if __name__ == "__main__":
    try:
        main()
    except (ValueError, OSError) as error:
        sys.exit(str(error))
