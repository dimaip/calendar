import 'babel-polyfill';
import FS from 'q-io/fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {Provider} from 'react-redux';
import {RoutingContext, match} from 'react-router';
import routes from 'reducers/routes';
import getStore from 'reducers/store';
import createLocation from 'history/lib/createLocation';

const store = getStore();

function sendResponse(res, html) {
  FS.read('index.html')
    .then(r => r.replace(/<div id="app"><\/div>/, `<div id="app">${html}</div>`))
    .then(r => res.send(r))
    .catch(e => console.log(e));
}

function handleRender(req, res) {
  const store = getStore(true);
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
      renderProps.routes.map(route => {
        if (route.onEnter) {
          promises.push(route.onEnter(renderProps));
        }
      });
      Promise.all(promises).then(
        () => {
          const html = ReactDOMServer.renderToString(
            <Provider store={store}>
              <RoutingContext {...renderProps}/>
            </Provider>
          );
          sendResponse(res, html);
          // const initialState = store.getState();
          // res.send(renderFullPage(html, initialState));
        }
      );
    }
  });
}

export default handleRender;
