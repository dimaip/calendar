import assert from 'node:assert/strict';
import test from 'node:test';

import { createSuspenseResourceCache } from './suspenseResourceCache.ts';

const readSuspendedPromise = (cache, key, load) => {
    try {
        cache.read(key, load);
    } catch (error) {
        return error;
    }

    assert.fail('the first read must suspend');
};

test('deduplicates in-flight loads and preserves the resolved value', async () => {
    const cache = createSuspenseResourceCache();
    let resolveLoad;
    let loadCount = 0;
    const load = () => {
        loadCount += 1;
        return new Promise((resolve) => {
            resolveLoad = resolve;
        });
    };

    const firstPromise = readSuspendedPromise(cache, 'Shared/Ending\u0000ru', load);
    const secondPromise = readSuspendedPromise(cache, 'Shared/Ending\u0000ru', load);

    assert.equal(firstPromise, secondPromise);
    assert.equal(loadCount, 1);

    const component = () => null;
    resolveLoad(component);
    await firstPromise;

    assert.equal(cache.read('Shared/Ending\u0000ru', load), component);
    assert.equal(loadCount, 1);
});

test('keeps source and language resources independent', async () => {
    const cache = createSuspenseResourceCache();
    const russianComponent = () => null;
    const slavonicComponent = () => null;

    const russianPromise = readSuspendedPromise(cache, 'Shared/Ending\u0000ru', async () => russianComponent);
    const slavonicPromise = readSuspendedPromise(cache, 'Shared/Ending\u0000csj', async () => slavonicComponent);

    await Promise.all([russianPromise, slavonicPromise]);

    assert.equal(
        cache.read('Shared/Ending\u0000ru', async () => slavonicComponent),
        russianComponent
    );
    assert.equal(
        cache.read('Shared/Ending\u0000csj', async () => russianComponent),
        slavonicComponent
    );
});

test('preserves a rejected load and does not retry it on later renders', async () => {
    const cache = createSuspenseResourceCache();
    const importError = new Error('offline chunk is unavailable');
    let loadCount = 0;
    const load = async () => {
        loadCount += 1;
        throw importError;
    };

    const rejectedPromise = readSuspendedPromise(cache, 'Shared/Ending\u0000ru', load);
    await assert.rejects(rejectedPromise, (error) => error === importError);

    assert.throws(
        () => cache.read('Shared/Ending\u0000ru', load),
        (error) => error === importError
    );
    assert.equal(loadCount, 1);
});

test('preserves synchronous loader failures without retrying', () => {
    const cache = createSuspenseResourceCache();
    const importError = new Error('invalid module request');
    let loadCount = 0;
    const load = () => {
        loadCount += 1;
        throw importError;
    };

    assert.throws(
        () => cache.read('Shared/Ending\u0000ru', load),
        (error) => error === importError
    );
    assert.throws(
        () => cache.read('Shared/Ending\u0000ru', load),
        (error) => error === importError
    );
    assert.equal(loadCount, 1);
});
