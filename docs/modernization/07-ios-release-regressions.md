# iOS release regression investigation

Updated: 2026-09-22. Release under investigation: `365fa6e7` on `https://molitva.app`.
Fix branch: `dimaip/offline-release-regression`. Nothing from this investigation has been deployed.

## Status and execution units

| ID | Work | Status | Evidence / next gate |
| --- | --- | --- | --- |
| IOS-001 | Restore persistent-cache reads after an offline event | Locally fixed and verified | Production reproduction; failing-then-passing query tests; Chromium and WebKit browser regression tests. Review and release pending. |
| IOS-002 | Prevent network mocks from masking offline failures | Implemented and verified | Installed-offline test seeds persistent data online, removes all network mocks, then disables the network. |
| IOS-003 | Verify Safari and installed PWA on affected iPhones | Pending device access | Paired iPhone 16 is unavailable to the Mac. Preserve its existing installation and caches. Need iOS versions and the exact offline failure screen. |
| IOS-004 | Diagnose reported 2 s / 6 s installed-app launches | In progress; no performance fix claimed | Desktop WebKit cold-process measurements below. Capture an actual iPhone launch trace before changing startup or chunking. |
| IOS-005 | Reduce time until a fresh install becomes offline-ready | Measured; design pending | Production WebKit installation took approximately 315 s for 1,555 entries. Preserve complete offline MDX coverage; do not replace this with on-demand-only caching. |
| IOS-006 | Give manual S3 releases a real version identity | Identified; not changed in this patch | Production reports `dev`; build identity currently only reads CI-specific SHA variables. Address before the next release and verify update detection, without clearing user data. |

## Confirmed regression: offline queries never reach IndexedDB

The upgrade from React Query 3 to TanStack Query 5 introduced a network gate before
query functions run. The application left the new default `networkMode: 'online'`
in place. After an `offline` event, a query without an in-memory result is paused,
even when `cachedFetch` could immediately read its result from persistent storage.

Production reproduction in Chromium:

1. Visit `/#/date/2026-07-01` online and load its content.
2. Navigate to `/#/date/2026-07-29` and reload, clearing QueryClient memory but not IndexedDB.
3. Disable the network, then navigate back to July 1 without reloading.
4. Date headings and navigation appear, but day content remains blank for the observation window.
5. Reconnect: content immediately appears.

Non-adjacent dates matter: the swipe view keeps neighbouring dates mounted, which
can mask this failure with in-memory data. Reload-only testing also misses the
transition: Query 5 initially assumes online until it receives a connectivity event.

The fix moves the existing QueryClient configuration into `app/data/queryClient.ts`
and sets `networkMode: 'offlineFirst'`. This allows the first query attempt, including
the IndexedDB lookup, while preserving offline pausing of network retries. Existing
freshness policies and per-query `retry: false` settings remain unchanged. No
service-worker, storage-schema, chunking, backend, or native-wrapper changes are included.

Three query tests cover a cached result, an uncached non-retrying failure, and
retry resumption after reconnection. The first two fail against the previous defaults.

## Service-worker findings and limitations

A fresh desktop WebKit profile loaded the exact manifest start URL,
`/?utm_source=homescreen&from_home`, from production. Its cache grew progressively
to 1,555 entries; activation was observed at approximately 315 seconds. Workbox 6's
installed implementation fetches these entries sequentially. This source behaviour
predates the release, so installation latency alone is not proof of a new regression.

The installed production shell successfully survived both an offline reload and a
complete browser-process restart when an external local proxy closed existing
connections and rejected all new network connections. Cached calendar content
also appeared. This verifies desktop WebKit with a completed installation, not the
state of an affected iPhone, an interrupted installation, or an upgrade from its old cache.

Playwright WebKit's `setOffline(true)` instead caused navigation to fail with
`WebKit encountered an internal error`. A separate minimal control, whose worker
responded with hard-coded HTML without using any network or Cache API, failed the
same way. That result is not classified as an application regression. CI uses WebKit
for the offline query transition and Chromium for installed-offline navigation;
physical iOS remains an explicit release gate.

Local diagnostic scripts are retained under ignored `output/playwright/`:
`ios-offline-diagnosis.mjs`, `offline-navigation-diagnosis.mjs`,
`webkit-offline-control.mjs`, and `webkit-proxy-offline.mjs`. They are exploratory
tools, not portable CI fixtures; the proxy probe uses the preserved local profile.

## Startup measurements: evidence, not an iPhone performance claim

Single-run observations on this Mac, desktop WebKit 26.5, 390 × 844 viewport,
production release, fully populated persistent profile, no CPU throttling:

| Milestone (milliseconds from navigation start) | Online cold browser process | Offline reload | Offline cold browser process |
| --- | ---: | ---: | ---: |
| Cached HTML response starts | 253 | 2 | 260 |
| Main bundle evaluated | 319 | 20 | 332 |
| Inline loader hidden | 396 | 48 | 410 |
| Primary date content ready | 517 | 73 | 537 |
| Above-fold stable | 579 | 203 | 595 |

These are diagnostic samples, not repeated A/B measurements or device benchmarks.
The cold-process path includes a substantial pre-HTML interval absent from a warm
reload. Inspect worker/process startup and cache access as well as JavaScript and
React work. The earlier `load` event took roughly 7.7 seconds despite much earlier
usable content; it is not a suitable perceived-readiness metric.

For each affected iPhone, capture at least five home-screen launches online and in
airplane mode, distinguishing resumed and terminated processes. Record a screen
video and Safari timeline/network trace, the existing readiness marks, worker state,
and cache availability. Compare the same route/date, account state, thermal state,
and installation state. Tap-to-visible-content time includes OS launch overhead
that navigation-relative browser marks omit.

## Verification and release checklist

- [x] Node 24.18.0 build and local verification.
- [x] Query tests fail with previous defaults and pass with `offlineFirst`.
- [x] Frontend unit tests and existing quality ratchets pass.
- [x] Full Chromium suite plus WebKit offline-transition check: 11 passed.
- [x] After removing offline network mocks, rerun offline journeys: 3 passed.
- [x] Production desktop WebKit external-network-blocked reload and cold restart.
- [ ] Capture affected iPhone behaviour before changing its installation.
- [ ] Verify candidate in Safari and installed PWA: cached date, long service,
      Russian/Church Slavonic/parallel text, offline transition, airplane-mode restart,
      reconnection, and update from the existing release.
- [ ] Review/merge the targeted fix, publish through `yarn deploy` to Yandex S3,
      verify deployed asset identity and repeat production QA.
- [ ] Do not close the incident or claim the launch-delay issue fixed until physical-device verification is complete.

Do not ask users to delete the PWA, clear site data, or purge caches as a diagnostic
shortcut: that destroys the affected upgrade state and potentially their offline data.
