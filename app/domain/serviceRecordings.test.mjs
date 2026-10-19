import assert from 'node:assert/strict';
import test from 'node:test';

import { formatAudioTime, readAudioPosition, saveAudioPosition, serviceRecordings } from './serviceRecordings.ts';

test('resume positions are isolated by recording and reset when completed or invalid', () => {
    const values = new Map();
    const previousWindow = globalThis.window;
    globalThis.window = {
        localStorage: {
            getItem: (key) => values.get(key) ?? null,
            setItem: (key, value) => values.set(key, value),
        },
    };
    try {
        const canon = serviceRecordings.pokajanni;
        const preparation = serviceRecordings.chinPrigotovlenija;
        saveAudioPosition(canon, 75.5);
        assert.equal(readAudioPosition(canon), 75.5);
        assert.equal(readAudioPosition(preparation), 0);
        for (const invalid of [-1, NaN, Infinity, canon.duration, canon.duration - 0.5]) {
            saveAudioPosition(canon, invalid);
            assert.equal(readAudioPosition(canon), 0);
        }
        for (const corrupt of ['not a number', '-2', 'Infinity', '999999']) {
            values.set(`service-audio:v1:${canon.src}`, corrupt);
            assert.equal(readAudioPosition(canon), 0);
        }
    } finally {
        globalThis.window = previousWindow;
    }
});

test('blocked storage does not prevent playback state from loading or saving', () => {
    const previousWindow = globalThis.window;
    globalThis.window = {
        get localStorage() {
            throw new Error('Storage blocked');
        },
    };
    try {
        assert.equal(readAudioPosition(serviceRecordings.pokajanni), 0);
        assert.doesNotThrow(() => saveAudioPosition(serviceRecordings.pokajanni, 42));
    } finally {
        globalThis.window = previousWindow;
    }
});

test('audio times handle invalid durations and recordings longer than one hour', () => {
    assert.equal(formatAudioTime(NaN), '0:00');
    assert.equal(formatAudioTime(-1), '0:00');
    assert.equal(formatAudioTime(778.475083), '12:58');
    assert.equal(formatAudioTime(1797.355083), '29:57');
    assert.equal(formatAudioTime(3605), '60:05');
});
