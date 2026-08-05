import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { performance as hostPerformance } from 'node:perf_hooks';

import { chromium } from 'playwright';

import { installExperienceObservers } from './browser-observers.mjs';
import { configureCdp } from './cdp-diagnostics.mjs';
import {
    comparePrecacheCoverage,
    configureExperienceFixtures,
    createColdLanguageCacheEntries,
    createFutureCorpusKeys,
    deterministicDayFixture,
    extractExpectedPrecacheUrls,
} from './experience-server.mjs';

export const FIXED_DATE = '2026-07-28';
export const DATE_PATH = `/#/date/${FIXED_DATE}`;
export const SERVICE_PATH = `${DATE_PATH}/service/%D0%9B%D0%B8%D1%82%D1%83%D1%80%D0%B3%D0%B8%D1%8F`;
export const SERVICE_HEADING = 'Божественная литургия Иоанна Златоуста';

export const expectedDateAfterSwipe = (date, direction) => {
    const value = new Date(`${date}T12:00:00.000Z`);
    value.setUTCDate(value.getUTCDate() + (direction === 'left' ? 1 : -1));
    return value.toISOString().slice(0, 10);
};

export const isBuiltAssetPath = (pathname) => pathname.startsWith('/built/');

export const assertServiceRenderKey = (renderKey, language) => {
    if (!['csj', 'parallel', 'ru'].includes(language)) {
        throw new Error(`Unsupported service language "${language}".`);
    }
    const matches =
        typeof renderKey === 'string' &&
        (language === 'parallel'
            ? renderKey.includes(':parallel:ru:csj')
            : renderKey.includes(`:${language}:`) && !renderKey.includes(':parallel:'));
    if (!matches) {
        throw new Error(`Language ${language} produced missing or unexpected render key "${renderKey}".`);
    }
    return renderKey;
};

export const calculateLinearSlope = (values) => {
    if (values.length < 2) return 0;
    const midpoint = (values.length - 1) / 2;
    const mean = values.reduce((total, value) => total + value, 0) / values.length;
    let numerator = 0;
    let denominator = 0;
    for (let index = 0; index < values.length; index += 1) {
        numerator += (index - midpoint) * (values[index] - mean);
        denominator += (index - midpoint) ** 2;
    }
    return denominator === 0 ? 0 : numerator / denominator;
};

export const evaluateRetentionThresholds = ({ cycles, samples }) => {
    const baselineHeap = samples[0]?.jsHeapUsedBytes ?? 0;
    const finalHeap = samples.at(-1)?.jsHeapUsedBytes ?? 0;
    const observerLive = samples.map(({ observerCounts = {} }) =>
        ['intersectionLive', 'mutationLive', 'resizeLive'].reduce(
            (total, name) => total + (observerCounts[name] ?? 0),
            0
        )
    );
    const values = {
        heapGrowthPercent: baselineHeap > 0 ? ((finalHeap - baselineHeap) / baselineHeap) * 100 : 0,
        heapSlopeBytesPerCycle: calculateLinearSlope(samples.map(({ jsHeapUsedBytes }) => jsHeapUsedBytes ?? 0)),
        listenerSlopePerCycle: calculateLinearSlope(samples.map(({ jsEventListeners }) => jsEventListeners ?? 0)),
        nodeSlopePerCycle: calculateLinearSlope(samples.map(({ nodes }) => nodes ?? 0)),
        nonPassiveTouchListenerSlopePerCycle: calculateLinearSlope(
            samples.map(({ nonPassiveTouchListeners }) => nonPassiveTouchListeners ?? 0)
        ),
        observerSlopePerCycle: calculateLinearSlope(observerLive),
    };
    const limits = {
        heapGrowthPercent: 10,
        heapSlopeBytesPerCycle: Math.max(128 * 1024, baselineHeap * 0.005),
        listenerSlopePerCycle: 0.25,
        nodeSlopePerCycle: 10,
        nonPassiveTouchListenerSlopePerCycle: 0.1,
        observerSlopePerCycle: 0.1,
    };
    const enforced = cycles >= 20;
    const failures = Object.entries(limits)
        .filter(([name, limit]) => values[name] > limit)
        .map(([name, limit]) => ({ limit, metric: name, value: values[name] }));
    return {
        enforced,
        failures,
        limits,
        mechanicsOnly: !enforced,
        passed: !enforced || failures.length === 0,
        values,
    };
};

