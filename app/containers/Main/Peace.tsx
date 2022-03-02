import React from 'react';
import { css } from 'emotion';
import { Link, useParams } from 'react-router-dom';
import TagManager from 'react-gtm-module';

const Peace = (): JSX.Element => {
    const { date } = useParams();
    return (
        <Link
            to={`/date/${date}/service/bratMolitvoslov`}
            title="На службу"
            className={css`
                display: block;
            `}
            onClick={() =>
                TagManager.dataLayer({
                    dataLayer: {
                        event: 'PeaceFollow',
                    },
                })
            }
        >
            <img
                src="/assets/peace.svg"
                className={css`
                    background-color: white;
                    display: block;
                    border-radius: 8px;
                `}
            />
        </Link>
    );
};
export default Peace;
