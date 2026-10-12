# Update build stability and transient storage recovery

Status: `ready-for-review`; not merged or deployed. Updated 2026-10-12.

## Scope and execution

| Unit                                | Status   | Result                                                                                                                                                       |
| ----------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Stable production dependency layout | Complete | Reject another checkout's symlinked `node_modules`; require a frozen deploy install. Development resolution is unchanged.                                    |
| Build reproducibility gate          | Complete | Compare full production filenames/bytes across checkout locations; verify a real UI-only edit preserves every numbered lazy chunk. Node 24 CI runs the gate. |
| Bounded precache retries            | Complete | Retry install-time HTTP 500/502/503/504 twice, after 1s and 2s; retain Workbox's final validation and activation barrier.                                    |
| Desktop retained-cache QA           | Complete | Actual compiled worker and updater, with a reduced local manifest; transient recovery, persistent failure, permanent 404 and offline cached reloads.         |
| Physical iPhone/browser/PWA QA      | Pending  | Test retained installations, without clearing data, before releasing. Desktop fixtures are not device evidence.                                              |
| Merge/deploy/production QA          | Pending  | Separate authorization; no deployment while provider storage is unstable.                                                                                    |
| Shell-first activation              | Deferred | Not implemented. Reconsider only if stable, incremental updates are still too slow.                                                                          |

## Evidence

- Node 24: 86 frontend tests pass, three pre-existing calendar TODOs; 14 tooling
  tests pass. Quality ratchets and strict TypeScript subset pass.
- Node 22: frontend/tooling/quality checks and the production build pass. The
  final legacy-transformed retry tests and build-layout tests also pass.
- Two checkout locations produce 1,940 matching non-map production files. Only
  the four existing random shell revisions are normalized in the worker.
- A genuine UI heading edit changes the main bundle but leaves all 1,846 numbered
  lazy chunks byte-identical. This candidate also preserves those chunks' names
  and bytes from the local `e353` production build.
- Transient fixture: the new asset returns 500 twice, then 200. Three requests,
  exactly one automatic update reload, release B cached and usable offline,
  including fixture images. The unchanged asset is fetched only once across A/B.
- Persistent fixture: failed installation keeps release A and its active worker;
  there is no update-triggered reload, the failed response is not cached, and a
  deliberate offline reload still serves A and its previously viewed images.
- Permanent 404 fixture: one request, no retry, no activation or page reload.
- Browser QA caught the worker's missing legacy async runtime before release.
  Importing the already-installed runtime fixes it; tests now exercise the Babel
  legacy async transform as well as asserting the worker imports its runtime.

The local fixture uses the compiled production worker with a reduced manifest
and the actual transpiled update/activation modules. Its small test UI and images
do not validate calendar content, long-service rendering or physical iPhone
behavior. Local artifacts are under ignored `output/playwright/`.

## Preserved behavior and caveats

- Full precaching still precedes activation. Cache keys, manifest generation,
  old-worker fallback, image/API caching and explicit reload checks are unchanged.
- Retry request clones retain URL, credentials, cache mode and headers. Success,
  permanent errors, runtime requests and network exceptions are not retried.
- The limit is per install-time request, not a platform-wide outage retry loop.
  Chrome can initiate another installation on a subsequent page load, as before.
- The update UI still times out after two minutes; Chrome's independent worker
  installation may continue. No new page reload or notification loop is added.
- Older releases built with shared dependencies may still require a one-time
  large download. This prevents future build-path churn, not retroactive reuse
  of incompatible old chunk filenames.
- `yarn verify:build` leaves a synthetic `b17d` local build. It never uploads;
  an authorized `yarn deploy` rebuilds with the actual checked-out commit.
- No library versions, application components, backend, Capacitor or TWA changes.

## Release QA

- [ ] Hosted Node 22/24 checks pass.
- [ ] Retained Chrome/iPhone and installed PWA each complete one explicit update.
- [ ] A transient download error recovers; a persistent error leaves the old app
      usable without an automatic reload or repeating banner.
- [ ] Today and ten future cached days remain available offline.
- [ ] Viewed covers, typicon icons and a complete long RU/CSJ service survive an
      offline close/reopen; an uncached-date error does not clear working caches.
- [ ] Confirm incremental chunk reuse and update duration on the real devices.
- [ ] Merge/deploy only with authorization and stable delivery; repeat QA in prod.
