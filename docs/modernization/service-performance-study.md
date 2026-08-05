# Full-service performance study

Date: 2026-07-28

Status: Implemented and verified locally; production deployment validation pending

Route: `/#/date/2026-07-28/service/Литургия`

Scope: frontend runtime, generated assets, static delivery, and offline-safe chunking. PHP, service-worker source and behavior, offline storage semantics, Capacitor, and TWA are unchanged.

Machine-readable results: [service-performance-report.json](./service-performance-report.json)

Compact post-implementation results:
[service-performance-implementation-summary.json](./service-performance-implementation-summary.json)

## Post-implementation result

All low- and medium-risk units were implemented. A narrowly scoped MDX
chunking prototype was retained only after it passed the explicit performance
gate; whole-corpus and progressive-render approaches were rejected.

On the three-run older-phone profile with production-like gzip:

| Metric                  | Ungrouped current code | Coherent liturgy chunks |       Delta |
| ----------------------- | ---------------------: | ----------------------: | ----------: |
| Complete service commit |            6,015.70 ms |             4,156.80 ms | **−30.90%** |
| TOC ready               |            6,523.30 ms |             4,662.80 ms | **−28.52%** |
| Service settled         |            7,576.70 ms |             5,718.40 ms | **−24.53%** |
| JavaScript transfer     |              605,386 B |               543,712 B | **−10.19%** |
| Total Blocking Time     |                 123 ms |                  110 ms | **−10.57%** |
| CDP task duration       |            2,188.22 ms |               869.58 ms | **−60.26%** |
| CDP script duration     |            1,609.21 ms |               540.97 ms | **−66.38%** |

The content gate remained exact: 67 deterministic TOC entries, shape hash
`e063017a`, 568 paragraphs, 2,274 DOM nodes, and 55,128 px document height.

The combined result relative to the original observed delivery is:

- original `origin/master` complete service: 14.09 s;
- pre-implementation modernization branch: 12.31 s;
- implemented branch with production-like gzip: 4.16 s complete / 5.72 s settled.

This combined comparison includes static-delivery compression. The controlled
chunk-only comparison above uses identical gzip delivery on both sides.

### What was implemented

- Brotli/gzip dynamic compression for the Node server and a gzip static deploy
  path, with immutable caching for hashed assets and revalidation for the shell
  and version metadata.
- Lazy date routes, service intent preloading, and lazy settings, overflow,
  search, and editor controls.
- In-flight/resolved/rejected MDX resource caching.
- One MDX runtime subscription boundary, one audio observer, and no inactive
  height/editor work.
- A service-local TOC registry with deterministic collision-safe IDs, rAF
  batching, and one diff-updated `IntersectionObserver`.
- Bulk-reading request planning, historical-date freshness, and skipped
  habit-tracker subscriptions for irrelevant services.
- Four measured `lazy-once` groups: Katekhumen and Vernie, independently for
  Russian and Church Slavonic. The generic MDX context excludes those files,
  avoiding duplicate chunks.
- Deferred field Web Vitals plus `service_complete_commit`,
  `service_toc_ready`, and `service_settled` reporting.
- A version 3 benchmark with cold/reload, warm/hot, language, parallel, TOC,
  scroll, search, and retention scenarios.

### Offline and interaction result

Workbox now precaches 1,555 URLs / 7.66 MB rather than 1,874 URLs / 7.77 MB.
All four coherent MDX chunks are in the generated manifest and remain well
below Workbox's per-file size ceiling.

Installed/offline browser QA passed:

- reload of an installed lazy route;
- loading optional search controls offline;
- opening the full Zlatoust service without a prior visit;
- switching offline to Church Slavonic and parallel mode;
- zero failed content-hashed `/built/` requests.

The measured older-phone parallel transition completed in 121.6 ms, reached
TOC readiness in 848.4 ms, and had a 150 ms longest task. Progressive
below-fold/parallel rendering was therefore not retained: it would add
find-in-page, print, anchor, and layout risk while mostly moving work beyond
the completion marker.

## Pre-implementation audit finding (historical)

Before this implementation pass, the modernization branch was materially faster
than `origin/master`, but its absolute cold-load time on the older-phone profile
remained too high:

