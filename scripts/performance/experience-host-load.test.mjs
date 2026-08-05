import assert from 'node:assert/strict';
import test from 'node:test';

import {
    collectHostLoadSample,
    createHostLoadProvenance,
    HOST_LOAD_THRESHOLD_PER_CPU,
    validateHostLoadProvenance,
} from './lib/host-load.mjs';

const provenance = ({ checkpoints = [], platform, postRun = [3, 3, 100], preRun = [3, 3, 100] } = {}) => {
    const logicalCpuCount = 4;
    const sample = (loadAverage, recordedAt) => collectHostLoadSample({ loadAverage, logicalCpuCount, recordedAt });
    return createHostLoadProvenance({
        checkpoints: checkpoints.map(({ label, loadAverage, recordedAt }) => ({
            label,
            ...sample(loadAverage, recordedAt),
        })),
        logicalCpuCount,
        ...(platform ? { platform } : {}),
        postRun: sample(postRun, '2026-08-05T12:01:00.000Z'),
        preRun: sample(preRun, '2026-08-05T12:00:00.000Z'),
    });
};

test('host load gate allows the threshold, ignores fifteen-minute load, and rejects higher one/five-minute load', () => {
    assert.equal(HOST_LOAD_THRESHOLD_PER_CPU, 0.75);
    assert.deepEqual(validateHostLoadProvenance(provenance()), { issues: [], passed: true, valid: true });

    const oneMinute = validateHostLoadProvenance(provenance({ postRun: [3.01, 3, 0] }));
    assert.equal(oneMinute.valid, true);
    assert.equal(oneMinute.passed, false);
    assert(oneMinute.issues.some((issue) => issue.includes('postRun.oneMinute')));

    const fiveMinutes = validateHostLoadProvenance(provenance({ preRun: [3, 3.01, 0] }));
    assert.equal(fiveMinutes.valid, true);
    assert.equal(fiveMinutes.passed, false);
    assert(fiveMinutes.issues.some((issue) => issue.includes('preRun.fiveMinutes')));
});

test('host load provenance gates checkpoints and rejects unsupported or reversed samples', () => {
    const checkpoint = validateHostLoadProvenance(
        provenance({
            checkpoints: [
                {
                    label: 'older-phone.run-1.startup-process-cold-online',
                    loadAverage: [4, 1, 1],
                    recordedAt: '2026-08-05T12:00:30.000Z',
                },
            ],
        })
    );
    assert.equal(checkpoint.valid, true);
    assert.equal(checkpoint.passed, false);
    assert(checkpoint.issues.some((issue) => issue.includes('checkpoints[0].oneMinute')));

    const missingCheckpoint = validateHostLoadProvenance(provenance(), {
        expectedCheckpointLabels: ['older-phone.run-1.startup-process-cold-online'],
    });
    assert.equal(missingCheckpoint.valid, false);
    assert(missingCheckpoint.issues.some((issue) => issue.includes('checkpoint labels')));

    const windows = validateHostLoadProvenance(provenance({ platform: 'win32' }));
    assert.equal(windows.valid, false);
    assert.equal(windows.passed, false);
    assert(windows.issues.some((issue) => issue.includes('unsupported')));

    const reversed = provenance({
        checkpoints: [
            {
                label: 'reversed',
                loadAverage: [1, 1, 1],
                recordedAt: '2026-08-05T11:59:00.000Z',
            },
        ],
    });
    const reversedResult = validateHostLoadProvenance(reversed, {
        reportRecordedAt: '2026-08-05T12:00:15.000Z',
    });
    assert.equal(reversedResult.valid, false);
    assert(reversedResult.issues.some((issue) => issue.includes('precedes')));

    const staleResult = validateHostLoadProvenance(provenance(), {
        reportRecordedAt: '2026-08-05T11:00:00.000Z',
    });
    assert.equal(staleResult.valid, false);
    assert(staleResult.issues.some((issue) => issue.includes('do not enclose')));
});

test('host load provenance rejects malformed per-CPU values and a forged gate', () => {
    const malformed = provenance({ postRun: [1, 1, 1], preRun: [1, 1, 1] });
    malformed.preRun.perCpu.oneMinute = 0.9;
    malformed.gate.passed = false;
    const result = validateHostLoadProvenance(malformed);
    assert.equal(result.valid, false);
    assert.equal(result.passed, false);
    assert(result.issues.some((issue) => issue.includes('does not match loadAverage')));
    assert(result.issues.some((issue) => issue.includes('gate does not match')));
});
