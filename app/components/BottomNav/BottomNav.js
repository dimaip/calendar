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
        height: 44px;
        font-size: 13px;
        padding: 6px 12px;
        color: ${theme.colours.gray};
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
                height: 44px;
                display: flex;
                justify-content: space-evenly;
                position: sticky;
                bottom: 0;
                background-color: ${theme.colours.bgGray};
                padding: 0 12px;
                border-top: 1px solid ${theme.colours.lineGray};
            `}
        >
            <Link className={itemClass + ' ' + (active === 'calendar' ? activeClass : '')} to={`/date/${date}`}>
                <CalendarIcon colour={active === 'calendar' ? theme.colours.darkGray : theme.colours.gray} />
                Календарь
            </Link>
            <Link
                className={itemClass + ' ' + (active === 'services' ? activeClass : '')}
                to={`/date/${date}/services`}
            >
                <Prayer colour={active === 'services' ? theme.colours.darkGray : theme.colours.gray} />
                Богослужение
            </Link>
            <a
                className={itemClass + ' ' + (active === 'bible' ? activeClass : '')}
                href="https://bible.psmb.ru"
                target="_blank"
            >
                <Bible colour={active === 'bible' ? theme.colours.darkGray : theme.colours.gray} />
                Библия
            </a>
        </div>
    );
};
export default BottomNav;
