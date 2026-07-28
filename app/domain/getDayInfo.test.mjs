import assert from 'node:assert/strict';
import test from 'node:test';

global.window = {
    location: {
        reload: () => {},
    },
    matchMedia: () => ({
        addEventListener: () => {},
        matches: false,
    }),
};

const {
    calculateEasterDate,
    getFeastInfo,
    getLentInfo,
    isAntifonVsednev,
    isHymnsVsednev,
    isNedelaSkorbi,
    makeIsDate,
    makeIsEasterOffsetRange,
} = await import('./getDayInfo.ts');

const atLocalNoon = (year, month, day) => new Date(year, month - 1, day, 12);

const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

test('calculates known Orthodox Easter dates across a decade', () => {
    const knownDates = new Map([
        [2020, [4, 19]],
        [2021, [5, 2]],
        [2022, [4, 24]],
        [2023, [4, 16]],
        [2024, [5, 5]],
        [2025, [4, 20]],
        [2026, [4, 12]],
        [2027, [5, 2]],
        [2028, [4, 16]],
        [2029, [4, 8]],
        [2030, [4, 28]],
    ]);

    for (const [year, [month, day]] of knownDates) {
        const easter = calculateEasterDate(year);
        assert.deepEqual(
            [easter.getFullYear(), easter.getMonth() + 1, easter.getDate(), easter.getDay()],
            [year, month, day, 0],
            `unexpected Easter date for ${year}`
        );
    }
});

test('returns independent Easter Date instances rather than a mutable memoized value', () => {
    const first = calculateEasterDate(2026);
    first.setDate(first.getDate() + 10);

    const second = calculateEasterDate(2026);
    assert.deepEqual(
        [second.getFullYear(), second.getMonth() + 1, second.getDate()],
        [2026, 4, 12]
    );
    assert.notEqual(first, second);
});

test('keeps calculated Easter on a Sunday throughout its current 1900–2099 validity window', () => {
    for (let year = 1900; year <= 2099; year += 1) {
        const easter = calculateEasterDate(year);
        const month = easter.getMonth() + 1;
        const day = easter.getDate();

        assert.equal(easter.getDay(), 0, `Easter is not Sunday in ${year}`);
        assert.equal(
            (month === 4 && day >= 4) || (month === 5 && day <= 8),
            true,
            `Easter is outside April 4–May 8 in ${year}`
        );
    }
});

test('calculates Easter correctly after the Gregorian/Julian offset changes in 2100', () => {
    const easter = calculateEasterDate(2100);
    assert.deepEqual(
        [easter.getFullYear(), easter.getMonth() + 1, easter.getDate(), easter.getDay()],
        [2100, 5, 2, 0]
    );
});

test('makeIsDate compares calendar days for Date and ISO-like string inputs', () => {
    const leapDay = atLocalNoon(2024, 2, 29);

    assert.equal(makeIsDate(leapDay)(2, 29), true);
    assert.equal(makeIsDate(leapDay)(2, 28), false);
    assert.equal(makeIsDate('2024-02-29')(2, 29), true);
    assert.equal(makeIsDate('2024-02-29')(3, 1), false);
});

test('Easter offset matching is exact and range endpoints are inclusive', () => {
    for (const year of [2024, 2025, 2026, 2027]) {
        const easter = calculateEasterDate(year);

        for (const offset of [-49, -8, -1, 0, 1, 39, 49, 56]) {
            const date = addDays(easter, offset);
            const isOffset = makeIsEasterOffsetRange(date);

            assert.equal(isOffset(offset), true, `${year} offset ${offset} did not match`);
            assert.equal(isOffset(offset - 1), false, `${year} offset ${offset - 1} matched`);
            assert.equal(isOffset(offset + 1), false, `${year} offset ${offset + 1} matched`);
        }

        const insideRange = makeIsEasterOffsetRange(addDays(easter, 3));
        assert.equal(insideRange(0, 3), true);
        assert.equal(insideRange(3, 6), true);
        assert.equal(insideRange(4, 6), false);
    }
});

