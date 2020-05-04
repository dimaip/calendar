import React from 'react';
import { makeIsEasterOffsetRange } from 'domain/getDayInfo';
import Antifon2Ru from './Antifon2.ru.mdx';
import Antifon2Csj from './Antifon2.csj.mdx';
import Antifon2Easter from '../Antifon2Easter/Antifon2Easter';

const langMap = {
    default: Antifon2Ru,
    ЦСЯ: Antifon2Csj,
};

const Antifon2Sunday = ({ lang = 'default' }) => {
    const Component = langMap[lang];
    return <Component />;
};

const Antifon2 = ({ lang, date: dateString }) => {
    const isEasterOffsetRange = makeIsEasterOffsetRange(dateString);
    if (isEasterOffsetRange(0, 6)) {
        return <Antifon2Easter lang={lang} />;
    }

    return <Antifon2Sunday lang={lang} />;
};

export default Antifon2;