- Complete liturgy: **14.09 s → 12.31 s**, 12.61% faster.
- LCP: **10.79 s → 9.02 s**, 16.41% faster.
- JavaScript transferred during the route: **2.29 MB → 1.94 MB**, 15.00% lower.
- Long-task time: **404 ms → 212 ms**, 47.46% lower.
- FCP: **0.83 s → 0.84 s**, effectively unchanged.

Under the throttled network, most of the wall-time improvement is in
application startup. From DOM content loaded to the complete service commit:

- `origin/master`: 3.48 s
- current: 3.45 s

That interval improved by less than 1%. A separate 6× CPU/unthrottled-network
probe did find a 26.18% faster complete commit and 26.70% less script time on
the current branch. The current code is doing less CPU work, but the gain is
largely hidden by delivery and the many route-level chunk requests on a
constrained connection. The next phase should therefore address delivery
compression first, then MDX loading, repeated per-fragment work, TOC layout
work, and parallel-mode cost.

## What “fast” means for this application

Web Vitals alone do not describe a 55,000 px service document. The performance contract needs application-specific milestones as well.

### User-visible milestones

| Metric                  | Definition                                                                                              | Why it matters                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| TTFB                    | Navigation start to first response byte                                                                 | Separates static delivery from browser work      |
| FCP                     | Browser First Contentful Paint                                                                          | First visual feedback                            |
| Shell ready             | Header mounted and initial full-screen loader gone                                                      | Navigation becomes understandable                |
| Complete service commit | The expected liturgy H1 is visible; the outer MDX render has committed                                  | The complete primary service view is present     |
| TOC ready               | At least 65 entries are present, then TOC count and document height are stable for three 250 ms samples | Long-document navigation is reliable             |
| Service settled         | TOC ready, no relevant request pending, and no DOM mutation for 750 ms                                  | Post-render work has stopped disturbing the page |
| LCP / CLS               | Standard browser metrics before the first interaction                                                   | Loading and visual-stability guardrails          |

Generic `networkidle` is not a valid readiness condition. Background prefetch and offline-related activity are allowed to continue independently of the service becoming usable.

### Main-thread and rendering metrics

- Total Blocking Time, long-task count, total long-task duration, and longest task.
- CDP task, script, layout, and style-recalculation duration.
- Layout and style-recalculation counts.
- DOM node, paragraph, heading, and TOC-entry counts.
- Used JavaScript heap after Russian, Church Slavonic, and parallel rendering.
- Document height and text size, so an apparent speed-up cannot be obtained by accidentally omitting content.

### Network and build metrics

- Initial JavaScript raw and gzip/Brotli bytes.
- JavaScript loaded by the service route, request count, transferred bytes, and decoded bytes.
- CSS, font, image, and API totals by resource type.
- Compression response header and compression ratio.
- Immutable-cache response header for content-hashed assets.
- Complete Workbox precache entry count and bytes as a preservation check, not an optimization target in this phase.

### Interaction metrics

- Russian → Church Slavonic: click to content commit and click to settled.
- Single language → parallel: click to two-column commit and settled.
- TOC selection: click to target centered and stable for two animation frames.
- Fixed-distance service scroll: frame intervals, frames over 50 ms, long tasks, and peak heap.
- In-page search: input to next paint for a common multi-match term.
- Twenty-service navigation loop: retained heap and listener/observer growth.

Lab interaction timings are controlled proxies. Real-user INP must be collected separately.

## Test profiles

| Profile             | Browser state                                             |           CPU | Network                                | Purpose                                           |
| ------------------- | --------------------------------------------------------- | ------------: | -------------------------------------- | ------------------------------------------------- |
| Cold older phone    | New context, cache disabled, service worker blocked       |   4× slowdown | 150 ms RTT, 1.6 Mbps down, 750 Kbps up | Primary release comparison                        |
| Warm SPA navigation | Shell and day data loaded; target service not yet visited |            4× | Same, cache enabled                    | Normal in-app entry                               |
| Hot revisit         | Target already loaded once in the same document           |            4× | Same, cache enabled                    | Repeated use                                      |
| CPU isolation       | New context                                               |   6× slowdown | Unthrottled local                      | Separate parse/evaluate/render cost from transfer |
| Stress phone        | New context                                               |   6× slowdown | Same                                   | Diagnostic for older hardware                     |
| Desktop control     | New context                                               |            1× | Unthrottled                            | Harness/build anomaly detection                   |
| Installed/offline   | Service-worker-controlled installed app                   | Device-native | Offline                                | Separate pass/fail preservation suite             |

