import { makeIsEasterOffsetRange } from 'domain/getDayInfo';

import React from 'react';
import useDay from 'hooks/useDay';

import VelikoePovecherieMdx from './VelikoePovecherie.mdx';

const VelikoePovecherie = ({ date }: { date: string }): JSX.Element => {
    const isEasterOffsetRange = makeIsEasterOffsetRange(date);
    const { data: day } = useDay(date);
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const props = { date, isEasterOffsetRange, dayOfWeek, day };
    return <VelikoePovecherieMdx {...props} />;
};
export default VelikoePovecherie;
