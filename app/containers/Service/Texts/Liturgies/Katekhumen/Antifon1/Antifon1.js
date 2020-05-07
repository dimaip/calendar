import React from 'react';
import { makeIsEasterOffsetRange } from 'domain/getDayInfo';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

const Antifon1 = ({ lang, date: dateString }) => {
    const isEasterOffsetRange = makeIsEasterOffsetRange(dateString);
    if (isEasterOffsetRange(0, 6)) {
        return <MdxLoader src="Liturgies/Katekhumen/Antifon1Easer" lang={lang} />;
    }

    return <MdxLoader src="Liturgies/Katekhumen/Antifon1" lang={lang} />;
};

export default Antifon1;
