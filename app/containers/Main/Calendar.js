import React, { useState } from 'react';
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
        h12: date => {
            const { feastType } = getFeastInfo(date);
            return feastType === '12';
        },
        hGreat: date => {
            const { feastType } = getFeastInfo(date);
            return feastType === 'great';
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
        p7: date => {
            const { fastingLevel } = getLentInfo(date);
            return fastingLevel === 7;
        },
        p: date => {
            const { fastingLevel } = getLentInfo(date);
            return fastingLevel && fastingLevel !== 8;
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
        selected: css`
            & .nice-dates-day_date {
                ${baseStyle}
                font-weight: bold;
                margin: 4px;
            }
        `,
        h12: css`
            & .nice-dates-day_date {
                ${baseStyle}
                background-color: #dc143c;
                color: white;
            }
        `,
        hGreat: css`
            & .nice-dates-day_date {
                ${baseStyle}
                border-color: #dc143c;
            }
        `,
        p: css`
            & .nice-dates-day_date {
                ${baseStyle}
                border-color: #7b68ee;
            }
        `,
        p7: css`
        & .nice-dates-day_date {
            ${baseStyle}
            border-color: ${theme.colours.primary};
        }
    `,
        pStrict: css`
            & .nice-dates-day_date {
                ${baseStyle}
                background-color: #7b68ee;
                color: white;
            }
        `,
    };

    return (
        <div
            className={css`
                position: fixed;
                z-index: 1;
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
};
export default Calendar;
