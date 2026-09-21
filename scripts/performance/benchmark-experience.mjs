import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { performance as hostPerformance } from 'node:perf_hooks';

import {
    assertServiceRenderKey,
    calculateLinearSlope,
    clonePersistentProfile,
    DATE_PATH,
    evaluateRetentionThresholds,
    expectedDateAfterSwipe,
    FIXED_DATE,
    launchPersistentHarness,
    provisionColdLanguageData,
    readLatestServiceRenderKey,
    removeTemporaryProfile,
    seedPersistentProfile,
    selectServiceLanguage,
    SERVICE_PATH,
    waitForDateReady,
    waitForServiceReady,
} from './lib/browser-profile.mjs';
import { collectObserverMetrics, milestoneFromPhase } from './lib/browser-observers.mjs';
import {
    collectRuntimeSnapshot,
    readPerformanceMetrics,
    startTrace,
    stopTrace,
    subtractPerformanceMetrics,
} from './lib/cdp-diagnostics.mjs';
import {
    createArtifactWriter,
    createExperienceReportIntegrity,
    EXPERIENCE_REPORT_SCHEMA_VERSION,
    summarizeExperienceRuns,
} from './lib/experience-artifacts.mjs';
import { createBuildFingerprint, createHarnessFingerprint } from './lib/build-fingerprint.mjs';
import { EXPERIENCE_PROFILES, parseExperienceArguments } from './lib/experience-options.mjs';
import { createExperienceServer } from './lib/experience-server.mjs';
import { collectHostLoadSample, createHostLoadProvenance, evaluateHostLoadGate } from './lib/host-load.mjs';
import { loadThirdPartyRuntimeSnapshot } from './lib/third-party-runtime.mjs';
import { dispatchTrustedTouchGesture, horizontalGesture, verticalGesture } from './lib/touch-input.mjs';

const readGit = (args, fallback = null) => {
    try {
        return execFileSync('git', args, { encoding: 'utf8' }).trim();
    } catch {
        return fallback;
    }
};

const collectEnvironment = (options, thirdPartyRuntimeSnapshot) => {
    const projectRoot = process.cwd();
    return {
        browser: options.browser,
        browserVersion: null,
        commit: readGit(['rev-parse', 'HEAD']),
        dirtyFiles: readGit(['status', '--short'])?.split('\n').filter(Boolean) ?? [],
        harnessFingerprint: createHarnessFingerprint(projectRoot),
        hostname: os.hostname(),
        memoryBytes: os.totalmem(),
        node: process.version,
        platform: `${os.platform()} ${os.release()} ${os.arch()}`,
        processor: os.cpus()[0]?.model ?? null,
        projectRoot,
        thirdPartyRuntime: {
            mode: options.thirdPartyRuntime,
            serviceWorkerPolicy: options.thirdPartyRuntime === 'snapshot' ? 'unregister-and-block' : 'allow',
            snapshot: thirdPartyRuntimeSnapshot?.provenance ?? null,
        },
    };
};

