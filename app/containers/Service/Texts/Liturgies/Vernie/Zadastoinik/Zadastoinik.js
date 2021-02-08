import React from 'react';
import Parts from 'components/Parts/Parts';

import MdxLoader from '../../../MdxLoader';

const Zadastoinik = ({ date }) => (
    <Parts
        date={date}
        partNames={['liturgy.Задостойник']}
        fallback={<MdxLoader src="Liturgies/Vernie/Zadastoinik" />}
    />
);
export default Zadastoinik;