The primary lab context is 360×640 at DPR 2, touch/mobile enabled, a fixed Android user agent, `ru-RU`, and `Europe/Moscow`.

Going forward, release comparisons should use three discarded warm-ups and twenty measured runs per revision, alternating revisions in ABBA order. Report median, p75, median absolute deviation, and a bootstrap 95% confidence interval. Do not delete statistical outliers; rerun only documented harness failures.

## Measurement method

Two clean production builds were compared:

- Original: `6a94bde3ffbcd8ce4439cf73d30ef2e197d42e0f` (`origin/master`)
- Current: `2f40aab3`

The primary comparison used six independent cold runs per revision in Chromium 151. The day/API responses were replayed deterministically, analytics and unrelated external traffic were blocked, and service workers were blocked. The same machine, browser, route, viewport, CPU throttle, and network profile were used for both revisions.

An extended two-run-per-revision network probe also measured TOC settlement,
CDP main-thread work, language changes, and parallel mode. A three-run
CPU-isolation probe repeated the same content at 6× CPU with an unthrottled
local network. Treat both interaction sets as exploratory until the full
repetition protocol is run.

## Results

### Primary six-run cold comparison

Values are medians.

| Metric                   | `origin/master` |      Current |       Delta |
| ------------------------ | --------------: | -----------: | ----------: |
| Complete service heading |    14,088.54 ms | 12,312.02 ms | **−12.61%** |
| DOM content loaded       |    10,609.80 ms |  8,865.55 ms | **−16.44%** |
| Load event               |    10,732.25 ms |  8,969.60 ms | **−16.42%** |
| FCP                      |          834 ms |       838 ms |      +0.48% |
| LCP                      |       10,788 ms |     9,018 ms | **−16.41%** |
| Local transfer           |     2,504,035 B |  2,150,701 B | **−14.11%** |
| JavaScript transfer      |     2,286,917 B |  1,943,882 B | **−15.00%** |
| Long-task time           |        403.5 ms |       212 ms | **−47.46%** |
| DOM nodes                |           2,319 |        2,318 |     neutral |

The result is unusually stable across the six cold runs: the current complete-service measurements ranged from 12.303 s to 12.322 s, while the original ranged from 14.075 s to 14.142 s.

### Extended full-service probe

Values are exploratory medians from two runs per revision.

| Metric                        | `origin/master` |      Current |                           Delta |
| ----------------------------- | --------------: | -----------: | ------------------------------: |
| Complete service commit       |       14,450 ms | 12,638.75 ms |                     **−12.53%** |
| Service and TOC settled       |    16,303.75 ms | 14,564.40 ms |                     **−10.67%** |
| Total Blocking Time           |          389 ms |       201 ms |                     **−48.33%** |
| Longest task                  |          306 ms |     150.5 ms |                     **−50.82%** |
| CDP task duration             |     3,115.88 ms |  2,915.83 ms |                          −6.42% |
| CDP script duration           |     2,378.96 ms |  2,197.12 ms |                          −7.64% |
| CDP layout duration           |        89.24 ms |     89.62 ms |                         neutral |
| Parallel switch task duration |       584.46 ms |    636.62 ms | **+8.93% candidate regression** |

The parallel result needs more repetitions before it is treated as a regression gate.

### CPU-isolation probe

Values are exploratory medians from three runs per revision at 6× CPU and an
unthrottled local network.

| Metric                  | `origin/master` |     Current |       Delta |
| ----------------------- | --------------: | ----------: | ----------: |
| Complete service commit |     1,672.90 ms | 1,235.00 ms | **−26.18%** |
| Service and TOC settled |     3,464.00 ms | 3,141.40 ms |  **−9.31%** |
| Total Blocking Time     |          827 ms |      426 ms | **−48.49%** |
| CDP script duration     |     1,411.02 ms | 1,034.31 ms | **−26.70%** |
| CDP layout duration     |       134.04 ms |   136.71 ms |      +1.99% |
| Church Slavonic settled |     2,516.60 ms | 1,973.70 ms | **−21.57%** |
| Parallel settled        |     2,072.00 ms | 1,805.20 ms | **−12.88%** |

