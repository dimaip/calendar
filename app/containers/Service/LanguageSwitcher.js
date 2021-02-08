import React from 'react';
import { css } from 'emotion';
import { useRecoilState } from 'recoil';
import langState from 'state/langState';

import SelectBox from '../../components/SelectBox/SelectBox';

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
    const [langStateValue, setLang] = useRecoilState(langState);
    return (
        <SelectBox
            className={css`
                max-width: 59px;
            `}
            items={serviceLanguages}
            value={langStateValue.lang}
            onChange={(lang) => setLang({ ...langStateValue, lang: lang })}
        />
    );
};
export default LanguageSwitcher;
