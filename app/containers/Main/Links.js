import React from 'react';
import { css } from 'emotion';
import ExternalLink from 'components/svgs/ExternalLink';
import { useParams } from 'react-router-dom';

const Links = () => {
    const { date } = useParams();
    return (
        <div
            className={css`
                background-color: #201f24;
                padding: 12px 24px;
            `}
        >
            <a
                href={`http://www.patriarchia.ru/bu/${date}`}
                target="_blank"
                className={css`
                    color: white;
                    text-transform: uppercase;
                    font-size: 12px;
                    font-weight: bold;
                `}
            >
                <span
                    className={css`
                        display: inline-block;
                        margin-right: 12px;
                        margin-bottom: -3px;
                        vertical-align: sub;
                    `}
                >
                    <ExternalLink />
                </span>
                Богослужебные указания
            </a>
        </div>
    );
};
export default Links;
