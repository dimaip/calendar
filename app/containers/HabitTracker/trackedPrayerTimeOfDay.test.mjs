import assert from 'node:assert/strict';
import test from 'node:test';

import { getPrayerTrackingPolicy } from './trackedPrayerTimeOfDay.ts';

test('subscribes to habit settings only for logged-in users viewing tracked services', () => {
    assert.deepEqual(getPrayerTrackingPolicy('matins', true), {
        trackedPrayerTimeOfDay: 'morning',
        subscribeToSettings: true,
    });
    assert.deepEqual(getPrayerTrackingPolicy('vespers', true), {
        trackedPrayerTimeOfDay: 'evening',
        subscribeToSettings: true,
    });
    assert.deepEqual(getPrayerTrackingPolicy('zlatoust', true), {
        trackedPrayerTimeOfDay: undefined,
        subscribeToSettings: false,
    });
    assert.deepEqual(getPrayerTrackingPolicy('matins', false), {
        trackedPrayerTimeOfDay: 'morning',
        subscribeToSettings: false,
    });
});
