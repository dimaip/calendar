# Plan 05 — Frontend Test Coverage

Status: In progress

Scope: Characterize and protect current frontend behavior

## Objective

Build a focused test pyramid that enables modernization without attempting to snapshot every implementation detail.

## Proposed test stack

- Fast unit and component runner: decide between extending the current Node test setup and adopting Vitest during TEST-001
- DOM component tests: Testing Library
- Network fixtures: MSW or an equivalent test-only boundary
- Browser journeys: Playwright
- Accessibility: automated checks in component/browser tests

The runner decision must be based on MDX, TypeScript, startup cost, and migration effort. It is not permission to rewrite existing tests.

## Tracker

| ID | Unit | Status | Expected risk |
| --- | --- | --- | --- |
| TEST-001 | Create one test entry point | `done` | Low |
| TEST-002 | Domain and data tests | `done` | Low |
| TEST-003 | Component tests | `in-progress` | Low |
| TEST-004 | MDX contract tests | `done` | Medium |
| TEST-005 | Browser smoke suite | `done` | Medium |
| TEST-006 | Coverage ratchet | `deferred` | Low |

## TEST-001 Create one test entry point

Objective: make every existing frontend test run locally and in CI.

Depends on: FND-001.

Work:

- Include the current auth, renewal, and calendar tests.
- Standardize test discovery and exit behavior.
- Add a watch command for local work.
- Decide whether to retain Node's runner initially or migrate mechanically to Vitest.

Acceptance criteria:

- `yarn test` runs all existing tests.
- CI and local execution use the same command.
- Existing assertions remain semantically unchanged.

## TEST-002 Domain and data tests

Priority coverage:

- Calendar icon and feast selection
- Easter-offset and fixed-date service rules
- Leap dates and year boundaries
- Service catalogue enablement/redirect behavior
- Query keys and hook loading/error/success states
- Response-to-view-model transformations
- Authentication-independent data behavior

Approach:

- Add focused fixtures for known tricky dates.
- Add invariant/property-style checks over a broad date range.
- Do not snapshot entire pages when a small domain assertion is clearer.

Acceptance criteria:

- Every modified calendar rule requires a focused regression test.
- Data hooks have deterministic mocked-network tests.
- Domain tests run without a browser.

## TEST-003 Component tests

Priority interactions:

- Calendar navigation
- Language and parallel-language switching
- Settings menu and theme
- TOC opening and navigation
- In-page search
- Custom prayer add/edit/remove
- Script-version selection
- Profile authentication states
- Updates list/admin states
- Loading, empty, and error states

Acceptance criteria:

- Tests use accessible roles and user-visible behavior.
- No test depends on Emotion class names or component internals.
- Critical keyboard interactions receive coverage.

## TEST-004 MDX contract tests

Objective: protect the large content corpus without changing its loader or offline behavior.

Work:

- Compile every MDX file in CI.
- Verify that every dynamic source/language combination resolves.
- Detect missing imports and unsupported MDX components.
- Render each top-level service in its supported languages.
- Add representative structural snapshots for complex services and parallel mode.
- Report failures with the exact MDX path and dependency chain.

Acceptance criteria:

- A broken MDX import fails before deployment.
- Every top-level `index.dyn.tsx` loads successfully.
- Representative nested/parallel content renders without runtime errors.
- Production chunk/precache generation remains complete.

## TEST-005 Browser smoke suite

Objective: cover the small number of journeys whose correctness depends on a real browser.

Initial online journeys:

1. Open today's calendar.
2. Navigate to another date and back.
3. Open readings and a service.
4. Switch language and parallel mode.
5. Use TOC and in-page search.
6. Change a preference and verify persistence after reload.
7. Open a non-core deep link directly.

Offline preservation journey:

1. Build and serve the production application.
2. Visit online and wait for installation/precache completion.
3. Open a representative service and date.
4. Go offline and hard reload.
5. Reopen the core route, the service, and a lazy non-core route.
6. Assert that no required chunk or asset request fails.

This suite observes current offline behavior; it does not modify the service worker.

Acceptance criteria:

- Journeys run against the production build.
- Screenshots/traces are retained on failure.
- Offline smoke passes before any offline-sensitive work unit can merge.

## TEST-006 Coverage ratchet

Objective: improve meaningful coverage without creating a vanity target.

Work:

- Record coverage after TEST-002 and TEST-003.
- Require modified files not to reduce covered branches.
- Set stronger goals for pure domain modules than UI composition.
- Exclude generated Convex files, build output, polyfills, and declarations.

Suggested directional goals:

- Calendar/domain rules: 90% branch coverage
- Data transformation and reusable utilities: 80% branch coverage
- Whole frontend: start with the measured baseline, then ratchet toward 60–70% line coverage

Acceptance criteria:

- Coverage cannot decrease silently.
- Exceptions require a documented reason.
- Tests remain stable across harmless markup/refactor changes.

## Completion notes

| Date | ID | Coverage area | Result | Pull request / commit |
| --- | --- | --- | --- | --- |
| 2026-07-28 | TEST-001/002 | Unified discovery plus calendar, auth, and query-key tests | 37 tests pass | This branch |
| 2026-07-28 | TEST-004 | 1,523 dynamic references, 19 templates, and the language corpus characterized | Production MDX build passes | This branch |
| 2026-07-28 | TEST-003/005 | Accessible browser journeys for routes, MDX language, theme persistence, and offline reload | Five Playwright journeys pass | This branch |
| 2026-07-28 | TEST-006 | Coverage tooling deferred until component-test instrumentation is selected | No vanity baseline accepted | — |
