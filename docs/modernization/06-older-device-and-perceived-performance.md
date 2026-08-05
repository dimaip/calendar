# Plan 06 — Older-device and perceived performance

Last updated: 2026-08-05

Overall status: `in-progress`; PERF-018 schedule-only candidates were rejected,
PERF-019 is claimed, and PERF-034/PERF-035 follow-ups are proposed

Recommended next unit: `PERF-019`

Scope: returning-user startup, long-service rendering, touch responsiveness,
route and language transitions, scrolling, memory retention, and perceived
readiness. PHP/backend work, service-worker strategy changes, Capacitor/TWA
upgrades, and product redesign are excluded.

Related evidence:

- [Frontend performance plan](./02-performance.md)
- [Full-service performance study](./service-performance-study.md)
- [Post-implementation measurements](./service-performance-implementation-summary.json)

## Objective

Make the application feel immediate and stable on older phones, especially for
returning and installed users, without trading away offline availability,
complete service content, search, print, anchors, or accessibility.

Developer experience is also a constraint. Performance work must not make
ordinary component authoring, debugging, testing, or maintenance materially
harder merely to reduce bundle size or satisfy a synthetic metric. A change that
degrades DX requires trace-level proof that the affected code is a critical
user-visible bottleneck, a conclusive repeated-run improvement, and evidence
that a lower-cost alternative cannot deliver the same result.

This phase optimizes four kinds of user experience:

1. **Readiness:** how quickly useful calendar or service content appears.
2. **Response:** how quickly a tap produces visible feedback.
3. **Continuity:** whether scrolling and transitions maintain consistent frame pacing.
4. **Durability:** whether repeated navigation remains responsive without memory,
   listener, observer, or cache growth.

## Current measured baseline

These values are comparison anchors, not permanent budgets. Each experiment
must reproduce its own before/after baseline from the same revision, machine,
browser, profile, and deterministic content fixture.

| Area                              |                             Current observation |
| --------------------------------- | ----------------------------------------------: |
| Initial JavaScript                |                1,512,607 B raw / 437,057 B gzip |
| Initial vendor JavaScript         |  approximately 1,195,000 B raw / 339,000 B gzip |
| Older-phone cold complete Liturgy |                                          4.16 s |
| Older-phone cold Liturgy settled  |                                          5.72 s |
| Warm SPA service entry at 6× CPU  |                                        486.9 ms |
| Hot service revisit at 6× CPU     |                                        202.5 ms |
| Throttled first SPA service entry |                            approximately 1.20 s |
| Throttled hot service revisit     |                            approximately 155 ms |
| Russian service shape             | 67 TOC entries, 568 paragraphs, 2,274 DOM nodes |
| Parallel service shape            |                   approximately 4,050 DOM nodes |
| Hot parallel commit               |                        approximately 109–122 ms |
| Parallel longest task             |                            approximately 185 ms |
| TOC selection                     |                        approximately 147–175 ms |
| First search-panel open           |                            approximately 469 ms |
| Search result                     | approximately 244 ms, including 180 ms debounce |
| Workbox precache                  |                            1,555 URLs / 7.66 MB |

The current `service_toc_ready` and `service_settled` values include deliberate
500 ms TOC and stability/quiet windows. Agents must not treat those windows as
CPU cost or move the existing marks earlier to claim an improvement.

## Status and coordination protocol

The tracker in this file is the source of truth for this workstream. Update it
before editing implementation files and again before handing work to another
agent.

