const express = require('express');
const webpack = require('webpack');

const app = express();
const isProd = process.env.NODE_ENV === 'production';
const port = process.env.NODE_PORT || 3000;

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
