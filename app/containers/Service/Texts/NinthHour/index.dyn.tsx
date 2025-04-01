import { makeIsEasterOffsetRange } from 'domain/getDayInfo';

import React from 'react';
import useDay from 'hooks/useDay';

import NinthHourMdx from './NinthHour.mdx';

const NinthHour = ({ date }): JSX.Element => {
    const isEasterOffsetRange = makeIsEasterOffsetRange(date);
    const { data: day } = useDay(date);
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const greatLent = day?.fastName === 'Великий пост';
    const props = { date, isEasterOffsetRange, greatLent, dayOfWeek, day };
    return <NinthHourMdx {...props} />;
};
export default NinthHour;
