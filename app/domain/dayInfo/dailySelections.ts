import { makeIsDate, makeIsEasterOffsetRange } from './calendar';

export const isAntifonVsednev = (dateObj: Date): boolean => {
    if (dateObj.getDay() === 0 || dateObj.getDay() === 6) {
        return false;
    }
    const isEasterOffsetRange = makeIsEasterOffsetRange(dateObj);
    if (isEasterOffsetRange(0, 56)) {
        return false;
    }
    const dateOld = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate() - 13);
    const isDate = makeIsDate(dateOld);
    return Boolean(
        [
            [12, 2],
            [12, 8],
            [12, 11],
            [12, 14],
            [12, 16],
            [12, 19],
            [2, 10],
            [2, 13],
            [2, 14],
            [2, 15],
            [2, 16],
            [2, 18],
            [2, 19],
            [2, 20],
            [2, 21],
            [2, 22],
            [2, 23],
            [2, 25],
            [2, 26],
            [2, 27],
            [2, 28],
            [3, 1],
            [5, 18],
            [5, 22],
            [5, 26],
            [5, 28],
            [5, 29],
            [5, 30],
            [5, 31],
            [6, 2],
            [6, 5],
            [6, 7],
            [6, 13],
            [6, 17],
            [6, 20],
            [6, 22],
            [7, 9],
            [7, 16],
            [7, 18],
            [7, 21],
            [7, 29],
            [8, 4],
            [8, 25],
            [8, 27],
            [9, 22],
            [10, 8],
            [10, 11],
            [10, 12],
            [10, 14],
            [10, 15],
            [10, 16],
            [10, 17],
            [10, 19],
            [10, 25],
            [10, 27],
            [10, 29],
            [10, 30],
            [10, 31],
            [11, 2],
            [11, 3],
            [11, 4],
            [11, 7],
            [11, 10],
            [11, 15],
            [11, 18],
            [11, 26],
            [11, 29],
        ].find((dateTuple) => isDate(dateTuple[0], dateTuple[1]))
    );
};
export const isHymnsVsednev = (dateObj: Date): boolean => {
    const isEasterOffsetRange = makeIsEasterOffsetRange(dateObj);
    if (isEasterOffsetRange(0, 56)) {
        return false;
    }
    const dateOld = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate() - 13);
    const isDate = makeIsDate(dateOld);
    return Boolean(
        [
            [12, 2],
            [12, 8],
            [12, 11],
            [12, 12],
            [12, 14],
            [12, 16],
            [12, 17],
            [12, 19],
            [1, 15],
            [1, 16],
            [1, 19],
            [1, 22],
            [1, 23],
            [1, 28],
            [1, 29],
            [2, 10],
            [2, 13],
            [2, 14],
            [2, 15],
            [2, 16],
            [2, 19],
            [2, 20],
            [2, 21],
            [2, 22],
            [2, 26],
            [2, 27],
            [5, 22],
            [5, 28],
            [5, 30],
            [5, 31],
            [6, 2],
            [6, 5],
            [6, 6],
            [6, 7],
            [6, 8],
            [6, 12],
            [6, 13],
            [6, 17],
            [6, 20],
            [6, 22],
            [7, 1],
            [7, 9],
            [7, 13],
            [7, 16],
            [7, 17],
            [7, 18],
            [7, 21],
            [7, 22],
            [7, 29],
            [8, 4],
            [8, 25],
            [8, 27],
            [9, 3],
            [9, 5],
            [9, 6],
            [9, 22],
            [9, 24],
            [10, 2],
            [10, 3],
            [10, 8],
            [10, 11],
            [10, 12],
            [10, 16],
            [10, 17],
            [10, 19],
            [10, 20],
            [10, 21],
            [10, 25],
            [10, 27],
            [10, 29],
            [10, 30],
            [10, 31],
            [11, 1],
            [11, 2],
            [11, 3],
            [11, 4],
            [11, 7],
            [11, 10],
            [11, 12],
            [11, 15],
            [11, 18],
            [11, 26],
            [11, 29],
        ].find((dateTuple) => isDate(dateTuple[0], dateTuple[1]))
    );
};

export const isNedelaSkorbi = (dateObj: Date): boolean => {
    const isDate = makeIsDate(dateObj);
    const y = dateObj.getFullYear();
    return (
        new Date(y, 9, 30).getTime() <= dateObj.getTime() &&
        dateObj.getTime() < new Date(y, 10, 8).getTime() &&
        !isDate(11, 4) &&
        !isDate(11, 5)
    );
};
