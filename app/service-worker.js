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
const routes = [{ revision: '1', url: '/' }, { revision: '1', url: '/index.html' }, ...self.__WB_MANIFEST];
precacheAndRoute(routes);

// Cache (pre-caching happens in precache.worker.js) api and static requests
registerRoute(new RegExp('https://api\\.c\\.psmb\\.ru/clear-cache'), new NetworkOnly());
registerRoute(new RegExp('/built/version'), new NetworkFirst());
registerRoute(new RegExp('https://api\\.c\\.psmb\\.ru/.*'), new StaleWhileRevalidate());
registerRoute(new RegExp('/assets/'), new CacheFirst());
registerRoute(new RegExp('.*'), new CacheFirst());
