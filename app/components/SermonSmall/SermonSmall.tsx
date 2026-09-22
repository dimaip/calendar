import React from 'react';
import ButtonBox from 'components/ButtonBox/ButtonBox';
import RightIcon from 'components/svgs/RightIcon';
import SwipeableLink from 'components/SwipeableLink/SwipeableLink';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import { useLocation } from 'react-router-dom';

export interface Sermon {
    id: string;
    authorName: string;
    title: string;
    teaser: string;
    date: string;
}

export const SermonSmall = ({ sermon, horizontal }: { sermon: Sermon; horizontal?: boolean }) => {
    const theme = useTheme();
    const location = useLocation();
    return (
        <SwipeableLink
            to={{
                pathname: `/sermon/${sermon.id}`,
                state: { backLink: location.pathname },
            }}
            key={sermon.id}
        >
            <ButtonBox
                className={css`
                    height: calc(100% - 1px);
                    margin: 0 0 ${horizontal ? 0 : 8}px 0 !important;
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
    );
};
