import { precacheAndRoute } from 'workbox-precaching';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
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

console.log('Precaching routes');
// Pre-cache main JS assets
precacheAndRoute(self.__WB_MANIFEST);

// const apiHostRegexp = process.env.API_HOST;
const publicUrlRegexp = process.env.PUBLIC_URL;

// Cache assets and icons
registerRoute(new RegExp('/assets/'), new CacheFirst());
registerRoute(new RegExp(`^${publicUrlRegexp}/.*\\.(png|ico|svg)`), new StaleWhileRevalidate());
