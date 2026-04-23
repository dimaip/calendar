import React, { useEffect, useState } from 'react';
import { css } from 'emotion';
import { useQuery } from 'convex/react';
import { useTheme } from 'emotion-theming';
import { useSession } from 'containers/AuthProvider';
import HeaderMain from 'containers/Main/HeaderMain';
import Loader from 'components/Loader/Loader';
import BottomNav from 'components/BottomNav/BottomNav';
import { useDocumentTitle } from 'utils/useDocumentTitle';
import type { AppTheme } from 'styles/AppTheme';
import { formatDateKey } from 'utils/formatDateKey';
import PrayerSetup from 'containers/HabitTracker/PrayerSetup';
import ContributionGraph from 'containers/HabitTracker/ContributionGraph';
import DrawerWithHeader from 'components/Drawer/DrawerWithHeader';
import PrayerCheck from 'components/svgs/PrayerCheck';
import QuestionMarkCircle from 'components/svgs/QuestionMarkCircle';

import { api } from '../../../convex/_generated/api';

const GRAPH_SKELETON_COLUMNS = 53;
const GRAPH_SKELETON_ROWS = 7;
const GRAPH_SKELETON_CELL = 15;
const GRAPH_SKELETON_GAP = 5;
const GRAPH_SKELETON_DAY_MS = 24 * 60 * 60 * 1000;
const GRAPH_SKELETON_MONTHS = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

function addDays(date: Date, amount: number): Date {
    const next = new Date(date);
    next.setDate(next.getDate() + amount);
    return next;
}

function getMondayBasedDay(date: Date): number {
    const dow = date.getDay();
    return dow === 0 ? 6 : dow - 1;
}

function formatDisplayDate(date: Date): string {
    const month = date.toLocaleString('ru-RU', { month: 'long' });
    const weekday = date.toLocaleString('ru-RU', { weekday: 'short' }).replace('.', '');
    return `${date.getDate()} ${month}, ${weekday}`;
}

function formatCompletionTime(timestamp: number): string {
    return new Intl.DateTimeFormat('ru-RU', {
        hour: 'numeric',
        minute: '2-digit',
    }).format(new Date(timestamp));
}

const PrayerStatusIcon = ({
    done,
    activeColour,
    idleColour,
}: {
    done: boolean;
    activeColour: string;
    idleColour: string;
}) => (
    <div
        className={css`
            width: 31px;
            height: 31px;
            flex-shrink: 0;
        `}
    >
        <PrayerCheck colour={done ? activeColour : idleColour} />
    </div>
);

const AccountNote = ({ textColour, iconColour }: { textColour: string; iconColour: string }) => (
    <div
        className={css`
            display: flex;
            gap: 9px;
            align-items: flex-start;
            color: ${textColour};
            font-size: 13px;
            line-height: 1.3;
        `}
    >
        <span
            className={css`
                flex-shrink: 0;
                margin-top: 1px;
            `}
        >
            <QuestionMarkCircle colour={iconColour} />
        </span>
        <span>
            Если вы смените устройство, вы всегда сможете сохранить ваши личные (и соборные!) настройки. Например,
            избранные песнопения, молитвенные списки и др. Для этого нужно будет просто войти в аккаунт на новом
            устройстве!
        </span>
    </div>
);

const ProfileSkeletonBlock = ({
    width = '100%',
    height,
    radius = 8,
    base,
    highlight,
}: {
    width?: string;
    height: number;
    radius?: number;
    base: string;
    highlight: string;
}) => (
    <div
        className={css`
            width: ${width};
            height: ${height}px;
            border-radius: ${radius}px;
            background: linear-gradient(90deg, ${base} 0%, ${highlight} 50%, ${base} 100%);
            background-size: 200% 100%;
            animation: profileSkeletonShift 1.4s ease-in-out infinite;

            @keyframes profileSkeletonShift {
                0% {
                    background-position: 200% 0;
                }
                100% {
                    background-position: -200% 0;
                }
            }
        `}
    />
);

