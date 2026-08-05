import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';

import {
    assertServiceRenderKey,
    calculateLinearSlope,
    evaluateRetentionThresholds,
    expectedDateAfterSwipe,
    isBuiltAssetPath,
} from './lib/browser-profile.mjs';
import {
    comparePrecacheCoverage,
    configureExperienceFixtures,
    createColdLanguageCacheEntries,
    createFutureCorpusKeys,
    deterministicDayFixture,
    deterministicReadingsFixture,
    extractExpectedPrecacheUrls,
    resolveExperienceApiFixture,
} from './lib/experience-server.mjs';

test('extracts and exactly compares Workbox precache entries across quote styles', () => {
    const source = `precache([{revision:null,url:'/built/main.abc.css'},{'revision':'123','url':'/index.html'}])`;
    const expected = extractExpectedPrecacheUrls(source);
    assert.deepEqual(expected, ['/built/main.abc.css', '/index.html']);
    assert.deepEqual(
        comparePrecacheCoverage(expected, [
            'http://local/built/main.abc.css',
            'http://local/index.html?__WB_REVISION__=123',
        ]).missing,
        []
    );
    assert.deepEqual(comparePrecacheCoverage(expected, ['/built/main.abc.css']), {
        actual: ['/built/main.abc.css'],
        expected: ['/built/main.abc.css', '/index.html'],
        missing: ['/index.html'],
        unexpected: [],
    });
});

test('defines the complete 11-day, four-endpoint future API corpus', () => {
    const keys = createFutureCorpusKeys(new Date('2026-08-05T09:00:00.000Z'));
    assert.equal(keys.length, 44);
    assert(keys.includes('https://api.c.psmb.ru/day/2026-08-05'));
    assert(keys.includes('https://api.c.psmb.ru/parts/2026-08-15/ru'));
    assert(keys.includes('https://psmb.ru/?calendarDate=2026-08-15'));
    assert(keys.includes('https://api.c.psmb.ru/readings/2026-08-15'));
});

test('bulk reading fixtures cover every ordinary and brotherhood citation with complete records', () => {
    const links = [deterministicDayFixture.readings, deterministicDayFixture.bReadings].flatMap((services) =>
        Object.values(services).flatMap((readingTypes) => Object.values(readingTypes).flat())
    );
    assert.deepEqual(Object.keys(deterministicReadingsFixture).sort(), [...new Set(links)].sort());
    for (const link of links) {
        const reading = deterministicReadingsFixture[link];
        assert.equal(typeof reading.bookKey, 'string');
        assert.equal(typeof reading.bookName, 'string');
        assert.equal(typeof reading.chapCount, 'string');
        assert.equal(reading.translationCurrent, 'default');
        assert.deepEqual(reading.translationList, [{ id: 'default', name: 'Русский' }]);
        assert.equal(reading.verseKey, link);
        assert.equal(reading.fragments.length, 1);
        assert.equal(reading.fragments[0].verses.length, 1);
        assert.equal(typeof reading.fragments[0].verses[0].text, 'string');
    }
    assert.equal(resolveExperienceApiFixture('/readings/2026-08-05'), deterministicReadingsFixture);
});

test('cold-language fixtures cover CSJ parts and every translated reading without warming service chunks', () => {
    const entries = createColdLanguageCacheEntries('2026-07-28');
    assert.equal(entries.length, Object.keys(deterministicReadingsFixture).length + 1);
    assert.equal(entries[0].key, 'https://api.c.psmb.ru/parts/2026-07-28/csj');
    assert.deepEqual(JSON.parse(entries[0].value), {});
    for (const { key, value } of entries.slice(1)) {
        assert.match(key, /^https:\/\/api\.c\.psmb\.ru\/reading\/.+&translation=91Slavic&translationPriority=$/u);
        assert.equal(JSON.parse(value).translationCurrent, '91Slavic');
    }
});

test('API fixture routing aborts unknown endpoints instead of returning an empty success', async () => {
    const registrations = [];
    const activity = await configureExperienceFixtures({
        route: async (pattern, handler) => registrations.push({ handler, pattern }),
    });
    const apiRoute = registrations.find(({ pattern }) => pattern === 'https://api.c.psmb.ru/**');
    const calls = [];
    await apiRoute.handler({
        abort: async (reason) => calls.push({ reason, type: 'abort' }),
        fulfill: async (response) => calls.push({ response, type: 'fulfill' }),
        request: () => ({ url: () => 'https://api.c.psmb.ru/unmodelled' }),
    });
    assert.deepEqual(calls, [{ reason: 'failed', type: 'abort' }]);
    assert.equal(activity.fulfilled, 0);
    assert.deepEqual(resolveExperienceApiFixture('/parts/2026-08-05/csj'), {});
});

test('measured cloned launches are route-free and fixture routing remains seed-only', async () => {
    const source = await fs.readFile(new URL('./lib/browser-profile.mjs', import.meta.url), 'utf8');
    assert.match(source, /fixtures = false/u);
    assert.match(source, /fixtures: true[\s\S]+seedPersistentProfile|seedPersistentProfile[\s\S]+fixtures: true/u);
    assert.match(source, /fixtures \? await configureExperienceFixtures\(context\) : \{ fulfilled: 0 \}/u);
});

test('treats failures for every built asset type as lifecycle failures', () => {
    assert.equal(isBuiltAssetPath('/built/app.123.js'), true);
    assert.equal(isBuiltAssetPath('/built/app.123.css'), true);
    assert.equal(isBuiltAssetPath('/built/font.woff2'), true);
    assert.equal(isBuiltAssetPath('/built/icon.svg'), true);
    assert.equal(isBuiltAssetPath('/assets/icon.svg'), false);
});

test('requires semantic render keys and exact swipe destinations', () => {
    assert.equal(assertServiceRenderKey('service:ru:2026-07-28', 'ru'), 'service:ru:2026-07-28');
    assert.equal(assertServiceRenderKey('service:parallel:ru:csj', 'parallel'), 'service:parallel:ru:csj');
    assert.throws(() => assertServiceRenderKey(null, 'csj'), /missing or unexpected render key/u);
    assert.throws(() => assertServiceRenderKey('service:parallel:ru:csj', 'ru'), /unexpected render key/u);
    assert.equal(expectedDateAfterSwipe('2026-07-28', 'left'), '2026-07-29');
    assert.equal(expectedDateAfterSwipe('2026-07-28', 'right'), '2026-07-27');
});

test('reports live-state slopes and enforces retention thresholds only for 20+ cycles', () => {
    assert.equal(calculateLinearSlope([10, 12, 14]), 2);
    const samples = Array.from({ length: 21 }, (_, index) => ({
        jsEventListeners: 10 + index,
        jsHeapUsedBytes: 1_000_000 + index * 200_000,
        nodes: 100 + index * 20,
        nonPassiveTouchListeners: index,
        observerCounts: { intersectionLive: index, mutationLive: 1, resizeLive: 0 },
    }));
    const smoke = evaluateRetentionThresholds({ cycles: 2, samples: samples.slice(0, 3) });
    assert.equal(smoke.mechanicsOnly, true);
    assert.equal(smoke.passed, true);
    const gate = evaluateRetentionThresholds({ cycles: 20, samples });
    assert.equal(gate.enforced, true);
    assert.equal(gate.passed, false);
    assert(gate.failures.some(({ metric }) => metric === 'observerSlopePerCycle'));
});
