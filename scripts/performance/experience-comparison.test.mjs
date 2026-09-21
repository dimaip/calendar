import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import {
    compareExperienceReports,
    createArtifactWriter,
    createExperienceReportIntegrity,
    EXPERIENCE_REPORT_SCHEMA_VERSION,
} from './lib/experience-artifacts.mjs';
import {
    createBuildFingerprint,
    createHarnessFingerprint,
    verifyBuildFingerprint,
    verifyHarnessFingerprint,
} from './lib/build-fingerprint.mjs';
import { parseComparisonArguments } from './lib/experience-options.mjs';
import { collectHostLoadSample, createHostLoadProvenance } from './lib/host-load.mjs';
import {
    loadThirdPartyRuntimeSnapshot,
    matchThirdPartyScriptUrl,
    THIRD_PARTY_RUNTIME_POLICY,
    THIRD_PARTY_RUNTIME_SCHEMA_VERSION,
} from './lib/third-party-runtime.mjs';

const createBuild = (directory, marker) => {
    fs.mkdirSync(path.join(directory, 'built'), { recursive: true });
    fs.writeFileSync(path.join(directory, 'index.html'), `<title>${marker}</title>`);
    fs.writeFileSync(path.join(directory, 'service-worker.js'), `self.marker=${JSON.stringify(marker)}`);
    fs.writeFileSync(path.join(directory, 'built', 'precache.worker.123.js'), `postMessage(${JSON.stringify(marker)})`);
    fs.writeFileSync(path.join(directory, 'built', 'main.123.js'), `window.marker=${JSON.stringify(marker)}`);
};

const thirdPartyScriptUrls = [
    ['yandex-metrika-tag', 'https://mc.yandex.ru/metrika/tag.js'],
    ['google-tag-manager', 'https://www.googletagmanager.com/gtm.js?id=GTM-MSCF98P&gtm_cookies_win=x'],
    ['google-tag', 'https://www.googletagmanager.com/gtag/js?id=G-FIXTURE&gtm=volatile&cx=c'],
    ['google-tag-destination', 'https://www.googletagmanager.com/gtag/destination?id=G-FIXTURE&gtm=volatile&cx=c'],
    ['google-analytics', 'https://www.google-analytics.com/analytics.js'],
];

const createThirdPartySnapshot = (directory, marker) => {
    fs.mkdirSync(directory, { recursive: true });
    const scripts = thirdPartyScriptUrls.map(([className, url]) => {
        const body = Buffer.from(`window.fixture=${JSON.stringify(`${className}-${marker}`)};`);
        const bodyPath = `${className}.js`;
        fs.writeFileSync(path.join(directory, bodyPath), body);
        return {
            body: bodyPath,
            bytes: body.byteLength,
            canonicalUrl: matchThirdPartyScriptUrl(url).canonicalUrl,
            className,
            contentType: 'application/javascript; charset=utf-8',
            sha256: createHash('sha256').update(body).digest('hex'),
            status: 200,
            url,
        };
    });
    const manifestPath = path.join(directory, 'manifest.json');
    fs.writeFileSync(
        manifestPath,
        JSON.stringify({
            capturedAt: '2026-08-05T12:00:00.000Z',
            policy: THIRD_PARTY_RUNTIME_POLICY,
            schemaVersion: THIRD_PARTY_RUNTIME_SCHEMA_VERSION,
            scripts,
        })
    );
    return { manifestPath, provenance: loadThirdPartyRuntimeSnapshot(manifestPath).provenance };
};

const harnessFingerprint = createHarnessFingerprint(process.cwd());

const createHostLoad = ({
    fiveMinutes = 1,
    logicalCpuCount = 4,
    oneMinute = 1,
    postRunFiveMinutes,
    postRunOneMinute,
    profileName = 'older-phone',
    runs = 20,
    scenario = 'startup-process-cold-offline',
} = {}) => {
    const sample = (one, five, recordedAt) =>
        collectHostLoadSample({
            loadAverage: [one, five, 1],
            logicalCpuCount,
            recordedAt,
        });
    return createHostLoadProvenance({
        checkpoints: Array.from({ length: runs }, (_, runIndex) => ({
            label: `${profileName}.run-${runIndex + 1}.${scenario}`,
            ...sample(oneMinute, fiveMinutes, '2026-08-05T12:00:30.000Z'),
        })),
        logicalCpuCount,
        platform: 'darwin',
        postRun: sample(postRunOneMinute ?? oneMinute, postRunFiveMinutes ?? fiveMinutes, '2026-08-05T12:01:00.000Z'),
        preRun: sample(oneMinute, fiveMinutes, '2026-08-05T12:00:00.000Z'),
    });
};

