import express from 'express';
import compression from 'compression';
// import favicon from 'serve-favicon';
import path from 'path';

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
    publicPath: config.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}
app.use('/api', express.static(path.join(__dirname, 'parse/processed'), {maxAge: 2678400000}));
// app.use(favicon(path.join(__dirname, '/static/favicons/favicon.ico')));

function handleRender(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
}

app.get('*', handleRender);
app.listen(port);
