import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { finalizeThirdPartyRuntimeCapture, parseThirdPartyCaptureArguments } from './capture-third-party-runtime.mjs';
import {
    createThirdPartyRuntimeCaptureCollector,
    writeThirdPartyRuntimeCapture,
} from './lib/third-party-runtime-capture.mjs';
import {
    loadThirdPartyRuntimeSnapshot,
    matchThirdPartyScriptUrl,
    THIRD_PARTY_RUNTIME_POLICY,
    THIRD_PARTY_RUNTIME_SCHEMA_VERSION,
} from './lib/third-party-runtime.mjs';

const scriptUrls = [
    ['yandex-metrika-tag', 'https://mc.yandex.ru/metrika/tag.js'],
    [
        'google-tag-manager',
        'https://www.googletagmanager.com/gtm.js?id=GTM-MSCF98P&gtm_auth=&gtm_preview=&gtm_cookies_win=x',
    ],
    ['google-tag', 'https://www.googletagmanager.com/gtag/js?id=G-EXACT123&gtm=volatile&cx=c'],
    ['google-tag-destination', 'https://www.googletagmanager.com/gtag/destination?id=G-EXACT123&gtm=volatile&cx=c'],
    ['google-analytics', 'https://www.google-analytics.com/analytics.js'],
];

const recordValidMockResponses = () => {
    const collector = createThirdPartyRuntimeCaptureCollector({ applicationOrigin: 'https://molitva.app' });
    for (const [className, url] of scriptUrls) {
        const body = Buffer.from(`window.__captured=${JSON.stringify(className)};`);
        assert.equal(collector.inspectRequest({ resourceType: 'script', url }).action, 'continue');
        collector.recordResponse({
            body,
            contentType: 'application/javascript; charset=utf-8',
            resourceType: 'script',
            status: 200,
            url,
        });
    }
    return collector;
};

test('capture CLI requires an explicit output and rejects ambiguous or credential-bearing input', () => {
    assert.deepEqual(
        parseThirdPartyCaptureArguments([
            '--url',
            'https://molitva.app/#/date/2026-07-28',
            '--output',
            'output/performance/vendor-runtime',
            '--timeout-ms',
            '5000',
            '--quiet-ms',
            '750',
        ]),
        {
            headless: true,
            outputDirectory: path.resolve('output/performance/vendor-runtime'),
            quietMs: 750,
            targetUrl: 'https://molitva.app/#/date/2026-07-28',
            timeoutMs: 5000,
        }
    );
    assert.deepEqual(parseThirdPartyCaptureArguments(['--help']), { help: true });
    assert.throws(() => parseThirdPartyCaptureArguments(['--url', 'https://molitva.app']), /Required arguments/u);
    assert.throws(
        () => parseThirdPartyCaptureArguments(['--url', 'https://user:secret@molitva.app', '--output', 'fixture']),
        /without embedded credentials/u
    );
    assert.throws(
        () =>
            parseThirdPartyCaptureArguments([
                '--url',
                'https://molitva.app',
                '--url',
                'https://molitva.app',
                '--output',
                'fixture',
            ]),
        /only once/u
    );
});

test('mocked production responses produce the exact validated five-body snapshot without live network', async () => {
    const temporaryRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'perf019-third-party-capture-'));
    const outputDirectory = path.join(temporaryRoot, 'snapshot');
    try {
        const entries = recordValidMockResponses().assertComplete();
        const googleTag = entries.find(({ className }) => className === 'google-tag');
        googleTag.url =
            'https://www.googletagmanager.com/gtag/js?id=G-EXACT123&gtm=token-like-value&cx=secret-like-value';
        const result = await writeThirdPartyRuntimeCapture({
            capturedAt: '2026-08-05T12:00:00.000Z',
            entries,
            outputDirectory,
        });
        const snapshot = loadThirdPartyRuntimeSnapshot(result.manifestPath);
        assert.equal(snapshot.provenance.policy, THIRD_PARTY_RUNTIME_POLICY);
        assert.equal(snapshot.provenance.schemaVersion, THIRD_PARTY_RUNTIME_SCHEMA_VERSION);
        assert.equal(snapshot.provenance.inventory.length, 5);
        assert.equal(result.provenance.fixtureDigest, snapshot.provenance.fixtureDigest);

        const manifest = JSON.parse(await fs.readFile(result.manifestPath, 'utf8'));
        assert.deepEqual(Object.keys(manifest), ['capturedAt', 'policy', 'schemaVersion', 'scripts']);
        assert.deepEqual(
            manifest.scripts.map(({ className }) => className),
            scriptUrls.map(([className]) => className)
        );
        assert(!JSON.stringify(manifest).includes('token-like-value'));
        assert(!JSON.stringify(manifest).includes('secret-like-value'));
        for (const script of manifest.scripts) {
            const body = await fs.readFile(path.join(outputDirectory, script.body));
            assert.equal(script.bytes, body.byteLength);
            assert.equal(script.sha256, createHash('sha256').update(body).digest('hex'));
            assert.deepEqual(matchThirdPartyScriptUrl(script.url), {
                canonicalUrl: script.canonicalUrl,
                className: script.className,
            });
        }
    } finally {
        await fs.rm(temporaryRoot, { force: true, recursive: true });
    }
});

