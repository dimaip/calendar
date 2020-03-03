import React from 'react';
import { css } from 'emotion';

const LanguageSwitcher = ({ lang, setLang }) => (
    <div
        onClick={() => setLang(lang === 'ЦСЯ' ? 'default' : 'ЦСЯ')}
        role="button"
        className={css`
            cursor: pointer;
            padding: 8px 6px 3px 6px;
            margin-right: 6px;
            border-radius: 8px;
            color: ${lang === 'ЦСЯ' ? 'white' : 'inherit'};
            background-color: ${lang === 'ЦСЯ' ? 'gray' : 'white'};
        `}
    >
        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 400 440" width="16">
            <path
                d="M187.57.442c-16.544.166-26.08 1.862-34.412 15.099v170.734s.615 19.322-23.513 19.322H18.043S.546 207.411.546 223.098v130.32s-4.83 12.064 45.84 12.064c50.667 0 53.095-10.849 53.095-10.849v-109.23s-.15-13.832 23.962-13.832c32.134 0 29.715 9.628 29.715 12.644v182.798s-1.016 12.565 46.842 12.565 46.842-12.565 46.842-12.565V244.215c0-3.016-2.42-12.644 29.715-12.644 24.111 0 23.988 13.832 23.988 13.832v109.23s2.402 10.85 53.07 10.85 45.839-12.064 45.839-12.064v-130.32c0-15.688-17.497-17.502-17.497-17.502H270.382c-24.128 0-23.54-19.322-23.54-19.322V15.54C236.65-.651 224.64.428 200.212.44h-.423c-4.46-.002-8.524-.037-12.219 0z"
                fillRule="evenodd"
                fill={lang === 'ЦСЯ' ? 'white' : 'black'}
                strokeWidth=".845"
            />
        </svg>
    </div>
);
export default LanguageSwitcher;
