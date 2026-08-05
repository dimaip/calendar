import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { chromium } from 'playwright';

import { parseExperienceArguments } from './lib/experience-options.mjs';
import {
    configureThirdPartyRuntimeSnapshot,
    loadThirdPartyRuntimeSnapshot,
    matchThirdPartyScriptUrl,
    THIRD_PARTY_RUNTIME_POLICY,
    THIRD_PARTY_RUNTIME_SCHEMA_VERSION,
    validateThirdPartyRuntimeProvenance,
} from './lib/third-party-runtime.mjs';

const scriptUrls = [
    ['yandex-metrika-tag', 'https://mc.yandex.ru/metrika/tag.js'],
    ['google-tag-manager', 'https://www.googletagmanager.com/gtm.js?id=GTM-MSCF98P&gtm_cookies_win=x'],
    ['google-tag', 'https://www.googletagmanager.com/gtag/js?id=G-EXACT123&gtm=volatile&cx=c'],
    ['google-tag-destination', 'https://www.googletagmanager.com/gtag/destination?id=G-EXACT123&gtm=volatile&cx=c'],
    ['google-analytics', 'https://www.google-analytics.com/analytics.js'],
];

const digest = (value) => createHash('sha256').update(value).digest('hex');

const createSnapshot = async ({ chained = false } = {}) => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'perf019-third-party-'));
    const scripts = [];
    for (const [index, [className, url]] of scriptUrls.entries()) {
        const nextUrl = scriptUrls[index + 1]?.[1];
        const source =
            chained && nextUrl
                ? `document.head.append(Object.assign(document.createElement('script'),{src:${JSON.stringify(nextUrl)}}));`
                : chained
                  ? 'window.__thirdPartyFixtureExecuted=true;'
                  : `window.__fixture=${JSON.stringify(className)};`;
        const body = Buffer.from(source);
        const bodyPath = `${className}.js`;
        await fs.writeFile(path.join(root, bodyPath), body);
        scripts.push({
            body: bodyPath,
            bytes: body.byteLength,
            canonicalUrl: matchThirdPartyScriptUrl(url).canonicalUrl,
            className,
            contentType: 'application/javascript; charset=utf-8',
            sha256: digest(body),
            status: 200,
            url,
        });
    }
    const manifestPath = path.join(root, 'manifest.json');
    await fs.writeFile(
        manifestPath,
        JSON.stringify({
            capturedAt: '2026-08-05T12:00:00.000Z',
            policy: THIRD_PARTY_RUNTIME_POLICY,
            schemaVersion: THIRD_PARTY_RUNTIME_SCHEMA_VERSION,
            scripts,
        })
    );
    return { manifestPath, root };
};

const closeServer = (server) =>
    new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));

const createRoute = (url, resourceType = 'script', method = 'GET', postData = null) => {
    const actions = [];
    return {
        actions,
        abort: async (reason) => actions.push({ reason, type: 'abort' }),
        continue: async () => actions.push({ type: 'continue' }),
        fulfill: async (response) => actions.push({ response, type: 'fulfill' }),
        request: () => ({
            method: () => method,
            postData: () => postData,
            resourceType: () => resourceType,
            url: () => url,
        }),
    };
};

