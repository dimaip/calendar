import React from 'react';
import { css } from 'emotion';
import { highlightDays } from './feasts';
import theme from 'styles/theme';
import { DatePickerCalendar } from 'react-nice-dates';
import { ru } from 'date-fns/locale';
import './Calendar.scss';

const Calendar = ({ date, handleDayClick }) => {
    const modifiers = {
        h12: date => {
            const [className] = highlightDays(date);
            return className === 'highlight-12';
        },
        hGreat: date => {
            const [className] = highlightDays(date);
            return className === 'highlight-great';
        },
        p123: date => {
            const [className] = highlightDays(date);
            return className === 'highlight-post123';
        },
        p7: date => {
            const [className] = highlightDays(date);
            return className === 'highlight-post7';
        },
        p: date => {
            const [className] = highlightDays(date);
            return className === 'highlight-post';
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
            background-color: ${theme.colors.primary};
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
            border-color: ${theme.colors.primary};
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
