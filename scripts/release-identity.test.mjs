import assert from 'node:assert/strict';
import test from 'node:test';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CreateFileWebpack from 'create-file-webpack';
import configuration from '../webpack.base.js';

test('HTML, the app and the version endpoint use the same release identity', () => {
    const define = configuration.plugins.find((plugin) => plugin instanceof webpack.DefinePlugin);
    const html = configuration.plugins.find((plugin) => plugin instanceof HtmlWebpackPlugin);
    const endpoint = configuration.plugins.find(
        (plugin) => plugin instanceof CreateFileWebpack && plugin.options.fileName === 'version.json'
    );
    const release = JSON.parse(define.definitions.VERSION);
    assert.equal(html.userOptions.meta['app-version'], release);
    assert.equal(JSON.parse(endpoint.options.content), release);
});
