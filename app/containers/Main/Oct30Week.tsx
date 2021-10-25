import React from 'react';
import { css } from 'emotion';
import { Link, useParams } from 'react-router-dom';

const Oct30Week = (): JSX.Element => {
    const { date } = useParams();
    return (
        <Link
            to={`/date/${date}/service/molitvaPamyati`}
            title="На службу"
            className={css`
                display: block;
            `}
        >
            <img
                src="/assets/Oct30Week.svg"
                className={css`
                    background-color: white;
                    display: block;
                    border-radius: 8px;
                `}
            />
        </Link>
    );
};
export default Oct30Week;
