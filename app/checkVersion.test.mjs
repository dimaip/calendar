import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getEventListeners } from 'node:events';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

// Run the real module in isolated browser environments, including across reloads.
const source = ts.transpileModule(readFileSync(new URL('./checkVersion.ts', import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;

function browser(storage = new Map(), storedError = false) {
    const worker = Object.assign(new EventTarget(), { state: 'activated' });
    const serviceWorker = Object.assign(new EventTarget(), { controller: worker });
    const timers = new Map();
    const state = {
        storage,
        timers,
        worker,
        serviceWorker,
        online: true,
        release: 'bbbb',
        nextMain: '/built/main.bbbb.js',
        reloads: 0,
        updates: 0,
        fetches: [],
        fetchError: false,
        storedError,
        shellOK: true,
        shellHasMain: true,
    };
    const registration = {
        active: worker,
        installing: null,
        waiting: null,
        async update() {
            state.updates += 1;
        },
    };
    serviceWorker.getRegistration = async () => registration;
    const navigator = {
        serviceWorker,
        get onLine() {
            return state.online;
        },
    };
    const context = vm.createContext({
        exports: {},
        process: { env: { NODE_ENV: 'production', PUBLIC_URL: 'https://example.test' } },
        VERSION: 'aaaa',
        navigator,
        AbortController,
        URL,
        setTimeout(callback, delay) {
            const token = {};
            timers.set(token, { callback, delay });
            return token;
        },
        clearTimeout(token) {
            timers.delete(token);
        },
        window: {
            sessionStorage: {
                getItem(key) {
                    if (state.storedError) throw new Error('Storage denied');
                    return storage.get(key);
                },
                setItem(key, value) {
                    if (state.storedError) throw new Error('Storage denied');
                    storage.set(key, value);
                },
            },
            location: {
                href: 'https://example.test/?utm_source=homescreen#/date/2026-10-07',
                reload() {
                    state.reloads += 1;
                },
            },
        },
        document: { querySelector: () => ({ src: 'https://example.test/built/main.aaaa.js' }) },
        DOMParser: class {
            parseFromString() {
                return { querySelector: () => (state.shellHasMain ? { getAttribute: () => state.nextMain } : null) };
            }
        },
        async fetch(url, options) {
            state.fetches.push({ url, options });
            if (state.fetchError) throw new Error('Network failed');
            if (url.endsWith('/version.json')) return { ok: true, json: async () => state.release };
            return { ok: state.shellOK, text: async () => '<html></html>' };
        },
    });
    vm.runInContext(source, context);
    return { state, context, registration, navigator, ...context.exports };
}

const flush = () => new Promise((resolve) => setImmediate(resolve));

test('detection announces a release without updating the worker or reloading', async () => {
    const env = browser();
    assert.equal(await env.default(), 'bbbb');
    assert.equal(env.state.updates, 0);
    assert.equal(env.state.reloads, 0);
    assert.equal(env.state.fetches[0].options.cache, 'no-store');
});

test('dismissal survives repeated navigation and a reload in the same session', async () => {
    const env = browser();
    assert.equal(await env.default(), 'bbbb');
    env.dismissUpdate('bbbb');
    for (let i = 0; i < 10; i += 1) assert.equal(await env.default(), null);
    const reloaded = browser(env.state.storage);
    assert.equal(await reloaded.default(), null);
    assert.equal(await reloaded.default(true), 'bbbb');
    reloaded.state.release = 'cccc';
    assert.equal(await reloaded.default(true), 'cccc');
    assert.equal(await reloaded.default(), 'cccc');
});

test('dismissal wins over a detection already waiting for registration', async () => {
    const env = browser();
    let complete;
    env.state.serviceWorker.getRegistration = () =>
        new Promise((resolve) => {
            complete = resolve;
        });
    const check = env.default();
    await flush();
    env.dismissUpdate('bbbb');
    complete(env.registration);
    assert.equal(await check, null);
});

test('unavailable or malformed session storage does not break detection or dismissal', async () => {
    const env = browser(new Map([['app-updates:dismissed:v1', '{broken']]));
    env.state.storedError = true;
    assert.equal(await env.default(), 'bbbb');
    env.dismissUpdate('bbbb');
    assert.equal(await env.default(), null);
    const denied = browser(new Map(), true);
    assert.equal(await denied.default(), 'bbbb');
    denied.dismissUpdate('bbbb');
    assert.equal(await denied.default(), null);
});

test('concurrent checks share one version request and failures can be retried manually', async () => {
    const env = browser();
    env.state.fetchError = true;
    assert.deepEqual(await Promise.all([env.default(), env.default(), env.default()]), [null, null, null]);
    assert.equal(env.state.fetches.length, 1);
    env.state.fetchError = false;
    assert.equal(await env.default(true), 'bbbb');
    assert.equal(env.state.fetches.length, 2);
});

test('offline, development, unsupported, same-release and invalid-version checks are silent', async () => {
    for (const release of ['aaaa', null, {}, 'dev', '<html>error</html>']) {
        const env = browser();
        env.state.release = release;
        assert.equal(await env.default(), null);
    }
    const env = browser();
    env.state.online = false;
    assert.equal(await env.default(), null);
    env.state.online = true;
    env.context.process.env.NODE_ENV = 'development';
    assert.equal(await env.default(), null);
    env.context.process.env.NODE_ENV = 'production';
    env.context.AbortController = undefined;
    assert.equal(await env.default(), null);
    env.context.AbortController = AbortController;
    delete env.navigator.serviceWorker;
    assert.equal(await env.default(), null);
    assert.equal(env.state.fetches.length, 0);
});

test('a registration lookup failure does not escape automatic detection', async () => {
    const env = browser();
    env.state.serviceWorker.getRegistration = async () => {
        throw new Error('Registration failed');
    };
    assert.equal(await env.default(), null);
});

test('a slow version request is aborted and retryable', async () => {
    const env = browser();
    const originalFetch = env.context.fetch;
    env.context.fetch = (_url, { signal }) =>
        new Promise((_resolve, reject) => {
            signal.addEventListener('abort', () => reject(new Error('Aborted')), { once: true });
        });
    const check = env.default();
    [...env.state.timers.values()].find(({ delay }) => delay === 10000).callback();
    assert.equal(await check, null);
    assert.equal(env.state.timers.size, 0);
    env.context.fetch = originalFetch;
    assert.equal(await env.default(true), 'bbbb');
});

test('update waits for installation, activation AND controller takeover, then reloads once', async () => {
    const env = browser();
    const next = Object.assign(new EventTarget(), { state: 'installing' });
    env.registration.installing = next;
    const update = env.applyUpdate('bbbb');
    const repeatedClick = env.applyUpdate('bbbb');
    await flush();
    assert.equal(env.state.reloads, 0);
    assert.equal(getEventListeners(next, 'statechange').length, 1);
    assert.equal(getEventListeners(env.state.serviceWorker, 'controllerchange').length, 1);
    next.state = 'installed';
    next.dispatchEvent(new Event('statechange'));
    await flush();
    assert.equal(env.state.reloads, 0);
    env.registration.active = next;
    next.state = 'activated';
    next.dispatchEvent(new Event('statechange'));
    await flush();
    assert.equal(env.state.reloads, 0);
    env.state.serviceWorker.controller = next;
    env.state.serviceWorker.dispatchEvent(new Event('controllerchange'));
    await Promise.all([update, repeatedClick]);
    assert.equal(env.state.reloads, 1);
    assert.equal(env.state.updates, 1);
    assert.equal(env.state.timers.size, 0);
    assert.equal(getEventListeners(next, 'statechange').length, 0);
    assert.equal(getEventListeners(env.state.serviceWorker, 'controllerchange').length, 0);
    assert.equal(env.state.fetches[1].url, 'https://example.test/?utm_source=homescreen');
    await env.applyUpdate('bbbb');
    assert.equal(env.state.reloads, 1);
});

test('if reload returns the old app, the attempted release is not automatically offered again', async () => {
    const env = browser();
    await env.applyUpdate('bbbb');
    const reloaded = browser(env.state.storage);
    assert.equal(await reloaded.default(), null);
    assert.equal(await reloaded.default(true), 'bbbb');
    reloaded.state.release = 'cccc';
    assert.equal(await reloaded.default(true), 'cccc');
    assert.equal(env.state.reloads, 1);
});

test('failure before the first await does not poison future update attempts', async () => {
    const env = browser();
    env.state.online = false;
    await assert.rejects(env.applyUpdate('bbbb'), /connection/);
    assert.equal(env.state.reloads, 0);
    env.state.online = true;
    await env.applyUpdate('bbbb');
    assert.equal(env.state.reloads, 1);
});

test('a failed worker download never reloads and can be retried', async () => {
    const env = browser();
    env.registration.update = async () => {
        throw new Error('Download failed');
    };
    await assert.rejects(env.applyUpdate('bbbb'), /Download failed/);
    assert.equal(env.state.reloads, 0);
    env.registration.update = async () => {};
    await env.applyUpdate('bbbb');
    assert.equal(env.state.reloads, 1);
});

test('a redundant installing worker fails safely, removes listeners, and permits retry', async () => {
    const env = browser();
    const next = Object.assign(new EventTarget(), { state: 'installing' });
    env.registration.installing = next;
    const update = env.applyUpdate('bbbb');
    await flush();
    next.state = 'redundant';
    next.dispatchEvent(new Event('statechange'));
    await assert.rejects(update, /did not activate/);
    assert.equal(env.state.reloads, 0);
    assert.equal(getEventListeners(next, 'statechange').length, 0);
    assert.equal(getEventListeners(env.state.serviceWorker, 'controllerchange').length, 0);
    env.registration.installing = null;
    await env.applyUpdate('bbbb');
    next.dispatchEvent(new Event('statechange'));
    assert.equal(env.state.reloads, 1);
    assert.equal(env.state.timers.size, 0);
});

for (const stage of ['registration', 'worker-update', 'activation']) {
    test(`timeout during ${stage} never reloads and permits retry`, async () => {
        const env = browser();
        const originalRegistration = env.state.serviceWorker.getRegistration;
        const originalUpdate = env.registration.update;
        if (stage === 'registration') env.state.serviceWorker.getRegistration = () => new Promise(() => {});
        if (stage === 'worker-update') env.registration.update = () => new Promise(() => {});
        if (stage === 'activation')
            env.registration.installing = Object.assign(new EventTarget(), { state: 'installing' });
        const update = env.applyUpdate('bbbb');
        await flush();
        [...env.state.timers.values()].find(({ delay }) => delay === 120000).callback();
        await assert.rejects(update, /timed out|did not activate/);
        assert.equal(env.state.reloads, 0);
        assert.equal(env.state.timers.size, 0);
        if (env.registration.installing) {
            assert.equal(getEventListeners(env.registration.installing, 'statechange').length, 0);
        }
        assert.equal(getEventListeners(env.state.serviceWorker, 'controllerchange').length, 0);
        env.state.serviceWorker.getRegistration = originalRegistration;
        env.registration.update = originalUpdate;
        env.registration.installing = null;
        await env.applyUpdate('bbbb');
        assert.equal(env.state.reloads, 1);
    });
}

for (const failure of ['changed-release', 'same-shell', 'missing-main', 'shell-http', 'network', 'no-registration']) {
    test(`${failure} never reloads and leaves the old app retryable`, async () => {
        const env = browser();
        if (failure === 'changed-release') env.state.release = 'cccc';
        if (failure === 'same-shell') env.state.nextMain = '/built/main.aaaa.js';
        if (failure === 'missing-main') env.state.shellHasMain = false;
        if (failure === 'shell-http') env.state.shellOK = false;
        if (failure === 'network') env.state.fetchError = true;
        if (failure === 'no-registration') env.state.serviceWorker.getRegistration = async () => undefined;
        await assert.rejects(env.applyUpdate('bbbb'));
        assert.equal(env.state.reloads, 0);
        assert.equal(env.state.storage.has('app-updates:reloaded:v1'), false);
        env.state.release = 'bbbb';
        env.state.nextMain = '/built/main.bbbb.js';
        env.state.shellHasMain = true;
        env.state.shellOK = true;
        env.state.fetchError = false;
        env.state.serviceWorker.getRegistration = async () => env.registration;
        await env.applyUpdate('bbbb');
        assert.equal(env.state.reloads, 1);
    });
}
