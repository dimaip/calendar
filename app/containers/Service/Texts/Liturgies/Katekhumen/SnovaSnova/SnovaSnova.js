import React from 'react';
import { makeIsEasterOffsetRange } from 'domain/getDayInfo';
import SnovaSnovaRu from './SnovaSnova.ru.mdx';
import SnovaSnovaCsj from './SnovaSnova.csj.mdx';

const langMap = {
    default: SnovaSnovaRu,
    ЦСЯ: SnovaSnovaCsj,
};

const SnovaSnova = ({ lang = 'default' }) => {
    const Component = langMap[lang];
    return <Component lang={lang} />
};

export default SnovaSnova;
