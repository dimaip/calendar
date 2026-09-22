# MOD-01 — Runtime-preserving foundation

Status: `in-review`; merge and deployment not authorized.

## Included

- Node 24 default, Yarn 1.22.22, Node 22/24 GitHub CI, and repair of the obsolete
  Node 7 CircleCI job. Existing application build/deploy commands stay unchanged.
- TypeScript 5.9.3, ESLint 9.39.5 flat config, typescript-eslint 8.65.0,
  Prettier 3.9.6, compatible lint plugins and aligned React 18 declaration packages.
- Remove obsolete lint presets/parsers/plugins. Keep runtime, Babel, Webpack,
  MDX, Workbox, React, router, query, styling and native libraries unchanged.
- Shared button uses canonical React button/ref types. Theme inputs are typed;
  its exported type derives from the existing return value. No runtime adapters,
  theme memoization, providers, hook behavior or controls change.
- Frontend test discovery, calendar/MDX/presentation characterizations, strict
  TypeScript subset and per-file lint/type debt ratchets.
- Three existing calendar bugs are executable TODOs, not silently fixed:
  Easter after 2099, November 7 time-of-day boundary and date-key collisions.
  MOD-04 owns individual review of those corrections.

## Tooling caveat

ESLint 9 is the newest version supported by the inspected React/import/a11y plugin
peer ranges. ESLint 10 is current, but forcing unsupported plugin combinations is
excluded. ESLint 9 is EOL: this is an explicit bridge tracked in MOD-02, not a
security-remediation claim. Sources:
[support policy](https://eslint.org/version-support/),
[ESLint migration](https://eslint.org/docs/latest/use/migrate-to-9.0.0),
[TypeScript 5.9](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-9.html),
[Prettier 3](https://prettier.io/blog/2023/07/05/3.0.0).

Existing runtime peer warnings remain, notably Material UI 4 with React 18. No
runtime vulnerability audit or claim that all dependencies are current is included.

## Scope and output gates

`yarn verify:scope` compares against the confirmed rollback commit. It checks all
runtime/build/native package ranges and their required/optional lockfile closure,
excluding type declarations. Shared transitive drift fails even when top-level
ranges remain unchanged. Application/content/platform/backend/build/delivery
source is frozen except tests and the two permitted type-only files. Babel type
erasure must produce identical code for those files. Original runtime/build/deploy
commands are also frozen.

GitHub CI builds both revisions with their own frozen installs and identical
release/environment values. `scripts/compare-build-output.mjs` requires identical
production filenames and bytes, including MDX chunks, styles, images and HTML.
Only source maps and the four existing random shell revision values in the worker
are excluded. Worker logic, manifest URLs, other revisions and added/missing files
are **not** ignored. This gate is specific to MOD-01: later approved runtime units
must explicitly revise it with replacement evidence, not weaken it to turn CI green.

## Verification ledger

| Check                          | Status                      | Evidence / notes                                                             |
| ------------------------------ | --------------------------- | ---------------------------------------------------------------------------- |
| Node 24 install                | Passed                      | Frozen runtime resolution graph; original peer warnings retained             |
| Source/dependency gate         | Passed                      | 1,587 selectors; 2,259 protected source files at baseline                    |
| Production build, Node 24.18.0 | Passed                      | Original Webpack 5.76.0; size/Browserslist warnings retained                 |
| Production equivalence         | Passed locally              | 1,938 non-map files; same main/runtime/vendor and MDX chunks                 |
| Frontend tests                 | Passed with TODOs           | 36 passing, 3 known calendar TODOs; 915 RU / 836 CSJ files checked           |
| Guard tests                    | Passed                      | 7 tests: runtime/transitive drift, erased types and shell revisions          |
| Strict typecheck               | Passed                      | Button, theme, presentation utilities                                        |
| Whole-project ratchets         | Passed against new baseline | 2,161 lint errors, 38 warnings, 1,039 TS diagnostics remain as explicit debt |
| Hosted CI                      | Pending                     | Link final results on PR                                                     |
| Browser smoke                  | Pending                     | Calendar and July 28 Liturgy                                                 |
| User QA / merge / deploy       | Pending                     | Separate authorization required                                              |

Ratchets enforce both total and per-file/rule or TS-code counts. They do not prove
all diagnostics are unchanged or all code is type-safe. Baseline updates require
diagnostic review; fatal lint parse errors and TS project/config failures cannot
be baselined. `yarn lint` remains the raw full-debt check; `yarn quality` is the
incremental gate plus a clean strict subset.

## Reproduce

```sh
nvm use
yarn install --frozen-lockfile
yarn verify:scope
yarn test
yarn test:tooling
yarn quality
yarn build
```

Build an isolated rollback checkout and the candidate with identical
`VERCEL_GITHUB_COMMIT_SHA` / `AWS_COMMIT_ID`, public URL and API settings; compare
their `www` directories. Never deploy a comparison build labelled with the baseline
commit: an authorized release must use its actual new commit ID.

## User QA and release gate

Record device, OS/browser, starting/candidate version, online waiting time and
pass/fail. Normally no cache-clearing action is allowed.

- [ ] Existing Chrome/iPhone updates without clearing data.
- [ ] Existing installed PWA updates separately without reinstalling.
- [ ] Ten future days remain available offline; no blank adjacent-day slides.
- [ ] Viewed covers and typicon icons survive offline close/reopen.
- [ ] July 28 Liturgy is complete; RU/CSJ/parallel, TOC, search, audio, notes and
      editor behave as baseline, including language changes and returning navigation.
- [ ] Uncached-date error does not prevent offline reopening, without touching
      recovery buttons. Cached dates/services still work afterward.
- [ ] Back/forward, scroll restoration, theme/preferences survive restart.
- [ ] Fresh-install behavior is checked separately; reconnect/refresh still allows
      new content through the unchanged refresh path.
- [ ] User authorizes merge/deploy; publish to Yandex S3 retaining old hashes,
      verify the live release version, repeat retained-install QA.

Desktop WebKit is not physical iPhone evidence. Label simulated connectivity and
hardware tests distinctly. The rollback's reported `Invalid Date` console warning
remains a separate investigation, not a fix included in MOD-01.
