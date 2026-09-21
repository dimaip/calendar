# Static asset performance report

Date: 2026-07-28

Scope: PERF-005's safe, lossless static-asset slice. This work changes only files under `www/assets/`. It does not change asset names, source references, app code, build configuration, service-worker source, or native/TWA copies.

## Result

- The 17 changed assets decreased from 2,303,722 bytes to 2,215,696 bytes: **88,026 bytes saved (3.82%)**.
- The complete tracked `www/assets/` directory decreased from 3,435,996 bytes to 3,347,970 bytes: **2.56% smaller**.
- A level-9 gzip comparison of the changed files decreased from 1,255,334 bytes to 1,221,036 bytes: **34,298 bytes saved**. This is a comparison aid, not a claim about a particular CDN's compression settings.
- No asset filename, SVG `viewBox`, explicit SVG width/height, PNG/JPEG dimensions, or decoded raster pixels changed.

## Changed assets

| File | Before | After | Saved | Change |
| --- | ---: | ---: | ---: | ---: |
| `www/assets/books.svg` | 117,862 B | 117,334 B | 528 B | 0.45% |
| `www/assets/icons/annunciation.svg` | 71,034 B | 70,297 B | 737 B | 1.04% |
| `www/assets/icons/ascension.svg` | 114,147 B | 104,622 B | 9,525 B | 8.34% |
| `www/assets/icons/baptism.svg` | 91,825 B | 90,776 B | 1,049 B | 1.14% |
| `www/assets/icons/baptist.png` | 281,664 B | 275,898 B | 5,766 B | 2.05% |
| `www/assets/icons/christmas.svg` | 80,699 B | 78,201 B | 2,498 B | 3.10% |
| `www/assets/icons/exile.svg` | 400,983 B | 379,952 B | 21,031 B | 5.24% |
| `www/assets/icons/greatLent.jpg` | 80,203 B | 78,991 B | 1,212 B | 1.51% |
| `www/assets/icons/krestovozdvizhenie.svg` | 78,534 B | 75,518 B | 3,016 B | 3.84% |
| `www/assets/icons/lestvichnik.svg` | 86,079 B | 79,852 B | 6,227 B | 7.23% |
| `www/assets/icons/mathew.svg` | 84,174 B | 76,332 B | 7,842 B | 9.32% |
| `www/assets/icons/oct30.svg` | 71,749 B | 70,014 B | 1,735 B | 2.42% |
| `www/assets/icons/passionTuesday.svg` | 89,229 B | 84,599 B | 4,630 B | 5.19% |
| `www/assets/icons/samar.svg` | 71,979 B | 67,105 B | 4,874 B | 6.77% |
| `www/assets/icons/transfiguration.png` | 323,256 B | 313,010 B | 10,246 B | 3.17% |
| `www/assets/icons/triumph.svg` | 98,844 B | 93,589 B | 5,255 B | 5.32% |
| `www/assets/peace.svg` | 161,461 B | 159,606 B | 1,855 B | 1.15% |

## Method

- The 15 largest SVG candidates were processed with SVGO 4.0.0 in multipass mode. `www/assets/icons/circumcision.svg` grew by 123 bytes, so that result was reverted; the remaining 14 optimized SVGs are listed above.
- The two PNG files were re-encoded with Pillow 12.1.0 using PNG optimization and compression level 9. Their ICC profiles and DPI metadata were retained. Editor XMP metadata was removed.
- The JPEG was losslessly Huffman-optimized with `jpegtran -copy none -optimize`. Editor/application metadata was removed.
- Raster re-encoding did not resize, resample, change color mode, or alter decoded pixels.

## Validation

All validation passed:

- `xmllint --noout` accepted every changed SVG.
- Each optimized SVG was parsed with `lxml`; its root `viewBox`, `width`, and `height` were compared with the version at `HEAD`.
- Every local `url(#id)` and `href="#id"` reference in each optimized SVG resolves to an ID in that document.
- Quick Look rendered the original and optimized versions of all 14 SVGs at 750 pixels; Pillow reported pixel-identical RGBA previews.
- Pillow decoded the original and optimized PNG/JPEG files with identical dimensions, color modes, and pixel data.
- `yarn build` completed successfully. Webpack retained its existing bundle-size warnings and reported 1,865 precache URLs totaling 8.05 MB.

## Font audit

The project contains two fonts:

| File | Bytes | Use |
| --- | ---: | --- |
| `app/assets/fonts/PTRootUI_Bold.woff2` | 52,488 B | Declared as weight 700 in `app/styles/reset.css` |
| `app/assets/fonts/PTRootUI_Regular.woff2` | 51,708 B | Declared as weight 400 in `app/styles/reset.css` |

Both are already WOFF2, both declared weights are used, and there are no duplicate font files under `www/assets/`. They were left unchanged because font binaries are outside this slice and further subsetting would need a typography/glyph-coverage review.

## Intentionally deferred

- SVGs below the initial top-15 size cutoff. They can be processed later with the same render-comparison gate, but their individual savings are expected to be smaller.
- Lossy raster conversion or resizing. AVIF/WebP variants could save more, but require responsive source changes and visual-quality approval.
- Font subsetting and `unicode-range` splitting.
- Public source-map deployment policy and monitoring upload flow; these belong to build and monitoring configuration.
- CDN cache headers and native/web asset deduplication; these are outside `www/assets/` and the current frontend-only safe slice.
