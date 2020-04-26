const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const { InjectManifest } = require('workbox-webpack-plugin');

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
