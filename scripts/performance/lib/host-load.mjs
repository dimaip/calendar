import os from 'node:os';

export const HOST_LOAD_POLICY = 'host-load-per-logical-cpu-v1';
export const HOST_LOAD_SCHEMA_VERSION = 1;
// Keep at least 25% logical-CPU headroom for repeatable lab timings.
export const HOST_LOAD_THRESHOLD_PER_CPU = 0.75;
export const HOST_LOAD_COMPARISON_DELTA_PER_CPU = 0.25;

const LOAD_WINDOWS = ['oneMinute', 'fiveMinutes', 'fifteenMinutes'];
const GATED_WINDOWS = ['oneMinute', 'fiveMinutes'];

const sameJson = (left, right) => JSON.stringify(left) === JSON.stringify(right);

const sampleEntries = (provenance) => [
    { phase: 'preRun', sample: provenance?.preRun },
    ...(Array.isArray(provenance?.checkpoints)
        ? provenance.checkpoints.map((sample, index) => ({ phase: `checkpoints[${index}]`, sample }))
        : []),
    { phase: 'postRun', sample: provenance?.postRun },
];

export const evaluateHostLoadGate = (entries) => {
    const exceeded = [];
    let maxPerCpu = 0;
    for (const { phase, sample } of entries) {
        for (const window of GATED_WINDOWS) {
            const perCpu = sample?.perCpu?.[window];
            if (Number.isFinite(perCpu)) maxPerCpu = Math.max(maxPerCpu, perCpu);
            if (Number.isFinite(perCpu) && perCpu > HOST_LOAD_THRESHOLD_PER_CPU) {
                exceeded.push({ perCpu, phase, window });
            }
        }
    }
    return {
        exceeded,
        maxPerCpu,
        passed: exceeded.length === 0,
        thresholdPerCpu: HOST_LOAD_THRESHOLD_PER_CPU,
        windows: GATED_WINDOWS,
    };
};

export const collectHostLoadSample = ({
    loadAverage = os.loadavg(),
    logicalCpuCount = os.cpus().length,
    recordedAt = new Date().toISOString(),
} = {}) => {
    const [oneMinute, fiveMinutes, fifteenMinutes] = loadAverage;
    const values = { fifteenMinutes, fiveMinutes, oneMinute };
    return {
        loadAverage: values,
        perCpu: Object.fromEntries(Object.entries(values).map(([window, value]) => [window, value / logicalCpuCount])),
        recordedAt,
    };
};

export const createHostLoadProvenance = ({
    checkpoints = [],
    logicalCpuCount,
    platform = os.platform(),
    postRun,
    preRun,
}) => {
    const provenance = {
        checkpoints,
        gate: null,
        logicalCpuCount,
        platform,
        policy: HOST_LOAD_POLICY,
        postRun,
        preRun,
        schemaVersion: HOST_LOAD_SCHEMA_VERSION,
        source: 'node:os.loadavg',
        supported: platform !== 'win32',
    };
    provenance.gate = evaluateHostLoadGate(sampleEntries(provenance));
    return provenance;
};