test('capture finalization freezes browser activity, revalidates health, and bounds stalled body reads', async () => {
    const lateFailure = recordValidMockResponses();
    await assert.rejects(
        finalizeThirdPartyRuntimeCapture({
            closeContext: async () => lateFailure.recordFailure('Late unknown external script.'),
            collector: lateFailure,
            deadline: Date.now() + 1_000,
            pendingResponses: new Set(),
            quietMs: 1,
        }),
        /Late unknown external script/u
    );

    const stalled = recordValidMockResponses();
    await assert.rejects(
        finalizeThirdPartyRuntimeCapture({
            closeContext: async () => undefined,
            collector: stalled,
            deadline: Date.now() + 20,
            pendingResponses: new Set([new Promise(() => undefined)]),
            quietMs: 1,
        }),
        /timed out while reading response bodies/u
    );
});

test('capture collector rejects unknown scripts, duplicates, redirects, and missing classes', () => {
    const externalTraffic = createThirdPartyRuntimeCaptureCollector({ applicationOrigin: 'https://molitva.app' });
    assert.equal(
        externalTraffic.inspectRequest({ resourceType: 'fetch', url: 'https://api.c.psmb.ru/day/2026-08-05' }).action,
        'abort'
    );
    assert.equal(
        externalTraffic.inspectRequest({ resourceType: 'fetch', url: 'https://molitva.app/version' }).action,
        'continue'
    );
    assert.equal(
        externalTraffic.inspectRequest({
            resourceType: 'script',
            url: 'https://mc.yandex.com/watch/99820027?callback=fixture',
        }).action,
        'abort'
    );
    assert.doesNotThrow(() => externalTraffic.assertHealthy());

    const unknown = createThirdPartyRuntimeCaptureCollector({ applicationOrigin: 'https://molitva.app' });
    assert.equal(
        unknown.inspectRequest({ resourceType: 'script', url: 'https://cdn.example.test/unknown.js' }).action,
        'abort'
    );
    assert.throws(() => unknown.assertComplete(), /Unknown external script request/u);

    const duplicate = recordValidMockResponses();
    assert.equal(duplicate.inspectRequest({ resourceType: 'script', url: scriptUrls[0][1] }).action, 'abort');
    assert.throws(() => duplicate.assertComplete(), /requested more than once/u);

    const redirected = createThirdPartyRuntimeCaptureCollector({ applicationOrigin: 'https://molitva.app' });
    assert.equal(
        redirected.inspectRequest({
            redirectedFrom: true,
            resourceType: 'script',
            url: scriptUrls[0][1],
        }).action,
        'abort'
    );
    assert.throws(() => redirected.assertComplete(), /Redirected third-party script request/u);

    const missing = createThirdPartyRuntimeCaptureCollector({ applicationOrigin: 'https://molitva.app' });
    for (const [className, url] of scriptUrls.slice(0, -1)) {
        const body = Buffer.from(className);
        missing.inspectRequest({ resourceType: 'script', url });
        missing.recordResponse({
            body,
            contentType: 'text/javascript',
            resourceType: 'script',
            status: 200,
            url,
        });
    }
    assert.throws(() => missing.assertComplete(), /google-analytics/u);
});

test('snapshot publication accepts an empty destination but never overwrites content or leaves staging output', async () => {
    const temporaryRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'perf019-third-party-publication-'));
    const emptyOutput = path.join(temporaryRoot, 'empty-output');
    const occupiedOutput = path.join(temporaryRoot, 'occupied-output');
    const invalidOutput = path.join(temporaryRoot, 'invalid-output');
    try {
        await fs.mkdir(emptyOutput);
        await writeThirdPartyRuntimeCapture({
            capturedAt: '2026-08-05T12:00:00.000Z',
            entries: recordValidMockResponses().assertComplete(),
            outputDirectory: emptyOutput,
        });
        assert.deepEqual((await fs.readdir(emptyOutput)).sort(), [
            'google-analytics.js',
            'google-tag-destination.js',
            'google-tag-manager.js',
            'google-tag.js',
            'manifest.json',
            'yandex-metrika-tag.js',
        ]);

        await fs.mkdir(occupiedOutput);
        await fs.writeFile(path.join(occupiedOutput, 'keep.txt'), 'keep');
        await assert.rejects(
            writeThirdPartyRuntimeCapture({
                capturedAt: '2026-08-05T12:00:00.000Z',
                entries: recordValidMockResponses().assertComplete(),
                outputDirectory: occupiedOutput,
            }),
            /must be empty/u
        );
        assert.equal(await fs.readFile(path.join(occupiedOutput, 'keep.txt'), 'utf8'), 'keep');

        const invalidEntries = recordValidMockResponses().assertComplete();
        invalidEntries[0] = { ...invalidEntries[0], sha256: '0'.repeat(64) };
        await assert.rejects(
            writeThirdPartyRuntimeCapture({
                capturedAt: '2026-08-05T12:00:00.000Z',
                entries: invalidEntries,
                outputDirectory: invalidOutput,
            }),
            /invalid body metadata/u
        );
        await assert.rejects(fs.stat(invalidOutput), { code: 'ENOENT' });
        assert.equal(
            (await fs.readdir(temporaryRoot)).some((name) => name.startsWith('.invalid-output.capture-')),
            false
        );
    } finally {
        await fs.rm(temporaryRoot, { force: true, recursive: true });
    }
});
