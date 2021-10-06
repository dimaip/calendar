import React from 'react';
import { css } from 'emotion';

const Oct30 = (): JSX.Element => (
    <a href="https://molitvapamyaty.ru/" target="_blank">
        <img
            src="/assets/Oct30.svg"
            className={css`
                background-color: white;
                display: block;
                border-radius: 8px;
                margin: 0 -10px 18px -10px;
            `}
        />
    </a>
);
export default Oct30;
