import React, { useMemo } from 'react';
import { css } from 'emotion';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

function formatDate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

const TodayProgress = () => {
    const settings = useQuery(api.habitTracker.getSettings);
    const todayStr = formatDate(new Date());
    const sessions = useQuery(api.habitTracker.getSessionsForRange, {
        startDate: todayStr,
        endDate: todayStr,
    });

    const trackMorning = settings?.habitTracker?.trackMorning ?? false;
    const trackEvening = settings?.habitTracker?.trackEvening ?? false;

    const { morningDone, eveningDone } = useMemo(() => {
        const result = { morningDone: false, eveningDone: false };
        if (!sessions) return result;
        for (const s of sessions) {
            if (s.timeOfDay === 'morning') result.morningDone = true;
            if (s.timeOfDay === 'evening') result.eveningDone = true;
        }
        return result;
    }, [sessions]);

    if (!settings?.habitTracker) return null;

    const items: { label: string; done: boolean }[] = [];
    if (trackMorning) items.push({ label: 'Утреннее правило', done: morningDone });
    if (trackEvening) items.push({ label: 'Вечернее правило', done: eveningDone });

    if (items.length === 0) return null;

    const allDone = items.every((i) => i.done);

    return (
        <div
            className={css`
                padding: 12px 16px;
                border-radius: 12px;
                background: ${allDone ? '#f0f9f0' : '#f8f9fa'};
                margin-bottom: 16px;
            `}
        >
            <div
                className={css`
                    font-size: 13px;
                    font-weight: 600;
                    color: #555;
                    margin-bottom: 8px;
                `}
            >
                Сегодня
            </div>
            {items.map((item) => (
                <div
                    key={item.label}
                    className={css`
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        padding: 4px 0;
                        font-size: 14px;
                    `}
                >
                    <span
                        className={css`
                            width: 20px;
                            height: 20px;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 12px;
                            flex-shrink: 0;
                            ${item.done
                                ? 'background: #40c463; color: white;'
                                : 'border: 2px solid #d9dde5;'}
                        `}
                    >
                        {item.done ? '✓' : ''}
                    </span>
                    <span
                        className={css`
                            ${item.done ? 'opacity: 0.5; text-decoration: line-through;' : ''}
                        `}
                    >
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default TodayProgress;