const shapeHash = (shape) => {
    let hash = 2166136261;
    const source = JSON.stringify(shape);
    for (let index = 0; index < source.length; index += 1) {
        hash ^= source.charCodeAt(index);
        hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(16).padStart(8, '0');
};

const collectPageResult = async (page, session, cdpBefore = {}, startedAt = 0) => {
    const endedAt = await page.evaluate(() => performance.now());
    const cdpAfter = await readPerformanceMetrics(session);
    const observer = await collectObserverMetrics(page, startedAt, endedAt);
    const browser = await page.evaluate(
        ({ phaseEnd, phaseStart }) => {
            const navigation = performance.getEntriesByType('navigation')[0];
            const resources = performance
                .getEntriesByType('resource')
                .filter((entry) => entry.startTime >= phaseStart && entry.startTime <= phaseEnd);
            const scripts = resources.filter(
                (entry) =>
                    entry.initiatorType === 'script' || new URL(entry.name, location.href).pathname.endsWith('.js')
            );
            const headings = [...document.querySelectorAll('h2,h3')].map((heading) => ({
                id: heading.id,
                label: heading.textContent?.replace(/\s+/gu, ' ').trim() ?? '',
                level: Number(heading.tagName.slice(1)),
            }));
            const complete = performance
                .getEntriesByName('service_complete_commit', 'mark')
                .filter((entry) => entry.startTime <= phaseEnd)
                .at(-1);
            const toc = performance
                .getEntriesByName('service_toc_ready', 'mark')
                .filter((entry) => entry.startTime <= phaseEnd)
                .at(-1);
            const navigationMilestone = (value) =>
                typeof value === 'number' && value >= phaseStart && value <= phaseEnd ? value - phaseStart : null;
            return {
                completeCommitMs: complete?.startTime ?? null,
                domContentLoadedMs: navigationMilestone(navigation?.domContentLoadedEventEnd),
                domNodes: document.getElementsByTagName('*').length,
                headingShape: headings,
                jsDecodedBytes: scripts.reduce((total, entry) => total + entry.decodedBodySize, 0),
                jsResourceCount: scripts.length,
                jsTransferBytes: scripts.reduce((total, entry) => total + entry.transferSize, 0),
                loadEventMs: navigationMilestone(navigation?.loadEventEnd),
                paragraphCount: document.querySelectorAll('p').length,
                readyMs: phaseEnd - phaseStart,
                resourceCount: resources.length,
                resourceTransferBytes: resources.reduce((total, entry) => total + entry.transferSize, 0),
                scrollHeight: document.documentElement.scrollHeight,
                serviceWorkerControlled: Boolean(navigator.serviceWorker?.controller),
                standalone: matchMedia('(display-mode: standalone)').matches,
                textCharacters: document.body.innerText.length,
                tocReadyMs: toc?.startTime ?? null,
            };
        },
        { phaseEnd: endedAt, phaseStart: startedAt }
    );
    return {
        ...browser,
        completeFromPhaseMs: milestoneFromPhase(browser.completeCommitMs, startedAt),
        tocReadyFromPhaseMs: milestoneFromPhase(browser.tocReadyMs, startedAt),
        ...observer,
        cdp: subtractPerformanceMetrics(cdpBefore, cdpAfter),
        headingShapeHash: shapeHash(browser.headingShape),
    };
};

const shouldTrace = (mode, runIndex) => mode === 'all' || mode === 'failures' || (mode === 'sampled' && runIndex === 0);

const unexpectedErrors = (errors, offline) =>
    errors.filter(
        (message) =>
            !(
                offline &&
                (message.includes('ERR_INTERNET_DISCONNECTED') || message.includes('TypeError: Failed to fetch'))
            )
    );

const runNavigationScenario = async ({ baseUrl, harness, offline, warm }) => {
    const initialNavigationStartedAt = hostPerformance.now();
    await harness.page.goto(`${baseUrl}${DATE_PATH}`, { waitUntil: 'domcontentloaded', timeout: 120_000 });
    await waitForDateReady(harness.page);
    let navigationStartedAt = initialNavigationStartedAt;
    if (warm) {
        navigationStartedAt = hostPerformance.now();
        await harness.page.reload({ waitUntil: 'domcontentloaded', timeout: 120_000 });
        await waitForDateReady(harness.page);
    }
    const result = await collectPageResult(harness.page, harness.session);
    const readyAt = hostPerformance.now();
    return {
        ...result,
        lifecycle: warm ? 'same-process-reload' : 'persistent-profile-process-restart',
        navigationToReadyMs: readyAt - navigationStartedAt,
        offline,
        ...(warm ? {} : { processLaunchToReadyMs: readyAt - harness.processLaunchStartedAt }),
    };
};

const runThirdPartyRuntimeScenario = async ({ baseUrl, harness }) => {
    const navigationStartedAt = hostPerformance.now();
    await harness.page.goto(`${baseUrl}${DATE_PATH}`, { waitUntil: 'domcontentloaded', timeout: 120_000 });
    await waitForDateReady(harness.page);
    const usefulReadyAt = hostPerformance.now();
    const usefulReadyBrowserMs = await harness.page.evaluate(() => performance.now());
    await harness.waitForThirdPartyRuntimeExecution();
    const runtimeExecutedAt = hostPerformance.now();
    await harness.waitForThirdPartyRuntimeQuiescence();
    const runtimeSettledAt = hostPerformance.now();
    const metrics = await collectPageResult(harness.page, harness.session);
    const thirdPartyRuntime = harness.assertThirdPartyRuntimeSettled();
    return {
        ...metrics,
        diagnosticScope: 'cpu-runtime-service-worker-isolated',
        lifecycle: 'persistent-profile-process-restart-service-worker-isolated',
        navigationToReadyMs: usefulReadyAt - navigationStartedAt,
        navigationToRuntimeExecutedMs: runtimeExecutedAt - navigationStartedAt,
        navigationToRuntimeSettledMs: runtimeSettledAt - navigationStartedAt,
        offline: false,
        readyMs: usefulReadyBrowserMs,
        thirdPartyRuntime,
    };
};

const runInstalledOfflineScenario = async ({ baseUrl, harness, validateAllLanguages }) => {
    if (harness.fixtureRouting || harness.externalFulfillments !== 0) {
        throw new Error('Offline lifecycle scenario must run without externally fulfilled fixture requests.');
    }
    const lifecycleStartedAt = hostPerformance.now();
    const dateNavigationStartedAt = hostPerformance.now();
    await harness.page.goto(`${baseUrl}${DATE_PATH}`, { waitUntil: 'domcontentloaded', timeout: 120_000 });
    await waitForDateReady(harness.page);
    const dateReadyAt = hostPerformance.now();
    const date = await collectPageResult(harness.page, harness.session);

    const serviceNavigationStartedAt = hostPerformance.now();
    const servicePhaseStartedAt = await harness.page.evaluate(() => performance.now());
    const serviceCdpBefore = await readPerformanceMetrics(harness.session);
    await harness.page.goto(`${baseUrl}${SERVICE_PATH}`, { waitUntil: 'domcontentloaded', timeout: 120_000 });
    await waitForServiceReady(harness.page);
    const serviceReadyAt = hostPerformance.now();
    const ru = {
        ...(await collectPageResult(harness.page, harness.session, serviceCdpBefore, servicePhaseStartedAt)),
        renderKey: assertServiceRenderKey(await readLatestServiceRenderKey(harness.page), 'ru'),
    };
    const baseResult = {
        date,
        dateNavigationToReadyMs: dateReadyAt - dateNavigationStartedAt,
        externalFulfillments: harness.externalFulfillments,
        fixtureRouting: harness.fixtureRouting,
        lifecycle: 'persistent-profile-process-restart',
        offline: true,
        processLaunchToDateReadyMs: dateReadyAt - harness.processLaunchStartedAt,
        ru,
        serviceNavigationToReadyMs: serviceReadyAt - serviceNavigationStartedAt,
    };
    if (!validateAllLanguages) return baseResult;

    const csjRenderKey = await selectServiceLanguage(harness.page, 'csj');
    const csj = { ...(await collectPageResult(harness.page, harness.session)), renderKey: csjRenderKey };
    const parallelRenderKey = await selectServiceLanguage(harness.page, 'parallel');
    const parallel = { ...(await collectPageResult(harness.page, harness.session)), renderKey: parallelRenderKey };
    return {
        ...baseResult,
        csj,
        offlineValidationTourMs: hostPerformance.now() - lifecycleStartedAt,
        parallel,
    };
};

const openRussianService = async (baseUrl, harness) => {
    await harness.page.goto(`${baseUrl}${SERVICE_PATH}`, { waitUntil: 'domcontentloaded', timeout: 120_000 });
    await waitForServiceReady(harness.page);
};

const runTouchReadingScenario = async ({ baseUrl, harness, kind, profile }) => {
    await openRussianService(baseUrl, harness);
    await harness.page.evaluate(() => window.scrollTo(0, 0));
    const cdpBefore = await readPerformanceMetrics(harness.session);
    const gesture = await dispatchTrustedTouchGesture({
        ...verticalGesture({ ...profile.viewport, kind }),
        page: harness.page,
        session: harness.session,
    });
    const metrics = await collectPageResult(
        harness.page,
        harness.session,
        cdpBefore,
        gesture.trustedInputEvents[0]?.startTime ?? 0
    );
    if (!gesture.trustedInputObserved || gesture.scrollDeltaY < 50) {
        throw new Error(`Trusted ${kind} reading gesture did not scroll: ${JSON.stringify(gesture)}.`);
    }
    return { ...metrics, gesture, kind };
};

const runTouchDateScenario = async ({ baseUrl, direction, harness, profile }) => {
    await harness.page.goto(`${baseUrl}${DATE_PATH}`, { waitUntil: 'domcontentloaded', timeout: 120_000 });
    await waitForDateReady(harness.page);
    const originalHash = await harness.page.evaluate(() => location.hash);
    const cdpBefore = await readPerformanceMetrics(harness.session);
    const gesture = await dispatchTrustedTouchGesture({
        ...horizontalGesture({ ...profile.viewport, direction }),
        page: harness.page,
        session: harness.session,
    });
    await harness.page.waitForFunction((hash) => location.hash !== hash, originalHash, { timeout: 30_000 });
    await waitForDateReady(harness.page);
    const finalHash = await harness.page.evaluate(() => location.hash);
    const expectedHash = `#/date/${expectedDateAfterSwipe(FIXED_DATE, direction)}`;
    gesture.endHash = finalHash;
    gesture.expectedHash = expectedHash;
    gesture.hashChanged = finalHash !== originalHash;
    const metrics = await collectPageResult(
        harness.page,
        harness.session,
        cdpBefore,
        gesture.trustedInputEvents[0]?.startTime ?? 0
    );
    if (!gesture.trustedInputObserved || !gesture.hashChanged || finalHash !== expectedHash) {
        throw new Error(`Trusted ${direction} date gesture did not navigate: ${JSON.stringify(gesture)}.`);
    }
    return { ...metrics, direction, gesture };
};

const runLanguageScenario = async ({ baseUrl, harness, language }) => {
    await openRussianService(baseUrl, harness);
    const cdpBefore = await readPerformanceMetrics(harness.session);
    const startedAt = await harness.page.evaluate(() => {
        performance.clearMarks('service_complete_commit');
        performance.clearMarks('service_toc_ready');
        return performance.now();
    });
    const control = harness.page.locator('header button[aria-label="меню"]').first();
    await control.click();
    const optionName = language === 'csj' ? 'ЦСЯ' : 'Параллельно';
    await harness.page.getByRole('option', { name: optionName, exact: true }).click();
    await waitForServiceReady(harness.page, { notBeforeMs: startedAt });
    const result = await collectPageResult(harness.page, harness.session, cdpBefore, startedAt);
    const renderKey = result.marks.filter(({ name }) => name === 'service_complete_commit').at(-1)?.detail?.renderKey;
    assertServiceRenderKey(renderKey, language);
    return { ...result, language, renderKey };
};

const preparePersistedParallel = async ({ baseUrl, browser, headless, profile, userDataDir }) => {
    const harness = await launchPersistentHarness({
        baseUrl,
        browser,
        fixtures: false,
        headless,
        profile,
        userDataDir,
    });
    try {
        await harness.page.goto(`${baseUrl}${DATE_PATH}`, { waitUntil: 'domcontentloaded', timeout: 120_000 });
        await waitForDateReady(harness.page);
        await harness.page.evaluate(() => {
            const state = JSON.parse(localStorage.getItem('recoil-persist') || '{}');
            state.langState = { lang: 'parallel', langA: 'ru', langB: 'csj' };
            localStorage.setItem('recoil-persist', JSON.stringify(state));
        });
    } finally {
        await harness.close();
    }
};

const runPersistedParallelScenario = async ({ baseUrl, harness }) => {
    await openRussianService(baseUrl, harness);
    const result = await collectPageResult(harness.page, harness.session);
    const renderKey = result.marks.filter(({ name }) => name === 'service_complete_commit').at(-1)?.detail?.renderKey;
    if (typeof renderKey !== 'string' || !renderKey.includes(':parallel:ru:csj')) {
        throw new Error(`Persisted parallel launch produced unexpected render key "${renderKey}".`);
    }
    return { ...result, renderKey };
};

const runRetentionScenario = async ({ baseUrl, cycles, dates, harness }) => {
    await harness.page.goto(`${baseUrl}/#/date/${dates[0]}`, { waitUntil: 'domcontentloaded', timeout: 120_000 });
    await waitForDateReady(harness.page);
    const expectedShapes = new Map();
    const canonicalDatePath = `/#/date/${dates[0]}`;
    const completeCycle = async (index) => {
        const date = dates[index % dates.length];
        const datePath = `/#/date/${date}`;
        const servicePath = `${datePath}/service/%D0%9B%D0%B8%D1%82%D1%83%D1%80%D0%B3%D0%B8%D1%8F`;
        await harness.page.evaluate((pathValue) => {
            location.hash = new URL(pathValue, location.origin).hash;
        }, datePath);
        await waitForDateReady(harness.page);
        await harness.page.evaluate((pathValue) => {
            location.hash = new URL(pathValue, location.origin).hash;
        }, servicePath);
        await waitForServiceReady(harness.page);

        const currentLanguage = await readLatestServiceRenderKey(harness.page);
        if (
            typeof currentLanguage !== 'string' ||
            !currentLanguage.includes(':ru:') ||
            currentLanguage.includes(':parallel:')
        ) {
            await selectServiceLanguage(harness.page, 'ru');
        }
        for (const language of ['ru', 'csj', 'parallel']) {
            if (language !== 'ru') await selectServiceLanguage(harness.page, language);
            const renderKey = assertServiceRenderKey(await readLatestServiceRenderKey(harness.page), language);
            const currentShape = await harness.page.evaluate(() =>
                [...document.querySelectorAll('h2,h3')].map((heading) => [
                    heading.id,
                    heading.textContent?.trim(),
                    heading.tagName,
                ])
            );
            const shapeKey = `${date}:${language}`;
            const serializedShape = JSON.stringify(currentShape);
            if (expectedShapes.has(shapeKey) && expectedShapes.get(shapeKey) !== serializedShape) {
                throw new Error(`Service shape changed for ${shapeKey} during retention cycling.`);
            }
            expectedShapes.set(shapeKey, serializedShape);
            assertServiceRenderKey(renderKey, language);
        }

        await harness.page.evaluate((pathValue) => {
            location.hash = new URL(pathValue, location.origin).hash;
        }, canonicalDatePath);
        await waitForDateReady(harness.page);
    };

    for (let index = 0; index < dates.length; index += 1) await completeCycle(index);
    const snapshots = [await collectRuntimeSnapshot(harness.page, harness.session, 'baseline-after-warmup-cycle')];
    for (let index = 0; index < cycles; index += 1) {
        await completeCycle(index);
        snapshots.push(await collectRuntimeSnapshot(harness.page, harness.session, `after-cycle-${index + 1}`));
    }
    const baseline = snapshots[0];
    const final = snapshots.at(-1);
    const gate = evaluateRetentionThresholds({ cycles, samples: snapshots });
    return {
        cycles,
        dates,
        finalDelta: {
            documents: final.documents - baseline.documents,
            jsEventListeners: final.jsEventListeners - baseline.jsEventListeners,
            jsHeapUsedBytes: final.jsHeapUsedBytes - baseline.jsHeapUsedBytes,
            nodes: final.nodes - baseline.nodes,
            nonPassiveTouchListeners: final.nonPassiveTouchListeners - baseline.nonPassiveTouchListeners,
        },
        gate,
        slopes: {
            jsEventListeners: calculateLinearSlope(snapshots.map(({ jsEventListeners }) => jsEventListeners ?? 0)),
            jsHeapUsedBytes: calculateLinearSlope(snapshots.map(({ jsHeapUsedBytes }) => jsHeapUsedBytes ?? 0)),
            nodes: calculateLinearSlope(snapshots.map(({ nodes }) => nodes ?? 0)),
        },
        snapshots,
    };
};

const executeScenario = async ({
    artifactWriter,
    baseUrl,
    hostLoadCheckpoints,
    logicalCpuCount,
    options,
    profile,
    profileName,
    runIndex,
    scenario,
    seed,
}) => {
    const cloned = await clonePersistentProfile(seed.profileRoot);
    if (
        scenario === 'service-cold-csj' ||
        scenario === 'service-cold-parallel' ||
        scenario === 'service-persisted-parallel' ||
        scenario === 'retention'
    ) {
        try {
            await provisionColdLanguageData({
                baseUrl,
                browser: options.browser,
                headless: options.headless,
                profile,
                userDataDir: cloned.userDataDir,
            });
        } catch (error) {
            await removeTemporaryProfile(cloned.parent);
            throw error;
        }
    }
    if (scenario === 'service-persisted-parallel') {
        try {
            await preparePersistedParallel({
                baseUrl,
                browser: options.browser,
                headless: options.headless,
                profile: { ...profile, cpuRate: 1, latencyMs: 0, downloadBytesPerSecond: -1, uploadBytesPerSecond: -1 },
                userDataDir: cloned.userDataDir,
            });
        } catch (error) {
            await removeTemporaryProfile(cloned.parent);
            throw error;
        }
    }
    const offline = scenario === 'startup-process-cold-offline' || scenario === 'offline-unvisited-all-languages';
    const harness = await launchPersistentHarness({
        baseUrl,
        browser: options.browser,
        diagnosticCounters: scenario === 'retention',
        fixtures: false,
        headless: options.headless,
        offline,
        profile,
        thirdPartyRuntime: scenario === 'startup-third-party-runtime' ? options.thirdPartyRuntime : 'blocked',
        thirdPartySnapshot: scenario === 'startup-third-party-runtime' ? options.thirdPartyRuntimeSnapshot : null,
        userDataDir: cloned.userDataDir,
    });
    const checkpoint = {
        label: `${profileName}.run-${runIndex + 1}.${scenario}`,
        ...collectHostLoadSample({ logicalCpuCount }),
    };
    hostLoadCheckpoints.push(checkpoint);
    const checkpointGate = evaluateHostLoadGate([
        { phase: `checkpoint ${JSON.stringify(checkpoint.label)}`, sample: checkpoint },
    ]);
    if (!checkpointGate.passed) {
        try {
            await harness.close({ validateThirdPartyRuntime: false });
        } finally {
            await removeTemporaryProfile(cloned.parent);
        }
        throw new Error(`Host load checkpoint failed: ${JSON.stringify(checkpointGate)}.`);
    }
    const traceEnabled = shouldTrace(options.trace, runIndex);
    let traceCategories = [];
    let traceBuffer = null;
    let failure = null;
    let metrics = null;
    let browserVersion = null;
    let result = null;
    const trace = {
        captured: false,
        error: null,
        requested: traceEnabled,
        started: false,
        written: false,
    };
    try {
        browserVersion = await harness.session.send('Browser.getVersion');
        if (traceEnabled) {
            traceCategories = await startTrace(harness.session);
            trace.started = true;
        }
        if (scenario === 'startup-process-cold-offline' || scenario === 'offline-unvisited-all-languages') {
            metrics = await runInstalledOfflineScenario({
                baseUrl,
                harness,
                validateAllLanguages: scenario === 'offline-unvisited-all-languages',
            });
        } else if (scenario === 'startup-process-cold-online') {
            metrics = await runNavigationScenario({ baseUrl, harness, offline, warm: false });
        } else if (scenario === 'startup-third-party-runtime') {
            metrics = await runThirdPartyRuntimeScenario({ baseUrl, harness });
        } else if (scenario === 'startup-warm-process') {
            metrics = await runNavigationScenario({ baseUrl, harness, offline: false, warm: true });
        } else if (scenario.startsWith('touch-reading-')) {
            metrics = await runTouchReadingScenario({
                baseUrl,
                harness,
                kind: scenario.endsWith('precision') ? 'precision' : 'rapid',
                profile,
            });
        } else if (scenario.startsWith('touch-date-')) {
            metrics = await runTouchDateScenario({
                baseUrl,
                direction: scenario.endsWith('left') ? 'left' : 'right',
                harness,
                profile,
            });
        } else if (scenario === 'service-cold-csj' || scenario === 'service-cold-parallel') {
            metrics = await runLanguageScenario({
                baseUrl,
                harness,
                language: scenario.endsWith('csj') ? 'csj' : 'parallel',
            });
        } else if (scenario === 'service-persisted-parallel') {
            metrics = await runPersistedParallelScenario({ baseUrl, harness });
        } else if (scenario === 'retention') {
            const dates = seed.serviceWorker.indexedDbCorpus.expectedKeys
                .filter((key) => key.startsWith('https://api.c.psmb.ru/day/'))
                .slice(0, 2)
                .map((key) => key.split('/').at(-1));
            metrics = await runRetentionScenario({ baseUrl, cycles: options.retentionCycles, dates, harness });
        } else {
            throw new Error(`Scenario "${scenario}" has no implementation.`);
        }

        if (harness.failedHashedAssets.length) {
            throw new Error(`Built asset requests failed: ${harness.failedHashedAssets.join(', ')}.`);
        }
        if (metrics.gate?.enforced && !metrics.gate.passed) {
            throw new Error(`Retention thresholds failed: ${JSON.stringify(metrics.gate.failures)}.`);
        }
        const fatalErrors = unexpectedErrors(harness.errors, offline);
        if (fatalErrors.length) {
            throw new Error(`Unexpected browser errors: ${fatalErrors.join(' | ')}.`);
        }
        result = {
            browserVersion,
            errors: harness.errors,
            failedHashedAssets: harness.failedHashedAssets,
            launchId: harness.launchId,
            metrics,
            passed: true,
            requests: harness.requests,
            traceCategories,
        };
    } catch (error) {
        failure = error;
        if (traceEnabled && !trace.started) trace.error = String(error?.stack ?? error);
        result = {
            browserVersion,
            errors: [...harness.errors, String(error?.stack ?? error)],
            failedHashedAssets: harness.failedHashedAssets,
            launchId: harness.launchId,
            metrics,
            passed: false,
            requests: harness.requests,
            traceCategories,
        };
    } finally {
        if (trace.started) {
            try {
                traceBuffer = await stopTrace(harness.session);
                if (!traceBuffer) throw new Error('Trace collection completed without a trace stream.');
                trace.captured = true;
                if (options.trace !== 'failures' || failure) {
                    const runDirectory = artifactWriter.runDirectory(profileName, runIndex, scenario);
                    fs.writeFileSync(path.join(runDirectory, 'trace.json.gz'), traceBuffer, { flag: 'wx' });
                    trace.written = true;
                }
            } catch (traceError) {
                trace.error = String(traceError?.stack ?? traceError);
                result.errors.push(`Trace collection failed for ${scenario}: ${trace.error}`);
                result.passed = false;
            }
        }
        result.trace = trace;
        try {
            await harness.close();
        } catch (error) {
            result.errors.push(`Third-party runtime finalization failed: ${String(error?.stack ?? error)}`);
            result.passed = false;
            failure ??= error;
        } finally {
            await removeTemporaryProfile(cloned.parent);
        }
    }
    return result;
};

const main = async () => {
    const requestedOptions = parseExperienceArguments();
    const thirdPartyRuntimeSnapshot = requestedOptions.thirdPartySnapshot
        ? loadThirdPartyRuntimeSnapshot(requestedOptions.thirdPartySnapshot)
        : null;
    const logicalCpuCount = os.cpus().length;
    if (logicalCpuCount < 1) throw new Error('Host load preflight could not detect any logical CPUs.');
    if (os.platform() === 'win32') {
        throw new Error(
            'Host load preflight is unsupported on Windows because os.loadavg() does not report contention.'
        );
    }
    const preRunHostLoad = collectHostLoadSample({ logicalCpuCount });
    const preflightGate = evaluateHostLoadGate([{ phase: 'preRun', sample: preRunHostLoad }]);
    if (!preflightGate.passed) {
        throw new Error(`Host load preflight failed: ${JSON.stringify(preflightGate)}.`);
    }
    const artifactWriter = createArtifactWriter(requestedOptions.output);
    const hostLoadCheckpoints = [];
    const sourceBuildFingerprint = createBuildFingerprint(requestedOptions.root);
    const snapshotRoot = path.join(requestedOptions.output, 'build');
    fs.cpSync(requestedOptions.root, snapshotRoot, { recursive: true });
    const options = { ...requestedOptions, root: snapshotRoot, thirdPartyRuntimeSnapshot };
    const buildFingerprintBefore = createBuildFingerprint(snapshotRoot);
    if (sourceBuildFingerprint.digest !== buildFingerprintBefore.digest) {
        throw new Error('The immutable benchmark build snapshot does not match the requested source build.');
    }
    const server = await createExperienceServer(options);
    const reportOptions = { ...options };
    delete reportOptions.thirdPartyRuntimeSnapshot;
    const report = {
        allRunsPassed: true,
        environment: collectEnvironment(options, thirdPartyRuntimeSnapshot),
        label: options.label,
        options: {
            ...reportOptions,
            output: options.output,
            root: options.root,
            sourceRoot: requestedOptions.root,
        },
        profiles: {},
        recordedAt: new Date().toISOString(),
        route: { date: DATE_PATH, fixedDate: FIXED_DATE, service: SERVICE_PATH },
        schemaVersion: EXPERIENCE_REPORT_SCHEMA_VERSION,
        summary: {},
    };

    try {
        for (const profileName of options.selectedProfiles) {
            const profile = EXPERIENCE_PROFILES[profileName];
            const seed = await seedPersistentProfile({
                baseUrl: server.baseUrl,
                browser: options.browser,
                headless: options.headless,
                profile,
                root: options.root,
                stateFixture: options.stateFixture,
            });
            const runs = [];
            try {
                for (let runIndex = 0; runIndex < options.runs; runIndex += 1) {
                    const run = { index: runIndex, scenarioPassed: {}, scenarios: {} };
                    for (const scenario of options.selectedScenarios) {
                        process.stderr.write(
                            `${options.label} ${profileName} run ${runIndex + 1}/${options.runs} ${scenario}${' '.repeat(24)}\r`
                        );
                        const result = await executeScenario({
                            artifactWriter,
                            baseUrl: server.baseUrl,
                            hostLoadCheckpoints,
                            logicalCpuCount,
                            options,
                            profile,
                            profileName,
                            runIndex,
                            scenario,
                            seed,
                        });
                        if (result.browserVersion && !report.environment.browserVersion) {
                            report.environment.browserVersion = result.browserVersion;
                        } else if (
                            result.browserVersion &&
                            JSON.stringify(result.browserVersion) !== JSON.stringify(report.environment.browserVersion)
                        ) {
                            result.errors.push('Actual browser version changed during the benchmark run.');
                            result.passed = false;
                        }
                        run.scenarios[scenario] = result.metrics ?? {};
                        run.scenarioPassed[scenario] = result.passed;
                        artifactWriter.writeJson(
                            path.relative(
                                options.output,
                                path.join(artifactWriter.runDirectory(profileName, runIndex, scenario), 'result.json')
                            ),
                            result
                        );
                        if (!result.passed) report.allRunsPassed = false;
                    }
                    runs.push(run);
                }
            } finally {
                await removeTemporaryProfile(seed.profileRoot);
            }
            report.profiles[profileName] = {
                configuration: profile,
                runs,
                seed: seed.serviceWorker,
                summary: summarizeExperienceRuns(runs),
            };
            for (const [metric, summary] of Object.entries(report.profiles[profileName].summary)) {
                report.summary[`${profileName}.${metric}`] = summary;
            }
        }
    } finally {
        await server.close();
    }

    report.environment.hostLoad = createHostLoadProvenance({
        checkpoints: hostLoadCheckpoints,
        logicalCpuCount,
        postRun: collectHostLoadSample({ logicalCpuCount }),
        preRun: preRunHostLoad,
    });
    report.integrity = createExperienceReportIntegrity(report, options.root, { buildFingerprintBefore });
    if (!report.integrity.buildImmutability.unchanged) report.allRunsPassed = false;
    if (!report.integrity.hostLoad.passed) report.allRunsPassed = false;
    if (!report.integrity.thirdPartyRuntime.valid) report.allRunsPassed = false;
    artifactWriter.writeJson('report.json', report);
    artifactWriter.writeJson('environment.json', report.environment);
    process.stderr.write('\n');
    process.stdout.write(
        `${JSON.stringify({ allRunsPassed: report.allRunsPassed, output: options.output, summary: report.summary }, null, 2)}\n`
    );
    if (!report.allRunsPassed) process.exitCode = 1;
};

await main();
