import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { css } from 'emotion';
import { useQuery } from 'convex/react';
import { useTheme } from 'emotion-theming';
import type { AppTheme } from 'styles/AppTheme';
import { formatDateKey } from 'utils/formatDateKey';

import { api } from '../../../convex/_generated/api';

const YEAR_CELL_SIZE = 15;
const YEAR_CELL_GAP = 5;
const YEAR_LABEL_HEIGHT = 28;
const DAY_MS = 24 * 60 * 60 * 1000;
const MIN_MONTH_LABEL_GAP = 44;
const MONTH_LABELS = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

function addDays(date: Date, amount: number): Date {
    const next = new Date(date);
    next.setDate(next.getDate() + amount);
    return next;
}

function getMondayBasedDay(date: Date): number {
    const dow = date.getDay();
    return dow === 0 ? 6 : dow - 1;
}

function buildCells(startDate: Date, count: number) {
    return Array.from({ length: count }, (_, index) => {
        const date = addDays(startDate, index);
        return {
            date,
            dateStr: formatDateKey(date),
            index,
        };
    });
}

function filterMonthAnchors<T extends { left: number }>(anchors: T[]): T[] {
    return anchors.reduce<T[]>((visible, anchor) => {
        const prev = visible[visible.length - 1];
        if (prev && anchor.left - prev.left < MIN_MONTH_LABEL_GAP) {
            return visible;
        }
        visible.push(anchor);
        return visible;
    }, []);
}

const ContributionGraph = () => {
    const theme = useTheme<AppTheme>();
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const today = new Date();
    const rollingStart = addDays(today, -364);
    const todayStr = formatDateKey(today);
    const rollingStartStr = formatDateKey(rollingStart);

    const sessions = useQuery(api.habitTracker.getSessionsForRange, {
        startDate: rollingStartStr,
        endDate: todayStr,
    });

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

    const card = theme.colours?.white || '#ffffff';
    const empty = theme.colours?.bgGrayLight || '#EFEFF4';
    const blue = theme.colours?.blue || '#4169E1';
    const blueMuted = 'rgba(65, 105, 225, 0.55)';
    const text = theme.colours?.darkGray || '#201f24';

    const getColor = (dateStr: string) => {
        const entry = sessionMap[dateStr];
        if (!entry) return empty;
        const count = (entry.morning ? 1 : 0) + (entry.evening ? 1 : 0);
        if (count >= 2) return blue;
        if (count === 1) return blueMuted;
        return empty;
    };

    const yearGridStart = addDays(rollingStart, -getMondayBasedDay(rollingStart));
    const yearCellCount = Math.round((today.getTime() - yearGridStart.getTime()) / DAY_MS) + 1;
    const yearCells = buildCells(yearGridStart, yearCellCount).map((cell) => ({
        ...cell,
        inRange: cell.date >= rollingStart && cell.date <= today,
    }));
    const yearWeekCount = Math.ceil(yearCells.length / 7);
    const yearGridWidth = yearWeekCount * YEAR_CELL_SIZE + (yearWeekCount - 1) * YEAR_CELL_GAP;
    const monthAnchors = filterMonthAnchors([
        {
            label: MONTH_LABELS[rollingStart.getMonth()],
            left: 0,
        },
        ...Array.from({ length: 12 }, (_, offset) => {
            const monthStartDate = new Date(rollingStart.getFullYear(), rollingStart.getMonth() + offset + 1, 1);
            return {
                label: MONTH_LABELS[monthStartDate.getMonth()],
                left:
                    Math.floor((monthStartDate.getTime() - yearGridStart.getTime()) / DAY_MS / 7) *
                    (YEAR_CELL_SIZE + YEAR_CELL_GAP),
                date: monthStartDate,
            };
        }).filter((anchor) => anchor.date <= today),
    ].filter((anchor, index, anchors) => index === 0 || anchor.left !== anchors[index - 1].left));

    useLayoutEffect(() => {
        const node = scrollRef.current;
        if (!node) return;
        node.scrollLeft = node.scrollWidth - node.clientWidth;
    }, [yearGridWidth]);

    return (
        <div
            className={css`
                margin-bottom: 16px;
                padding: 20px 14px 24px;
                border-radius: 8px;
                background: ${card};
            `}
        >
            <div
                ref={scrollRef}
                className={css`
                    width: 100%;
                    overflow-x: auto;
                    overflow-y: hidden;
                    -webkit-overflow-scrolling: touch;
                `}
            >
                <div
                    className={css`
                        position: relative;
                        width: ${yearGridWidth}px;
                        min-width: ${yearGridWidth}px;
                    `}
                >
                    <div
                        className={css`
                            position: relative;
                            height: ${YEAR_LABEL_HEIGHT}px;
                            margin-bottom: 12px;
                        `}
                    >
                        {monthAnchors.map((month) => (
                            <div
                                key={`${month.label}-${month.left}`}
                                className={css`
                                    position: absolute;
                                    left: ${month.left}px;
                                    top: 0;
                                    color: ${text};
                                    font-size: 16px;
                                    line-height: 1.2;
                                    white-space: nowrap;
                                `}
                            >
                                {month.label}
                            </div>
                        ))}
                    </div>
                    <div
                        className={css`
                            display: grid;
                            grid-template-rows: repeat(7, ${YEAR_CELL_SIZE}px);
                            grid-auto-flow: column;
                            grid-auto-columns: ${YEAR_CELL_SIZE}px;
                            row-gap: ${YEAR_CELL_GAP}px;
                            column-gap: ${YEAR_CELL_GAP}px;
                            width: ${yearGridWidth}px;
                        `}
                    >
                        {yearCells.map((cell) => (
                            <div
                                key={cell.dateStr}
                                title={cell.inRange ? cell.dateStr : undefined}
                                className={css`
                                    width: ${YEAR_CELL_SIZE}px;
                                    height: ${YEAR_CELL_SIZE}px;
                                    border-radius: 50%;
                                    background: ${cell.inRange ? getColor(cell.dateStr) : 'transparent'};
                                    opacity: ${cell.inRange ? 1 : 0};
                                `}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContributionGraph;