test('canonical script matchers retain exact IDs and normalize only volatile gtag parameters', () => {
    assert.deepEqual(matchThirdPartyScriptUrl('https://mc.yandex.ru/metrika/tag.js'), {
        canonicalUrl: 'https://mc.yandex.ru/metrika/tag.js',
        className: 'yandex-metrika-tag',
    });
    assert.deepEqual(
        matchThirdPartyScriptUrl('https://www.googletagmanager.com/gtag/js?gtm=second&id=G-EXACT123&cx=first'),
        {
            canonicalUrl: 'https://www.googletagmanager.com/gtag/js?id=G-EXACT123',
            className: 'google-tag',
        }
    );
    assert.equal(matchThirdPartyScriptUrl('https://www.googletagmanager.com/gtm.js?id=GTM-WRONG'), null);
    assert.deepEqual(
        matchThirdPartyScriptUrl(
            'https://www.googletagmanager.com/gtm.js?id=GTM-MSCF98P&gtm_auth=&gtm_preview=&gtm_cookies_win=x'
        ),
        {
            canonicalUrl: 'https://www.googletagmanager.com/gtm.js?id=GTM-MSCF98P&gtm_cookies_win=x',
            className: 'google-tag-manager',
        }
    );
    assert.equal(
        matchThirdPartyScriptUrl(
            'https://www.googletagmanager.com/gtm.js?id=GTM-MSCF98P&gtm_auth=unexpected&gtm_preview=&gtm_cookies_win=x'
        ),
        null
    );
    assert.equal(matchThirdPartyScriptUrl('https://www.googletagmanager.com/gtag/js?id=G-EXACT123&unexpected=1'), null);
    assert.equal(matchThirdPartyScriptUrl('http://www.google-analytics.com/analytics.js'), null);
});

test('snapshot validation rejects a body whose content no longer matches its recorded SHA-256', async () => {
    const fixture = await createSnapshot();
    try {
        const snapshot = loadThirdPartyRuntimeSnapshot(fixture.manifestPath);
        assert.match(snapshot.provenance.fixtureDigest, /^[a-f0-9]{64}$/u);
        assert.equal(snapshot.provenance.inventory.length, 5);
        assert.equal(
            validateThirdPartyRuntimeProvenance({
                manifestPath: fixture.manifestPath,
                mode: 'snapshot',
                recorded: {
                    mode: 'snapshot',
                    serviceWorkerPolicy: 'unregister-and-block',
                    snapshot: snapshot.provenance,
                },
            }).valid,
            true
        );
        assert.equal(
            validateThirdPartyRuntimeProvenance({
                manifestPath: fixture.manifestPath,
                mode: 'snapshot',
                recorded: {
                    mode: 'snapshot',
                    serviceWorkerPolicy: 'unregister-and-block',
                    snapshot: { ...snapshot.provenance, fixtureDigest: '0'.repeat(64) },
                },
            }).valid,
            false
        );

        await fs.writeFile(path.join(fixture.root, 'google-tag.js'), 'tampered');
        assert.throws(() => loadThirdPartyRuntimeSnapshot(fixture.manifestPath), /body hash mismatch/u);

        const manifest = JSON.parse(await fs.readFile(fixture.manifestPath, 'utf8'));
        const emptyEntry = manifest.scripts.find(({ className }) => className === 'google-tag');
        emptyEntry.bytes = 0;
        emptyEntry.sha256 = digest(Buffer.alloc(0));
        await fs.writeFile(path.join(fixture.root, emptyEntry.body), '');
        await fs.writeFile(fixture.manifestPath, JSON.stringify(manifest));
        assert.throws(() => loadThirdPartyRuntimeSnapshot(fixture.manifestPath), /must not be empty/u);
    } finally {
        await fs.rm(fixture.root, { force: true, recursive: true });
    }
});

