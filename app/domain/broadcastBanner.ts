import { BROADCAST_DURATION } from '../../convex/lib/broadcastSchedule';
import type { BroadcastOccurrence } from '../../convex/lib/broadcastSchedule';
import { formatDateKey } from '../utils/formatDateKey';

export function getBroadcastBanner(occurrences: BroadcastOccurrence[], calendarDate: string, now: number) {
    const isToday = calendarDate === formatDateKey(new Date(now));
    const relevant = occurrences.filter(
        (occurrence) =>
            occurrence.startAt + BROADCAST_DURATION > now &&
            (isToday || formatDateKey(new Date(occurrence.startAt)) === calendarDate)
    );
    const live = relevant.filter((occurrence) => occurrence.startAt <= now).sort((a, b) => b.startAt - a.startAt)[0];
    const occurrence = live ?? relevant.sort((a, b) => a.startAt - b.startAt)[0];
    if (!occurrence)
        return isToday ? { placement: 'bottom' as const, state: 'generic' as const, occurrence: null } : null;
    const remaining = occurrence.startAt - now;
    return {
        placement:
            !isToday || remaining <= 24 * BROADCAST_DURATION
                ? ('top' as const)
                : remaining <= 48 * BROADCAST_DURATION
                  ? ('middle' as const)
                  : ('bottom' as const),
        state: live
            ? ('live' as const)
            : remaining <= 2 * BROADCAST_DURATION
              ? ('countdown' as const)
              : ('scheduled' as const),
        occurrence,
    };
}

export type BroadcastBanner = NonNullable<ReturnType<typeof getBroadcastBanner>>;

export function formatBroadcastCountdown(startAt: number, now: number): string {
    const seconds = Math.max(1, Math.ceil((startAt - now) / 1000));
    return `${String(Math.floor(seconds / 3600)).padStart(2, '0')}:${String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}