const createReport = ({
    hostLoad,
    mode = 'comparison',
    profileName = 'older-phone',
    root,
    runs = mode === 'comparison' ? 20 : 3,
    scenario = 'startup-process-cold-offline',
    target = 1000,
    thirdPartyProvenance = { mode: 'blocked', serviceWorkerPolicy: 'allow', snapshot: null },
    thirdPartyRuntime = 'blocked',
    thirdPartySnapshot = null,
}) => {
    const resolvedHostLoad = hostLoad === undefined ? createHostLoad({ profileName, runs, scenario }) : hostLoad;
    const scenarioMetrics =
        scenario === 'startup-third-party-runtime'
            ? {
                  headingShapeHash: 'date-shape',
                  offline: false,
                  paragraphCount: 42,
                  readyMs: target,
                  serviceWorkerControlled: false,
                  textCharacters: 2048,
              }
            : {
                  csj: {
                      headingShapeHash: 'csj-shape',
                      paragraphCount: 84,
                      renderKey: 'csj',
                      serviceWorkerControlled: true,
                      textCharacters: 4096,
                  },
                  date: {
                      headingShapeHash: 'date-shape',
                      paragraphCount: 42,
                      serviceWorkerControlled: true,
                      textCharacters: 2048,
                  },
                  offline: true,
                  parallel: {
                      headingShapeHash: 'parallel-shape',
                      paragraphCount: 168,
                      renderKey: 'parallel',
                      serviceWorkerControlled: true,
                      textCharacters: 8192,
                  },
                  readyMs: target,
                  ru: {
                      headingShapeHash: 'ru-shape',
                      paragraphCount: 84,
                      renderKey: 'ru',
                      serviceWorkerControlled: true,
                      textCharacters: 4096,
                  },
              };
    const report = {
        allRunsPassed: true,
        environment: {
            browser: 'chromium',
            browserVersion: { product: 'Chrome/151.0.0.0', protocolVersion: '1.3', revision: 'fixture' },
            harnessFingerprint,
            hostLoad: resolvedHostLoad,
            hostname: 'fixture-host',
            platform: 'fixture-platform',
            processor: 'fixture-processor',
            projectRoot: process.cwd(),
            thirdPartyRuntime: thirdPartyProvenance,
        },
        options: {
            browser: 'chromium',
            contentEncoding: 'gzip',
            headless: true,
            mode,
            root,
            runs,
            selectedProfiles: [profileName],
            selectedScenarios: [scenario],
            stateFixture: 'anonymous-normal',
            thirdPartyRuntime,
            thirdPartySnapshot,
            trace: 'none',
        },
        profiles: {
            [profileName]: {
                configuration:
                    profileName === 'cpu-only' ? { cpuRate: 6, latencyMs: 0 } : { cpuRate: 4, latencyMs: 150 },
                runs: Array.from({ length: runs }, (_, index) => ({
                    index,
                    scenarioPassed: { [scenario]: true },
                    scenarios: {
                        [scenario]: structuredClone(scenarioMetrics),
                    },
                })),
                seed: { active: true, cacheEntries: [{ entries: 4, name: 'precache' }], controlled: true },
            },
        },
        recordedAt: '2026-08-05T12:00:30.000Z',
        route: { date: '/#/date/2026-07-28', fixedDate: '2026-07-28', service: '/#/service/test' },
        schemaVersion: EXPERIENCE_REPORT_SCHEMA_VERSION,
        summary: {
            [`${profileName}.${scenario}.readyMs`]: { p75: target, samples: runs },
        },
    };
    report.integrity = createExperienceReportIntegrity(report, root);
    return report;
};

