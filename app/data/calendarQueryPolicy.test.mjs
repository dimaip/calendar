import assert from 'node:assert/strict';
import test from 'node:test';

import { getCalendarQueryPolicy } from './calendarQueryPolicy.ts';

const now = new Date(2026, 6, 28, 12);

test('keeps historical calendar responses fresh indefinitely', () => {
    assert.deepEqual(getCalendarQueryPolicy('2026-07-27', now), {
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });
});

test('refreshes current and future calendar responses after five minutes', () => {
    for (const date of ['2026-07-28', '2026-07-29']) {
        assert.deepEqual(getCalendarQueryPolicy(date, now), {
            staleTime: 5 * 60 * 1000,
            refetchOnMount: true,
            refetchOnReconnect: true,
            refetchOnWindowFocus: true,
        });
    }
});

test('treats malformed dates as mutable instead of accidentally caching them forever', () => {
    assert.equal(getCalendarQueryPolicy('', now).staleTime, 5 * 60 * 1000);
    assert.equal(getCalendarQueryPolicy('27-07-2026', now).staleTime, 5 * 60 * 1000);
    assert.equal(getCalendarQueryPolicy('2026-02-31', now).staleTime, 5 * 60 * 1000);
});
