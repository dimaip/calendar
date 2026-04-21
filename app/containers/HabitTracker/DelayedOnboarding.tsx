import React, { useState } from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import { useQuery } from 'convex/react';
import { useSession } from 'containers/AuthProvider';
import DrawerWithHeader from 'components/Drawer/DrawerWithHeader';

import { api } from '../../../convex/_generated/api';

import PrayerSetup from './PrayerSetup';

const ANON_SESSIONS_KEY = 'habitTracker_anonSessions';
const ONBOARDING_DISMISSED_KEY = 'habitTracker_onboardingDismissed';
const DARK = '#201f24';
const DARK_CARD = '#2c2b32';
const TEXT = '#fffffd';
const MUTED = '#acacb0';
const GOLD = '#ae831a';

interface TrackerTheme {
    colours?: {
        white?: string;
    };
}

function getAnonSessionCount(): number {
    try {
        const raw = localStorage.getItem(ANON_SESSIONS_KEY);
        if (!raw) return 0;
        const sessions = JSON.parse(raw) as unknown;
        return Array.isArray(sessions) ? sessions.length : 0;
    } catch {
        return 0;
    }
}

function isOnboardingDismissed(): boolean {
    try {
        const raw = localStorage.getItem(ONBOARDING_DISMISSED_KEY);
        if (!raw) return false;
        const dismissedAt = parseInt(raw, 10);
        // Don't show again for 7 days
        return Date.now() - dismissedAt < 7 * 24 * 60 * 60 * 1000;
    } catch {
        return false;
    }
}

/**
 * Shows onboarding prompt on calendar page for logged-in users
 * who have 3+ anonymous prayer sessions but haven't enabled tracking.
 */
const DelayedOnboarding = () => {
    const theme = useTheme<TrackerTheme>();
    const session = useSession();
    const isLoggedIn = !!session.profile;
    const settings = useQuery(api.habitTracker.getSettings, isLoggedIn ? undefined : 'skip');
    const [showSetup, setShowSetup] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    if (!isLoggedIn || settings === undefined) return null;
    // Already has tracking enabled
    if (settings?.habitTracker) return null;
    // Not enough anonymous sessions
    if (getAnonSessionCount() < 3) return null;
    // Recently dismissed
    if (dismissed || isOnboardingDismissed()) return null;

    const handleDismiss = () => {
        setDismissed(true);
        localStorage.setItem(ONBOARDING_DISMISSED_KEY, String(Date.now()));
    };

    const handleSetupComplete = () => {
        setShowSetup(false);
        // Clear anon sessions since tracking is now enabled
        localStorage.removeItem(ANON_SESSIONS_KEY);
    };

    return (
        <>
            <div
                className={css`
                    margin: 0 18px 12px;
                    padding: 14px 16px;
                    background: ${DARK_CARD};
                    border-radius: 8px;
                    position: relative;
                `}
            >
                <button
                    onClick={handleDismiss}
                    className={css`
                        position: absolute;
                        top: 8px;
                        right: 10px;
                        background: none;
                        border: none;
                        font-size: 16px;
                        color: ${MUTED};
                        cursor: pointer;
                        padding: 0;
                        line-height: 1;
                    `}
                >
                    &times;
                </button>
                <div
                    className={css`
                        font-size: 14px;
                        font-weight: 600;
                        color: ${TEXT};
                        margin-bottom: 4px;
                    `}
                >
                    Вы уже молитесь регулярно
                </div>
                <div
                    className={css`
                        font-size: 13px;
                        color: ${MUTED};
                        margin-bottom: 10px;
                    `}
                >
                    Включите отслеживание, чтобы видеть свою серию и прогресс
                </div>
                <button
                    onClick={() => setShowSetup(true)}
                    className={css`
                        background: ${GOLD};
                        color: ${DARK};
                        border: none;
                        border-radius: 8px;
                        padding: 8px 16px;
                        font-size: 13px;
                        cursor: pointer;
                        font-weight: 500;
                        &:active {
                            opacity: 0.8;
                        }
                    `}
                >
                    Настроить
                </button>
            </div>
            {showSetup && (
                <DrawerWithHeader onClose={() => setShowSetup(false)} header="Молитвенное правило">
                    <div
                        className={css`
                            min-height: 360px;
                            margin: 0 -16px -16px;
                            background: ${theme.colours?.white || '#ffffff'};
                        `}
                    >
                        <PrayerSetup onComplete={handleSetupComplete} />
                    </div>
                </DrawerWithHeader>
            )}
        </>
    );
};

export default DelayedOnboarding;
