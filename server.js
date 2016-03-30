import express from 'express';
import compression from 'compression';
import FS from 'q-io/fs';
import path from 'path';

// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
// import {RoutingContext, match} from 'react-router';
// import {Provider} from 'react-redux';
// import routes from 'redux/routes';
// import getStore from 'redux/store';

delete process.env.BROWSER;

const app = express();
const port = process.env.PORT || 3000;

const isDev = process.env.NODE_ENV === 'development';

app.use(compression());

if (isDev) {
  const webpack = require('webpack');
  const config = require(path.join(__dirname, 'webpack.config.js'));
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}
app.use('/static', express.static(path.join(__dirname, 'static'), {maxAge: 2678400000}));
app.use('/api', express.static(path.join(__dirname, 'parse/processed'), {maxAge: 2678400000}));
app.use('/bible', express.static(path.join(__dirname, 'convertBibleQuote/new'), {maxAge: 2678400000}));

function handleRender(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
}

// function handleRender(req, res) {
//   const store = getStore(true);
//   match({routes, location}, (error, redirectLocation, renderProps) => {
//     if (redirectLocation) {
//       res.redirect(301, redirectLocation.pathname + redirectLocation.search);
//     } else if (error) {
//       res.status(500).send(error.message);
//     } else if (renderProps === null) {
//       res.status(404).send('Not found');
//     } else {
//       const promises = ['asdf'];
//       renderProps.routes.map(route => {
//         if (route.onEnter) {
//           promises.push(route.onEnter(renderProps));
//         }
//       });
//       Promise.all(promises).then(
//         () => {
//           const html = ReactDOMServer.renderToString(
//             <div>
//               <Provider store={store}>
//                 <RoutingContext {...renderProps}/>
//               </Provider>
//             </div>
//           );
//           res.send(html);
//           // const initialState = store.getState();
//           // res.send(renderFullPage(html, initialState));
//         }
//       );
//     }
//   });
// }

function getTranslations(req, res) {
  const matchTranslations = req.url.match(/\/translations\/(.+)/);
  if (matchTranslations) {
    let translations;
    FS.list(path.join(__dirname, 'convertBibleQuote/new'))
      .then(r => {
        translations = r;
        return r;
      })
      .then(r => r.map(trKey => {
        const readingPath = path.join(__dirname, 'convertBibleQuote/new', trKey, matchTranslations[1]);
        return FS.exists(readingPath);
      }))
      .then(r => Promise.all(r))
      .then(r => res.send(translations.filter((value, i) => r[i])));
  } else {
    FS.list(path.join(__dirname, 'convertBibleQuote/new')).then(r => res.send(r));
  }
}

app.get('/translations/*', getTranslations);
app.get('*', handleRender);
app.listen(port);
