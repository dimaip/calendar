import React from 'react';
import MdxLoader from 'containers/Service/Texts/MdxLoader';
import Parts from 'components/Parts/Parts';

const Prichasten = ({ date }) => (
    <Parts
        date={date}
        partNames={['liturgy.Причастен']}
        alwaysShowFallback
        fallback={<MdxLoader src={`Lpod/Prichasten`} />}
        serviceType="Литургия"
    />
);

export default Prichasten;
