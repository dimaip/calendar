import assert from 'node:assert/strict';
import test from 'node:test';
import {
    BROADCAST_DURATION,
    DAY,
    formatMoscowDateTime,
    getBroadcastOccurrence,
    getNextBroadcastOccurrence,
    listBroadcastOccurrences,
    parseMoscowDateTime,
} from '../../convex/lib/broadcastSchedule.ts';
import { formatBroadcastCountdown, getBroadcastBanner } from './broadcastBanner.ts';
import { formatDateKey } from '../utils/formatDateKey.ts';
import { requireAdmin } from '../../convex/lib/admin.ts';

const schedule = (values = {}) => ({
    _id: 'broadcast-1',
    _creationTime: 0,
    title: 'Литургия',
    weekly: false,
    startAt: parseMoscowDateTime('2026-10-04T10:00'),
    createdAt: 0,
    updatedAt: 0,
    ...values,
});
const exception = (values = {}) => ({
    _id: 'exception-1',
    _creationTime: 0,
    broadcastId: 'broadcast-1',
    originalDate: '2026-10-04',
    title: 'Литургия',
    startAt: parseMoscowDateTime('2026-10-04T10:00'),
    cancelled: false,
    updatedAt: 0,
    ...values,
});

test('Moscow input represents the same instant regardless of the admin timezone', (t) => {
    const original = process.env.TZ;
    t.after(() => {
        process.env.TZ = original;
    });
    for (const timezone of ['UTC', 'America/New_York', 'Asia/Tokyo']) {
        process.env.TZ = timezone;
        const timestamp = parseMoscowDateTime('2026-10-04T10:00');
        assert.equal(new Date(timestamp).toISOString(), '2026-10-04T07:00:00.000Z');
        assert.equal(formatMoscowDateTime(timestamp), '2026-10-04T10:00');
    }
    for (const value of ['2026-02-30T10:00', '2026-10-04T24:00', 'invalid', '2010-10-04T10:00']) {
        assert.ok(Number.isNaN(parseMoscowDateTime(value)));
    }
});

test('weekly schedules follow Moscow weekdays and time through visitor DST changes', () => {
    const broadcast = schedule({ startAt: parseMoscowDateTime('2026-10-25T10:00'), weekly: true });
    const occurrences = listBroadcastOccurrences(broadcast, [], broadcast.startAt, broadcast.startAt + 15 * DAY);
    assert.deepEqual(
        occurrences.map((item) => new Date(item.startAt).toISOString()),
        ['2026-10-25T07:00:00.000Z', '2026-11-01T07:00:00.000Z', '2026-11-08T07:00:00.000Z']
    );
});

test('weekly recurrence follows its start weekday without an end date', () => {
    const broadcast = schedule({
        startAt: parseMoscowDateTime('2026-09-30T10:00'),
        weekly: true,
    });
    const occurrences = listBroadcastOccurrences(
        broadcast,
        [],
        broadcast.startAt - 14 * DAY,
        broadcast.startAt + 30 * DAY
    );
    assert.deepEqual(
        occurrences.map((item) => item.originalDate),
        ['2026-09-30', '2026-10-07', '2026-10-14', '2026-10-21', '2026-10-28']
    );
    assert.equal(
        getNextBroadcastOccurrence(broadcast, [], parseMoscowDateTime('2029-10-01T00:00'))?.originalDate,
        '2029-10-03'
    );
    assert.equal(getBroadcastOccurrence(broadcast, '2026-10-04'), null);
    assert.equal(getNextBroadcastOccurrence(broadcast, [], broadcast.startAt + 1)?.originalDate, '2026-10-07');
});

test('one-off broadcasts do not recur and remain discoverable far in the future', () => {
    const broadcast = schedule({ startAt: parseMoscowDateTime('2029-12-25T10:00') });
    assert.equal(
        getNextBroadcastOccurrence(broadcast, [], parseMoscowDateTime('2026-09-30T10:00'))?.startAt,
        broadcast.startAt
    );
    assert.equal(getNextBroadcastOccurrence(broadcast, [], broadcast.startAt + 1), null);
});

test('cancelling consecutive weekly occurrences advances to the next valid week', () => {
    const broadcast = schedule({ weekly: true });
    const exceptions = ['2026-10-04', '2026-10-11', '2026-10-18'].map((date) =>
        exception({
            originalDate: date,
            startAt: parseMoscowDateTime(`${date}T10:00`),
            cancelled: true,
        })
    );
    assert.equal(getNextBroadcastOccurrence(broadcast, exceptions, broadcast.startAt)?.originalDate, '2026-10-25');
});

