import { makeIsEasterOffsetRange, getFeastInfo } from 'domain/getDayInfo';

import React from 'react';

import BlagodarstvennieMdx from './Blagodarstvennie.mdx';

const Blagodarstvennie = ({ date }): JSX.Element => {
    const { vasiliy, lpod } = getFeastInfo(new Date(date));
    const isEasterOffsetRange = makeIsEasterOffsetRange(date);
    const props = { date, isEasterOffsetRange, vasiliy, lpod };
    return <BlagodarstvennieMdx {...props} />;
};
export default Blagodarstvennie;
