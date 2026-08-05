import assert from 'node:assert/strict';
import test from 'node:test';

import { getReadingQueryPlan } from './readingQueryPolicy.ts';

test('does not fan out individual default-reading requests while the bulk response is pending', () => {
    assert.deepEqual(getReadingQueryPlan('default', 'pending', false), {
        fetchBulkReadings: true,
        fetchIndividualReading: false,
        useBulkReading: false,
    });
});

test('uses a default reading supplied by the bulk response without an individual request', () => {
    assert.deepEqual(getReadingQueryPlan('default', 'success', true), {
        fetchBulkReadings: true,
        fetchIndividualReading: false,
        useBulkReading: true,
    });
});

test('falls back to an individual request when bulk default readings are unavailable', () => {
    for (const status of ['success', 'error']) {
        assert.deepEqual(getReadingQueryPlan('default', status, false), {
            fetchBulkReadings: true,
            fetchIndividualReading: true,
            useBulkReading: false,
        });
    }
});

test('loads an explicitly selected translation directly without observing bulk readings', () => {
    assert.deepEqual(getReadingQueryPlan('91Slavic', 'pending', false), {
        fetchBulkReadings: false,
        fetchIndividualReading: true,
        useBulkReading: false,
    });
});
