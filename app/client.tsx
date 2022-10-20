// Signals to script in index.html that the app assets have been loaded
// import './wdyr';
import './forEachPolyfill';
import 'array-flat-polyfill';
import 'unfetch/polyfill/index.js';
import 'element-closest-polyfill';
import 'regenerator-runtime/runtime.js';
import './sharePolyfill';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppContainer } from 'react-hot-loader';
import App from 'containers/App';
import { RecoilRoot } from 'recoil';
import TagManager from 'react-gtm-module';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import * as serviceWorker from './serviceWorker';
import Worker from './precache.worker.js';

import './redirectToHome';
import { isCapacitor } from 'utils/deviceInfo';
import precache from 'precache.ts';

window.APP_LOADED = true;
const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
    if (!window.Sentry) {
        window.Sentry = {};
    }
    Sentry.init?.({
        dsn: 'https://e5296954a22242bc85d59b9a36559c44@o360342.ingest.sentry.io/3629452',
        integrations: [new Integrations.BrowserTracing()],
        release: `molitva.app@${VERSION}`,

        tracesSampleRate: 0.1,
    });
    TagManager.initialize({
        gtmId: 'GTM-MSCF98P',
        events: {
            namesOpen: 'Names Open',
            namesSubmit: 'Names Submit',
        },
    });
}

let preloadedState = {};

try {
    preloadedState = localStorage.getItem('persistedState') ? JSON.parse(localStorage.getItem('persistedState')) : {};
} catch (e) {
    console.warn(e);
}

const rootElement = document.getElementById('react-root');
const root = createRoot(rootElement);
const render = (Component) => {
    return root.render(
        <RecoilRoot>
            <AppContainer>
                <Component />
            </AppContainer>
        </RecoilRoot>
    );
};

render(App);

if (module.hot) {
    module.hot.accept('containers/App', () => {
        render(App);
    });
}

if (isProd) {
    serviceWorker.register();
}
if (isCapacitor()) {
    precache();
} else {
    const precacheWorker = new Worker();
    precacheWorker.postMessage('precache');
}

window.addEventListener('beforeinstallprompt', (e) => {
    e.userChoice.then((choiceResult) => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'A2H',
            outcome: choiceResult.outcome,
        });
    });
});
