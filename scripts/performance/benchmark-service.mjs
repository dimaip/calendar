import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { performance } from 'node:perf_hooks';
import { createGzip } from 'node:zlib';

import { chromium } from 'playwright';

const DATE_PATH = '/#/date/2026-07-28';
const SERVICE_PATH = `${DATE_PATH}/service/%D0%9B%D0%B8%D1%82%D1%83%D1%80%D0%B3%D0%B8%D1%8F`;
const SERVICE_HEADING = 'Божественная литургия Иоанна Златоуста';
const MINIMUM_TOC_ENTRIES = 65;
const QUIET_WINDOW_MS = 750;
const STABILITY_SAMPLE_MS = 250;
const STABILITY_SAMPLE_COUNT = 3;
const DEFAULT_SCENARIOS = ['core', 'language', 'toc', 'scroll', 'search', 'warm', 'retention'];
const AVAILABLE_SCENARIOS = new Set(DEFAULT_SCENARIOS);
const COMPRESSIBLE_EXTENSIONS = new Set(['.css', '.html', '.js', '.json', '.map', '.svg', '.txt', '.xml']);

const profiles = {
    'cpu-only': {
        description: 'Older-phone CPU isolation: 6× CPU slowdown with an unthrottled local network.',
        cpuRate: 6,
        latencyMs: 0,
        downloadBytesPerSecond: -1,
        uploadBytesPerSecond: -1,
        viewport: { width: 390, height: 844 },
    },
    'older-phone': {
        description: 'Budget Android proxy: 4× CPU slowdown, 150 ms RTT, 1.6 Mbps down, 750 Kbps up.',
        cpuRate: 4,
        latencyMs: 150,
        downloadBytesPerSecond: (1.6 * 1024 * 1024) / 8,
        uploadBytesPerSecond: (750 * 1024) / 8,
        viewport: { width: 360, height: 640 },
    },
    'stress-phone': {
        description: 'Stress Android proxy: 6× CPU slowdown, 150 ms RTT, 1.6 Mbps down, 750 Kbps up.',
        cpuRate: 6,
        latencyMs: 150,
        downloadBytesPerSecond: (1.6 * 1024 * 1024) / 8,
        uploadBytesPerSecond: (750 * 1024) / 8,
        viewport: { width: 360, height: 640 },
    },
};

const dayFixture = {
    title: 'Седмица 9-я по Пятидесятнице',
    glas: 7,
    matinsGospelKey: null,
    readings: {
        Утреня: {
            Равноапостольному: ['Ин., 36 зач., X, 9-16.', 'Мф., 55 зач., XIII, 44-54.'],
        },
        Литургия: {
            Равноапостольному: ['Гал., 200 зач., I, 11-19.', 'Ин., 35 зач., X, 1-9.'],
        },
    },
    bReadings: {
        Утром: { unnamed: ['Мф. XX, 17–34'] },
        Вечером: { unnamed: ['1 Кор. VIII, 1-13'] },
    },
    saints: '',
    comment: '',
    week: '',
};

const mimeTypes = new Map([
    ['.css', 'text/css; charset=utf-8'],
    ['.gif', 'image/gif'],
    ['.html', 'text/html; charset=utf-8'],
    ['.ico', 'image/x-icon'],
    ['.jpeg', 'image/jpeg'],
    ['.jpg', 'image/jpeg'],
    ['.js', 'text/javascript; charset=utf-8'],
    ['.json', 'application/json; charset=utf-8'],
    ['.map', 'application/json; charset=utf-8'],
    ['.png', 'image/png'],
    ['.svg', 'image/svg+xml'],
    ['.ttf', 'font/ttf'],
    ['.woff', 'font/woff'],
    ['.woff2', 'font/woff2'],
]);

const parseArguments = () => {
    const values = new Map();
    for (let index = 2; index < process.argv.length; index += 2) {
        const name = process.argv[index];
        const value = process.argv[index + 1];
        if (!name?.startsWith('--') || value === undefined) {
            throw new Error(`Invalid argument near "${name ?? ''}". Expected --name value pairs.`);
        }
        values.set(name.slice(2), value);
    }

    const label = values.get('label') ?? '';
    const rootValue = values.get('root');
    const outputValue = values.get('output');
    const port = Number(values.get('port'));
    const runs = Number(values.get('runs') ?? '3');
    const contentEncoding = values.get('encoding') ?? 'gzip';
    const retentionCycles = Number(values.get('retention-cycles') ?? '3');
    const selectedProfiles = (values.get('profiles') ?? 'cpu-only,older-phone').split(',');
    const scenarioArgument = values.get('scenarios') ?? 'all';
    const selectedScenarios =
        scenarioArgument === 'all'
            ? DEFAULT_SCENARIOS
            : scenarioArgument
                  .split(',')
                  .map((scenario) => scenario.trim())
                  .filter(Boolean);

    if (
        !label ||
        !rootValue ||
        !outputValue ||
        !Number.isInteger(port) ||
        !Number.isInteger(runs) ||
        runs < 1 ||
        !Number.isInteger(retentionCycles) ||
        retentionCycles < 2
    ) {
        throw new Error(
            'Required arguments: --label NAME --root WWW_PATH --port PORT --output JSON_PATH ' +
                '[--runs 3] [--profiles cpu-only,older-phone] [--scenarios all] [--retention-cycles 3] ' +
                '[--encoding gzip|identity].'
        );
    }
    if (!['gzip', 'identity'].includes(contentEncoding)) {
        throw new Error(`Unsupported content encoding "${contentEncoding}". Expected gzip or identity.`);
    }
    const root = path.resolve(rootValue);
    const output = path.resolve(outputValue);
    if (!fs.existsSync(path.join(root, 'index.html'))) {
        throw new Error(`No production index.html found below ${root}.`);
    }
    if (!fs.existsSync(path.join(root, 'built', 'main.js'))) {
        const generatedScripts = fs
            .readdirSync(path.join(root, 'built'), { withFileTypes: true })
            .filter((entry) => entry.isFile() && /^main\..+\.js$/u.test(entry.name));
        if (!generatedScripts.length) {
            throw new Error(`No production main JavaScript asset found below ${path.join(root, 'built')}.`);
        }
    }
    for (const profileName of selectedProfiles) {
        if (!profiles[profileName]) {
            throw new Error(`Unknown profile "${profileName}".`);
        }
    }
    for (const scenario of selectedScenarios) {
        if (!AVAILABLE_SCENARIOS.has(scenario)) {
            throw new Error(
                `Unknown scenario "${scenario}". Available scenarios: ${[...AVAILABLE_SCENARIOS].join(', ')}, all.`
            );
        }
    }

    return {
        root,
        contentEncoding,
        label,
        output,
        port,
        retentionCycles,
        runs,
        selectedProfiles,
        selectedScenarios,
    };
};

