#!/usr/bin/env python3
"""Align canonical service words to a recording using transcript anchors and acoustic alignment."""

import argparse
from collections import Counter
from difflib import SequenceMatcher
from functools import lru_cache
import hashlib
import importlib.util
import json
import math
from pathlib import Path
import sys

spec = importlib.util.spec_from_file_location("annotation", Path(__file__).with_name("annotate-service-audio.py"))
annotation = importlib.util.module_from_spec(spec)
spec.loader.exec_module(annotation)


def match_words(reference, spoken):
    """Extend exact monotonic anchors with spelling-tolerant alignment inside bounded gaps."""
    from rapidfuzz.distance import Levenshtein

    @lru_cache(maxsize=100000)
    def similarity(a, b):
        return Levenshtein.normalized_similarity(a, b)

    anchors = SequenceMatcher(None, reference, spoken, autojunk=False).get_matching_blocks()
    mapping = {}
    previous_reference = previous_spoken = 0
    for anchor in anchors:
        a = reference[previous_reference:anchor.a]
        b = spoken[previous_spoken:anchor.b]
        if a and b and max(len(a), len(b)) <= 300:
            costs = [[0.0] * (len(b) + 1) for _ in range(len(a) + 1)]
            steps = {}
            for i in range(len(a) + 1):
                costs[i][0] = i * 0.9
            for j in range(len(b) + 1):
                costs[0][j] = j * 0.9
            for i in range(1, len(a) + 1):
                for j in range(1, len(b) + 1):
                    score = similarity(a[i - 1], b[j - 1])
                    options = [(costs[i - 1][j] + 0.9, 1, 0, 0),
                               (costs[i][j - 1] + 0.9, 0, 1, 0),
                               (costs[i - 1][j - 1] + (1 - score if score >= 0.45 else 1.7), 1, 1, score)]
                    if i >= 2:
                        score = similarity(a[i - 2] + a[i - 1], b[j - 1])
                        if score >= 0.55:
                            options.append((costs[i - 2][j - 1] + 1 - score + 0.2, 2, 1, score))
                    if j >= 2:
                        score = similarity(a[i - 1], b[j - 2] + b[j - 1])
                        if score >= 0.55:
                            options.append((costs[i - 1][j - 2] + 1 - score + 0.2, 1, 2, score))
                    cost, di, dj, score = min(options)
                    costs[i][j] = cost
                    steps[(i, j)] = (di, dj, score)
            i, j = len(a), len(b)
            while i > 0 and j > 0:
                di, dj, score = steps[(i, j)]
                if di and dj and score >= 0.45:
                    for offset in range(di):
                        mapping[previous_reference + i - di + offset] = previous_spoken + j - dj
                i -= di
                j -= dj
        for offset in range(anchor.size):
            mapping[anchor.a + offset] = anchor.b + offset
        previous_reference = anchor.a + anchor.size
        previous_spoken = anchor.b + anchor.size
    return mapping


def alignment_chunks(reference, transcript):
    blocks = reference["blocks"]
    tokens_by_block = [annotation.normalize(block["text"]) for block in blocks]
    tokens = [word for block in tokens_by_block for word in block]
    spoken = annotation.timed_words(transcript)
    mapping = match_words(tokens, [word["token"] for word in spoken])
    chunks = []
    cursor = 0
    for block_index, block_tokens in enumerate(tokens_by_block):
        matched = [mapping[index] for index in range(cursor, cursor + len(block_tokens)) if index in mapping]
        coverage = len(matched) / len(block_tokens) if block_tokens else 0
        if coverage >= 0.45 and matched:
            for local_start in range(0, len(block_tokens), 24):
                local_end = min(local_start + 24, len(block_tokens))
                matches = [(index, mapping[index]) for index in range(cursor + local_start, cursor + local_end) if index in mapping]
                if len(matches) < max(1, (local_end - local_start) * 0.3):
                    continue
                # Include neighbouring spoken words so the first/last word is not
                # forced onto a crop boundary. Emit only the original core words.
                context_start, context_end = cursor + local_start, cursor + local_end
                for _ in range(4):
                    candidate = context_start - 1
                    if candidate not in mapping or spoken[matches[0][1]]["start"] - spoken[mapping[candidate]]["end"] > 4:
                        break
                    context_start = candidate
                for _ in range(4):
                    if context_end not in mapping or spoken[mapping[context_end]]["start"] - spoken[matches[-1][1]]["end"] > 4:
                        break
                    context_end += 1
                matches = [(index, mapping[index]) for index in range(context_start, context_end) if index in mapping]
                first_index, first_spoken = matches[0]
                last_index, last_spoken = matches[-1]
                first = spoken[first_spoken]["start"]
                last = spoken[last_spoken]["end"]
                if last - first > max(35, len(matches) * 2):
                    continue
                left_margin = max(0.6, (first_index - context_start) * 0.5 + 0.4)
                right_margin = max(0.6, (context_end - last_index - 1) * 0.5 + 0.4)
                chunks.append({"block": block_index, "offset": local_start,
                               "leftContext": cursor + local_start - context_start,
                               "coreLength": local_end - local_start,
                               "text": " ".join(tokens[context_start:context_end]),
                               "start": max(0, first - left_margin), "end": last + right_margin})
        cursor += len(block_tokens)
    return chunks


