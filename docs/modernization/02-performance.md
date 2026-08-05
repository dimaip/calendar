# Plan 02 — Frontend Performance

Status: Implemented; production deployment validation pending

Scope: Browser runtime, static delivery, and offline-safe chunking. Backend, Capacitor, TWA, and service-worker behavior remain unchanged.

## Objective

Improve startup time, interaction responsiveness, rerender cost, and long-term caching while demonstrating that current offline behavior remains intact.

## Tracker

| ID       | Unit                                                        | Status      | Offline-sensitive |
| -------- | ----------------------------------------------------------- | ----------- | ----------------- |
| PERF-001 | Create the performance baseline                             | `done`      | No                |
| PERF-002 | Lazy-load non-core routes                                   | `done`      | Yes               |
| PERF-003 | Fix measured render and lifecycle waste                     | `done`      | No                |
| PERF-004 | Reduce startup and compatibility cost                       | `done`      | Yes               |
| PERF-005 | Optimize static assets                                      | `done`      | No                |
| PERF-006 | Finish the reproducible service benchmark and budgets       | `done`      | No                |
| PERF-007 | Enable compressed immutable delivery for hashed assets      | `done`      | No                |
| PERF-008 | Remove avoidable service-entry and inactive-feature work    | `done`      | No                |
| PERF-009 | Stabilize MDX import caching and failure handling           | `done`      | No                |
| PERF-010 | Remove repeated per-fragment effects and subscriptions      | `done`      | No                |
| PERF-011 | Replace TOC polling with batched incremental updates        | `done`      | No                |
| PERF-012 | Reduce data-query fan-out with explicit freshness rules     | `done`      | No                |
| PERF-013 | Split optional service features and inspect vendor grouping | `done`      | Yes               |
| PERF-014 | Generate measured coherent MDX chunk groups                 | `done`      | Yes               |
| PERF-015 | Evaluate progressive parallel/below-fold rendering          | `cancelled` | Yes               |
| PERF-016 | Add field performance telemetry                             | `done`      | No                |

## PERF-001 Create the performance baseline

Objective: make performance changes measurable and reproducible.

Work:

- Generate machine-readable Webpack build statistics.
- Record raw and gzip size by entrypoint and major package.
- Record chunk count, service-worker precache count, and total precache bytes.
- Capture startup and navigation traces on a defined desktop and throttled-mobile profile.
- Record React render profiles for the main calendar page and a long service.
- Add non-blocking CI reporting, followed by budgets after two stable runs.

Initial proposed budgets:

- Initial JavaScript: first target below 450 KiB gzip, later target below 350 KiB.
- No work unit may increase initial JavaScript by more than 10 KiB gzip without explanation.
- No regression in core Web Vitals from the baseline profile.
- No increase in precache bytes without explicit review.

Acceptance criteria:

- Running one documented command reproduces the bundle report.
- Baseline artifacts identify the largest entrypoint contributors.
- CI displays a before/after size delta.

The long-service measurement methodology, results, budgets, bottleneck map, and
follow-up units are recorded in
[the full-service performance study](./service-performance-study.md).

## PERF-002 Lazy-load non-core routes

Objective: keep the calendar and prayer-reading path in the initial shell while deferring features that are not needed at startup.

Candidate routes:

- Profile
- Updates and update administration
- Hymns
- Sermon catalogue/detail
- Shared-version import
- Settings subfeatures that can load on demand

Work:

- Add route-level lazy boundaries one group at a time.
- Provide stable loading and error states.
- Measure each route group independently.
- Do not modify Workbox or service-worker source.

Acceptance criteria:

- Initial gzip size decreases by a recorded amount.
- Direct deep links work online and offline after installation.
- All generated route chunks remain in the production precache.
- Update and offline browser tests pass.

## PERF-003 Fix measured render and lifecycle waste

Objective: remove unnecessary work shown by profiling rather than adding speculative memoization.

Initial candidates:

- Move `history.listen` registration in `Routes.tsx` into an effect with cleanup.
- Audit global resize, scroll, popstate, and media-query listeners for cleanup and duplication.
- Keep QueryClient, Convex client, and OIDC manager lifetimes stable.
- Prevent context values and large derived arrays from being recreated unnecessarily.
- Profile long parallel-language services and TOC generation.
- Split expensive computation from presentational renders where the profiler demonstrates value.

Acceptance criteria:

