import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from 'redux/store/configureStore';
import App from 'containers/App';
import * as serviceWorker from './serviceWorker';
// @ts-ignore
import Worker from './precache.worker.js';
import * as Sentry from '@sentry/browser';
import ReactGA from 'react-ga';
// ReactGA.pageview(window.location.pathname + window.location.search);
const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
    Sentry.init({ dsn: 'https://e5296954a22242bc85d59b9a36559c44@sentry.io/3629452' });
}

const preloadedState = localStorage.getItem('persistedState') ? JSON.parse(localStorage.getItem('persistedState')) : {};
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

if (module.hot) {
    module.hot.accept('containers/App', () => {
        render(App);
    });
}

if (isProd) {
    ReactGA.initialize('G-P4KC3YS7WG');
}

serviceWorker.register();

const precacheWorker = new Worker();
precacheWorker.postMessage('precache');
