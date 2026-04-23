import { useEffect, useRef } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { useSession } from 'containers/AuthProvider';

import { api } from '../../../convex/_generated/api';

const PRAYER_THRESHOLD_SECONDS = 240; // 4 minutes
const PRAYER_SCROLL_COMPLETION_RATIO = 0.95;
const OFFLINE_QUEUE_KEY = 'habitTracker_offlineQueue';

interface PrayerTimerProps {
    date: string;
    serviceId: string;
}

interface QueuedSession {
    date: string;
    timeOfDay: string;
    durationSeconds: number;
    serviceId: string;
}

export const usePrayerTimer = ({ date, serviceId }: PrayerTimerProps) => {
    const session = useSession();
    const isLoggedIn = !!session.profile;
    const settings = useQuery(api.habitTracker.getSettings);
    const habitTrackerEnabled = !!settings?.habitTracker;
    const recordSession = useMutation(api.habitTracker.recordSession);
    const startTimeRef = useRef<number>(Date.now());
    const thresholdHandledRef = useRef(false);
    const completionHandledRef = useRef(false);

    // Flush any queued offline sessions on mount
    useEffect(() => {
        if (!isLoggedIn || !habitTrackerEnabled) return;
        void flushOfflineQueue(recordSession);
    }, [isLoggedIn, habitTrackerEnabled, recordSession]);

    // Use refs to capture latest values for the cleanup function
    const isLoggedInRef = useRef(isLoggedIn);
    const habitTrackerEnabledRef = useRef(habitTrackerEnabled);
    isLoggedInRef.current = isLoggedIn;
    habitTrackerEnabledRef.current = habitTrackerEnabled;

    useEffect(() => {
        startTimeRef.current = Date.now();
        thresholdHandledRef.current = false;
        completionHandledRef.current = false;

        const persistSession = (durationSeconds: number) => {
            if (!isLoggedInRef.current || !habitTrackerEnabledRef.current) return;

            const sessionData = {
                date,
                timeOfDay: new Date().getHours() < 12 ? 'morning' : 'evening',
                durationSeconds,
                serviceId,
            };

            recordSession(sessionData).catch(() => {
                try {
                    const queue = loadOfflineQueue();
                    queue.push(sessionData);
                    saveOfflineQueue(queue);
                } catch {
                    // localStorage unavailable
                }
            });
        };

        const getElapsedSeconds = () => Math.floor((Date.now() - startTimeRef.current) / 1000);

        const handleThresholdReached = () => {
            thresholdHandledRef.current = true;
            persistSession(getElapsedSeconds());
        };

        const checkCompletion = () => {
            if (completionHandledRef.current) return;

            const scrollRoot = document.documentElement;
            const scrollableHeight = scrollRoot.scrollHeight - window.innerHeight;
            const completionRatio = scrollableHeight <= 0 ? 1 : window.scrollY / scrollableHeight;

            if (completionRatio < PRAYER_SCROLL_COMPLETION_RATIO) return;

            completionHandledRef.current = true;

            if (getElapsedSeconds() >= PRAYER_THRESHOLD_SECONDS) {
                persistSession(getElapsedSeconds());
            }
        };

        const thresholdTimeout = window.setTimeout(handleThresholdReached, PRAYER_THRESHOLD_SECONDS * 1000);
        window.addEventListener('scroll', checkCompletion, { passive: true });
        window.addEventListener('resize', checkCompletion);
        checkCompletion();

        return () => {
            window.clearTimeout(thresholdTimeout);
            window.removeEventListener('scroll', checkCompletion);
            window.removeEventListener('resize', checkCompletion);

            const elapsed = getElapsedSeconds();
            if (!thresholdHandledRef.current && elapsed >= PRAYER_THRESHOLD_SECONDS) {
                thresholdHandledRef.current = true;
                persistSession(elapsed);
            }
        };
    }, [date, serviceId, recordSession]);
};

async function flushOfflineQueue(recordSession: (args: QueuedSession) => Promise<unknown>) {
    try {
        const queue = loadOfflineQueue();
        if (queue.length === 0) return;

        localStorage.removeItem(OFFLINE_QUEUE_KEY);
        for (const session of queue) {
            try {
                await recordSession(session);
            } catch {
                // Re-queue failed items
                const remaining = loadOfflineQueue();
                remaining.push(session);
                saveOfflineQueue(remaining);
            }
        }
    } catch {
        // Ignore errors
    }
}

function loadOfflineQueue(): QueuedSession[] {
    const raw = localStorage.getItem(OFFLINE_QUEUE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isQueuedSession);
}

function saveOfflineQueue(queue: QueuedSession[]) {
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
}

function isQueuedSession(value: unknown): value is QueuedSession {
    if (!value || typeof value !== 'object') return false;

    const session = value as Record<string, unknown>;
    return (
        typeof session.date === 'string' &&
        typeof session.timeOfDay === 'string' &&
        typeof session.durationSeconds === 'number' &&
        typeof session.serviceId === 'string'
    );
}
