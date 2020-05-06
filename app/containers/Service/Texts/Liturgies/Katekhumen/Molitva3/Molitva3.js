import React from 'react';
import { makeIsEasterOffsetRange } from 'domain/getDayInfo';
import Molitva3Ru from './Molitva3.ru.mdx';
import Molitva3Csj from './Molitva3.csj.mdx';

const langMap = {
    default: Molitva3Ru,
    ЦСЯ: Molitva3Csj,
};

const Molitva3 = ({ lang }) => {
    const Component = langMap[lang];

    return <Component lang={lang} />;
};

export default Molitva3;
