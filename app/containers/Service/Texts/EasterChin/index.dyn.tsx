import { makeIsEasterOffsetRange } from 'domain/getDayInfo';

import dateFormat from 'dateformat';
import React from 'react';
import useDay from 'hooks/useDay';

import EasterChinMdx from './EasterChin.mdx';

const EasterChin = ({ date }): JSX.Element => {
    const isEasterOffsetRange = makeIsEasterOffsetRange(date);
    const { data: day } = useDay(date);
    const dateObj = new Date(date);
    const yesterdayDateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();

    yesterdayDateObj.setDate(yesterdayDateObj.getDate() - 1);
    const yesterdayDate = dateFormat(yesterdayDateObj, 'yyyy-mm-dd');

    const props = { date, isEasterOffsetRange, dayOfWeek, day, yesterdayDate };
    return <EasterChinMdx {...props} />;
};
export default EasterChin;
