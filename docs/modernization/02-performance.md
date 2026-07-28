# Plan 02 — Frontend Performance

Status: In progress

Scope: Browser-side performance without backend or offline implementation changes

## Objective

Improve startup time, interaction responsiveness, rerender cost, and long-term caching while demonstrating that current offline behavior remains intact.

## Tracker

| ID | Unit | Status | Offline-sensitive |
| --- | --- | --- | --- |
| PERF-001 | Create the performance baseline | `in-progress` | No |
| PERF-002 | Lazy-load non-core routes | `done` | Yes |
| PERF-003 | Fix measured render and lifecycle waste | `done` | No |
| PERF-004 | Reduce startup and compatibility cost | `done` | Yes |
| PERF-005 | Optimize static assets | `done` | No |

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

| Date | ID | Baseline | Result | Pull request / commit |
| --- | --- | --- | --- | --- |
| 2026-07-28 | PERF-001 | 543,191 B initial JS gzip | Reproducible report added; runtime/mobile traces remain | This branch |
| 2026-07-28 | PERF-002–004 | 1,999,966 B raw / 543,191 B gzip | 1,673,473 B raw / 483,303 B gzip; offline smoke passes | This branch |
| 2026-07-28 | PERF-005 | 17 audited assets | 88,026 raw asset bytes removed with visual validation | This branch |