const createStaticServer = async (root, port, contentEncoding) => {
    const server = http.createServer((request, response) => {
        const requestUrl = new URL(request.url ?? '/', `http://127.0.0.1:${port}`);
        const relativePath =
            requestUrl.pathname === '/' ? 'index.html' : decodeURIComponent(requestUrl.pathname.slice(1));
        const filePath = path.resolve(root, relativePath);

        if (!filePath.startsWith(`${root}${path.sep}`) || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
            response.writeHead(404);
            response.end('Not found');
            return;
        }

        const extension = path.extname(filePath).toLowerCase();
        const immutable = requestUrl.pathname.startsWith('/built/') && /\.[a-f0-9]{12,}\./u.test(requestUrl.pathname);
        const compressed =
            contentEncoding === 'gzip' &&
            COMPRESSIBLE_EXTENSIONS.has(extension) &&
            request.headers['accept-encoding']?.includes('gzip');
        response.writeHead(200, {
            'Cache-Control': immutable ? 'public, max-age=31536000, immutable' : 'no-cache',
            ...(compressed ? { 'Content-Encoding': 'gzip', Vary: 'Accept-Encoding' } : {}),
            'Content-Type': mimeTypes.get(extension) ?? 'application/octet-stream',
        });
        const source = fs.createReadStream(filePath);
        if (compressed) {
            source.pipe(createGzip({ level: 9 })).pipe(response);
        } else {
            source.pipe(response);
        }
    });

    await new Promise((resolve, reject) => {
        server.once('error', reject);
        server.listen(port, '127.0.0.1', resolve);
    });
    return server;
};

const installBrowserObservers = async (page) => {
    await page.addInitScript(
        ({ serviceHeading }) => {
            const state = {
                cls: 0,
                fcpMs: null,
                lastMutationMs: performance.now(),
                lcpMs: null,
                longTasks: [],
                milestones: {},
                observers: {
                    intersectionConstructed: 0,
                    intersectionDisconnected: 0,
                    intersectionLive: 0,
                    intersectionObserveCalls: 0,
                    intersectionUnobserveCalls: 0,
                },
            };
            window.__servicePerformance = state;

            const NativeIntersectionObserver = window.IntersectionObserver;
            if (typeof NativeIntersectionObserver === 'function') {
                window.IntersectionObserver = class InstrumentedIntersectionObserver extends (
                    NativeIntersectionObserver
                ) {
                    constructor(callback, options) {
                        super(callback, options);
                        state.observers.intersectionConstructed += 1;
                        state.observers.intersectionLive += 1;
                        let disconnected = false;
                        const nativeDisconnect = this.disconnect.bind(this);
                        const nativeObserve = this.observe.bind(this);
                        const nativeUnobserve = this.unobserve.bind(this);
                        this.disconnect = () => {
                            if (!disconnected) {
                                disconnected = true;
                                state.observers.intersectionDisconnected += 1;
                                state.observers.intersectionLive -= 1;
                            }
                            return nativeDisconnect();
                        };
                        this.observe = (target) => {
                            state.observers.intersectionObserveCalls += 1;
                            return nativeObserve(target);
                        };
                        this.unobserve = (target) => {
                            state.observers.intersectionUnobserveCalls += 1;
                            return nativeUnobserve(target);
                        };
                    }
                };
            }

            const inspectDom = () => {
                const now = performance.now();
                state.lastMutationMs = now;
                if (state.milestones.shellMs === undefined && document.querySelector('header')) {
                    state.milestones.shellMs = now;
                }
                const serviceHeadingElement = [...document.querySelectorAll('h1')].find((heading) =>
                    heading.textContent?.includes(serviceHeading)
                );
                if (state.milestones.headingMs === undefined && serviceHeadingElement) {
                    state.milestones.headingMs = now;
                }
            };

            new MutationObserver(inspectDom).observe(document, {
                childList: true,
                subtree: true,
            });

            try {
                new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        state.longTasks.push({
                            duration: entry.duration,
                            startTime: entry.startTime,
                        });
                    }
                }).observe({ type: 'longtask', buffered: true });
            } catch {}

            try {
                new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    if (lastEntry) {
                        state.lcpMs = lastEntry.startTime;
                    }
                }).observe({ type: 'largest-contentful-paint', buffered: true });
            } catch {}

            try {
                new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (!entry.hadRecentInput) {
                            state.cls += entry.value;
                        }
                    }
                }).observe({ type: 'layout-shift', buffered: true });
            } catch {}

            try {
                new PerformanceObserver((list) => {
                    const entry = list.getEntries().find((item) => item.name === 'first-contentful-paint');
                    if (entry) {
                        state.fcpMs = entry.startTime;
                    }
                }).observe({ type: 'paint', buffered: true });
            } catch {}
        },
        { serviceHeading: SERVICE_HEADING }
    );
};

