import 'regenerator-runtime/runtime.js';
import cachedFetch from 'utils/cachedFetch';
import { formatDateKey } from 'utils/formatDateKey';
import type { Sermon } from 'hooks/useFilteredSermons';

const PRECACHE_DAYS = 10;
const PRECACHE_INTERVAL = 3600 * 24 * 1000;
let timer: ReturnType<typeof setTimeout>;

// Dependency projections of the day endpoints; the remaining response fields
// are cached unchanged, without introducing another calendar domain model.
interface OfflineDayDependencies {
    readings?: Record<string, Record<string, string[]>> | null;
    saints?: string | null;
}
interface OfflineExternalDayDependencies {
    sermons?: Sermon[];
}

const precache = async (fromRefresh = false): Promise<void> => {
    clearTimeout(timer);
    const source = fromRefresh ? 'PREFETCH_RELOAD' : 'PREFETCH_NORMAL';
    const today = new Date();
    today.setHours(12, 0, 0, 0);
    // Vespers on the last offline day uses the following day's variable texts.
    const days = Array.from({ length: PRECACHE_DAYS + 2 }, (_, offset) => {
        const day = new Date(today);
        day.setDate(day.getDate() + offset);
        return formatDateKey(day);
    });
    const dependencies: Array<readonly [string, OfflineDayDependencies]> = [];

    try {
        await Promise.all([
            cachedFetch(`${process.env.API_HOST}/hymns`, source),
            ...Array.from({ length: 3 }, async () => {
                for (let date = days.shift(); date; date = days.shift()) {
                    const [day] = await Promise.all([
                        cachedFetch<OfflineDayDependencies>(`${process.env.API_HOST}/day/${date}`, source),
                        cachedFetch(`${process.env.API_HOST}/parts/${date}/ru`, source),
                        cachedFetch(`${process.env.API_HOST}/parts/${date}/csj`, source),
                        cachedFetch(`${process.env.API_HOST}/readings/${date}`, source),
                    ]);
                    if (day) dependencies.push([date, day]);
                }
            }),
        ]);
        // Prepare the complete calendar range before slower external details.
        await Promise.all(
            Array.from({ length: 3 }, async () => {
                for (let next = dependencies.shift(); next; next = dependencies.shift()) {
                    const [date, day] = next;
                    const verses = day.readings?.Литургия;
                    const external = await cachedFetch<OfflineExternalDayDependencies>(
                        `https://psmb.ru/?calendarDate=${date}${verses ? `&verses=${JSON.stringify(verses)}` : ''}`,
                        source
                    );
                    const detailUrls = [
                        ...Array.from((day.saints || '').matchAll(/data-saint=["']([^"']+)["']/g)).map(
                            ([, id]) => `https://psmb.ru/sv/${id}.html?json=1`
                        ),
                        ...(external?.sermons || []).map(({ id }) => `https://psmb.ru/s/${id}.html?format=json`),
                    ];
                    for (const url of Array.from(new Set(detailUrls))) await cachedFetch(url, source);
                }
            })
        );
    } finally {
        clearTimeout(timer);
        timer = setTimeout(() => {
            void precache();
        }, PRECACHE_INTERVAL);
    }
};
export default precache;
