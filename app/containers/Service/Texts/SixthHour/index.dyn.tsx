import { makeIsEasterOffsetRange } from 'domain/getDayInfo';

import React from 'react';
import useDay from 'hooks/useDay';

import SixthHourMdx from './SixthHour.mdx';

const SixthHour = ({ date }): JSX.Element => {
    const isEasterOffsetRange = makeIsEasterOffsetRange(date);
    const { data: day } = useDay(date);
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const greatLent = day?.fastName === 'Великий пост';
    const props = { date, isEasterOffsetRange, greatLent, dayOfWeek, day };
    return <SixthHourMdx {...props} />;
};
export default SixthHour;
