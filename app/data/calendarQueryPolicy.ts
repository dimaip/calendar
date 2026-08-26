const MUTABLE_DATE_STALE_TIME_MS = 5 * 60 * 1000;
const ISO_CALENDAR_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export interface CalendarQueryPolicy {
    staleTime: number;
    refetchOnMount: boolean;
    refetchOnReconnect: boolean;
    refetchOnWindowFocus: boolean;
}

/**
 * Past calendar data is immutable for normal navigation. Today's and future
 * data can still change as the calendar API is updated, so it is refreshed
 * after a short freshness window when the app remounts, reconnects, or
 * returns to the foreground. Manual pull-to-refresh remains available for
 * every date regardless of this policy.
 */
export const getCalendarQueryPolicy = (date: string, now: Date = new Date()): CalendarQueryPolicy => {
    const currentDate = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, '0'),
        String(now.getDate()).padStart(2, '0'),
    ].join('-');
    const dateParts = ISO_CALENDAR_DATE_PATTERN.exec(date);
    const parsedDate = dateParts
        ? new Date(Date.UTC(Number(date.slice(0, 4)), Number(date.slice(5, 7)) - 1, Number(date.slice(8, 10))))
        : null;
    const isValidCalendarDate =
        parsedDate !== null &&
        parsedDate.getUTCFullYear() === Number(date.slice(0, 4)) &&
        parsedDate.getUTCMonth() === Number(date.slice(5, 7)) - 1 &&
        parsedDate.getUTCDate() === Number(date.slice(8, 10));
    const isHistoricalDate = isValidCalendarDate && date < currentDate;

    if (isHistoricalDate) {
        return {
            staleTime: Infinity,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        };
    }

    return {
        staleTime: MUTABLE_DATE_STALE_TIME_MS,
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
    };
};