- Every fix has a trace or regression test demonstrating the prior behavior.
- Listener counts do not grow after repeated navigation.
- Main-route and long-service commits/renders improve or remain neutral.
- No blanket `React.memo` pass is introduced.

## PERF-004 Reduce startup and compatibility cost

Objective: remove code shipped only for obsolete environments.

Work:

- Define the supported browser/WebView matrix using available usage data.
- Remove `react-hot-loader` from the React 18 runtime.
- Remove unused preloaded-state code.
- Replace or remove legacy polyfills only when the support matrix allows it.
- Update Babel targets to the approved browser matrix.
- Verify whether the custom share polyfill is still needed on supported platforms.
- Keep a compatibility build only if real users require it.

Acceptance criteria:

- Each removed polyfill has a documented compatibility decision.
- Startup bundle size decreases.
- Browser smoke tests pass on every supported browser family.
- Offline smoke tests pass with unchanged service-worker source.

## PERF-005 Optimize static assets

Objective: reduce transfer and decode cost without changing application behavior.

Work:

- Identify oversized SVG and raster assets.
- Optimize losslessly first; document any visual compression.
- Confirm font files and weights are actually used.
- Avoid duplicate native/web copies in build inputs where possible.
- Ensure content-hashed assets receive immutable cache metadata in the frontend hosting configuration when that can be done without backend changes.
- Stop deploying public source maps after confirming the error-reporting upload flow.

Acceptance criteria:

- Visual comparison shows no unacceptable asset regressions.
- Asset bytes decrease or remain neutral.
- Error stack traces retain source mapping in the monitoring system.

## Explicit non-goals

- Rewriting `cachedFetch`
- Changing prefetch dates or concurrency
- Changing Workbox strategies
- Changing service-worker activation/update behavior
- Removing full-corpus offline availability

## Completion notes

| Date       | ID           | Baseline                                                          | Result                                                                             | Pull request / commit |
| ---------- | ------------ | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------- | --------------------- |
| 2026-07-28 | PERF-001     | 543,191 B initial JS gzip                                         | Reproducible report added; runtime/mobile traces remain                            | This branch           |
| 2026-07-28 | PERF-002–004 | 1,999,966 B raw / 543,191 B gzip                                  | 1,673,473 B raw / 483,303 B gzip; offline smoke passes                             | This branch           |
| 2026-07-28 | PERF-005     | 17 audited assets                                                 | 88,026 raw asset bytes removed with visual validation                              | This branch           |
| 2026-07-28 | PERF-006     | `origin/master`: 14.09 s complete liturgy                         | Current: 12.31 s; full protocol and interaction cases remain                       | This branch           |
| 2026-07-28 | PERF-006–016 | Pre-implementation current: 12.31 s uncompressed complete liturgy | Production-like gzip: 4.16 s complete / 5.72 s settled; 67-heading shape preserved | This branch           |

## Implementation result

The completed work is detailed in
[the full-service performance study](./service-performance-study.md) and its
[compact implementation summary](./service-performance-implementation-summary.json).

The primary three-run older-phone comparison, with the same 4× CPU and
1.6 Mbps profile but production-like gzip delivery, measured:

- 6.02 s → 4.16 s complete service commit after coherent liturgy chunking;
- 7.58 s → 5.72 s settled;
- 605,386 B → 543,712 B JavaScript transferred;
- 123 ms → 110 ms Total Blocking Time;
- identical 67-entry TOC order, IDs, labels, document height, and paragraph count.

The new initial entrypoint is 1,512,607 B raw / 437,057 B gzip. Workbox
precaches 1,555 URLs totalling 7.66 MB, down from 1,874 URLs / 7.77 MB before
the coherent liturgy grouping.

Installed/offline browser QA covers an unvisited lazy route, optional search
controls, the full Zlatoust liturgy, Church Slavonic, and parallel mode with no
failed content-hashed chunk requests.

Progressive below-fold or parallel rendering was not retained. The measured
parallel transition already reaches its complete commit in 122 ms and TOC
readiness in 848 ms on the primary older-phone profile. Deferring part of the
DOM would move work beyond the completion marker and create avoidable
find-in-page, print, anchor, and layout risks without a demonstrated need.

Remaining deployment checks:

- verify gzip or Brotli plus immutable headers on the real hosting path;
- verify field `web_vital` and `service_performance` events after release;
- compare production HTTP/2 field data with the deliberately conservative
  HTTP/1.1 lab server.
