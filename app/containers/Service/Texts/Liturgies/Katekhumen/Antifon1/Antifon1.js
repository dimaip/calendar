import React from 'react';
import { makeIsEasterOffsetRange } from 'domain/getDayInfo';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

const Antifon1 = ({ lang, date: dateString }) => {
    const isEasterOffsetRange = makeIsEasterOffsetRange(dateString);
    if (isEasterOffsetRange(0, 6)) {
        return <MdxLoader path="Liturgies/Katekhumen/Antifon1Easer/Antifon1Easer" lang={lang} />;
    }

    return <MdxLoader path="Liturgies/Katekhumen/Antifon1/Antifon1" lang={lang} />;
};

export default Antifon1;
