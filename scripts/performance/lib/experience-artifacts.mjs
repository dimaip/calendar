import fs from 'node:fs';
import path from 'node:path';

import { quantile } from './browser-observers.mjs';
import { createBuildFingerprint, verifyBuildFingerprint, verifyHarnessFingerprint } from './build-fingerprint.mjs';

const SEMANTIC_FIELDS = ['headingShapeHash', 'paragraphCount', 'renderKey', 'textCharacters'];
export const EXPERIENCE_REPORT_SCHEMA_VERSION = 1;

const flattenNumbers = (value, prefix = '', target = {}) => {
    if (typeof value === 'number' && Number.isFinite(value)) {
        target[prefix] = value;
        return target;
    }
    if (!value || typeof value !== 'object' || Array.isArray(value)) return target;
    for (const [key, child] of Object.entries(value)) {
        flattenNumbers(child, prefix ? `${prefix}.${key}` : key, target);
    }
    return target;
};

const sortedStrings = (value) =>
    Array.isArray(value) && value.every((item) => typeof item === 'string') ? [...value].sort() : null;

const sameJson = (left, right) => JSON.stringify(left) === JSON.stringify(right);

const collectNamedFields = (value, fieldNames, prefix = '', target = {}) => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return target;
    for (const [name, child] of Object.entries(value)) {
        const fieldPath = prefix ? `${prefix}.${name}` : name;
        if (fieldNames.includes(name) && child != null) target[fieldPath] = child;
        if (child && typeof child === 'object' && !Array.isArray(child)) {
            collectNamedFields(child, fieldNames, fieldPath, target);
        }
    }
    return target;
};

const reportProfiles = (report) =>
    sortedStrings(report?.options?.selectedProfiles) ??
    (report?.profiles && typeof report.profiles === 'object' ? Object.keys(report.profiles).sort() : []);

const reportScenarios = (report) => sortedStrings(report?.options?.selectedScenarios) ?? [];

