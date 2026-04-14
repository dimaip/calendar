import React, { useMemo, useState } from 'react';
import { css } from 'emotion';
import { useQuery } from 'convex/react';

import { api } from '../../../convex/_generated/api';

const MONTH_CELL = 38;
const MONTH_GAP = 10;
const YEAR_CELL = 15;
const YEAR_GAP = 3;
const CARD = '#201f24';
const EMPTY = '#2c2b32';
const GOLD = '#ae831a';
const BLUE = '#4169e1';
const BLUE_DARK = '#26376a';
const TEXT = '#fffffd';
const MUTED = '#acacb0';
const WEEKDAY_LABELS = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
const MONTH_LABELS = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

type GraphMode = 'month' | 'year';

function formatDate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

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
            dateStr: formatDate(date),
            index,
        };
    });
}

const ContributionGraph = () => {
    const [mode, setMode] = useState<GraphMode>('month');
    const today = new Date();
    const currentYear = today.getFullYear();
    const todayStr = formatDate(today);
    const yearStart = new Date(currentYear, 0, 1);
    const monthStart = addDays(today, -getMondayBasedDay(today) - 21);

    const sessions = useQuery(api.habitTracker.getSessionsForRange, {
        startDate: formatDate(yearStart),
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

    const getColor = (dateStr: string) => {
        const entry = sessionMap[dateStr];
        if (!entry) return EMPTY;
        const count = (entry.morning ? 1 : 0) + (entry.evening ? 1 : 0);
        if (count >= 2) return BLUE;
        if (count === 1) return BLUE_DARK;
        return EMPTY;
    };

    const monthCells = buildCells(monthStart, 28);
    const yearMonths = MONTH_LABELS.map((label, month) => ({
        label,
        days: Array.from({ length: 31 }, (_, index) => new Date(currentYear, month, index + 1))
            .filter((date) => date.getMonth() === month)
            .map((date) => ({
                date,
                dateStr: formatDate(date),
            })),
    }));

    return (
        <div
            className={css`
                margin-bottom: 16px;
                padding: 21px 16px 24px;
                border-radius: 7px;
                background: ${CARD};
            `}
        >
            <div
                className={css`
                    display: flex;
                    gap: 5px;
                    margin-bottom: 25px;
                `}
            >
                {(['month', 'year'] as GraphMode[]).map((tab) => {
                    const active = mode === tab;
                    return (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setMode(tab)}
                            className={css`
                                min-width: ${tab === 'month' ? 72 : 58}px;
                                height: 22px;
                                border-radius: 8px;
                                background: ${active ? GOLD : 'transparent'};
                                border: 1px solid ${active ? GOLD : '#717175'};
                                color: ${active ? '#201f24' : MUTED};
                                font-size: 12px;
                                line-height: 20px;
                                cursor: pointer;
                            `}
                        >
                            {tab === 'month' ? 'Месяц' : 'Год'}
                        </button>
                    );
                })}
            </div>

            {mode === 'month' ? (
                <>
                    <div
                        className={css`
                            display: grid;
                            grid-template-columns: repeat(7, ${MONTH_CELL}px);
                            gap: 0 ${MONTH_GAP}px;
                            justify-content: center;
                            margin-bottom: 13px;
                        `}
                    >
                        {WEEKDAY_LABELS.map((day) => (
                            <div
                                key={day}
                                className={css`
                                    color: ${TEXT};
                                    font-size: 13px;
                                    line-height: 17px;
                                    text-align: center;
                                `}
                            >
                                {day}
                            </div>
                        ))}
                    </div>
                    <div
                        className={css`
                            display: grid;
                            grid-template-columns: repeat(7, ${MONTH_CELL}px);
                            gap: ${MONTH_GAP}px;
                            justify-content: center;
                        `}
                    >
                        {monthCells.map((cell) => {
                            const future = cell.date > today;
                            return (
                                <div
                                    key={cell.dateStr}
                                    title={cell.dateStr}
                                    className={css`
                                        width: ${MONTH_CELL}px;
                                        height: ${MONTH_CELL}px;
                                        border-radius: 50%;
                                        background: ${future ? EMPTY : getColor(cell.dateStr)};
                                        opacity: ${future ? 0.35 : 1};
                                    `}
                                />
                            );
                        })}
                    </div>
                </>
            ) : (
                <div
                    className={css`
                        display: grid;
                        grid-template-columns: repeat(6, minmax(0, 1fr));
                        gap: 24px 5px;
                    `}
                >
                    {yearMonths.map((month) => (
                        <div key={month.label}>
                            <div
                                className={css`
                                    margin-bottom: 8px;
                                    color: ${TEXT};
                                    font-size: 13px;
                                    line-height: 17px;
                                    text-align: center;
                                `}
                            >
                                {month.label}
                            </div>
                            <div
                                className={css`
                                    display: grid;
                                    grid-template-columns: repeat(3, ${YEAR_CELL}px);
                                    gap: ${YEAR_GAP}px;
                                    justify-content: center;
                                `}
                            >
                                {month.days.map((cell) => {
                                    const future = cell.date > today;
                                    return (
                                        <div
                                            key={cell.dateStr}
                                            title={cell.dateStr}
                                            className={css`
                                                width: ${YEAR_CELL}px;
                                                height: ${YEAR_CELL}px;
                                                border-radius: 50%;
                                                background: ${future ? EMPTY : getColor(cell.dateStr)};
                                                opacity: ${future ? 0.35 : 1};
                                            `}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContributionGraph;
