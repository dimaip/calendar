import { precacheAndRoute } from 'workbox-precaching';
import { StaleWhileRevalidate, CacheFirst, NetworkFirst, NetworkOnly } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import * as googleAnalytics from 'workbox-google-analytics';

self.addEventListener('install', function(event) {
    event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
});

googleAnalytics.initialize();

// Pre-cache main JS assets
precacheAndRoute(self.__WB_MANIFEST);

const apiHostRegexp = process.env.API_HOST;
const publicUrlRegexp = process.env.PUBLIC_URL;

// Cache (pre-caching happens in precache.worker.js) api and static requests
registerRoute(new RegExp(`^${apiHostRegexp}/clear-cache`), new NetworkOnly());
registerRoute(new RegExp('/built/version'), new NetworkFirst());
registerRoute(new RegExp(`^${apiHostRegexp}`), new StaleWhileRevalidate());
registerRoute(new RegExp('^https://psmb.ru'), new StaleWhileRevalidate());
registerRoute(new RegExp('/assets/'), new CacheFirst());
registerRoute(new RegExp(`^${publicUrlRegexp}/.*`), new CacheFirst());
