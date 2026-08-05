import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { createGzip } from 'node:zlib';

const COMPRESSIBLE_EXTENSIONS = new Set(['.css', '.html', '.js', '.json', '.map', '.svg', '.txt', '.xml']);

const mimeTypes = new Map([
    ['.css', 'text/css; charset=utf-8'],
    ['.gif', 'image/gif'],
    ['.html', 'text/html; charset=utf-8'],
    ['.ico', 'image/x-icon'],
    ['.jpeg', 'image/jpeg'],
    ['.jpg', 'image/jpeg'],
    ['.js', 'text/javascript; charset=utf-8'],
    ['.json', 'application/json; charset=utf-8'],
    ['.png', 'image/png'],
    ['.svg', 'image/svg+xml'],
    ['.ttf', 'font/ttf'],
    ['.woff', 'font/woff'],
    ['.woff2', 'font/woff2'],
]);

export const extractExpectedPrecacheUrls = (source) => {
    const urls = [];
    const entryPattern =
        /\{\s*['"]?revision['"]?\s*:\s*(?:null|'[^']*'|"[^"]*")\s*,\s*['"]?url['"]?\s*:\s*(?:'([^']+)'|"([^"]+)")\s*\}/gu;
    for (const match of source.matchAll(entryPattern)) urls.push(match[1] ?? match[2]);
    return [...new Set(urls)];
};

export const normalizePrecacheUrl = (value) => {
    const url = new URL(value, 'http://experience.test');
    url.searchParams.delete('__WB_REVISION__');
    return `${url.pathname}${url.search}`;
};

export const comparePrecacheCoverage = (expectedUrls, actualUrls) => {
    const expected = [...new Set(expectedUrls.map(normalizePrecacheUrl))].sort();
    const actual = [...new Set(actualUrls.map(normalizePrecacheUrl))].sort();
    const expectedSet = new Set(expected);
    const actualSet = new Set(actual);
    return {
        actual,
        expected,
        missing: expected.filter((key) => !actualSet.has(key)),
        unexpected: actual.filter((key) => !expectedSet.has(key)),
    };
};

export const createFutureCorpusKeys = (start, apiHost = 'https://api.c.psmb.ru') => {
    const day = new Date(start);
    const last = new Date(start);
    last.setDate(last.getDate() + 10);
    const keys = [];
    while (day <= last) {
        const date = day.toISOString().slice(0, 10);
        keys.push(
            `${apiHost}/day/${date}`,
            `${apiHost}/parts/${date}/ru`,
            `https://psmb.ru/?calendarDate=${date}`,
            `${apiHost}/readings/${date}`
        );
        day.setDate(day.getDate() + 1);
    }
    return keys;
};

const manifestForOrigin = (source, origin) => {
    const manifest = JSON.parse(source);
    return JSON.stringify(
        {
            ...manifest,
            scope: '/',
            start_url: `${origin}/?utm_source=homescreen&from_home`,
        },
        null,
        2
    );
};

export const createExperienceServer = async ({ contentEncoding = 'gzip', port, root }) => {
    if (!['gzip', 'identity'].includes(contentEncoding)) {
        throw new Error(`Unsupported content encoding "${contentEncoding}".`);
    }
    if (!fs.existsSync(path.join(root, 'index.html'))) {
        throw new Error(`No production index.html found below ${root}.`);
    }

    const server = http.createServer((request, response) => {
        const host = request.headers.host ?? `127.0.0.1:${port}`;
        const origin = `http://${host}`;
        const requestUrl = new URL(request.url ?? '/', origin);
        const relativePath =
            requestUrl.pathname === '/' ? 'index.html' : decodeURIComponent(requestUrl.pathname.slice(1));
        const filePath = path.resolve(root, relativePath);

        if (!filePath.startsWith(`${root}${path.sep}`) || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
            response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            response.end('Not found');
            return;
        }

        const extension = path.extname(filePath).toLowerCase();
        const immutable = requestUrl.pathname.startsWith('/built/') && /\.[a-f0-9]{12,}\./u.test(requestUrl.pathname);
        const headers = {
            'Cache-Control': immutable ? 'public, max-age=31536000, immutable' : 'no-cache',
            'Content-Type': mimeTypes.get(extension) ?? 'application/octet-stream',
        };

        if (requestUrl.pathname === '/manifest.json') {
            const body = manifestForOrigin(fs.readFileSync(filePath, 'utf8'), origin);
            response.writeHead(200, headers);
            response.end(body);
            return;
        }

        const compressed =
            contentEncoding === 'gzip' &&
            COMPRESSIBLE_EXTENSIONS.has(extension) &&
            request.headers['accept-encoding']?.includes('gzip');
        response.writeHead(200, {
            ...headers,
            ...(compressed ? { 'Content-Encoding': 'gzip', Vary: 'Accept-Encoding' } : {}),
        });
        const source = fs.createReadStream(filePath);
        if (compressed) {
            source.pipe(createGzip({ level: 9 })).pipe(response);
        } else {
            source.pipe(response);
        }
    });

    await new Promise((resolve, reject) => {
        server.once('error', reject);
        server.listen(port, '127.0.0.1', resolve);
    });

    const address = server.address();
    const resolvedPort = typeof address === 'object' && address ? address.port : port;
    return {
        baseUrl: `http://127.0.0.1:${resolvedPort}`,
        close: async () =>
            await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve()))),
    };
};