export const validateHostLoadProvenance = (provenance, { expectedCheckpointLabels, reportRecordedAt } = {}) => {
    if (!provenance || typeof provenance !== 'object' || Array.isArray(provenance)) {
        return {
            issues: ['Host load provenance is missing or is not an object.'],
            passed: false,
            valid: false,
        };
    }

    const structuralIssues = [];
    if (provenance.schemaVersion !== HOST_LOAD_SCHEMA_VERSION) {
        structuralIssues.push(`Host load schemaVersion must be ${HOST_LOAD_SCHEMA_VERSION}.`);
    }
    if (provenance.policy !== HOST_LOAD_POLICY) {
        structuralIssues.push(`Host load policy must be ${JSON.stringify(HOST_LOAD_POLICY)}.`);
    }
    if (provenance.source !== 'node:os.loadavg') {
        structuralIssues.push('Host load source must be "node:os.loadavg".');
    }
    if (typeof provenance.platform !== 'string' || provenance.platform.length === 0) {
        structuralIssues.push('Host load platform must be a nonempty string.');
    }
    if (provenance.supported !== (provenance.platform !== 'win32')) {
        structuralIssues.push('Host load supported flag does not match the recorded platform.');
    }
    if (provenance.supported !== true) {
        structuralIssues.push(`Host load sampling is unsupported on ${JSON.stringify(provenance.platform)}.`);
    }
    if (!Number.isInteger(provenance.logicalCpuCount) || provenance.logicalCpuCount < 1) {
        structuralIssues.push('Host load logicalCpuCount must be a positive integer.');
    }

    if (!Array.isArray(provenance.checkpoints)) {
        structuralIssues.push('Host load checkpoints must be an array.');
    }
    const labels = new Set();
    for (const [index, checkpoint] of (Array.isArray(provenance.checkpoints) ? provenance.checkpoints : []).entries()) {
        if (typeof checkpoint?.label !== 'string' || checkpoint.label.length === 0) {
            structuralIssues.push(`Host load checkpoints[${index}].label must be a nonempty string.`);
        } else if (labels.has(checkpoint.label)) {
            structuralIssues.push(`Host load checkpoint label ${JSON.stringify(checkpoint.label)} is duplicated.`);
        } else {
            labels.add(checkpoint.label);
        }
    }
    if (Array.isArray(expectedCheckpointLabels)) {
        if (expectedCheckpointLabels.length === 0) {
            structuralIssues.push('Host load expected checkpoint labels must be nonempty.');
        }
        const actualCheckpointLabels = Array.isArray(provenance.checkpoints)
            ? provenance.checkpoints.map((checkpoint) => checkpoint?.label)
            : [];
        if (!sameJson(actualCheckpointLabels, expectedCheckpointLabels)) {
            structuralIssues.push(
                'Host load checkpoint labels do not match the declared profiles, runs, and scenarios.'
            );
        }
    }

    const timestamps = [];
    for (const { phase, sample } of sampleEntries(provenance)) {
        if (!sample || typeof sample !== 'object' || Array.isArray(sample)) {
            structuralIssues.push(`Host load ${phase} sample is missing or is not an object.`);
            continue;
        }
        if (typeof sample.recordedAt !== 'string' || !Number.isFinite(Date.parse(sample.recordedAt))) {
            structuralIssues.push(`Host load ${phase}.recordedAt must be a valid timestamp.`);
        } else {
            timestamps.push({ phase, value: Date.parse(sample.recordedAt) });
        }
        for (const group of ['loadAverage', 'perCpu']) {
            if (!sample[group] || typeof sample[group] !== 'object' || Array.isArray(sample[group])) {
                structuralIssues.push(`Host load ${phase}.${group} must be an object.`);
                continue;
            }
            for (const window of LOAD_WINDOWS) {
                if (!Number.isFinite(sample[group][window]) || sample[group][window] < 0) {
                    structuralIssues.push(`Host load ${phase}.${group}.${window} must be finite and nonnegative.`);
                }
            }
        }
        if (Number.isInteger(provenance.logicalCpuCount) && provenance.logicalCpuCount > 0) {
            for (const window of LOAD_WINDOWS) {
                const loadAverage = sample.loadAverage?.[window];
                const perCpu = sample.perCpu?.[window];
                if (
                    Number.isFinite(loadAverage) &&
                    Number.isFinite(perCpu) &&
                    Math.abs(perCpu - loadAverage / provenance.logicalCpuCount) > Number.EPSILON * 16
                ) {
                    structuralIssues.push(
                        `Host load ${phase}.perCpu.${window} does not match loadAverage divided by logicalCpuCount.`
                    );
                }
            }
        }
    }

    for (let index = 1; index < timestamps.length; index += 1) {
        if (timestamps[index].value < timestamps[index - 1].value) {
            structuralIssues.push(
                `Host load ${timestamps[index].phase}.recordedAt precedes ${timestamps[index - 1].phase}.recordedAt.`
            );
        }
    }
    const reportTimestamp = Date.parse(reportRecordedAt);
    if (reportRecordedAt != null && !Number.isFinite(reportTimestamp)) {
        structuralIssues.push('Host load reportRecordedAt must be a valid timestamp when provided.');
    } else if (Number.isFinite(reportTimestamp) && timestamps.length >= 2) {
        if (reportTimestamp < timestamps[0].value || reportTimestamp > timestamps.at(-1).value) {
            structuralIssues.push('Host load samples do not enclose the report recording timestamp.');
        }
    }

    const gate = evaluateHostLoadGate(sampleEntries(provenance));
    if (!sameJson(provenance.gate, gate)) {
        structuralIssues.push('Host load gate does not match the recorded samples and required threshold.');
    }
    const loadIssues = gate.exceeded.map(
        ({ perCpu, phase, window }) =>
            `Host load exceeded ${HOST_LOAD_THRESHOLD_PER_CPU} per logical CPU at ${phase}.${window}: ${perCpu}.`
    );
    return {
        issues: [...structuralIssues, ...loadIssues],
        passed: structuralIssues.length === 0 && gate.passed,
        valid: structuralIssues.length === 0,
    };
};
