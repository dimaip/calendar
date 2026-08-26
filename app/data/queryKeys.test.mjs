import assert from 'node:assert/strict';
import test from 'node:test';

import { queryKeys } from './queryKeys.ts';

test('preserves the public API query-key shapes across the React Query v5 migration', () => {
    assert.deepEqual(queryKeys.app(), ['app']);
    assert.deepEqual(queryKeys.day('2026-07-28'), ['day', { date: '2026-07-28' }]);
    assert.deepEqual(queryKeys.externalDay('2026-07-28'), ['ext-day', { date: '2026-07-28' }]);
    assert.deepEqual(queryKeys.filteredSermons('author', 'theme', 50, 100), [
        'filtered-sermons',
        { authorId: 'author', themeId: 'theme', limit: 50, offset: 100 },
    ]);
    assert.deepEqual(queryKeys.hymns(), ['hymns', {}]);
    assert.deepEqual(queryKeys.parts('2026-07-28', 'ru'), ['day', { date: '2026-07-28', lang: 'ru' }]);
    assert.deepEqual(queryKeys.reading('Ин 1:1', 'cassian'), [
        'reading',
        { link: 'Ин 1:1', translation: 'cassian' },
    ]);
    assert.deepEqual(queryKeys.readings('2026-07-28'), ['readings', { date: '2026-07-28' }]);
    assert.deepEqual(queryKeys.saint('serafim-sarovskiy'), ['saint', { saintId: 'serafim-sarovskiy' }]);
    assert.deepEqual(queryKeys.sermon('42'), ['sermon', { sermonId: '42' }]);
    assert.deepEqual(queryKeys.sermonFacets(), ['sermon-facets']);
    assert.deepEqual(queryKeys.sharedService('user', 'service', 'version'), [
        'sharedService',
        { userId: 'user', serviceId: 'service', versionId: 'version' },
    ]);
});

test('keeps omitted optional query-key fields explicit for stable cache identity', () => {
    assert.deepEqual(queryKeys.filteredSermons(), [
        'filtered-sermons',
        { authorId: undefined, themeId: undefined, limit: undefined, offset: undefined },
    ]);
    assert.deepEqual(queryKeys.sharedService(), [
        'sharedService',
        { userId: undefined, serviceId: undefined, versionId: undefined },
    ]);
});
