const express = require('express');
const webpack = require('webpack');
const proxy = require('express-http-proxy');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
var cors = require('cors');

const app = express();
const compiler = webpack(config);
const port = process.env.NODE_PORT || 3000;

app.use(cors());

app.use('/static', express.static('app/assets/public'));

app.use(
    '/api/day',
    proxy('http://localhost:9999', {
        proxyReqPathResolver: req => {
            return `/day.php?date=${req.url.replace(/[^0-9]/g, '')}`;
        },
    })
);
app.use(
    '/api/reading',
    proxy('http://localhost:9999', {
        proxyReqPathResolver: req => {
            return `/bible.php?zachalo=${req.url.substring(1)}`;
        },
    })
);
app.use(webpackDevMiddleware(compiler));
// NOTE: Only the client bundle needs to be passed to `webpack-hot-middleware`.
app.use(webpackHotMiddleware(compiler));

app.listen(port, () => console.log(`=== Go to http://localhost:${port} ===`));
