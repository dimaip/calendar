import React, { useCallback } from 'react';
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
    const onChange = useCallback(
        (lang) => {
            setLang({ ...langStateValue, lang });
        },
        [JSON.stringify(langStateValue)]
    );
    return (
        <SelectBox
            className={css`
                max-width: 59px;
            `}
            items={serviceLanguages}
            value={langStateValue.lang}
            onChange={onChange}
        />
    );
};
export default LanguageSwitcher;