const configureNetworkFixtures = async (context) => {
    await context.route('**/*', async (route) => {
        const url = new URL(route.request().url());

        if (url.hostname === 'api.c.psmb.ru') {
            if (url.pathname === '/day/2026-07-28') {
                await route.fulfill({ json: dayFixture });
                return;
            }
            if (url.pathname === '/app') {
                await route.fulfill({ json: { notification: null } });
                return;
            }
            if (url.pathname === '/hymns') {
                await route.fulfill({ json: [] });
                return;
            }
            await route.fulfill({ json: {} });
            return;
        }

        if (url.hostname === 'psmb.ru') {
            await route.fulfill({ json: { sermons: [], thisDays: [] } });
            return;
        }

        if (
            url.hostname.includes('google-analytics') ||
            url.hostname.includes('googletagmanager') ||
            url.hostname.includes('sentry.io')
        ) {
            await route.fulfill({ status: 204, body: '' });
            return;
        }

        if (url.pathname.endsWith('/built/version.json')) {
            await route.fulfill({ json: 'performance-benchmark' });
            return;
        }

        if (url.hostname === '127.0.0.1' || url.hostname === 'localhost') {
            await route.continue();
            return;
        }

        await route.abort('blockedbyclient');
    });
};

const readCdpMetrics = async (session) => {
    const response = await session.send('Performance.getMetrics');
    return Object.fromEntries(response.metrics.map(({ name, value }) => [name, value]));
};

const subtractCdpMetrics = (before, after) => {
    const milliseconds = ['TaskDuration', 'ScriptDuration', 'LayoutDuration', 'RecalcStyleDuration'];
    const counts = ['LayoutCount', 'RecalcStyleCount'];
    const result = {};

    for (const name of milliseconds) {
        result[`${name}Ms`] = ((after[name] ?? 0) - (before[name] ?? 0)) * 1000;
    }
    for (const name of counts) {
        result[name] = (after[name] ?? 0) - (before[name] ?? 0);
    }

    result.Documents = after.Documents ?? 0;
    result.JSEventListeners = after.JSEventListeners ?? 0;
    result.JSHeapTotalBytes = after.JSHeapTotalSize ?? 0;
    result.JSHeapUsedBytes = after.JSHeapUsedSize ?? 0;
    result.Nodes = after.Nodes ?? 0;
    return result;
};

const waitForForegroundRequests = async (page, pendingForegroundRequests) => {
    const requestDeadline = performance.now() + 120_000;
    while (pendingForegroundRequests.size > 0) {
        if (performance.now() >= requestDeadline) {
            throw new Error(
                `Foreground requests did not settle: ${[...pendingForegroundRequests].map((request) => request.url()).join(', ')}`
            );
        }
        await page.waitForTimeout(50);
    }
};

const waitForSettledService = async (
    page,
    pendingForegroundRequests,
    { expectedShape = null, minimumTocEntries = MINIMUM_TOC_ENTRIES, notBeforeMs = 0 } = {}
) => {
    await page.locator('h1', { hasText: SERVICE_HEADING }).first().waitFor({ state: 'visible', timeout: 120_000 });
    await page.waitForFunction(
        ({ earliestMark, minimumEntries }) => {
            const complete = performance.getEntriesByName('service_complete_commit', 'mark').at(-1);
            const tocReady = performance.getEntriesByName('service_toc_ready', 'mark').at(-1);
            const headings = [...document.querySelectorAll('h2,h3')];
            const ids = headings.map((heading) => heading.id);
            return (
                complete?.startTime >= earliestMark &&
                tocReady?.startTime >= earliestMark &&
                headings.length >= minimumEntries &&
                ids.every(Boolean) &&
                new Set(ids).size === ids.length
            );
        },
        { earliestMark: notBeforeMs, minimumEntries: minimumTocEntries ?? 1 },
        { timeout: 120_000 }
    );

    let stableSamples = 0;
    let previousSnapshot;
    const stabilityDeadline = performance.now() + 120_000;
    while (stableSamples < STABILITY_SAMPLE_COUNT) {
        if (performance.now() >= stabilityDeadline) {
            throw new Error('Service heading shape and document height did not stabilize within 120 seconds.');
        }
        const snapshot = await page.evaluate(() => {
            const headings = [...document.querySelectorAll('h2,h3')];
            return {
                scrollHeight: document.documentElement.scrollHeight,
                shape: headings.map((heading) => ({
                    id: heading.id,
                    label: heading.textContent?.replace(/\s+/gu, ' ').trim() ?? '',
                    level: Number(heading.tagName.slice(1)),
                })),
            };
        });
        const signature = JSON.stringify(snapshot);
        if (signature === previousSnapshot) {
            stableSamples += 1;
        } else {
            stableSamples = 0;
        }
        previousSnapshot = signature;
        await page.waitForTimeout(STABILITY_SAMPLE_MS);
    }

    await page.waitForFunction(
        (quietWindowMs) => performance.now() - window.__servicePerformance.lastMutationMs >= quietWindowMs,
        QUIET_WINDOW_MS,
        { timeout: 120_000 }
    );
    await waitForForegroundRequests(page, pendingForegroundRequests);
    await page.evaluate(
        async () =>
            await new Promise((resolve) => {
                requestAnimationFrame(() => requestAnimationFrame(resolve));
            })
    );

    const readiness = await page.evaluate(() => {
        const headings = [...document.querySelectorAll('h2,h3')];
        const shape = headings.map((heading) => ({
            id: heading.id,
            label: heading.textContent?.replace(/\s+/gu, ' ').trim() ?? '',
            level: Number(heading.tagName.slice(1)),
        }));
        return {
            completeCommitMs: performance.getEntriesByName('service_complete_commit', 'mark').at(-1)?.startTime ?? null,
            shape,
            tocReadyMs: performance.getEntriesByName('service_toc_ready', 'mark').at(-1)?.startTime ?? null,
        };
    });

    if (expectedShape && JSON.stringify(readiness.shape) !== JSON.stringify(expectedShape)) {
        throw new Error('Service H2/H3 IDs, labels, or levels changed during a deterministic revisit.');
    }
    return readiness;
};

