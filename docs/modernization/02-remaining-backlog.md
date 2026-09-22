# Remaining work: individual decisions, not a restoration stack

All rows require review before execution. First QA/ship MOD-01 and confirm the
baseline still holds on iPhone. Owner is unassigned for all rows below. Each unit
is a separate review/rollback boundary; split listed independent fixes further.

## Recommended order and acceptance

| ID     | Unit / historical reference                                                          | Status     | Required evidence                                                                                                                                  | Offline approval                                                  |
| ------ | ------------------------------------------------------------------------------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| MOD-02 | Supported lint ecosystem and incremental debt (FND-003/004, DEP-003)                 | `proposed` | ESLint 10 plugin compatibility without suppressing checks; reviewed debt reductions; runtime-output equivalence                                    | No, tooling only                                                  |
| MOD-03 | Canonical type-only boundaries (DEP-001, QUAL-001)                                   | `proposed` | One response/component family; reuse actual shared models; identical erased JS, query keys and defaults                                            | Ask if data behavior changes                                      |
| MOD-04 | Calendar bugs, then extraction (QUAL-003, TEST-002)                                  | `proposed` | Review/fix each of the three TODOs separately; timezone/call-order fixtures; only then split calendar/fasting/feasts with differential outputs     | No persistent-cache changes; behavior fixes reviewed individually |
| MOD-05 | Emotion 10→11 (DEP-006)                                                              | `proposed` | Styling-only migration, no theme cache/performance refactor; light/dark/system/mobile/parallel visual comparison                                   | Ask if provider/startup lifecycle changes                         |
| MOD-06 | Material UI migration (DEP-006)                                                      | `proposed` | Compatible styling baseline; preserve controls; touch/keyboard/focus/portal/visual QA                                                              | Ask if lazy boundaries change                                     |
| MOD-07 | React same-major and leaf patch/minor updates (DEP-002)                              | `proposed` | One library family per PR; changelog/peer audit, targeted tests and output diffs. React major is a separate decision                               | Review network/persistence/startup effects first                  |
| MOD-08 | Confirmed-unused dependency removal (DEP-007)                                        | `proposed` | Prove no source/config/transitive use; compare emitted assets. No polyfill/hot-loader/gesture removal under this label                             | Ask for build/compatibility effects                               |
| MOD-09 | Audio lifecycle cleanup (PERF-003/010)                                               | `proposed` | Mount/unmount/listener tests, async HTML arrival, play/pause/seek, missing metadata and iOS touch. Investigate Invalid Date; do not assume a cause | No media/cache changes                                            |
| MOD-10 | TOC registry and stable IDs (PERF-011, QUAL-004)                                     | `proposed` | Same H2/H3 labels/order/selection, late/duplicate headings, unmount/language changes; measured polling/CPU reduction                               | Ask if MDX loader/recovery changes                                |
| MOD-11 | Language/context values and subscriptions (PERF-008/010/027)                         | `proposed` | One change at a time; identical complete text/editor behavior, profiler commits/subscribers and service timings                                    | Ask before load scheduling changes                                |
| MOD-12 | Inactive search/editor/notes work (PERF-008/031)                                     | `proposed` | Open/close/keyboard/scroll tests, inactive listener/observer counts. Preserve current chunk topology initially                                     | Ask before splitting/prefetch                                     |
| MOD-13 | Feature extraction / state ownership (QUAL-003/004/005)                              | `proposed` | Profile, UpdatesAdmin, catalogue separately; preserve state keys, auth checks/providers; canonical types and lifecycle tests                       | Ask before provider/persistence changes                           |
| MOD-14 | Independent measurement harness (PERF-001/006/017, TEST-003/005)                     | `proposed` | Adapt historical scripts to current DOM; explicit complete/usable readiness, valid traces, host-load controls, touch, fresh/retained profiles      | Testing allowed; runtime instrumentation reviewed separately      |
| MOD-15 | Theme/reading-list/render work (PERF-003/008/010)                                    | `proposed` | Measure commits first; independent changes, theme/navigation/text equivalence; memoization invalidation tests                                      | Ask before data/state lifetime changes                            |
| MOD-16 | Refresh/gesture hot paths (PERF-020/032)                                             | `proposed` | Physical scroll/swipe/refresh traces; preserve gestures/DX, symmetric cleanup; replacement only with demonstrated benefit                          | Required for refresh semantics                                    |
| MOD-17 | Calendar startup slides (PERF-021/022)                                               | `proposed` | First usable frame, swipe continuity, adjacent-date readiness/images; one-slide experiment separate from below-fold splitting                      | Required: scheduling/fetch implications                           |
| MOD-18 | React Router migration (DEP-004)                                                     | `proposed` | Every hash route/redirect, back/forward/history/scroll/version-check timing characterized first                                                    | Required: offline navigation/update lifecycle                     |
| MOD-19 | Query types/keys/policies and library migration (DEP-005, PERF-012/025)              | `deferred` | Cache hit after offline reload, miss/retry/reconnect/mount/focus and eventual freshness. Keep React Query 3 until approved                         | Required even if cachedFetch source stays identical               |
| MOD-20 | MDX promise cache / failed-import recovery (PERF-009/027, TEST-004)                  | `deferred` | Missing/cached chunks, repeat failure/retry, complete RU/CSJ/parallel corpus, error→return/restart; no whole-app unmount surprise                  | Required                                                          |
| MOD-21 | Root providers / route error boundaries (QUAL-002, PERF-024)                         | `deferred` | Isolate failed features, preserve rendered content and auth/preferences, characterize recovery. Do not restore the previous global boundary        | Required                                                          |
| MOD-22 | Polyfills / Babel / Webpack / MDX / CSS build tools (DEP-008, PERF-004)              | `deferred` | One compiler/loader family; syntax/corpus/assets/older iOS and retained-install tests. Vite is a later separate decision                           | Required                                                          |
| MOD-23 | Route/feature splitting and coherent chunks (PERF-002/013/014/022/029)               | `deferred` | Noticeable measured benefit before adoption; full manifest and existing-install update proof; retain old hashes                                    | Required                                                          |
| MOD-24 | Progressive/parallel rendering, visibility and intent preload (PERF-015/026/028/030) | `deferred` | Do not automatically revive rejected experiments. Reading position, search/TOC, printing/a11y, complete text and readiness                         | Required                                                          |
| MOD-25 | Images, compression and delivery metadata (PERF-005/007)                             | `deferred` | Separate asset optimization from delivery; MIME/encoding and cached-image decoding, shell publication order, retained clients                      | Required                                                          |
| MOD-26 | Analytics/tracing deferral and telemetry (PERF-016/019)                              | `proposed` | Independent captures and CPU/network A/B; retain needed errors/events/privacy; no timing claims from noisy/blocked runs                            | Required for startup/polyfill/registration timing                 |
| MOD-27 | Long-session memory and hardware validation (PERF-033/034)                           | `proposed` | Repeated dates/services/languages/menus, heap retention, frame stalls, thermal/host noise; iPhone 11/16 and Android                                | Testing allowed; each fix reviewed by affected boundary           |
| MOD-28 | Precache scheduling / persisted revalidation (PERF-018/025/035)                      | `deferred` | Keep immediate ten-day behavior. Prior deferral was slower; new hypothesis/evidence required before revisiting                                     | Required                                                          |
| MOD-29 | Backend / Capacitor / TWA                                                            | `deferred` | Separate scope and platform/device suites                                                                                                          | Required; excluded from this effort for now                       |

