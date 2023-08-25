import React from 'react';
import MdxLoader from 'containers/Service/Texts/MdxLoader';
import Parts from 'components/Parts/Parts';

const DefaultPrichasten = ({ date }) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    return <MdxLoader src={`Liturgies/Vernie/Prichasten/${dayOfWeek}`} />;
};

const Prichastens = ({ day, date }) => (
    <Parts
        date={date}
        partNames={['liturgy.Причастен']}
        alwaysShowFallback
        fallback={<DefaultPrichasten date={date} />}
        serviceType="Литургия"
    />
);

export default Prichastens;
