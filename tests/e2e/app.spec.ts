import { expect, test, type BrowserContext } from '@playwright/test';

const FIXED_DATE = '2024-01-15';
const HYMN_TITLE = 'QA hymn';
const HYMN_TEXT = 'Stable offline hymn text';
const FIRST_HOUR_RUSSIAN_TEXT = 'Придите, покло́нимся Царю нашему Богу!';
const FIRST_HOUR_CHURCH_SLAVONIC_TEXT = 'Прииди́те, поклони́мся Царе́ви на́шему Бо́гу.';
const LITURGY_HEADING = 'Божественная литургия Иоанна Златоуста';

const mockAppData = async (context: BrowserContext) => {
    await context.route('https://api.c.psmb.ru/**', async (route) => {
        const { pathname } = new URL(route.request().url());

        if (pathname.startsWith('/day/')) {
            await route.fulfill({
                json: {
                    bReadings: {},
                    comment: '',
                    glas: 1,
                    matinsGospelKey: null,
                    readings: {
                        Литургия: {
                            fixture: [],
                        },
                    },
                    saints: '',
                    title: 'Fixture feast day',
                    week: '',
                },
            });
            return;
        }

        if (pathname === '/hymns') {
            await route.fulfill({
                json: [
                    {
                        bodytext: {
                            csj: '<p>Пѣснь для испытанія</p>',
                            ru: `<p>${HYMN_TEXT}</p>`,
                        },
                        id: 'qa-hymn',
                        title: HYMN_TITLE,
                    },
                ],
            });
            return;
        }

        await route.fulfill({ json: {} });
    });

    await context.route('https://psmb.ru/**', async (route) => {
        await route.fulfill({ json: { sermons: [], thisDays: [] } });
    });

    await context.route('https://molitva.app/built/version.json', async (route) => {
        await route.fulfill({ json: 'dev' });
    });
};

test.beforeEach(async ({ context }) => {
    await mockAppData(context);
});

