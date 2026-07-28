import { expect, test, type BrowserContext } from '@playwright/test';

const FIXED_DATE = '2024-01-15';
const HYMN_TITLE = 'QA hymn';
const HYMN_TEXT = 'Stable offline hymn text';
const FIRST_HOUR_RUSSIAN_TEXT = 'Придите, покло́нимся Царю нашему Богу!';
const FIRST_HOUR_CHURCH_SLAVONIC_TEXT = 'Прииди́те, поклони́мся Царе́ви на́шему Бо́гу.';

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
                    readings: {},
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

test('reloads an installed lazy route while fully offline', async ({ browser }) => {
    test.setTimeout(120_000);

    const context = await browser.newContext({ serviceWorkers: 'allow' });
    await mockAppData(context);
    const page = await context.newPage();

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
    } finally {
        await context.setOffline(false);
        await context.close();
    }
});
