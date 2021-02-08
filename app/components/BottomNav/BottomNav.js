import React from 'react';
import { css } from 'emotion';
import { Link, useParams } from 'react-router-dom';
import { useTheme } from 'emotion-theming';
import CalendarIcon from 'components/svgs/CalendarIcon';
import Bible from 'components/svgs/Bible';
import Prayer from 'components/svgs/Prayer';

const BottomNav = ({ active }) => {
    const { date } = useParams();
    const theme = useTheme();

    const itemClass = css`
        height: 50px;
        font-size: 13px;
        padding: 9px 12px;
        color: ${theme.colours.lightGray};
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `;
    const activeClass = css`
        color: ${theme.colours.darkGray} !important;
    `;

    return (
        <div
            className={css`
                height: calc(50px + env(safe-area-inset-bottom));
            `}
        >
            <div
                className={css`
                    height: calc(50px + env(safe-area-inset-bottom));
                    flex-shrink: 0;
                    display: flex;
                    justify-content: space-evenly;
                    position: fixed;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: ${theme.colours.bgGrayLight};
                    padding: 0 12px;
                    padding-bottom: env(safe-area-inset-bottom);
                    border-top: 1px solid ${theme.colours.lightGray};
                    user-select: none;
                `}
            >
                <Link className={`${itemClass} ${active === 'calendar' ? activeClass : ''}`} to={`/date/${date}`}>
                    <CalendarIcon colour={active === 'calendar' ? theme.colours.darkGray : theme.colours.lightGray} />
                    Календарь
                </Link>
                <Link
                    className={`${itemClass} ${active === 'services' ? activeClass : ''}`}
                    to={`/date/${date}/services`}
                >
                    <Prayer colour={active === 'services' ? theme.colours.darkGray : theme.colours.lightGray} />
                    Богослужение
                </Link>
                <a
                    className={`${itemClass} ${active === 'bible' ? activeClass : ''}`}
                    rel="noopener"
                    href="https://bible.psmb.ru"
                    target="_blank"
                >
                    <Bible colour={active === 'bible' ? theme.colours.darkGray : theme.colours.lightGray} />
                    Библия
                </a>
            </div>
        </div>
    );
};
export default BottomNav;
