import assert from 'node:assert/strict';
import test from 'node:test';

import { createSuspenseResourceCache } from './suspenseResourceCache.ts';
import { recoverFromError } from '../../../utils/recoverableError.ts';

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

test('allows an asynchronous load to retry after explicit error recovery', async () => {
    const cache = createSuspenseResourceCache();
    const importError = new Error('offline chunk is unavailable');
    const component = () => null;
    let loadCount = 0;
    const load = async () => {
        loadCount += 1;
        if (loadCount === 1) {
            throw importError;
        }
        return component;
    };

    const rejectedPromise = readSuspendedPromise(cache, 'Shared/Ending\u0000ru', load);
    await assert.rejects(rejectedPromise, (error) => error === importError);

    assert.throws(
        () => cache.read('Shared/Ending\u0000ru', load),
        (error) => error === importError
    );

    recoverFromError(importError);
    const retryPromise = readSuspendedPromise(cache, 'Shared/Ending\u0000ru', load);
    await retryPromise;

    assert.equal(cache.read('Shared/Ending\u0000ru', load), component);
    assert.equal(loadCount, 2);
});

test('allows a synchronous loader failure to retry after explicit error recovery', async () => {
    const cache = createSuspenseResourceCache();
    const importError = new Error('invalid module request');
    const component = () => null;
    let loadCount = 0;
    const load = () => {
        loadCount += 1;
        if (loadCount === 1) {
            throw importError;
        }
        return Promise.resolve(component);
    };

    assert.throws(
        () => cache.read('Shared/Ending\u0000ru', load),
        (error) => error === importError
    );

    recoverFromError(importError);
    const retryPromise = readSuspendedPromise(cache, 'Shared/Ending\u0000ru', load);
    await retryPromise;

    assert.equal(cache.read('Shared/Ending\u0000ru', load), component);
    assert.equal(loadCount, 2);
});

test('recovers every cache key rejected by the same chunk error', async () => {
    const cache = createSuspenseResourceCache();
    const importError = new Error('shared chunk is unavailable');
    const component = () => null;
    let shouldFail = true;
    const load = async () => {
        if (shouldFail) {
            throw importError;
        }
        return component;
    };

    const firstPromise = readSuspendedPromise(cache, 'Shared/First\u0000ru', load);
    const secondPromise = readSuspendedPromise(cache, 'Shared/Second\u0000ru', load);
    await Promise.allSettled([firstPromise, secondPromise]);

    recoverFromError(importError);
    shouldFail = false;

    const firstRetry = readSuspendedPromise(cache, 'Shared/First\u0000ru', load);
    const secondRetry = readSuspendedPromise(cache, 'Shared/Second\u0000ru', load);
    await Promise.all([firstRetry, secondRetry]);

    assert.equal(cache.read('Shared/First\u0000ru', load), component);
    assert.equal(cache.read('Shared/Second\u0000ru', load), component);
});
