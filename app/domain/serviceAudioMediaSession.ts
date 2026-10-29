import type { ServiceRecording } from './serviceRecordings';

export const registerServiceAudioMediaSession = (
    audio: HTMLAudioElement,
    recording: ServiceRecording,
    onAction: MediaSessionActionHandler
) => {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator) || typeof MediaMetadata === 'undefined')
        return;
    const session = navigator.mediaSession;
    const metadata = new MediaMetadata({
        title: recording.title,
        artist: 'Богослужение на русском языке',
        artwork: [
            {
                src: new URL('/android-chrome-512x512.png', window.location.href).href,
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    });
    session.metadata = metadata;

    const update = () => {
        if (session.metadata !== metadata) return;
        session.playbackState = audio.paused || audio.ended || audio.error ? 'paused' : 'playing';
        if (typeof session.setPositionState !== 'function') return;
        try {
            if (!Number.isFinite(audio.duration) || audio.duration <= 0) {
                session.setPositionState();
                return;
            }
            session.setPositionState({
                duration: audio.duration,
                position: Number.isFinite(audio.currentTime)
                    ? Math.max(0, Math.min(audio.duration, audio.currentTime))
                    : 0,
                playbackRate: Number.isFinite(audio.playbackRate) && audio.playbackRate > 0 ? audio.playbackRate : 1,
            });
        } catch {
            // Position reporting is optional on browsers with partial Media Session support.
        }
    };
    const events = [
        'loadedmetadata',
        'durationchange',
        'playing',
        'pause',
        'seeking',
        'seeked',
        'ratechange',
        'ended',
        'error',
    ];
    for (const event of events) audio.addEventListener(event, update);
    update();

    const actions: MediaSessionAction[] = ['play', 'pause', 'stop', 'seekbackward', 'seekforward', 'seekto'];
    const registeredActions: MediaSessionAction[] = [];
    for (const action of actions) {
        try {
            session.setActionHandler(action, (event) => {
                if (session.metadata === metadata) onAction(event);
            });
            registeredActions.push(action);
        } catch {
            // Some browsers support only a subset of media actions.
        }
    }
    return () => {
        for (const event of events) audio.removeEventListener(event, update);
        if (session.metadata !== metadata) return;
        for (const action of registeredActions) {
            try {
                session.setActionHandler(action, null);
            } catch {
                // Unsupported media actions can also reject cleanup.
            }
        }
        session.metadata = null;
        session.playbackState = 'none';
        try {
            session.setPositionState?.();
        } catch {
            // Clearing position state must not prevent releasing the player.
        }
    };
};