test('a rescheduled occurrence appears only on its new date, even outside the original query window', () => {
    const broadcast = schedule({ weekly: true, streamUrl: 'https://example.com/series' });
    const change = exception({ title: 'Вечерня', startAt: parseMoscowDateTime('2026-10-01T18:00') });
    const moved = listBroadcastOccurrences(
        broadcast,
        [change],
        parseMoscowDateTime('2026-10-01T00:00'),
        parseMoscowDateTime('2026-10-02T00:00')
    );
    assert.equal(moved.length, 1);
    assert.equal(moved[0].title, 'Вечерня');
    assert.equal(moved[0].streamUrl, undefined, 'an empty occurrence URL explicitly uses the channel');
    assert.equal(moved[0].originalDate, '2026-10-04');
    assert.deepEqual(
        listBroadcastOccurrences(
            broadcast,
            [change],
            parseMoscowDateTime('2026-10-04T00:00'),
            parseMoscowDateTime('2026-10-05T00:00')
        ),
        []
    );
    assert.equal(
        getNextBroadcastOccurrence(broadcast, [change], parseMoscowDateTime('2026-09-30T10:00'))?.startAt,
        change.startAt
    );
});

test('an individually moved occurrence remains discoverable months after its original date', () => {
    const broadcast = schedule({ weekly: true });
    const change = exception({ startAt: parseMoscowDateTime('2027-01-01T10:00') });
    assert.equal(
        getNextBroadcastOccurrence(broadcast, [change], parseMoscowDateTime('2026-12-28T00:00'))?.startAt,
        change.startAt
    );
});

test('individual exceptions keep their Moscow date identity when the series time changes', () => {
    const broadcast = schedule({ startAt: parseMoscowDateTime('2026-10-04T12:00'), weekly: true });
    assert.equal(
        getBroadcastOccurrence(broadcast, '2026-10-04', exception())?.startAt,
        parseMoscowDateTime('2026-10-04T10:00')
    );
    assert.equal(getBroadcastOccurrence(broadcast, '2026-10-11')?.startAt, parseMoscowDateTime('2026-10-11T12:00'));
    assert.equal(getBroadcastOccurrence(broadcast, '2026-10-05'), null);
});

test('converting a weekly schedule into a one-off event ignores old occurrence exceptions', () => {
    const broadcast = schedule();
    const cancelled = exception({ cancelled: true });
    assert.equal(getBroadcastOccurrence(broadcast, '2026-10-04', cancelled)?.startAt, broadcast.startAt);
    assert.equal(getNextBroadcastOccurrence(broadcast, [cancelled], broadcast.startAt)?.startAt, broadcast.startAt);
    const moved = exception({ startAt: broadcast.startAt + 7 * DAY });
    assert.equal(getNextBroadcastOccurrence(broadcast, [moved], broadcast.startAt + 1), null);
    assert.deepEqual(listBroadcastOccurrences(broadcast, [moved], moved.startAt, moved.startAt + DAY), []);
});

test('today promotes at 48 and 24 hours and below 4 hours independently of the 2-hour countdown', (t) => {
    const original = process.env.TZ;
    process.env.TZ = 'UTC';
    t.after(() => {
        process.env.TZ = original;
    });
    const broadcast = schedule();
    const event = getBroadcastOccurrence(broadcast, '2026-10-04');
    for (const [remaining, placement, state] of [
        [49 * BROADCAST_DURATION, 'bottom', 'scheduled'],
        [48 * BROADCAST_DURATION + 1, 'bottom', 'scheduled'],
        [48 * BROADCAST_DURATION, 'middle', 'scheduled'],
        [48 * BROADCAST_DURATION - 1, 'middle', 'scheduled'],
        [24 * BROADCAST_DURATION + 1, 'middle', 'scheduled'],
        [24 * BROADCAST_DURATION, 'after-readings', 'scheduled'],
        [24 * BROADCAST_DURATION - 1, 'after-readings', 'scheduled'],
        [4 * BROADCAST_DURATION + 1, 'after-readings', 'scheduled'],
        [4 * BROADCAST_DURATION, 'after-readings', 'scheduled'],
        [4 * BROADCAST_DURATION - 1, 'top', 'scheduled'],
        [3 * BROADCAST_DURATION, 'top', 'scheduled'],
        [2 * BROADCAST_DURATION + 1, 'top', 'scheduled'],
        [2 * BROADCAST_DURATION, 'top', 'countdown'],
        [BROADCAST_DURATION, 'top', 'countdown'],
    ]) {
        const now = event.startAt - remaining;
        const banner = getBroadcastBanner([event], formatDateKey(new Date(now)), now);
        assert.equal(banner.placement, placement, `${remaining}ms before the event`);
        assert.equal(banner.state, state, `${remaining}ms before the event`);
    }
});

