# Update prompt and reload-loop fix

Status: `in-review` (2026-10-07). Branch: `dimaip/fix-update-loops`.
Scope approved: update detection, dismissal, explicit installation and reload.
Merge and production deployment require a separate release decision.

## Evidence and boundaries

The reported behavior was a dismissed update banner returning on navigation.
The old close handler forgot the dismissal. Route listeners were also registered
during render without cleanup. Separately, `registration.update()` could resolve
before installation completed: reloading immediately could serve the old app and
offer the same update again. Its failure handler could also reload automatically.
Both behaviors were reproduced with retained production installations.

Preserve the worker's precache coverage/configuration, install/activate handlers, caching rules,
registration timing, IndexedDB content cache, ten-day prefetch, MDX/chunk loading,
runtime dependencies and deployment scripts. Never clear caches or unregister
workers as an update-recovery step. Do not use the old performance branches.

## Execution ledger

| Unit  | Status        | Scope / acceptance                                                                                                                                                |
| ----- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UP-01 | `implemented` | One cleaned-up route listener; remember a dismissed release for the tab's browsing session, including reloads; deduplicate version checks.                        |
| UP-02 | `implemented` | Click → updating indicator → wait for activation/controller takeover → verify newer cached app shell → exactly one reload. No reload on failure.                  |
| UP-03 | `blocked`     | Unit tests and Chromium upgrade/offline QA pass. WebKit automation has the same unusable precache on unmodified master; complete WebKit/device QA before release. |
| UP-04 | `pending`     | Review, retained-device QA, release authorization, merge/deploy and production QA.                                                                                |

## Behavior and safeguards

- Detection never reloads or forces worker installation. Version requests bypass
  the HTTP cache, share an in-flight request, have a ten-second timeout, and retain
  the automatic sixty-second throttle. Offline/network errors and unsupported
  lifecycle APIs remain silent; content refresh still works on older browsers.
- Dismissal is keyed by release, not a global "hide updates" flag. Another release
  can be offered. Session storage remembers dismissal across reloads; an in-memory
  fallback handles denied storage. A pending check cannot undo a dismissal.
- Settings "Обновить данные" and pull-to-refresh explicitly check for updates even
  if that release was dismissed. Existing content-refresh behavior is unchanged.
- Clicking "Обновить" shares one update operation and disables duplicate clicks
  and dismissal while it runs. Slow installation shows "Обновление…". There is no
  second confirmation or separate reload button.
- Installation, activation, registration/update waits and subsequent fetches are
  bounded by a two-minute attempt timeout. Failure leaves the app open with a
  retry/dismiss choice, not an automatic retry or reload.
- A newer advertised version alone is insufficient. Before reload, the active
  worker must control the page and serve an HTML shell referencing a different
  hashed main bundle. Preserve the actual entry URL, including homescreen query
  parameters. Missing/unchanged shells or a changed advertised release fail safely.
- Record the attempted release before reload. If delivery still serves the old
  document, automatic checks do not re-offer that release during the same session.
  Explicit manual checks remain available. No navigation causes another reload.
- Worker/controller and timeout listeners are removed on success and failure.
  Updating one tab does not force other tabs to reload; each user's click is local.

## Verification and release gates

Automated tests exercise the actual update module, not a duplicate implementation:
dismissal/reload persistence, different releases, manual override, denied storage,
in-flight dismissal, concurrent detection/clicks, offline retry, invalid versions,
network errors, slow registration/update/activation, redundant workers, changed
releases, old/missing/error shells, and a reload returning the old document.

Browser upgrade QA must use two production-mode builds at one origin, retaining
the original worker/caches. Do not clear site data between announcement and update.
Test both Chromium and WebKit. Deliberately delay and fail a newly hashed main
bundle download. Count document loads: zero before readiness/on failure; exactly
one after a successful explicit click. Dismiss, navigate repeatedly and reload;
ensure no banner recurrence. Test a second open tab separately.

After an update, verify online and offline navigation through all ten prefetched
days, a visited cover, typicon icons, a long dynamically loaded service, and an
uncached-date error followed by a cached app reload. Check that caches survive.

Physical-device release gate remains separate: retain an existing Android install
and iPhone Chrome/browser + homescreen PWA. Verify slow/failed update, dismissal,
one-click recovery and offline cold launch, without clearing storage or reinstalling.
Desktop WebKit is not proof of iPhone behavior. The first deployment delivers this
fix through the **old** prompt: an already-open old document cannot acquire the new
logic until the new worker finishes and the new app is loaded.

### Results

- Node 22 and 24 unit suites: 79 passed, including 22 new update tests; three existing TODOs.
- Tooling suite: seven passed.
- Quality ratchets and expanded strict TypeScript scope: passed without new debt.
- Node 22 and 24 production builds and Node 24 production-mode fixture builds: passed
  (existing bundle-size warnings only).
- Chromium: dismissal survives twelve navigations and a manual reload; delayed
  download causes zero reloads until ready, then exactly one; failed download
  causes zero reloads and an explicit retry recovers with one. Another open tab
  is not forcibly reloaded, and its own update click reloads it exactly once.
- Chromium offline after update: all eleven calendar days (today + ten ahead),
  a 67-heading service, ten viewed cover/icon URLs, and cached reload after an
  uncached-date error passed. The 1,859-entry precache and runtime caches survived.
  No unexpected page errors or dialogs.
- WebKit automation: **not passed**. With both HTTP and HTTPS fixtures, an activated
  worker is visible but the reported precache is empty and the old cached shell
  cannot be used for the upgrade. Do not interpret this as iPhone QA or silently
  skip readiness checks to obtain a pass. The same empty precache (zero keys;
  root response missing) was reproduced with an unmodified `master` build at
  `0edc7b94`, using the same HTTPS origin and runner. This is not a passing test
  or proof of an app regression. Repair/replace the runner or use retained
  physical-device QA before release.
- React review: route and worker listeners clean up; shared update status survives
  route changes; duplicate actions are disabled; existing controls/theme stay intact.
- Production remains unchanged.
