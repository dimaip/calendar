import { makeIsEasterOffsetRange } from 'domain/getDayInfo';

import React from 'react';
import { css } from 'emotion';
import useDay from 'hooks/useDay';

import EasterHoursMdx from './EasterHours.mdx';

const EasterHours = ({ date }): JSX.Element => {
    const isEasterOffsetRange = makeIsEasterOffsetRange(date);
    const { data: day } = useDay(date);
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();

    const props = { date, isEasterOffsetRange, dayOfWeek, day };
    return <EasterHoursMdx {...props} />;
};
export default EasterHours;