test('a future event date features its own broadcast near the top, while unrelated dates have no banner', (t) => {
    const original = process.env.TZ;
    process.env.TZ = 'UTC';
    t.after(() => {
        process.env.TZ = original;
    });
    const event = getBroadcastOccurrence(schedule(), '2026-10-04');
    const nearer = {
        ...event,
        broadcastId: 'broadcast-2',
        originalDate: '2026-10-01',
        startAt: parseMoscowDateTime('2026-10-01T10:00'),
    };
    const now = parseMoscowDateTime('2026-09-30T10:00');
    assert.equal(getBroadcastBanner([event, nearer], '2026-09-30', now).occurrence.broadcastId, 'broadcast-2');
    const banner = getBroadcastBanner([event, nearer], '2026-10-04', now);
    assert.equal(banner.placement, 'top');
    assert.equal(banner.state, 'scheduled');
    assert.equal(banner.occurrence.broadcastId, event.broadcastId);
    assert.equal(getBroadcastBanner([event, nearer], '2026-10-03', now), null);
});

test('live takes priority for precisely one hour and then advances to the next event', (t) => {
    const original = process.env.TZ;
    process.env.TZ = 'UTC';
    t.after(() => {
        process.env.TZ = original;
    });
    const event = getBroadcastOccurrence(schedule(), '2026-10-04');
    const next = { ...event, broadcastId: 'broadcast-2', startAt: event.startAt + 2 * BROADCAST_DURATION };
    assert.equal(getBroadcastBanner([event, next], '2026-10-04', event.startAt).state, 'live');
    assert.equal(
        getBroadcastBanner([next, event], '2026-10-04', event.startAt + BROADCAST_DURATION - 1).occurrence.broadcastId,
        event.broadcastId
    );
    assert.equal(
        getBroadcastBanner([event, next], '2026-10-04', event.startAt + BROADCAST_DURATION).occurrence.broadcastId,
        next.broadcastId
    );
    assert.equal(getBroadcastBanner([event], '2026-10-04', event.startAt + BROADCAST_DURATION).state, 'generic');
    assert.equal(getBroadcastBanner([event], '2026-10-04', event.startAt + 2 * DAY), null);
});

test('local date matching and a live broadcast work across Moscow midnight and viewer timezones', (t) => {
    const original = process.env.TZ;
    t.after(() => {
        process.env.TZ = original;
    });
    const event = getBroadcastOccurrence(schedule({ startAt: parseMoscowDateTime('2026-10-04T00:30') }), '2026-10-04');
    for (const [timezone, date] of [
        ['UTC', '2026-10-03'],
        ['Asia/Tokyo', '2026-10-04'],
        ['America/New_York', '2026-10-03'],
    ]) {
        process.env.TZ = timezone;
        assert.equal(formatDateKey(new Date(event.startAt)), date);
        assert.equal(getBroadcastBanner([event], date, event.startAt).state, 'live');
    }
    process.env.TZ = 'Europe/Moscow';
    const overnight = { ...event, startAt: parseMoscowDateTime('2026-10-03T23:45') };
    assert.equal(getBroadcastBanner([overnight], '2026-10-04', parseMoscowDateTime('2026-10-04T00:15')).state, 'live');
});

test('countdown includes seconds and never displays zero while awaiting the start', () => {
    assert.equal(formatBroadcastCountdown(2 * BROADCAST_DURATION, 0), '02:00:00');
    assert.equal(formatBroadcastCountdown(61000, 0), '00:01:01');
    assert.equal(formatBroadcastCountdown(1, 0), '00:00:01');
});

test('shared administration requires authentication and the existing admin allowlist', async (t) => {
    const original = process.env.UPDATES_ADMIN_USER_IDS;
    process.env.UPDATES_ADMIN_USER_IDS = ' admin-user , second-admin ';
    t.after(() => {
        if (original === undefined) delete process.env.UPDATES_ADMIN_USER_IDS;
        else process.env.UPDATES_ADMIN_USER_IDS = original;
    });
    await assert.rejects(requireAdmin({ auth: { getUserIdentity: async () => null } }), /Not authenticated/);
    await assert.rejects(
        requireAdmin({ auth: { getUserIdentity: async () => ({ subject: 'normal-user' }) } }),
        /Not authorized/
    );
    assert.equal(
        (await requireAdmin({ auth: { getUserIdentity: async () => ({ subject: 'admin-user' }) } })).subject,
        'admin-user'
    );
});
