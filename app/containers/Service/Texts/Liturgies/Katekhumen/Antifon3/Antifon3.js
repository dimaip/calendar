import React from 'react';
import Tooltip from 'components/Tooltip/Tooltip';
import { makeIsEasterOffsetRange } from 'domain/getDayInfo';
import Antifon3Ru from './Antifon3.ru.mdx';
import Antifon3Csj from './Antifon3.csj.mdx';
import Antifon3Easter from '../Antifon3Easter/Antifon3Easter';

const langMap = {
    default: Antifon3Ru,
    ЦСЯ: Antifon3Csj,
};

const Antifon3Sunday = ({ lang = 'default' }) => {
    const Component = langMap[lang];
    return <Component />;
};

const Antifon3 = ({ lang, date: dateString }) => {
    const isEasterOffsetRange = makeIsEasterOffsetRange(dateString);
    if (isEasterOffsetRange(0, 6)) {
        return <Antifon3Easter />;
    }

    return <Antifon3Sunday lang={lang} />;
};

export default Antifon3;
