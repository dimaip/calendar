import 'regenerator-runtime/runtime';
import cachedFetch from 'utils/cachedFetch';

const PRECACHE_DAYS = 10;
const PRECACHE_INTERVAL = 3600 * 24 * 1000;

const getDaysArray = (start, end) => {
    const arr = [];
    for (const dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
        arr.push(new Date(dt).toISOString().slice(0, 10));
    }
    return arr;
};
const precache = async () => {
    const tillDate = new Date();
    tillDate.setDate(tillDate.getDate() + PRECACHE_DAYS);

    const daylist = getDaysArray(new Date(), tillDate);

    daylist.forEach((date) => {
        cachedFetch(`${process.env.API_HOST}/day/${date}`, true);
        cachedFetch(`${process.env.API_HOST}/parts/${date}/ru`, true);
        cachedFetch(`https://psmb.ru/?calendarDate=${date}`, true);
        cachedFetch(`${process.env.API_HOST}/readings/${date}`, true);
    });

    setTimeout(() => {
        precache();
    }, PRECACHE_INTERVAL);
};

onmessage = () => {
    precache();
};
