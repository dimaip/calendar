import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Button from 'components/Button/Button';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Cross from 'components/svgs/Cross';
import Calendar from 'components/Calendar/Calendar';
import dateFormat from 'dateformat';
import CalendarIcon from 'components/svgs/CalendarIcon';

const CalendarToggle = ({ date, setNewDate, iconOnly = false, calendarRef = null, className = '' }) => {
    const dateObj = new Date(date);
    const [calendarShown, setCalendarShown] = useState(false);
    const theme = useTheme();

    if (calendarRef) {
        useImperativeHandle(calendarRef, () => ({
            setCalendarShown: val => {
                setCalendarShown(val);
            },
            toggleCalendarShown: () => {
                setCalendarShown(!calendarShown);
            },
        }));
    }

    const handleDayClick = day => {
        const dateString = dateFormat(day, 'yyyy-mm-dd');

        setNewDate(dateString);
        setCalendarShown(false);
    };
    const toggle = iconOnly ? (
        <div
            className={css`
                width: 18px;
            `}
        >
            {calendarShown ? (
                <span
                    className={css`
                        margin-left: -5px;
                    `}
                >
                    <Cross />
                </span>
            ) : (
                <CalendarIcon />
            )}
        </div>
    ) : (
        <>
            {format(dateObj, 'd MMMM, EEEEEE', { locale: ru })}
            {calendarShown ? <Cross /> : null}
        </>
    );
    return (
        <>
            <Button
                title={calendarShown ? 'Спрятать календарь' : 'Показать календарь'}
                className={
                    css`
                        flex-shrink: 0;
                        display: flex;
                        align-items: center;
                        border-radius: 5px;
                        padding: 8px !important;
                        line-height: 1.1;
                        background-color: ${iconOnly ? theme.colours.white : theme.colours.bgGray} !important;
                        font-size: 14px;
                    ` +
                    ' ' +
                    className
                }
                onClick={() => setCalendarShown(!calendarShown)}
            >
                {toggle}
            </Button>
            {calendarShown && (
                <div
                    className={css`
                        margin-top: 12px;
                        z-index: 1;
                    `}
                >
                    <Calendar date={date} handleDayClick={handleDayClick} onClose={() => setCalendarShown(false)} />
                </div>
            )}
        </>
    );
};
export default CalendarToggle;