const collectInteractionMetrics = async (page, session, cdpBefore, startedAt) => {
    await page.evaluate(
        async () =>
            await new Promise((resolve) => {
                requestAnimationFrame(() => requestAnimationFrame(resolve));
            })
    );
    const cdpAfter = await readCdpMetrics(session);
    const browserMetrics = await page.evaluate((phaseStartedAt) => {
        const finishedAt = performance.now();
        const state = window.__servicePerformance;
        const longTasks = state.longTasks.filter(
            (entry) => entry.startTime >= phaseStartedAt && entry.startTime <= finishedAt
        );
        const resources = performance
            .getEntriesByType('resource')
            .filter((resource) => resource.startTime >= phaseStartedAt);
        const scripts = resources.filter(
            (resource) => resource.initiatorType === 'script' || resource.name.endsWith('.js')
        );
        return {
            durationMs: finishedAt - phaseStartedAt,
            jsDecodedBytes: scripts.reduce((total, resource) => total + resource.decodedBodySize, 0),
            jsResourceCount: scripts.length,
            jsTransferBytes: scripts.reduce((total, resource) => total + resource.transferSize, 0),
            longTaskCount: longTasks.length,
            longTaskMaxMs: Math.max(0, ...longTasks.map((entry) => entry.duration)),
            longTaskTotalMs: longTasks.reduce((total, entry) => total + entry.duration, 0),
            resourceCount: resources.length,
            resourceTransferBytes: resources.reduce((total, resource) => total + resource.transferSize, 0),
        };
    }, startedAt);

    return {
        ...browserMetrics,
        cdp: subtractCdpMetrics(cdpBefore, cdpAfter),
    };
};

const collectPageMetrics = async (page, session, cdpBefore, readiness, phaseStartMs = 0) => {
    const cdpAfter = await readCdpMetrics(session);
    const browserMetrics = await page.evaluate((startedAt) => {
        const navigation = performance.getEntriesByType('navigation')[0];
        const resources = performance
            .getEntriesByType('resource')
            .filter((resource) => resource.startTime >= startedAt);
        const state = window.__servicePerformance;
        const readyMs = performance.now();
        const relevantLongTasks = state.longTasks.filter(
            (entry) => entry.startTime >= startedAt && entry.startTime <= readyMs
        );
        const totalBlockingTimeMs = relevantLongTasks.reduce(
            (total, entry) => total + Math.max(0, entry.duration - 50),
            0
        );
        const scriptResources = resources.filter(
            (resource) => resource.initiatorType === 'script' || resource.name.endsWith('.js')
        );

        return {
            cls: state.cls,
            domContentLoadedMs: navigation?.domContentLoadedEventEnd ?? null,
            domNodes: document.getElementsByTagName('*').length,
            fcpMs: state.fcpMs,
            headingCount: document.querySelectorAll('h1,h2,h3').length,
            jsDecodedBytes: scriptResources.reduce((total, resource) => total + resource.decodedBodySize, 0),
            jsResourceCount: scriptResources.length,
            jsTransferBytes: scriptResources.reduce((total, resource) => total + resource.transferSize, 0),
            lcpMs: state.lcpMs,
            loadEventMs: navigation?.loadEventEnd ?? null,
            longTaskCount: relevantLongTasks.length,
            longTaskMaxMs: Math.max(0, ...relevantLongTasks.map((entry) => entry.duration)),
            longTaskTotalMs: relevantLongTasks.reduce((total, entry) => total + entry.duration, 0),
            observerLiveCount: state.observers.intersectionLive,
            paragraphCount: document.querySelectorAll('p').length,
            readyFromPhaseMs: readyMs - startedAt,
            readyMs,
            resourceCount: resources.length,
            resourceTransferBytes: resources.reduce((total, resource) => total + resource.transferSize, 0),
            responseStartMs: navigation?.responseStart ?? null,
            scrollHeight: document.documentElement.scrollHeight,
            shellMs: state.milestones.shellMs ?? null,
            textCharacters: document.body.innerText.length,
            totalBlockingTimeMs,
        };
    }, phaseStartMs);

    let hash = 2166136261;
    const shapeSignature = JSON.stringify(readiness.shape);
    for (let index = 0; index < shapeSignature.length; index += 1) {
        hash ^= shapeSignature.charCodeAt(index);
        hash = Math.imul(hash, 16777619);
    }

    return {
        ...browserMetrics,
        cdp: subtractCdpMetrics(cdpBefore, cdpAfter),
        fullServiceCommitMs: readiness.completeCommitMs,
        serviceCompleteFromPhaseMs: readiness.completeCommitMs - phaseStartMs,
        tocEntries: readiness.shape.length,
        tocReadyFromPhaseMs: readiness.tocReadyMs - phaseStartMs,
        tocReadyMs: readiness.tocReadyMs,
        tocShapeHash: (hash >>> 0).toString(16).padStart(8, '0'),
    };
};

const measureNavigation = async ({ expectedShape = null, page, pendingForegroundRequests, reload, session, url }) => {
    // Chromium resets several Performance-domain counters on a document navigation.
    // Reload metrics must therefore be read as a fresh absolute interval.
    const cdpBefore = reload ? {} : await readCdpMetrics(session);
    if (reload) {
        await page.reload({ waitUntil: 'domcontentloaded', timeout: 120_000 });
    } else {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120_000 });
    }
    const readiness = await waitForSettledService(page, pendingForegroundRequests, { expectedShape });
    const metrics = await collectPageMetrics(page, session, cdpBefore, readiness);
    return { metrics, shape: readiness.shape };
};

