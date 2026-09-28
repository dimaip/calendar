import assert from 'node:assert/strict';
import test from 'node:test';
import { formatDateKey } from './formatDateKey.ts';
import { truncateText } from './truncateText.ts';

global.window = { matchMedia: () => ({ matches: false, addEventListener() {} }) };
const { default: getTheme } = await import('../styles/getTheme.ts');

test('date keys preserve the local calendar day and pad month/day', () => {
    assert.equal(formatDateKey(new Date(2024, 1, 29, 23, 59)), '2024-02-29');
    assert.equal(formatDateKey(new Date(2026, 0, 1)), '2026-01-01');
    assert.equal(formatDateKey(new Date(2026, 11, 31)), '2026-12-31');
});

test('truncation preserves short text and appends an ellipsis only beyond the boundary', () => {
    assert.equal(truncateText('', 5), '');
    assert.equal(truncateText('Молитва', 7), 'Молитва');
    assert.equal(truncateText('Молитва', 4), 'Моли…');
    assert.equal(truncateText('abc', 0), '…');
});

test('theme inputs preserve light, dark, legacy boolean, system, and custom primary behavior', () => {
    assert.equal(getTheme(undefined, 'light').colours.primary, '#AE841A');
    assert.equal(getTheme(null, 'dark').colours.primary, '#E1B74D');
    assert.deepEqual(getTheme('', true), getTheme(undefined, 'dark'));
    assert.deepEqual(getTheme(null, 'system'), getTheme(null, 'light'));
    assert.equal(getTheme('#123456', 'dark').colours.primary, '#123456');
    assert.deepEqual(Object.keys(getTheme(null, 'light').colours).sort(), [
        'bgGray',
        'bgGrayLight',
        'black',
        'blue',
        'darkGray',
        'gray',
        'lightGray',
        'lineGray',
        'primary',
        'primaryTint',
        'red',
        'white',
    ]);
});

test('theme calls still return independent objects; memoization is not part of this modernization', () => {
    const first = getTheme(null, 'dark');
    first.colours.primary = '#000000';
    assert.equal(getTheme(null, 'dark').colours.primary, '#E1B74D');
});
