import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const source = ts.transpileModule(readFileSync(new URL('./iosLiveUpdates.ts', import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const checksum = 'a'.repeat(64);
const endpoint = 'https://molitva.app/ios-updates/1.0.47/';

function setup(overrides = {}) {
    const events = [];
    const state = {
        platform: 'ios',
        online: true,
        response: { status: 200, data: { nativeVersion: '1.0.47', sha256: checksum } },
        current: { version: 'builtin' },
        next: null,
        bundles: [],
        downloadError: false,
        ...overrides,
    };
    const exports = {};
    let now = 0;
    const document = new EventTarget();
    document.visibilityState = 'visible';
    const window = new EventTarget();
    const updater = {
        notifyAppReady: async () => events.push('ready'),
        current: async () => ({ bundle: state.current }),
        getNextBundle: async () => state.next,
        list: async () => ({ bundles: state.bundles }),
        async download({ url, version, checksum }) {
            events.push(['download', url, version, checksum]);
            if (state.downloadError) throw new Error('Checksum mismatch');
            return { id: 'new-bundle' };
        },
        next: async ({ id }) => events.push(['stage', id]),
    };
    vm.runInNewContext(source, {
        exports,
        document,
        window,
        Date: { now: () => now },
        navigator: {
            get onLine() {
                return state.online;
            },
        },
        require(id) {
            if (id === '@capacitor/app') return { App: { getInfo: async () => ({ version: '1.0.47' }) } };
            if (id === '@sentry/react')
                return {
                    addBreadcrumb: () => events.push('warning'),
                    captureException: assert.fail,
                    Severity: { Warning: 'warning' },
                };
            if (id === '@capgo/capacitor-updater') return { CapacitorUpdater: updater };
            assert.equal(id, '@capacitor/core');
            return {
                Capacitor: { getPlatform: () => state.platform, isPluginAvailable: () => true },
                CapacitorHttp: {
                    async get({ url }) {
                        events.push(['manifest', url]);
                        return state.response;
                    },
                },
            };
        },
    });
    return {
        events,
        state,
        async start() {
            await exports.startIosLiveUpdates();
            await new Promise((resolve) => setImmediate(resolve));
        },
        async foreground(elapsed) {
            now += elapsed;
            document.dispatchEvent(new Event('visibilitychange'));
            await new Promise((resolve) => setImmediate(resolve));
        },
    };
}

test('only a native iOS app acknowledges readiness or checks for an update', async () => {
    for (const platform of ['web', 'android']) {
        const env = setup({ platform });
        await env.start();
        assert.deepEqual(env.events, []);
    }
});

test('the app acknowledges startup before downloading and staging a compatible bundle', async () => {
    const env = setup();
    await env.start();
    await env.start();
    assert.deepEqual(env.events, [
        'ready',
        ['manifest', `${endpoint}manifest.json`],
        ['download', `${endpoint}bundles/${checksum}.zip`, checksum, checksum],
        ['stage', 'new-bundle'],
    ]);
});

test('offline startup is acknowledged and the manifest is checked once foregrounded online', async () => {
    const env = setup({ online: false });
    await env.start();
    assert.deepEqual(env.events, ['ready']);
    env.state.online = true;
    await env.foreground(100);
    assert.equal(env.events.length, 4);
    await env.foreground(100);
    assert.equal(env.events.length, 4);
});

test('missing, paused, incompatible, malformed, staged, current and failed updates are skipped', async () => {
    for (const overrides of [
        { response: { status: 404 } },
        { response: { status: 200, data: null } },
        { response: { status: 200, data: { nativeVersion: '1.0.48', sha256: checksum } } },
        { response: { status: 200, data: { nativeVersion: '1.0.47', sha256: '../bad' } } },
        { current: { version: checksum } },
        { next: { version: checksum } },
        { bundles: [{ version: checksum, status: 'error' }] },
    ]) {
        const env = setup(overrides);
        await env.start();
        assert.deepEqual(env.events, ['ready', ['manifest', `${endpoint}manifest.json`]]);
    }
});

test('a rejected download leaves the current bundle alone and permits a later attempt', async () => {
    const env = setup({ downloadError: true });
    await env.start();
    assert.equal(env.events.at(-1), 'warning');
    assert.equal(
        env.events.some(([event]) => event === 'stage'),
        false
    );
    env.state.downloadError = false;
    await env.foreground(5 * 60 * 1000);
    assert.deepEqual(env.events.at(-1), ['stage', 'new-bundle']);
});
