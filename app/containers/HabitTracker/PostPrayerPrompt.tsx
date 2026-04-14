import React, { useState, useEffect } from 'react';
import { css } from 'emotion';
import { useHistory } from 'react-router-dom';

const PRAYER_COMPLETED_KEY = 'habitTracker_prayerCompleted';
const ANON_SESSIONS_KEY = 'habitTracker_anonSessions';
const PROMPT_DISMISSED_KEY = 'habitTracker_promptDismissed';

export interface PrayerCompletedEvent {
    date: string;
    timeOfDay: string;
    isAnonymous: boolean;
    streak?: number;
}

/** Read and clear the prayer-completed flag from localStorage */
function consumePrayerCompleted(): PrayerCompletedEvent | null {
    try {
        const raw = localStorage.getItem(PRAYER_COMPLETED_KEY);
        if (!raw) return null;
        localStorage.removeItem(PRAYER_COMPLETED_KEY);
        return JSON.parse(raw) as PrayerCompletedEvent;
    } catch {
        return null;
    }
}

/** Count anonymous sessions stored in localStorage */
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

/** Check if the user has recently dismissed the prompt */
function isPromptDismissed(): boolean {
    try {
        const raw = localStorage.getItem(PROMPT_DISMISSED_KEY);
        if (!raw) return false;
        const dismissedAt = parseInt(raw, 10);
        // Don't show again for 3 days
        return Date.now() - dismissedAt < 3 * 24 * 60 * 60 * 1000;
    } catch {
        return false;
    }
}

/**
 * Shows a prompt after a prayer session completes.
 * - For anonymous users: encourages login to track prayer practice (after 2+ sessions)
 * - For logged-in users with tracking: shows "prayer recorded" toast with streak
 */
const PostPrayerPrompt = () => {
    const history = useHistory();
    const [event, setEvent] = useState<PrayerCompletedEvent | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const completed = consumePrayerCompleted();
        if (!completed) return;

        // For anonymous users: only show after 2+ total sessions, and respect dismissal
        if (completed.isAnonymous) {
            const count = getAnonSessionCount();
            if (count < 2 || isPromptDismissed()) return;
        }

        setEvent(completed);
        // Small delay for the slide-in animation
        requestAnimationFrame(() => setVisible(true));

        // Auto-dismiss after 6 seconds for logged-in users' toast
        if (!completed.isAnonymous) {
            const timer = setTimeout(() => setVisible(false), 6000);
            return () => clearTimeout(timer);
        }
    }, []);

    if (!event) return null;

    const dismiss = () => {
        setVisible(false);
        if (event.isAnonymous) {
            localStorage.setItem(PROMPT_DISMISSED_KEY, String(Date.now()));
        }
    };

    const handleLogin = () => {
        dismiss();
        history.push('/profile');
    };

    // Anonymous user prompt
    if (event.isAnonymous) {
        const timeLabel = event.timeOfDay === 'morning' ? 'утреннее' : 'вечернее';
        return (
            <div
                className={css`
                    position: fixed;
                    bottom: calc(70px + env(safe-area-inset-bottom));
                    left: 8px;
                    right: 8px;
                    z-index: 1100;
                    transform: translateY(${visible ? '0' : '100px'});
                    opacity: ${visible ? 1 : 0};
                    transition: transform 0.3s ease, opacity 0.3s ease;
                    pointer-events: ${visible ? 'auto' : 'none'};
                `}
            >
                <div
                    className={css`
                        background: white;
                        border-radius: 12px;
                        padding: 16px;
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    `}
                >
                    <div
                        className={css`
                            display: flex;
                            justify-content: space-between;
                            align-items: flex-start;
                            margin-bottom: 8px;
                        `}
                    >
                        <div
                            className={css`
                                font-size: 14px;
                                font-weight: 600;
                                color: #333;
                            `}
                        >
                            Вы прочитали {timeLabel} правило
                        </div>
                        <button
                            onClick={dismiss}
                            className={css`
                                background: none;
                                border: none;
                                font-size: 18px;
                                color: #999;
                                cursor: pointer;
                                padding: 0;
                                line-height: 1;
                                margin-top: -2px;
                            `}
                        >
                            &times;
                        </button>
                    </div>
                    <div
                        className={css`
                            font-size: 13px;
                            color: #666;
                            margin-bottom: 12px;
                        `}
                    >
                        Войдите, чтобы отслеживать свою молитвенную практику и видеть серию дней
                    </div>
                    <button
                        onClick={handleLogin}
                        className={css`
                            background: #4169e1;
                            color: white;
                            border: none;
                            border-radius: 8px;
                            padding: 10px 20px;
                            font-size: 14px;
                            cursor: pointer;
                            width: 100%;
                            font-weight: 500;
                            &:active {
                                opacity: 0.8;
                            }
                        `}
                    >
                        Войти и начать
                    </button>
                </div>
            </div>
        );
    }

    // Logged-in user toast (prayer recorded confirmation)
    const streakText = event.streak && event.streak > 0 ? ` — ${event.streak} дн. подряд` : '';
    return (
        <div
            className={css`
                position: fixed;
                bottom: calc(70px + env(safe-area-inset-bottom));
                left: 8px;
                right: 8px;
                z-index: 1100;
                transform: translateY(${visible ? '0' : '100px'});
                opacity: ${visible ? 1 : 0};
                transition: transform 0.3s ease, opacity 0.3s ease;
                pointer-events: ${visible ? 'auto' : 'none'};
            `}
        >
            <div
                onClick={() => {
                    dismiss();
                    history.push('/profile');
                }}
                className={css`
                    background: #333;
                    color: white;
                    border-radius: 10px;
                    padding: 12px 16px;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                `}
            >
                <span>✓</span>
                <span>Молитва записана{streakText}</span>
            </div>
        </div>
    );
};

export default PostPrayerPrompt;
