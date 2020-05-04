import React from 'react';
import Antifon2EasterRu from './Antifon2Easter.ru.mdx';
import Antifon2EasterCsj from './Antifon2Easter.csj.mdx';

const langMap = {
    default: Antifon2EasterRu,
    ЦСЯ: Antifon2EasterCsj,
};

const Antifon2Easter = ({ lang = 'default' }) => {
    const Component = langMap[lang];
    return <Component />;
};
export default Antifon2Easter;
