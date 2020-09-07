import React from 'react';
import MdxLoader from 'containers/Service/Texts/MdxLoader';
import Parts from 'components/Parts/Parts';

const VhodnoiStih = ({ date }) => (
    <Parts
        partNames={['liturgy.Входной стих']}
        date={date}
        fallback={<MdxLoader src="Liturgies/Katekhumen/VhodnoiStih" />}
    />
);

export default VhodnoiStih;