const measureLanguageInteraction = async ({
    page,
    pendingForegroundRequests,
    session,
    optionName,
    expectedControlText,
}) => {
    const cdpBefore = await readCdpMetrics(session);
    const startTime = await page.evaluate(() => {
        performance.clearMarks('service_complete_commit');
        performance.clearMarks('service_toc_ready');
        return performance.now();
    });

    const languageControl = page.locator('header button[aria-label="меню"]').first();
    await languageControl.click();
    await page.getByRole('option', { name: optionName, exact: true }).click();
    await languageControl.filter({ hasText: expectedControlText }).waitFor({ state: 'visible', timeout: 120_000 });
    const readiness = await waitForSettledService(page, pendingForegroundRequests, {
        minimumTocEntries: null,
        notBeforeMs: startTime,
    });

    const interaction = await collectInteractionMetrics(page, session, cdpBefore, startTime);
    const documentMetrics = await page.evaluate(() => ({
        domNodes: document.getElementsByTagName('*').length,
        paragraphCount: document.querySelectorAll('p').length,
        scrollHeight: document.documentElement.scrollHeight,
    }));

    return {
        ...interaction,
        ...documentMetrics,
        serviceCompleteMs: readiness.completeCommitMs - startTime,
        tocReadyMs: readiness.tocReadyMs - startTime,
    };
};

const measureTocInteraction = async (page, session) => {
    await page.evaluate(() => window.scrollTo(0, 0));
    const target = await page.evaluate(() => {
        const headings = [...document.querySelectorAll('h2,h3')];
        const index = Math.floor(headings.length * 0.75);
        const heading = headings[index];
        return {
            id: heading.id,
            index,
            label: heading.textContent?.replace(/\s+/gu, ' ').trim() ?? '',
            level: Number(heading.tagName.slice(1)),
        };
    });
    const cdpBefore = await readCdpMetrics(session);
    const startedAt = await page.evaluate(() => performance.now());

    // The language switcher is optional; the TOC is the last menu-labelled
    // control in the service header in either layout.
    const tocControl = page.locator('header button[aria-label="меню"]').last();
    await tocControl.click();
    await page.getByRole('option').nth(target.index).click();
    await page.waitForFunction(
        (targetId) => {
            const heading = document.getElementById(targetId);
            if (!heading) {
                return false;
            }
            const rect = heading.getBoundingClientRect();
            return Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2) < 12;
        },
        target.id,
        { timeout: 30_000 }
    );

    const interaction = await collectInteractionMetrics(page, session, cdpBefore, startedAt);
    const result = await page.evaluate((expectedTarget) => {
        const heading = document.getElementById(expectedTarget.id);
        return {
            targetId: expectedTarget.id,
            targetLabel: expectedTarget.label,
            targetLevel: expectedTarget.level,
            targetStable:
                heading?.id === expectedTarget.id &&
                heading?.textContent?.replace(/\s+/gu, ' ').trim() === expectedTarget.label &&
                Number(heading?.tagName.slice(1)) === expectedTarget.level,
            targetViewportOffsetPx: heading
                ? heading.getBoundingClientRect().top +
                  heading.getBoundingClientRect().height / 2 -
                  window.innerHeight / 2
                : null,
        };
    }, target);
    if (!result.targetStable) {
        throw new Error(`TOC selection target "${target.id}" changed while scrolling to it.`);
    }
    return { ...interaction, ...result };
};

const measureFixedDistanceScroll = async (page, session) => {
    await page.evaluate(() => window.scrollTo(0, 0));
    const cdpBefore = await readCdpMetrics(session);
    const startedAt = await page.evaluate(() => performance.now());
    const frameMetrics = await page.evaluate(
        async ({ requestedDistance, step }) =>
            await new Promise((resolve) => {
                const maximumDistance = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
                const distance = Math.min(requestedDistance, maximumDistance);
                const intervals = [];
                let previousFrame = performance.now();
                let travelled = 0;

                const advance = (now) => {
                    intervals.push(now - previousFrame);
                    previousFrame = now;
                    const delta = Math.min(step, distance - travelled);
                    window.scrollBy(0, delta);
                    travelled += delta;
                    if (travelled < distance) {
                        requestAnimationFrame(advance);
                        return;
                    }

                    const sorted = [...intervals].sort((left, right) => left - right);
                    const quantileAt = (percentile) =>
                        sorted[Math.min(sorted.length - 1, Math.floor((sorted.length - 1) * percentile))] ?? 0;
                    resolve({
                        distancePx: travelled,
                        droppedFrameCount: intervals.filter((interval) => interval > 50).length,
                        frameCount: intervals.length,
                        frameIntervalMaxMs: Math.max(0, ...intervals),
                        frameIntervalMedianMs: quantileAt(0.5),
                        frameIntervalP75Ms: quantileAt(0.75),
                        frameIntervalP95Ms: quantileAt(0.95),
                    });
                };
                requestAnimationFrame(advance);
            }),
        { requestedDistance: 6000, step: 80 }
    );
    const interaction = await collectInteractionMetrics(page, session, cdpBefore, startedAt);
    return { ...interaction, ...frameMetrics };
};

const measureInPageSearch = async (page, session) => {
    const menuButton = page.locator('header button').last();
    const panelStartedAt = await page.evaluate(() => performance.now());
    await menuButton.click();
    await page.getByTitle('Найти…').click();
    const input = page.locator('#react-portal input').first();
    try {
        await input.waitFor({ state: 'visible', timeout: 30_000 });
    } catch (error) {
        const diagnostic = await page.evaluate(() => ({
            hash: window.location.hash,
            portalText: document.getElementById('react-portal')?.innerText ?? '',
            searchResources: performance
                .getEntriesByType('resource')
                .map((resource) => resource.name)
                .filter((name) => name.includes('in-page-search') || name.includes('layout-overflow-menu')),
        }));
        throw new Error(`In-page search did not open: ${JSON.stringify(diagnostic)}`, { cause: error });
    }
    const panelOpenMs = (await page.evaluate(() => performance.now())) - panelStartedAt;

    const cdpBefore = await readCdpMetrics(session);
    const startedAt = await page.evaluate(() => performance.now());
    await input.fill('Господи');
    await page.locator('span.inpage-find-highlight').first().waitFor({ state: 'attached', timeout: 30_000 });
    const interaction = await collectInteractionMetrics(page, session, cdpBefore, startedAt);
    const result = await page.evaluate(() => ({
        activeHighlightCount: document.querySelectorAll('span.inpage-find-active').length,
        matchCount: document.querySelectorAll('span.inpage-find-highlight').length,
    }));
    await page.getByTitle('Закрыть').click();
    await page.waitForFunction(() => document.querySelectorAll('span.inpage-find-highlight').length === 0);

    return {
        ...interaction,
        ...result,
        panelOpenMs,
        query: 'Господи',
    };
};

