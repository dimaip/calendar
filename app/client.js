// Signals to script in index.html that the app assets have been loaded
// @ts-ignore
window.APP_LOADED = true;

import './wdyr';

import 'core-js';
import 'unfetch/polyfill';
import 'element-closest-polyfill';
import 'regenerator-runtime/runtime';
import './sharePolyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from 'redux/store/configureStore';
import App from 'containers/App';
import * as serviceWorker from './serviceWorker';
// @ts-ignore
import Worker from './precache.worker.js';
import TagManager from 'react-gtm-module';
import './redirectToHome';
const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
    // @ts-ignore
    if (!window.Sentry) {
        // @ts-ignore
        window.Sentry = {};
    }
    Sentry.init?.({
        dsn: 'https://e5296954a22242bc85d59b9a36559c44@o360342.ingest.sentry.io/3629452',
        release: 'molitva.app@' + VERSION,
    });
    TagManager.initialize({
        gtmId: 'GTM-MSCF98P',
    });
}

let preloadedState = {};

try {
    preloadedState = localStorage.getItem('persistedState') ? JSON.parse(localStorage.getItem('persistedState')) : {};
} catch (e) {
    console.warn(e);
}

const store = configureStore(preloadedState);
const rootElement = document.getElementById('react-root');

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component store={store} />
        </AppContainer>,
        rootElement
    );
};

render(App);

// @ts-ignore
if (module.hot) {
    // @ts-ignore
    module.hot.accept('containers/App', () => {
        render(App);
    });
}

if (isProd) {
    serviceWorker.register();
}

const precacheWorker = new Worker();
precacheWorker.postMessage('precache');

window.addEventListener('beforeinstallprompt', e => {
    // @ts-ignore
    e.userChoice.then(choiceResult => {
        // @ts-ignore
        window.dataLayer = window.dataLayer || [];
        // @ts-ignore
        window.dataLayer.push({
            event: 'A2H',
            outcome: choiceResult.outcome,
        });
    });
});
