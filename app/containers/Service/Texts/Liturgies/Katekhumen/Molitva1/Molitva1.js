import React from 'react';
import { makeIsEasterOffsetRange } from 'domain/getDayInfo';
import Molitva1Ru from './Molitva1.ru.mdx';
import Molitva1Csj from './Molitva1.csj.mdx';

const langMap = {
    default: Molitva1Ru,
    ЦСЯ: Molitva1Csj,
};

const Molitva1 = ({ lang }) => {
    const Component = langMap[lang];

    return <Component lang={lang} />;
};

export default Molitva1;
