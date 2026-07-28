# Plan 04 — Code Quality and Frontend Architecture

Status: In progress

Scope: Incremental frontend refactoring with no product, backend, or offline behavior changes

## Objective

Make feature work safer by clarifying boundaries and reducing oversized, weakly typed modules. This is not a directory-reorganization project; files move only when a tested responsibility is extracted.

## Tracker

| ID | Unit | Status | Expected risk |
| --- | --- | --- | --- |
| QUAL-001 | Type the boundaries first | `done` | Medium |
| QUAL-002 | Stabilize the application shell | `done` | Medium |
| QUAL-003 | Split large modules by responsibility | `in-progress` | Medium |
| QUAL-004 | Remove accidental global state | `in-progress` | Low |
| QUAL-005 | Clarify state ownership | `done` | Medium |

## Target boundaries

These are conceptual ownership boundaries, not a requirement for an immediate directory rewrite:

- `domain`: pure calendar/service rules
- `data`: typed public-data hooks and query keys
- `content`: MDX loading and content components
- `platform`: browser/native capability access
- `features`: profile, readings, services, hymns, updates, habit tracking
- `app-shell`: providers, routing, theme, update UI, error boundaries

## QUAL-001 Type the boundaries first

Objective: gain safety where untyped data enters the application rather than annotating every presentational prop first.

Work:

- Define types for day, parts, readings, hymn, sermon, service, and app-config responses.
- Type query keys and hook return values.
- Type persisted frontend state shapes.
- Validate assumptions at development/test boundaries.
- Keep runtime validation separate from the frozen offline cache implementation.

Acceptance criteria:

- Core hooks no longer return `any`.
- Consumers cannot access nonexistent response properties without a type failure.
- Existing response fixtures satisfy the declared contracts.

## QUAL-002 Stabilize the application shell

Objective: make providers, routing, initialization, and error handling explicit before router or dependency migrations.

Work:

- Give the root provider tree named components and documented ownership.
- Move history listeners and initialization side effects into effects with cleanup.
- Add application and route error boundaries.
- Centralize route definitions and public-path constants.
- Preserve HashRouter and current URLs.

Acceptance criteria:

- Repeated renders do not accumulate listeners or clients.
- Provider initialization order is covered by a smoke test.
- Route loading failures produce a recoverable UI.

## QUAL-003 Split large modules by responsibility

Initial candidates:

- `Profile.tsx` — approximately 1,039 lines
- `getDayInfo.ts` — approximately 978 lines
- `UpdatesAdmin.tsx` — approximately 775 lines
- `Texts.tsx` — service catalogue and rule construction
- Large service and search components

Method:

1. Add behavior tests.
2. Identify named domain or UI responsibilities.
3. Extract one responsibility per pull request.
4. Keep state ownership at the feature boundary.
5. Avoid tiny one-off property/helper wrappers.

Acceptance criteria:

- Extracted modules represent real domain or feature concepts.
- Tests assert behavior rather than internal function calls.
- No unrelated formatting or dependency upgrades are included.

## QUAL-004 Remove accidental global state

Objective: reduce hidden coupling and browser lifecycle leaks.

Initial candidates:

- `window.TOC`
- `window.pullDownDisabled`
- custom history events and scroll globals
- direct `window.matchMedia` listeners
- analytics globals
- install-prompt state

Work:

- Wrap true platform capabilities in typed modules.
- Replace feature-level globals with owned context/state only where necessary.
- Ensure all listeners have symmetric cleanup.
- Retain direct access at simple call sites when an abstraction adds no value.

Acceptance criteria:

- Global declarations are reduced and documented.
- Repeated mount/unmount tests show no leaked listeners.
- Analytics and platform behavior remain equivalent.

## QUAL-005 Clarify state ownership

Objective: stop adding new overlap among component state, Context, Recoil, React Query, localStorage, and Convex.

Proposed ownership:

- Component state: temporary view state
- Context: stable feature/environment dependencies such as language and current service
- React Query: public remote data
- Recoil: existing cross-feature user preferences until a separate migration is justified
- Convex: its current authenticated features
- Direct localStorage: prohibited for new feature state unless it is behind an existing storage boundary

Work:

- Inventory each atom/context/query and its persistence/sync behavior.
- Document which system owns every durable state shape.
- Centralize new state keys and migrations.
- Avoid migrating Recoil merely for fashion; require a concrete problem and separate plan.

Acceptance criteria:

- New features have an obvious state home.
- No durable state is written by two independent systems without a documented synchronization contract.
- Existing stored state remains readable.

## Completion notes

| Date | ID | Extracted/changed boundary | Result | Pull request / commit |
| --- | --- | --- | --- | --- |
| 2026-07-28 | QUAL-001/002 | Typed API/query boundaries and named provider/error shell | Tests, quality, and browser smoke pass | This branch |
| 2026-07-28 | QUAL-003 | `getDayInfo.ts` split into calendar, fasting, feast/liturgy, and daily-selection modules | 16 calendar characterizations pass | This branch |
| 2026-07-28 | QUAL-004/005 | TOC lifecycle/global contract stabilized and state ownership documented | Remaining globals stay tracked | This branch |