const analyzeReportSamples = (report) => {
    const issues = [];
    const successfulSamples = {};
    const semanticShape = {};
    const offlineServiceWorker = {};
    const scenarios = reportScenarios(report);

    for (const profileName of reportProfiles(report)) {
        const profile = report?.profiles?.[profileName];
        if (!profile || !Array.isArray(profile.runs)) {
            issues.push(`Profile ${JSON.stringify(profileName)} is missing its runs array.`);
            continue;
        }
        const seed = profile.seed;
        const seedCacheEntries = Array.isArray(seed?.cacheEntries)
            ? seed.cacheEntries.reduce(
                  (total, cache) => total + (Number.isInteger(cache?.entries) && cache.entries > 0 ? cache.entries : 0),
                  0
              )
            : 0;
        offlineServiceWorker[profileName] = {
            scenarios: {},
            seedActive: seed?.active === true,
            seedControlled: seed?.controlled === true,
            seedHasCachedEntries: seedCacheEntries > 0,
        };
        if (!offlineServiceWorker[profileName].seedActive) {
            issues.push(`Profile ${JSON.stringify(profileName)} did not record an active seeded service worker.`);
        }
        if (!offlineServiceWorker[profileName].seedControlled) {
            issues.push(`Profile ${JSON.stringify(profileName)} did not record a controlling seeded service worker.`);
        }
        if (!offlineServiceWorker[profileName].seedHasCachedEntries) {
            issues.push(`Profile ${JSON.stringify(profileName)} did not record a nonempty seeded cache.`);
        }

        for (const scenario of scenarios) {
            const key = `${profileName}.${scenario}`;
            for (const [runIndex, run] of profile.runs.entries()) {
                if (typeof run?.scenarioPassed?.[scenario] !== 'boolean') {
                    issues.push(`${key} run ${runIndex + 1} is missing a boolean scenarioPassed flag.`);
                }
            }
            const results = profile.runs
                .filter((run) => run?.scenarioPassed?.[scenario] === true)
                .map((run) => run.scenarios?.[scenario])
                .filter((result) => result && typeof result === 'object' && Object.keys(result).length > 0);
            successfulSamples[key] = results.length;
            if (results.length !== profile.runs.length) {
                issues.push(
                    `${key} has ${results.length} successful samples for ${profile.runs.length} recorded runs.`
                );
            }

            const fields = {};
            const runFields = results.map((result) => collectNamedFields(result, SEMANTIC_FIELDS));
            const semanticPaths = [...new Set(runFields.flatMap((value) => Object.keys(value)))].sort();
            for (const semanticPath of semanticPaths) {
                const values = [
                    ...new Set(runFields.map((value) => value[semanticPath]).filter((value) => value != null)),
                ];
                if (values.length > 1) {
                    issues.push(`${key}.${semanticPath} changed between successful runs.`);
                }
                if (values.length === 1) fields[semanticPath] = values[0];
                if (runFields.filter((value) => semanticPath in value).length !== results.length) {
                    issues.push(`${key}.${semanticPath} is missing from one or more successful runs.`);
                }
            }
            if (scenario !== 'retention') {
                const expectedPrefixes =
                    scenario === 'startup-process-cold-offline'
                        ? ['date.', 'ru.']
                        : scenario === 'offline-unvisited-all-languages'
                          ? ['date.', 'ru.', 'csj.', 'parallel.']
                          : [''];
                for (const prefix of expectedPrefixes) {
                    for (const field of ['headingShapeHash', 'paragraphCount', 'textCharacters']) {
                        if (!(`${prefix}${field}` in fields)) {
                            issues.push(`${key} is missing semantic field ${prefix}${field}.`);
                        }
                    }
                }
            }
            semanticShape[key] = fields;

            const serviceWorkerControlled = [
                ...new Set(
                    results.flatMap((result) => Object.values(collectNamedFields(result, ['serviceWorkerControlled'])))
                ),
            ];
            const offline = [...new Set(results.map((result) => result.offline).filter((value) => value != null))];
            offlineServiceWorker[profileName].scenarios[scenario] = {
                offline,
                serviceWorkerControlled,
            };
            if (scenario !== 'retention' && !sameJson(serviceWorkerControlled, [true])) {
                issues.push(`${key} must record serviceWorkerControlled=true in every successful sample.`);
            }
            if (
                (scenario === 'startup-process-cold-offline' || scenario === 'offline-unvisited-all-languages') &&
                !sameJson(offline, [true])
            ) {
                issues.push(`${key} must record offline=true in every successful sample.`);
            }
            if (
                (scenario === 'startup-process-cold-online' || scenario === 'startup-warm-process') &&
                !sameJson(offline, [false])
            ) {
                issues.push(`${key} must record offline=false in every successful sample.`);
            }
        }
    }

    return { issues, offlineServiceWorker, semanticShape, successfulSamples };
};

export const createExperienceReportIntegrity = (
    report,
    buildRoot = report?.options?.root,
    { buildFingerprintBefore } = {}
) => {
    const analysis = analyzeReportSamples(report);
    const before = buildFingerprintBefore ?? createBuildFingerprint(buildRoot);
    const after = createBuildFingerprint(buildRoot);
    return {
        analysisIssues: analysis.issues,
        buildFingerprint: after,
        buildImmutability: {
            after,
            before,
            unchanged: sameJson(before, after),
        },
        offlineServiceWorker: analysis.offlineServiceWorker,
        semanticShape: analysis.semanticShape,
        successfulSamples: analysis.successfulSamples,
    };
};

