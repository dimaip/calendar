# Plan 06 — Older-device and perceived performance

Last updated: 2026-08-05

Overall status: `ready` for measurement; implementation has not started

Recommended first unit: `PERF-017`

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

| ID       | Priority | Work unit                                                    | Status     | Risk                      | Depends on                   | Conflict group     |
| -------- | -------- | ------------------------------------------------------------ | ---------- | ------------------------- | ---------------------------- | ------------------ |
| PERF-017 | P0       | Installed-startup and real-touch measurement foundation      | `ready`    | Low                       | PERF-016                     | measurement        |
| PERF-018 | P0       | Defer future-date precaching and cache refresh contention    | `proposed` | Medium, offline-sensitive | PERF-017                     | startup-client     |
| PERF-019 | P0       | Defer analytics, tracing, Webvisor, and optional polyfills   | `proposed` | Medium                    | PERF-017                     | startup-client     |
| PERF-020 | P0       | Replace the global pull-to-refresh touch path                | `proposed` | Medium                    | PERF-017                     | interaction-shell  |
| PERF-021 | P0       | Render one calendar slide during startup                     | `proposed` | Medium                    | PERF-017                     | calendar-runtime   |
| PERF-022 | P1       | Split below-fold calendar and optional home features         | `proposed` | Medium, offline-sensitive | PERF-021                     | calendar-runtime   |
| PERF-023 | P1       | Remove avoidable UI libraries from the initial shell         | `proposed` | Medium                    | PERF-017                     | startup-shell      |
| PERF-024 | P1       | Defer optional auth, Convex, and native-platform code        | `proposed` | High                      | PERF-017, PERF-023           | startup-providers  |
| PERF-025 | P1       | Cache persisted state parsing and delay data revalidation    | `proposed` | Medium, offline-sensitive | PERF-017                     | state-and-data     |
| PERF-026 | P1       | Add responsive route/language transitions and intent loading | `proposed` | Medium, offline-sensitive | PERF-017                     | service-navigation |
| PERF-027 | P1       | Remove remaining per-fragment MDX reader overhead            | `proposed` | Medium                    | PERF-017                     | service-runtime    |
| PERF-028 | P2       | Pilot coarse service `content-visibility`                    | `proposed` | High                      | PERF-027                     | service-runtime    |
| PERF-029 | P2       | Refine service-resolved MDX loading packs                    | `proposed` | High, offline-sensitive   | PERF-017, PERF-027           | mdx-build          |
| PERF-030 | P3       | Prototype a compact static-reader content representation     | `deferred` | High, offline-sensitive   | PERF-029                     | mdx-build          |
| PERF-031 | P1       | Reduce first-open menu and search latency                    | `proposed` | Low, offline-sensitive    | PERF-017                     | service-navigation |
| PERF-032 | P2       | Evaluate replacing swipeable-views gesture handling          | `deferred` | High                      | PERF-017, PERF-020, PERF-021 | calendar-runtime   |
| PERF-033 | P1       | Physical-device and long-session retention validation        | `proposed` | Low                       | PERF-017                     | validation         |

## Execution waves

### Wave A — Establish the missing evidence

1. PERF-017

Exit: process-cold installed startup, real-touch scrolling, first-versus-warm
interactions, cold language/parallel transitions, and longer retention runs all
produce machine-readable artifacts.

### Wave B — Remove critical-window contention

1. PERF-018
2. PERF-019
3. PERF-020
4. PERF-021

PERF-018 and PERF-019 share `client.tsx` and must not be implemented concurrently
in the same worktree. Their A/B measurements may be prepared independently.

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

### Wave F — Structural decisions and release proof

1. PERF-030 only if the preceding results leave a demonstrated parse/evaluate or
   React-fiber bottleneck.
2. PERF-032 only if real-touch measurements still show swipe-handler cost.
3. PERF-033 after each retained wave and before release.

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

Execution notes: not started.

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

Execution notes: not started.

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

Execution notes: not started.

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

| Unit     | Status  | Owner / agent | Started | Branch / worktree | Baseline artifact        | Latest result / blocker | Next handoff                |
| -------- | ------- | ------------- | ------- | ----------------- | ------------------------ | ----------------------- | --------------------------- |
| PERF-017 | `ready` | Unassigned    | —       | —                 | Existing service reports | Awaiting execution      | Build startup/touch harness |

## Decision log

| Date       | Unit     | Decision     | Evidence / notes                                                                                                                                          |
| ---------- | -------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-08-05 | Plan     | Created      | Prioritize returning startup, background contention, real-touch scrolling, active-only calendar rendering, then long-service containment.                 |
| 2026-08-05 | Plan     | DX guardrail | Keep established abstractions, including select controls, unless trace attribution and conclusive older-device measurements justify the maintenance cost. |
| 2026-08-05 | PERF-030 | Deferred     | Static-reader representation is justified only after lower-risk runtime and packing experiments.                                                          |
| 2026-08-05 | PERF-032 | Deferred     | Current synthetic scrolling is smooth; real-touch evidence must isolate remaining swipe cost first.                                                       |
