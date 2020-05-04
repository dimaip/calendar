import React from 'react';
import Antifon3EasterRu from './Antifon3Easter.ru.mdx';
import Antifon3EasterCsj from './Antifon3Easter.csj.mdx';

const langMap = {
    default: Antifon3EasterRu,
    ЦСЯ: Antifon3EasterCsj,
};

const Antifon3Easter = ({ lang = 'default' }) => {
    const Component = langMap[lang];
    return <Component />;
};
export default Antifon3Easter;
