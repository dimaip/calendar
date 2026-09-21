import path from 'node:path';

export const EXPERIENCE_PROFILES = {
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

export const EXPERIENCE_SCENARIOS = [
    'startup-process-cold-online',
    'startup-process-cold-offline',
    'startup-warm-process',
    'startup-third-party-runtime',
    'offline-unvisited-all-languages',
    'touch-reading-rapid',
    'touch-reading-precision',
    'touch-date-left',
    'touch-date-right',
    'service-cold-csj',
    'service-cold-parallel',
    'service-persisted-parallel',
    'retention',
];

const scenarioGroups = {
    startup: ['startup-process-cold-online', 'startup-process-cold-offline', 'startup-warm-process'],
    'offline-coverage': ['offline-unvisited-all-languages'],
    touch: EXPERIENCE_SCENARIOS.filter((scenario) => scenario.startsWith('touch-')),
    language: EXPERIENCE_SCENARIOS.filter((scenario) => scenario.startsWith('service-')),
    retention: ['retention'],
};

const parsePairs = (argv) => {
    const values = new Map();
    for (let index = 0; index < argv.length; index += 2) {
        const name = argv[index];
        const value = argv[index + 1];
        if (!name?.startsWith('--') || value === undefined) {
            throw new Error(`Invalid argument near "${name ?? ''}". Expected --name value pairs.`);
        }
        values.set(name.slice(2), value);
    }
    return values;
};

const commaList = (value) =>
    value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);

const integer = (value, name, minimum = 1) => {
    const parsed = Number(value);
    if (!Number.isInteger(parsed) || parsed < minimum) {
        throw new Error(`--${name} must be an integer greater than or equal to ${minimum}.`);
    }
    return parsed;
};

const boolean = (value, name) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    throw new Error(`--${name} must be true or false.`);
};

const nonnegativeNumber = (value, name) => {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed < 0) {
        throw new Error(`--${name} must be a finite, nonnegative number.`);
    }
    return parsed;
};

const expandScenarios = (requested) => {
    if (requested.includes('all')) {
        return EXPERIENCE_SCENARIOS.filter((scenario) => scenario !== 'startup-third-party-runtime');
    }

    const expanded = requested.flatMap((name) => scenarioGroups[name] ?? [name]);
    const unique = [...new Set(expanded)];
    for (const scenario of unique) {
        if (!EXPERIENCE_SCENARIOS.includes(scenario)) {
            throw new Error(
                `Unknown scenario "${scenario}". Expected one of ${EXPERIENCE_SCENARIOS.join(', ')} or groups ${Object.keys(
                    scenarioGroups
                ).join(', ')}.`
            );
        }
    }
    return unique;
};

