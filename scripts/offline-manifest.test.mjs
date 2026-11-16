import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import test from 'node:test';
import webpack from 'webpack';
import { InjectManifest } from 'workbox-webpack-plugin';

import production from '../webpack.prod.js';

test('excluding optional audio preserves every startup dependency in the offline manifest', async (t) => {
    const directory = mkdtempSync(join(tmpdir(), 'calendar-offline-manifest-'));
    t.after(() => rmSync(directory, { recursive: true, force: true }));
    writeFileSync(
        join(directory, 'index.js'),
        `import React from ${JSON.stringify(resolve('node_modules/react/index.js'))}; console.log(React); import(/* webpackChunkName: "service-audio-player" */ './audio.js');`
    );
    writeFileSync(
        join(directory, 'audio.js'),
        `import ReactDOM from ${JSON.stringify(resolve('node_modules/react-dom/index.js'))}; console.log(ReactDOM);`
    );
    writeFileSync(join(directory, 'sw.js'), 'self.manifest = self.__WB_MANIFEST;');
    const options = production.plugins.find((plugin) => plugin instanceof InjectManifest).config;
    const compiler = webpack({
        mode: 'production',
        context: directory,
        entry: './index.js',
        output: { path: join(directory, 'built'), filename: '[name].[contenthash].js', publicPath: '/built/' },
        optimization: production.optimization,
        plugins: [
            new InjectManifest({
                ...options,
                swSrc: join(directory, 'sw.js'),
                swDest: 'sw.js',
                additionalManifestEntries: [],
            }),
        ],
    });
    t.after(() => new Promise((resolve, reject) => compiler.close((error) => (error ? reject(error) : resolve()))));
    const stats = await new Promise((resolve, reject) =>
        compiler.run((error, result) => (error ? reject(error) : resolve(result)))
    );
    assert.equal(stats.hasErrors(), false, stats.toString({ all: false, errors: true }));
    const manifest = readFileSync(join(directory, 'built/sw.js'), 'utf8');
    const groups = stats.toJson({ all: false, chunkGroups: true }).namedChunkGroups;
    assert.ok(
        groups['service-audio-player'].assets.some((asset) => asset.name.startsWith('vendor.')),
        'The audio group must share the vendor dependency to reproduce the regression'
    );
    for (const asset of groups.main.assets)
        assert.ok(manifest.includes(`/built/${asset.name}`), `${asset.name} missing from offline startup`);
    assert.doesNotMatch(manifest, /\/built\/service-audio-player\./);
});
