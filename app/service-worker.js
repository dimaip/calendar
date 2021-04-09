import { precacheAndRoute } from 'workbox-precaching';
import { StaleWhileRevalidate, CacheFirst, NetworkOnly } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import * as googleAnalytics from 'workbox-google-analytics';

googleAnalytics.initialize();

self.addEventListener('install', function (event) {
    // Activate without waiting for all tabs to close
    event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', function (event) {
    // Take over other tabs
    event.waitUntil(self.clients.claim());
});

console.log('Precaching routes:', self.__WB_MANIFEST);
// Pre-cache main JS assets
precacheAndRoute(self.__WB_MANIFEST);

const apiHostRegexp = process.env.API_HOST;
const publicUrlRegexp = process.env.PUBLIC_URL;

// Cache (pre-caching happens in precache.worker.js) api and static requests
registerRoute(new RegExp(`^${apiHostRegexp}/clear-cache`), new NetworkOnly());
registerRoute(new RegExp('/built/version.json'), new NetworkOnly());
// registerRoute(new RegExp('^https://psmb.ru'), new StaleWhileRevalidate());
registerRoute(new RegExp('/assets/'), new CacheFirst());
registerRoute(new RegExp(`^${publicUrlRegexp}/.*\\.(png|ico|svg|json)`), new StaleWhileRevalidate());