export const parseExperienceArguments = (argv = process.argv.slice(2)) => {
    const values = parsePairs(argv);
    const mode = values.get('mode') ?? 'smoke';
    if (!['smoke', 'comparison'].includes(mode)) {
        throw new Error('--mode must be smoke or comparison.');
    }

    const label = values.get('label');
    const rootValue = values.get('root');
    const outputValue = values.get('output');
    const port = integer(values.get('port') ?? '4173', 'port');
    if (!label || !rootValue || !outputValue) {
        throw new Error('Required arguments: --label NAME --root WWW_PATH --output OUTPUT_DIRECTORY.');
    }

    const selectedProfiles = commaList(values.get('profiles') ?? 'older-phone');
    for (const profileName of selectedProfiles) {
        if (!EXPERIENCE_PROFILES[profileName]) {
            throw new Error(`Unknown profile "${profileName}".`);
        }
    }

    const stateFixture = values.get('state') ?? 'anonymous-normal';
    if (!['anonymous-normal', 'anonymous-100k', 'anonymous-1m'].includes(stateFixture)) {
        throw new Error(
            '--state must be anonymous-normal, anonymous-100k, or anonymous-1m. Authenticated profiles require a dedicated future fixture and are intentionally unsupported in v1.'
        );
    }

    const trace = values.get('trace') ?? 'none';
    if (!['none', 'failures', 'sampled', 'all'].includes(trace)) {
        throw new Error('--trace must be none, failures, sampled, or all.');
    }

    const browser = values.get('browser') ?? 'chromium';
    if (!['chromium', 'chrome'].includes(browser)) {
        throw new Error('--browser must be chromium or chrome.');
    }

    const thirdPartyRuntime = values.get('third-party-runtime') ?? 'blocked';
    if (!['blocked', 'snapshot'].includes(thirdPartyRuntime)) {
        throw new Error('--third-party-runtime must be blocked or snapshot.');
    }
    const thirdPartySnapshotValue = values.get('third-party-snapshot');
    const selectedScenarios = expandScenarios(commaList(values.get('scenarios') ?? 'startup,touch,language'));
    const offlineScenarios = selectedScenarios.filter(
        (scenario) => scenario === 'startup-process-cold-offline' || scenario === 'offline-unvisited-all-languages'
    );
    if (thirdPartyRuntime === 'snapshot' && !thirdPartySnapshotValue) {
        throw new Error('--third-party-snapshot is required when --third-party-runtime snapshot is selected.');
    }
    if (thirdPartyRuntime === 'blocked' && thirdPartySnapshotValue) {
        throw new Error('--third-party-snapshot is only valid with --third-party-runtime snapshot.');
    }
    if (thirdPartyRuntime === 'snapshot' && offlineScenarios.length) {
        throw new Error(
            `Third-party snapshot replay is online-only and cannot run offline scenarios: ${offlineScenarios.join(', ')}.`
        );
    }
    if (selectedScenarios.includes('startup-third-party-runtime') && thirdPartyRuntime !== 'snapshot') {
        throw new Error('startup-third-party-runtime requires --third-party-runtime snapshot.');
    }
    if (
        thirdPartyRuntime === 'snapshot' &&
        (selectedScenarios.length !== 1 || selectedScenarios[0] !== 'startup-third-party-runtime')
    ) {
        throw new Error('--third-party-runtime snapshot is isolated to the startup-third-party-runtime scenario.');
    }
    if (thirdPartyRuntime === 'snapshot' && (selectedProfiles.length !== 1 || selectedProfiles[0] !== 'cpu-only')) {
        throw new Error(
            '--third-party-runtime snapshot is CPU-only because route.fulfill does not reproduce production transfer encoding or transport.'
        );
    }

    return {
        browser,
        contentEncoding: values.get('encoding') ?? 'gzip',
        headless: boolean(values.get('headless') ?? 'true', 'headless'),
        label,
        mode,
        output: path.resolve(outputValue),
        port,
        retentionCycles: integer(
            values.get('retention-cycles') ?? (mode === 'comparison' ? '20' : '3'),
            'retention-cycles',
            2
        ),
        root: path.resolve(rootValue),
        runs: integer(values.get('runs') ?? (mode === 'comparison' ? '20' : '3'), 'runs'),
        selectedProfiles,
        selectedScenarios,
        stateFixture,
        thirdPartyRuntime,
        thirdPartySnapshot: thirdPartySnapshotValue ? path.resolve(thirdPartySnapshotValue) : null,
        trace,
    };
};

export const parseComparisonArguments = (argv = process.argv.slice(2)) => {
    const values = parsePairs(argv);
    const baseline = values.get('baseline');
    const candidate = values.get('candidate');
    const output = values.get('output');
    const targets = commaList(values.get('targets') ?? '');
    if (!baseline || !candidate || !output || targets.length === 0) {
        throw new Error(
            'Required arguments: --baseline REPORT --candidate REPORT --output REPORT --targets METRIC[,METRIC].'
        );
    }

    const direction = values.get('direction') ?? 'lower';
    if (!['higher', 'lower'].includes(direction)) {
        throw new Error('--direction must be lower or higher.');
    }

    return {
        baseline: path.resolve(baseline),
        candidate: path.resolve(candidate),
        direction,
        output: path.resolve(output),
        regressionPercent: nonnegativeNumber(values.get('regression-percent') ?? '5', 'regression-percent'),
        safeguards: commaList(values.get('safeguards') ?? ''),
        thresholdMs: nonnegativeNumber(values.get('threshold-ms') ?? '100', 'threshold-ms'),
        thresholdPercent: nonnegativeNumber(values.get('threshold-percent') ?? '10', 'threshold-percent'),
        targets,
    };
};
