import React from 'react';
import SelectBox from '../../components/SelectBox/SelectBox';

const serviceLanguages = [
    {
        value: 'default',
        label: 'Рус',
    },
    {
        value: 'ЦСЯ',
        label: 'ЦСЯ',
    },
];

const LanguageSwitcher = ({ lang, setLang }) => <SelectBox items={serviceLanguages} value={lang} onChange={setLang} />;
export default LanguageSwitcher;