test('renders a deterministic core hash route', async ({ page }) => {
    await page.goto(`/#/date/${FIXED_DATE}`);

    await expect(page).toHaveURL(new RegExp(`#\\/date\\/${FIXED_DATE}$`));
    await expect(
        page.getByRole('button', { name: 'Показать календарь' }).filter({ hasText: '15 января 2024' })
    ).toBeVisible();
    await expect(page.getByText('Fixture feast day', { exact: true }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Богослужение' })).toHaveAttribute(
        'href',
        `#/date/${FIXED_DATE}/services`
    );
});

test('loads a lazy deep link and navigates within it', async ({ page }) => {
    await page.goto('/#/hymns');

    await expect(page.getByRole('heading', { name: 'Тропарион' })).toBeVisible();
    await page.getByRole('link', { name: new RegExp(HYMN_TITLE) }).click();

    await expect(page).toHaveURL(/#\/hymns\/qa-hymn$/);
    await expect(page.getByRole('heading', { name: HYMN_TITLE })).toBeVisible();
    await expect(page.getByText(HYMN_TEXT, { exact: true })).toBeVisible();
});

test('deep-links to dynamically loaded service MDX and switches its language', async ({ page }) => {
    await page.goto(`/#/date/${FIXED_DATE}/service/firstHour`);

    await expect(page).toHaveURL(new RegExp(`#\\/date\\/${FIXED_DATE}\\/service\\/firstHour$`));
    await expect(page.getByRole('heading', { name: 'Первый час', level: 1 })).toBeVisible();
    await expect(page.getByText(FIRST_HOUR_RUSSIAN_TEXT, { exact: false })).toBeVisible();

    await page.getByRole('combobox', { name: 'меню' }).filter({ hasText: 'РУС' }).click();
    await page.getByRole('option', { name: 'ЦСЯ' }).click();

    await expect(page.getByRole('combobox', { name: 'меню' }).filter({ hasText: 'ЦСЯ' })).toBeVisible();
    await expect(page.getByText(FIRST_HOUR_CHURCH_SLAVONIC_TEXT, { exact: false })).toBeVisible();
});

test('recovers a failed service MDX chunk when the user retries', async ({ page }) => {
    await page.goto(`/#/date/${FIXED_DATE}/service/firstHour`);
    await expect(page.getByText(FIRST_HOUR_RUSSIAN_TEXT, { exact: false })).toBeVisible();

    let failedChunkUrl = '';
    await page.route('**/built/*.js', async (route) => {
        if (!failedChunkUrl) {
            failedChunkUrl = route.request().url();
            await route.abort('failed');
            return;
        }
        await route.continue();
    });

    await page.getByRole('combobox', { name: 'меню' }).filter({ hasText: 'РУС' }).click();
    await page.getByRole('option', { name: 'ЦСЯ' }).click();

    await expect.poll(() => failedChunkUrl).toContain('/built/');
    await expect(page.getByRole('heading', { name: 'Что-то пошло не так' })).toBeVisible();

    await page.unroute('**/built/*.js');
    await page.getByRole('button', { name: 'Попробовать ещё раз' }).click();

    await expect(page.getByText(FIRST_HOUR_CHURCH_SLAVONIC_TEXT, { exact: false })).toBeVisible();
});

test('publishes a deterministic service TOC and navigates to a registered heading', async ({ page }) => {
    await page.addInitScript(() => {
        const NativeIntersectionObserver = window.IntersectionObserver;
        const trackedObservers = new WeakSet<IntersectionObserver>();
        const stats = { disconnects: 0, instances: 0, observations: 0, unobservations: 0 };
        (window as typeof window & { __tocObserverStats: typeof stats }).__tocObserverStats = stats;

        window.IntersectionObserver = class extends NativeIntersectionObserver {
            constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
                super(callback, options);
                if (options?.rootMargin === '-50px 0px -250px 0px') {
                    trackedObservers.add(this);
                    stats.instances += 1;
                }
            }

            disconnect() {
                if (trackedObservers.has(this)) {
                    stats.disconnects += 1;
                }
                super.disconnect();
            }

            observe(target: Element) {
                if (trackedObservers.has(this)) {
                    stats.observations += 1;
                }
                super.observe(target);
            }

            unobserve(target: Element) {
                if (trackedObservers.has(this)) {
                    stats.unobservations += 1;
                }
                super.unobserve(target);
            }
        };
    });

    const readHeadings = () =>
        page.evaluate(() =>
            Array.from(document.querySelectorAll<HTMLElement>('h2.H2, h3.H3')).map(({ id, textContent }) => ({
                id,
                label: textContent?.trim() || '',
            }))
        );

    await page.goto(`/#/date/${FIXED_DATE}/service/firstHour`);
    await expect(page.getByRole('heading', { name: 'Первый час', level: 1 })).toBeVisible();
    await page.waitForFunction(() => performance.getEntriesByName('service_toc_ready').length === 1);

    const firstHeadings = await readHeadings();
    const firstReadyMark = await page.evaluate(() => performance.getEntriesByName('service_toc_ready')[0].startTime);
    await page.waitForFunction(() =>
        ((window as typeof window & { dataLayer?: Array<{ event?: string }> }).dataLayer || []).some(
            ({ event }) => event === 'service_performance'
        )
    );
    const servicePerformanceEvent = await page.evaluate(() =>
        (window as typeof window & { dataLayer?: Array<{ event?: string; renderKey?: string }> }).dataLayer?.find(
            ({ event }) => event === 'service_performance'
        )
    );
    expect(firstHeadings.length).toBeGreaterThan(5);
    expect(new Set(firstHeadings.map(({ id }) => id)).size).toBe(firstHeadings.length);
    expect(firstHeadings.every(({ id }) => /^toc-.+-\d+$/.test(id))).toBe(true);
    expect(await page.evaluate(() => !('TOC' in window))).toBe(true);
    expect(servicePerformanceEvent?.renderKey).toContain(`${FIXED_DATE}:firstHour:ru`);

    await page.reload();
    await expect(page.getByRole('heading', { name: 'Первый час', level: 1 })).toBeVisible();
    await page.waitForFunction(() => performance.getEntriesByName('service_toc_ready').length === 1);
    expect(await readHeadings()).toEqual(firstHeadings);

    const psalmHeading = firstHeadings.find(({ label }) => label.startsWith('Псалом 5'));
    expect(psalmHeading).toBeDefined();
    if (!psalmHeading) {
        throw new Error('Expected the First Hour TOC fixture to include Psalm 5.');
    }

    await page.getByRole('combobox', { name: 'меню' }).nth(1).click();
    await page.getByRole('option', { name: 'Псалом 5', exact: true }).click();
    await expect(page.getByRole('combobox', { name: 'меню' }).nth(1)).toContainText('Псалом 5');
    await expect
        .poll(() =>
            page.evaluate((id) => {
                const heading = document.getElementById(id);
                return heading ? Math.abs(heading.getBoundingClientRect().top - window.innerHeight / 2) : Infinity;
            }, psalmHeading.id)
        )
        .toBeLessThan(200);

    const languageControl = page.getByRole('combobox', { name: 'меню' }).first();
    await languageControl.click();
    await page.getByRole('option', { name: 'ЦСЯ', exact: true }).click();
    await expect(page.getByText(FIRST_HOUR_CHURCH_SLAVONIC_TEXT, { exact: false })).toBeVisible();

    await languageControl.click();
    await page.getByRole('option', { name: 'Параллельно', exact: true }).click();
    await expect(languageControl).toContainText('Параллельно');
    await page.waitForFunction(
        (previousMark) =>
            (performance.getEntriesByName('service_toc_ready')[0]?.startTime ?? previousMark) > previousMark,
        firstReadyMark
    );

    const parallelHeadings = await readHeadings();
    expect(parallelHeadings.length).toBeGreaterThan(firstHeadings.length);
    expect(new Set(parallelHeadings.map(({ id }) => id)).size).toBe(parallelHeadings.length);
    expect(
        await page.evaluate(
            () => (window as typeof window & { __tocObserverStats: { instances: number } }).__tocObserverStats.instances
        )
    ).toBe(1);
});

test('keeps tooltip annotations out of service TOC labels', async ({ page }) => {
    await page.goto(`/#/date/${FIXED_DATE}/service/zlatoust`);
    await expect(page.getByRole('heading', { name: LITURGY_HEADING, level: 1 })).toBeVisible();
    await page.waitForFunction(() => document.querySelectorAll('h2[id^="toc-"], h3[id^="toc-"]').length >= 65);

    await page.getByRole('combobox', { name: 'меню' }).nth(1).click();
    await expect(page.getByRole('option', { name: 'Молитва первая', exact: true })).toBeVisible();
    await expect(page.getByRole('option', { name: /Древнее надписание/ })).toHaveCount(0);
});

test('debounces long-document search and ignores single-character queries', async ({ page }) => {
    await page.goto(`/#/date/${FIXED_DATE}/service/firstHour`);
    await expect(page.getByRole('heading', { name: 'Первый час', level: 1 })).toBeVisible();

    await page.locator('header button').last().click();
    await page.getByRole('button', { name: 'Найти…' }).click();
    const searchInput = page.getByPlaceholder('Найти (от 2 букв)');

    await searchInput.fill('П');
    await page.waitForTimeout(250);
    await expect(page.locator('.inpage-find-highlight')).toHaveCount(0);

    await searchInput.fill('Псалом');
    await expect.poll(() => page.locator('.inpage-find-highlight').count()).toBeGreaterThan(0);
    await searchInput.press('Escape');
    await expect(page.locator('.inpage-find-highlight')).toHaveCount(0);
});

test('persists the selected theme across a reload', async ({ page }) => {
    await page.goto('/#/hymns');
    await expect(page.getByRole('heading', { name: 'Тропарион' })).toBeVisible();

    await page.locator('header button').last().click();
    await page.getByRole('button').filter({ hasText: 'Настройки' }).click();
    await expect(page.getByRole('heading', { name: 'Настройки' })).toBeVisible();
    await page.getByRole('button', { name: 'Темная', exact: true }).click();

    await expect
        .poll(() =>
            page.evaluate(() => {
                const stored = window.localStorage.getItem('recoil-persist');
                return stored ? JSON.parse(stored).themeState : null;
            })
        )
        .toBe('dark');

    const darkBackground = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    await page.reload();

    await expect(page.getByRole('heading', { name: 'Тропарион' })).toBeVisible();
    await expect.poll(() => page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe(darkBackground);
});

test('reloads installed lazy routes and optional service controls while fully offline', async ({ browser }) => {
    test.setTimeout(120_000);

    const context = await browser.newContext({ serviceWorkers: 'allow' });
    await mockAppData(context);
    const page = await context.newPage();
    const failedBuiltRequests: string[] = [];
    page.on('requestfailed', (request) => {
        const path = new URL(request.url()).pathname;
        if (path.startsWith('/built/') && !path.endsWith('/version.json')) {
            failedBuiltRequests.push(request.url());
        }
    });

    try {
        await page.goto('/#/hymns');
        await expect(page.getByRole('heading', { name: 'Тропарион' })).toBeVisible();
        await expect(page.getByRole('link', { name: new RegExp(HYMN_TITLE) })).toBeVisible();

        await page.evaluate(async () => {
            await navigator.serviceWorker.ready;
        });
        await page.waitForFunction(() => navigator.serviceWorker.controller !== null);

        await context.setOffline(true);
        await page.reload({ waitUntil: 'domcontentloaded' });

        await expect(page.getByRole('heading', { name: 'Тропарион' })).toBeVisible();
        await expect(page.getByRole('link', { name: new RegExp(HYMN_TITLE) })).toBeVisible();

        await page.goto(`/#/date/${FIXED_DATE}/service/firstHour`, { waitUntil: 'domcontentloaded' });
        await expect(page.getByRole('heading', { name: 'Первый час', level: 1 })).toBeVisible();
        await expect(page.getByText(FIRST_HOUR_RUSSIAN_TEXT, { exact: false })).toBeVisible();

        await page.locator('header button').last().click();
        await page.getByRole('button', { name: 'Найти…' }).click();
        await expect(page.getByPlaceholder('Найти (от 2 букв)')).toBeVisible();

        await page.goto(`/#/date/${FIXED_DATE}/service/zlatoust`, { waitUntil: 'domcontentloaded' });
        await expect(page.getByRole('heading', { name: LITURGY_HEADING, level: 1 })).toBeVisible();
        await page.waitForFunction(() => document.querySelectorAll('h2[id^="toc-"], h3[id^="toc-"]').length >= 65);

        const languageControl = page.getByRole('combobox', { name: 'меню' }).first();
        await languageControl.click();
        await page.getByRole('option', { name: 'ЦСЯ', exact: true }).click();
        await page.waitForFunction(() => {
            return performance.getEntriesByName('service_complete_commit').some((entry) => {
                const detail = (entry as PerformanceMark).detail as { renderKey?: string } | null;
                return detail?.renderKey?.includes(':csj:');
            });
        });

        await languageControl.click();
        await page.getByRole('option', { name: 'Параллельно', exact: true }).click();
        await page.waitForFunction(() => {
            return performance.getEntriesByName('service_complete_commit').some((entry) => {
                const detail = (entry as PerformanceMark).detail as { renderKey?: string } | null;
                return detail?.renderKey?.includes(':parallel:ru:csj');
            });
        });
        expect(failedBuiltRequests).toEqual([]);
    } finally {
        await context.setOffline(false);
        await context.close();
    }
});
