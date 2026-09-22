import React from 'react';
import { css } from 'emotion';
import { Link } from 'react-router-dom';
import TagManager from 'react-gtm-module';

const EasterService = (): JSX.Element => {
    return (
        <Link
            to="/date/2023-04-16/service/easterChin"
            title="На пасхальную службу"
            className={css`
                display: block;
            `}
            onClick={() =>
                TagManager.dataLayer({
                    dataLayer: {
                        event: 'EasterServiceFollow',
                    },
                })
            }
        >
            <img
                src="/assets/icons/easterService.svg"
                className={css`
                    display: block;
                    border-radius: 8px;
                `}
            />
        </Link>
    );
};
export default EasterService;
