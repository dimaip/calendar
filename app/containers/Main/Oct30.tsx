import React from 'react';
import { css } from 'emotion';
import TagManager from 'react-gtm-module';

const Oct30 = (): JSX.Element => (
    <a
        href="https://molitvapamyaty.ru/"
        target="_blank"
        onClick={() =>
            TagManager.dataLayer({
                dataLayer: {
                    event: 'Oct30Follow',
                },
            })
        }
    >
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
