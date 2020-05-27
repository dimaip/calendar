import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { css } from 'emotion';
import { getFeastInfo, getLentInfo } from 'domain/getDayInfo';
import { DatePickerCalendar } from 'react-nice-dates';
import { ru } from 'date-fns/locale';
import './Calendar.scss';
import { useTheme } from 'emotion-theming';

const Calendar = ({ date, handleDayClick, onClose }) => {
    const theme = useTheme();
    const [month, setMonth] = useState(new Date(date));
    const modifiers = {
        red: date => {
            const { calendarColour } = getFeastInfo(date);
            return calendarColour === 'red';
        },
        blue: date => {
            const { calendarColour } = getFeastInfo(date);
            return calendarColour === 'blue';
        },
        gold: date => {
            const { calendarColour } = getFeastInfo(date);
            const { calendarColour: calendarColourFeast } = getLentInfo(date);
            return calendarColour === 'gold' || calendarColourFeast === 'gold';
        },
        green: date => {
            const { calendarColour } = getFeastInfo(date);
            const { calendarColour: calendarColourFeast } = getLentInfo(date);
            return calendarColour === 'green' || calendarColourFeast === 'green';
        },
        pStrict: date => {
            const { fastingLevel } = getLentInfo(date);
            return (
                fastingLevel === 1 ||
                fastingLevel === 2 ||
                fastingLevel === 3 ||
                fastingLevel === 4 ||
                fastingLevel === 5 ||
                fastingLevel === 6
            );
        },
    };
    const baseStyle = css`
        border-radius: 999px;
        position: absolute;
        left: 0%;
        right: 0%;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid white;
        margin: 10px;
    `;
    const modifiersClassNames = {
        today: css`
            color: #ae841a !important;
            text-decoration: underline;
        `,
        selected: css`
            & .nice-dates-day_date {
                ${baseStyle}
                font-weight: bold;
                color: #ae841a !important;
                border: 2px solid #ae841a !important;
            }
        `,
        red: css`
            & .nice-dates-day_date {
                ${baseStyle}
                background-color: #dc143c !important;
                color: white !important;
            }
        `,
        blue: css`
            & .nice-dates-day_date {
                ${baseStyle}
                background-color: #4169E1 !important;
                color: white !important;
            }
        `,
        gold: css`
            & .nice-dates-day_date {
                ${baseStyle}
                background-color: #AE841A !important;
                color: white !important;
            }
        `,
        green: css`
            & .nice-dates-day_date {
                ${baseStyle}
                background-color: #73be73 !important;
                color: white !important;
            }
        `,
        pStrict: css`
            & .nice-dates-day_date {
                ${baseStyle}
                background-color: #7b68ee;
                color: white !important;
            }
        `,
    };

    const calendar = (
        <div
            className={css`
                position: fixed;
                z-index: 4;
                top: 44px;
                left: 0;
                right: 0;
                bottom: 0;
                display: flex;
                flex-direction: column;
            `}
        >
            <div
                className={css`
                    position: fixed;
                    left: 0;
                    right: 0;
                    background: white;
                    max-width: 640px;
                    margin: 0 auto;
                    border-bottom: 1px solid #d9dde5;
                    box-shadow: 0px 2px 3px #d9dde5;
                    & .nice-dates-day:hover:after {
                        opacity: 0 !important;
                    }
                    & .-wide .nice-dates-day_date {
                        left: 12.5%;
                        right: 12.5%;
                    }
                `}
            >
                <div>
                    <DatePickerCalendar
                        date={new Date(date)}
                        onDateChange={handleDayClick}
                        locale={ru}
                        month={month}
                        onMonthChange={setMonth}
                        modifiers={modifiers}
                        modifiersClassNames={modifiersClassNames}
                    />
                </div>
            </div>
            <div
                role="button"
                className={css`
                    flex-grow: 1;
                    cursor: pointer;
                `}
                onClick={onClose}
            />
        </div>
    );

    return ReactDOM.createPortal(calendar, document.getElementById('react-portal'));
};
export default Calendar;
