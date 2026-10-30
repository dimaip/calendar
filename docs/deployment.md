# Static deployment

Run `yarn deploy` with Node 22 or 24, Yarn 1, `s3cmd` configured for the
`molitva.app` Yandex bucket, and curl 7.84 or newer.

The command keeps the existing stash/pull/install workflow (pull is now
fast-forward-only; installation uses the frozen lockfile). It builds using the checked-out commit as the release ID,
then uploads in this order:

1. Content-hashed `built/` assets with
   `Cache-Control: public, max-age=31536000, immutable`.
2. Other static assets with their existing default policy. Old remote files
   are retained so an older installed app can still load its chunks.
3. Verify shell JS/CSS against local bytes and the immutable cache policy.
   Re-upload only assets whose bytes match but whose cache headers are incorrect,
   then verify each repair. Correct assets, including those just uploaded by sync,
   are not uploaded again. A missing asset, content mismatch or failed repair
   stops the deployment before publishing the shell.
4. `index.html`, then `service-worker.js`, with `Cache-Control: no-cache`.
5. Verify the served shell and worker against local bytes and headers before
   publishing any version announcement.
6. `version`, `built/version`, and finally `built/version.json`, with
   `Cache-Control: no-cache`; verify these endpoints too.

Headers are attached during upload. Conditional repairs reuse the existing
verification requests; only repaired files require an extra verification request.
No metadata-only S3 copy permissions are needed. `no-cache` allows storage but
requires HTTP revalidation; it does not disable the service worker's offline Cache API.

## Stable build layout

Production builds require a checkout-local `node_modules` directory. Do not
symlink another checkout's dependencies into a worktree: resolved loader and
dependency paths become different webpack identifiers and can invalidate every
lazy MDX chunk even when its text is unchanged. Install dependencies separately
with `yarn install --frozen-lockfile`. Development builds are not restricted.
If `node_modules` is a shared symlink, remove only that link before installing;
do not remove its target. Deployment checks the layout before installation so
it cannot accidentally modify another checkout's dependencies. A fresh checkout
without dependencies is allowed to perform its first install.

`yarn verify:build` builds identical inputs in two checkout locations, rejects a
shared-dependency production layout, and inserts an unrelated rule before the
fixture's existing Webpack rules. It checks exact filenames/bytes (excluding
source maps and the four existing random shell revisions). It then makes a
UI-only edit in a disposable fixture and requires every numbered lazy chunk to
remain byte-identical. It does not upload anything, but replaces the local `www`
output with a synthetic test release; run `yarn deploy` to build the actual commit
before any authorized release. The fixture is removed afterward.

Webpack loader options have explicit, stable `ident` values. Their strings retain
the old generated names for compatibility with deployed chunk URLs; they must not
be renumbered when rules move. New loaders with options should get a unique, stable
identifier too. A fast tooling test checks JavaScript, TSX, MDX, and worker loader
identities when an unrelated rule is inserted, and the full build check verifies
the resulting files. Both checks run in CI.

## Transient precache errors

The worker retries install-time HTTP 500, 502, 503 and 504 responses at most twice,
after one and two seconds. It preserves the original request options and caches
only the final successful response. Permanent errors and runtime image/API requests
are not retried. If the final attempt still fails, installation fails and the old
worker remains active. Successfully prepared entries can be reused on the next
installation attempt.

Full precaching still precedes activation; no shell-first/background activation
or automatic page reload is introduced. The update UI's existing two-minute
timeout is unchanged and does not cancel Chrome's independent installation.

`yarn deploy:dry-run` prints the upload plan for the existing `www/` build
without building, changing Git, uploading, or making network requests.
`yarn deploy:verify` checks that existing build against production without
uploading. Both reject a missing, `dev`, or inconsistent release identity.

A failed upload or verification exits nonzero. If shell verification fails,
the new version is not advertised. S3 uploads are not transactional: shell
objects may already be replaced, so inspect the failure and rerun the deployment
or restore the previous release. Verification does not replace offline/device
QA and does not check every lazy chunk's existing metadata; new or changed
hashed uploads receive the immutable policy.
