# Frontend Modernization Roadmap

Last updated: 2026-08-05

Overall status: In progress; service-performance implementation and PERF-017
measurement are complete, PERF-018 was cancelled with immediate behavior
retained, and PERF-019 is underway

Current milestone: M3 — Continue targeted modernization

This roadmap modernizes the frontend incrementally while preserving the behavior that has accumulated over the life of the application.

## Scope guardrails

### In scope

- Frontend performance and bundle size
- Dependency and developer-tooling upgrades
- Type safety, linting, maintainability, and architecture
- Unit, integration, component, and browser test coverage
- Build reliability and frontend CI
- Refactors that preserve current product behavior

### Explicitly out of scope

- PHP/backend changes
- Service-worker strategy or activation changes
- Offline storage semantics changes
- Capacitor or native iOS upgrades
- Android TWA upgrades
- Replacing the current MDX content model
- Product redesigns or new product features

The out-of-scope areas may get separate plans later. They must not be pulled into a frontend work unit merely because a dependency upgrade makes it convenient.

## Offline preservation rule

Offline-sensitive chunk changes may proceed, but offline behavior is a hard
release gate. The service-worker strategy and activation behavior remain
unchanged. Any offline-sensitive unit may proceed only when:

1. The service-worker source is unchanged.
2. A production build succeeds.
3. The existing build still precaches the complete generated application corpus.
4. The offline browser smoke test passes before and after the change.
5. The change is reverted if offline behavior cannot be shown to be equivalent.

## Status values

| Status        | Meaning                                           |
| ------------- | ------------------------------------------------- |
| `proposed`    | Defined, but not yet approved for execution       |
| `ready`       | Approved and all prerequisites are satisfied      |
| `in-progress` | Currently being implemented                       |
| `blocked`     | Cannot proceed; the blocker must be recorded      |
| `done`        | Acceptance criteria and verification are complete |
| `deferred`    | Intentionally postponed                           |
| `cancelled`   | No longer planned, with the reason recorded       |

Status should be updated in both this master table and the detailed workstream file.

## Working rules

- One work-unit ID should normally map to one pull request. This first execution
  branch groups the approved initial units into one commit by request, while
  retaining independent acceptance checks for each subsystem.
- A pull request should not mix dependency upgrades with architectural refactors unless the upgrade requires the refactor.
- Record baseline and final measurements in the pull request for performance work.
- Preserve current URLs, stored user state, MDX output, and public behavior unless a separate product decision approves a change.
- Avoid mass lint autofixes. Mechanical cleanup must be separated from behavioral changes.
- Do not chase a coverage percentage by testing implementation details.
- Every completed unit must leave the branch buildable and releasable.

Reference: [frontend state ownership](./frontend-state-ownership.md) records the durable-state and global compatibility contracts that refactors must preserve.

The next measured performance round is coordinated in
[the older-device and perceived-performance plan](./06-older-device-and-perceived-performance.md).

## Master work-unit tracker

