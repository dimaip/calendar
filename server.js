import express from 'express';
import compression from 'compression';
import FS from 'q-io/fs';
import path from 'path';
import handleRender from './static/build/server.js';

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