export const validateExperienceReportCompatibility = ({ baseline, candidate }) => {
    const incompatibilities = [];
    const addReportIssues = (label, report) => {
        if (!report || typeof report !== 'object' || Array.isArray(report)) {
            incompatibilities.push(`${label} report must be a JSON object.`);
            return null;
        }
        if (report.allRunsPassed !== true) {
            incompatibilities.push(
                `${label} allRunsPassed must be the boolean true; received ${JSON.stringify(report.allRunsPassed)}.`
            );
        }
        if (report.schemaVersion !== EXPERIENCE_REPORT_SCHEMA_VERSION) {
            incompatibilities.push(
                `${label} schemaVersion must be ${EXPERIENCE_REPORT_SCHEMA_VERSION}; received ${JSON.stringify(report.schemaVersion)}.`
            );
        }
        if (!report.route || typeof report.route !== 'object') {
            incompatibilities.push(`${label} route metadata is missing.`);
        } else {
            for (const property of ['date', 'fixedDate', 'service']) {
                if (typeof report.route[property] !== 'string' || report.route[property].length === 0) {
                    incompatibilities.push(`${label} route.${property} must be a nonempty string.`);
                }
            }
        }
        if (!report.options || typeof report.options !== 'object') {
            incompatibilities.push(`${label} options metadata is missing.`);
            return null;
        }
        if (!['chromium', 'chrome'].includes(report.options.browser)) {
            incompatibilities.push(`${label} options.browser is unsupported or missing.`);
        }
        if (report.environment?.browser !== report.options.browser) {
            incompatibilities.push(`${label} environment.browser must match options.browser.`);
        }
        if (typeof report.options.headless !== 'boolean') {
            incompatibilities.push(`${label} options.headless must be a boolean.`);
        }
        for (const property of ['hostname', 'platform', 'processor', 'projectRoot']) {
            if (typeof report.environment?.[property] !== 'string' || report.environment[property].length === 0) {
                incompatibilities.push(`${label} environment.${property} must be a nonempty string.`);
            }
        }
        if (
            !report.environment?.browserVersion ||
            typeof report.environment.browserVersion !== 'object' ||
            typeof report.environment.browserVersion.product !== 'string' ||
            report.environment.browserVersion.product.length === 0
        ) {
            incompatibilities.push(`${label} environment.browserVersion must record the actual browser product.`);
        }
        const harnessFingerprint = verifyHarnessFingerprint(
            report.environment?.harnessFingerprint,
            report.environment?.projectRoot
        );
        incompatibilities.push(...harnessFingerprint.issues.map((issue) => `${label} ${issue}`));
        if (typeof report.options.contentEncoding !== 'string' || report.options.contentEncoding.length === 0) {
            incompatibilities.push(`${label} options.contentEncoding must be recorded.`);
        }
        if (typeof report.options.stateFixture !== 'string' || report.options.stateFixture.length === 0) {
            incompatibilities.push(`${label} options.stateFixture must be recorded.`);
        }
        if (typeof report.options.root !== 'string' || report.options.root.length === 0) {
            incompatibilities.push(`${label} options.root must record the build provenance path.`);
        }
        if (!sortedStrings(report.options.selectedProfiles)?.length) {
            incompatibilities.push(`${label} options.selectedProfiles must be a nonempty string array.`);
        }
        if (!sortedStrings(report.options.selectedScenarios)?.length) {
            incompatibilities.push(`${label} options.selectedScenarios must be a nonempty string array.`);
        }
        if (report.options.trace !== 'none') {
            incompatibilities.push(`${label} options.trace must be "none" for a comparison report.`);
        }
        if (!['comparison', 'smoke'].includes(report.options.mode)) {
            incompatibilities.push(`${label} options.mode must be "comparison" or "smoke".`);
        }
        if (!Number.isInteger(report.options.runs) || report.options.runs < 1) {
            incompatibilities.push(`${label} options.runs must be a positive integer.`);
        }

        const analysis = analyzeReportSamples(report);
        incompatibilities.push(...analysis.issues.map((issue) => `${label} ${issue}`));
        const integrity = report.integrity;
        if (!integrity || typeof integrity !== 'object' || Array.isArray(integrity)) {
            incompatibilities.push(`${label} integrity metadata is missing.`);
        } else {
            for (const [property, actual] of [
                ['analysisIssues', analysis.issues],
                ['offlineServiceWorker', analysis.offlineServiceWorker],
                ['semanticShape', analysis.semanticShape],
                ['successfulSamples', analysis.successfulSamples],
            ]) {
                if (!sameJson(integrity[property], actual)) {
                    incompatibilities.push(`${label} integrity.${property} does not match the recorded runs.`);
                }
            }
            const fingerprint = verifyBuildFingerprint(integrity.buildFingerprint, report.options.root);
            incompatibilities.push(...fingerprint.issues.map((issue) => `${label} ${issue}`));
            if (!integrity.buildImmutability || typeof integrity.buildImmutability !== 'object') {
                incompatibilities.push(`${label} integrity.buildImmutability is missing.`);
            } else {
                if (integrity.buildImmutability.unchanged !== true) {
                    incompatibilities.push(`${label} build artifacts changed during the benchmark run.`);
                }
                if (!sameJson(integrity.buildImmutability.before, integrity.buildImmutability.after)) {
                    incompatibilities.push(`${label} pre-run and post-run build fingerprints differ.`);
                }
                if (!sameJson(integrity.buildFingerprint, integrity.buildImmutability.after)) {
                    incompatibilities.push(`${label} final build fingerprint does not match the post-run fingerprint.`);
                }
            }
        }
        return analysis;
    };

    const baselineAnalysis = addReportIssues('Baseline', baseline);
    const candidateAnalysis = addReportIssues('Candidate', candidate);
    if (!baselineAnalysis || !candidateAnalysis) {
        return { authoritative: false, compatible: false, incompatibilities, informational: false };
    }

    for (const [name, left, right] of [
        ['schemaVersion', baseline.schemaVersion, candidate.schemaVersion],
        ['route metadata', baseline.route, candidate.route],
        ['browser', baseline.options?.browser, candidate.options?.browser],
        ['environment browser', baseline.environment?.browser, candidate.environment?.browser],
        ['actual browser version', baseline.environment?.browserVersion, candidate.environment?.browserVersion],
        ['headless mode', baseline.options?.headless, candidate.options?.headless],
        ['host', baseline.environment?.hostname, candidate.environment?.hostname],
        ['platform', baseline.environment?.platform, candidate.environment?.platform],
        ['processor', baseline.environment?.processor, candidate.environment?.processor],
        [
            'harness fingerprint digest',
            baseline.environment?.harnessFingerprint?.digest,
            candidate.environment?.harnessFingerprint?.digest,
        ],
        ['content encoding', baseline.options?.contentEncoding, candidate.options?.contentEncoding],
        ['state fixture', baseline.options?.stateFixture, candidate.options?.stateFixture],
        ['mode', baseline.options?.mode, candidate.options?.mode],
        [
            'selected profiles',
            sortedStrings(baseline.options?.selectedProfiles),
            sortedStrings(candidate.options?.selectedProfiles),
        ],
        [
            'selected scenarios',
            sortedStrings(baseline.options?.selectedScenarios),
            sortedStrings(candidate.options?.selectedScenarios),
        ],
    ]) {
        if (!sameJson(left, right)) incompatibilities.push(`Baseline and candidate ${name} differ.`);
    }
    for (const profileName of new Set([...reportProfiles(baseline), ...reportProfiles(candidate)])) {
        if (
            !sameJson(baseline.profiles?.[profileName]?.configuration, candidate.profiles?.[profileName]?.configuration)
        ) {
            incompatibilities.push(`Baseline and candidate throttle configuration differs for ${profileName}.`);
        }
    }
    if (!sameJson(baselineAnalysis.semanticShape, candidateAnalysis.semanticShape)) {
        incompatibilities.push('Baseline and candidate semantic signatures/counts differ.');
    }
    if (!sameJson(baselineAnalysis.offlineServiceWorker, candidateAnalysis.offlineServiceWorker)) {
        incompatibilities.push('Baseline and candidate offline/service-worker flags differ.');
    }

    const mode = baseline.options?.mode;
    const authoritative = mode === 'comparison' && candidate.options?.mode === 'comparison';
    const informational = mode === 'smoke' && candidate.options?.mode === 'smoke';
    if (authoritative) {
        for (const [label, report, analysis] of [
            ['Baseline', baseline, baselineAnalysis],
            ['Candidate', candidate, candidateAnalysis],
        ]) {
            if (report.options.runs < 20) {
                incompatibilities.push(
                    `${label} authoritative comparison requested ${report.options.runs} runs; at least 20 are required.`
                );
            }
            for (const [sample, count] of Object.entries(analysis.successfulSamples)) {
                if (count < 20) {
                    incompatibilities.push(
                        `${label} ${sample} has ${count} successful samples; at least 20 are required.`
                    );
                }
            }
        }
    }

    return {
        authoritative,
        buildIdentity: {
            baselineDigest: baseline.integrity?.buildFingerprint?.digest ?? null,
            candidateDigest: candidate.integrity?.buildFingerprint?.digest ?? null,
            policy: baseline.integrity?.buildFingerprint?.policy ?? null,
            sameBuild: baseline.integrity?.buildFingerprint?.digest === candidate.integrity?.buildFingerprint?.digest,
        },
        compatible: incompatibilities.length === 0,
        incompatibilities,
        informational,
    };
};

