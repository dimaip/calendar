import React from 'react';
import Html from 'components/Html/Html';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

const VhodnoiStih = ({ day }) => {
    const vhodnoiStih = day?.parts?.liturgy?.['Входной стих'];
    if (vhodnoiStih) {
        return <Html html={vhodnoiStih} />;
    }

    return <MdxLoader src="Liturgies/Katekhumen/VhodnoiStih" />;
};

export default VhodnoiStih;