const stateTargetBytes = {
    'anonymous-normal': 0,
    'anonymous-100k': 100 * 1024,
    'anonymous-1m': 1024 * 1024,
};

export const createPersistedStateFixture = (name, overrides = {}) => {
    const targetBytes = stateTargetBytes[name];
    if (targetBytes === undefined) throw new Error(`Unknown state fixture "${name}".`);
    const state = {
        langState: { lang: 'ru', langA: 'ru', langB: 'csj' },
        themeState: 'system',
        zoomState: 1,
        ...overrides,
    };
    if (targetBytes > 0) {
        state.performanceFixturePadding = '';
        let currentBytes = Buffer.byteLength(JSON.stringify(state));
        state.performanceFixturePadding = 'п'.repeat(Math.max(0, Math.floor((targetBytes - currentBytes) / 2)));
        currentBytes = Buffer.byteLength(JSON.stringify(state));
        if (currentBytes < targetBytes) {
            state.performanceFixturePadding += 'x'.repeat(targetBytes - currentBytes);
        }
    }
    return JSON.stringify(state);
};

const recordPageActivity = (page, baseUrl) => {
    const errors = [];
    const requests = [];
    const failedHashedAssets = [];
    const recordError = (message) => {
        if (
            !message.includes('ERR_BLOCKED_BY_CLIENT') &&
            !message.includes('TypeError: Failed to fetch') &&
            !errors.includes(message)
        ) {
            errors.push(message);
        }
    };
    page.on('pageerror', (error) => recordError(String(error)));
    page.on('console', (message) => {
        if (message.type() === 'error') recordError(message.text());
    });
    page.on('requestfinished', async (request) => {
        const response = await request.response().catch(() => null);
        const url = new URL(request.url());
        requests.push({
            failure: null,
            method: request.method(),
            pathname: url.origin === baseUrl ? url.pathname : `${url.hostname}${url.pathname}`,
            resourceType: request.resourceType(),
            status: response?.status() ?? null,
        });
    });
    page.on('requestfailed', (request) => {
        const url = new URL(request.url());
        const failure = request.failure()?.errorText ?? 'unknown';
        requests.push({
            failure,
            method: request.method(),
            pathname: url.origin === baseUrl ? url.pathname : `${url.hostname}${url.pathname}`,
            resourceType: request.resourceType(),
            status: null,
        });
        if (url.origin === baseUrl && isBuiltAssetPath(url.pathname)) {
            failedHashedAssets.push(url.pathname);
        }
    });
    return { errors, failedHashedAssets, requests };
};

