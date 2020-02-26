import React from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';
import Loader from 'components/Loader/Loader';
import SectionHeading from './SectionHeading';
import { Link } from 'react-router-dom';
import RightIcon from 'components/svgs/RightIcon';

const Sermons = ({ sermons, date }) => {
    const theme = useTheme();

    if (!sermons) {
        return <Loader />;
    }

    return sermons.length ? (
        <>
            <SectionHeading>Проповедь</SectionHeading>
            {sermons.map(sermon => (
                <Link to={`/date/${date}/sermon/${sermon.id}`} key={sermon.id}>
                    <div
                        className={css`
                            border: 1px solid #d9dde5;
                            background-color: white;
                            border-radius: 8px;
                            margin-bottom: 18px;
                            padding: 14px 12px;
                        `}
                    >
                        <div
                            className={css`
                                display: flex;
                            `}
                        >
                            <div
                                className={css`
                                    flex-grow: 1;
                                    flex-shrink: 1;
                                `}
                            >
                                <p
                                    className={css`
                                        font-weight: bold;
                                        margin-bottom: 8px;
                                    `}
                                >
                                    {sermon.authorName}
                                </p>
                                <h3
                                    className={css`
                                        color: ${theme.colours.primary};
                                        margin-bottom: 8px;
                                    `}
                                >
                                    {sermon.title}
                                </h3>
                                <p
                                    className={css`
                                        font-size: 16px;
                                        color: ${theme.colours.gray};
                                    `}
                                >
                                    {sermon.teaser}
                                </p>
                            </div>
                            <div
                                className={css`
                                    flex-grow: 0;
                                    flex-shrink: 0;
                                `}
                            >
                                <RightIcon />
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </>
    ) : null;
};
export default Sermons;
