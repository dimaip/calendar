import 'regenerator-runtime/runtime.js';
import { PrecacheController, PrecacheRoute } from 'workbox-precaching';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import * as googleAnalytics from 'workbox-google-analytics';

import precacheRetryPlugin from './precacheRetryPlugin.js';
import installPrecache from './installPrecache.js';

googleAnalytics.initialize();

const precacheController = new PrecacheController({ plugins: [precacheRetryPlugin] });
precacheController.addToCacheList(self.__WB_MANIFEST);
registerRoute(new PrecacheRoute(precacheController, { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/, /^v$/] }));

self.addEventListener('install', function (event) {
    event.waitUntil(installPrecache(precacheController, event).then(() => self.skipWaiting()));
});
self.addEventListener('activate', function (event) {
    event.waitUntil(precacheController.activate(event).then(() => self.clients.claim()));
});

// const apiHostRegexp = process.env.API_HOST;
const publicUrlRegexp = process.env.PUBLIC_URL;

// Cache assets and icons
registerRoute(
    ({ url, request }) =>
        url.pathname.startsWith('/assets/') &&
        !['audio', 'video'].includes(request.destination) &&
        !/\.(mp3|m4a|ogg|wav|mp4|webm)$/i.test(url.pathname),
    new CacheFirst()
);
registerRoute(new RegExp(`^${publicUrlRegexp}/.*\\.(png|ico|svg)`), new StaleWhileRevalidate());
