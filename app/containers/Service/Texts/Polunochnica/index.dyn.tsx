import { makeIsEasterOffsetRange, calculateEasterDate, getFeastInfo } from 'domain/getDayInfo';

import dateFormat from 'dateformat';
import React from 'react';
import useDay from 'hooks/useDay';

import PolunochnicaMdx from './Polunochnica.mdx';

const Polunochnica = ({ date }): JSX.Element => {
    const tomorrowDateObj = new Date(date);
    tomorrowDateObj.setDate(tomorrowDateObj.getDate() + 1);
    const tomorrowDate = dateFormat(tomorrowDateObj, 'yyyy-mm-dd');

    const dayOfWeek = tomorrowDateObj.getDay();

    const isEasterOffsetRange = makeIsEasterOffsetRange(tomorrowDate);

    const { data: tomorrowDay } = useDay(tomorrowDate);

    const greatLent = tomorrowDay?.fastName === 'Великий пост';

    const y = tomorrowDateObj.getFullYear();

    const oct4 = new Date(y, 9, 4);
    const verbnoe = calculateEasterDate(y);
    verbnoe.setDate(verbnoe.getDate() - 7);

    const afterOct4BeforeVerbnoe = tomorrowDateObj < verbnoe || tomorrowDateObj > oct4;

    const { feastType } = getFeastInfo(tomorrowDateObj);
    const isHoliday = feastType === 'great' || feastType === '12';

    const props = {
        date: tomorrowDate,
        isEasterOffsetRange,
        greatLent,
        dayOfWeek,
        isHoliday,
        day: tomorrowDay || {},
        afterOct4BeforeVerbnoe,
    };

    return <PolunochnicaMdx {...props} />;
};
export default Polunochnica;
