import React, { useState } from 'react';
import { css } from 'emotion';
import { useAuth } from 'oidc-react';
import { useQuery } from 'convex/react';
import HeaderMain from 'containers/Main/HeaderMain';
import Loader from 'components/Loader/Loader';
import BottomNav from 'components/BottomNav/BottomNav';
import { useDocumentTitle } from 'utils/useDocumentTitle';
import PrayerSetup from 'containers/HabitTracker/PrayerSetup';
import ContributionGraph from 'containers/HabitTracker/ContributionGraph';
import DrawerWithHeader from 'components/Drawer/DrawerWithHeader';

import { api } from '../../../convex/_generated/api';

const DARK = '#201f24';
const PAGE = '#2c2b32';
const TEXT = '#fffffd';
const MUTED = '#acacb0';
const GOLD = '#ae831a';
const BLUE = '#4169e1';

function formatDate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function formatDisplayDate(date: Date): string {
    const month = date.toLocaleString('ru-RU', { month: 'long' });
    const weekday = date.toLocaleString('ru-RU', { weekday: 'short' }).replace('.', '');
    return `${date.getDate()} ${month}, ${weekday}`;
}

const PrayerStatusIcon = ({ done }: { done: boolean }) => (
    <div
        className={css`
            display: flex;
            width: 31px;
            height: 31px;
            flex-shrink: 0;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: ${done ? BLUE : '#38373f'};
            color: ${done ? '#201f24' : '#5a5960'};
            font-size: 22px;
            line-height: 1;
        `}
    >
        ✓
    </div>
);

const AccountNote = () => (
    <div
        className={css`
            display: flex;
            gap: 9px;
            align-items: flex-start;
            color: ${TEXT};
            font-size: 13px;
            line-height: 1.3;
        `}
    >
        <span
            className={css`
                display: flex;
                width: 15px;
                height: 15px;
                flex-shrink: 0;
                align-items: center;
                justify-content: center;
                margin-top: 1px;
                border-radius: 50%;
                background: ${MUTED};
                color: ${DARK};
                font-size: 11px;
                font-weight: bold;
            `}
        >
            ?
        </span>
        <span>
            Если вы смените устройство, вы всегда сможете сохранить ваши личные (и соборные!) настройки. Например,
            избранные песнопения, молитвенные списки и др. Для этого нужно будет просто войти в аккаунт на новом
            устройстве!
        </span>
    </div>
);

