import assert from 'node:assert/strict';
import test from 'node:test';

test('settles only complete and TOC milestones from the latest navigation', async () => {
    const originalDocument = globalThis.document;
    const originalNavigator = globalThis.navigator;
    const originalPerformance = globalThis.performance;
    const originalPerformanceObserver = globalThis.PerformanceObserver;
    const originalVersion = globalThis.VERSION;
    const originalWindow = globalThis.window;
    const marks = [];
    const timers = new Map();
    let nextTimerId = 0;
    let observerCallback;

    Object.defineProperties(globalThis, {
        document: {
            configurable: true,
            value: { readyState: 'loading' },
        },
        navigator: {
            configurable: true,
            value: { hardwareConcurrency: 4 },
        },
        performance: {
            configurable: true,
            value: {
                clearMarks: (name) => marks.push({ name: `clear:${name}` }),
                mark: (name, options) => marks.push({ detail: options?.detail, name }),
                now: () => 2_000,
            },
        },
        PerformanceObserver: {
            configurable: true,
            value: class {
                constructor(callback) {
                    observerCallback = callback;
                }

                disconnect() {}

                observe() {}
            },
        },
        VERSION: {
            configurable: true,
            value: 'test',
        },
        window: {
            configurable: true,
            value: {
                addEventListener() {},
                clearTimeout: (timerId) => timers.delete(timerId),
                matchMedia: () => ({ matches: false }),
                origin: 'https://example.test',
                setTimeout: (callback, delay) => {
                    nextTimerId += 1;
                    timers.set(nextTimerId, { callback, delay });
                    return nextTimerId;
                },
            },
        },
    });

    try {
        const { startPerformanceTelemetry } = await import('./performanceTelemetry.ts');
        startPerformanceTelemetry();
        assert.equal(typeof observerCallback, 'function');

        const entry = (name, startTime, navigationSequence, renderKey) => ({
            detail: {
                navigationKey: `navigation-${navigationSequence}`,
                navigationSequence,
                ...(renderKey ? { renderKey } : {}),
            },
            name,
            startTime,
        });
        const deliver = (...entries) => observerCallback({ getEntries: () => entries });

        deliver(entry('service_complete_commit', 100, 1, 'render-1'), entry('service_toc_ready', 200, 1));
        assert.deepEqual(
            [...timers.values()].map(({ delay }) => delay),
            [750]
        );

        deliver(entry('navigation_intent', 300, 2));
        assert.equal(timers.size, 0);
        deliver(entry('service_toc_ready', 400, 1));
        assert.equal(timers.size, 0);

        deliver(entry('service_toc_ready', 500, 2), entry('service_complete_commit', 450, 2, 'render-2'));
        assert.deepEqual(
            [...timers.values()].map(({ delay }) => delay),
            [750]
        );
        const [{ callback }] = timers.values();
        callback();

        assert.deepEqual(window.dataLayer, [
            {
                appMode: 'browser',
                release: 'test',
                deviceMemory: undefined,
                effectiveConnectionType: undefined,
                hardwareConcurrency: 4,
                saveData: undefined,
                serviceWorkerControlled: false,
                standalone: false,
                event: 'service_performance',
                completeCommit: 450,
                completeFromIntent: 150,
                navigationIntent: 300,
                navigationKey: 'navigation-2',
                navigationSequence: 2,
                renderKey: 'render-2',
                settled: 2_000,
                settledFromIntent: 1_700,
                tocReady: 500,
                tocReadyFromIntent: 200,
            },
        ]);
        assert.deepEqual(marks.at(-1), {
            detail: {
                completeCommit: 450,
                completeFromIntent: 150,
                navigationIntent: 300,
                navigationKey: 'navigation-2',
                navigationSequence: 2,
                renderKey: 'render-2',
                settled: 2_000,
                settledFromIntent: 1_700,
                tocReady: 500,
                tocReadyFromIntent: 200,
            },
            name: 'service_settled',
        });

        timers.clear();
        deliver(entry('service_complete_commit', 700, 3, 'render-3'), entry('service_toc_ready', 800, 3));
        const [{ callback: settleWithoutIntent }] = timers.values();
        settleWithoutIntent();
        const eventWithoutIntent = window.dataLayer.at(-1);
        const markWithoutIntent = marks.at(-1);
        assert.equal(eventWithoutIntent.navigationKey, 'navigation-3');
        assert.equal(markWithoutIntent.detail.navigationKey, 'navigation-3');
        for (const field of ['completeFromIntent', 'navigationIntent', 'settledFromIntent', 'tocReadyFromIntent']) {
            assert.equal(field in eventWithoutIntent, false);
            assert.equal(field in markWithoutIntent.detail, false);
        }
    } finally {
        Object.defineProperties(globalThis, {
            document: { configurable: true, value: originalDocument },
            navigator: { configurable: true, value: originalNavigator },
            performance: { configurable: true, value: originalPerformance },
            PerformanceObserver: { configurable: true, value: originalPerformanceObserver },
            VERSION: { configurable: true, value: originalVersion },
            window: { configurable: true, value: originalWindow },
        });
    }
});

test('keeps language intent and TOC readiness keyed without changing their timing windows', async () => {
    const { readFile } = await import('node:fs/promises');
    const languageSwitcher = await readFile(
        new URL('../containers/Service/LanguageSwitcher.tsx', import.meta.url),
        'utf8'
    );
    const tocProvider = await readFile(new URL('../components/TOC/TOCProvider.tsx', import.meta.url), 'utf8');
    const telemetry = await readFile(new URL('./performanceTelemetry.ts', import.meta.url), 'utf8');
    const app = await readFile(new URL('../containers/App.tsx', import.meta.url), 'utf8');

    assert.match(app, /window\.addEventListener\('popstate', markHistoryNavigationIntent\)/);
    assert.match(app, /initiator: 'browser-history'/);
    assert.doesNotMatch(app, /history\.(pushState|replaceState)\s*=/);
    assert.match(languageSwitcher, /markNavigationIntent\(\{[\s\S]*?targetLanguage: lang,[\s\S]*?\}\);\s*setLang/);
    assert.match(tocProvider, /const TOC_READY_DELAY_MS = 500/);
    assert.match(tocProvider, /markPerformance\('service_toc_ready', \{ tocEntryCount: items\.length \}, navigation\)/);
    assert.match(telemetry, /\}, 750\);/);
});
