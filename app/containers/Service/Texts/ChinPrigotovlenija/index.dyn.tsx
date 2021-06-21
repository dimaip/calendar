import { makeIsEasterOffsetRange } from 'domain/getDayInfo';

import React from 'react';
import useDay from 'hooks/useDay';

import ChinPrigotovlenijaMdx from './ChinPrigotovlenija.mdx';

const ChinPrigotovlenija = ({ date }): JSX.Element => {
    const isEasterOffsetRange = makeIsEasterOffsetRange(date);
    const { data: day } = useDay(date);
    const greatLent = day?.fastName === 'Великий пост';
    const props = { date, isEasterOffsetRange, greatLent };
    return <ChinPrigotovlenijaMdx {...props} />;
};
export default ChinPrigotovlenija;