export const launchPersistentHarness = async ({
    baseUrl,
    browser,
    diagnosticCounters = false,
    fixtures = false,
    headless,
    offline = false,
    profile,
    userDataDir,
}) => {
    const processLaunchStartedAt = hostPerformance.now();
    const context = await chromium.launchPersistentContext(userDataDir, {
        args: [
            '--disable-background-networking',
            '--enable-precise-memory-info',
            '--js-flags=--expose-gc',
            '--no-first-run',
        ],
        channel: browser === 'chrome' ? 'chrome' : undefined,
        deviceScaleFactor: 2,
        hasTouch: true,
        headless,
        isMobile: true,
        locale: 'ru-RU',
        screen: profile.viewport,
        serviceWorkers: 'allow',
        timezoneId: 'Europe/Moscow',
        userAgent:
            'Mozilla/5.0 (Linux; Android 10; Moto G (5S)) AppleWebKit/537.36 ' +
            '(KHTML, like Gecko) Chrome/151.0.0.0 Mobile Safari/537.36',
        viewport: profile.viewport,
    });
    const fixtureActivity = fixtures ? await configureExperienceFixtures(context) : { fulfilled: 0 };
    await installExperienceObservers(context, { diagnosticCounters });

    const page = context.pages()[0] ?? (await context.newPage());
    if (page.url() !== 'about:blank') await page.goto('about:blank');
    const session = await context.newCDPSession(page);
    await configureCdp(session, profile, { offline });
    if (!fixtures) {
        await session.send('Network.setBlockedURLs', {
            urls: [
                'https://api.c.psmb.ru/*',
                'https://psmb.ru/*',
                'https://www.googletagmanager.com/*',
                'https://googletagmanager.com/*',
                'https://mc.yandex.ru/*',
                'https://*.sentry.io/*',
                'https://*.convex.cloud/*',
                'wss://*.convex.cloud/*',
            ],
        });
    }
    const activity = recordPageActivity(page, baseUrl);
    const launchId = randomUUID();

    return {
        ...activity,
        close: async () => {
            await session.detach().catch(() => undefined);
            await context.close();
        },
        context,
        externalFulfillments: fixtureActivity.fulfilled,
        fixtureRouting: fixtures,
        launchId,
        page,
        processLaunchStartedAt,
        session,
    };
};

export const waitForDateReady = async (page) => {
    await page.waitForFunction(
        (dayTitle) => document.querySelector('header') && document.body.innerText.includes(dayTitle),
        deterministicDayFixture.title,
        { timeout: 120_000 }
    );
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
};

export const waitForServiceReady = async (page, { minimumHeadings = 65, notBeforeMs = 0 } = {}) => {
    await page.locator('h1', { hasText: SERVICE_HEADING }).first().waitFor({ state: 'visible', timeout: 120_000 });
    await page.waitForFunction(
        ({ earliest, minimum }) => {
            const complete = performance.getEntriesByName('service_complete_commit', 'mark').at(-1);
            const toc = performance.getEntriesByName('service_toc_ready', 'mark').at(-1);
            const headings = [...document.querySelectorAll('h2,h3')];
            return (
                complete?.startTime >= earliest &&
                toc?.startTime >= earliest &&
                headings.length >= minimum &&
                headings.every((heading) => heading.id)
            );
        },
        { earliest: notBeforeMs, minimum: minimumHeadings },
        { timeout: 120_000 }
    );
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
};

export const readLatestServiceRenderKey = async (page) =>
    await page.evaluate(
        () => performance.getEntriesByName('service_complete_commit', 'mark').at(-1)?.detail?.renderKey ?? null
    );

export const selectServiceLanguage = async (page, language) => {
    const labels = { csj: 'ЦСЯ', parallel: 'Параллельно', ru: 'РУС' };
    const optionName = labels[language];
    if (!optionName) throw new Error(`Unsupported service language "${language}".`);
    const startedAt = await page.evaluate(() => performance.now());
    await page.locator('header button[aria-label="меню"]').first().click();
    await page.getByRole('option', { name: optionName, exact: true }).click();
    await waitForServiceReady(page, { notBeforeMs: startedAt });
    return assertServiceRenderKey(await readLatestServiceRenderKey(page), language);
};

const readIndexedDbKeys = async (page) =>
    await page.evaluate(async () => {
        if (typeof indexedDB.databases === 'function') {
            const databases = await indexedDB.databases();
            if (!databases.some(({ name }) => name === 'pbIDB')) return [];
        }
        return await new Promise((resolve, reject) => {
            const request = indexedDB.open('pbIDB');
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                const database = request.result;
                if (!database.objectStoreNames.contains('requestsCache')) {
                    database.close();
                    resolve([]);
                    return;
                }
                const transaction = database.transaction('requestsCache', 'readonly');
                const keysRequest = transaction.objectStore('requestsCache').getAllKeys();
                keysRequest.onerror = () => reject(keysRequest.error);
                keysRequest.onsuccess = () => {
                    database.close();
                    resolve(keysRequest.result.map(String));
                };
            };
        });
    });

