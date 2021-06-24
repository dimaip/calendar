import React from 'react';
import { useHistory } from 'react-router-dom';
import { css } from 'emotion';
import { useParams } from 'react-router-dom';
import { useTheme } from 'emotion-theming';
import CalendarIcon from 'components/svgs/CalendarIcon';
import Bible from 'components/svgs/Bible';
import Prayer from 'components/svgs/Prayer';
import { useSubscriptionService } from 'stateMachines/subscription';
import Button from 'components/Button/Button';

const BottomNav = ({ active }) => {
    const { date } = useParams();
    const theme = useTheme();
    const history = useHistory();
    const [state, send] = useSubscriptionService();
    const isProfile = state.matches('loaded.profileAccess.profile');

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
                <Button
                    onClick={() => {
                        history.push(`/date/${date}`);
                        send('CLOSE');
                    }}
                    className={`${itemClass} ${!isProfile && active === 'calendar' ? activeClass : ''}`}
                >
                    <CalendarIcon
                        colour={!isProfile && active === 'calendar' ? theme.colours.darkGray : theme.colours.lightGray}
                    />
                    Календарь
                </Button>
                <Button
                    onClick={() => {
                        history.push(`/date/${date}/services`);
                        send('CLOSE');
                    }}
                    className={`${itemClass} ${!isProfile && active === 'services' ? activeClass : ''}`}
                >
                    <Prayer
                        colour={!isProfile && active === 'services' ? theme.colours.darkGray : theme.colours.lightGray}
                    />
                    Богослужение
                </Button>
                <a
                    className={`${itemClass} ${!isProfile && active === 'bible' ? activeClass : ''}`}
                    rel="noopener"
                    href="https://bible.psmb.ru"
                    target="_blank"
                >
                    <Bible
                        colour={!isProfile && active === 'bible' ? theme.colours.darkGray : theme.colours.lightGray}
                    />
                    Библия
                </a>
            </div>
        </div>
    );
};
export default BottomNav;
