import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const source = ts.transpileModule(readFileSync(new URL('./cachedFetch.ts', import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;

function environment() {
    const values = new Map();
    const writes = [];
    const requests = [];
    const timeouts = new Map();
    const state = {
        online: true,
        status: 200,
        body: '{"fresh":true}',
        networkError: false,
        networkHang: false,
        storeError: false,
    };
    const exports = {};
    const wrapper = {
        async getItem(key) {
            if (state.storeError) throw new Error('Unable to open the store');
            return values.get(key) ?? null;
        },
        async setItem(key, value) {
            if (state.storeError) throw new Error('Unable to open the store');
            await new Promise((resolve) => {
                writes.push(() => {
                    values.set(key, value);
                    resolve();
                });
            });
        },
    };
    vm.runInNewContext(source, {
        exports,
        AbortController,
        setTimeout(callback, delay) {
            const token = {};
            timeouts.set(token, { callback, delay });
            return token;
        },
        clearTimeout(token) {
            timeouts.delete(token);
        },
        Error,
        JSON,
        require(id) {
            assert.equal(id, './StorageAPIWrapper');
            return { default: wrapper };
        },
        navigator: {
            get onLine() {
                return state.online;
            },
        },
        console: { warn() {}, error() {} },
        async fetch(url, options) {
            requests.push(url);
            if (state.networkError) throw new Error('Offline');
            if (state.networkHang) {
                return new Promise((_resolve, reject) => {
                    options.signal.addEventListener('abort', () => reject(new Error('Aborted')), { once: true });
                });
            }
            return {
                ok: state.status === 200,
                status: state.status,
                statusText: 'Failed',
                text: async () => state.body,
            };
        },
    });
    return { cachedFetch: exports.default, values, writes, requests, state, timeouts };
}
const flush = () => new Promise((resolve) => setImmediate(resolve));

test('prefetch completes only after its response is committed, and cached data survives offline', async () => {
    const env = environment();
    let completed = false;
    const pending = env.cachedFetch('day', 'PREFETCH_NORMAL').then((value) => {
        completed = true;
        return value;
    });
    await flush();
    assert.equal(completed, false);
    assert.equal(env.writes.length, 1);
    env.writes.shift()();
    assert.deepEqual(await pending, { fresh: true });
    env.state.online = false;
    env.state.networkError = true;
    assert.deepEqual(await env.cachedFetch('day'), { fresh: true });
    assert.deepEqual(env.requests, ['day']);
});

test('a failed forced refresh settles and preserves the previous offline response', async () => {
    const env = environment();
    env.values.set('day', '{"old":true}');
    env.state.networkError = true;
    assert.equal(await env.cachedFetch('day', 'PREFETCH_RELOAD'), undefined);
    env.state.online = false;
    assert.deepEqual(await env.cachedFetch('day'), { old: true });
    await assert.rejects(env.cachedFetch('missing'), /Offline/);
});

test('invalid JSON and HTTP failures cannot poison cached responses', async () => {
    for (const [status, body] of [
        [200, '<html>Bad gateway</html>'],
        [503, '{"error":true}'],
    ]) {
        const env = environment();
        env.values.set('day', '{"old":true}');
        env.state.status = status;
        env.state.body = body;
        assert.equal(await env.cachedFetch('day', 'PREFETCH_RELOAD'), undefined);
        assert.equal(env.values.get('day'), '{"old":true}');
        assert.equal(env.writes.length, 0);
    }
});

test('a stalled network request times out rather than hanging the whole refresh', async () => {
    const env = environment();
    env.state.networkHang = true;
    const pending = env.cachedFetch('day', 'PREFETCH_RELOAD');
    await flush();
    const timeout = [...env.timeouts.values()][0];
    assert.equal(timeout.delay, 15000);
    timeout.callback();
    assert.equal(await pending, undefined);
    assert.equal(env.timeouts.size, 0);
});

test('an error opening storage settles background work and rejects foreground work', async () => {
    const env = environment();
    env.state.storeError = true;
    assert.equal(await env.cachedFetch('day', 'PREFETCH_NORMAL'), undefined);
    await assert.rejects(env.cachedFetch('day'), /Unable to open/);
    assert.equal(env.requests.length, 0);
});

test('cache hits revalidate in the background, while normal prefetch avoids downloading them again', async () => {
    const env = environment();
    env.values.set('day', '{"old":true}');
    assert.deepEqual(await env.cachedFetch('day', 'PREFETCH_NORMAL'), { old: true });
    assert.equal(env.requests.length, 0);
    assert.deepEqual(await env.cachedFetch('day'), { old: true });
    await flush();
    env.writes.shift()();
    await flush();
    assert.deepEqual(await env.cachedFetch('day', 'PREFETCH_NORMAL'), { fresh: true });
});
