import { getFeastInfo, makeIsEasterOffsetRange } from 'domain/getDayInfo';

import React from 'react';
import useDay from 'hooks/useDay';

import VhodOblachenieMdx from './VhodOblachenie.mdx';

const VhodOblachenie = ({ date }): JSX.Element => {
    const isEasterOffsetRange = makeIsEasterOffsetRange(date);
    const { lpod, vasiliy } = getFeastInfo(new Date(date));
    const { data: day } = useDay(date);
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const greatLent = day?.fastName === 'Великий пост';
    const easterSeason = isEasterOffsetRange(0, 38);
    const props = { date, isEasterOffsetRange, greatLent, dayOfWeek, day, lpod, vasiliy, easterSeason };
    return <VhodOblachenieMdx {...props} />;
};
export default VhodOblachenie;
