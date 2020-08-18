import React from 'react';
import { makeIsEasterOffsetRange, makeIsDate } from 'domain/getDayInfo';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

const Antifon1 = ({ date: dateString }) => {
    const isEasterOffsetRange = makeIsEasterOffsetRange(dateString);
    const isDate = makeIsDate(dateString);
    if (isEasterOffsetRange(0, 6)) {
        return <MdxLoader src="Liturgies/Katekhumen/Antifon1Easter" />;
    }
    if (isEasterOffsetRange(39)) {
        return <MdxLoader src="Liturgies/Katekhumen/Antifon1Ascension" />;
    }
    if (isEasterOffsetRange(49)) {
        return <MdxLoader src="Liturgies/Katekhumen/Antifon1Pentecost" />;
    }
    if (isDate(8, 19)) {
        return <MdxLoader src="Liturgies/Katekhumen/Antifon1Transfiguration" />;
    }

    return <MdxLoader src="Liturgies/Katekhumen/Antifon1" />;
};

export default Antifon1;
