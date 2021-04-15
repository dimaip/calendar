import { makeIsEasterOffsetRange, makeIsDate } from 'domain/getDayInfo';

import React from 'react';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

const Antifon3 = ({ date: dateString }) => {
    const isEasterOffsetRange = makeIsEasterOffsetRange(dateString);
    const isDate = makeIsDate(dateString);
    if (isEasterOffsetRange(0, 6)) {
        return <MdxLoader src="Liturgies/Katekhumen/Antifon3Easter" />;
    }
    if (isEasterOffsetRange(39)) {
        return <MdxLoader src="Liturgies/Katekhumen/Antifon3Ascension" />;
    }
    if (isEasterOffsetRange(49)) {
        return <MdxLoader src="Liturgies/Katekhumen/Antifon3Pentecost" />;
    }
    if (isEasterOffsetRange(-7)) {
        return <MdxLoader src="Liturgies/Katekhumen/Antifon3VhodGospoden" />;
    }
    if (isDate(8, 19)) {
        return <MdxLoader src="Liturgies/Katekhumen/Antifon3Transfiguration" />;
    }
    if (isDate(9, 27)) {
        return <MdxLoader src="Liturgies/Katekhumen/Antifon3Vozdvijenie" />;
    }
    if (isDate(1, 7)) {
        return <MdxLoader src="Liturgies/Katekhumen/Antifon3Christmas" />;
    }
    if (isDate(1, 19)) {
        return <MdxLoader src="Liturgies/Katekhumen/Antifon3Epiphany" />;
    }

    return <MdxLoader src="Liturgies/Katekhumen/Antifon3" />;
};

export default Antifon3;
