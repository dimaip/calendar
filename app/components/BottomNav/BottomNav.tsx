import React from 'react';
import { css } from 'emotion';
import { Link, useParams } from 'react-router-dom';
import { useTheme } from 'emotion-theming';
import CrossIcon from 'components/svgs/CrossIcon';
import Bible from 'components/svgs/Bible';
import Prayer from 'components/svgs/Prayer';

const BottomNav = ({ active }) => {
    const { date = new Date().toISOString().slice(0, 10) } = useParams();
    const theme = useTheme();

    const itemClass = css`
        height: 60px;
        font-size: 13px;
        padding: 9px 12px;
        color: ${theme.colours.gray};
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `;
    const activeClass = css`
        color: ${theme.colours.blue} !important;
    `;

    return (
        <div
            className={css`
                height: calc(60px + env(safe-area-inset-bottom));
            `}
        >
            <div
                className={css`
                    height: calc(60px + env(safe-area-inset-bottom));
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
                    <CrossIcon colour={active === 'calendar' ? theme.colours.blue : theme.colours.gray} />
                    Календарь
                </Link>
                <Link
                    className={`${itemClass} ${active === 'services' ? activeClass : ''}`}
                    to={`/date/${date}/services`}
                >
                    <Prayer colour={active === 'services' ? theme.colours.blue : theme.colours.gray} />
                    Богослужение
                </Link>
                <Link className={`${itemClass} ${active === 'services' ? activeClass : ''}`} to="/sermons">
                    <Prayer colour={active === 'services' ? theme.colours.blue : theme.colours.gray} />
                    Проповеди
                </Link>
                <a
                    className={`${itemClass} ${active === 'bible' ? activeClass : ''}`}
                    rel="noopener"
                    href="https://bible.psmb.ru"
                    target="_blank"
                >
                    <Bible colour={active === 'bible' ? theme.colours.blue : theme.colours.gray} />
                    Библия
                </a>
            </div>
        </div>
    );
};
export default BottomNav;