| ID       | Work unit                                                    | Status        | Risk                      | Depends on                  | Plan                                                                                                                                        |
| -------- | ------------------------------------------------------------ | ------------- | ------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| FND-001  | Pin and document the frontend runtime                        | `done`        | Low                       | —                           | [Foundation](./01-foundation-and-ci.md#fnd-001-pin-the-runtime)                                                                             |
| FND-002  | Repair package scripts and frontend CI                       | `done`        | Low                       | FND-001, TEST-001           | [Foundation](./01-foundation-and-ci.md#fnd-002-repair-scripts-and-ci)                                                                       |
| FND-003  | Make linting a useful incremental gate                       | `done`        | Low                       | FND-002                     | [Foundation](./01-foundation-and-ci.md#fnd-003-establish-a-lint-ratchet)                                                                    |
| FND-004  | Establish an incremental TypeScript gate                     | `done`        | Medium                    | FND-002, DEP-001            | [Foundation](./01-foundation-and-ci.md#fnd-004-establish-a-typescript-ratchet)                                                              |
| PERF-001 | Record bundle and runtime baselines                          | `done`        | Low                       | FND-002                     | [Performance](./02-performance.md#perf-001-create-the-performance-baseline)                                                                 |
| PERF-002 | Add route-level code splitting                               | `done`        | Medium, offline-sensitive | TEST-005, PERF-001          | [Performance](./02-performance.md#perf-002-lazy-load-non-core-routes)                                                                       |
| PERF-003 | Fix measured render and lifecycle waste                      | `done`        | Low                       | PERF-001, TEST-003          | [Performance](./02-performance.md#perf-003-fix-measured-render-and-lifecycle-waste)                                                         |
| PERF-004 | Remove obsolete startup code and polyfills                   | `done`        | Medium, offline-sensitive | PERF-001, DEP-001, TEST-005 | [Performance](./02-performance.md#perf-004-reduce-startup-and-compatibility-cost)                                                           |
| PERF-005 | Optimize static assets and delivery metadata                 | `done`        | Low                       | PERF-001                    | [Performance](./02-performance.md#perf-005-optimize-static-assets)                                                                          |
| PERF-006 | Finish the reproducible service benchmark and budgets        | `done`        | Low                       | PERF-001                    | [Service performance](./service-performance-study.md#perf-006--benchmark-and-budgets)                                                       |
| PERF-007 | Enable compressed immutable delivery for hashed assets       | `done`        | Low                       | PERF-006                    | [Service performance](./service-performance-study.md#perf-007--static-delivery)                                                             |
| PERF-008 | Remove avoidable service-entry and inactive-feature work     | `done`        | Low–medium                | PERF-006                    | [Service performance](./service-performance-study.md#perf-008--service-entry-and-inactive-features)                                         |
| PERF-009 | Stabilize MDX import caching and failure handling            | `done`        | Low                       | PERF-006, TEST-004          | [Service performance](./service-performance-study.md#perf-009--mdx-import-cache)                                                            |
| PERF-010 | Remove repeated per-fragment effects and subscriptions       | `done`        | Medium                    | PERF-006, TEST-003          | [Service performance](./service-performance-study.md#perf-010--repeated-fragment-work)                                                      |
| PERF-011 | Replace TOC polling with batched incremental updates         | `done`        | Medium                    | PERF-006, TEST-003          | [Service performance](./service-performance-study.md#perf-011--toc-architecture)                                                            |
| PERF-012 | Reduce data-query fan-out with explicit freshness rules      | `done`        | Medium                    | PERF-006, TEST-002          | [Service performance](./service-performance-study.md#perf-012--query-fan-out)                                                               |
| PERF-013 | Split optional service features and inspect vendor grouping  | `done`        | Medium, offline-sensitive | PERF-006, TEST-005          | [Service performance](./service-performance-study.md#perf-013015--structural-work)                                                          |
| PERF-014 | Generate measured coherent MDX chunk groups                  | `done`        | High, offline-sensitive   | PERF-009–013                | [Service performance](./service-performance-study.md#perf-013015--structural-work)                                                          |
| PERF-015 | Evaluate progressive parallel/below-fold rendering           | `cancelled`   | High, offline-sensitive   | PERF-011, PERF-014          | [Service performance](./service-performance-study.md#perf-013015--structural-work)                                                          |
| PERF-016 | Add field performance telemetry                              | `done`        | Low                       | PERF-006                    | [Service performance](./service-performance-study.md#perf-016--field-telemetry)                                                             |
| PERF-017 | Add installed-startup and real-touch measurement             | `done`        | Low                       | PERF-016                    | [Perceived performance](./06-older-device-and-perceived-performance.md#perf-017--installed-startup-and-real-touch-measurement-foundation)   |
| PERF-018 | Defer future-date precache contention                        | `cancelled`   | Medium, offline-sensitive | PERF-017                    | [Perceived performance](./06-older-device-and-perceived-performance.md#perf-018--defer-future-date-precaching-and-cache-refresh-contention) |
| PERF-019 | Defer analytics, tracing, Webvisor, and polyfills            | `in-progress` | Medium                    | PERF-017                    | [Perceived performance](./06-older-device-and-perceived-performance.md#perf-019--defer-analytics-tracing-webvisor-and-optional-polyfills)   |
| PERF-020 | Replace the global pull-to-refresh touch path                | `proposed`    | Medium                    | PERF-017                    | [Perceived performance](./06-older-device-and-perceived-performance.md#perf-020--replace-the-global-pull-to-refresh-touch-path)             |
| PERF-021 | Render one calendar slide during startup                     | `proposed`    | Medium                    | PERF-017                    | [Perceived performance](./06-older-device-and-perceived-performance.md#perf-021--render-one-calendar-slide-during-startup)                  |
| PERF-022 | Split below-fold calendar and optional home features         | `proposed`    | Medium, offline-sensitive | PERF-021                    | [Perceived performance](./06-older-device-and-perceived-performance.md#perf-022--split-below-fold-calendar-and-optional-home-features)      |
| PERF-023 | Remove avoidable UI libraries from the initial shell         | `proposed`    | Medium                    | PERF-017                    | [Perceived performance](./06-older-device-and-perceived-performance.md#perf-023--remove-avoidable-ui-libraries-from-the-initial-shell)      |
| PERF-024 | Defer optional auth, Convex, and native-platform code        | `proposed`    | High                      | PERF-017, PERF-023          | [Perceived performance](./06-older-device-and-perceived-performance.md#perf-024--defer-optional-auth-convex-and-native-platform-code)       |
| PERF-025 | Optimize persisted-state parsing and data revalidation       | `proposed`    | Medium, offline-sensitive | PERF-017                    | [Perceived performance](./06-older-device-and-perceived-performance.md#perf-025--cache-persisted-state-parsing-and-delay-data-revalidation) |
| PERF-026 | Add responsive route/language transitions and intent loading | `proposed`    | Medium, offline-sensitive | PERF-017                    | [Perceived performance](./06-older-device-and-perceived-performance.md#perf-026--responsive-routelanguage-transitions-and-intent-loading)   |
| PERF-027 | Remove remaining per-fragment MDX reader overhead            | `proposed`    | Medium                    | PERF-017                    | [Perceived performance](./06-older-device-and-perceived-performance.md#perf-027--remove-remaining-per-fragment-mdx-reader-overhead)         |
| PERF-028 | Pilot coarse service content visibility                      | `proposed`    | High                      | PERF-027                    | [Perceived performance](./06-older-device-and-perceived-performance.md#perf-028--pilot-coarse-service-content-visibility)                   |
| PERF-029 | Refine service-resolved MDX loading packs                    | `proposed`    | High, offline-sensitive   | PERF-017, PERF-027          | [Perceived performance](./06-older-device-and-perceived-performance.md#perf-029--refine-service-resolved-mdx-loading-packs)                 |
| PERF-030 | Prototype compact static-reader content                      | `deferred`    | High, offline-sensitive   | PERF-029                    | [Perceived performance](./06-older-device-and-perceived-performance.md#perf-030--prototype-a-compact-static-reader-content-representation)  |
| PERF-031 | Reduce first-open menu and search latency                    | `proposed`    | Low, offline-sensitive    | PERF-017                    | [Perceived performance](./06-older-device-and-perceived-performance.md#perf-031--reduce-first-open-menu-and-search-latency)                 |
| PERF-032 | Evaluate replacing swipeable-views gesture handling          | `deferred`    | High                      | PERF-017, PERF-020–021      | [Perceived performance](./06-older-device-and-perceived-performance.md#perf-032--evaluate-replacing-swipeable-views-gesture-handling)       |
| PERF-033 | Validate physical-device and long-session retention          | `proposed`    | Low                       | PERF-017                    | [Perceived performance](./06-older-device-and-perceived-performance.md#perf-033--physical-device-and-long-session-retention-validation)     |
| PERF-034 | Stabilize retained heap over service/language cycles         | `proposed`    | Medium                    | PERF-017                    | [Perceived performance](./06-older-device-and-perceived-performance.md#perf-034--retained-heap-stabilization)                               |
| PERF-035 | Build a dedicated precache correctness harness               | `proposed`    | Medium, offline-sensitive | PERF-018                    | [Perceived performance](./06-older-device-and-perceived-performance.md#perf-035--precache-correctness-harness)                              |
| DEP-001  | Align React and TypeScript type packages                     | `done`        | Low                       | FND-002                     | [Dependencies](./03-dependencies-and-tooling.md#dep-001-align-the-react-type-system)                                                        |
| DEP-002  | Apply low-risk patch/minor upgrades                          | `done`        | Low                       | FND-002, TEST-001           | [Dependencies](./03-dependencies-and-tooling.md#dep-002-low-risk-dependency-refresh)                                                        |
| DEP-003  | Upgrade lint, format, and TypeScript tooling                 | `done`        | Medium                    | FND-003, DEP-001            | [Dependencies](./03-dependencies-and-tooling.md#dep-003-modernize-quality-tooling)                                                          |
| DEP-004  | Upgrade React Router separately                              | `done`        | Medium                    | TEST-005, QUAL-002          | [Dependencies](./03-dependencies-and-tooling.md#dep-004-router-migration)                                                                   |
| DEP-005  | Upgrade React Query separately                               | `done`        | Medium                    | TEST-002, QUAL-001          | [Dependencies](./03-dependencies-and-tooling.md#dep-005-query-library-migration)                                                            |
| DEP-006  | Consolidate Emotion and UI dependencies                      | `done`        | Medium                    | TEST-004, QUAL-003          | [Dependencies](./03-dependencies-and-tooling.md#dep-006-ui-and-styling-consolidation)                                                       |
| DEP-007  | Replace obsolete leaf dependencies                           | `in-progress` | Medium                    | TEST-003, TEST-005          | [Dependencies](./03-dependencies-and-tooling.md#dep-007-retire-obsolete-leaf-libraries)                                                     |
| DEP-008  | Decide the future build tool                                 | `deferred`    | High, offline-sensitive   | All M0–M3 units             | [Dependencies](./03-dependencies-and-tooling.md#dep-008-build-tool-decision)                                                                |
| QUAL-001 | Introduce typed API/domain boundaries                        | `done`        | Medium                    | TEST-001, DEP-001           | [Code quality](./04-code-quality-and-architecture.md#qual-001-type-the-boundaries-first)                                                    |
| QUAL-002 | Stabilize routing and application-shell boundaries           | `done`        | Medium                    | TEST-005                    | [Code quality](./04-code-quality-and-architecture.md#qual-002-stabilize-the-application-shell)                                              |
| QUAL-003 | Split oversized feature modules                              | `in-progress` | Medium                    | TEST-002, TEST-003          | [Code quality](./04-code-quality-and-architecture.md#qual-003-split-large-modules-by-responsibility)                                        |
| QUAL-004 | Remove accidental globals and lifecycle leaks                | `in-progress` | Low                       | TEST-003                    | [Code quality](./04-code-quality-and-architecture.md#qual-004-remove-accidental-global-state)                                               |
| QUAL-005 | Document and enforce state ownership                         | `done`        | Medium                    | QUAL-001, TEST-002          | [Code quality](./04-code-quality-and-architecture.md#qual-005-clarify-state-ownership)                                                      |
| TEST-001 | Consolidate the frontend test command                        | `done`        | Low                       | FND-001                     | [Testing](./05-test-coverage.md#test-001-create-one-test-entry-point)                                                                       |
| TEST-002 | Expand calendar and data-hook tests                          | `done`        | Low                       | TEST-001                    | [Testing](./05-test-coverage.md#test-002-domain-and-data-tests)                                                                             |
| TEST-003 | Add component and interaction tests                          | `in-progress` | Low                       | TEST-001                    | [Testing](./05-test-coverage.md#test-003-component-tests)                                                                                   |
| TEST-004 | Add MDX compile and render coverage                          | `done`        | Medium                    | TEST-001                    | [Testing](./05-test-coverage.md#test-004-mdx-contract-tests)                                                                                |
| TEST-005 | Add browser regression smoke tests                           | `done`        | Medium                    | TEST-001                    | [Testing](./05-test-coverage.md#test-005-browser-smoke-suite)                                                                               |
| TEST-006 | Introduce coverage ratchets                                  | `deferred`    | Low                       | TEST-002, TEST-003          | [Testing](./05-test-coverage.md#test-006-coverage-ratchet)                                                                                  |

## Milestones and execution order

### M0 — Trustworthy baseline

Goal: make failures visible without modifying product behavior.

1. FND-001
2. TEST-001
3. FND-002
4. DEP-001
5. FND-003
6. PERF-001
7. TEST-005

Exit criteria:

- A clean checkout has a documented runtime and repeatable install.
- CI runs build, all existing tests, and baseline validation.
- Bundle measurements are stored and compared.
- A browser smoke test covers the core route and one offline reload without changing offline code.

### M1 — Characterization and safe cleanup

Goal: cover existing behavior before structural changes.

1. TEST-002
2. TEST-003
3. TEST-004
4. QUAL-004
5. DEP-002
6. FND-004

Exit criteria:

- Calendar logic, core interactions, and MDX loading have regression coverage.
- New or modified TypeScript code is typechecked.
- Lifecycle leaks and clearly dead code are removed.

### M2 — Performance and maintainability

Goal: improve user-visible performance without changing data/offline semantics.

1. PERF-003
2. QUAL-001
3. QUAL-002
4. PERF-002
5. PERF-004
6. PERF-005

Exit criteria:

- Initial JavaScript is materially smaller than the recorded baseline.
- No regression in the browser/offline smoke suite.
- API and domain shapes are typed at their boundaries.

### M3 — Major library migrations

Goal: replace obsolete frontend infrastructure one subsystem at a time.

1. DEP-003
2. DEP-004
3. DEP-005
4. QUAL-003
5. DEP-006
6. DEP-007
7. QUAL-005
8. TEST-006

Exit criteria:

- Each major migration has its own before/after verification.
- Legacy dependencies are removed where replacement value is clear.
- State ownership is documented and enforced.

### M4 — Build-tool decision

DEP-008 remains deferred until the earlier milestones are complete. A bundler migration changes chunk generation and therefore carries more offline risk than the other frontend work. It should be a separate decision and project.

## Current execution snapshot

- Production build: passes on Node 22 with Webpack 5.
- Initial JavaScript: 1,512,607 bytes raw / 437,057 bytes gzip.
- Initial JavaScript reduction: 487,359 bytes raw / 106,134 bytes gzip
  (19.54% gzip) from the audit baseline.
- Workbox precache: 1,555 verified local URLs / 7,712,284 bytes.
- Frontend tests: 62 unit/contract tests plus seven production-browser journeys.
- Quality ratchets: ESLint and TypeScript diagnostic totals both decreased from
  their modern-tooling baselines; the strict TypeScript seed passes.
- Offline chunk verification: unvisited route, optional search, full Zlatoust,
  Church Slavonic, and parallel static chunks load fully offline with no failed
  hashed requests and no service-worker source changes. PERF-017's stricter
  semantic gate is intentionally separate: unvisited Russian passes, while
  unvisited Church Slavonic and parallel still lack production-prefetched
  Church Slavonic parts and `91Slavic` readings.
- PERF-017 final evidence: `perf-017-older-phone-final-i` passes all ten selected
  scenarios over three older-phone runs with stable semantic shapes and no
  integrity-analysis issues. Its immutable copied build verifies 1,555/1,555
  Workbox entries and 44/44 required future-day IndexedDB keys. Key p75s are
  617.8 ms process-cold online launch-to-ready, 561.1 ms process-cold offline
  launch-to-date-ready, 614.0 ms cold parallel complete, and 1,149.6 ms cold
  parallel TOC ready. `perf-017-trace-final-k` captured and wrote a passing
  real-touch trace with 18 categories and the same harness fingerprint.
- Default PERF-017 comparisons intentionally exclude retention and strict
  first-ever-offline all-language validation; both run separately so their
  different provisioning and failure semantics stay visible. The twenty-cycle
  `perf-017-retention-final-j` diagnostic passes its 78,655.7 B/cycle heap-slope
  limit and listener/observer/node gates, but fails retained heap at 13.27%
  versus the 10% limit; PERF-034 owns stabilization without weakening either
  gate. Strict first-ever offline Church Slavonic and parallel remain a known
  gap because production precaching omits Church Slavonic parts and individual
  `91Slavic` readings.
- PERF-018 is cancelled with no retained product change. The final conclusion
  uses fresh same-session three-run reports: `perf-018-immediate-core-smoke-3-a`
  as control and the route-ready and idle `core-smoke-3-a` candidates with their
  matching comparison JSON. Route-ready cold-online process readiness is
  608.93 ms p75 versus 561.64 ms immediate (8.42% slower); idle-after-ready is
  595.39 ms (6.01% slower). Route-ready also regresses task, persisted complete,
  TOC, and persisted task by 7.03%, 8.46%, 5.16%, and 10.66%; idle regresses
  them by 5.79%, 8.37%, 5.69%, and 8.73%. Both preserve semantic and
  offline-compatible shapes but fail the target and safeguards, so immediate
  behavior remains. The first older saved comparison was temporally confounded
  and is excluded from this decision.
- PERF-035 proposes a dedicated empty/missing-corpus and physical Capacitor
  correctness harness before any precache concurrency, persistence, or
  deduplication product change. It must preserve the exact 44-key, ten-day
  corpus, worker/Capacitor split, service worker, and every offline gate; later
  candidates still require the global evidence threshold.
- PERF-019 is claimed against the fresh immutable three-run core smoke in
  `perf-018-immediate-core-smoke-3-a` (build `190017db…`, harness `17ba5e44…`).
  Its p75 anchors are 561.64 ms cold-online process readiness with 183.5 ms
  script / 368.7 ms task; 542.55 ms cold-offline process-to-date with 190.9 ms
  script / 376.2 ms task; 284.67 ms warm navigation with 121.7 ms script /
  256.4 ms task; and persisted-parallel 795.95 ms complete, 1,329.4 ms TOC,
  1,350.3 ms ready, 387.7 ms script, 758.2 ms task, 170.5 ms longest task, and
  CLS 0.0161. Initial JavaScript is 1,516,050 B decoded / 439,000 B gzip, 1,943 B
  above the review gate. The first candidate removes only BrowserTracing while
  retaining Sentry errors and every other subsystem. Its bundle is 29,513 B raw
  / 8,726 B gzip smaller, but its first timings and follow-up control are
  invalid because Spotlight indexing drove host load above 180 on ten logical
  CPUs. Experience report schema 3 now fails before artifact creation above
  0.75 load per logical CPU, checkpoints immediately before each measured
  scenario after setup, requires the exact checkpoint sequence, equal CPU
  capacity, and comparable one-/five-minute load, and creates no-index artifact roots.
  It also provides an opt-in, CPU-only, hash-verified five-script vendor replay
  with exact-once browser execution, fail-closed external routing, a bounded
  quiet window, disposable-clone unregistration plus blocking of an installed
  intercepting service worker, and fixture identity checks across reports.
  Normal installed/offline scenarios remain service-worker-controlled. No live
  vendor bodies or runtime result are claimed, and transfer/network/service-worker
  cost remains out of scope. The candidate remains undecided until a clean
  reverse-order rerun passes.
  Because the harness blocks/stubs third-party remote execution, Yandex/GTM
  remote costs require a separate controlled diagnostic.
- Older-phone complete Liturgy with production-like gzip: 4.16 s complete /
  5.72 s settled, with the exact deterministic 67-heading content shape.
- Static delivery now has Brotli/gzip server compression, gzip static-deploy
  preparation, immutable hashed-asset caching, and revalidating shell/version
  metadata. Real-host header validation remains a deployment check.

Machine-readable measurements are in
[performance-report.json](./performance-report.json) and
[service-performance-report.json](./service-performance-report.json), with the
post-implementation comparison in
[service-performance-implementation-summary.json](./service-performance-implementation-summary.json).

The version 3 benchmark reproduces cold, reload, warm, hot, language, parallel,
TOC, scroll, search, and retention measurements.
