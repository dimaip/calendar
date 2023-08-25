import React from 'react';
import Parts from 'components/Parts/Parts';

import MdxLoader from '../../../MdxLoader';

const ZadastoinikFallback = ({ serviceType }) => {
    if (serviceType === 'vasiliy') {
        return <MdxLoader src="Liturgies/Vernie/Zadastoinik/ZadastoinikVV" />;
    }
    return <MdxLoader src="Liturgies/Vernie/Zadastoinik/Zadastoinik" />;
};

const Zadastoinik = ({ date, serviceType }) => (
    <Parts
        date={date}
        partNames={['liturgy.Задостойник']}
        fallback={<ZadastoinikFallback serviceType={serviceType} />}
        serviceType="Литургия"
    />
);
export default Zadastoinik;
