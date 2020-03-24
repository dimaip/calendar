import React from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';
import Loader from 'components/Loader/Loader';
import SectionHeading from './SectionHeading';
import { Link } from 'react-router-dom';
import RightIcon from 'components/svgs/RightIcon';
import ButtonBox from 'components/ButtonBox/ButtonBox';

const Sermons = ({ sermons, date, hideTitle = false }) => {
    const theme = useTheme();

    return sermons?.length ? (
        <>
            {!hideTitle && <SectionHeading>Проповедь</SectionHeading>}
            <div
                className={css`
                    margin: 0 -10px 18px -10px;
                `}
            >
                {sermons.map(sermon => (
                    <Link to={`/date/${date}/sermon/${sermon.id}`} key={sermon.id}>
                        <ButtonBox>
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
                        </ButtonBox>
                    </Link>
                ))}
            </div>
        </>
    ) : null;
};
export default Sermons;