def remove_conflicting_words(blocks):
    """Keep canonical reading order, dropping the weaker of conflicting acoustic matches."""
    ordered = []
    for block in blocks:
        for word in block["words"]:
            while ordered and word["start"] < ordered[-1][1]["end"]:
                if word["score"] <= ordered[-1][1]["score"]:
                    break
                ordered.pop()
            else:
                ordered.append((block, word))
    for block in blocks:
        block["words"] = []
    for block, word in ordered:
        block["words"].append(word)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--reference", required=True, type=Path)
    parser.add_argument("--transcript", required=True, type=Path)
    parser.add_argument("--audio", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--limit", type=int)
    parser.add_argument("--anchors-only", action="store_true")
    parser.add_argument("--device", default="cpu", choices=("cpu", "mps", "cuda"))
    args = parser.parse_args()
    reference = json.loads(args.reference.read_text())
    transcript = json.loads(args.transcript.read_text())
    chunks = alignment_chunks(reference, transcript)
    print(f"{len(chunks)} chunks across {len(set(chunk['block'] for chunk in chunks))}/{len(reference['blocks'])} paragraphs", flush=True)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    if args.anchors_only:
        args.output.write_text(json.dumps(chunks, ensure_ascii=False, indent=2) + "\n")
        return
    import torch
    from whisperx.alignment import align, load_align_model
    from whisperx.audio import load_audio

    torch.set_num_threads(4)
    model, metadata = load_align_model("ru", args.device)
    waveform = load_audio(str(args.audio))
    output = {"version": 2, "language": "ru", "serviceId": reference["serviceId"],
              "audioSha256": hashlib.sha256(args.audio.read_bytes()).hexdigest(),
              "blocks": [{"text": block["text"], "section": block["section"], "words": []} for block in reference["blocks"]]}
    for number, chunk in enumerate(chunks[:args.limit] if args.limit else chunks):
        result = align([chunk], model, metadata, waveform, args.device, return_char_alignments=False)
        words = result["word_segments"]
        if len(words) != len(chunk["text"].split()):
            print(f"Skipping inconsistent word count in chunk {number}", flush=True)
            continue
        accepted = []
        for index, word in enumerate(words):
            core_index = index - chunk["leftContext"]
            if not 0 <= core_index < chunk["coreLength"]:
                continue
            start, end, score = word.get("start"), word.get("end"), word.get("score", 0)
            if start is None or end is None or not math.isfinite(start) or not math.isfinite(end):
                continue
            if score < 0.03 or end <= start or end - start > 4:
                continue
            accepted.append({"index": chunk["offset"] + core_index, "start": round(start, 3), "end": round(end, 3), "score": round(score, 3)})
        output["blocks"][chunk["block"]]["words"].extend(accepted)
        args.output.write_text(json.dumps(output, ensure_ascii=False, separators=(",", ":")) + "\n")
        print(f"Aligned {number + 1}/{len(chunks)}: {len(accepted)}/{len(words)} words, {chunk['start']:.1f}–{chunk['end']:.1f}s", flush=True)
    remove_conflicting_words(output["blocks"])
    args.output.write_text(json.dumps(output, ensure_ascii=False, separators=(",", ":")) + "\n")
    counts = Counter(bool(block["words"]) for block in output["blocks"])
    print(f"Aligned {sum(len(block['words']) for block in output['blocks'])} words in {counts[True]} paragraphs", flush=True)


if __name__ == "__main__":
    main()