const Inner = () => {
    const auth = useAuth();
    const [signingOut, setSigningOut] = useState(false);
    const [showSetup, setShowSetup] = useState(false);
    const today = new Date();
    const todayStr = formatDate(today);
    const profile = auth.userData?.profile;
    const settings = useQuery(api.habitTracker.getSettings, profile ? undefined : 'skip');
    const habitTrackerEnabled = !!settings?.habitTracker;
    const sessions = useQuery(
        api.habitTracker.getSessionsForRange,
        profile && habitTrackerEnabled ? { startDate: todayStr, endDate: todayStr } : 'skip'
    );
    const morningDone = !!sessions?.some((session) => session.timeOfDay === 'morning');
    const eveningDone = !!sessions?.some((session) => session.timeOfDay === 'evening');

    if (signingOut || auth.isLoading) {
        return <Loader />;
    }
    if (!profile) {
        void auth.signIn();
        return <Loader />;
    }

    const signOut = () => {
        setSigningOut(true);
        void auth.signOut();
        window.location.href = `https://z.molitva.app/oidc/v1/end_session?id_token_hint=${auth.userData?.id_token}&post_logout_redirect_uri=https://molitva.app`;
    };

    const greeting = profile.given_name ? `Привет, ${profile.given_name}!` : 'Привет!';

    if (!habitTrackerEnabled && settings !== undefined) {
        return (
            <div
                className={css`
                    display: flex;
                    min-height: calc(100vh - 110px);
                    flex-direction: column;
                    padding: 0 13px 24px;
                    background: ${DARK};
                    color: ${TEXT};
                `}
            >
                {showSetup ? (
                    <PrayerSetup
                        onComplete={() => setShowSetup(false)}
                        className={css`
                            flex: 1;
                            padding-top: 114px;
                            justify-content: flex-start;
                        `}
                    />
                ) : (
                    <>
                        <div
                            className={css`
                                flex: 1;
                                padding-top: 190px;
                                text-align: center;
                            `}
                        >
                            <h1
                                className={css`
                                    margin-bottom: 11px;
                                    font-size: 25px;
                                    font-weight: bold;
                                    line-height: 1.2;
                                `}
                            >
                                {greeting}
                            </h1>
                            <p
                                className={css`
                                    max-width: 258px;
                                    margin: 0 auto 35px;
                                    font-size: 16px;
                                    line-height: 1.2;
                                `}
                            >
                                Вы можете установить ритм ежедневной домашней утренней и вечерней молитвы и отслеживать
                                его
                            </p>
                            <button
                                type="button"
                                onClick={() => setShowSetup(true)}
                                className={css`
                                    width: 100%;
                                    height: 46px;
                                    border-radius: 8px;
                                    background: ${GOLD};
                                    color: ${DARK};
                                    font-size: 15px;
                                    line-height: 46px;
                                    text-transform: uppercase;
                                    cursor: pointer;
                                `}
                            >
                                УСТАНОВИТЬ
                            </button>
                        </div>
                        <AccountNote />
                    </>
                )}
                <button
                    type="button"
                    onClick={signOut}
                    className={css`
                        margin: 16px auto 0;
                        color: ${MUTED};
                        font-size: 13px;
                        cursor: pointer;
                    `}
                >
                    Выйти из аккаунта
                </button>
            </div>
        );
    }

    return (
        <div
            className={css`
                display: flex;
                min-height: calc(100vh - 110px);
                flex-direction: column;
                padding: 24px 8px 24px;
                background: ${PAGE};
                color: ${TEXT};
            `}
        >
            <div
                className={css`
                    flex-grow: 1;
                `}
            >
                <h1
                    className={css`
                        margin-bottom: 5px;
                        padding-left: 5px;
                        font-size: 25px;
                        font-weight: bold;
                        line-height: 1.2;
                    `}
                >
                    {greeting}
                </h1>
                <div
                    className={css`
                        margin-bottom: 19px;
                        padding-left: 5px;
                        color: ${MUTED};
                        font-size: 16px;
                        line-height: 1.2;
                    `}
                >
                    {formatDisplayDate(today)}
                </div>

                {habitTrackerEnabled && (
                    <>
                        <div
                            className={css`
                                margin-bottom: 6px;
                                padding: 16px;
                                border-radius: 7px;
                                background: ${DARK};
                            `}
                        >
                            {(settings?.habitTracker?.trackMorning || settings?.habitTracker?.trackEvening) && (
                                <>
                                    {settings?.habitTracker?.trackMorning && (
                                        <div
                                            className={css`
                                                display: flex;
                                                align-items: center;
                                                gap: 9px;
                                            `}
                                        >
                                            <PrayerStatusIcon done={morningDone} />
                                            <div>
                                                <div
                                                    className={css`
                                                        font-size: 16px;
                                                        line-height: 1.2;
                                                    `}
                                                >
                                                    Утренняя молитва
                                                </div>
                                                <div
                                                    className={css`
                                                        color: ${MUTED};
                                                        font-size: 12px;
                                                        line-height: 1.2;
                                                    `}
                                                >
                                                    {morningDone ? 'Отмечено сегодня' : 'Пока не отмечено'}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {settings?.habitTracker?.trackEvening && (
                                        <div
                                            className={css`
                                                display: flex;
                                                align-items: center;
                                                gap: 9px;
                                                margin-top: ${settings?.habitTracker?.trackMorning ? '14px' : '0'};
                                            `}
                                        >
                                            <PrayerStatusIcon done={eveningDone} />
                                            <div>
                                                <div
                                                    className={css`
                                                        font-size: 16px;
                                                        line-height: 1.2;
                                                    `}
                                                >
                                                    Вечерняя молитва
                                                </div>
                                                <div
                                                    className={css`
                                                        color: ${MUTED};
                                                        font-size: 12px;
                                                        line-height: 1.2;
                                                    `}
                                                >
                                                    {eveningDone ? 'Отмечено сегодня' : 'Пока не отмечено'}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                            <button
                                type="button"
                                onClick={() => setShowSetup(true)}
                                className={css`
                                    margin-top: 18px;
                                    color: ${GOLD};
                                    font-size: 16px;
                                    line-height: 1.2;
                                    text-decoration: underline;
                                    cursor: pointer;
                                `}
                            >
                                Изменить ритм
                            </button>
                        </div>
                        <ContributionGraph />
                    </>
                )}

                {showSetup && (
                    <DrawerWithHeader onClose={() => setShowSetup(false)} header="Молитвенное правило">
                        <div
                            className={css`
                                min-height: 360px;
                                margin: 0 -16px -16px;
                                background: ${DARK};
                            `}
                        >
                            <PrayerSetup onComplete={() => setShowSetup(false)} />
                        </div>
                    </DrawerWithHeader>
                )}
            </div>
            <button
                type="button"
                onClick={signOut}
                className={css`
                    margin: 16px auto 0;
                    color: ${MUTED};
                    font-size: 13px;
                    cursor: pointer;
                `}
            >
                Выйти из аккаунта
            </button>
        </div>
    );
};

const Profile = React.memo(() => {
    useDocumentTitle('Профиль пользователя - Православное богослужение на русском языке');

    return (
        <div>
            <HeaderMain />
            <Inner />
            <BottomNav active={undefined} />
        </div>
    );
});

export default Profile;