test('build fingerprints cover core, precache, and sorted built artifact content', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'perf017-build-'));
    try {
        createBuild(root, 'baseline');
        const fingerprint = createBuildFingerprint(root);
        assert.equal(fingerprint.algorithm, 'sha256');
        assert.equal(fingerprint.assetInventory.count, 2);
        assert.equal(fingerprint.precache.length, 1);
        assert.equal(verifyBuildFingerprint(fingerprint, root).valid, true);

        fs.writeFileSync(path.join(root, 'built', 'main.123.js'), 'window.marker="changed"');
        const verification = verifyBuildFingerprint(fingerprint, root);
        assert.equal(verification.valid, false);
        assert(verification.issues.some((issue) => issue.includes('digest')));
    } finally {
        fs.rmSync(root, { force: true, recursive: true });
    }
});

test('harness fingerprint is self-verifying and changes with harness source', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'perf017-harness-'));
    try {
        fs.mkdirSync(path.join(root, 'scripts', 'performance'), { recursive: true });
        fs.writeFileSync(path.join(root, 'scripts', 'performance', 'benchmark.mjs'), 'export const version = 1;');
        fs.writeFileSync(path.join(root, 'package.json'), '{}');
        fs.writeFileSync(path.join(root, 'yarn.lock'), '# fixture');
        const fingerprint = createHarnessFingerprint(root);
        assert.equal(verifyHarnessFingerprint(fingerprint, root).valid, true);
        fs.writeFileSync(path.join(root, 'scripts', 'performance', 'benchmark.mjs'), 'export const version = 2;');
        assert.equal(verifyHarnessFingerprint(fingerprint, root).valid, false);
    } finally {
        fs.rmSync(root, { force: true, recursive: true });
    }
});

test('report integrity detects build changes between the pre-run and post-run fingerprints', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'perf017-build-mutation-'));
    try {
        createBuild(root, 'before');
        const report = createReport({ mode: 'smoke', root });
        const before = createBuildFingerprint(root);
        fs.writeFileSync(path.join(root, 'built', 'main.123.js'), 'window.marker="after"');
        const integrity = createExperienceReportIntegrity(report, root, { buildFingerprintBefore: before });
        assert.equal(integrity.buildImmutability.unchanged, false);
    } finally {
        fs.rmSync(root, { force: true, recursive: true });
    }
});

test('authoritative comparison accepts self-verified different builds with exact semantic shape', () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'perf017-different-builds-'));
    const baselineRoot = path.join(directory, 'baseline');
    const candidateRoot = path.join(directory, 'candidate');
    try {
        createBuild(baselineRoot, 'baseline');
        createBuild(candidateRoot, 'candidate');
        const comparison = compareExperienceReports({
            baseline: createReport({ root: baselineRoot, target: 1000 }),
            candidate: createReport({
                hostLoad: createHostLoad({ fiveMinutes: 2, oneMinute: 2 }),
                root: candidateRoot,
                target: 850,
            }),
            targets: ['older-phone.startup-process-cold-offline.readyMs'],
        });
        assert.equal(comparison.authoritative, true);
        assert.equal(comparison.buildIdentity.sameBuild, false);
        assert.equal(comparison.compatible, true);
        assert.equal(comparison.passed, true);
    } finally {
        fs.rmSync(directory, { force: true, recursive: true });
    }
});

