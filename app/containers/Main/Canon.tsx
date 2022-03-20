import React from 'react';
import { css } from 'emotion';
import { Link, useParams } from 'react-router-dom';
import TagManager from 'react-gtm-module';

const Canon = (): JSX.Element => {
    const { date } = useParams();
    return (
        <Link
            to={`/date/${date}/service/velikoePovecherie`}
            title="На службу"
            className={css`
                display: block;
            `}
            onClick={() =>
                TagManager.dataLayer({
                    dataLayer: {
                        event: 'CanonFollow',
                    },
                })
            }
        >
            <img
                src="/assets/canon.svg"
                className={css`
                    display: block;
                    border-radius: 8px;
                `}
            />
        </Link>
    );
};
export default Canon;
