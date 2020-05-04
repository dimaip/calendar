import React from 'react';
import { makeIsEasterOffsetRange } from 'domain/getDayInfo';
import MalajaEkteniaRu from './MalajaEktenia.ru.mdx';
import MalajaEkteniaCsj from './MalajaEktenia.csj.mdx';

const langMap = {
    default: MalajaEkteniaRu,
    ЦСЯ: MalajaEkteniaCsj,
};

const MalajaEktenia = ({ lang = 'default' }) => {
    const Component = langMap[lang];
    return <Component lang={lang} />
};

export default MalajaEktenia;
