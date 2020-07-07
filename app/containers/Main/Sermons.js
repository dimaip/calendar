import React from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';
import SectionHeading from './SectionHeading';
import SwipeableLink from 'components/SwipeableLink/SwipeableLink';
import RightIcon from 'components/svgs/RightIcon';
import ButtonBox from 'components/ButtonBox/ButtonBox';
import SwipeableViews from 'react-swipeable-views';

const Sermons = ({ sermons, date, hideTitle = false }) => {
    const theme = useTheme();

    return sermons?.length ? (
        <>
            {!hideTitle && (
                <SectionHeading
                    className={css`
                        padding-top: 0 !important;
                    `}
                >
                    Проповедь
                </SectionHeading>
            )}
            <div
                className={css`
                    margin: 0 -18px 18px -18px;
                `}
            >
                <SwipeableViews
                    enableMouseEvents
                    className={css`
                        padding: 0 96px 0 4px !important;
                    `}
                    slideClassName={css`
                        padding: 0 6px !important;
                    `}
                >
                    {sermons.map(sermon => (
                        <SwipeableLink to={`/date/${date}/sermon/${sermon.id}`} key={sermon.id}>
                            <ButtonBox
                                className={css`
                                    height: calc(100% - 1px);
                                    margin: 0 !important;
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
                            </ButtonBox>
                        </SwipeableLink>
                    ))}
                </SwipeableViews>
            </div>
        </>
    ) : null;
};
export default Sermons;
