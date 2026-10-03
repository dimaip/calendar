import { useEffect, useState } from 'react';
import { useQuery } from 'convex/react';

import { api } from '../../convex/_generated/api';

import { getBroadcastBanner } from 'domain/broadcastBanner';
import { formatDateKey } from 'utils/formatDateKey';

export default function useBroadcastBanner(date: string) {
    const [now, setNow] = useState(Date.now);

    const today = formatDateKey(new Date(now));
    const dayStart = new Date(`${date}T00:00:00`);
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);
    const todayStart = new Date(`${today}T00:00:00`);
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);
    const occurrences = useQuery(
        api.broadcasts.bannerCandidates,
        !Number.isFinite(dayStart.getTime())
            ? 'skip'
            : {
                  dayStart: dayStart.getTime(),
                  dayEnd: dayEnd.getTime(),
                  todayStart: todayStart.getTime(),
                  todayEnd: todayEnd.getTime(),
              }
    );

    // Unrelated dates remain empty while the schedule is loading.
    const banner = getBroadcastBanner(occurrences ?? [], date, now);
    const tickInterval = banner?.state === 'countdown' ? 1000 : 60000;
    useEffect(() => {
        let timer: number;
        const tick = () => {
            window.clearTimeout(timer);
            setNow(Date.now());
            timer = window.setTimeout(tick, tickInterval - (Date.now() % tickInterval));
        };
        const onVisibilityChange = () => {
            if (document.visibilityState === 'visible') tick();
        };
        tick();
        window.addEventListener('focus', tick);
        document.addEventListener('visibilitychange', onVisibilityChange);
        return () => {
            window.clearTimeout(timer);
            window.removeEventListener('focus', tick);
            document.removeEventListener('visibilitychange', onVisibilityChange);
        };
    }, [tickInterval]);

    return { banner, now };
}