const createPageHarness = async ({ browser, baseUrl, profile }) => {
    const context = await browser.newContext({
        deviceScaleFactor: 2,
        hasTouch: true,
        isMobile: true,
        locale: 'ru-RU',
        screen: profile.viewport,
        serviceWorkers: 'block',
        timezoneId: 'Europe/Moscow',
        userAgent:
            'Mozilla/5.0 (Linux; Android 10; Moto G (5S)) AppleWebKit/537.36 ' +
            '(KHTML, like Gecko) Chrome/100.0.4896.127 Mobile Safari/537.36',
        viewport: profile.viewport,
    });
    await configureNetworkFixtures(context);
    const page = await context.newPage();
    await installBrowserObservers(page);
    const session = await context.newCDPSession(page);

    await session.send('Performance.enable');
    await session.send('Emulation.setCPUThrottlingRate', { rate: profile.cpuRate });
    await session.send('Network.enable');
    await session.send('Network.emulateNetworkConditions', {
        offline: false,
        latency: profile.latencyMs,
        downloadThroughput: profile.downloadBytesPerSecond,
        uploadThroughput: profile.uploadBytesPerSecond,
        connectionType: profile.latencyMs > 0 ? 'cellular4g' : 'none',
    });

    const errors = [];
    const recordError = (message) => {
        if (!message.includes('ERR_BLOCKED_BY_CLIENT') && !errors.includes(message)) {
            errors.push(message);
        }
    };
    page.on('pageerror', (error) => recordError(String(error)));
    page.on('console', (message) => {
        if (message.type() === 'error') {
            recordError(message.text());
        }
    });
    const pendingForegroundRequests = new Set();
    const isForegroundRequest = (request) => {
        const url = new URL(request.url());
        return (
            (url.origin === baseUrl && url.pathname.startsWith('/built/')) ||
            url.hostname === 'api.c.psmb.ru' ||
            url.hostname === 'psmb.ru'
        );
    };
    page.on('request', (request) => {
        if (isForegroundRequest(request)) {
            pendingForegroundRequests.add(request);
        }
    });
    const clearRequest = (request) => pendingForegroundRequests.delete(request);
    page.on('requestfinished', clearRequest);
    page.on('requestfailed', clearRequest);

    return {
        close: async () => {
            await session.detach();
            await context.close();
        },
        context,
        errors,
        page,
        pendingForegroundRequests,
        session,
    };
};

const waitForDatePage = async (page, pendingForegroundRequests, errors = []) => {
    await page.waitForFunction(
        ({ expectedHash, serviceHeading }) => {
            const headings = [...document.querySelectorAll('h1')].map((heading) => heading.textContent?.trim() ?? '');
            return (
                headings.includes('Что-то пошло не так') ||
                (window.location.hash === expectedHash &&
                    !headings.some((heading) => heading.includes(serviceHeading)) &&
                    document.body.innerText.length > 250)
            );
        },
        { expectedHash: `#${DATE_PATH.split('#')[1]}`, serviceHeading: SERVICE_HEADING },
        { timeout: 120_000 }
    );
    const diagnostic = await page.evaluate(() => ({
        bodyText: document.body.innerText,
        hash: window.location.hash,
        headings: [...document.querySelectorAll('h1')].map((heading) => heading.textContent?.trim()),
    }));
    if (diagnostic.headings.includes('Что-то пошло не так')) {
        throw new Error(
            `Date page navigation hit the route error boundary: ${JSON.stringify({ ...diagnostic, errors })}`
        );
    }
    await waitForForegroundRequests(page, pendingForegroundRequests);
    await page.waitForFunction(
        (quietWindowMs) => performance.now() - window.__servicePerformance.lastMutationMs >= quietWindowMs,
        QUIET_WINDOW_MS,
        { timeout: 120_000 }
    );
};

const navigateWithinSpa = async (page, targetPath) => {
    return await page.evaluate((pathValue) => {
        performance.clearMarks('service_complete_commit');
        performance.clearMarks('service_toc_ready');
        const startedAt = performance.now();
        window.location.hash = new URL(pathValue, window.location.origin).hash;
        return startedAt;
    }, targetPath);
};

const measureSpaServiceEntry = async ({
    expectedShape = null,
    page,
    pendingForegroundRequests,
    session,
    targetPath,
}) => {
    const cdpBefore = await readCdpMetrics(session);
    const startedAt = await navigateWithinSpa(page, targetPath);
    const readiness = await waitForSettledService(page, pendingForegroundRequests, {
        expectedShape,
        notBeforeMs: startedAt,
    });
    const interaction = await collectInteractionMetrics(page, session, cdpBefore, startedAt);
    return {
        metrics: {
            ...interaction,
            serviceCompleteMs: readiness.completeCommitMs - startedAt,
            tocEntries: readiness.shape.length,
            tocReadyMs: readiness.tocReadyMs - startedAt,
        },
        shape: readiness.shape,
    };
};

const leaveServiceForDatePage = async (page, pendingForegroundRequests, errors) => {
    await page.getByTitle('Назад').click();
    await waitForDatePage(page, pendingForegroundRequests, errors);
};