test('snapshot replay fulfills every captured script exactly once and sinks known telemetry', async () => {
    const fixture = await createSnapshot();
    try {
        const snapshot = loadThirdPartyRuntimeSnapshot(fixture.manifestPath);
        const context = {
            addInitScript: async () => undefined,
            handler: null,
            route: async (_pattern, handler) => {
                context.handler = handler;
            },
        };
        const replay = await configureThirdPartyRuntimeSnapshot({
            baseUrl: 'http://127.0.0.1:4173',
            context,
            snapshot,
        });
        for (const [, url] of scriptUrls) {
            const route = createRoute(url);
            await context.handler(route);
            assert.equal(route.actions[0].type, 'fulfill');
            assert.equal(route.actions[0].response.status, 200);
        }
        const sink = createRoute('https://mc.yandex.ru/watch/99820027', 'fetch');
        await context.handler(sink);
        assert.equal(sink.actions[0].response.status, 204);
        const analyticsSink = createRoute(
            'https://www.google-analytics.com/j/collect',
            'xhr',
            'POST',
            'v=1&tid=UA-EXACT&t=pageview'
        );
        await context.handler(analyticsSink);
        assert.equal(analyticsSink.actions[0].response.status, 204);

        const queryAnalyticsSink = createRoute('https://www.google.com/g/collect?tid=G-EXACT', 'fetch', 'POST');
        await context.handler(queryAnalyticsSink);
        assert.equal(queryAnalyticsSink.actions[0].response.status, 204);

        const yandexScriptSink = createRoute('https://mc.yandex.com/watch/99820027?callback=fixture', 'script');
        await context.handler(yandexScriptSink);
        assert.equal(yandexScriptSink.actions[0].type, 'abort');

        const activity = await replay.waitForResponses({ timeoutMs: 50 });
        assert.deepEqual(Object.values(activity.counts), [1, 1, 1, 1, 1]);
        assert.equal(activity.sinks['yandex-metrika'], 2);
        assert.equal(activity.sinks['google-analytics'], 2);

        const invalidAnalyticsSink = createRoute(
            'https://www.google-analytics.com/j/collect',
            'xhr',
            'POST',
            'v=1&t=pageview'
        );
        await context.handler(invalidAnalyticsSink);
        assert.equal(invalidAnalyticsSink.actions[0].type, 'abort');

        const duplicate = createRoute(scriptUrls[0][1]);
        await context.handler(duplicate);
        assert.equal(duplicate.actions[0].type, 'abort');
        assert.throws(() => replay.assertComplete(), /more than once/u);
    } finally {
        await fs.rm(fixture.root, { force: true, recursive: true });
    }
});

test('snapshot replay times out when a required captured script never executes', async () => {
    const fixture = await createSnapshot();
    try {
        const context = {
            addInitScript: async () => undefined,
            handler: null,
            route: async (_pattern, handler) => {
                context.handler = handler;
            },
        };
        const replay = await configureThirdPartyRuntimeSnapshot({
            baseUrl: 'http://127.0.0.1:4173',
            context,
            snapshot: loadThirdPartyRuntimeSnapshot(fixture.manifestPath),
        });
        for (const [, url] of scriptUrls.slice(0, -1)) {
            await context.handler(createRoute(url));
        }
        await assert.rejects(replay.waitForResponses({ timeoutMs: 1 }), /replay was incomplete/u);
    } finally {
        await fs.rm(fixture.root, { force: true, recursive: true });
    }
});

test('snapshot quiescence starts after execution and rejects late unknown traffic', async () => {
    const fixture = await createSnapshot();
    try {
        const context = {
            addInitScript: async () => undefined,
            handler: null,
            route: async (_pattern, handler) => {
                context.handler = handler;
            },
        };
        const replay = await configureThirdPartyRuntimeSnapshot({
            baseUrl: 'http://127.0.0.1:4173',
            context,
            snapshot: loadThirdPartyRuntimeSnapshot(fixture.manifestPath),
        });
        for (const [, url] of scriptUrls) await context.handler(createRoute(url));
        await new Promise((resolve) => setTimeout(resolve, 75));
        await replay.waitForExecution({
            page: {
                evaluate: async () => scriptUrls.map(([, url]) => url),
                waitForFunction: async () => undefined,
            },
            timeoutMs: 50,
        });
        const lateRoute = createRoute('https://unknown.example.test/late', 'fetch');
        const lateRequest = new Promise((resolve) => setTimeout(() => resolve(context.handler(lateRoute)), 10));
        await assert.rejects(replay.waitForQuiescence({ quietMs: 50, timeoutMs: 200 }), /Unknown external request/u);
        await lateRequest;
        assert.equal(lateRoute.actions[0].type, 'abort');
    } finally {
        await fs.rm(fixture.root, { force: true, recursive: true });
    }
});

