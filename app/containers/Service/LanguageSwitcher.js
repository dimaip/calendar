import React, { useContext } from 'react';
import SelectBox from '../../components/SelectBox/SelectBox';
import { css } from 'emotion';
import { LangContext, LangDispatchContext } from './useLangReducer';

const serviceLanguages = [
    {
        value: 'ru',
        label: 'РУС',
    },
    {
        value: 'csj',
        label: 'ЦСЯ',
    },
    {
        value: 'parallel',
        label: 'Параллельно',
    },
];

const LanguageSwitcher = () => {
    const { lang } = useContext(LangContext);
    const dispatch = useContext(LangDispatchContext);
    const setLang = lang => {
        dispatch({ type: 'setLang', lang });
    };
    return (
        <SelectBox
            className={css`
                max-width: 59px;
            `}
            items={serviceLanguages}
            value={lang}
            onChange={setLang}
        />
    );
};
export default LanguageSwitcher;