This probe confirms that current JavaScript parse/evaluate/render work
improved. Settlement is confirmed roughly 1.9 seconds after the current
complete commit; 1.5 seconds of that interval is the benchmark's intentional
stability and quiet-window observation. Trace-level TOC instrumentation is
needed to isolate the actual post-commit work within that window.

### Rendered document shape

The original Russian-service baseline rendered:

- 2,326 DOM elements
- 568 paragraphs
- 70 H1/H2/H3 headings
- 66–67 TOC entries were observed
- 52,178 visible-text characters
- 55,128 px document height at 360 px viewport width

Parallel mode grows to 4,102 DOM elements and 1,153 paragraphs: **76.35% more DOM elements** than the Russian view. This makes parallel mode the most useful memory, layout, and scrolling stress case.

The original TOC count exposed a correctness bug. Heading IDs included a random
number from a range of only 100 values, so repeated titles could collide and
overwrite a `window.TOC` entry; 66 and 67 entries were both observed for
identical content. PERF-011 replaced that global with a scoped registry and
deterministic, collision-safe IDs. The post-implementation fixture consistently
contains 67 entries.

### Bundle and static-delivery findings

| Metric                  | `origin/master` |     Current |               Delta |
| ----------------------- | --------------: | ----------: | ------------------: |
| Initial JavaScript raw  |     1,999,984 B | 1,673,491 B |          −326,493 B |
| Initial JavaScript gzip |       540,455 B |   483,321 B | −57,134 B / −10.57% |

The production response inspected on 2026-07-28 served the 1,389,939-byte vendor script:

- without `Content-Encoding: gzip` or `br`;
- without an explicit `Cache-Control` header.

The local comparison intentionally matched that observed uncompressed delivery. Current initial JavaScript is 1.67 MB raw but 483 KB gzip, so enabling compression has substantially more transfer potential than another small source-level bundle reduction. Exact time savings must be measured after the delivery change rather than estimated.

Content-hashed `/built/*` files should receive `Cache-Control: public, max-age=31536000, immutable`; HTML and version metadata should remain revalidation-friendly. This is static-delivery work, not PHP or service-worker work.

## Source-level bottleneck map

This section records the pre-implementation diagnosis. The post-implementation
section above records which hypotheses were confirmed and addressed.

The date resolves to the normal Zlatoust liturgy:

`DateRoutes → Service → Zlatoust/index.dyn.tsx → Zlatoust.tsx → Zlatoust.mdx → Katekhumen + Vernie`

Static indicators:

- 1,813 MDX files under the service content tree.
- 1,751 language-specific `ru.mdx`/`csj.mdx` files in the dynamic import context.
- 68 direct `MdxLoader` instances in the Zlatoust and catechumen templates before nested fragments.
- At least six observers of the same `useDay(date)` query on this route.

### Ranked hypotheses

1. **Static delivery is uncompressed and lacks immutable caching.** This dominates a throttled first visit and is the first item to fix.
2. **MDX import/Suspense fan-out.** Every fragment starts a dynamic context import. `MdxLoader` caches only the resolved component, not the in-flight promise or a stable failure, so React can retry the same import work.
3. **Repeated per-fragment subscriptions and effects.** Each loader subscribes to theme, language, service, editor, script-version, and disabled-prayer state. Each MDX wrapper also runs audio augmentation.
4. **TOC forced-layout work.** Headings register individually; the update hook polls for five seconds, repeatedly reads document height and every heading’s `offsetTop`, sorts, and updates state. The switcher then recreates and repopulates an `IntersectionObserver`.
5. **Inactive editor and height work.** Every H3 mounts `ScriptEditorInput`; every `HeightUpdater` schedules a timer even when no swipeable-height callback exists.
6. **Query observer and refetch fan-out.** The same day and parts data is observed throughout the tree. Historical date data has no deliberate freshness policy, and individual reading queries can start before the bulk response proves they are needed.
7. **Parallel mode duplicates the expensive tree.** It nearly doubles fragments, subscriptions, headings, and layout work in one update.
8. **Initial-route composition.** The service path statically pulls editing, custom-prayer, sharing, search, and habit-tracking code even when those features are inactive.

## Improvement work units

These units intentionally avoid PHP, service-worker source, offline strategy, Capacitor, and TWA.

