# Modernization restart

Status: MOD-01 under review; later units are proposals, not execution approval.

## Starting point and rules

Start from rollback #740: `4b2db35575a80db33eb09ddf70a8ee4c440d0369`, production
version `4b2d`. The user confirmed Chrome/iPhone once again has ten days available
ahead, caches covers when viewed, and retains typicon icons. Preserve this baseline.

The old #733–735 branches and their plans are historical references only. Do not
merge those branches or revert the rollback. Their old `done` statuses do not
carry forward. Unchanged service-worker source did not guarantee unchanged offline
behavior: query scheduling, startup, MDX loading, chunk output and HTTP delivery
also matter.

- New approved units start from current `master`. Copy only individually reviewed changes.
- First PR: development/type tooling, type-only changes and tests. No runtime migrations.
- Before changing offline-sensitive behavior, explain the need, exact scope,
  evidence, risks, acceptance tests and rollback; obtain explicit user approval.
  This includes query policies, storage, startup/registration timing, MDX loading,
  recovery, chunking, browser polyfills, assets and delivery—not just worker files.
- Backend, Capacitor and TWA stay out of scope until separately approved.
- Keep existing controls and DX. No native-select substitution without conclusive
  measurements of a critical benefit and an agreed tradeoff.
- One behavior or library family per later PR. Do not mix unrelated performance
  experiments with dependency upgrades. No mass application formatting.
- Review and device QA precede a separate merge/deploy authorization. Do not clear
  users' site data or reinstall PWAs as routine QA. Test fresh and retained installs
  separately. Approved releases must retain previous hashed assets.

## Coordination ledger

| Unit          | Status                  | Owner      | Branch                      | Next action                                      |
| ------------- | ----------------------- | ---------- | --------------------------- | ------------------------------------------------ |
| MOD-01        | `in-review`             | PR author  | `dimaip/safe-modernization` | CI, user QA, release decision                    |
| MOD-02 onward | `proposed` / `deferred` | Unassigned | None                        | Choose one after MOD-01 is shipped and confirmed |

Statuses: `proposed → approved → in-progress → in-review → qa-passed → shipped`.
Use `blocked` with a concrete blocker/next action; `deferred` means intentionally
unscheduled. Claim a unit with owner, branch, start date, prerequisites and evidence.
Opening or merging a PR does not mean it is shipped.

- [MOD-01 scope, verification and release checklist](01-runtime-preserving-pr.md)
- [Remaining work for individual review](02-remaining-backlog.md)

Historical plans and measurement scripts remain at commit `365fa6e7` under
`docs/modernization/` and `scripts/performance/`. Old timing results are leads, not
current performance claims; remeasure against the current shipped baseline.
