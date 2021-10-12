import { makeIsEasterOffsetRange, makeIsDate, isAntifonVsednev } from 'domain/getDayInfo';

import React from 'react';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

const Antifon1 = ({ date: dateString }: { date: string }): JSX.Element => {
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
    if (isEasterOffsetRange(-7)) {
        return <MdxLoader src="Liturgies/Katekhumen/Antifon1VhodGospoden" />;
    }
    if (isDate(8, 19)) {
        return <MdxLoader src="Liturgies/Katekhumen/Antifon1Transfiguration" />;
    }
    if (isDate(9, 27)) {
        return <MdxLoader src="Liturgies/Katekhumen/Antifon1Vozdvijenie" />;
    }
    if (isDate(1, 7)) {
        return <MdxLoader src="Liturgies/Katekhumen/Antifon1Christmas" />;
    }
    if (isDate(1, 19)) {
        return <MdxLoader src="Liturgies/Katekhumen/Antifon1Epiphany" />;
    }
    if (isAntifonVsednev(new Date(dateString))) {
        return <MdxLoader src="Liturgies/Katekhumen/AntifonVsednev1" />;
    }

    return <MdxLoader src="Liturgies/Katekhumen/Antifon1" />;
};

export default Antifon1;
