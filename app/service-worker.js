import { precacheAndRoute } from 'workbox-precaching';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import * as googleAnalytics from 'workbox-google-analytics';

self.addEventListener('install', function(event) {
    event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
});

// Pre-cache main JS assets
precacheAndRoute(self.__WB_MANIFEST);

// Cache (pre-caching happens in precache.worker.js) api and static requests
registerRoute(new RegExp('/api/'), new StaleWhileRevalidate());
registerRoute(new RegExp('/assets/'), new CacheFirst());

googleAnalytics.initialize();