export const summarizeExperienceRuns = (runs) => {
    const values = new Map();
    for (const run of runs) {
        for (const [scenario, result] of Object.entries(run.scenarios)) {
            for (const [metric, value] of Object.entries(flattenNumbers(result))) {
                const pathName = `${scenario}.${metric}`;
                const collected = values.get(pathName) ?? [];
                collected.push(value);
                values.set(pathName, collected);
            }
        }
    }

    return Object.fromEntries(
        [...values.entries()].map(([metric, samples]) => [
            metric,
            {
                max: Math.max(...samples),
                median: quantile(samples, 0.5),
                min: Math.min(...samples),
                p75: quantile(samples, 0.75),
                samples: samples.length,
            },
        ])
    );
};

export const compareExperienceReports = ({
    baseline,
    candidate,
    direction = 'lower',
    regressionPercent = 5,
    safeguards = [],
    thresholdMs = 100,
    thresholdPercent = 10,
    targets,
}) => {
    const compatibility = validateExperienceReportCompatibility({ baseline, candidate });
    const incompatibilities = [...compatibility.incompatibilities];
    for (const [name, value] of [
        ['regressionPercent', regressionPercent],
        ['thresholdMs', thresholdMs],
        ['thresholdPercent', thresholdPercent],
    ]) {
        if (!Number.isFinite(value) || value < 0) {
            incompatibilities.push(`${name} must be a finite, nonnegative number.`);
        }
    }
    if (!['higher', 'lower'].includes(direction)) {
        incompatibilities.push('direction must be "lower" or "higher".');
    }
    if (!Array.isArray(targets) || targets.length === 0) {
        incompatibilities.push('At least one target metric is required.');
    }
    if (!Array.isArray(safeguards)) incompatibilities.push('safeguards must be an array.');

    const baselineSummary = baseline?.summary ?? {};
    const candidateSummary = candidate?.summary ?? {};
    const metricNames = [...(Array.isArray(targets) ? targets : []), ...(Array.isArray(safeguards) ? safeguards : [])];
    for (const metric of new Set(metricNames)) {
        for (const [label, summary] of [
            ['Baseline', baselineSummary[metric]],
            ['Candidate', candidateSummary[metric]],
        ]) {
            if (!summary || !Number.isFinite(summary.p75)) {
                incompatibilities.push(`${label} comparison metric ${JSON.stringify(metric)} is missing a finite p75.`);
            } else if (!Number.isInteger(summary.samples) || summary.samples < 1) {
                incompatibilities.push(
                    `${label} comparison metric ${JSON.stringify(metric)} is missing a positive sample count.`
                );
            } else if (compatibility.authoritative && summary.samples < 20) {
                incompatibilities.push(
                    `${label} authoritative metric ${JSON.stringify(metric)} has ${summary.samples} samples; at least 20 are required.`
                );
            }
        }
    }

    const validConfiguration = incompatibilities.length === 0;
    const improvement = (baselineValue, candidateValue) =>
        direction === 'higher' ? candidateValue - baselineValue : baselineValue - candidateValue;
    const percent = (change, baselineValue) =>
        baselineValue === 0 ? (change > 0 ? Infinity : 0) : (change / Math.abs(baselineValue)) * 100;
    const targetResults = validConfiguration
        ? targets.map((metric) => {
              const baselineValue = baselineSummary[metric].p75;
              const candidateValue = candidateSummary[metric].p75;
              const improvementValue = improvement(baselineValue, candidateValue);
              const improvementPercent = percent(improvementValue, baselineValue);
              return {
                  baselineP75: baselineValue,
                  candidateP75: candidateValue,
                  improvementMs: improvementValue,
                  improvementPercent,
                  improvementValue,
                  metric,
                  passed: improvementValue >= thresholdMs || improvementPercent >= thresholdPercent,
              };
          })
        : [];
    const safeguardResults = validConfiguration
        ? safeguards.map((metric) => {
              const baselineValue = baselineSummary[metric].p75;
              const candidateValue = candidateSummary[metric].p75;
              const regressionValue = -improvement(baselineValue, candidateValue);
              const regressionPercentValue = percent(regressionValue, baselineValue);
              return {
                  baselineP75: baselineValue,
                  candidateP75: candidateValue,
                  metric,
                  passed: regressionPercentValue <= regressionPercent,
                  regressionPercent: regressionPercentValue,
                  regressionValue,
              };
          })
        : [];
    const semanticPassed =
        baseline?.allRunsPassed === true && candidate?.allRunsPassed === true && compatibility.compatible;

    return {
        ...compatibility,
        compatible: incompatibilities.length === 0,
        direction,
        incompatibilities,
        metricGatePassed:
            validConfiguration &&
            targetResults.every(({ passed }) => passed) &&
            safeguardResults.every(({ passed }) => passed),
        passed:
            validConfiguration &&
            semanticPassed &&
            targetResults.every(({ passed }) => passed) &&
            safeguardResults.every(({ passed }) => passed),
        safeguards: safeguardResults,
        semanticPassed,
        thresholds: { regressionPercent, thresholdMs, thresholdPercent },
        targets: targetResults,
    };
};

