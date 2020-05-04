import React from 'react';
import { makeIsEasterOffsetRange } from 'domain/getDayInfo';
import VelikajaEkteniaRu from './VelikajaEktenia.ru.mdx';
import VelikajaEkteniaCsj from './VelikajaEktenia.csj.mdx';

const langMap = {
    default: VelikajaEkteniaRu,
    ЦСЯ: VelikajaEkteniaCsj,
};

const VelikajaEktenia = ({ lang = 'default' }) => {
    const Component = langMap[lang];
    return <Component lang={lang} />
};

export default VelikajaEktenia;