| ID       | Work unit                                                   | Status      | Risk       | Offline-sensitive |
| -------- | ----------------------------------------------------------- | ----------- | ---------- | ----------------- |
| PERF-006 | Finish the reproducible service benchmark and budgets       | `done`      | Low        | No                |
| PERF-007 | Enable compressed immutable delivery for hashed assets      | `done`      | Low        | No                |
| PERF-008 | Remove avoidable service-entry and inactive-feature work    | `done`      | Low–medium | No                |
| PERF-009 | Stabilize MDX import caching and failure handling           | `done`      | Low        | No                |
| PERF-010 | Remove repeated per-fragment effects and subscriptions      | `done`      | Medium     | No                |
| PERF-011 | Replace TOC polling with batched incremental updates        | `done`      | Medium     | No                |
| PERF-012 | Reduce data-query fan-out with explicit freshness rules     | `done`      | Medium     | No                |
| PERF-013 | Split optional service features and inspect vendor grouping | `done`      | Medium     | Yes               |
| PERF-014 | Generate measured coherent MDX chunk groups                 | `done`      | High       | Yes               |
| PERF-015 | Evaluate progressive parallel/below-fold rendering          | `cancelled` | High       | Yes               |
| PERF-016 | Add field performance telemetry                             | `done`      | Low        | No                |

### PERF-006 — Benchmark and budgets

Deliverables:

- Keep one deterministic, command-line benchmark for original/current builds.
- Add true warm SPA navigation, hot revisit, TOC, scroll, search, and retained-memory scenarios.
- Run the full 20-run primary protocol and 15-run interaction protocol.
- Store compact summaries; keep bulky raw traces as CI artifacts.
- Make the benchmark fail if expected content, TOC count, or document shape changes.

Initial gates:

- No more than 5% regression in complete-service commit, settled time, TBT, or script duration.
- At least 15% improvement is required to call a performance unit successful.
- CLS ≤ 0.1.
- No long task over 200 ms on the primary profile.
- No more than 10% regression in Russian or parallel DOM/heap size.

Provisional product targets, to be recalibrated with field data:

- Cold older-phone FCP ≤ 1.8 s and LCP ≤ 2.5 s.
- Cold complete service settled ≤ 5 s, with an 8 s temporary hard ceiling.
- Warm SPA service navigation ≤ 1.5 s and hot revisit ≤ 750 ms.
- Language switch ≤ 500 ms, parallel switch ≤ 1 s, and TOC response ≤ 200 ms.
- Fewer than 5% of measured scroll frames over 50 ms.

### PERF-007 — Static delivery

Deliverables:

- Serve JavaScript, CSS, SVG, JSON, and HTML with Brotli where supported and gzip as fallback.
- Give content-hashed `/built/*` files a one-year immutable policy.
- Keep `index.html`, version files, and other mutable entry metadata revalidation-friendly.
- Verify headers on the real deployment, not only locally.
- Repeat the cold benchmark and record compressed transfer bytes.

Acceptance:

- All major browsers receive a supported encoding.
- Direct online load, installed load, update, and offline regression journeys pass.
- No service-worker source change.

### PERF-008 — Service entry and inactive features

Candidate changes, one measured patch at a time:

- Derive the top-level lazy service component directly instead of waiting for an effect and state update.
- Do not subscribe to habit-tracker data for untracked service IDs.
- Lazy-load editor, custom-prayer, and other controls only when applicable or opened.
- Keep the service route preloadable from calendar/service links.

Acceptance:

- Direct URL and SPA navigation render identical content.
- No change in editor, custom-prayer, timer, or deep-link behavior.
- Complete-service or shell metric improves without a bundle regression.

### PERF-009 — MDX import cache

Deliverables:

- Cache one in-flight promise/lazy record for each `src + language` key.
- Cache a stable failed state so a missing chunk cannot enter repeated retry/import cycles.
- Preserve the resolved component cache across language switches and revisits.
- Add contract tests for concurrent callers, success, failure, retry policy, and parallel language keys.

Acceptance:

- Each MDX key initiates at most one import during a render burst.
- Existing MDX compile/render and offline deep-link tests pass.
- Script time, long tasks, or import count improves measurably.

### PERF-010 — Repeated fragment work

Execute as separate measured slices:

