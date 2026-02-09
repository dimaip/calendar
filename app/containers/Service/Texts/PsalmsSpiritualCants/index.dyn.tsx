import React from 'react';

import PsalmsSpiritualCantsMdx from './PsalmsSpiritualCants.mdx';
import { makeIsEasterOffsetRange } from 'domain/getDayInfo';

const PsalmsSpiritualCants = ({ date }): JSX.Element => {
    const isEasterOffsetRange = makeIsEasterOffsetRange(date);
    const props = { date, isEasterOffsetRange };
    return <PsalmsSpiritualCantsMdx {...props} />;
};
export default PsalmsSpiritualCants;
