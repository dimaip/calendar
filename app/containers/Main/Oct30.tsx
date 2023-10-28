import React from 'react';
import { css } from 'emotion';
import TagManager from 'react-gtm-module';

const Oct30 = (): JSX.Element => (
    <a
        href="https://youtube.com/playlist?list=PLGAQ8REn_6HC3m0y-G8HZ1yP97rb0eWta&si=_pq6sHaO0R0tFhew"
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
                display: block;
                border-radius: 8px;
                margin: 0 -10px 18px -10px;
            `}
        />
    </a>
);
export default Oct30;
