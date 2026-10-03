import assert from 'node:assert/strict';
import test from 'node:test';
import { convexTest } from 'convex-test';
import schema from '../../convex/schema.ts';
import { api } from '../../convex/_generated/api.js';
import { BROADCAST_DURATION, parseMoscowDateTime } from '../../convex/lib/broadcastSchedule.ts';

const modules = {
    './_generated/server.js': async () => await import('../../convex/_generated/server.js'),
    './broadcasts.ts': async () => await import('../../convex/broadcasts.ts'),
    './updates.ts': async () => await import('../../convex/updates.ts'),
};
const details = {
    title: 'Литургия',
    startAt: parseMoscowDateTime('2026-10-04T10:00'),
    weekly: false,
};
const window = {
    dayStart: Date.UTC(2026, 9, 4),
    dayEnd: Date.UTC(2026, 9, 5),
    todayStart: Date.UTC(2026, 8, 30),
    todayEnd: Date.UTC(2026, 9, 1),
};

function createBackend(t) {
    const previous = process.env.UPDATES_ADMIN_USER_IDS;
    process.env.UPDATES_ADMIN_USER_IDS = 'broadcast-admin';
    t.after(() => {
        if (previous === undefined) delete process.env.UPDATES_ADMIN_USER_IDS;
        else process.env.UPDATES_ADMIN_USER_IDS = previous;
    });
    const backend = convexTest(schema, modules);
    return { backend, admin: backend.withIdentity({ subject: 'broadcast-admin' }) };
}

test('every broadcast admin endpoint rejects anonymous and ordinary users', async (t) => {
    const { backend, admin } = createBackend(t);
    const id = await admin.mutation(api.broadcasts.save, { details: { ...details, weekly: true } });
    for (const client of [backend, backend.withIdentity({ subject: 'ordinary-user' })]) {
        await assert.rejects(client.query(api.broadcasts.adminList), /Not authenticated|Not authorized/);
        await assert.rejects(
            client.query(api.broadcasts.adminGet, { broadcastId: id }),
            /Not authenticated|Not authorized/
        );
        await assert.rejects(
            client.mutation(api.broadcasts.save, { broadcastId: id, details }),
            /Not authenticated|Not authorized/
        );
        await assert.rejects(
            client.mutation(api.broadcasts.saveOccurrence, {
                broadcastId: id,
                originalDate: '2026-10-04',
                title: details.title,
                startAt: details.startAt,
                cancelled: true,
            }),
            /Not authenticated|Not authorized/
        );
        await assert.rejects(
            client.mutation(api.broadcasts.resetOccurrence, { broadcastId: id, originalDate: '2026-10-04' }),
            /Not authenticated|Not authorized/
        );
        await assert.rejects(
            client.mutation(api.broadcasts.remove, { broadcastId: id }),
            /Not authenticated|Not authorized/
        );
    }
    assert.equal((await admin.query(api.updates.adminStatus)).isAdmin, true);
    assert.equal(
        (await backend.query(api.broadcasts.bannerCandidates, window)).length,
        1,
        'public schedules need no login'
    );
});

test('saved broadcasts appear immediately; edits, cleared links, and deletion update public candidates', async (t) => {
    const { backend, admin } = createBackend(t);
    const id = await admin.mutation(api.broadcasts.save, {
        details: { ...details, streamUrl: 'https://example.com/live', weekly: true },
    });
    assert.equal(
        (await backend.query(api.broadcasts.bannerCandidates, window))[0].streamUrl,
        'https://example.com/live'
    );
    await admin.mutation(api.broadcasts.save, { broadcastId: id, details: { ...details, weekly: true } });
    let saved = await admin.query(api.broadcasts.adminGet, { broadcastId: id });
    assert.equal(saved.broadcast.streamUrl, undefined);
    assert.equal((await backend.query(api.broadcasts.bannerCandidates, window))[0].startAt, details.startAt);
    await admin.mutation(api.broadcasts.save, { broadcastId: id, details: { ...details, title: 'Вечерня' } });
    saved = await admin.query(api.broadcasts.adminGet, { broadcastId: id });
    assert.equal(saved.broadcast.weekly, false);
    assert.equal((await backend.query(api.broadcasts.bannerCandidates, window))[0].title, 'Вечерня');
    await admin.mutation(api.broadcasts.remove, { broadcastId: id });
    assert.deepEqual(await backend.query(api.broadcasts.bannerCandidates, window), []);
    assert.equal(await admin.query(api.broadcasts.adminGet, { broadcastId: id }), null);
});