const collectRetentionSnapshot = async (page, session, label) => {
    try {
        await session.send('HeapProfiler.collectGarbage');
    } catch {}
    const cdp = await readCdpMetrics(session);
    const domCounters = await session.send('Memory.getDOMCounters');
    const browser = await page.evaluate(() => ({
        intersectionConstructed: window.__servicePerformance.observers.intersectionConstructed,
        intersectionDisconnected: window.__servicePerformance.observers.intersectionDisconnected,
        intersectionLive: window.__servicePerformance.observers.intersectionLive,
        jsHeapUsedBytes: performance.memory?.usedJSHeapSize ?? null,
    }));
    return {
        ...browser,
        documents: domCounters.documents,
        jsEventListeners: domCounters.jsEventListeners ?? cdp.JSEventListeners ?? null,
        jsHeapUsedBytes: cdp.JSHeapUsedSize ?? browser.jsHeapUsedBytes,
        label,
        nodes: domCounters.nodes,
    };
};

const measureWarmAndRetention = async ({ browser, baseUrl, profile, retentionCycles, retain }) => {
    const harness = await createPageHarness({ browser, baseUrl, profile });
    const { errors, page, pendingForegroundRequests, session } = harness;
    try {
        await page.goto(`${baseUrl}${DATE_PATH}`, { waitUntil: 'domcontentloaded', timeout: 120_000 });
        await waitForDatePage(page, pendingForegroundRequests, errors);
        const samples = [await collectRetentionSnapshot(page, session, 'baseline-date-page')];

        const warm = await measureSpaServiceEntry({
            page,
            pendingForegroundRequests,
            session,
            targetPath: SERVICE_PATH,
        });
        await leaveServiceForDatePage(page, pendingForegroundRequests, errors);
        samples.push(await collectRetentionSnapshot(page, session, 'after-visit-1'));

        const hot = await measureSpaServiceEntry({
            expectedShape: warm.shape,
            page,
            pendingForegroundRequests,
            session,
            targetPath: SERVICE_PATH,
        });
        await leaveServiceForDatePage(page, pendingForegroundRequests, errors);
        samples.push(await collectRetentionSnapshot(page, session, 'after-visit-2'));

        if (retain) {
            for (let index = 2; index < retentionCycles; index += 1) {
                await measureSpaServiceEntry({
                    expectedShape: warm.shape,
                    page,
                    pendingForegroundRequests,
                    session,
                    targetPath: SERVICE_PATH,
                });
                await leaveServiceForDatePage(page, pendingForegroundRequests, errors);
                samples.push(await collectRetentionSnapshot(page, session, `after-visit-${index + 1}`));
            }
        }

        const baseline = samples[0];
        const final = samples.at(-1);
        return {
            errors,
            hotRevisit: hot.metrics,
            navigationLoop: retain
                ? {
                      finalDelta: {
                          documents: final.documents - baseline.documents,
                          intersectionLive: final.intersectionLive - baseline.intersectionLive,
                          jsEventListeners: final.jsEventListeners - baseline.jsEventListeners,
                          jsHeapUsedBytes: final.jsHeapUsedBytes - baseline.jsHeapUsedBytes,
                          nodes: final.nodes - baseline.nodes,
                      },
                      samples,
                      visits: retentionCycles,
                  }
                : null,
            warmSpaEntry: warm.metrics,
        };
    } finally {
        await harness.close();
    }
};

const measureRun = async ({ browser, baseUrl, profile, retentionCycles, selectedScenarios }) => {
    const selected = new Set(selectedScenarios);
    const result = {
        errors: [],
        interactions: {},
    };
    const startedAt = performance.now();

    if (['core', 'language', 'toc', 'scroll', 'search'].some((scenario) => selected.has(scenario))) {
        const harness = await createPageHarness({ browser, baseUrl, profile });
        const { errors, page, pendingForegroundRequests, session } = harness;
        try {
            const url = `${baseUrl}${SERVICE_PATH}`;
            const cold = await measureNavigation({
                page,
                pendingForegroundRequests,
                session,
                url,
                reload: false,
            });
            result.cold = cold.metrics;

            if (selected.has('core')) {
                const repeatReload = await measureNavigation({
                    expectedShape: cold.shape,
                    page,
                    pendingForegroundRequests,
                    session,
                    url,
                    reload: true,
                });
                result.repeatReload = repeatReload.metrics;
            }
            if (selected.has('toc')) {
                result.interactions.tocSelection = await measureTocInteraction(page, session);
            }
            if (selected.has('scroll')) {
                result.interactions.fixedDistanceScroll = await measureFixedDistanceScroll(page, session);
            }
            if (selected.has('search')) {
                result.interactions.inPageSearch = await measureInPageSearch(page, session);
            }
            if (selected.has('language')) {
                result.interactions.churchSlavonic = await measureLanguageInteraction({
                    page,
                    pendingForegroundRequests,
                    session,
                    optionName: 'ЦСЯ',
                    expectedControlText: 'ЦСЯ',
                });
                result.interactions.parallel = await measureLanguageInteraction({
                    page,
                    pendingForegroundRequests,
                    session,
                    optionName: 'Параллельно',
                    expectedControlText: 'Параллельно',
                });
            }
        } finally {
            result.errors.push(...errors);
            await harness.close();
        }
    }

    if (selected.has('warm') || selected.has('retention')) {
        const warm = await measureWarmAndRetention({
            browser,
            baseUrl,
            profile,
            retain: selected.has('retention'),
            retentionCycles,
        });
        result.errors.push(...warm.errors);
        result.hotRevisit = warm.hotRevisit;
        result.navigationLoop = warm.navigationLoop;
        result.warmSpaEntry = warm.warmSpaEntry;
    }

    result.wallClockMs = performance.now() - startedAt;
    return result;
};