export const seedPersistentProfile = async ({ baseUrl, browser, headless, profile, root, stateFixture }) => {
    const profileRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'molitva-perf017-seed-'));
    const harness = await launchPersistentHarness({
        baseUrl,
        browser,
        fixtures: true,
        headless,
        profile: { ...profile, cpuRate: 1, latencyMs: 0, downloadBytesPerSecond: -1, uploadBytesPerSecond: -1 },
        userDataDir: profileRoot,
    });
    try {
        await harness.page.goto(`${baseUrl}${DATE_PATH}`, { waitUntil: 'domcontentloaded', timeout: 120_000 });
        await waitForDateReady(harness.page);
        await harness.page.evaluate((serialized) => {
            localStorage.setItem('recoil-persist', serialized);
        }, createPersistedStateFixture(stateFixture));
        const expectedPrecacheUrls = extractExpectedPrecacheUrls(
            await fs.readFile(path.join(root, 'service-worker.js'), 'utf8')
        );
        if (expectedPrecacheUrls.length === 0) {
            throw new Error('Built service worker did not contain a readable Workbox precache manifest.');
        }
        const serviceWorkerState = await harness.page.evaluate(async () => {
            const registration = await Promise.race([
                navigator.serviceWorker.ready,
                new Promise((_, reject) =>
                    window.setTimeout(
                        () => reject(new Error('Timed out waiting for the built service worker to become ready.')),
                        300_000
                    )
                ),
            ]);
            if (!navigator.serviceWorker.controller) {
                await new Promise((resolve) => {
                    navigator.serviceWorker.addEventListener('controllerchange', resolve, { once: true });
                    window.setTimeout(resolve, 10_000);
                });
            }
            const controllingWorker = navigator.serviceWorker.controller ?? registration.active;
            if (controllingWorker && controllingWorker.state !== 'activated') {
                await new Promise((resolve) => {
                    const timeout = window.setTimeout(resolve, 10_000);
                    const onStateChange = () => {
                        if (controllingWorker.state === 'activated') {
                            window.clearTimeout(timeout);
                            controllingWorker.removeEventListener('statechange', onStateChange);
                            resolve();
                        }
                    };
                    controllingWorker.addEventListener('statechange', onStateChange);
                });
            }
            const cacheNames = await caches.keys();
            const cachesWithKeys = await Promise.all(
                cacheNames.map(async (name) => ({
                    name,
                    keys: (await caches.open(name).then((cache) => cache.keys())).map((request) => request.url),
                }))
            );
            return {
                active: (navigator.serviceWorker.controller ?? registration.active)?.state === 'activated',
                cachesWithKeys,
                controlled: Boolean(navigator.serviceWorker.controller),
            };
        });
        const precache = serviceWorkerState.cachesWithKeys.find(({ name }) => name.includes('precache'));
        const coverage = comparePrecacheCoverage(expectedPrecacheUrls, precache?.keys ?? []);
        const serviceWorker = {
            active: serviceWorkerState.active,
            cacheEntries: serviceWorkerState.cachesWithKeys.map(({ keys, name }) => ({ entries: keys.length, name })),
            controlled: serviceWorkerState.controlled,
            precache: {
                actualCount: coverage.actual.length,
                expectedCount: coverage.expected.length,
                keys: coverage.actual,
                missing: coverage.missing,
                unexpected: coverage.unexpected,
            },
        };
        if (
            !serviceWorker.active ||
            !serviceWorker.controlled ||
            coverage.missing.length > 0 ||
            coverage.unexpected.length > 0
        ) {
            throw new Error(
                `Persistent profile seed did not install the exact built precache: ${JSON.stringify(serviceWorker)}.`
            );
        }

        const corpusStartedAt = await harness.page.evaluate(() => new Date().toISOString());
        const expectedCorpusKeys = createFutureCorpusKeys(corpusStartedAt);
        await harness.page.waitForFunction(
            async (expected) => {
                if (typeof indexedDB.databases === 'function') {
                    const databases = await indexedDB.databases();
                    if (!databases.some(({ name }) => name === 'pbIDB')) return false;
                }
                const keys = await new Promise((resolve) => {
                    const request = indexedDB.open('pbIDB');
                    request.onerror = () => resolve([]);
                    request.onsuccess = () => {
                        const database = request.result;
                        if (!database.objectStoreNames.contains('requestsCache')) {
                            database.close();
                            resolve([]);
                            return;
                        }
                        const transaction = database.transaction('requestsCache', 'readonly');
                        const keysRequest = transaction.objectStore('requestsCache').getAllKeys();
                        keysRequest.onerror = () => resolve([]);
                        keysRequest.onsuccess = () => {
                            database.close();
                            resolve(keysRequest.result.map(String));
                        };
                    };
                });
                const available = new Set(keys);
                return expected.every((key) => available.has(key));
            },
            expectedCorpusKeys,
            { timeout: 120_000 }
        );
        let corpusKeys = await readIndexedDbKeys(harness.page);
        let corpusMissing = expectedCorpusKeys.filter((key) => !corpusKeys.includes(key));
        if (corpusMissing.length > 0) {
            throw new Error(`Persistent profile seed missed future-day API keys: ${corpusMissing.join(', ')}.`);
        }

        corpusKeys = await readIndexedDbKeys(harness.page);
        corpusMissing = expectedCorpusKeys.filter((key) => !corpusKeys.includes(key));
        serviceWorker.indexedDbCorpus = {
            actualCount: corpusKeys.length,
            expectedCount: expectedCorpusKeys.length,
            expectedKeys: expectedCorpusKeys,
            keys: corpusKeys.sort(),
            missing: corpusMissing,
        };
        return { profileRoot, serviceWorker };
    } catch (error) {
        await fs.rm(profileRoot, { force: true, recursive: true });
        throw error;
    } finally {
        await harness.close();
    }
};