1. Skip `HeightUpdater` timers when no `slideUpdateHeight` callback exists.
2. Avoid mounting/subscribing inactive `ScriptEditorInput` instances in non-editable mode.
3. Consolidate audio discovery at the service-content root or trigger it only when content actually changes.
4. Split the common MDX reader path from editor-only state subscriptions.

Acceptance:

- Audio, editor, disabled-prayer, and swipeable-height behavior retain targeted tests.
- Effect/timer/subscription counts do not grow with fragment count when the feature is inactive.

### PERF-011 — TOC architecture

Deliverables:

- Give headings deterministic collision-safe IDs.
- Batch heading additions/removals once per animation frame.
- Maintain one observer and diff the observed node set.
- Replace five seconds of whole-document polling with explicit content-settled and resize signals.
- Avoid reading every `offsetTop` unless order actually changed.

Acceptance:

- Deterministic expected entry count, order, labels, active-item behavior, and scroll destinations for the fixture.
- Direct load, language switch, parallel mode, zoom, font load, and delayed MDX all update correctly.
- Layout count/duration and post-commit settled time improve.

### PERF-012 — Query fan-out

Candidate changes:

- Use bulk reading data before enabling an individual reading query.
- Define freshness for immutable historical dates separately from today/future dates.
- Share day/parts data at the service composition boundary where it reduces observers without creating a new global store.
- Confirm `cachedFetch` background refreshes are not multiplied by progressive fragment mounts.

Acceptance:

- Request counts are captured before and after.
- Today, future dates, historical dates, online refresh, and offline cached reads keep their current semantics.

### PERF-013–015 — Structural work

These units were evaluated after the lower-risk work had stable measurements
and regression coverage.

- Split service-irrelevant optional features and review the monolithic vendor group.
- Generate service-scoped MDX manifests so one service does not depend on a global 1,751-file import context.
- Explore coherent section chunks rather than dozens of tiny fragment chunks.
- Prototype progressive below-fold and parallel rendering without breaking find-in-page, TOC, print, scroll restoration, or full-corpus offline availability.

Any chunk-graph change is offline-sensitive even when service-worker source is untouched. It must keep the generated precache complete and pass installed/offline browser tests.

### PERF-016 — Field telemetry

Collect p75 LCP, INP, CLS, and TTFB plus `service_complete_commit` and `service_settled`. Segment by:

- release;
- device memory and hardware concurrency;
- effective connection type;
- browser/WebView;
- installed/TWA/Capacitor/browser mode;
- service-worker-controlled state;
- Russian, Church Slavonic, or parallel language.

Lab budgets should be revisited after field data shows the real device distribution.

## Regression QA required for every unit

### Content equivalence

- Russian, Church Slavonic, and parallel text snapshots or normalized content hashes.
- Fixed document-shape assertions for the benchmark fixture.
- Reading and variable-part rendering.
- Zlatoust, Basil, Presanctified, Matins, Vespers, Hours, and custom-prayer representative fixtures.
- Date-specific branches including Lent, Pascha, Annunciation, Christmas, and Theophany.

### Interaction equivalence

- Language and parallel selectors.
- TOC count, order, active item, and scrolling.
- Zoom, theme, find-in-page, back/forward, date changes, and scroll restoration.
- Script editor, disabled prayers, custom prayers, and shared service versions.
- Audio controls where audio exists.

### Platform preservation

- Production build and complete precache validation.
- Installed online first load, cached reload, and fully offline direct service reload.
- Generated lazy chunk load while offline.
- No service-worker source diff.
- Existing browser, unit, type, and lint gates.

### Performance acceptance

- Compare against the immediately preceding revision and `origin/master`.
- Reject changes that omit content, reduce TOC coverage, or merely move work past the measured boundary.
- Record raw shape/network counts with every timing.
- Revert a unit that cannot demonstrate either a meaningful improvement or a necessary enabling simplification without regression.

## Executed order

1. Completed the version 3 benchmark and deterministic content gates.
2. Implemented compressed immutable delivery.
3. Implemented MDX caching and low-risk service-entry/fragment work.
4. Re-profiled, then completed TOC and query fan-out slices.
5. Added field milestones before structural chunk changes.
6. Measured ungrouped versus coherent liturgy chunks and retained the latter.
7. Rejected progressive rendering because measured parallel readiness already
   met the target and the risk was not justified.
