const PRECACHE_DAYS = 10;
const PRECACHE_INTERVAL = 3600 * 24 * 1000;

const getDaysArray = (start, end) => {
    const arr = [];
    for (const dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
        arr.push(new Date(dt).toISOString().slice(0, 10));
    }
    return arr;
};
const precache = () => {
    const tillDate = new Date();
    tillDate.setDate(tillDate.getDate() + PRECACHE_DAYS);

    const daylist = getDaysArray(new Date(), tillDate);

    if (self.caches) {
        caches.open(`workbox-runtime-${process.env.API_HOST}/`).then(cache => {
            daylist.forEach(date => {
                cache.match(`/day/${date}`).then(exists => {
                    // If not in cache
                    if (!exists) {
                        fetch(`${process.env.API_HOST}/day/${date}`);
                        fetch(`https://psmb.ru/?calendarDate=${date}.html?json=1`);
                        fetch(`${process.env.API_HOST}/readings/${date}`);
                    }
                });
            });
        });
    }

    setTimeout(() => {
        precache();
    }, PRECACHE_INTERVAL);
};

onmessage = () => {
    precache();
};
