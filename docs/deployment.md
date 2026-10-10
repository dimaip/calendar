# Static deployment

Run `yarn deploy` with Node 22 or 24, Yarn 1, `s3cmd` configured for the
`molitva.app` Yandex bucket, and curl 7.84 or newer.

The command keeps the existing stash/pull/install workflow (pull is now
fast-forward-only). It builds using the checked-out commit as the release ID,
then uploads in this order:

1. Content-hashed `built/` assets with
   `Cache-Control: public, max-age=31536000, immutable`.
2. Other static assets with their existing default policy. Old remote files
   are retained so an older installed app can still load its chunks.
3. Shell JS/CSS via PUT, even if unchanged, to repair missing cache metadata.
4. `index.html`, then `service-worker.js`, with `Cache-Control: no-cache`.
5. Verify the served shell, worker and shell assets against local bytes and
   headers before publishing any version announcement.
6. `version`, `built/version`, and finally `built/version.json`, with
   `Cache-Control: no-cache`; verify these endpoints too.

Headers are attached during upload. No metadata-only S3 copy permissions are
needed. `no-cache` allows storage but requires HTTP revalidation; it does not
disable the service worker's offline Cache API. Worker code and cache handling
are unchanged.

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
