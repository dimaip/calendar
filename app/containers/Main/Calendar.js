import React from 'react';
import { css } from 'emotion';
import { getFeastInfo, getLentInfo } from 'domain/getDayInfo';
import { DatePickerCalendar } from 'react-nice-dates';
import { ru } from 'date-fns/locale';
import './Calendar.scss';
import { useTheme } from 'emotion-theming';

const Calendar = ({ date, handleDayClick }) => {
    const theme = useTheme();
    const modifiers = {
        h12: date => {
            const { feastType } = getFeastInfo(date);
            return feastType === '12';
        },
        hGreat: date => {
            const { feastType } = getFeastInfo(date);
            return feastType === 'great';
        },
        p123: date => {
            const { fastingLevel } = getLentInfo(date);
            return fastingLevel === 1 || fastingLevel === 2 || fastingLevel === 3;
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
        border-radius: 50%;
        padding-top: 5px;
        width: calc(100% - 22px);
        height: 100%;
        margin: 10px;
        border: 1px solid white;
    `;
    const modifiersClassNames = {
        selected: css`
        & .nice-dates-day_date {
            ${baseStyle}
            background-color: ${theme.colours.primary};
            color: white;
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
        p123: css`
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
                border-bottom: 1px solid #ccc;
            `}
        >
            <DatePickerCalendar
                date={new Date(date)}
                onDateChange={handleDayClick}
                locale={ru}
                modifiers={modifiers}
                modifiersClassNames={modifiersClassNames}
            />
        </div>
    );
};
export default Calendar;