test('characterizes the major movable feasts and their display metadata', () => {
    const cases = [
        [addDays(calculateEasterDate(2026), -7), 'Вход Господень в Иерусалим', 'vhod.svg', 'green'],
        [calculateEasterDate(2026), 'Пасха', 'easter.svg', 'red'],
        [addDays(calculateEasterDate(2026), 39), 'Вознесение', 'ascension.svg', 'red'],
        [addDays(calculateEasterDate(2026), 49), 'Пятидесятница', 'pentecost.svg', 'green'],
    ];

    for (const [date, title, icon, calendarColour] of cases) {
        assert.deepEqual(
            {
                title: getFeastInfo(date).title,
                feastType: getFeastInfo(date).feastType,
                icon: getFeastInfo(date).icon,
                calendarColour: getFeastInfo(date).calendarColour,
            },
            { title, feastType: '12', icon, calendarColour }
        );
    }
});

test('characterizes fixed great feasts and their icon precedence', () => {
    const cases = [
        [atLocalNoon(2031, 1, 7), 'Рождество Христово', 'christmas.svg', '12'],
        [atLocalNoon(2031, 1, 19), 'Крещение Господне', 'baptism.svg', '12'],
        [atLocalNoon(2031, 2, 15), 'Сретение Господне', 'candlemas.svg', '12'],
        [atLocalNoon(2031, 7, 7), 'Рождество Иоанна Крестителя', 'baptist.png', 'great'],
        [atLocalNoon(2031, 8, 19), 'Преображение Господне', 'transfiguration.png', '12'],
        [atLocalNoon(2031, 8, 28), 'Успение Богородицы', 'uspenie.svg', '12'],
        [atLocalNoon(2031, 9, 21), 'Рождество Богородицы', 'birthOfOurLady.svg', '12'],
        [atLocalNoon(2031, 10, 14), 'Покров Пресвятой Богородицы', 'pokrov.svg', 'great'],
        [atLocalNoon(2031, 12, 4), 'Введение во храм Пресвятой Богородицы', 'vvedenie.svg', '12'],
    ];

    for (const [date, title, icon, feastType] of cases) {
        const feast = getFeastInfo(date);
        assert.deepEqual(
            { title: feast.title, icon: feast.icon, feastType: feast.feastType },
            { title, icon, feastType }
        );
    }

    assert.equal(getFeastInfo(atLocalNoon(2026, 5, 21)).icon, 'ascension.svg');
    assert.equal(getFeastInfo(atLocalNoon(2025, 5, 21)).icon, 'john.svg');
});

test('characterizes liturgy selection during Lent and Annunciation overrides', () => {
    assert.deepEqual(
        {
            vasiliy: getFeastInfo(atLocalNoon(2026, 3, 1)).vasiliy,
            lpod: getFeastInfo(atLocalNoon(2026, 3, 1)).lpod,
        },
        { vasiliy: true, lpod: false }
    );
    assert.deepEqual(
        {
            vasiliy: getFeastInfo(atLocalNoon(2026, 4, 1)).vasiliy,
            lpod: getFeastInfo(atLocalNoon(2026, 4, 1)).lpod,
        },
        { vasiliy: false, lpod: true }
    );
    assert.deepEqual(
        {
            vasiliy: getFeastInfo(atLocalNoon(2026, 4, 7)).vasiliy,
            lpod: getFeastInfo(atLocalNoon(2026, 4, 7)).lpod,
        },
        { vasiliy: false, lpod: false }
    );
});

