import assert from 'node:assert/strict';
import test from 'node:test';

global.window = {
    location: {
        reload: () => {},
    },
    matchMedia: () => ({
        addEventListener: () => {},
        matches: false,
    }),
};

const { getFeastInfo } = await import('./getDayInfo.ts');

test('Ascension icon takes priority over John icon on overlapping dates', () => {
    assert.equal(getFeastInfo(new Date(2026, 4, 21)).icon, 'ascension.svg');
});

test('John icon still applies when it does not overlap Ascension', () => {
    assert.equal(getFeastInfo(new Date(2025, 4, 21)).icon, 'john.svg');
});
