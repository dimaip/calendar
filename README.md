# Orthodox Calendar

## Installation

First get this up and running (see its readme):
https://github.com/dimaip/calendar-backend

Then:

```
git clone https://github.com/dimaip/calendar
cd calendar
yarn
yarn start
```

Or `yarn build` for production build.

## iOS releases

Use the [iOS release workflow](docs/ios-release.md) to upload to TestFlight or submit an App Store update.

## Service audio

See [service recordings and word alignment](docs/service-audio.md) for playback behavior and the optional local annotation workflow.

## Broadcast schedules

Admins manage one-off and weekly broadcasts at `/#/admin/broadcasts`.
Enter the start date and time in Moscow time; viewers see their local time.
Weekly broadcasts repeat on the starting weekday until deleted. Individual
occurrences can be edited or cancelled. A stream URL is optional and falls back
to the channel homepage. App admins are listed by their Zitadel user IDs in the
Convex `UPDATES_ADMIN_USER_IDS` environment variable.

CI runs frontend and backend tests, tooling tests, the existing quality ratchets,
and a production build on Node 22 and 24. The modernization-only scope and
byte-equality gates remain available for future runtime-preserving tooling work;
intentional feature changes are checked by the regular verification workflow.
## iOS live updates

The iOS 1.0.47 shell uses Capacitor 8 and requires iOS 15 or later and Xcode 26
or later. Build the bundled app with `yarn cap-build` and open the workspace
with `yarn cap-open`. The first release with the updater goes through the
normal App Store process.

The shell starts with its bundled web assets, or with the last installed
update. In the foreground it checks the manifest for its exact iOS marketing
version. Capgo verifies the ZIP against its SHA-256 digest and stages it for
installation when the app enters the background. If React fails to acknowledge
startup within 20 seconds of a foreground launch, Capgo returns to the last
working bundle. The WebView origin and the on-device request-cache database
stay the same across updates.

### Package and publish

Use a clean checkout and build the exact commit intended for release. Prepare
the artifact outside `www` and keep the ZIP and manifest together.

```sh
VERCEL_GITHUB_COMMIT_SHA="$(git rev-parse HEAD)" yarn build
yarn ios:updates prepare 1.0.47 ./output/ios-release
yarn ios:updates publish ./output/ios-release
```

`prepare` only writes local files. `publish` uses the web deployment's
`s3cmd` configuration and requires `curl`. It verifies the ZIP served by
`molitva.app` before updating the manifest at
`/ios-updates/1.0.47/manifest.json`. The checks rely on HTTPS and the integrity
of the manifest in the deployment bucket. Web deploys use their own version
pointer.

Test the candidate on a TestFlight build before publishing to a marketing
version used by App Store installations. For an isolated channel, give the QA
build a distinct marketing version and target that version when preparing the
candidate. Promote a bundle only to native versions verified with that web
build. Native bridge changes or updates requiring a newer shell belong in a
new App Store build. Use live updates for fixes and content within the reviewed
app's purpose. Disclose the updater in the review notes.
[App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
[Apple Developer Program License Agreement](https://developer.apple.com/support/terms/apple-developer-program-license-agreement/)

### Pause and recover

`yarn ios:updates pause 1.0.47` stops new downloads for that version. It cannot
recall bundles already staged on a device. To recover from a release that
renders successfully but behaves incorrectly, publish the saved artifact from
the last good iOS release. Use the same marketing version as the affected
channel. Devices check again at launch or on returning to the foreground,
with a five-minute interval between checks during the same session.

Before the first App Store rollout, install the TestFlight build over the
current release on a physical iPhone. Check that sign-in, saved settings, and
cached services survive the upgrade. Test a first launch without connectivity,
opening a previously cached service offline, applying an update after
backgrounding, and returning to the prior bundle after a deliberately broken
update on the QA channel.
