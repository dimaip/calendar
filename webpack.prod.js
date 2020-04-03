const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = merge(common, {
    entry: ['client.js'],
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new InjectManifest({
            swSrc: 'service-worker.js',
            swDest: '../service-worker.js',
        }),
    ],
});
