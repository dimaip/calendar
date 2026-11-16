import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import babel from '@babel/core';
import regeneratorRuntime from 'regenerator-runtime';

const source = babel.transformSync(readFileSync(new URL('./installPrecache.js', import.meta.url), 'utf8'), {
    babelrc: false,
    configFile: false,
    presets: [['@babel/preset-env', { targets: { browsers: ['ie >= 11', 'safari > 9'] } }]],
}).code;
const module = { exports: {} };
vm.runInNewContext(source, { module, exports: module.exports, regeneratorRuntime, Request });
const installPrecache = module.exports.default;
const flush = () => new Promise((resolve) => setImmediate(resolve));

test('installation downloads in a bounded pool and waits for every durable cache write', async () => {
    const urls = new Map(
        Array.from({ length: 19 }, (_, i) => {
            const url = `https://example.test/${i}.js`;
            return [url, i === 0 ? `${url}?__WB_REVISION__=new` : url];
        })
    );
    const writes = [];
    const options = [];
    let active = 0;
    let peak = 0;
    const controller = {
        getURLsToCacheKeys: () => urls,
        getIntegrityForCacheKey: (key) => (key.includes('__WB_REVISION__') ? 'sha256-test' : undefined),
        strategy: {
            handleAll(option) {
                options.push(option);
                peak = Math.max(peak, ++active);
                return [
                    Promise.resolve(new Response('asset')),
                    new Promise((resolve) =>
                        writes.push(() => {
                            active--;
                            resolve();
                        })
                    ),
                ];
            },
        },
    };
    const event = { type: 'install' };
    let complete = false;
    const pending = installPrecache(controller, event).then(() => {
        complete = true;
    });
    assert.equal(options.length, 6);
    while (writes.length) {
        writes.shift()();
        await flush();
    }
    await pending;
    assert.equal(complete, true);
    assert.equal(peak, 6);
    assert.equal(options.length, 19);
    assert.equal(new Set(options.map((o) => o.request.url)).size, 19);
    assert.equal(options[0].request.cache, 'reload');
    assert.equal(options[0].request.integrity, 'sha256-test');
    assert.equal(options[1].request.cache, 'default');
    assert.ok(options.every((o) => o.event === event && o.request.credentials === 'same-origin'));
    assert.equal(options[0].params.cacheKey, urls.get(options[0].request.url));
});

test('a failed asset rejects installation instead of permitting an incomplete release to activate', async () => {
    const controller = {
        getURLsToCacheKeys: () => new Map([['https://example.test/asset.js', 'https://example.test/asset.js']]),
        getIntegrityForCacheKey: () => undefined,
        strategy: { handleAll: () => [Promise.resolve(), Promise.reject(new Error('Bad precaching response'))] },
    };
    await assert.rejects(installPrecache(controller, { type: 'install' }), /Bad precaching response/);
});
