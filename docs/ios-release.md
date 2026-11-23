# iOS releases

Open **Actions → iOS release → Run workflow** on `master`. Enter the iOS
version, such as `1.0.46`, and select a target.

- **testflight** uploads a signed build and waits for App Store Connect to
  process it. Copy the build number from the run summary. Testers receive the
  build through the TestFlight groups configured in App Store Connect.
- **app-store** requires release notes and submits the selected build for App
  Review. The app publishes automatically after approval. Enter an existing
  TestFlight build number to submit the build you tested, or leave the field
  empty to build and upload from `master`. The release notes are applied to
  the existing App Store localizations.

From a terminal, run the workflow with GitHub CLI.

```sh
gh workflow run ios-release.yml -f target=testflight -f version=1.0.46
gh workflow run ios-release.yml -f target=app-store -f version=1.0.46 -f build_number=1 -f notes='Исправления и улучшения'
```

If Apple processes the upload but the release fails during submission, rerun
with the version and build number from the upload log. An existing draft for
another version must be resolved in App Store Connect before submission.

## One-time setup

In GitHub, create the **App Store** environment with a deployment branch rule
for `master` and set these environment secrets.

| Secret | Value |
| --- | --- |
| `ASC_KEY_ID` | Key ID of an App Store Connect team API key with the App Manager role |
| `ASC_ISSUER_ID` | Issuer ID from App Store Connect |
| `ASC_KEY` | Contents of the downloaded `.p8` file |
| `IOS_CERTIFICATE_BASE64` | Base64-encoded `.p12` containing the Apple Distribution certificate and its private key |
| `IOS_CERTIFICATE_PASSWORD` | Password used to export the `.p12` |
| `IOS_PROFILE_BASE64` | Base64-encoded App Store Connect provisioning profile for `com.pb.orthodox`, created in the Apple Developer portal with the distribution certificate |

Keep the files out of the repository. GitHub CLI can read the files directly
into the environment secrets.
[Create an App Store Connect provisioning profile](https://developer.apple.com/help/account/provisioning-profiles/create-an-app-store-provisioning-profile)

```sh
gh secret set ASC_KEY --env 'App Store' < /path/to/AuthKey_ID.p8
base64 < /path/to/distribution.p12 | tr -d '\n' | gh secret set IOS_CERTIFICATE_BASE64 --env 'App Store'
base64 < /path/to/distribution.mobileprovision | tr -d '\n' | gh secret set IOS_PROFILE_BASE64 --env 'App Store'
```

Complete Apple's export compliance questionnaire for the app, including its
SQLCipher dependency. To carry that declaration into future builds, set the
`IOS_USES_NON_EXEMPT_ENCRYPTION` environment variable in the GitHub environment
to the confirmed `true` or `false` value. If Apple issues a compliance code,
set it as `IOS_ENCRYPTION_COMPLIANCE_CODE`.
[Apple export compliance](https://developer.apple.com/help/app-store-connect/manage-app-information/overview-of-export-compliance)