const metricPaths = [
    'cold.shellMs',
    'cold.fullServiceCommitMs',
    'cold.serviceCompleteFromPhaseMs',
    'cold.tocReadyFromPhaseMs',
    'cold.readyMs',
    'cold.readyFromPhaseMs',
    'cold.fcpMs',
    'cold.lcpMs',
    'cold.totalBlockingTimeMs',
    'cold.longTaskCount',
    'cold.longTaskTotalMs',
    'cold.longTaskMaxMs',
    'cold.resourceTransferBytes',
    'cold.jsTransferBytes',
    'cold.domNodes',
    'cold.paragraphCount',
    'cold.scrollHeight',
    'cold.tocEntries',
    'cold.cdp.TaskDurationMs',
    'cold.cdp.ScriptDurationMs',
    'cold.cdp.LayoutDurationMs',
    'cold.cdp.RecalcStyleDurationMs',
    'cold.cdp.JSHeapUsedBytes',
    'repeatReload.readyMs',
    'repeatReload.fcpMs',
    'repeatReload.totalBlockingTimeMs',
    'repeatReload.resourceTransferBytes',
    'repeatReload.cdp.TaskDurationMs',
    'warmSpaEntry.durationMs',
    'warmSpaEntry.serviceCompleteMs',
    'warmSpaEntry.tocReadyMs',
    'warmSpaEntry.cdp.TaskDurationMs',
    'hotRevisit.durationMs',
    'hotRevisit.serviceCompleteMs',
    'hotRevisit.tocReadyMs',
    'hotRevisit.cdp.TaskDurationMs',
    'interactions.tocSelection.durationMs',
    'interactions.tocSelection.longTaskTotalMs',
    'interactions.tocSelection.targetViewportOffsetPx',
    'interactions.fixedDistanceScroll.durationMs',
    'interactions.fixedDistanceScroll.frameIntervalP75Ms',
    'interactions.fixedDistanceScroll.frameIntervalP95Ms',
    'interactions.fixedDistanceScroll.frameIntervalMaxMs',
    'interactions.fixedDistanceScroll.droppedFrameCount',
    'interactions.fixedDistanceScroll.longTaskTotalMs',
    'interactions.inPageSearch.panelOpenMs',
    'interactions.inPageSearch.durationMs',
    'interactions.inPageSearch.matchCount',
    'interactions.inPageSearch.longTaskTotalMs',
    'interactions.churchSlavonic.durationMs',
    'interactions.churchSlavonic.cdp.TaskDurationMs',
    'interactions.parallel.durationMs',
    'interactions.parallel.cdp.TaskDurationMs',
    'interactions.parallel.domNodes',
    'interactions.parallel.cdp.JSHeapUsedBytes',
    'navigationLoop.finalDelta.jsHeapUsedBytes',
    'navigationLoop.finalDelta.nodes',
    'navigationLoop.finalDelta.jsEventListeners',
    'navigationLoop.finalDelta.intersectionLive',
];

const quantile = (values, percentile) => {
    const sorted = [...values].sort((left, right) => left - right);
    if (sorted.length === 1) {
        return sorted[0];
    }
    const position = (sorted.length - 1) * percentile;
    const lowerIndex = Math.floor(position);
    const upperIndex = Math.ceil(position);
    const weight = position - lowerIndex;
    return sorted[lowerIndex] * (1 - weight) + sorted[upperIndex] * weight;
};

const summarizeRuns = (runs) => {
    const summary = {};
    for (const metricPath of metricPaths) {
        const values = runs
            .map((run) =>
                metricPath.split('.').reduce((value, key) => (value === undefined ? undefined : value[key]), run)
            )
            .filter((value) => typeof value === 'number' && Number.isFinite(value));
        if (!values.length) {
            continue;
        }
        summary[metricPath] = {
            max: Math.max(...values),
            median: quantile(values, 0.5),
            min: Math.min(...values),
            p75: quantile(values, 0.75),
        };
    }
    return summary;
};

const main = async () => {
    const options = parseArguments();
    const server = await createStaticServer(options.root, options.port, options.contentEncoding);
    const browser = await chromium.launch({ headless: true });
    const result = {
        version: 3,
        recordedAt: new Date().toISOString(),
        label: options.label,
        contentEncoding: options.contentEncoding,
        root: options.root,
        route: SERVICE_PATH,
        runsPerProfile: options.runs,
        scenarios: options.selectedScenarios,
        retentionCycles: options.retentionCycles,
        readyDefinition: {
            completeMark: 'service_complete_commit',
            deterministicHeadingShape: 'ordered H2/H3 level + id + normalized label',
            minimumTocEntries: MINIMUM_TOC_ENTRIES,
            quietWindowMs: QUIET_WINDOW_MS,
            requiresForegroundRequestsSettled: true,
            serviceHeading: SERVICE_HEADING,
            stabilitySampleCount: STABILITY_SAMPLE_COUNT,
            stabilitySampleMs: STABILITY_SAMPLE_MS,
            tocMark: 'service_toc_ready',
        },
        profiles: {},
    };

    try {
        for (const profileName of options.selectedProfiles) {
            const profile = profiles[profileName];
            const runs = [];
            for (let index = 0; index < options.runs; index += 1) {
                process.stderr.write(
                    `${options.label} ${profileName} run ${index + 1}/${options.runs}${' '.repeat(20)}\r`
                );
                runs.push(
                    await measureRun({
                        browser,
                        baseUrl: `http://127.0.0.1:${options.port}`,
                        profile,
                        retentionCycles: options.retentionCycles,
                        selectedScenarios: options.selectedScenarios,
                    })
                );
            }
            result.profiles[profileName] = {
                configuration: profile,
                runs,
                summary: summarizeRuns(runs),
            };
        }
    } finally {
        await browser.close();
        await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
    }

    fs.mkdirSync(path.dirname(options.output), { recursive: true });
    fs.writeFileSync(options.output, `${JSON.stringify(result, null, 2)}\n`);
    process.stderr.write('\n');
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
};

await main();