export const deterministicDayFixture = {
    title: 'Седмица 9-я по Пятидесятнице',
    glas: 7,
    matinsGospelKey: null,
    readings: {
        Утреня: {
            Равноапостольному: ['Ин., 36 зач., X, 9-16.', 'Мф., 55 зач., XIII, 44-54.'],
        },
        Литургия: {
            Равноапостольному: ['Гал., 200 зач., I, 11-19.', 'Ин., 35 зач., X, 1-9.'],
        },
    },
    bReadings: {
        Утром: { unnamed: ['Мф. XX, 17–34'] },
        Вечером: { unnamed: ['1 Кор. VIII, 1-13'] },
    },
    saints: '',
    comment: '',
    week: '',
};

const deterministicReadingLinks = [deterministicDayFixture.readings, deterministicDayFixture.bReadings].flatMap(
    (services) => Object.values(services).flatMap((readingTypes) => Object.values(readingTypes).flat())
);

export const deterministicReadingsFixture = Object.fromEntries(
    [...new Set(deterministicReadingLinks)].map((link, index) => [
        link,
        {
            bookKey: `fixture-book-${index + 1}`,
            bookName: `Чтение ${index + 1}`,
            chapCount: '1',
            fragments: [
                {
                    chapter: '1',
                    type: 'default',
                    verses: [
                        {
                            text: `Детерминированный текст чтения ${index + 1}.`,
                            type: 'default',
                            verse: '1',
                        },
                    ],
                },
            ],
            translationCurrent: 'default',
            translationList: [{ id: 'default', name: 'Русский' }],
            verseKey: link,
        },
    ])
);

export const createColdLanguageCacheEntries = (date, apiHost = 'https://api.c.psmb.ru') => [
    { key: `${apiHost}/parts/${date}/csj`, value: JSON.stringify({}) },
    ...Object.entries(deterministicReadingsFixture).map(([link, reading]) => ({
        key: `${apiHost}/reading/${encodeURI(link)}&translation=91Slavic&translationPriority=`,
        value: JSON.stringify({
            ...reading,
            translationCurrent: '91Slavic',
            translationList: [{ id: '91Slavic', name: 'Церковнославянский' }],
        }),
    })),
];

export const resolveExperienceApiFixture = (pathname) => {
    if (/^\/day\/\d{4}-\d{2}-\d{2}$/u.test(pathname)) return deterministicDayFixture;
    if (/^\/parts\/\d{4}-\d{2}-\d{2}\/(?:csj|ru)$/u.test(pathname)) return {};
    if (/^\/readings\/\d{4}-\d{2}-\d{2}$/u.test(pathname)) return deterministicReadingsFixture;
    if (pathname === '/hymns') return [];
    if (pathname === '/app') return { notification: null };
    return undefined;
};

export const configureExperienceFixtures = async (context) => {
    const activity = { fulfilled: 0 };
    const fulfill = async (route, response) => {
        activity.fulfilled += 1;
        await route.fulfill(response);
    };
    await context.route('https://api.c.psmb.ru/**', async (route) => {
        const { pathname } = new URL(route.request().url());
        const fixture = resolveExperienceApiFixture(pathname);
        if (fixture === undefined) {
            await route.abort('failed');
            return;
        }
        await fulfill(route, { json: fixture });
    });
    await context.route('https://psmb.ru/**', async (route) => {
        await fulfill(route, { json: { sermons: [], thisDays: [] } });
    });
    await context.route(/https:\/\/(?:www\.)?googletagmanager\.com\/.*/u, async (route) => {
        await fulfill(route, { status: 204, body: '' });
    });
    await context.route(/https:\/\/mc\.yandex\.ru\/.*/u, async (route) => {
        await fulfill(route, { status: 204, body: '' });
    });
    await context.route(/https:\/\/[^/]*sentry\.io\/.*/u, async (route) => {
        await fulfill(route, { status: 204, body: '' });
    });
    return activity;
};
