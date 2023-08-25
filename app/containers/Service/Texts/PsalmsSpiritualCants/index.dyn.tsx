import React from 'react';

import PsalmsSpiritualCantsMdx from './PsalmsSpiritualCants.mdx';

const PsalmsSpiritualCants = ({ date }): JSX.Element => {
    const props = { date };
    return <PsalmsSpiritualCantsMdx {...props} />;
};
export default PsalmsSpiritualCants;