test('comparison rejects different CPU capacity and materially different initial host load', () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'perf017-load-compatibility-'));
    const baselineRoot = path.join(directory, 'baseline');
    const candidateRoot = path.join(directory, 'candidate');
    try {
        createBuild(baselineRoot, 'baseline');
        createBuild(candidateRoot, 'candidate');
        const cpuMismatch = compareExperienceReports({
            baseline: createReport({ root: baselineRoot }),
            candidate: createReport({ hostLoad: createHostLoad({ logicalCpuCount: 8 }), root: candidateRoot }),
            targets: ['older-phone.startup-process-cold-offline.readyMs'],
        });
        assert.equal(cpuMismatch.passed, false);
        assert(cpuMismatch.incompatibilities.some((issue) => issue.includes('logical CPU count')));

        const loadMismatch = compareExperienceReports({
            baseline: createReport({
                hostLoad: createHostLoad({ fiveMinutes: 0.4, oneMinute: 0.4 }),
                root: baselineRoot,
            }),
            candidate: createReport({
                hostLoad: createHostLoad({ fiveMinutes: 2, oneMinute: 2 }),
                root: candidateRoot,
            }),
            targets: ['older-phone.startup-process-cold-offline.readyMs'],
        });
        assert.equal(loadMismatch.passed, false);
        assert(loadMismatch.incompatibilities.some((issue) => issue.includes('initial oneMinute host load differs')));

        const swappedWindows = compareExperienceReports({
            baseline: createReport({
                hostLoad: createHostLoad({ fiveMinutes: 2.4, oneMinute: 0.4 }),
                root: baselineRoot,
            }),
            candidate: createReport({
                hostLoad: createHostLoad({ fiveMinutes: 0.4, oneMinute: 2.4 }),
                root: candidateRoot,
            }),
            targets: ['older-phone.startup-process-cold-offline.readyMs'],
        });
        assert.equal(swappedWindows.passed, false);
        assert(swappedWindows.incompatibilities.some((issue) => issue.includes('initial oneMinute host load differs')));
        assert(
            swappedWindows.incompatibilities.some((issue) => issue.includes('initial fiveMinutes host load differs'))
        );
    } finally {
        fs.rmSync(directory, { force: true, recursive: true });
    }
});

test('comparison accepts a shared valid third-party snapshot and rejects a different valid snapshot', () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'perf019-third-party-compatibility-'));
    const baselineRoot = path.join(directory, 'baseline');
    const candidateRoot = path.join(directory, 'candidate');
    try {
        createBuild(baselineRoot, 'baseline');
        createBuild(candidateRoot, 'candidate');
        const firstSnapshot = createThirdPartySnapshot(path.join(directory, 'snapshot-a'), 'a');
        const secondSnapshot = createThirdPartySnapshot(path.join(directory, 'snapshot-b'), 'b');
        const createSnapshotReport = (root, snapshot) =>
            createReport({
                profileName: 'cpu-only',
                root,
                scenario: 'startup-third-party-runtime',
                thirdPartyProvenance: {
                    mode: 'snapshot',
                    serviceWorkerPolicy: 'unregister-and-block',
                    snapshot: snapshot.provenance,
                },
                thirdPartyRuntime: 'snapshot',
                thirdPartySnapshot: snapshot.manifestPath,
            });
        const baseline = createSnapshotReport(baselineRoot, firstSnapshot);
        const matching = compareExperienceReports({
            baseline,
            candidate: createSnapshotReport(candidateRoot, firstSnapshot),
            targets: ['cpu-only.startup-third-party-runtime.readyMs'],
        });
        assert.equal(matching.compatible, true);
        assert.equal(matching.passed, false);
        const different = compareExperienceReports({
            baseline,
            candidate: createSnapshotReport(candidateRoot, secondSnapshot),
            targets: ['cpu-only.startup-third-party-runtime.readyMs'],
        });
        assert.equal(different.passed, false);
        assert(different.incompatibilities.some((issue) => issue.includes('third-party runtime fixtures differ')));
    } finally {
        fs.rmSync(directory, { force: true, recursive: true });
    }
});

test('comparison rejects missing, malformed, and over-threshold host load provenance', () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'perf017-load-provenance-'));
    const baselineRoot = path.join(directory, 'baseline');
    const candidateRoot = path.join(directory, 'candidate');
    try {
        createBuild(baselineRoot, 'baseline');
        createBuild(candidateRoot, 'candidate');
        const malformed = createHostLoad();
        malformed.preRun.perCpu.oneMinute = 99;
        const cases = [
            createReport({ hostLoad: null, root: baselineRoot }),
            createReport({ hostLoad: malformed, root: baselineRoot }),
            createReport({ hostLoad: createHostLoad({ runs: 0 }), root: baselineRoot }),
            createReport({ hostLoad: createHostLoad({ oneMinute: 9 }), root: baselineRoot }),
        ];
        for (const baseline of cases) {
            const comparison = compareExperienceReports({
                baseline,
                candidate: createReport({ root: candidateRoot, target: 850 }),
                targets: ['older-phone.startup-process-cold-offline.readyMs'],
            });
            assert.equal(comparison.passed, false);
            assert(comparison.incompatibilities.some((issue) => issue.includes('Host load')));
        }
    } finally {
        fs.rmSync(directory, { force: true, recursive: true });
    }
});

