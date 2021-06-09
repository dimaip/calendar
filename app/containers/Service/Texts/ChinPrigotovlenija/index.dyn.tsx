import { makeIsEasterOffsetRange } from 'domain/getDayInfo';

import React from 'react';

import ChinPrigotovlenijaMdx from './ChinPrigotovlenija.mdx';

const ChinPrigotovlenija = ({ date }): JSX.Element => {
    const isEasterOffsetRange = makeIsEasterOffsetRange(date);
    const props = { date, isEasterOffsetRange };
    return <ChinPrigotovlenijaMdx {...props} />;
};
export default ChinPrigotovlenija;
