import express from 'express';
import compression from 'compression';
import FS from 'q-io/fs';
import path from 'path';
import favicon from 'express-favicon';
import proxy from 'express-http-proxy';

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

const app = express();
const port = process.env.PORT || 3000;

let handleRender;
if (process.env.NODE_ENV === 'development') {
  handleRender = (req, res) => res.sendFile(path.join(__dirname, 'index.html'));
  const webpack = require('webpack');
  const config = require(path.join(__dirname, 'webpack.config.js'));
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
} else {
  handleRender = require(path.join(__dirname, './static/build/server.js')).default;
}

app.use(compression());
app.use(favicon(path.join(__dirname, 'static/favicon.ico')));
app.use('/api', proxy('http://c.psmb.ru', {
  forwardPath: (req) => `/pravoslavnyi-kalendar/date/${req.url.replace(/[^0-9]/g, '')}/?tx_orthodox_orthodox[format]=json&type=555`
}));
app.use('/static', express.static(path.join(__dirname, 'static'), {maxAge: 2678400000}));
app.use('/bible', express.static(path.join(__dirname, 'convertBibleQuote/new'), {maxAge: 2678400000}));
app.get('/translations/*', getTranslations);
app.get('*', handleRender);
app.listen(port);
