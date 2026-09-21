import memoize from 'lodash.memoize';

const calculateEasterDateMemoized = memoize((year: number) => {
    const a = year % 4;
    const b = year % 7;
    const c = year % 19;
    const d = (19 * c + 15) % 30;
    const e = (2 * a + 4 * b - d + 34) % 7;
    const julianMonth = Math.floor((d + e + 114) / 31);
    const julianDay = ((d + e + 114) % 31) + 1;
    const gregorianOffset = Math.floor(year / 100) - Math.floor(year / 400) - 2;

    const gregorianDate = new Date(year, julianMonth - 1, julianDay + gregorianOffset);
    return {
        d: gregorianDate.getDate(),
        m: gregorianDate.getMonth(),
        y: gregorianDate.getFullYear(),
    };
});

export const calculateEasterDate = (year: number) => {
    const { y, m, d } = calculateEasterDateMemoized(year);
    // Clone the date when accessing
    return new Date(y, m, d);
};

export const makeIsDate =
    (date: string | Date) =>
    (month: number, day: number): boolean => {
        let d: number;
        let m: number;
        let y: number;
        if (typeof date === 'string') {
            const splitDateString = date.split('-');
            [y, m, d] = [Number(splitDateString[0]), Number(splitDateString[1]) - 1, Number(splitDateString[2])];
        } else {
            y = date.getFullYear();
            m = date.getMonth();
            d = date.getDate();
        }
        const targetDate = new Date(y, m, d);
        return new Date(y, month - 1, day).getTime() === targetDate.getTime();
    };

export const makeIsEasterOffsetRange =
    (_date: string | Date) =>
    (offsetBegin: number, offsetEnd?: number): boolean => {
        let d: number;
        let m: number;
        let y: number;
        if (typeof _date === 'string') {
            const splitDateString = _date.split('-');
            [y, m, d] = [Number(splitDateString[0]), Number(splitDateString[1]) - 1, Number(splitDateString[2])];
        } else {
            y = _date.getFullYear();
            m = _date.getMonth();
            d = _date.getDate();
        }
        const date = new Date(y, m, d);
        const begin = calculateEasterDate(y);
        begin.setDate(begin.getDate() + offsetBegin);
        if (!offsetEnd) {
            return begin.getTime() === date.getTime();
        }
        const end = calculateEasterDate(y);
        end.setDate(end.getDate() + offsetEnd);
        return begin.getTime() <= date.getTime() && date.getTime() <= end.getTime();
    };
