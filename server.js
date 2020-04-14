const express = require('express');
const webpack = require('webpack');
const proxy = require('express-http-proxy');
const basicAuth = require('express-basic-auth');

var cors = require('cors');

const app = express();
const isProd = process.env.NODE_ENV === 'production';
const port = process.env.NODE_PORT || 3000;
// This password is not meant to be safe, it's just for clearing the cache
const clearCachePassword = process.env.CLEAR_CACHE_PASSWORD || 'pass';

const apiHost = process.env.API_HOST || 'http://localhost:9999';

app.use(cors());

app.use((req, res, next) => {
    const host = req.get('Host');
    if (host === 'd.psmb.ru') {
        return res.redirect(301, 'https://c.psmb.ru/' + req.originalUrl);
    }
    return next();
});

app.use(
    '/api/day/',
    proxy(apiHost, {
        proxyReqPathResolver: req => {
            return `/day/${req.url.substring(1)}`;
        },
    })
);
app.use(
    '/api/reading/',
    proxy(apiHost, {
        proxyReqPathResolver: req => {
            return `/reading/${req.url.substring(1)}`;
        },
    })
);
app.use(
    '/api/readings/',
    proxy(apiHost, {
        proxyReqPathResolver: req => {
            return `/readings/${req.url.substring(1)}`;
        },
    })
);
app.use(
    '/api/external-day',
    proxy('https://psmb.ru', {
        proxyReqPathResolver: req => {
            return `/?calendarDate=${req.url.substring(1)}`;
        },
    })
);
app.use(
    '/api/saint',
    proxy('https://psmb.ru', {
        proxyReqPathResolver: req => {
            return `https://psmb.ru/sv/${req.url.substring(1)}.html?json=1`;
        },
    })
);

app.use(
    '/clear-cache',
    basicAuth({
        users: { psmb: clearCachePassword },
        challenge: true,
    }),
    proxy(apiHost, {
        proxyReqPathResolver: req => {
            return '/clearCache.php';
        },
    })
);

app.get('/version', function(_req, res) {
    res.send(process.env.npm_package_version);
});

if (!isProd) {
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const config = require('./webpack.dev');
    const compiler = webpack(config);
    app.use(
        webpackDevMiddleware(compiler, {
            publicPath: '/built/',
        })
    );
    // NOTE: Only the client bundle needs to be passed to `webpack-hot-middleware`.
    app.use(webpackHotMiddleware(compiler));
}
app.use('/', express.static('www'));

app.listen(port, () => console.log(`=== Go to http://localhost:${port} ===`));