test('characterizes fasting boundaries and feast exceptions', () => {
    const cases = [
        [atLocalNoon(2032, 1, 7), 'Поста нет', 8],
        [atLocalNoon(2032, 1, 18), 'Постный день', 4],
        [atLocalNoon(2024, 3, 18), 'Великий пост', 1],
        [atLocalNoon(2024, 4, 7), 'Великий пост', 5],
        [atLocalNoon(2024, 5, 5), 'Поста нет', 8],
        [atLocalNoon(2024, 8, 14), 'Успенский пост', 2],
        [atLocalNoon(2024, 8, 19), 'Успенский пост', 5],
        [atLocalNoon(2032, 11, 28), 'Рождественский пост', 5],
    ];

    for (const [date, fastName, fastingLevel] of cases) {
        const lent = getLentInfo(date);
        assert.deepEqual(
            { fastName: lent.fastName, fastingLevel: lent.fastingLevel },
            { fastName, fastingLevel }
        );
    }
});

test('day-info functions preserve their result shape across a broad date range', () => {
    const allowedFeastTypes = new Set([null, '12', 'great']);

    for (let year = 2033; year <= 2042; year += 1) {
        for (let month = 0; month < 12; month += 1) {
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            for (let day = 1; day <= daysInMonth; day += 1) {
                const date = new Date(year, month, day, 12);
                const feast = getFeastInfo(date);
                const lent = getLentInfo(date);

                assert.equal(typeof feast.title, 'string');
                assert.equal(allowedFeastTypes.has(feast.feastType), true);
                assert.equal(typeof feast.vasiliy, 'boolean');
                assert.equal(typeof feast.lpod, 'boolean');
                assert.equal(feast.vasiliy && feast.lpod, false);

                assert.equal(Number.isInteger(lent.fastingLevel), true);
                assert.equal(lent.fastingLevel >= 1 && lent.fastingLevel <= 8, true);
                assert.equal(typeof lent.fastName, 'string');
                assert.equal(typeof lent.fastingLevelName, 'string');
                if (lent.fastingLevel < 8) {
                    assert.equal(typeof lent.icon, 'string');
                }
            }
        }
    }
});

test('daily antiphon and hymn flags are disabled during the Paschal period', () => {
    for (const year of [2024, 2025, 2026]) {
        const easter = calculateEasterDate(year);
        for (let offset = 0; offset <= 56; offset += 1) {
            const date = addDays(easter, offset);
            assert.equal(isAntifonVsednev(date), false, `${year} antiphon offset ${offset}`);
            assert.equal(isHymnsVsednev(date), false, `${year} hymn offset ${offset}`);
        }
    }
});

test('daily antiphons are never selected on weekends', () => {
    for (let day = 1; day <= 366; day += 1) {
        const date = addDays(atLocalNoon(2036, 1, 1), day - 1);
        if (date.getDay() === 0 || date.getDay() === 6) {
            assert.equal(isAntifonVsednev(date), false);
        }
    }
});

test('the week of sorrow is bounded by calendar days and excludes November 4 and 5', () => {
    assert.equal(isNedelaSkorbi(atLocalNoon(2026, 10, 29)), false);
    assert.equal(isNedelaSkorbi(atLocalNoon(2026, 10, 30)), true);
    assert.equal(isNedelaSkorbi(atLocalNoon(2026, 11, 3)), true);
    assert.equal(isNedelaSkorbi(atLocalNoon(2026, 11, 4)), false);
    assert.equal(isNedelaSkorbi(atLocalNoon(2026, 11, 5)), false);
    assert.equal(isNedelaSkorbi(atLocalNoon(2026, 11, 6)), true);
    assert.equal(isNedelaSkorbi(new Date(2026, 10, 7)), true);
    assert.equal(isNedelaSkorbi(atLocalNoon(2026, 11, 7)), true);
    assert.equal(isNedelaSkorbi(atLocalNoon(2026, 11, 8)), false);
});

test('the November 7 week-of-sorrow result is independent of the Date time component', () => {
    assert.equal(isNedelaSkorbi(atLocalNoon(2026, 11, 7)), true);
});

test('memoized day-info keys distinguish February double-digit dates from December single-digit dates', () => {
    const december = getLentInfo(atLocalNoon(2097, 12, 1));
    const february = getLentInfo(atLocalNoon(2097, 2, 11));

    assert.equal(december.fastName, 'Рождественский пост');
    assert.notEqual(february.fastName, 'Рождественский пост');
});
