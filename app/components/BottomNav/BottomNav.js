import React from 'react';
import { css } from 'emotion';
import { Link, useParams } from 'react-router-dom';
import { useTheme } from 'emotion-theming';

const BottomNav = ({ active }) => {
    const { date } = useParams();
    const theme = useTheme();

    const itemClass = css`
        font-size: 14px;
        padding: 12px;
        border-bottom: 3px solid white;
        color: ${theme.colours.gray};
    `;
    const activeClass = css`
        border-bottom-color: ${theme.colours.primary} !important;
        color: ${theme.colours.darkGray} !important;
    `;

    return (
        <div
            className={css`
                display: flex;
                justify-content: space-evenly;
                position: sticky;
                bottom: 0;
                background-color: white;
                padding: 0 12px;
                box-shadow: 0px 0px 5px #bbb;
            `}
        >
            <Link className={itemClass + ' ' + (active === 'calendar' ? activeClass : '')} to={`/date/${date}`}>
                Календарь
            </Link>
            <Link className={itemClass + ' ' + (active === 'bible' ? activeClass : '')} to="/">
                Библия
            </Link>
            <Link className={itemClass + ' ' + (active === 'service' ? activeClass : '')} to="/">
                Богослужение
            </Link>
        </div>
    );
};
export default BottomNav;
