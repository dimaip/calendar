import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import { useAuth } from 'oidc-react';
import { useQuery } from 'convex/react';
import { useHistory } from 'react-router-dom';

import { api } from '../../../convex/_generated/api';

type HeaderTheme = {
    colours?: {
        primary?: string;
        gray?: string;
    };
};

function formatDate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

const CalendarStreakWidget = () => {
    const theme = useTheme() as HeaderTheme;
    const auth = useAuth();
    const history = useHistory();
    const isLoggedIn = !!auth.userData?.profile;
    const activeColour = theme.colours?.primary || '#ae831a';
    const mutedColour = theme.colours?.gray || '#717175';

    const settings = useQuery(api.habitTracker.getSettings, isLoggedIn ? undefined : 'skip');
    const todayStr = formatDate(new Date());
    const sessions = useQuery(
        api.habitTracker.getSessionsForRange,
        isLoggedIn && settings?.habitTracker ? { startDate: todayStr, endDate: todayStr } : 'skip'
    );

    if (!isLoggedIn || !settings?.habitTracker) return null;

    const trackMorning = settings.habitTracker.trackMorning;
    const trackEvening = settings.habitTracker.trackEvening;

    let morningDone = false;
    let eveningDone = false;
    if (sessions) {
        for (const s of sessions) {
            if (s.timeOfDay === 'morning') morningDone = true;
            if (s.timeOfDay === 'evening') eveningDone = true;
        }
    }

    const items: Array<{ label: string; done: boolean }> = [];
    if (trackMorning) items.push({ label: 'Утр', done: morningDone });
    if (trackEvening) items.push({ label: 'Веч', done: eveningDone });

    if (items.length === 0) return null;

    return (
        <div
            onClick={() => history.push('/profile')}
            className={css`
                position: absolute;
                left: 50%;
                top: 50%;
                z-index: 1;
                display: flex;
                align-items: center;
                gap: 15px;
                transform: translate(-50%, -50%);
                cursor: pointer;
                user-select: none;
                white-space: nowrap;
                &:active {
                    opacity: 0.8;
                }
            `}
        >
            {items.map((item) => (
                <div
                    key={item.label}
                    className={css`
                        display: flex;
                        align-items: center;
                        gap: 4px;
                        color: ${item.done ? activeColour : mutedColour};
                        font-size: 13px;
                        line-height: 19px;
                        font-weight: 700;
                    `}
                >
                    <span
                        className={css`
                            width: 13px;
                            height: 13px;
                            border-radius: 50%;
                            border: 1.5px solid ${item.done ? activeColour : mutedColour};
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 9px;
                            line-height: 1;
                            color: ${item.done ? activeColour : 'transparent'};
                        `}
                    >
                        ✓
                    </span>
                    {item.label}
                </div>
            ))}
        </div>
    );
};

export default CalendarStreakWidget;
