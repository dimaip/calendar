import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { milestoneFromPhase } from './lib/browser-observers.mjs';
import { createPersistedStateFixture } from './lib/browser-profile.mjs';
import { subtractPerformanceMetrics } from './lib/cdp-diagnostics.mjs';
import { summarizeExperienceRuns } from './lib/experience-artifacts.mjs';
import { parseExperienceArguments } from './lib/experience-options.mjs';
import { createExperienceServer } from './lib/experience-server.mjs';
import { horizontalGesture, verticalGesture } from './lib/touch-input.mjs';

test('parses smoke scenarios and expands scenario groups', () => {
    const options = parseExperienceArguments([
        '--label',
        'baseline',
        '--root',
        'www',
        '--output',
        'output/performance/test',
        '--scenarios',
        'startup,language',
        '--runs',
        '1',
    ]);
    assert.equal(options.mode, 'smoke');
    assert.equal(options.runs, 1);
    assert(options.selectedScenarios.includes('startup-process-cold-offline'));
    assert(options.selectedScenarios.includes('service-cold-parallel'));
    assert(!options.selectedScenarios.includes('retention'));
    assert(!options.selectedScenarios.includes('offline-unvisited-all-languages'));
});

test('keeps long retention and strict offline coverage out of repeated default samples', () => {
    const options = parseExperienceArguments([
        '--label',
        'baseline',
        '--root',
        'www',
        '--output',
        'output/performance/test',
    ]);
    assert(options.selectedScenarios.includes('startup-process-cold-offline'));
    assert(options.selectedScenarios.includes('touch-reading-rapid'));
    assert(options.selectedScenarios.includes('service-cold-parallel'));
    assert(!options.selectedScenarios.includes('retention'));
    assert(!options.selectedScenarios.includes('offline-unvisited-all-languages'));
});

test('rejects unsupported authenticated fixtures rather than inventing credentials', () => {
    assert.throws(
        () =>
            parseExperienceArguments([
                '--label',
                'auth',
                '--root',
                'www',
                '--output',
                'output/performance/test',
                '--state',
                'authenticated-normal',
            ]),
        /intentionally unsupported/u
    );
});

test('creates persisted-state fixtures at the requested realistic orders of magnitude', () => {
    const normal = Buffer.byteLength(createPersistedStateFixture('anonymous-normal'));
    const hundredKilobytes = Buffer.byteLength(createPersistedStateFixture('anonymous-100k'));
    const oneMegabyte = Buffer.byteLength(createPersistedStateFixture('anonymous-1m'));
    assert(normal < 1024);
    assert(hundredKilobytes >= 100 * 1024 && hundredKilobytes < 100 * 1024 + 8);
    assert(oneMegabyte >= 1024 * 1024 && oneMegabyte < 1024 * 1024 + 8);
});

test('summarizes nested metrics with interpolated median and p75', () => {
    const summary = summarizeExperienceRuns([
        { scenarios: { startup: { readyMs: 100 } } },
        { scenarios: { startup: { readyMs: 200 } } },
        { scenarios: { startup: { readyMs: 300 } } },
        { scenarios: { startup: { readyMs: 400 } } },
    ]);
    assert.deepEqual(summary['startup.readyMs'], {
        max: 400,
        median: 250,
        min: 100,
        p75: 325,
        samples: 4,
    });
});

test('omits service milestones that predate an interaction phase instead of reporting negative durations', () => {
    assert.equal(milestoneFromPhase(455.5, 1000), null);
    assert.equal(milestoneFromPhase(null, 1000), null);
    assert.equal(milestoneFromPhase(1125, 1000), 125);

    const summary = summarizeExperienceRuns([
        {
            scenarios: {
                touch: {
                    completeFromPhaseMs: milestoneFromPhase(455.5, 1000),
                    durationMs: 300,
                    tocReadyFromPhaseMs: milestoneFromPhase(900, 1000),
                },
            },
        },
    ]);
    assert.equal('touch.completeFromPhaseMs' in summary, false);
    assert.equal('touch.tocReadyFromPhaseMs' in summary, false);
    assert.equal(summary['touch.durationMs'].median, 300);
});

test('CDP metric subtraction preserves durations, counts, and heap gauges', () => {
    assert.deepEqual(
        subtractPerformanceMetrics(
            { TaskDuration: 1, LayoutCount: 2, JSHeapUsedSize: 10 },
            { TaskDuration: 1.25, LayoutCount: 5, JSHeapTotalSize: 40, JSHeapUsedSize: 20 }
        ),
        {
            TaskDurationMs: 250,
            ScriptDurationMs: 0,
            LayoutDurationMs: 0,
            RecalcStyleDurationMs: 0,
            LayoutCount: 3,
            RecalcStyleCount: 0,
            JSHeapTotalBytes: 40,
            JSHeapUsedBytes: 20,
        }
    );
});

test('touch profiles describe bounded vertical and horizontal CDP gestures', () => {
    const rapid = verticalGesture({ height: 640, kind: 'rapid', width: 360 });
    const precision = verticalGesture({ height: 640, kind: 'precision', width: 360 });
    const left = horizontalGesture({ direction: 'left', height: 640, width: 360 });
    assert(rapid.start.y > rapid.end.y);
    assert(precision.durationMs > rapid.durationMs);
    assert(left.start.x > left.end.x);
    assert.equal(left.start.y, left.end.y);
});

test('static server rewrites the manifest for its local origin and preserves cache headers', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'perf017-server-test-'));
    await fs.mkdir(path.join(root, 'built'));
    await fs.writeFile(path.join(root, 'index.html'), '<!doctype html><title>fixture</title>');
    await fs.writeFile(
        path.join(root, 'manifest.json'),
        JSON.stringify({ name: 'fixture', start_url: 'https://example.test' })
    );
    await fs.writeFile(path.join(root, 'built', 'main.123456789abc.js'), 'window.fixture = true;');
    const server = await createExperienceServer({ contentEncoding: 'identity', port: 0, root });
    try {
        const manifestResponse = await fetch(`${server.baseUrl}/manifest.json`);
        const manifest = await manifestResponse.json();
        assert.equal(manifest.start_url, `${server.baseUrl}/?utm_source=homescreen&from_home`);
        assert.equal(manifest.scope, '/');

        const assetResponse = await fetch(`${server.baseUrl}/built/main.123456789abc.js`);
        assert.equal(assetResponse.headers.get('cache-control'), 'public, max-age=31536000, immutable');
    } finally {
        await server.close();
        await fs.rm(root, { force: true, recursive: true });
    }
});
