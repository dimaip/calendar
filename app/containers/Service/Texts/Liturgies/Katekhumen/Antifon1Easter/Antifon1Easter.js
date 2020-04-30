import React from 'react';
import Antifon1EasterRu from './Antifon1Easter.ru.mdx';
import Antifon1EasterCsj from './Antifon1Easter.csj.mdx';

const langMap = {
    default: Antifon1EasterRu,
    ЦСЯ: Antifon1EasterCsj,
};

const Antifon1Easter = ({ lang = 'default' }) => {
    const Component = langMap[lang];
    return <Component />;
};
export default Antifon1Easter;
