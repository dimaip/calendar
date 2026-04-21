import { useEffect, useRef } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { useSession } from 'containers/AuthProvider';
import { api } from '../../../convex/_generated/api';

const PRAYER_THRESHOLD_SECONDS = 240; // 4 minutes
const OFFLINE_QUEUE_KEY = 'habitTracker_offlineQueue';
const ANON_SESSIONS_KEY = 'habitTracker_anonSessions';
const PRAYER_COMPLETED_KEY = 'habitTracker_prayerCompleted';

interface PrayerTimerProps {
    date: string;
    serviceId: string;
}

export const usePrayerTimer = ({ date, serviceId }: PrayerTimerProps) => {
    const session = useSession();
    const isLoggedIn = !!session.profile;
    const settings = useQuery(api.habitTracker.getSettings);
    const habitTrackerEnabled = !!settings?.habitTracker;
    const recordSession = useMutation(api.habitTracker.recordSession);
    const streak = useQuery(api.habitTracker.getStreak, isLoggedIn && habitTrackerEnabled ? undefined : 'skip');
    const startTimeRef = useRef<number>(Date.now());

    // Flush any queued offline sessions on mount
    useEffect(() => {
        if (!isLoggedIn || !habitTrackerEnabled) return;
        flushOfflineQueue(recordSession);
    }, [isLoggedIn, habitTrackerEnabled, recordSession]);

    // Use refs to capture latest values for the cleanup function
    const isLoggedInRef = useRef(isLoggedIn);
    const habitTrackerEnabledRef = useRef(habitTrackerEnabled);
    const streakRef = useRef(streak);
    isLoggedInRef.current = isLoggedIn;
    habitTrackerEnabledRef.current = habitTrackerEnabled;
    streakRef.current = streak;

    useEffect(() => {
        startTimeRef.current = Date.now();

        return () => {
            const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
            if (elapsed < PRAYER_THRESHOLD_SECONDS) return;

            const timeOfDay = new Date().getHours() < 12 ? 'morning' : 'evening';

            if (isLoggedInRef.current && habitTrackerEnabledRef.current) {
                // Logged-in user with tracking: record session and set completed flag
                const sessionData = {
                    date,
                    timeOfDay,
                    durationSeconds: elapsed,
                    serviceId,
                };

                recordSession(sessionData).catch(() => {
                    try {
                        const queue = JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY) || '[]');
                        queue.push(sessionData);
                        localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
                    } catch {
                        // localStorage unavailable
                    }
                });

                // Set flag for PostPrayerPrompt to pick up
                try {
                    localStorage.setItem(
                        PRAYER_COMPLETED_KEY,
                        JSON.stringify({
                            date,
                            timeOfDay,
                            isAnonymous: false,
                            streak: (streakRef.current ?? 0) + 1,
                        })
                    );
                } catch {
                    // ignore
                }
            } else {
                // Anonymous or no tracking: store in localStorage for discovery prompt
                try {
                    const sessions = JSON.parse(localStorage.getItem(ANON_SESSIONS_KEY) || '[]');
                    sessions.push({ date, timeOfDay, timestamp: Date.now() });
                    localStorage.setItem(ANON_SESSIONS_KEY, JSON.stringify(sessions));

                    localStorage.setItem(
                        PRAYER_COMPLETED_KEY,
                        JSON.stringify({
                            date,
                            timeOfDay,
                            isAnonymous: true,
                        })
                    );
                } catch {
                    // ignore
                }
            }
        };
    }, [date, serviceId, recordSession]);
};

async function flushOfflineQueue(
    recordSession: (args: {
        date: string;
        timeOfDay: string;
        durationSeconds: number;
        serviceId: string;
    }) => Promise<any>
) {
    try {
        const raw = localStorage.getItem(OFFLINE_QUEUE_KEY);
        if (!raw) return;
        const queue = JSON.parse(raw);
        if (!Array.isArray(queue) || queue.length === 0) return;

        localStorage.removeItem(OFFLINE_QUEUE_KEY);
        for (const session of queue) {
            try {
                await recordSession(session);
            } catch {
                // Re-queue failed items
                const remaining = JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY) || '[]');
                remaining.push(session);
                localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(remaining));
            }
        }
    } catch {
        // Ignore errors
    }
}
