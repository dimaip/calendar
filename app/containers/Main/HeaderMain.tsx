import React, { useEffect } from 'react';
import { css } from '@emotion/css';
import { useTheme } from '@emotion/react';
import { useQuery } from 'convex/react';
import { useSession } from 'containers/AuthProvider';
import Button from 'components/Button/Button';
import CalendarToggle from 'components/CalendarToggle/CalendarToggle';
import Header from 'components/Header/Header';
import DotsMenu from 'components/DotsMenu/DotsMenu';
import QuestionIcon from 'components/svgs/QuestionIcon';
import Bell from 'components/svgs/Bell';
import { useNavigate } from 'react-router-dom';
import Share from 'components/Share/Share';
import useDay from 'hooks/useDay';
import SettingsButton from 'components/SettingsButton/SettingsButton';
import CalendarStreakWidget from 'containers/HabitTracker/CalendarStreakWidget';
import { markNavigationIntent, markPerformance } from 'utils/performanceMarks';

import { api } from '../../../convex/_generated/api';

const NotificationDot = () => {
    const theme = useTheme();

    return (
        <span
            className={css`
                position: absolute;
                top: -2px;
                right: -2px;
                width: 9px;
                height: 9px;
                border: 2px solid ${theme.colours.bgGrayLight};
                border-radius: 50%;
                background: ${theme.colours.red};
            `}
        />
    );
};

const UserIcon = ({ hasUnread }: { hasUnread: boolean }) => {
    const { profile } = useSession();
    const theme = useTheme();
    const initials = profile?.given_name ? `${profile.given_name?.[0]}${profile?.family_name?.[0]}` : 'U';

    return (
        <div
            className={css`
                position: relative;
                padding: 5px;
                font-size: 10px;
                background-color: ${theme.colours.blue};
                color: white;
                border-radius: 50%;
            `}
        >
            {initials}
            {hasUnread && <NotificationDot />}
        </div>
    );
};

const ProfileIcon = ({ hasUnread }: { hasUnread: boolean }) => {
    const navigate = useNavigate();
    const { profile } = useSession();
    const loggedIn = profile;
    return (
        <Button
            title={loggedIn ? 'Выйти' : 'Войти'}
            onClick={() => {
                markNavigationIntent({ initiator: 'header-profile', target: '/profile' });
                void navigate('/profile');
            }}
            className={css`
                display: block;
                padding: 8px 12px !important;
                z-index: 1;
            `}
        >
            {loggedIn ? (
                <UserIcon hasUnread={hasUnread} />
            ) : (
                <div
                    className={css`
                        margin-top: 4px;
                    `}
                >
                    <QuestionIcon />
                </div>
            )}
        </Button>
    );
};

const UpdatesButton = ({ hasUnread }: { hasUnread: boolean }) => {
    const navigate = useNavigate();

    return (
        <Button
            title="Обновления"
            onClick={() => {
                markNavigationIntent({ initiator: 'header-updates', target: '/updates' });
                void navigate('/updates');
            }}
            className={css`
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 10px 8px !important;
                z-index: 1;
            `}
        >
            <span
                className={css`
                    position: relative;
                    display: inline-flex;
                `}
            >
                <Bell />
                {hasUnread && <NotificationDot />}
            </span>
        </Button>
    );
};

const Today = ({ date, setNewDate }) => {
    const theme = useTheme();
    const todayDate = new Date();
    const todayDateString = todayDate.toISOString().slice(0, 10);
    if (date === todayDateString) {
        return null;
    }
    const setToday = () => setNewDate(todayDateString);
    return (
        <Button
            onClick={setToday}
            className={css`
                border: 1px solid ${theme.colours.primary};
                border-radius: 5px;
                font-size: 12px;
                color: ${theme.colours.primary};
                padding: 1px 4px 3px 4px !important;
                margin-right: 10px;
            `}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.646 6.582" width={8} height={6.09}>
                <path
                    d="M2.365 4.668a.352.352 0 10.492-.5L1.404 2.786H6.39a1.544 1.544 0 010 3.087.356.356 0 000 .712 2.256 2.256 0 000-4.512H1.377L2.861.603a.356.356 0 00-.5-.506l-2.1 2.068-.259.256z"
                    fill={theme.colours.primary}
                />
            </svg>{' '}
            сегодня
        </Button>
    );
};

const HeaderMain = ({ setNewDate, date, calendarRef, showUpdatesButton = false }) => {
    const { profile } = useSession();
    const unreadUpdates = useQuery(api.updates.getUnread, profile ? undefined : 'skip');
    const hasUnreadUpdates = !!unreadUpdates?.length;
    const dayQuery = useDay(date);
    const day = dayQuery.data;
    useEffect(() => {
        markPerformance('app_header_ready', { date });
    }, [date]);

    return (
        <Header>
            <div
                className={css`
                    position: relative;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                `}
            >
                <div
                    className={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    <ProfileIcon hasUnread={hasUnreadUpdates} />
                </div>
                {setNewDate && <CalendarStreakWidget />}
                <div
                    className={css`
                        z-index: 1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100%;
                    `}
                >
                    {setNewDate && (
                        <>
                            <Today date={date} setNewDate={setNewDate} />
                            <CalendarToggle calendarRef={calendarRef} date={date} setNewDate={setNewDate} iconOnly />
                        </>
                    )}

                    {showUpdatesButton && <UpdatesButton hasUnread={hasUnreadUpdates} />}
                    <DotsMenu>
                        <SettingsButton />
                        <Share
                            title="Православное богослужение на русском языке"
                            text={day?.title || ''}
                            url={window.location.href}
                        />
                    </DotsMenu>
                </div>
            </div>
        </Header>
    );
};
export default HeaderMain;
