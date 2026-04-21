import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import { useQuery } from 'convex/react';
import { useSession } from 'containers/AuthProvider';
import { useHistory } from 'react-router-dom';
import PrayerCheck from 'components/svgs/PrayerCheck';
import type { AppTheme } from 'styles/AppTheme';
import { formatDateKey } from 'utils/formatDateKey';

import { api } from '../../../convex/_generated/api';

const CalendarStreakWidget = () => {
    const theme = useTheme<AppTheme>();
    const session = useSession();
    const history = useHistory();
    const isLoggedIn = !!session.profile;
    const activeColour = theme.colours?.primary || '#ae831a';
    const mutedColour = theme.colours?.gray || '#717175';
    const doneColour = theme.colours?.blue || '#4169E1';
    const idleRing = theme.colours?.lightGray || '#acacb0';

    const settings = useQuery(api.habitTracker.getSettings, isLoggedIn ? undefined : 'skip');
    const todayStr = formatDateKey(new Date());
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
                        font-weight: 400;
                    `}
                >
                    <span
                        className={css`
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 18px;
                            height: 18px;
                            flex-shrink: 0;
                        `}
                    >
                        {item.done ? (
                            <PrayerCheck colour={doneColour} size={18} />
                        ) : (
                            <span
                                className={css`
                                    width: 16px;
                                    height: 16px;
                                    border: 2px solid ${idleRing};
                                    border-radius: 50%;
                                `}
                            />
                        )}
                    </span>
                    {item.label}
                </div>
            ))}
        </div>
    );
};

export default CalendarStreakWidget;
