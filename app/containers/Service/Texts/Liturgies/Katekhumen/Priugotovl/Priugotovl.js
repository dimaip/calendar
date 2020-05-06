import React from 'react';
import PriugotovlRu from './Priugotovl.ru.mdx';
import PriugotovlCsj from './Priugotovl.csj.mdx';

const langMap = {
    default: PriugotovlRu,
    ЦСЯ: PriugotovlCsj,
};

const Priugotovl = ({ lang = 'default' }) => {
    const Component = langMap[lang];
    return <Component lang={lang} />;
};

export default Priugotovl;
