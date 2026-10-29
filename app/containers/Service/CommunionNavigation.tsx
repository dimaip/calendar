import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import { Link, useLocation } from 'react-router-dom';

import type { ServiceInfo } from './Texts/Texts';

import ButtonBox from 'components/ButtonBox/ButtonBox';
import RightIcon from 'components/svgs/RightIcon';
import type { AppTheme } from 'styles/AppTheme';

const CommunionNavigation = ({
    serviceId,
    date,
    liturgy,
}: {
    serviceId: string;
    date: string;
    liturgy?: ServiceInfo;
}) => {
    const theme = useTheme<AppTheme>();
    const location = useLocation();
    let targetId: string | undefined;
    let title: string | undefined;
    let caption: string | undefined;

    if (serviceId === 'pokajanni') {
        targetId = 'chinPrigotovlenija';
        title = 'Чин приготовления';
        caption = 'Продолжить подготовку';
    } else if (serviceId === 'chinPrigotovlenija' && liturgy) {
        targetId = liturgy.id === 'lpod' ? 'Вечерня' : 'Литургия';
        title = liturgy.title;
        caption = 'Перейти к богослужению';
    }

    if (!targetId) return null;

    return (
        <Link
            to={{
                pathname: `/date/${date}/service/${targetId}`,
                state: { backLink: location.pathname, scrollToTop: true },
            }}
            className={css`
                display: block;
                max-width: 680px;
                margin: 24px auto;
                width: calc(100% - 24px);
                border-radius: 8px;
                text-decoration: none;
                &:hover {
                    opacity: 0.85;
                }
                &:focus-visible {
                    outline: 2px solid ${theme.colours.primary};
                    outline-offset: 3px;
                }
            `}
        >
            <ButtonBox
                className={css`
                    && {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        margin-bottom: 0;
                        padding: 18px 16px;
                        background: ${theme.colours.bgGray};
                        box-shadow: none;
                    }
                `}
            >
                <span
                    className={css`
                        flex: 1;
                        min-width: 0;
                    `}
                >
                    <span
                        className={css`
                            display: block;
                            margin-bottom: 4px;
                            font-size: 12px;
                            line-height: 1.3;
                            color: ${theme.colours.textSecondary};
                        `}
                    >
                        {caption}
                    </span>
                    <span
                        className={css`
                            display: block;
                            font-size: 18px;
                            line-height: 1.35;
                            color: ${theme.colours.primary};
                        `}
                    >
                        {title}
                    </span>
                </span>
                <span aria-hidden="true">
                    <RightIcon />
                </span>
            </ButtonBox>
        </Link>
    );
};

export default CommunionNavigation;
