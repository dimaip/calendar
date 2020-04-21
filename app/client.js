import 'core-js';
import 'unfetch/polyfill';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from 'redux/store/configureStore';
import App from 'containers/App';
import * as serviceWorker from './serviceWorker';
// @ts-ignore
import Worker from './precache.worker.js';
import * as Sentry from '@sentry/browser';
import TagManager from 'react-gtm-module';
import './redirectToHome';
const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
    Sentry.init({ dsn: 'https://e5296954a22242bc85d59b9a36559c44@sentry.io/3629452' });

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

    const precacheWorker = new Worker();
    precacheWorker.postMessage('precache');
}

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