export const createArtifactWriter = (outputDirectory, { allowExisting = false } = {}) => {
    const root = path.resolve(outputDirectory);
    if (fs.existsSync(root)) {
        if (!fs.statSync(root).isDirectory()) throw new Error(`Artifact output ${root} is not a directory.`);
        if (!allowExisting && fs.readdirSync(root).length > 0) {
            throw new Error(`Artifact output ${root} is not empty; choose a fresh directory to avoid stale results.`);
        }
    }
    fs.mkdirSync(root, { recursive: true });

    const targetPath = (relativePath) => {
        const target = path.resolve(root, relativePath);
        if (target !== root && !target.startsWith(`${root}${path.sep}`)) {
            throw new Error(`Artifact path escapes output directory: ${relativePath}.`);
        }
        return target;
    };
    const write = (relativePath, value) => {
        const target = targetPath(relativePath);
        fs.mkdirSync(path.dirname(target), { recursive: true });
        fs.writeFileSync(target, value, { flag: 'wx' });
        return target;
    };

    return {
        runDirectory: (profileName, runIndex, scenario) => {
            const directory = targetPath(path.join('runs', profileName, `run-${runIndex + 1}`, scenario));
            fs.mkdirSync(directory, { recursive: true });
            return directory;
        },
        writeBuffer: (relativePath, buffer) => write(relativePath, buffer),
        writeJson: (relativePath, value) => write(relativePath, `${JSON.stringify(value, null, 2)}\n`),
    };
};

export { flattenNumbers };
