import React from 'react';
import { css } from 'emotion';
import { useQuery } from 'convex/react';

import { api } from '../../../convex/_generated/api';

const GOLD = '#ae831a';
const DARK_CARD = '#2c2b32';
const TEXT = '#fffffd';
const MUTED = '#acacb0';

const StatIcon = ({ active, variant }: { active: boolean; variant: 'current' | 'best' }) => {
    const colour = active ? GOLD : MUTED;

    if (variant === 'best') {
        return (
            <svg width="31" height="31" viewBox="0 0 31 31" fill="none" aria-hidden="true">
                <circle cx="15.5" cy="15.5" r="15.5" fill={active ? 'rgba(174, 131, 26, 0.16)' : '#38373f'} />
                <path
                    d="M10.5 9.5H20.5V12.5C20.5 15.1 18.8 17.3 16.5 18V20.5H19V22H12V20.5H14.5V18C12.2 17.3 10.5 15.1 10.5 12.5V9.5ZM12 11V12.5C12 14.7 13.6 16.5 15.5 16.5C17.4 16.5 19 14.7 19 12.5V11H12Z"
                    fill={colour}
                />
            </svg>
        );
    }

    return (
        <svg width="31" height="31" viewBox="0 0 31 31" fill="none" aria-hidden="true">
            <circle cx="15.5" cy="15.5" r="15.5" fill={active ? 'rgba(174, 131, 26, 0.16)' : '#38373f'} />
            <path
                d="M16.7 7.5C16.7 7.5 17.4 10 17.4 12C17.4 13.8 16.2 15.2 14.4 15.2C12.6 15.2 11.2 13.8 11.2 12L11.3 11.5C9.9 13.1 9 15.2 9 17.2C9 20.5 11.8 23 15.5 23C19.2 23 22 20.5 22 17.2C22 13.4 20 9.9 16.7 7.5ZM15.4 21.2C13.6 21.2 12.2 19.9 12.2 18.3C12.2 16.8 13.2 15.8 14.8 15.5C16.4 15.1 18 14.4 18.9 13.3C19.2 14.3 19.4 15.5 19.4 16.6C19.4 19.1 17.6 21.2 15.4 21.2Z"
                fill={colour}
            />
        </svg>
    );
};

const StreakStats = () => {
    const currentStreak = useQuery(api.habitTracker.getStreak);
    const bestStreak = useQuery(api.habitTracker.getBestStreak);

    if (currentStreak === undefined || bestStreak === undefined) return null;

    return (
        <div
            className={css`
                margin: 0 0 6px;
                padding: 16px;
                border-radius: 8px;
                background: ${DARK_CARD};
            `}
        >
            <div
                className={css`
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    min-height: 36px;
                `}
            >
                <StatIcon active={currentStreak > 0} variant="current" />
                <div>
                    <div
                        className={css`
                            color: ${TEXT};
                            font-size: 14px;
                            line-height: 19px;
                            font-weight: 700;
                        `}
                    >
                        Текущая серия
                    </div>
                    <div
                        className={css`
                            color: ${MUTED};
                            font-size: 12px;
                            line-height: 14px;
                        `}
                    >
                        {currentStreak} дн. подряд
                    </div>
                </div>
            </div>
            <div
                className={css`
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    min-height: 36px;
                    margin-top: 9px;
                `}
            >
                <StatIcon active={bestStreak > 0} variant="best" />
                <div>
                    <div
                        className={css`
                            color: ${TEXT};
                            font-size: 14px;
                            line-height: 19px;
                            font-weight: 700;
                        `}
                    >
                        Лучший результат
                    </div>
                    <div
                        className={css`
                            color: ${MUTED};
                            font-size: 12px;
                            line-height: 14px;
                        `}
                    >
                        {bestStreak} дн. подряд
                    </div>
                </div>
            </div>
            <div
                className={css`
                    margin-top: 16px;
                    color: ${TEXT};
                    font-size: 14px;
                    line-height: 19px;
                    font-weight: 700;
                `}
            >
                Как вы молились
            </div>
        </div>
    );
};

export default StreakStats;