test('comparison reports an empty declared checkpoint matrix without throwing', () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'perf017-empty-load-matrix-'));
    const baselineRoot = path.join(directory, 'baseline');
    const candidateRoot = path.join(directory, 'candidate');
    try {
        createBuild(baselineRoot, 'baseline');
        createBuild(candidateRoot, 'candidate');
        const baseline = createReport({ hostLoad: createHostLoad({ runs: 0 }), root: baselineRoot });
        baseline.options.selectedProfiles = [];
        baseline.options.selectedScenarios = [];
        baseline.profiles = {};
        baseline.integrity = createExperienceReportIntegrity(baseline, baselineRoot);
        const comparison = compareExperienceReports({
            baseline,
            candidate: createReport({ root: candidateRoot }),
            targets: ['older-phone.startup-process-cold-offline.readyMs'],
        });
        assert.equal(comparison.passed, false);
        assert(comparison.incompatibilities.some((issue) => issue.includes('expected checkpoint labels')));
    } finally {
        fs.rmSync(directory, { force: true, recursive: true });
    }
});

test('comparison aggregates malformed gates, semantic drift, trace, and sample incompatibilities', () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'perf017-incompatible-'));
    const baselineRoot = path.join(directory, 'baseline');
    const candidateRoot = path.join(directory, 'candidate');
    try {
        createBuild(baselineRoot, 'baseline');
        createBuild(candidateRoot, 'candidate');
        const baseline = createReport({ root: baselineRoot });
        const candidate = createReport({ root: candidateRoot });
        delete baseline.allRunsPassed;
        candidate.options.trace = 'all';
        candidate.environment.hostname = 'different-host';
        candidate.environment.browserVersion = { product: 'Chrome/152.0.0.0' };
        candidate.profiles['older-phone'].runs[0].scenarios['startup-process-cold-offline'].date.paragraphCount = 43;
        const comparison = compareExperienceReports({ baseline, candidate, targets: ['missing'] });
        assert.equal(comparison.passed, false);
        assert(comparison.incompatibilities.some((issue) => issue.includes('allRunsPassed')));
        assert(comparison.incompatibilities.some((issue) => issue.includes('trace')));
        assert(comparison.incompatibilities.some((issue) => issue.includes('actual browser version')));
        assert(comparison.incompatibilities.some((issue) => issue.includes('host differ')));
        assert(comparison.incompatibilities.some((issue) => issue.includes('paragraphCount changed')));
        assert(comparison.incompatibilities.some((issue) => issue.includes('missing a finite p75')));
    } finally {
        fs.rmSync(directory, { force: true, recursive: true });
    }
});

test('comparison CLI emits all incompatibilities and exits nonzero', () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'perf017-cli-incompatible-'));
    const baselineRoot = path.join(directory, 'baseline-build');
    const candidateRoot = path.join(directory, 'candidate-build');
    try {
        createBuild(baselineRoot, 'baseline');
        createBuild(candidateRoot, 'candidate');
        const baseline = createReport({ root: baselineRoot });
        const candidate = createReport({ root: candidateRoot });
        delete baseline.allRunsPassed;
        candidate.options.trace = 'sampled';
        const baselineFile = path.join(directory, 'baseline.json');
        const candidateFile = path.join(directory, 'candidate.json');
        fs.writeFileSync(baselineFile, JSON.stringify(baseline));
        fs.writeFileSync(candidateFile, JSON.stringify(candidate));
        const result = spawnSync(
            process.execPath,
            [
                new URL('./compare-experience.mjs', import.meta.url).pathname,
                '--baseline',
                baselineFile,
                '--candidate',
                candidateFile,
                '--output',
                path.join(directory, 'comparison.json'),
                '--targets',
                'older-phone.startup-process-cold-offline.readyMs',
            ],
            { encoding: 'utf8' }
        );
        const comparison = JSON.parse(result.stdout);
        assert.equal(result.status, 1);
        assert(comparison.incompatibilities.some((issue) => issue.includes('allRunsPassed')));
        assert(comparison.incompatibilities.some((issue) => issue.includes('trace')));
    } finally {
        fs.rmSync(directory, { force: true, recursive: true });
    }
});

