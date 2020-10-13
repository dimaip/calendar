import React from 'react';
import MdxLoader from 'containers/Service/Texts/MdxLoader';
import Parts from 'components/Parts/Parts';

const DefaultVhodnoiStih = ({ date }) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    if (dayOfWeek === 0) {
        return <MdxLoader src={'Liturgies/Katekhumen/VhodnoiStih/Sunday'} />;
    }
    return <MdxLoader src={'Liturgies/Katekhumen/VhodnoiStih/Budni'} />;
};

const VhodnoiStih = ({ date }) => (
    <Parts
        partNames={['liturgy.Входной стих']}
        date={date}
        fallback={<DefaultVhodnoiStih date={date} />}
    />
);

export default VhodnoiStih;
