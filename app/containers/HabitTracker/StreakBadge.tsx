import React from 'react';
import { css } from 'emotion';
import { useAuth } from 'oidc-react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

const StreakBadge = () => {
    const auth = useAuth();
    const isLoggedIn = !!auth.userData?.profile;
    const streak = useQuery(api.habitTracker.getStreak, isLoggedIn ? undefined : 'skip');

    if (!isLoggedIn || !streak) return null;

    return (
        <div
            className={css`
                position: absolute;
                top: -4px;
                right: -6px;
                background: #f59e0b;
                color: white;
                font-size: 9px;
                font-weight: 700;
                min-width: 14px;
                height: 14px;
                border-radius: 7px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0 3px;
                line-height: 1;
            `}
        >
            {streak}
        </div>
    );
};

export default StreakBadge;
