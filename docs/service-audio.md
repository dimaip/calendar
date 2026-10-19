# Service recordings

`app/domain/serviceRecordings.ts` is the recording catalog. Service definitions reference it for list badges and playback. Audio lives in the existing Yandex bucket under content-versioned `audio/services/` URLs. It streams on demand and is not included in application precaching. Matching timing files load separately from `app/data/serviceAudio/`.

## Reading and listening

Audio mode is off when a service opens, including after reload with a saved listening position. The toolbar headphones and the banner at the beginning of the service both open the compact player without starting playback. The banner disappears while audio mode is active.

The compact player's chevron expands to the full player for scrubbing, speed, and 15-second skips. Both views have an **×** exit button; the full player also has a collapse button and “Вернуться к тексту”. Collapsing keeps playback running. Exiting stops playback, clears word highlighting and text following, hides both player views, and releases the audio element and listeners. The banner returns, and the saved position and chosen speed are available when reopening. Audio files and timing data are not requested before entering audio mode. Leaving the service also pauses and saves progress per recording URL.

Playback highlights the current Russian word using the media element's actual clock, including after seeking and speed changes. CSS Custom Highlight ranges preserve the rendered text and selection; older browsers use a pointer-transparent overlay. Starting or resuming playback brings the spoken word into view. The reader then advances line by line, keeping the spoken line near the upper third of the reading area above the compact player. Manual scrolling suspends following without pausing or seeking. The compact player then offers:

- **Слушать отсюда**: seek to the first visible timed word below the header and start playback, even if previously paused.
- **← К аудио**: return to the spoken position and follow it again without changing play/pause state. This action appears only after scrolling away; there is no separate return button in the main player row.

Text missing from the recording has no seek target and displays “Этот фрагмент не входит в запись”. Чин приготовления starts at its canon; the earlier prayers and psalms shown in the app are absent. Calendar-dependent passages can also differ. Only matching Russian paragraphs receive timings; another text language offers a switch to Russian. Repeated refrains are matched by their occurrence in reading order.

## Generate timings locally

Use Python 3.11 and ffmpeg, start the app with `yarn start`, then install tools in an isolated environment:

```sh
python3.11 -m venv /tmp/service-audio-tools
/tmp/service-audio-tools/bin/pip install -r scripts/service-audio-requirements.txt
/tmp/service-audio-tools/bin/python -m playwright install chromium
```

Capture the rendered Russian text and transcribe the original recording:

```sh
/tmp/service-audio-tools/bin/python scripts/annotate-service-audio.py \
  --service pokajanni --date 2026-10-18 \
  --audio '/path/to/recordings/Покаянный канон.MP3' \
  --output output/service-audio/pokajanni.draft.json
```

For the other recording use `--service chinPrigotovlenija` and its audio path. `--base-url` defaults to `http://localhost:3000`. `--max-seconds 60` limits an experiment; omit it for a complete recording. `--reference-only` captures text without speech dependencies. `--reference` and `--transcript` reuse earlier output instead of running recognition again.

The first stage writes `*.reference.json`, `*.draft.transcript.json`, and `*.draft.json`. The draft contains approximate paragraph matches, coverage, omissions, and review reasons. Segment-only transcripts are rejected: word times must come from audio rather than interpolation. Text capture uses `#service-text`, waits for lazy content, records headings as section labels, and preserves repeated paragraphs. Random table-of-contents IDs are not used.

The second stage aligns canonical words against the audio waveform. Install the alignment dependencies and the aligner without its unrelated diarization extras:

```sh
/tmp/service-audio-tools/bin/pip install -r scripts/service-audio-alignment-requirements.txt
/tmp/service-audio-tools/bin/pip install --no-deps whisperx==3.8.6
HF_HUB_DISABLE_XET=1 /tmp/service-audio-tools/bin/python scripts/align-service-words.py \
  --reference output/service-audio/pokajanni.reference.json \
  --transcript output/service-audio/pokajanni.draft.transcript.json \
  --audio '/path/to/recordings/Покаянный канон.MP3' \
  --device cpu --output output/service-audio/pokajanni.words.json
```

Use `--device mps` on a compatible Mac or `--device cuda` on a compatible GPU. Processing runs locally; initial runs download recognition/alignment weights. `--anchors-only` inspects candidate acoustic windows without loading the aligner. Spelling-tolerant monotonic transcript anchors locate recorded paragraphs. Acoustic windows include neighbouring words to improve boundaries. Missing, weak, invalid, or conflicting matches are omitted; timestamps are never linearly distributed over a paragraph.

Version 2 output contains the original audio SHA-256, service ID, canonical paragraph text, and word indices with start/end seconds and acoustic scores. Empty word arrays indicate unrecorded or unaligned paragraphs. A replacement recording requires new annotations. The script writes progress checkpoints; only publish the output after a complete successful run. Sample or interrupted output must not replace published timings.

Review the generated timings by listening while following the text, particularly repeated refrains, chunk boundaries, omissions, and date-specific content. Automatic alignment remains approximate and can need corrections. After review, copy the complete files to `app/data/serviceAudio/{serviceId}.json` and connect them in the recording catalog. The currently checked-in files were generated from the two original recordings, with uncertain words omitted.

## Checks

```sh
node_modules/.bin/tsx --test app/domain/serviceRecordings.test.mjs app/domain/serviceAudioTimings.test.mjs
python3 scripts/annotate-service-audio.test.py
/tmp/service-audio-tools/bin/python scripts/align-service-words.test.py
```

Annotation tests need only the standard library; alignment tests also need rapidfuzz. Frontend tests check normalization/DOM offsets, seeking and silent gaps, storage behavior, canonical word indices, and monotonic published timings.
