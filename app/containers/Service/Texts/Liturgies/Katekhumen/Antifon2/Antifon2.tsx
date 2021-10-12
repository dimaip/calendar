import { makeIsEasterOffsetRange, makeIsDate, isAntifonVsednev } from 'domain/getDayInfo';

import React from 'react';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

const Antifon2 = ({ date: dateString }: { date: string }): JSX.Element => {
    const isEasterOffsetRange = makeIsEasterOffsetRange(dateString);
    const isDate = makeIsDate(dateString);
    if (isEasterOffsetRange(0, 6)) {
        return <MdxLoader src="Liturgies/Katekhumen/Antifon2Easter" />;
    }
    if (isEasterOffsetRange(39)) {
        return <MdxLoader src="Liturgies/Katekhumen/Antifon2Ascension" />;
    }
    if (isEasterOffsetRange(49)) {
        return <MdxLoader src="Liturgies/Katekhumen/Antifon2Pentecost" />;
    }
    if (isEasterOffsetRange(-7)) {
        return <MdxLoader src="Liturgies/Katekhumen/Antifon2VhodGospoden" />;
    }
    if (isDate(8, 19)) {
        return <MdxLoader src="Liturgies/Katekhumen/Antifon2Transfiguration" />;
    }
    if (isDate(9, 27)) {
        return <MdxLoader src="Liturgies/Katekhumen/Antifon2Vozdvijenie" />;
    }
    if (isDate(1, 7)) {
        return <MdxLoader src="Liturgies/Katekhumen/Antifon2Christmas" />;
    }
    if (isDate(1, 19)) {
        return <MdxLoader src="Liturgies/Katekhumen/Antifon2Epiphany" />;
    }
    if (isAntifonVsednev(new Date(dateString))) {
        return <MdxLoader src="Liturgies/Katekhumen/AntifonVsednev2" />;
    }

    return <MdxLoader src="Liturgies/Katekhumen/Antifon2" />;
};

export default Antifon2;