test('deleting a weekly schedule removes its overrides and preserves other broadcasts', async (t) => {
    const { backend, admin } = createBackend(t);
    const id = await admin.mutation(api.broadcasts.save, { details: { ...details, weekly: true } });
    const retainedId = await admin.mutation(api.broadcasts.save, { details: { ...details, title: 'Вечерня' } });
    await admin.mutation(api.broadcasts.saveOccurrence, {
        broadcastId: id,
        originalDate: '2026-10-04',
        title: 'Утреня',
        startAt: parseMoscowDateTime('2026-10-01T18:00'),
        cancelled: false,
    });
    await admin.mutation(api.broadcasts.saveOccurrence, {
        broadcastId: id,
        originalDate: '2026-10-11',
        title: details.title,
        startAt: details.startAt + 7 * 24 * BROADCAST_DURATION,
        cancelled: true,
    });
    await admin.mutation(api.broadcasts.remove, { broadcastId: id });
    assert.deepEqual(await backend.run(async (ctx) => await ctx.db.query('broadcastExceptions').collect()), []);
    assert.deepEqual(
        (await admin.query(api.broadcasts.adminList)).map((item) => item._id),
        [retainedId]
    );
    assert.deepEqual(
        (await backend.query(api.broadcasts.bannerCandidates, window)).map((item) => item.broadcastId),
        [retainedId]
    );
});

test('occurrence edits, cancellation, restoration, and uniqueness work through the database', async (t) => {
    const { backend, admin } = createBackend(t);
    const id = await admin.mutation(api.broadcasts.save, { details: { ...details, weekly: true } });
    const change = {
        broadcastId: id,
        originalDate: '2026-10-04',
        title: 'Утреня',
        startAt: parseMoscowDateTime('2026-10-01T18:00'),
        cancelled: false,
    };
    await admin.mutation(api.broadcasts.saveOccurrence, change);
    let candidates = await backend.query(api.broadcasts.bannerCandidates, {
        ...window,
        dayStart: Date.UTC(2026, 9, 1),
        dayEnd: Date.UTC(2026, 9, 2),
    });
    assert.equal(candidates.find((item) => item.originalDate === change.originalDate).startAt, change.startAt);
    await admin.mutation(api.broadcasts.saveOccurrence, { ...change, cancelled: true });
    assert.equal((await admin.query(api.broadcasts.adminGet, { broadcastId: id })).exceptions.length, 1);
    candidates = await backend.query(api.broadcasts.bannerCandidates, window);
    assert.equal(
        candidates.some((item) => item.originalDate === change.originalDate),
        false
    );
    assert.equal(candidates[0].originalDate, '2026-10-11');
    await admin.mutation(api.broadcasts.resetOccurrence, { broadcastId: id, originalDate: change.originalDate });
    assert.equal((await admin.query(api.broadcasts.adminGet, { broadcastId: id })).exceptions.length, 0);
    assert.equal((await backend.query(api.broadcasts.bannerCandidates, window))[0].startAt, details.startAt);
    await assert.rejects(
        admin.mutation(api.broadcasts.saveOccurrence, { ...change, originalDate: '2026-10-05' }),
        /не найдено/
    );
});

test('public candidates include all of today, a next event beyond today, and a live event spanning midnight', async (t) => {
    const { backend, admin } = createBackend(t);
    const overnight = Date.UTC(2026, 8, 29, 23, 45);
    for (const startAt of [overnight, Date.UTC(2026, 8, 30, 8), Date.UTC(2026, 8, 30, 18), Date.UTC(2026, 9, 20, 8)]) {
        await admin.mutation(api.broadcasts.save, { details: { ...details, startAt } });
    }
    const candidates = await backend.query(api.broadcasts.bannerCandidates, {
        ...window,
        dayStart: window.todayStart,
        dayEnd: window.todayEnd,
    });
    assert.equal(candidates.length, 4);
    assert.equal(candidates[0].startAt, overnight);
    assert.equal(candidates[0].startAt + BROADCAST_DURATION > window.todayStart, true);
});

test('invalid schedule values and URLs are rejected without inserting records', async (t) => {
    const { backend, admin } = createBackend(t);
    for (const invalid of [
        { title: ' ' },
        { startAt: NaN },
        { startAt: 1e20 },
        { startAt: details.startAt + 1 },
        { streamUrl: 'javascript:alert(1)' },
        { streamUrl: 'not-a-link' },
        { weekly: 'weekly' },
    ]) {
        await assert.rejects(admin.mutation(api.broadcasts.save, { details: { ...details, ...invalid } }));
    }
    assert.deepEqual(await admin.query(api.broadcasts.adminList), []);
    await assert.rejects(
        backend.query(api.broadcasts.bannerCandidates, {
            ...window,
            dayEnd: window.dayStart + 40 * BROADCAST_DURATION,
        }),
        /Invalid calendar day/
    );
});
