import React from 'react';
import { css } from 'emotion';
import TagManager from 'react-gtm-module';

const Sing = (): JSX.Element => {
    return (
        <a
            href="https://youtube.com/playlist?list=PLGAQ8REn_6HC2pvP0pwmgL5b0YDGpW5or&si=jz8YHVWCgRg9fI20"
            target="_blank"
            title="Песнопения на русском языке"
            className={css`
                display: block;
            `}
            onClick={() =>
                TagManager.dataLayer({
                    dataLayer: {
                        event: 'SingFollow',
                    },
                })
            }
        >
            <img
                src="/assets/sing.svg"
                className={css`
                    display: block;
                    border-radius: 8px;
                `}
            />
        </a>
    );
};
export default Sing;