test('snapshot replay fails unknown external scripts and unknown external requests', async () => {
    const fixture = await createSnapshot();
    try {
        const context = {
            addInitScript: async () => undefined,
            handler: null,
            route: async (_pattern, handler) => {
                context.handler = handler;
            },
        };
        const replay = await configureThirdPartyRuntimeSnapshot({
            baseUrl: 'http://127.0.0.1:4173',
            context,
            snapshot: loadThirdPartyRuntimeSnapshot(fixture.manifestPath),
        });
        await context.handler(createRoute('https://cdn.example.test/unrecorded.js'));
        await context.handler(createRoute('https://api.example.test/collect', 'fetch'));
        const insecureSink = createRoute('http://mc.yandex.ru/watch/99820027', 'fetch');
        await context.handler(insecureSink);
        assert.equal(insecureSink.actions[0].type, 'abort');
        assert.throws(() => replay.assertComplete(), /Unknown external script request/u);
        assert(replay.activity().failures.some((failure) => failure.startsWith('Unknown external request:')));
    } finally {
        await fs.rm(fixture.root, { force: true, recursive: true });
    }
});

test('real Playwright routing blocks a persisted intercepting worker and observes exact-once script execution', async () => {
    const fixture = await createSnapshot({ chained: true });
    const userDataDir = await fs.mkdtemp(path.join(os.tmpdir(), 'perf019-browser-profile-'));
    const server = http.createServer((request, response) => {
        if (request.url === '/sw.js') {
            response.writeHead(200, { 'content-type': 'application/javascript', 'service-worker-allowed': '/' });
            response.end(
                "self.addEventListener('install',()=>self.skipWaiting());self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));self.addEventListener('fetch',event=>{if(new URL(event.request.url).origin!==self.location.origin&&event.request.destination==='script')event.respondWith(new Response('window.__serviceWorkerIntercepted=true',{headers:{'content-type':'application/javascript'}}));});"
            );
            return;
        }
        response.writeHead(200, { 'content-type': 'text/html' });
        response.end(
            request.url === '/seed'
                ? `<!doctype html><script>
                    navigator.serviceWorker.register('/sw.js').then(() => navigator.serviceWorker.ready).then(() => {
                        window.__fixtureServiceWorkerReady = true;
                    });
                </script>`
                : request.url === '/isolate'
                  ? '<!doctype html><title>Isolate service worker</title>'
                  : `<!doctype html><script>document.head.append(Object.assign(document.createElement('script'), { src: ${JSON.stringify(scriptUrls[0][1])} }));</script>`
        );
    });
    await new Promise((resolve, reject) => {
        server.once('error', reject);
        server.listen(0, '127.0.0.1', resolve);
    });
    const address = server.address();
    const baseUrl = `http://127.0.0.1:${address.port}`;
    let context;
    let seedContext;
    try {
        seedContext = await chromium.launchPersistentContext(userDataDir, {
            headless: true,
            serviceWorkers: 'allow',
        });
        const seedPage = seedContext.pages()[0] ?? (await seedContext.newPage());
        await seedPage.goto(`${baseUrl}/seed`, { waitUntil: 'domcontentloaded' });
        await seedPage.waitForFunction(() => window.__fixtureServiceWorkerReady === true, null, { timeout: 5_000 });
        await seedPage.reload({ waitUntil: 'domcontentloaded' });
        await seedPage.waitForFunction(() => Boolean(navigator.serviceWorker.controller), null, { timeout: 5_000 });
        await seedPage.evaluate((url) => {
            document.head.append(Object.assign(document.createElement('script'), { src: url }));
        }, scriptUrls[0][1]);
        await seedPage.waitForFunction(() => window.__serviceWorkerIntercepted === true, null, { timeout: 5_000 });
        assert.equal(await seedPage.evaluate(() => Boolean(navigator.serviceWorker.controller)), true);
        await seedContext.close();
        seedContext = null;

        context = await chromium.launchPersistentContext(userDataDir, {
            headless: true,
            serviceWorkers: 'block',
        });
        const replay = await configureThirdPartyRuntimeSnapshot({
            baseUrl,
            context,
            snapshot: loadThirdPartyRuntimeSnapshot(fixture.manifestPath),
        });
        const isolationPage = context.pages()[0] ?? (await context.newPage());
        await isolationPage.goto(`${baseUrl}/isolate`, { waitUntil: 'domcontentloaded' });
        const registrationIsolation = await isolationPage.evaluate(async () => {
            const registrations = await navigator.serviceWorker.getRegistrations();
            const removed = await Promise.all(registrations.map((registration) => registration.unregister()));
            return { found: registrations.length, removed: removed.filter(Boolean).length };
        });
        assert.deepEqual(registrationIsolation, { found: 1, removed: 1 });
        await isolationPage.close();
        const page = await context.newPage();
        await page.goto(`${baseUrl}/run`, { waitUntil: 'domcontentloaded' });
        assert.equal(await page.evaluate(() => Boolean(navigator.serviceWorker.controller)), false);
        await page.waitForFunction(() => window.__thirdPartyFixtureExecuted === true, null, { timeout: 5_000 });
        const activity = await replay.waitForExecution({ page, timeoutMs: 10_000 });
        await replay.waitForQuiescence({ quietMs: 50, timeoutMs: 2_000 });
        assert.deepEqual(Object.values(activity.executed), [1, 1, 1, 1, 1]);
        assert.equal(await page.evaluate(() => Boolean(navigator.serviceWorker.controller)), false);
        assert.equal(await page.evaluate(() => window.__serviceWorkerIntercepted === true), false);
    } finally {
        await seedContext?.close();
        await context?.close();
        await closeServer(server);
        await fs.rm(userDataDir, { force: true, recursive: true });
        await fs.rm(fixture.root, { force: true, recursive: true });
    }
});

