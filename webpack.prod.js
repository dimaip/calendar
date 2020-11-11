const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const { InjectManifest } = require('workbox-webpack-plugin');

const hash = Array(1)
    .fill(null)
    .map(() =>
        Math.random()
            .toString(36)
            .substr(2)
    )
    .join('');

module.exports = merge(common, {
    entry: ['client.js'],
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
    },
    devtool: 'source-map',
    plugins: [
        new InjectManifest({
            swSrc: 'service-worker.js',
            swDest: '../service-worker.js',
            additionalManifestEntries: [
                {
                    url: '/',
                    revision: hash,
                },
                {
                    url: '/manifest.json',
                    revision: '1',
                },
            ],
        }),
    ],
    optimization: {
        namedModules: true,
        namedChunks: true,
        usedExports: true,
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                },
            },
        },
    },
});
