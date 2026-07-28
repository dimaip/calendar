# Plan 01 — Foundation and CI

Status: Complete

Scope: Frontend tooling only

## Objective

Create reliable, incremental quality gates before dependency or architecture work begins. This plan intentionally does not require fixing every historical lint or type error at once.

## Tracker

| ID | Unit | Status | Expected size |
| --- | --- | --- | --- |
| FND-001 | Pin the runtime | `done` | Small |
| FND-002 | Repair scripts and CI | `done` | Small |
| FND-003 | Establish a lint ratchet | `done` | Medium |
| FND-004 | Establish a TypeScript ratchet | `done` | Medium |

## FND-001 Pin the runtime

Objective: make local and CI installs use the same supported Node and package-manager versions.

Work:

- Select the supported Node LTS at execution time.
- Add the repository runtime declaration used by local tools and CI.
- Pin Yarn 1 for the initial modernization phases; changing package manager is not part of this unit.
- Document install, build, test, and production-build commands in the root README.
- Confirm a clean install from the lockfile.

Acceptance criteria:

- A clean checkout can install dependencies without manual version guessing.
- Local and CI versions match.
- `yarn build` succeeds.
- No dependency versions are upgraded except those required for runtime compatibility.

## FND-002 Repair scripts and CI

Objective: replace the obsolete Node 7 job and nonexistent test command with a useful frontend pipeline.

Work:

- Run the standardized `test` script created by TEST-001.
- Run install, tests, production build, and artifact-size reporting in CI.
- Cache dependencies using both `package.json` and `yarn.lock`.
- Keep lint and whole-project TypeScript non-blocking until their ratchets exist.
- Store build warnings and bundle metrics as CI output.

Acceptance criteria:

- CI passes on the unchanged application.
- A deliberately failing test fails CI.
- A deliberately broken production build fails CI.
- CI does not mutate or deploy artifacts.

## FND-003 Establish a lint ratchet

Objective: prevent new lint debt while shrinking the existing baseline gradually.

Work:

- Repair the absolute-import resolver so valid `app` imports are not reported as missing.
- Separate formatting, correctness, accessibility, and type-aware lint rules.
- Remove obsolete or duplicated ESLint configuration.
- Run strict linting on changed files.
- Record the whole-project count as a non-regression metric until it reaches zero.
- Create follow-up units for genuine accessibility errors instead of globally disabling rules.

Acceptance criteria:

- A new lint violation in a changed file fails CI.
- Existing untouched violations do not block unrelated work.
- The whole-project violation count cannot increase.
- No mass autofix is mixed with behavioral changes.

## FND-004 Establish a TypeScript ratchet

Objective: turn TypeScript into a progressive safety system rather than a permanently red command.

Work:

- Fix React type duplication and missing root type packages first.
- Create an incremental typechecked scope for domain modules, new code, and modernized features.
- Expand that scope as each feature is touched.
- Track the whole-project diagnostic count without blocking unrelated work.
- Do not weaken `strict` settings to make the number smaller.

Acceptance criteria:

- New TypeScript modules are checked in strict mode.
- Modified modules cannot add diagnostics.
- The typechecked project grows monotonically.
- The production build remains unchanged.

## Completion notes

Record completed pull requests and relevant decisions here:

| Date | ID | Result | Pull request / commit |
| --- | --- | --- | --- |
| 2026-07-28 | FND-001–004 | Node/Yarn pinning, modern CI, fingerprinted lint/type ratchets, and strict seed implemented | This branch |
