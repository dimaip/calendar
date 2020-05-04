import React from 'react';
import { makeIsEasterOffsetRange } from 'domain/getDayInfo';
import Antifon1Ru from './Antifon1.ru.mdx';
import Antifon1Csj from './Antifon1.csj.mdx';
import Antifon1Easter from '../Antifon1Easter/Antifon1Easter';

const langMap = {
    default: Antifon1Ru,
    ЦСЯ: Antifon1Csj,
};

const Antifon1Sunday = ({ lang = 'default' }) => {
    const Component = langMap[lang];
    return <Component />;
};

const Antifon1 = ({ lang, date: dateString }) => {
    const isEasterOffsetRange = makeIsEasterOffsetRange(dateString);
    if (isEasterOffsetRange(0, 6)) {
        return <Antifon1Easter lang={lang} />;
    }

    return <Antifon1Sunday lang={lang} />;
};

export default Antifon1;
