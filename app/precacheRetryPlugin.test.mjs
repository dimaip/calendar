import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

import babel from '@babel/core';
import regeneratorRuntime from 'regenerator-runtime';

// Exercise the legacy async transform used by the worker's babel-loader, not
// only Node's native async functions.
const source = babel.transformSync(readFileSync(new URL('./precacheRetryPlugin.js', import.meta.url), 'utf8'), {
    babelrc: false,
    configFile: false,
    presets: [['@babel/preset-env', { targets: { browsers: ['ie >= 11', 'safari > 9'] } }]],
}).code;

function environment(statuses) {
    const requests = [];
    const delays = [];
    const module = { exports: {} };
    vm.runInNewContext(source, {
        module,
        exports: module.exports,
        regeneratorRuntime,
        setTimeout(callback, delay) {
            delays.push(delay);
            callback();
        },
        async fetch(request) {
            requests.push(request);
            const next = statuses.shift();
            if (next instanceof Error) throw next;
            return new Response('asset', { status: next });
        },
    });
    const request = new Request('https://molitva.app/built/123.abcdef123456.js', {
        cache: 'reload',
        credentials: 'same-origin',
        headers: { 'X-Test': 'preserved' },
    });
    return { plugin: module.exports.default, requests, delays, request };
}

test('the worker imports the runtime required by its compiled async plugin', () => {
    assert.match(
        readFileSync(new URL('./service-worker.js', import.meta.url), 'utf8'),
        /import 'regenerator-runtime\/runtime\.js';/
    );
});

test('each transient storage status can recover during installation', async () => {
    for (const status of [500, 502, 503, 504]) {
        const env = environment([200]);
        const response = await env.plugin.fetchDidSucceed({
            request: env.request,
            response: new Response('error', { status }),
            event: { type: 'install' },
        });
        assert.equal(response.status, 200);
        assert.deepEqual(env.delays, [1000]);
        assert.equal(env.requests.length, 1);
        const [retry] = env.requests;
        assert.notEqual(retry, env.request);
        assert.equal(retry.url, env.request.url);
        assert.equal(retry.cache, 'reload');
        assert.equal(retry.credentials, 'same-origin');
        assert.equal(retry.headers.get('X-Test'), 'preserved');
    }
});

test('retry attempts stop after two, returning persistent errors for Workbox to reject', async () => {
    for (const statuses of [
        [503, 200],
        [503, 504],
    ]) {
        const env = environment([...statuses]);
        const response = await env.plugin.fetchDidSucceed({
            request: env.request,
            response: new Response('error', { status: 500 }),
            event: { type: 'install' },
        });
        assert.equal(response.status, statuses.at(-1));
        assert.deepEqual(env.delays, [1000, 2000]);
        assert.equal(env.requests.length, 2);
    }
});

test('successful, permanent-error and runtime responses are never retried', async () => {
    for (const [status, type] of [
        [200, 'install'],
        [404, 'install'],
        [403, 'install'],
        [429, 'install'],
        [501, 'install'],
        [500, 'fetch'],
        [500, undefined],
    ]) {
        const env = environment([]);
        const original = new Response('response', { status });
        const response = await env.plugin.fetchDidSucceed({
            request: env.request,
            response: original,
            event: type ? { type } : undefined,
        });
        assert.equal(response, original);
        assert.deepEqual(env.requests, []);
        assert.deepEqual(env.delays, []);
    }
});

test('a retry that encounters a permanent error or a network failure stops', async () => {
    const permanent = environment([404]);
    const response = await permanent.plugin.fetchDidSucceed({
        request: permanent.request,
        response: new Response('error', { status: 500 }),
        event: { type: 'install' },
    });
    assert.equal(response.status, 404);
    assert.equal(permanent.requests.length, 1);

    const network = environment([new Error('Connection lost')]);
    await assert.rejects(
        network.plugin.fetchDidSucceed({
            request: network.request,
            response: new Response('error', { status: 500 }),
            event: { type: 'install' },
        }),
        /Connection lost/
    );
    assert.equal(network.requests.length, 1);
});