test('smoke comparisons are explicitly informational while comparison mode requires twenty samples', () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'perf017-samples-'));
    const baselineRoot = path.join(directory, 'baseline');
    const candidateRoot = path.join(directory, 'candidate');
    try {
        createBuild(baselineRoot, 'baseline');
        createBuild(candidateRoot, 'candidate');
        const smoke = compareExperienceReports({
            baseline: createReport({ mode: 'smoke', root: baselineRoot, target: 1000 }),
            candidate: createReport({ mode: 'smoke', root: candidateRoot, target: 850 }),
            targets: ['older-phone.startup-process-cold-offline.readyMs'],
        });
        assert.equal(smoke.informational, true);
        assert.equal(smoke.authoritative, false);
        assert.equal(smoke.passed, true);

        const shortBaseline = createReport({ root: baselineRoot, runs: 19, target: 1000 });
        const shortCandidate = createReport({ root: candidateRoot, runs: 19, target: 850 });
        const comparison = compareExperienceReports({
            baseline: shortBaseline,
            candidate: shortCandidate,
            targets: ['older-phone.startup-process-cold-offline.readyMs'],
        });
        assert.equal(comparison.authoritative, true);
        assert.equal(comparison.passed, false);
        assert(comparison.incompatibilities.some((issue) => issue.includes('at least 20')));
    } finally {
        fs.rmSync(directory, { force: true, recursive: true });
    }
});

test('comparison arguments validate finite thresholds and support higher-is-better metrics', () => {
    assert.throws(
        () =>
            parseComparisonArguments([
                '--baseline',
                'baseline.json',
                '--candidate',
                'candidate.json',
                '--output',
                'comparison.json',
                '--targets',
                'score',
                '--threshold-percent',
                'Infinity',
            ]),
        /finite, nonnegative/u
    );
    const options = parseComparisonArguments([
        '--baseline',
        'baseline.json',
        '--candidate',
        'candidate.json',
        '--output',
        'comparison.json',
        '--targets',
        'score',
        '--direction',
        'higher',
    ]);
    assert.equal(options.direction, 'higher');
});

test('artifact writer refuses a nonempty output and duplicate artifacts', () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'perf017-artifacts-'));
    try {
        fs.writeFileSync(path.join(directory, 'stale.json'), '{}');
        assert.throws(() => createArtifactWriter(directory), /not empty/u);

        fs.rmSync(path.join(directory, 'stale.json'));
        const writer = createArtifactWriter(directory);
        const noIndexMarker = path.join(directory, '.metadata_never_index');
        assert.equal(fs.existsSync(noIndexMarker), true);
        const buildRoot = path.join(directory, 'build');
        createBuild(buildRoot, 'marker-exclusion');
        const fingerprintBefore = createBuildFingerprint(buildRoot);
        fs.writeFileSync(noIndexMarker, 'changed outside the build snapshot');
        assert.equal(createBuildFingerprint(buildRoot).digest, fingerprintBefore.digest);
        assert.equal(fs.existsSync(path.join(buildRoot, '.metadata_never_index')), false);
        writer.writeJson('report.json', { fresh: true });
        assert.throws(() => writer.writeJson('report.json', { stale: true }), /EEXIST/u);

        const existingMarkerOnly = fs.mkdtempSync(path.join(os.tmpdir(), 'perf017-artifact-marker-'));
        try {
            fs.writeFileSync(path.join(existingMarkerOnly, '.metadata_never_index'), '');
            assert.throws(() => createArtifactWriter(existingMarkerOnly), /not empty/u);
        } finally {
            fs.rmSync(existingMarkerOnly, { force: true, recursive: true });
        }
    } finally {
        fs.rmSync(directory, { force: true, recursive: true });
    }
});
