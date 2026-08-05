import assert from 'node:assert/strict';
import test from 'node:test';

import { getTOCSnapshotSignature, normalizeTOCLabel, TOCRegistryController } from './tocRegistry.ts';

const createElement = (order) => ({
    id: '',
    order,
    compareDocumentPosition(other) {
        if (this.order < other.order) {
            return 4;
        }
        if (this.order > other.order) {
            return 2;
        }
        return 0;
    },
});

const createHarness = (occupiedIds = new Set()) => {
    let pendingCommit;
    let nextCommitId = 0;
    let latestItems = [];
    let publishCount = 0;
    const controller = new TOCRegistryController(
        (items) => {
            latestItems = items;
            publishCount += 1;
        },
        (callback) => {
            pendingCommit = callback;
            nextCommitId += 1;
            return nextCommitId;
        },
        () => {
            pendingCommit = undefined;
        },
        (id) => occupiedIds.has(id)
    );

    return {
        controller,
        flush() {
            const commit = pendingCommit;
            pendingCommit = undefined;
            commit?.();
        },
        get items() {
            return latestItems;
        },
        get publishCount() {
            return publishCount;
        },
    };
};

test('normalizes Latin and Cyrillic labels into stable anchor slugs', () => {
    assert.equal(normalizeTOCLabel('  Св.   возношение!  '), 'св-возношение');
    assert.equal(normalizeTOCLabel('Psalm 50'), 'psalm-50');
    assert.equal(normalizeTOCLabel('***'), 'section');
});

test('batches registrations and assigns duplicate labels deterministic IDs in DOM order', () => {
    const harness = createHarness();
    const laterElement = createElement(20);
    const earlierElement = createElement(10);

    harness.controller.register(laterElement, { label: 'Великая ектенья', level: 3 });
    harness.controller.register(earlierElement, { label: 'Великая ектенья', level: 2 });

    assert.equal(harness.publishCount, 0);
    harness.flush();

    assert.equal(harness.publishCount, 1);
    assert.deepEqual(
        harness.items.map(({ value, level }) => ({ value, level })),
        [
            { value: 'toc-великая-ектенья-1', level: 2 },
            { value: 'toc-великая-ектенья-2', level: 3 },
        ]
    );
    assert.equal(earlierElement.id, 'toc-великая-ектенья-1');
    assert.equal(laterElement.id, 'toc-великая-ектенья-2');
});

test('assigns collision-free deterministic IDs to one hundred repeated headings', () => {
    const harness = createHarness();
    const elements = Array.from({ length: 100 }, (_, index) => createElement(index));

    for (const element of elements.toReversed()) {
        harness.controller.register(element, { label: 'Повтор', level: 3 });
    }
    harness.flush();

    assert.equal(new Set(harness.items.map(({ value }) => value)).size, 100);
    assert.equal(harness.items[0].value, 'toc-повтор-1');
    assert.equal(harness.items[99].value, 'toc-повтор-100');
});

test('renumbers headings deterministically when an earlier heading mounts or unmounts', () => {
    const harness = createHarness();
    const secondElement = createElement(20);
    const unregisterSecond = harness.controller.register(secondElement, { label: 'Молитва', level: 3 });
    harness.flush();
    assert.equal(secondElement.id, 'toc-молитва-1');

    const firstElement = createElement(10);
    const unregisterFirst = harness.controller.register(firstElement, { label: 'Молитва', level: 2 });
    harness.flush();
    assert.deepEqual(
        harness.items.map(({ value }) => value),
        ['toc-молитва-1', 'toc-молитва-2']
    );

    unregisterFirst();
    harness.flush();
    assert.deepEqual(
        harness.items.map(({ value }) => value),
        ['toc-молитва-1']
    );
    assert.equal(secondElement.id, 'toc-молитва-1');

    unregisterSecond();
    harness.flush();
    assert.deepEqual(harness.items, []);
});

test('preserves explicit heading anchors and avoids IDs occupied by other content', () => {
    const harness = createHarness(new Set(['toc-вход-1']));
    const generatedElement = createElement(10);
    const explicitElement = createElement(20);

    harness.controller.register(generatedElement, { label: 'Вход', level: 2 });
    harness.controller.register(explicitElement, { explicitId: 'vhod', label: 'Вход', level: 3 });
    harness.flush();

    assert.equal(generatedElement.id, 'toc-вход-2');
    assert.equal(explicitElement.id, 'vhod');
    assert.deepEqual(
        harness.items.map(({ value }) => value),
        ['toc-вход-2', 'vhod']
    );
});

test('builds identical signatures for identical published snapshots', () => {
    const items = [{ value: 'toc-молитва-1', label: 'Молитва', shortLabel: 'Молитва', level: 2 }];
    assert.equal(getTOCSnapshotSignature(items), getTOCSnapshotSignature(items.map((item) => ({ ...item }))));
});