export const clonePersistentProfile = async (source) => {
    const parent = await fs.mkdtemp(path.join(os.tmpdir(), 'molitva-perf017-run-'));
    const target = path.join(parent, 'profile');
    await fs.cp(source, target, {
        filter: (entry) => !/^Singleton(?:Cookie|Lock|Socket)$/u.test(path.basename(entry)),
        recursive: true,
    });
    return { parent, userDataDir: target };
};

export const provisionColdLanguageData = async ({ baseUrl, browser, headless, profile, userDataDir }) => {
    const harness = await launchPersistentHarness({
        baseUrl,
        browser,
        fixtures: false,
        headless,
        profile: { ...profile, cpuRate: 1, latencyMs: 0, downloadBytesPerSecond: -1, uploadBytesPerSecond: -1 },
        userDataDir,
    });
    const entries = createColdLanguageCacheEntries(FIXED_DATE);
    try {
        await harness.page.goto(`${baseUrl}${DATE_PATH}`, { waitUntil: 'domcontentloaded', timeout: 120_000 });
        await waitForDateReady(harness.page);
        await harness.page.evaluate(async (cacheEntries) => {
            await new Promise((resolve, reject) => {
                const request = indexedDB.open('pbIDB');
                request.onerror = () => reject(request.error);
                request.onsuccess = () => {
                    const database = request.result;
                    const transaction = database.transaction('requestsCache', 'readwrite');
                    const store = transaction.objectStore('requestsCache');
                    for (const { key, value } of cacheEntries) store.put(value, key);
                    transaction.onerror = () => reject(transaction.error);
                    transaction.oncomplete = () => {
                        database.close();
                        resolve();
                    };
                };
            });
        }, entries);
        const keys = await readIndexedDbKeys(harness.page);
        const missing = entries.map(({ key }) => key).filter((key) => !keys.includes(key));
        if (missing.length > 0) {
            throw new Error(`Cold-language fixture provisioning missed cache keys: ${missing.join(', ')}.`);
        }
    } finally {
        await harness.close();
    }
};

export const removeTemporaryProfile = async (directory) => {
    await fs.rm(directory, { force: true, recursive: true });
};