Status values use the definitions from the
[master roadmap](./README.md#status-values).

### Claiming a unit

1. Confirm all dependencies are `done` or explicitly waived in the notes.
2. Change the unit to `in-progress` in both trackers.
3. Record the owner/agent, date, branch or worktree, baseline artifact, and files
   likely to change in the coordination ledger.
4. Check the conflict group. Two agents must not edit the same conflict group
   concurrently in a shared worktree.
5. If agents share a worktree, parallelize only read-only experiments or units
   with disjoint file ownership.

### Completing or handing off a unit

Record:

- exact benchmark command and environment;
- raw result artifact path;
- median and p75 before/after values;
- content, offline, interaction, memory, and quality checks run;
- keep/revert decision and its evidence;
- remaining risk, blocker, or next action;
- commit or pull-request reference when one exists.

An experiment that fails its retention gate should normally be reverted and
marked `cancelled`, with the useful evidence preserved in the notes.

## Global measurement profiles

### Installed returning-user startup

Measure each of these separately:

- process-cold, cache-warm, online launch;
- process-cold, installed and fully offline launch;
- warm-process launch or reload;
- anonymous user;
- authenticated user with realistic settings and habit data;
- normal, 100 KB, and 1 MB persisted-state fixtures.

The installed profile must first complete service-worker installation and API
data precaching, close the browser process, and relaunch from the manifest start
URL. A normal page reload is not a process-cold startup measurement.

### Long-service profiles

- Cold direct Russian service.
- Warm calendar-to-service navigation.
- Hot revisit.
- Russian to Church Slavonic with the target language cold.
- Russian to parallel with Church Slavonic cold.
- Hot Russian, Church Slavonic, and parallel switches.
- Direct persisted-parallel launch.

### Real interaction profiles

- Real CDP touch swipes, not only `scrollBy`.
- Rapid vertical reading scroll and slow precision scroll.
- Date swipe in both directions.
- Menu, calendar, TOC, language, zoom, search, and back navigation.
- Twenty-to-thirty date/service/language cycles with forced-GC diagnostics when
  the browser supports them.
- At least one physical low-end Android or WebView validation before release.

## Metrics

### Readiness marks

- `bundle_evaluated`
- `react_render_requested`
- `inline_loader_hidden`
- `app_header_ready`
- `date_primary_content_ready`
- `above_fold_stable`
- `navigation_intent`
- `route_chunk_loaded`
- `service_shell_ready`
- `service_complete_commit`
- `service_toc_ready`
- `service_settled`
- `background_precache_started`

Every transition mark must include a navigation/render key so SPA timestamps can
be converted to click-to-result durations. Absolute page-lifetime timestamps are
not transition durations.

### Main-thread and interaction metrics

- Event Timing/INP for the initiating control.
- Tap or key event to next visible paint.
- Total Blocking Time and longest task before useful content.
- Long Animation Frames when available, with long-task fallback.
- Frame intervals, frames over 33 ms and 50 ms, and worst frame.
- Script, style, layout, paint, and raster duration.
- Count and duration of non-passive touch handlers.
- React commits and component render time in a production profiling build.

### Resource and runtime metrics

- Initial raw, gzip, decoded, and executed JavaScript.
- JavaScript coverage at primary-content and full-service commit.
- Initial script and Workbox manifest entry counts.
- Foreground and background request counts before useful content.
- IndexedDB operations and cache writes before useful content.
- Mounted calendar slides and DOM nodes.
- Peak and retained heap, listeners, observers, and detached nodes.
- Third-party script and worker task time.

## Global retention gates

A candidate is retained only if it improves its intended older-device metric by
at least **10% or 100 ms**, unless the unit defines a stronger gate.

It must also satisfy all applicable safeguards:

- no more than 5% p75 regression in unrelated readiness or interaction metrics;
- no more than 10% Total Blocking Time regression;
- immediate visible control feedback below 100 ms ideally and below 200 ms as a
  hard lab ceiling;
- stress-profile longest task at or below 200 ms;
- fewer than 5% of stress scroll frames over 50 ms;
- CLS at or below 0.1 with no visible scroll jump;
- no more than 10% peak or retained-heap regression;
- no linear listener, observer, detached-node, or heap growth over repeated use;
- initial JavaScript does not exceed 437,057 B gzip without explicit review;
- exact normalized service text, heading order, IDs, labels, and search results;
- complete print, copy/select-all, native-find, TOC, anchor, zoom, theme, editor,
  audio, and scroll-restoration behavior;
- fresh install followed by fully offline direct loading of an unvisited Russian,
  Church Slavonic, and parallel service;
- zero failed content-hashed offline requests;
- complete Workbox coverage and atomic update behavior;
- no material regression in component authoring, debugging, testability, or
  maintainability without the stronger critical-bottleneck evidence described
  above.

## Work-unit tracker

| ID       | Priority | Work unit                                                     | Status        | Risk                      | Depends on                   | Conflict group            |
| -------- | -------- | ------------------------------------------------------------- | ------------- | ------------------------- | ---------------------------- | ------------------------- |
| PERF-017 | P0       | Installed-startup and real-touch measurement foundation       | `done`        | Low                       | PERF-016                     | measurement               |
| PERF-018 | P0       | Defer future-date precaching and cache refresh contention     | `cancelled`   | Medium, offline-sensitive | PERF-017                     | startup-client            |
| PERF-019 | P0       | Defer analytics, tracing, Webvisor, and optional polyfills    | `in-progress` | Medium                    | PERF-017                     | startup-client            |
| PERF-020 | P0       | Replace the global pull-to-refresh touch path                 | `proposed`    | Medium                    | PERF-017                     | interaction-shell         |
| PERF-021 | P0       | Render one calendar slide during startup                      | `proposed`    | Medium                    | PERF-017                     | calendar-runtime          |
| PERF-022 | P1       | Split below-fold calendar and optional home features          | `proposed`    | Medium, offline-sensitive | PERF-021                     | calendar-runtime          |
| PERF-023 | P1       | Remove avoidable UI libraries from the initial shell          | `proposed`    | Medium                    | PERF-017                     | startup-shell             |
| PERF-024 | P1       | Defer optional auth, Convex, and native-platform code         | `proposed`    | High                      | PERF-017, PERF-023           | startup-providers         |
| PERF-025 | P1       | Cache persisted state parsing and delay data revalidation     | `proposed`    | Medium, offline-sensitive | PERF-017                     | state-and-data            |
| PERF-026 | P1       | Add responsive route/language transitions and intent loading  | `proposed`    | Medium, offline-sensitive | PERF-017                     | service-navigation        |
| PERF-027 | P1       | Remove remaining per-fragment MDX reader overhead             | `proposed`    | Medium                    | PERF-017                     | service-runtime           |
| PERF-028 | P2       | Pilot coarse service `content-visibility`                     | `proposed`    | High                      | PERF-027                     | service-runtime           |
| PERF-029 | P2       | Refine service-resolved MDX loading packs                     | `proposed`    | High, offline-sensitive   | PERF-017, PERF-027           | mdx-build                 |
| PERF-030 | P3       | Prototype a compact static-reader content representation      | `deferred`    | High, offline-sensitive   | PERF-029                     | mdx-build                 |
| PERF-031 | P1       | Reduce first-open menu and search latency                     | `proposed`    | Low, offline-sensitive    | PERF-017                     | service-navigation        |
| PERF-032 | P2       | Evaluate replacing swipeable-views gesture handling           | `deferred`    | High                      | PERF-017, PERF-020, PERF-021 | calendar-runtime          |
| PERF-033 | P1       | Physical-device and long-session retention validation         | `proposed`    | Low                       | PERF-017                     | validation                |
| PERF-034 | P1       | Stabilize retained heap over repeated service/language cycles | `proposed`    | Medium                    | PERF-017                     | state-and-service-runtime |
| PERF-035 | P2       | Validate precache correctness before broader experiments      | `proposed`    | Medium, offline-sensitive | PERF-018                     | precache-validation       |

## Execution waves

### Wave A — Establish the missing evidence

1. PERF-017

Exit: process-cold installed startup, real-touch scrolling, first-versus-warm
interactions, cold language/parallel transitions, and longer retention runs all
produce machine-readable artifacts.

### Wave B — Remove critical-window contention

1. PERF-018 — cancelled after both schedule-only candidates failed retention
   thresholds; immediate behavior remains in place.
2. PERF-019
3. PERF-020
4. PERF-021

PERF-018 and PERF-019 share `client.tsx`; PERF-018 is closed before PERF-019 is
claimed. PERF-035 is required before any future precache concurrency,
persistence, or deduplication product experiment.

Exit: useful calendar content is no longer competing with optional background
work; real finger scrolling does not depend on a permanent global non-passive
listener; only the active date view mounts during startup.

### Wave C — Reduce startup code and render work

1. PERF-022
2. PERF-023
3. PERF-024
4. PERF-025

Exit: initial gzip and executed JavaScript are materially lower, anonymous and
authenticated startup both pass, and cached data remains immediately available
online and offline.

### Wave D — Improve perceived transitions

1. PERF-026
2. PERF-031

Exit: every route, menu, search, and language action produces visible feedback
within 100 ms where possible, without showing stale content as current.

### Wave E — Reduce long-service CPU, layout, and paint

1. PERF-027
2. PERF-028
3. PERF-029

PERF-028 and PERF-029 are separate experiments. Do not combine content
containment with another MDX chunking change; each needs an attributable result.

Exit: the retained approach materially improves full-service or parallel-mode
work while preserving the complete-document contract.

### Wave F — Structural decisions, durability, and release proof

1. PERF-030 only if the preceding results leave a demonstrated parse/evaluate or
   React-fiber bottleneck.
2. PERF-032 only if real-touch measurements still show swipe-handler cost.
3. PERF-034 to resolve the measured repeated-cycle retained-heap failure.
4. PERF-035 before reopening broader precache product changes.
5. PERF-033 after each retained wave and before release.

## Detailed work units

### PERF-017 — Installed-startup and real-touch measurement foundation

Objective: measure the experiences that the existing service benchmark does not
cover.

Work:

- Add all installed-startup, service-transition, touch, cold-language, and
  retention profiles described above.
- Add keyed application marks without moving existing completion semantics.
- Capture production-parity runs with analytics and background precaching enabled.
- Add isolated controls that disable one subsystem at a time.
- Store raw artifacts plus a compact comparison summary.

Acceptance:

- Three-run smoke and twenty-run comparison modes are reproducible.
- Process-cold and warm-process launches are demonstrably different scenarios.
- Real touch input is visible in Event Timing and trace output.
- A failing content, offline, or interaction gate exits non-zero.

Coordination: claim `scripts/performance/`, telemetry files, and relevant E2E
fixtures. Avoid product changes in this unit.

Execution notes: claimed on 2026-08-05 from baseline commit `47b69ba4`.
The automated process-cold profile is explicitly labelled “installed-like”:
Playwright can preserve the service worker, Cache Storage, IndexedDB, and HTTP
cache across a full browser-process restart, but a true standalone installed
window and low-end GPU/thermal behavior still require physical-device validation.

Execution status: `done` on 2026-08-05. The reliable harness foundation now
provides:

- a copied, immutable production-build directory per run, fingerprinted before
  and after measurement, plus a separate fingerprint of the harness source;
- exact seed validation against all 1,555 Workbox manifest entries, with zero
  missing or unexpected cache keys, and all 44 required future-day IndexedDB
  records across eleven days, with zero missing keys;
- full browser-process restarts from cloned persistent profiles without
  Playwright request routing in measured launches; optional external traffic is
  blocked through CDP without globally disabling the service worker or HTTP
  cache;
- semantic render-key and document-shape checks, exact expected dates for
  trusted CDP swipes, failed-request detection for every `/built/` asset type,
  optional trace capture, and forced-GC listener/observer/heap sampling;
- additive, navigation-keyed performance marks. Instrumentation observes the
  existing completion points and does not move them earlier. CLS is recomputed
  from layout shifts inside each scenario's explicit start/end phase, using CLS
  session-window rules, rather than reusing a page-lifetime total.

The final immutable baseline is
`output/performance/perf-017-older-phone-final-i/report.json`. It passes all ten
selected scenarios over three older-phone runs at 4x CPU slowdown, 150 ms RTT,
and 1.6 Mbps down. All samples are service-worker controlled where required,
all semantic shapes are stable, and integrity analysis reports no issues. The
copied build remains unchanged with fingerprint
`190017dbf07bc98b26997e4ec2144044445514a85b7bf4ea083e0ed370237e79`;
the harness fingerprint is
`17ba5e44be02a32004d797bc1bebe759203b5902b270db3f1ddbf88213c0e820`.
Seed checks cover 1,555/1,555 Workbox entries and 44/44 required IndexedDB keys.

Selected p75 values below are derived directly from that report and rounded to
one decimal place:

| Scenario                     |              Readiness / transition p75 |                             Responsiveness / stability p75 |
| ---------------------------- | --------------------------------------: | ---------------------------------------------------------: |
| Process-cold online startup  |        617.8 ms process launch to ready |                                80.5 ms longest task; CLS 0 |
| Process-cold offline startup |   561.1 ms process launch to date ready |      258.9 ms Russian service complete; 790.9 ms TOC ready |
| Warm-process startup         |            317.1 ms navigation to ready |                                   0 ms longest task; CLS 0 |
| Rapid reading touch          |               486.8 ms gesture duration |              12.3 ms p95 frame interval; 16.0 ms max event |
| Precision reading touch      |             1,210.2 ms gesture duration |              14.1 ms p95 frame interval; 20.0 ms max event |
| Date swipe left / right      |       715.7 / 713.9 ms gesture duration | 9.5 / 10.0 ms p95 frame interval; 40.0 / 28.0 ms max event |
| Cold Church Slavonic         |   344.5 ms complete; 859.9 ms TOC ready |                                66.5 ms longest task; CLS 0 |
| Cold parallel                | 614.0 ms complete; 1,149.6 ms TOC ready |                               169.5 ms longest task; CLS 0 |
| Persisted parallel launch    | 874.6 ms complete; 1,408.8 ms TOC ready |                          187.0 ms longest task; CLS 0.0161 |

Trace evidence is in `output/performance/perf-017-trace-final-k`: the sampled
real-touch run passes, `trace.json.gz` was both captured and written with all 18
declared trace categories, and its harness fingerprint matches the final
baseline.

The strict retention diagnostic is stored separately at
`output/performance/perf-017-retention-final-j/report.json`. Its twenty-cycle
CPU-only run preserves the same build and harness fingerprints and exact
Workbox/IndexedDB coverage. Listener, observer, non-passive-touch, and node
slopes pass; heap slope is 78,655.7 B/cycle, below the 131,072 B/cycle limit.
The run nevertheless fails its retained-heap percentage gate: heap rises by
1,903,428 B, or 13.27%, against the 10% limit. PERF-034 owns that product-runtime
finding; it does not invalidate the measurement foundation.

Offline semantics remain a visible product gap. The default
`startup-process-cold-offline` scenario verifies a genuinely unvisited Russian
service and passes. The stricter `offline-unvisited-all-languages` scenario is a
separate opt-in gate and currently fails after Russian because production
precaching does not include Church Slavonic parts or individual `91Slavic`
readings. The default comparison set neither provisions nor silently includes
that strict scenario, and therefore does not conceal the gap by claiming strict
coverage; language and retention scenarios may provision their declared
cold-language fixture before measurement, while the strict offline gate never
does. This separation must remain explicit until production offline data
coverage changes and the strict scenario passes on its own.

Default comparisons intentionally exclude both retention and the strict
first-ever-offline all-language scenario because they are independent,
destructive/long-running diagnostics with different provisioning rules. Both
run separately and must remain visible: the final retention run currently fails
only the retained-heap percentage gate, while strict first-ever offline Church
Slavonic and parallel still fail because production precaching omits Church
Slavonic parts and individual `91Slavic` readings. Neither result may be folded
into or hidden by a passing default comparison.

PERF-017 acceptance is complete for the automated measurement foundation.
Authenticated startup/provider behavior remains PERF-024 work; focused menu,
search, route, and gesture variants remain PERF-020, PERF-026, and PERF-031
work; physical low-end Android/WebView confirmation remains PERF-033 work.

### PERF-018 — Defer future-date precaching and cache refresh contention

Objective: prevent offline-maintenance work from competing with useful content.

Hypothesis: starting the precache worker after route readiness and limiting its
concurrency will improve process-cold and cached startup without reducing the
future-day offline horizon.

Work:

- Compare immediate start, route-ready start, and idle start with a bounded
  fallback timeout.
- Persist the last successful refresh time.
- Cap future-date work to a measured concurrency.
- Deduplicate foreground and background requests.
- Schedule cache-hit revalidation after useful content where freshness permits.

Retain when: startup or service readiness improves by the global threshold and
the complete future-date offline corpus is available after the bounded refresh.

Coordination: likely touches `client.tsx`, `precache.ts`, the worker, and cached
fetch scheduling. Do not overlap PERF-019 in a shared worktree.

Execution notes: `cancelled` on 2026-08-05; both schedule-only candidates were
rejected and immediate scheduling remains unchanged.

The final decision uses a fresh, comparable three-run core control from the same
measurement session:

- control: `output/performance/perf-018-immediate-core-smoke-3-a/report.json`;
- route-ready candidate:
  `output/performance/perf-018-route-ready-core-smoke-3-a/report.json`, compared
  in `output/performance/perf-018-route-ready-core-smoke-comparison-a.json`;
- idle-after-ready candidate:
  `output/performance/perf-018-idle-core-smoke-3-a/report.json`, compared in
  `output/performance/perf-018-idle-core-smoke-comparison-a.json`.

The first saved comparison used an older control collected at a different time
and was temporally confounded; it is not evidence for the final conclusion.
Against the fresh control's 561.64 ms cold-online process-ready p75,
route-ready measures 608.93 ms (`-8.42%` improvement, or 8.42% slower) and
idle-after-ready measures 595.39 ms (`-6.01%` improvement, or 6.01% slower).
Neither meets the global target.

Both candidates also fail safeguards. Route-ready regresses cold-online task
time by 7.03%, persisted-parallel complete by 8.46%, persisted-parallel TOC by
5.16%, and persisted-parallel task time by 10.66%. Idle-after-ready regresses
the same metrics by 5.79%, 8.37%, 5.69%, and 8.73%, respectively. Semantic and
offline-compatible shapes pass, but that is necessary rather than sufficient.
The exact 44-key corpus, ten-day horizon, worker/Capacitor split, and service
worker were preserved.

Concurrency, successful-refresh persistence, and request deduplication were not
changed or measured here. They move to PERF-035 and cannot justify a product
change until its dedicated correctness harness exists and the resulting
candidate meets both the global evidence threshold and all offline gates.

### PERF-019 — Defer analytics, tracing, Webvisor, and optional polyfills

Objective: keep non-product JavaScript out of the first useful render.

Work:

- A/B Yandex, Webvisor, GTM, Sentry tracing, and the share polyfill independently.
- Preserve early errors with a small `error`/`unhandledrejection` queue.
- Initialize retained systems after useful content or during idle.
- Emit explicit initial page-view events after delayed initialization.
- Consider sampling Webvisor by device capability or session.

Retain when: the production-parity startup profile improves materially and
monitoring/page-view correctness is demonstrated.

Coordination: owns startup analytics in `client.tsx` and `index.html` while
active.

Execution notes: claimed on 2026-08-05 on
`dimaip/frontend-modernization`. The fresh immutable baseline is the three-run
core smoke at
`output/performance/perf-018-immediate-core-smoke-3-a/report.json`, with build
fingerprint
`190017dbf07bc98b26997e4ec2144044445514a85b7bf4ea083e0ed370237e79`
and harness fingerprint
`17ba5e44be02a32004d797bc1bebe759203b5902b270db3f1ddbf88213c0e820`.

Baseline p75 anchors:

| Scenario             |                                        Readiness p75 |                                                   Main-thread p75 |
| -------------------- | ---------------------------------------------------: | ----------------------------------------------------------------: |
| Process-cold online  |                           561.64 ms process to ready |                                    183.5 ms script; 368.7 ms task |
| Process-cold offline |                      542.55 ms process to date ready |                                    190.9 ms script; 376.2 ms task |
| Warm process         |                        284.67 ms navigation to ready |                                    121.7 ms script; 256.4 ms task |
| Persisted parallel   | 795.95 ms complete; 1,329.4 ms TOC; 1,350.3 ms ready | 387.7 ms script; 758.2 ms task; 170.5 ms longest task; CLS 0.0161 |

The initial JavaScript anchor is 1,516,050 B decoded and 439,000 B gzip. That is
1,943 B over the 437,057 B review gate, so any candidate must report bundle
impact explicitly.

The first candidate removes only BrowserTracing while preserving Sentry error
capture and every other subsystem. Its production build contains 1,488,262 B
raw and 430,274 B gzip of initial JavaScript: 29,513 B raw and 8,726 B gzip less
than the same analyzer's baseline. This puts the candidate 6,783 B below the
bundle review ceiling, but bundle size alone does not satisfy the keep
criterion.

The first candidate timing at
`output/performance/perf-019-tracing-off-core-smoke-3-a/report.json` and its
follow-up control at
`output/performance/perf-019-immediate-core-smoke-3-b/report.json` are invalid
for a latency decision. Copying approximately 3,046 build files per artifact
triggered Spotlight indexing; the ten-logical-CPU host reached load averages
above 180, and the follow-up control's DOM-content p75 moved from approximately
126 ms to 365 ms. This is measured temporal contamination, not a product
regression or improvement.

Experience report schema 3 therefore records host-load provenance, requires
the same logical CPU capacity, rejects initial-load differences above 0.25 per
logical CPU, and gates the one- and five-minute load at 0.75 per logical CPU at
preflight, immediately before every measured scenario after its setup, and
post-run. Reports must contain the exact declared checkpoint sequence. A failed
preflight exits before creating or copying an artifact. New artifact roots
receive `.metadata_never_index` before the immutable build snapshot is copied.
Schema 1 reports remain historical anchors but cannot be used in a new
authoritative comparison; schema 2 introduced host-load integrity and schema 3
adds third-party fixture provenance.

The remaining vendor-runtime experiments now have a separate, opt-in
`startup-third-party-runtime` foundation. It validates a manifest and all five
executable bodies by SHA-256, replays only the exact Yandex, GTM, gtag,
destination, and Analytics script classes, verifies one request and one browser
execution per script, and fails closed on unknown external traffic. A
750 ms no-new-external-work window and a second finalization check cover delayed
requests. Report comparisons require the same self-verified fixture digest.
The existing/default/all/offline scenarios remain in blocked mode, and a real
persistent-Chromium test proves that an installed, fetch-intercepting
Workbox-style worker is unregistered from the disposable profile clone and new
registrations are blocked for this diagnostic, so vendor traffic cannot bypass
replay. Normal installed/offline scenarios remain service-worker-controlled.

This diagnostic is explicitly limited to the `cpu-only` profile. Playwright
fulfillment does not reproduce production compression or transport throttling,
and Playwright cannot route requests already intercepted by a service worker,
so its results may support parse/evaluate/runtime scheduling decisions but must
not be presented as total third-party network cost or service-worker overhead.
No live script bodies have been captured and no production runtime result is
claimed yet.

The next action is a fresh reverse-order schema 3 control/candidate smoke after
the load gate passes, followed by twenty-run comparison only if the smoke is
directionally promising. BrowserTracing is retained only if cold-online
readiness improves by at least 10% or 100 ms and all startup, service,
semantic-shape, offline, interaction, and layout safeguards pass. The harness
blocks or stubs third-party remote execution for determinism; therefore Yandex
and GTM remote execution cost cannot be inferred from these runs and requires a
separate controlled diagnostic.

### PERF-020 — Replace the global pull-to-refresh touch path

Objective: allow normal vertical reading scroll to remain compositor-driven.

Work:

- Establish an A/B with pull-to-refresh disabled on service pages.
- Replace the permanent global `passive: false` listener if the A/B improves
  real-touch input or frame pacing.
- Recognize only a confirmed top-edge downward pull.
- Batch visual updates to animation frames and prefer transforms over height.
- Preserve refresh, cancellation, accessibility, and reduced-motion behavior.

Retain when: real-touch Event Timing or frame pacing improves by the global
threshold with no gesture regression on browser, installed PWA, and Capacitor
smoke profiles.

Coordination: owns the app-shell pull gesture. It must not change date-swipe
handling in this unit.

Execution notes: not started.

### PERF-021 — Render one calendar slide during startup

Objective: avoid mounting previous, current, and next full day trees before the
user can interact.

Work:

- Compare initial swipe overscan `1/1` with an active-only first commit.
- Prefetch adjacent-day data without mounting adjacent DOM.
- Enable adjacent rendering during idle or on swipe intent.
- Record slide count, DOM nodes, queries, MDX imports, commit time, and first
  swipe latency.

Retain when: primary calendar readiness improves materially and first-swipe p75
does not regress by more than 100 ms after intent preloading.

Coordination: owns `Main.tsx` and calendar swipe orchestration while active.

Execution notes: not started.

### PERF-022 — Split below-fold calendar and optional home features

Objective: render the useful date heading and primary day content without
evaluating below-fold MDX and secondary features.

Candidates:

- calendar picker;
- homepage troparions, kondaks, and generic MDX context;
- favourites, sermons, banners, and optional prompts;
- share implementation when native share is available.

Retain when: initial executed/gzip JavaScript and primary-content readiness
improve materially, with offline first-open coverage for every new chunk.

Coordination: begins only after PERF-021 settles the active-slide boundary.

Execution notes: not started.

### PERF-023 — Remove avoidable UI libraries from the initial shell

Objective: remove libraries whose startup cost is disproportionate to their
initial-shell responsibility.

Experiments:

- Replace MUI `createTheme` on the core path with the application colour theme.
- Replace or defer the MUI update prompt.
- Remove `styled-components` with the pullable replacement.
- Lazy-load `react-nice-dates` with the calendar picker.
- Keep the existing select-control architecture by default. Do not replace it
  with native `<select>` elements for speculative bundle savings. Reconsider
  only if profiling attributes a critical user-visible delay to these controls
  and a repeated A/B plus physical-device run shows a conclusive improvement.

Retain when: each individual removal records a measurable raw/gzip/executed-code
or startup improvement. Do not combine unrelated replacements in one result.

Coordination: record package-level source and gzip deltas. Preserve the current
visual and accessibility contracts.

Execution notes: not started.

### PERF-024 — Defer optional auth, Convex, and native-platform code

Objective: keep anonymous web startup from parsing providers and platform
adapters it does not need for the first useful screen.

Work:

- Establish separate anonymous and authenticated baselines.
- Prototype a stable provisional session boundary before loading OIDC.
- Connect Convex after authentication or when habit/update features need it.
- Split browser storage from Capacitor/native storage without changing existing
  data or keys.
- Preserve authenticated header, settings sync, habit tracking, token renewal,
  logout, and offline behavior.

Retain when: anonymous startup improves materially and authenticated startup,
session correctness, and stored-data compatibility remain within global gates.

Coordination: high-conflict provider work; one agent owns `App.tsx`, auth,
Convex, and storage boundaries for the duration of this unit.

Execution notes: not started.

### PERF-025 — Cache persisted state parsing and delay data revalidation

Objective: return cached state/data immediately without repeatedly parsing one
large object or racing the first render with refresh callbacks.

Work:

- Parse the persisted Recoil object once per startup.
- Invalidate or merge the in-memory snapshot on writes and cross-tab storage events.
- Batch full-object serialization where behavior permits.
- Compare immediate and post-ready revalidation for cache hits.
- Test realistic custom-prayer and editor-state sizes.

Retain when: large-state startup improves materially with byte-for-byte compatible
stored state and unchanged online/offline freshness behavior.

Coordination: owns persistence and cached-fetch scheduling while active; do not
fold in a state-library migration.

Execution notes: not started.

### PERF-026 — Responsive route/language transitions and intent loading

Objective: provide immediate feedback while preserving the last coherent view
until the next route or language is ready.

Work:

- Add click/touch-to-next-paint marks.
- Retain visible content during Suspense with a clear pending control state.
- Render a service-specific shell instead of a generic full-page loader.
- Preload the resolved service index and likely current-language resources on
  meaningful touch/focus/hover intent, gated by Save-Data and connection quality.
- Verify rapid toggles and stale-result cancellation.

Retain when: visible feedback is below 100 ms where possible and first SPA
service/language transitions improve materially without increasing unused work
on constrained connections.

Coordination: owns service route/language pending state and intent loading.

Execution notes: not started.

### PERF-027 — Remove remaining per-fragment MDX reader overhead

Objective: reduce React work without changing content architecture.

Candidates:

- Move editor-only theme subscriptions out of normal `MdxLoader` fragments.
- Choose reader/editor heading implementations once at provider level.
- Hoist stable parallel language context values and Emotion classes.
- Test replacing unnecessary MDX wrapper elements with fragments.
- Replace timer/text-based scroll restoration with deterministic commit/TOC
  signals if traces show it remains active.

Retain when: service or language render CPU improves materially, or a smaller
increment combines to at least 100 ms, with exact text/heading/audio/editor
behavior.

Coordination: owns service runtime/provider/typography files while active.

Execution notes: not started.

### PERF-028 — Pilot coarse service `content-visibility`

Objective: reduce offscreen style, layout, paint, and parallel-mode work while
retaining the complete DOM.

Work:

- Apply containment only at major service-section boundaries.
- Compare immediate enablement with enablement after the first full layout.
- Provide stable intrinsic sizes and a print override.
- Test anchors near 25%, 75%, and 95%, zoom, language changes, native/custom
  search, copy/select-all, accessibility, and scroll restoration.
- Validate supported Android/WebView and iOS behavior.

Retain when: layout/paint, full commit, parallel long tasks, or memory improve by
the global threshold with stable document height and no visible scroll jumps.

Coordination: do not combine this experiment with MDX repacking or progressive
mounting.

Execution notes: not started.

### PERF-029 — Refine service-resolved MDX loading packs

Objective: reduce parse/evaluate and Suspense retries without returning to
hundreds of small requests or loading the full corpus.

Work:

- Attribute V8 compile/evaluate and coverage per coherent pack.
- Prototype a service dependency manifest and one preload barrier.
- Compare current packs with coverage-guided common/rare or service-resolved packs.
- Measure direct cold, SPA intent, cold language, offline installation, and update
  behavior independently.

Retain when: a controlled older-phone A/B improves service readiness by the
global threshold. Whole-corpus grouping remains prohibited unless it independently
passes Workbox size, offline, transfer, parse, and runtime gates.

Coordination: owns Webpack MDX contexts and generated manifests while active.

Execution notes: not started.

### PERF-030 — Prototype a compact static-reader content representation

Status rationale: deferred until traces show that executable MDX and React fiber
creation remain dominant after PERF-027–029.

Objective: compile static reader leaves to compact tokens, data, or trusted HTML
while leaving dynamic orchestration and editor mode in React.

The prototype must include deterministic heading metadata and prove equivalent
content, search, print, anchors, editor fallback, dynamic Parts, offline packs,
and update behavior for one representative service before wider planning.

Execution notes: not started; no implementation is authorized by this plan alone.

### PERF-031 — Reduce first-open menu and search latency

Objective: remove the approximately 469 ms first-open delay without optimizing
the already acceptable query path prematurely.

Work:

- Measure overflow and search resource waterfalls independently.
- Compare idle-preloading the overflow menu, loading search when the menu opens,
  and combining the two small chunks.
- Show an immediate accessible menu/search shell.
- Stress common two-character terms, rapid edits, large match sets, language
  changes with active highlights, and next/previous navigation.

Retain when: first open reaches 100–150 ms on the target profile or improves by
the global threshold, with no initial-bundle or offline regression.

Coordination: owns layout overflow and in-page search files while active.

Execution notes: not started.

### PERF-032 — Evaluate replacing swipeable-views gesture handling

Status rationale: deferred until PERF-020 and PERF-021 isolate pull and calendar
overscan costs.

Objective: remove remaining non-passive gesture work using native scroll snap or
a smaller pointer-event implementation if real-touch traces justify it.

Do not proceed solely for dependency modernization. Retain only with a material
date-swipe/vertical-scroll improvement and equivalent direction locking,
accessibility, height, restoration, and browser/Capacitor behavior.

Execution notes: not started.

### PERF-033 — Physical-device and long-session retention validation

Objective: distinguish one-time lazy/module retention from a genuine leak and
validate lab conclusions on representative hardware.

Work:

- Run twenty-to-thirty date/service/language cycles.
- Record heap after forced GC where supported.
- Compare heap-snapshot dominators only when growth appears linear.
- Track DOM nodes, detached nodes, listeners, observers, timers, workers, query
  cache, Emotion rules, audio enhancements, and MDX resources.
- Repeat retained high-impact changes on at least one low-end Android/WebView.

Acceptance: no linear growth and no more than 10% retained-heap regression.
One-time module/cache retention must be documented rather than mislabeled a leak.

Coordination: read-only against implementation units except for harness and
instrumentation files.

Execution notes: not started.

### PERF-034 — Stabilize retained heap over repeated service/language cycles

Status: `proposed`; P1; depends on PERF-017.

Objective: identify and remove the retained state or service-runtime ownership
that causes heap to exceed the long-session percentage gate while preserving
complete service content and offline behavior.

Evidence: `output/performance/perf-017-retention-final-j/report.json` fails after
twenty alternating date, Russian, Church Slavonic, and parallel cycles. Forced
GC leaves 1,903,428 B (13.27%) more heap than the initial sample. The fitted
slope is 78,655.7 B/cycle and listener, observer, non-passive-touch, document,
and node measurements remain within their gates, so investigation should start
with retained state, query/cache ownership, and service/MDX runtime references
rather than broad listener cleanup.

Work:

- Repeat the strict twenty-cycle diagnostic to establish variance before
  changing product code.
- Use heap snapshots and dominator/retainer paths to attribute growth across
  service trees, MDX modules, query/cache state, navigation state, and expected
  one-time module initialization.
- Isolate one subsystem at a time and retain only an attributable fix; do not
  evict content or caches merely to make a synthetic number pass.
- Re-run the full older-phone default comparison plus the separate strict
  retention and first-ever-offline diagnostics after each candidate.

Acceptance:

- Repeated twenty-cycle runs retain no more than 10% heap and keep fitted heap
  growth at or below 131,072 B/cycle (128 KiB/cycle).
- Listener, observer, non-passive-touch, document, and node growth continue to
  satisfy the existing retention gates with no material linear growth.
- Service text, heading order/IDs, search, anchors, scrolling, and language
  transitions remain exact.
- Workbox and IndexedDB coverage remain exact, the service worker remains in
  control, and the separate online, default-offline Russian, and strict
  first-ever-offline results are reported without weakening or hiding the known
  Church Slavonic/parallel gap.
- The default comparison has no unrelated readiness, interaction, or layout
  regression beyond the global limits.

Coordination: likely conflict domain `state-and-service-runtime`; claim state,
query/cache, service runtime, MDX runtime, and retention-harness files before
editing them.

Execution notes: not started. Do not weaken either the 10% heap-growth gate or
the 128 KiB/cycle slope gate to close this unit.

### PERF-035 — Precache correctness harness

Status: `proposed`; P2; offline-sensitive; depends on PERF-018.

Objective: prove future-date precache correctness in missing-data states and on
physical Capacitor before considering concurrency, persistence, or deduplication
changes to the product runtime.

Work:

- Add deterministic empty-corpus and partially missing-corpus fixtures that
  verify recovery to the exact 44-key, ten-day future corpus.
- Detect missing, unexpected, stale, or duplicate records and failed hashed
  requests rather than accepting record-count equivalence.
- Exercise the browser-worker/service-worker path and the separate Capacitor
  path without collapsing their execution or lifecycle semantics.
- Run the correctness matrix on a physical Capacitor device before proposing a
  runtime change.
- Only after the harness passes, benchmark concurrency limits,
  successful-refresh persistence, and request deduplication as isolated
  experiments with fresh same-session controls.

Acceptance:

- Empty and partially missing fixtures converge to exactly the expected 44 keys
  across the ten-day horizon, while intentionally incomplete results fail.
- Browser worker, existing service worker, and physical Capacitor paths preserve
  their current ownership split and produce equivalent required data.
- Fresh-install, unvisited-content, update, and fully offline gates remain
  explicit and pass; the known strict first-ever-offline Church
  Slavonic/parallel gap is not hidden or weakened.
- No product candidate is retained unless it independently meets the global
  evidence threshold and all offline safeguards.

Coordination: conflict group `precache-validation`; the dedicated harness comes
before product changes to precache concurrency, persistence, or deduplication.

Execution notes: not started.

## Explicit non-goals and rejected defaults

- Full service virtualization without field evidence of memory or scroll failure.
- Progressive parallel rendering merely to move work beyond completion marks.
- Keeping inactive language trees mounted on old phones.
- Arbitrary vendor splitting that does not reduce downloaded and executed code.
- Replacing established select controls or other productive abstractions for
  speculative bundle savings.
- Cache eviction based only on one-time lazy-module retention.
- Moving `service_complete_commit` before the complete service exists.
- Changing service-worker strategy or dropping unvisited offline content.
- Correcting unrelated date/freshness behavior inside a performance patch.

## Coordination ledger

Add one row when claiming a unit. Keep completed rows as durable handoff history.

| Unit     | Status        | Owner / agent         | Started    | Branch / worktree               | Baseline artifact                                                                                                                                      | Latest result / blocker                                                                                                                                                                   | Next handoff                                                                                    |
| -------- | ------------- | --------------------- | ---------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| PERF-017 | `done`        | Root + perf017 agents | 2026-08-05 | `dimaip/frontend-modernization` | Commit `47b69ba4`; existing service reports                                                                                                            | Final three-run older-phone baseline and sampled trace pass; separate strict retention run fails only the 13.27% heap-growth gate; strict unvisited CSJ/parallel offline data gap remains | PERF-034 owns heap stabilization; PERF-033 owns physical-device validation                      |
| PERF-018 | `cancelled`   | Root + perf018 agents | 2026-08-05 | `dimaip/frontend-modernization` | Fresh same-session immediate control: `output/performance/perf-018-immediate-core-smoke-3-a/report.json`                                               | Route-ready and idle-after-ready are 8.42% and 6.01% slower on cold-online process readiness and regress safeguards; semantic/offline-compatible shapes pass                              | Immediate behavior retained; PERF-019 is next and PERF-035 owns broader precache validation     |
| PERF-019 | `in-progress` | Root + perf019 agents | 2026-08-05 | `dimaip/frontend-modernization` | Immutable schema 1 anchor: `output/performance/perf-018-immediate-core-smoke-3-a/report.json`; candidate bundle: `perf-019-tracing-bundle-report.json` | BrowserTracing saves 29,513 B raw / 8,726 B gzip; latency runs invalidated by host load above 180; schema 3 rejects contaminated runs and mismatched vendor fixtures                      | Rerun reverse-order schema 3 tracing A/B; then capture and validate the CPU-only vendor fixture |

## Decision log

| Date       | Unit     | Decision     | Evidence / notes                                                                                                                                                  |
| ---------- | -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-08-05 | Plan     | Created      | Prioritize returning startup, background contention, real-touch scrolling, active-only calendar rendering, then long-service containment.                         |
| 2026-08-05 | Plan     | DX guardrail | Keep established abstractions, including select controls, unless trace attribution and conclusive older-device measurements justify the maintenance cost.         |
| 2026-08-05 | PERF-030 | Deferred     | Static-reader representation is justified only after lower-risk runtime and packing experiments.                                                                  |
| 2026-08-05 | PERF-032 | Deferred     | Current synthetic scrolling is smooth; real-touch evidence must isolate remaining swipe cost first.                                                               |
| 2026-08-05 | PERF-017 | Evidence     | Retain immutable build/harness provenance, exact Workbox/IndexedDB coverage, phase-scoped metrics, and a separate strict unvisited-all-language offline gate.     |
| 2026-08-05 | PERF-017 | Completed    | Final three-run older-phone baseline and sampled trace pass with matching harness fingerprints; strict diagnostics remain separate and visible.                   |
| 2026-08-05 | PERF-034 | Proposed     | The strict twenty-cycle run exceeds retained heap by percentage (13.27% > 10%) despite passing the 128 KiB/cycle slope and listener/observer/node gates.          |
| 2026-08-05 | PERF-018 | Cancelled    | Fresh same-session control shows route-ready and idle-after-ready are 8.42% and 6.01% slower and regress safeguards; immediate scheduling is retained.            |
| 2026-08-05 | PERF-035 | Proposed     | Build missing-corpus and physical Capacitor correctness coverage before testing precache concurrency, persistence, or deduplication product changes.              |
| 2026-08-05 | PERF-019 | Claimed      | First candidate isolates BrowserTracing removal while preserving Sentry errors and all other subsystems; third-party remote costs remain a separate diagnostic.   |
| 2026-08-05 | PERF-019 | Evidence fix | Initial timing was invalidated after host load exceeded 180; schema 2 adds fail-fast preflight, scenario checkpoints, CPU/load compatibility, and no-index roots. |
| 2026-08-05 | PERF-019 | Fixture gate | Schema 3 adds hash-verified, fail-closed, CPU-only five-script replay; live bodies and a production runtime result remain deliberately absent.                    |
