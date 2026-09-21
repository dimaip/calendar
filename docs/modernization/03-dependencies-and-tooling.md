# Plan 03 — Dependencies and Tooling

Status: In progress

Scope: Frontend dependencies; backend, Workbox/offline, Capacitor, and TWA dependencies are excluded

## Objective

Upgrade libraries in compatibility groups so failures can be attributed and rolled back. Major ecosystems must be migrated separately.

## Upgrade rules

- Never run an unrestricted “upgrade everything” pull request.
- Update the lockfile only for the package group in scope.
- Record current and target versions in the implementation pull request.
- Run tests, production build, bundle comparison, and browser smoke tests for every group.
- Freeze `@capacitor/*`, `capacitor-data-storage-sqlite`, Workbox packages, and TWA tooling in this plan.
- Keep React at its current major until the surrounding type and library ecosystem is healthy.

## Tracker

| ID | Unit | Status | Expected risk |
| --- | --- | --- | --- |
| DEP-001 | Align the React type system | `done` | Low |
| DEP-002 | Low-risk dependency refresh | `done` | Low |
| DEP-003 | Modernize quality tooling | `done` | Medium |
| DEP-004 | Router migration | `done` | Medium |
| DEP-005 | Query-library migration | `done` | Medium |
| DEP-006 | UI and styling consolidation | `done` | Medium |
| DEP-007 | Retire obsolete leaf libraries | `in-progress` | Medium |
| DEP-008 | Build-tool decision | `deferred` | High |

## DEP-001 Align the React type system

Objective: eliminate conflicting React 17/18 type trees and make type errors actionable.

Work:

- Add explicit compatible root `@types/react` and `@types/react-dom` versions.
- Deduplicate transitive React types where the lockfile permits.
- Resolve MDX/React JSX type incompatibilities.
- Add missing declarations only at genuine untyped package boundaries.

Acceptance criteria:

- One intended React type version is used by application code.
- JSX-library incompatibility noise is eliminated.
- Runtime output is unchanged.

## DEP-002 Low-risk dependency refresh

Objective: reduce known vulnerabilities and staleness without taking major API migrations.

Work:

- Apply compatible patch/minor updates in small package groups.
- Start with build tooling and libraries with no runtime API changes.
- Review every runtime security advisory for reachability.
- Remove unused packages instead of upgrading them.
- Re-run the dependency audit and record changed advisory counts.

Acceptance criteria:

- No unexplained new transitive dependencies.
- Build, tests, bundle comparison, and browser smoke tests pass.
- Security findings are classified as fixed, unreachable, accepted temporarily, or deferred to a named major migration.

## DEP-003 Modernize quality tooling

Objective: upgrade TypeScript, ESLint, Prettier, and related plugins after the ratchets are in place.

Work:

- Upgrade one tool family at a time.
- Separate configuration-format changes from application fixes.
- Adopt a simpler modern configuration.
- Review newly enabled correctness and accessibility rules.

Acceptance criteria:

- Changed-file lint and incremental typecheck stay green.
- Whole-project debt does not increase.
- Formatting-only changes are isolated.

## DEP-004 Router migration

Objective: move away from React Router 5 while preserving every current hash URL and navigation behavior.

Work:

- Capture the current route table and deep-link browser tests.
- Introduce a routing adapter where useful.
- Migrate route declarations without feature refactors.
- Preserve redirects, history state, back links, scroll restoration, and update checks.

Acceptance criteria:

- Every existing public hash route resolves identically.
- Back/forward, direct deep links, and scroll restoration pass.
- Offline direct navigation passes after installation.

## DEP-005 Query-library migration

Objective: move from React Query 3 to the current TanStack package without changing the underlying offline cache.

Work:

- Centralize query keys and typed fetch functions first.
- Migrate provider and hooks mechanically.
- Preserve current retry and refetch policies.
- Do not replace or modify `cachedFetch` in this unit.

Acceptance criteria:

- Query keys are centralized and tested.
- Request counts and visible loading/error behavior remain equivalent.
- Existing IndexedDB/offline behavior is untouched.

## DEP-006 UI and styling consolidation

Objective: remove the mixed Emotion 10/11 and Material UI 4 dependency graph.

Work:

- Inventory actual Material UI and Emotion usage.
- Prefer replacing the small Material UI surface with owned primitives when cheaper than a major framework migration.
- Move theme typing and providers to one Emotion generation.
- Migrate by component group with visual regression coverage.

Acceptance criteria:

- Only one Emotion generation remains.
- Material UI is either current or removed.
- Bundle size improves or the retained cost is justified.
- Dark, light, narrow, and parallel-language snapshots pass.

## DEP-007 Retire obsolete leaf libraries

Candidate packages include:

- `react-hot-loader`
- `react-addons-css-transition-group`
- `react-tippy`
- `react-nice-dates`
- `react-swipeable-views`
- `react-pullable`
- legacy share/polyfill packages

Work:

- Handle one behavior at a time.
- Prefer platform APIs, maintained focused packages, or small owned components.
- Add interaction coverage before replacement.
- Remove unused packages immediately when confirmed unused.

Acceptance criteria:

- Each removed package has an explicit replacement or deletion rationale.
- Relevant interaction tests and visual checks pass.
- Dependency count and/or bundle size improves.

## DEP-008 Build-tool decision

Status: Deferred.

Vite is the likely candidate for a future static SPA build, but a migration changes MDX chunk generation and Workbox manifest integration even if service-worker source remains identical. It should be reconsidered only after M0–M3 are complete.

Decision inputs:

- Measured remaining Webpack build/startup pain
- MDX `import.meta.glob` proof of concept
- Identical full-corpus production manifest
- Identical offline install/update test results
- A rollback path that retains the Webpack build for at least one release

## Completion notes

| Date | ID | Package group | Result | Pull request / commit |
| --- | --- | --- | --- | --- |
| 2026-07-28 | DEP-001–003 | React 18 types, TypeScript 5.9, ESLint 9, and Prettier 3 | Tests, ratchets, and build pass | This branch |
| 2026-07-28 | DEP-004–006 | Router 7, TanStack Query 5, Emotion 11, and current MUI | Five browser journeys include deep links and offline reload | This branch |
| 2026-07-28 | DEP-002/007 | Conservative patch/minor refresh and confirmed-unused dependency removal | Legacy interactive leaf replacements remain | This branch |
