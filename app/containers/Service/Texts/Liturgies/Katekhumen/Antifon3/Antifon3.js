import React from 'react';
import { makeIsEasterOffsetRange } from 'domain/getDayInfo';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

const Antifon3 = ({ lang, date: dateString }) => {
    const isEasterOffsetRange = makeIsEasterOffsetRange(dateString);
    if (isEasterOffsetRange(0, 6)) {
        return <MdxLoader path="Liturgies/Katekhumen/Antifon3Easer/Antifon3Easer" lang={lang} />;
    }

    return <MdxLoader path="Liturgies/Katekhumen/Antifon3/Antifon3" lang={lang} />;
};

export default Antifon3;
