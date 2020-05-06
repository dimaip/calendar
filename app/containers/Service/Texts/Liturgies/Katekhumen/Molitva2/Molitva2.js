import React from 'react';
import { makeIsEasterOffsetRange } from 'domain/getDayInfo';
import Molitva2Ru from './Molitva2.ru.mdx';
import Molitva2Csj from './Molitva2.csj.mdx';

const langMap = {
    default: Molitva2Ru,
    ЦСЯ: Molitva2Csj,
};

const Molitva2 = ({ lang }) => {
    const Component = langMap[lang];

    return <Component lang={lang} />;
};

export default Molitva2;