const ProfileLoadingState = ({
    greeting,
    dateLabel,
    pageBg,
    cardBg,
    text,
    dateText,
    skeletonBase,
    skeletonHighlight,
    graphMonthAnchors,
}: {
    greeting: string;
    dateLabel: string;
    pageBg: string;
    cardBg: string;
    text: string;
    dateText: string;
    skeletonBase: string;
    skeletonHighlight: string;
    graphMonthAnchors: Array<{ label: string; left: number }>;
}) => (
    <div
        className={css`
            display: flex;
            min-height: calc(100vh - 110px);
            flex-direction: column;
            padding: 26px 15px 24px;
            background: ${pageBg};
            color: ${text};
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
                    color: ${dateText};
                    font-size: 16px;
                    line-height: 1.2;
                `}
            >
                {dateLabel}
            </div>

            <div
                className={css`
                    margin-bottom: 8px;
                    padding: 19px 16px 21px;
                    border-radius: 8px;
                    background: ${cardBg};
                `}
            >
                <div
                    className={css`
                        display: flex;
                        align-items: center;
                        gap: 9px;
                    `}
                >
                    <ProfileSkeletonBlock
                        width="31px"
                        height={31}
                        radius={16}
                        base={skeletonBase}
                        highlight={skeletonHighlight}
                    />
                    <div
                        className={css`
                            flex: 1;
                        `}
                    >
                        <ProfileSkeletonBlock
                            height={21}
                            radius={6}
                            base={skeletonBase}
                            highlight={skeletonHighlight}
                        />
                        <div
                            className={css`
                                margin-top: 7px;
                            `}
                        >
                            <ProfileSkeletonBlock
                                width="112px"
                                height={12}
                                radius={6}
                                base={skeletonBase}
                                highlight={skeletonHighlight}
                            />
                        </div>
                    </div>
                </div>
                <div
                    className={css`
                        margin-top: 14px;
                        display: flex;
                        align-items: center;
                        gap: 9px;
                    `}
                >
                    <ProfileSkeletonBlock
                        width="31px"
                        height={31}
                        radius={16}
                        base={skeletonBase}
                        highlight={skeletonHighlight}
                    />
                    <div
                        className={css`
                            flex: 1;
                        `}
                    >
                        <ProfileSkeletonBlock
                            height={21}
                            radius={6}
                            base={skeletonBase}
                            highlight={skeletonHighlight}
                        />
                        <div
                            className={css`
                                margin-top: 7px;
                            `}
                        >
                            <ProfileSkeletonBlock
                                width="124px"
                                height={12}
                                radius={6}
                                base={skeletonBase}
                                highlight={skeletonHighlight}
                            />
                        </div>
                    </div>
                </div>
                <div
                    className={css`
                        margin-top: 24px;
                    `}
                >
                    <ProfileSkeletonBlock
                        width="118px"
                        height={15}
                        radius={6}
                        base={skeletonBase}
                        highlight={skeletonHighlight}
                    />
                </div>
            </div>

            <div
                className={css`
                    padding: 20px 14px 24px;
                    border-radius: 8px;
                    background: ${cardBg};
                `}
            >
                <div
                    className={css`
                        overflow: hidden;
                    `}
                >
                    <div
                        className={css`
                            display: flex;
                            justify-content: flex-end;
                        `}
                    >
                        <div
                            className={css`
                                position: relative;
                                width: ${GRAPH_SKELETON_COLUMNS * GRAPH_SKELETON_CELL +
                                (GRAPH_SKELETON_COLUMNS - 1) * GRAPH_SKELETON_GAP}px;
                                min-width: ${GRAPH_SKELETON_COLUMNS * GRAPH_SKELETON_CELL +
                                (GRAPH_SKELETON_COLUMNS - 1) * GRAPH_SKELETON_GAP}px;
                            `}
                        >
                            <div
                                className={css`
                                    position: relative;
                                    height: 28px;
                                    margin-bottom: 12px;
                                `}
                            >
                                {graphMonthAnchors.map((month) => (
                                    <div
                                        key={`${month.label}-${month.left}`}
                                        className={css`
                                            position: absolute;
                                            left: ${month.left}px;
                                            top: 0;
                                            color: ${skeletonHighlight};
                                            font-size: 16px;
                                            line-height: 1.2;
                                            white-space: nowrap;
                                        `}
                                    >
                                        {month.label}
                                    </div>
                                ))}
                            </div>
                            <div
                                className={css`
                                    display: grid;
                                    grid-template-rows: repeat(7, ${GRAPH_SKELETON_CELL}px);
                                    grid-auto-flow: column;
                                    grid-auto-columns: ${GRAPH_SKELETON_CELL}px;
                                    row-gap: ${GRAPH_SKELETON_GAP}px;
                                    column-gap: ${GRAPH_SKELETON_GAP}px;
                                `}
                            >
                                {Array.from({
                                    length: GRAPH_SKELETON_COLUMNS * GRAPH_SKELETON_ROWS,
                                }).map((_, index) => (
                                    <ProfileSkeletonBlock
                                        key={index}
                                        height={GRAPH_SKELETON_CELL}
                                        radius={GRAPH_SKELETON_CELL}
                                        base={skeletonBase}
                                        highlight={skeletonHighlight}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const Inner = () => {
    const theme = useTheme<AppTheme>();
    const session = useSession();
    const [signingOut, setSigningOut] = useState(false);
    const [showSetup, setShowSetup] = useState(false);
    const today = new Date();
    const todayStr = formatDateKey(today);
    const profile = session.profile;
    const settings = useQuery(api.habitTracker.getSettings, profile ? undefined : 'skip');
    const habitTrackerEnabled = !!settings?.habitTracker;
    const sessions = useQuery(
        api.habitTracker.getSessionsForRange,
        profile && habitTrackerEnabled ? { startDate: todayStr, endDate: todayStr } : 'skip'
    );
    const morningSession =
        sessions
            ?.filter((session) => session.timeOfDay === 'morning')
            .sort((left, right) => right.createdAt - left.createdAt)[0] ?? null;
    const eveningSession =
        sessions
            ?.filter((session) => session.timeOfDay === 'evening')
            .sort((left, right) => right.createdAt - left.createdAt)[0] ?? null;
    const morningDone = !!morningSession;
    const eveningDone = !!eveningSession;
    const isDarkTheme = theme.colours?.white === '#201f24';
    const pageBg = theme.colours?.bgGrayLight || '#EFEFF4';
    const onboardingBg = theme.colours?.white || '#ffffff';
    const cardBg = theme.colours?.white || '#ffffff';
    const text = theme.colours?.darkGray || '#201f24';
    const muted = theme.colours?.gray || '#717175';
    const dateText = muted;
    const primary = theme.colours?.primary || '#ae831a';
    const primaryContrast = isDarkTheme ? '#201f24' : '#ffffff';
    const idleIconBg = theme.colours?.bgGray || '#acacb0';
    const doneIconBg = theme.colours?.blue || '#4169E1';
    const skeletonBase = theme.colours?.bgGray || '#e5e5ea';
    const skeletonHighlight = theme.colours?.bgGrayLight || '#f3f3f7';
    const graphRollingStart = addDays(today, -364);
    const graphGridStart = addDays(graphRollingStart, -getMondayBasedDay(graphRollingStart));
    const graphMonthAnchors = [
        {
            label: GRAPH_SKELETON_MONTHS[graphRollingStart.getMonth()],
            left: 0,
        },
        ...Array.from({ length: 12 }, (_, offset) => {
            const monthStartDate = new Date(
                graphRollingStart.getFullYear(),
                graphRollingStart.getMonth() + offset + 1,
                1
            );
            return {
                label: GRAPH_SKELETON_MONTHS[monthStartDate.getMonth()],
                left:
                    Math.floor((monthStartDate.getTime() - graphGridStart.getTime()) / GRAPH_SKELETON_DAY_MS / 7) *
                    (GRAPH_SKELETON_CELL + GRAPH_SKELETON_GAP),
                date: monthStartDate,
            };
        }).filter((anchor) => anchor.date <= today),
    ].filter((anchor, index, anchors) => index === 0 || anchor.left !== anchors[index - 1].left);

    useEffect(() => {
        if (!signingOut && !session.isLoading && !profile) {
            void session.signIn();
        }
    }, [profile, session, signingOut]);

    if (signingOut || session.isLoading) {
        return <Loader />;
    }
    if (!profile) {
        return <Loader />;
    }

    const signOut = () => {
        setSigningOut(true);
        void session.signOut();
    };

    const greeting = profile.given_name ? `Привет, ${profile.given_name}!` : 'Привет!';
    const isProfileLoading = settings === undefined || (habitTrackerEnabled && sessions === undefined);

    if (isProfileLoading) {
        return (
            <ProfileLoadingState
                greeting={greeting}
                dateLabel={formatDisplayDate(today)}
                pageBg={pageBg}
                cardBg={cardBg}
                text={text}
                dateText={dateText}
                skeletonBase={skeletonBase}
                skeletonHighlight={skeletonHighlight}
                graphMonthAnchors={graphMonthAnchors}
            />
        );
    }

    if (!habitTrackerEnabled && settings !== undefined) {
        return (
            <div
                className={css`
                    display: flex;
                    min-height: calc(100vh - 110px);
                    flex-direction: column;
                    padding: 0 13px 24px;
                    background: ${onboardingBg};
                    color: ${text};
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
                                Вы можете установить ритм ежедневной домашней утренней и вечерней молитвы и отслеживать&nbsp;его
                            </p>
                            <button
                                type="button"
                                onClick={() => setShowSetup(true)}
                                className={css`
                                    width: 100%;
                                    height: 46px;
                                    border-radius: 8px;
                                    background: ${primary};
                                    color: ${primaryContrast};
                                    font-size: 15px;
                                    line-height: 46px;
                                    text-transform: uppercase;
                                    cursor: pointer;
                                `}
                            >
                                УСТАНОВИТЬ
                            </button>
                        </div>
                        <AccountNote textColour={muted} iconColour={muted} />
                    </>
                )}
                <button
                    type="button"
                    onClick={signOut}
                    className={css`
                        margin: 16px auto 0;
                        color: ${muted};
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
                padding: 26px 15px 24px;
                background: ${pageBg};
                color: ${text};
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
                        color: ${dateText};
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
                                margin-bottom: 8px;
                                padding: 19px 16px 21px;
                                border-radius: 8px;
                                background: ${cardBg};
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
                                            <PrayerStatusIcon
                                                done={morningDone}
                                                activeColour={doneIconBg}
                                                idleColour={idleIconBg}
                                            />
                                            <div>
                                                <div
                                                    className={css`
                                                        color: ${text};
                                                        font-size: 18px;
                                                        line-height: 1.15;
                                                    `}
                                                >
                                                    Утренняя молитва
                                                </div>
                                                <div
                                                    className={css`
                                                        color: ${muted};
                                                        font-size: 12px;
                                                        line-height: 1.15;
                                                    `}
                                                >
                                                    {morningSession
                                                        ? formatCompletionTime(morningSession.createdAt)
                                                        : 'Пока не отмечено'}
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
                                            <PrayerStatusIcon
                                                done={eveningDone}
                                                activeColour={doneIconBg}
                                                idleColour={idleIconBg}
                                            />
                                            <div>
                                                <div
                                                    className={css`
                                                        color: ${text};
                                                        font-size: 18px;
                                                        line-height: 1.15;
                                                    `}
                                                >
                                                    Вечерняя молитва
                                                </div>
                                                <div
                                                    className={css`
                                                        color: ${muted};
                                                        font-size: 12px;
                                                        line-height: 1.15;
                                                    `}
                                                >
                                                    {eveningSession
                                                        ? formatCompletionTime(eveningSession.createdAt)
                                                        : 'Пока не отмечено'}
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
                                    margin-top: 24px;
                                    color: ${primary};
                                    font-size: 14px;
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
                                background: ${theme.colours?.white || '#ffffff'};
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
                    color: ${muted};
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
