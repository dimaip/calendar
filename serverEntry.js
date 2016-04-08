import 'babel-polyfill';
import 'babel-core/register';
import FS from 'q-io/fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {Provider} from 'react-redux';
import {RouterContext, match} from 'react-router';
import getRoutes from 'reducers/routes';
import getStore from 'reducers/store';
import createLocation from 'history/lib/createLocation';

function sendResponse(res, html, initialState) {
  FS.read('index.html')
    .then(r => r.replace(/window\.__INITIAL_STATE__ = {};/, `window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};`))
    .then(r => r.replace(/<div id="app"><\/div>/, `<div id="app">${html}</div>`))
    .then(r => res.send(r))
    .catch(e => console.log(e));
}

function handleRender(req, res) {
  const store = getStore(true);
  const routes = getRoutes(store);
  const location = createLocation(req.url);
  match({routes, location}, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      res.status(500).send(error.message);
    } else if (renderProps === null) {
      res.status(404).send('Not found');
    } else {
      const promises = ['asdf'];
      renderProps && renderProps.routes.map(route => {
        if (route.onEnter) {
          promises.push(route.onEnter(renderProps));
        }
      });
      Promise.all(promises).then(
        () => {
          const html = ReactDOMServer.renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps}/>
            </Provider>
          );
          const initialState = store.getState();
          sendResponse(res, html, initialState);
        }
      );
    }
  });
}

export default handleRender;
