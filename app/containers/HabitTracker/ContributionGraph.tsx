import React, { useMemo, useRef, useState, useEffect } from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

const CELL_SIZE = 11;
const CELL_GAP = 2;
const TOTAL_CELL = CELL_SIZE + CELL_GAP;
const DAYS_IN_WEEK = 7;

const MONTH_LABELS = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

function formatDate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

const ContributionGraph = () => {
    const theme = useTheme<any>();
    const containerRef = useRef<HTMLDivElement>(null);
    const [weeks, setWeeks] = useState(0);

    useEffect(() => {
        const updateWeeks = () => {
            if (containerRef.current) {
                const w = Math.floor(containerRef.current.clientWidth / TOTAL_CELL);
                setWeeks(Math.max(w, 1));
            }
        };
        updateWeeks();
        window.addEventListener('resize', updateWeeks);
        return () => window.removeEventListener('resize', updateWeeks);
    }, []);

    const today = new Date();
    const todayDow = today.getDay();
    const todayMondayBased = todayDow === 0 ? 6 : todayDow - 1;
    const daysBack = (weeks - 1) * 7 + todayMondayBased;
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - daysBack);

    const sessions = useQuery(
        api.habitTracker.getSessionsForRange,
        weeks > 0 ? { startDate: formatDate(startDate), endDate: formatDate(today) } : 'skip'
    );

    const sessionMap = useMemo(() => {
        const map: Record<string, { morning: boolean; evening: boolean }> = {};
        if (!sessions) return map;
        for (const s of sessions) {
            if (!map[s.date]) map[s.date] = { morning: false, evening: false };
            if (s.timeOfDay === 'morning') map[s.date].morning = true;
            if (s.timeOfDay === 'evening') map[s.date].evening = true;
        }
        return map;
    }, [sessions]);

    const getColor = (dateStr: string) => {
        const entry = sessionMap[dateStr];
        if (!entry) return theme.colours?.bgGray || '#ebedf0';
        const count = (entry.morning ? 1 : 0) + (entry.evening ? 1 : 0);
        if (count >= 2) return '#216e39';
        if (count === 1) return '#40c463';
        return theme.colours?.bgGray || '#ebedf0';
    };

    // Build grid cells
    const cells: { date: Date; dateStr: string; week: number; day: number }[] = [];
    if (weeks > 0) {
        const current = new Date(startDate);
        for (let w = 0; w < weeks; w++) {
            for (let d = 0; d < DAYS_IN_WEEK; d++) {
                if (current <= today) {
                    cells.push({
                        date: new Date(current),
                        dateStr: formatDate(current),
                        week: w,
                        day: d,
                    });
                }
                current.setDate(current.getDate() + 1);
            }
        }
    }

    // Month labels with their starting week positions, skip if too close
    const MIN_LABEL_GAP = 3; // minimum weeks between labels
    const monthLabels: { label: string; week: number }[] = [];
    let lastMonth = -1;
    let lastLabelWeek = -MIN_LABEL_GAP;
    for (const cell of cells) {
        const month = cell.date.getMonth();
        if (month !== lastMonth) {
            if (cell.week - lastLabelWeek >= MIN_LABEL_GAP) {
                monthLabels.push({ label: MONTH_LABELS[month], week: cell.week });
                lastLabelWeek = cell.week;
            }
            lastMonth = month;
        }
    }

    const svgWidth = weeks * TOTAL_CELL;
    const svgHeight = DAYS_IN_WEEK * TOTAL_CELL + 16;

    return (
        <div
            ref={containerRef}
            className={css`
                padding: 8px 0;
            `}
        >
            {weeks > 0 && (
                <svg width={svgWidth} height={svgHeight}>
                    {monthLabels.map((m, i) => (
                        <text
                            key={i}
                            x={m.week * TOTAL_CELL}
                            y={10}
                            fontSize={10}
                            fill={theme.colours?.gray || '#767676'}
                        >
                            {m.label}
                        </text>
                    ))}
                    {cells.map((cell, i) => (
                        <rect
                            key={i}
                            x={cell.week * TOTAL_CELL}
                            y={cell.day * TOTAL_CELL + 16}
                            width={CELL_SIZE}
                            height={CELL_SIZE}
                            rx={2}
                            fill={getColor(cell.dateStr)}
                        />
                    ))}
                </svg>
            )}
        </div>
    );
};

export default ContributionGraph;