test('third-party runtime defaults to blocked and snapshot replay is isolated from offline scenarios', () => {
    const common = ['--label', 'fixture', '--root', 'www', '--output', 'output/performance/fixture'];
    const defaultOptions = parseExperienceArguments([...common, '--runs', '1']);
    assert.equal(defaultOptions.thirdPartyRuntime, 'blocked');
    assert.equal(defaultOptions.thirdPartySnapshot, null);
    assert(!defaultOptions.selectedScenarios.includes('startup-third-party-runtime'));
    const allBlocked = parseExperienceArguments([...common, '--scenarios', 'all']);
    assert(!allBlocked.selectedScenarios.includes('startup-third-party-runtime'));

    assert.throws(
        () =>
            parseExperienceArguments([
                ...common,
                '--scenarios',
                'startup-process-cold-offline',
                '--third-party-runtime',
                'snapshot',
                '--third-party-snapshot',
                'fixtures/manifest.json',
            ]),
        /online-only/u
    );
    assert.throws(
        () =>
            parseExperienceArguments([
                ...common,
                '--scenarios',
                'startup-process-cold-online',
                '--third-party-runtime',
                'snapshot',
                '--third-party-snapshot',
                'fixtures/manifest.json',
            ]),
        /isolated to the startup-third-party-runtime/u
    );
    assert.throws(
        () =>
            parseExperienceArguments([
                ...common,
                '--scenarios',
                'startup-third-party-runtime',
                '--third-party-runtime',
                'snapshot',
                '--third-party-snapshot',
                'fixtures/manifest.json',
            ]),
        /CPU-only/u
    );
    const snapshot = parseExperienceArguments([
        ...common,
        '--profiles',
        'cpu-only',
        '--scenarios',
        'startup-third-party-runtime',
        '--third-party-runtime',
        'snapshot',
        '--third-party-snapshot',
        'fixtures/manifest.json',
    ]);
    assert.equal(snapshot.selectedScenarios[0], 'startup-third-party-runtime');
    assert.equal(snapshot.thirdPartyRuntime, 'snapshot');
});
