# Orthodox Calendar

## Frontend setup

The supported frontend toolchain is Node 24.18.0 and Yarn 1.22.22. With `nvm`:

```sh
nvm use
corepack enable
corepack prepare yarn@1.22.22 --activate
yarn install --frozen-lockfile
```

Start the backend described in the
[calendar-backend README](https://github.com/dimaip/calendar-backend), then run:

```sh
yarn start
```

## Verification

```sh
yarn test
yarn quality
yarn build
yarn analyze:bundle
```

`yarn test` discovers every frontend `*.test.mjs` file below `app`. The full historical
lint and TypeScript backlogs remain available through `yarn lint`; `yarn quality`
uses per-file diagnostic ratchets so that existing debt can decrease without
blocking unrelated work. Run `yarn quality:baseline` only when intentionally
accepting a reviewed baseline change.

`yarn analyze:bundle` reads the latest production build and reports initial raw
and gzip bytes, total JavaScript, and the generated precache footprint.

## Browser support

The web build targets maintained browsers with more than 0.5% global usage, the
latest two releases, and Firefox ESR. Browsers that their vendors no longer
support are excluded. This matches React 18's modern-browser baseline and avoids
shipping legacy ES5 polyfills in every initial load. Capacitor and TWA targets
remain unchanged and are verified through the production build and offline smoke
suite.
