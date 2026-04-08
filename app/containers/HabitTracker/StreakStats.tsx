import React from 'react';
import { css } from 'emotion';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

const StreakStats = () => {
    const currentStreak = useQuery(api.habitTracker.getStreak);
    const bestStreak = useQuery(api.habitTracker.getBestStreak);

    if (currentStreak === undefined || bestStreak === undefined) return null;

    return (
        <div
            className={css`
                display: flex;
                gap: 24px;
                padding: 8px 0;
                font-size: 14px;
            `}
        >
            <div>
                <span
                    className={css`
                        font-weight: 600;
                        margin-right: 4px;
                    `}
                >
                    {currentStreak}
                </span>
                дн. подряд
            </div>
            <div>
                <span
                    className={css`
                        font-weight: 600;
                        margin-right: 4px;
                    `}
                >
                    {bestStreak}
                </span>
                рекорд
            </div>
        </div>
    );
};

export default StreakStats;
