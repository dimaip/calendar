import { fileURLToPath } from 'node:url';

import { merge } from 'webpack-merge';
import { InjectManifest } from 'workbox-webpack-plugin';

import common from './webpack.base.js';
import { assertLocalDependencies } from './scripts/assert-local-dependencies.mjs';

assertLocalDependencies(fileURLToPath(new URL('.', import.meta.url)));

const hash = Array(1)
    .fill(null)
    .map(() => Math.random().toString(36).substr(2))
    .join('');

export default merge(common, {
    entry: ['babel-polyfill', 'client.tsx'],
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
            excludeChunks: ['service-audio-player', 'service-audio-pokajanni', 'service-audio-chin-prigotovlenija'],
            additionalManifestEntries: [
                {
                    url: '/',
                    revision: hash,
                },
                {
                    url: '/?utm_source=homescreen',
                    revision: hash,
                },
                {
                    url: '/?utm_source=homescreen&from_home',
                    revision: hash,
                },
                {
                    url: '/?utm_source=homescreen&from_twa',
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
