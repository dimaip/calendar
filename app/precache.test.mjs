import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';
import { formatDateKey } from './utils/formatDateKey.ts';

const source = ts.transpileModule(readFileSync(new URL('./precache.ts', import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;

function environment(now, missingDay = false) {
    const requests = [];
    const timers = new Map();
    const verses = { Рядовое: ['Лк., 59 зач., XI, 29-33.'] };
    const exports = {};
    const FixedDate = class extends Date {
        constructor(value = now) {
            super(value);
        }
    };
    vm.runInNewContext(source, {
        exports,
        Date: FixedDate,
        process: { env: { API_HOST: 'https://api.example.test' } },
        setTimeout(callback, delay) {
            const token = {};
            timers.set(token, { callback, delay });
            return token;
        },
        clearTimeout(token) {
            timers.delete(token);
        },
        require(id) {
            if (id === 'regenerator-runtime/runtime.js') return {};
            if (id === 'utils/formatDateKey') return { formatDateKey };
            assert.equal(id, 'utils/cachedFetch');
            return {
                default: async (url, mode) => {
                    requests.push({ url, mode });
                    if (url.includes('/day/'))
                        return missingDay
                            ? undefined
                            : {
                                  readings: { Литургия: verses },
                                  saints: `<a data-saint="saint-1">Saint</a><a data-saint='saint-1'>Saint</a>`,
                              };
                    if (url.includes('calendarDate=')) return { sermons: [{ id: 'sermon-1' }] };
                    return {};
                },
            };
        },
    });
    return { precache: exports.default, requests, timers, verses };
}

test('opening online prepares ten local calendar days ahead, including the last day’s vespers dependencies', async (t) => {
    const previous = process.env.TZ;
    process.env.TZ = 'Europe/Moscow';
    t.after(() => {
        process.env.TZ = previous;
    });
    // UTC is still the previous date. The old ISO-string range missed day ten.
    const env = environment('2026-11-16T00:30:00+03:00');
    await env.precache();
    const days = env.requests
        .filter((r) => r.url.includes('/day/'))
        .map((r) => r.url.split('/').pop())
        .sort();
    assert.equal(days.length, 12);
    assert.equal(new Set(days).size, 12);
    assert.equal(days[0], '2026-11-16');
    assert.equal(days[10], '2026-11-26');
    assert.equal(days[11], '2026-11-27');
    for (const day of days) {
        for (const resource of [`/parts/${day}/ru`, `/parts/${day}/csj`, `/readings/${day}`]) {
            assert.ok(
                env.requests.some((r) => r.url.endsWith(resource)),
                resource
            );
        }
        assert.ok(
            env.requests.some(
                (r) => r.url === `https://psmb.ru/?calendarDate=${day}&verses=${JSON.stringify(env.verses)}`
            )
        );
    }
    const firstExternal = env.requests.findIndex((r) => r.url.includes('calendarDate='));
    const lastCore = env.requests.findLastIndex((r) => /\/(day|parts|readings)\//.test(r.url));
    assert.ok(firstExternal > lastCore, 'Slow external details must not delay the ten-day calendar range');
    assert.ok(env.requests.some((r) => r.url.endsWith('/hymns')));
    assert.ok(env.requests.some((r) => r.url === 'https://psmb.ru/sv/saint-1.html?json=1'));
    assert.ok(env.requests.some((r) => r.url === 'https://psmb.ru/s/sermon-1.html?format=json'));
    assert.ok(env.requests.every((r) => r.mode === 'PREFETCH_NORMAL'));
    assert.ok(env.requests.every((r) => !/audio|\.mp3|\.m4a/.test(r.url)));
});

test('refresh forces every request and repeated runs leave only one scheduled refresh', async () => {
    const env = environment('2026-12-28T12:00:00Z');
    await env.precache(true);
    assert.ok(env.requests.every((r) => r.mode === 'PREFETCH_RELOAD'));
    await env.precache();
    assert.equal(env.timers.size, 1);
    assert.equal([...env.timers.values()][0].delay, 86400000);
});

test('failed day downloads do not stop preparing other dates or scheduling the next attempt', async () => {
    const env = environment('2026-11-16T12:00:00Z', true);
    await env.precache(true);
    assert.equal(env.requests.filter((r) => r.url.includes('/day/')).length, 12);
    assert.equal(env.timers.size, 1);
});

test('overlapping reconnect and refresh runs leave only one scheduled refresh', async () => {
    const env = environment('2026-11-16T12:00:00Z');
    await Promise.all([env.precache(), env.precache(true)]);
    assert.equal(env.timers.size, 1);
});
