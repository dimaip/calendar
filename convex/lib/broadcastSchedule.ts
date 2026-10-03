import type { Doc, Id } from '../_generated/dataModel';

export const BROADCAST_DURATION = 60 * 60 * 1000;
export const DAY = 24 * BROADCAST_DURATION;
export const BROADCAST_CHANNEL_URL = 'https://vkvideo.ru/@rus_molitva';

// An occurrence is a projection of a schedule, optionally replaced by an exception.
export type BroadcastOccurrence = Pick<Doc<'broadcasts'>, 'title' | 'streamUrl'> & {
    broadcastId: Id<'broadcasts'>;
    originalDate: string;
    startAt: number;
    recurring: boolean;
};

const moscowFormatter = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Europe/Moscow',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
});

export function formatMoscowDateTime(timestamp: number): string {
    const parts = Object.fromEntries(moscowFormatter.formatToParts(timestamp).map((part) => [part.type, part.value]));
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
}

export function parseMoscowDateTime(value: string): number {
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) return NaN;
    // Moscow has used UTC+03:00 without DST since 2014. Scheduling supports modern dates.
    const timestamp = Date.parse(`${value}:00+03:00`);
    if (!Number.isFinite(timestamp) || timestamp < Date.parse('2020-01-01T00:00:00+03:00')) return NaN;
    return formatMoscowDateTime(timestamp) === value ? timestamp : NaN;
}

export function getBroadcastOccurrence(
    broadcast: Doc<'broadcasts'>,
    originalDate: string,
    exception?: Doc<'broadcastExceptions'>
): BroadcastOccurrence | null {
    const moscowStart = formatMoscowDateTime(broadcast.startAt);
    const startAt = parseMoscowDateTime(`${originalDate}T${moscowStart.slice(11)}`);
    if (!Number.isFinite(startAt)) return null;
    if (broadcast.weekly) {
        if (startAt < broadcast.startAt || (startAt - broadcast.startAt) % (7 * DAY) !== 0) return null;
    } else if (originalDate !== moscowStart.slice(0, 10)) {
        return null;
    }
    // One-off events are edited directly; old weekly exceptions must not affect a converted schedule.
    const override = broadcast.weekly ? exception : undefined;
    if (override?.cancelled) return null;
    return {
        broadcastId: broadcast._id,
        originalDate,
        title: override?.title ?? broadcast.title,
        startAt: override?.startAt ?? startAt,
        streamUrl: override ? override.streamUrl : broadcast.streamUrl,
        recurring: broadcast.weekly,
    };
}

export function listBroadcastOccurrences(
    broadcast: Doc<'broadcasts'>,
    exceptions: Doc<'broadcastExceptions'>[],
    from: number,
    to: number
): BroadcastOccurrence[] {
    const byDate = new Map(exceptions.map((exception) => [exception.originalDate, exception]));
    const occurrences = new Map<string, BroadcastOccurrence>();
    if (!broadcast.weekly) {
        const date = formatMoscowDateTime(broadcast.startAt).slice(0, 10);
        const occurrence = getBroadcastOccurrence(broadcast, date, byDate.get(date));
        if (occurrence && occurrence.startAt >= from && occurrence.startAt < to) occurrences.set(date, occurrence);
    } else {
        const first = broadcast.startAt + Math.max(0, Math.ceil((from - broadcast.startAt) / (7 * DAY))) * 7 * DAY;
        for (let cursor = first; cursor < to; cursor += 7 * DAY) {
            const date = formatMoscowDateTime(cursor).slice(0, 10);
            const occurrence = getBroadcastOccurrence(broadcast, date, byDate.get(date));
            if (occurrence && occurrence.startAt >= from && occurrence.startAt < to) occurrences.set(date, occurrence);
        }
    }
    // Include rescheduled occurrences even when their original date is outside this window.
    for (const exception of exceptions) {
        if (exception.startAt < from || exception.startAt >= to) continue;
        const occurrence = getBroadcastOccurrence(broadcast, exception.originalDate, exception);
        if (occurrence && occurrence.startAt >= from && occurrence.startAt < to)
            occurrences.set(exception.originalDate, occurrence);
    }
    return Array.from(occurrences.values()).sort((a, b) => a.startAt - b.startAt);
}

export function getNextBroadcastOccurrence(
    broadcast: Doc<'broadcasts'>,
    exceptions: Doc<'broadcastExceptions'>[],
    from: number
): BroadcastOccurrence | null {
    const first = Math.max(from, broadcast.startAt);
    // Each cancelled/moved occurrence can skip at most one weekly slot.
    const candidates = listBroadcastOccurrences(
        broadcast,
        exceptions,
        from,
        first + (exceptions.length + 1) * 7 * DAY + DAY
    );
    for (const exception of exceptions) {
        if (exception.startAt < from) continue;
        const occurrence = getBroadcastOccurrence(broadcast, exception.originalDate, exception);
        if (occurrence && occurrence.startAt >= from) candidates.push(occurrence);
    }
    return candidates.sort((a, b) => a.startAt - b.startAt)[0] ?? null;
}
