import React, { useCallback } from 'react';
import { css } from '@emotion/css';
import { useRecoilState } from 'recoil';

import SelectBox from '../../components/SelectBox/SelectBox';

import langState from 'state/langState';
import { markNavigationIntent } from 'utils/performanceMarks';

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
        (lang: string) => {
            markNavigationIntent({
                initiator: 'service-language-control',
                sourceLanguage: langStateValue.lang,
                targetLanguage: lang,
            });
            setLang({ ...langStateValue, lang });
        },
        [langStateValue, setLang]
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
