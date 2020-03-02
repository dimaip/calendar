import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from 'redux/store/configureStore';
import App from 'containers/App';
import * as serviceWorker from './serviceWorker';
// @ts-ignore
import Worker from './precache.worker.js';

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

serviceWorker.register();

const precacheWorker = new Worker();
precacheWorker.postMessage('precache');
