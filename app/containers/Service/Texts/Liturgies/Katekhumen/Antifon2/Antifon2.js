import React from 'react';
import { makeIsEasterOffsetRange } from 'domain/getDayInfo';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

const Antifon2 = ({ lang, date: dateString }) => {
    const isEasterOffsetRange = makeIsEasterOffsetRange(dateString);
    if (isEasterOffsetRange(0, 6)) {
        return <MdxLoader path="Liturgies/Katekhumen/Antifon2Easer/Antifon2Easer" lang={lang} />;
    }

    return <MdxLoader path="Liturgies/Katekhumen/Antifon2/Antifon2" lang={lang} />;
};

export default Antifon2;