Historical TEST-001/002/004 are partially recovered in MOD-01. TEST-003/005 belong
to MOD-14 and every affected unit. PERF-023 (UI shell weight) spans MOD-05/06/08;
it does not authorize replacing controls. FND-001/002 are recovered by MOD-01;
other old `done` units above remain unshipped after rollback. Read historical code
at `365fa6e7`; do not import its broad package manifest, lockfile or status ledger.

## Performance evidence before adoption

Use the current shipped build as control. Record commits, Node/browser/device/OS,
network, install/cache state, CPU throttling, host load and warm/cold distinctions.

- Returning startup: process-cold and warm, online/offline, first visible content,
  first usable calendar, cover display, interaction delay and long tasks.
- July 28 Liturgy: first readable text, complete text/headings/TOC, RU/CSJ/parallel,
  first language switch, retained scroll and memory across repeated visits.
- Perceived responsiveness: menu/search/editor first-open, tap-to-paint, date swipe,
  rapid and precision scroll, frame intervals, layout shifts and stalls.
- Resource costs: transfer/parsed JS, parse/evaluation time, request waterfalls,
  React commits/subscriptions, retained heap and cache size.

Use browser performance recordings/CDP, React profiling where useful, and real
devices. Prefer at least five valid counterbalanced runs; report median/p75 and
variability, never pool warm/cold cases. Set budgets from the baseline: an initial
noticeable threshold might be 10% **and** 50 ms in startup/service readiness, or a
clear reduction in interaction stalls. Agree the threshold before adopting a
change. Do not trade away complete content, controls, memory or offline availability.
For chunking, a transfer-size win alone is insufficient.

## Unit handoff template

```md
ID / status / owner / branch / PR:
Starting shipped commit:
Exact files and library family:
Hypothesis and maintenance/user benefit:
Offline-sensitive? Approval link if required:
Baseline evidence:
Candidate tests and measurements:
Known limitations / unresolved diagnostics:
User QA and release authorization:
Published commit/version; retention of previous assets:
Next action and rollback:
```

For an offline-sensitive proposal, explain why it is necessary, the smallest
change, what remains frozen, failure scenarios, and how existing installations
will receive/recover from it. Wait for approval before implementation. Explicitly
preserve both successful offline cache hits and eventual online content freshness.
