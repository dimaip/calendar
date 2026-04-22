import express from 'express';
import webpack from 'webpack';

const app = express();
const isProd = process.env.NODE_ENV === 'production';
const port = process.env.NODE_PORT || 3000;

const start = async () => {
    if (!isProd) {
        app.use((req, res, next) => {
            res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
            res.set('Pragma', 'no-cache');
            res.set('Expires', '0');
            next();
        });

        const { default: webpackDevMiddleware } = await import('webpack-dev-middleware');
        // const { default: webpackHotMiddleware } = await import('webpack-hot-middleware');
        const { default: config } = await import('./webpack.dev.js');
        const compiler = webpack(config);
        app.use(
            webpackDevMiddleware(compiler, {
                publicPath: '/built/',
            })
        );
        // NOTE: Only the client bundle needs to be passed to `webpack-hot-middleware`.
        // app.use(webpackHotMiddleware(compiler));
    }

    app.use('/', express.static('www'));

    app.listen(port, () => console.log(`=== Go to http://localhost:${port} ===`));
};

void start();
