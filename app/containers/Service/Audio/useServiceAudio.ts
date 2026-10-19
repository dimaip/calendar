import { useCallback, useEffect, useRef, useState } from 'react';

import { readAudioPosition, saveAudioPosition } from 'domain/serviceRecordings';
import type { ServiceRecording } from 'domain/serviceRecordings';

export const useServiceAudio = (recording: ServiceRecording | undefined) => {
    const [mode, setMode] = useState<'off' | 'compact' | 'expanded'>('off');
    const active = mode !== 'off';
    const expanded = mode === 'expanded';
    const [position, setPosition] = useState(() => (recording ? readAudioPosition(recording) : 0));
    const elementRef = useRef<HTMLAudioElement | null>(null);
    const positionRef = useRef(position);
    const durationRef = useRef(recording?.duration ?? 0);
    const playAttemptRef = useRef(0);
    const rateRef = useRef(1);
    const [duration, setDuration] = useState(recording?.duration ?? 0);
    const [started, setStarted] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [rate, setRate] = useState(1);

    useEffect(() => {
        if (!recording || !active) return;
        const audio = new Audio();
        audio.preload = 'none';
        audio.src = recording.src;
        audio.defaultPlaybackRate = rateRef.current;
        audio.playbackRate = rateRef.current;
        elementRef.current = audio;
        const saved = readAudioPosition(recording);
        positionRef.current = saved;
        setPosition(saved);
        let lastSaved = 0;

        const save = () => saveAudioPosition(recording, positionRef.current);
        const updatePosition = () => {
            if (audio.readyState === 0) return;
            positionRef.current = audio.currentTime;
            setPosition(audio.currentTime);
            if (Date.now() - lastSaved > 5000) {
                save();
                lastSaved = Date.now();
            }
        };
        const onMetadata = () => {
            if (Number.isFinite(audio.duration) && audio.duration > 0) {
                durationRef.current = audio.duration;
                setDuration(audio.duration);
                audio.currentTime = Math.min(positionRef.current, Math.max(0, audio.duration - 1));
            }
        };
        const onPlaying = () => {
            setPlaying(true);
            setLoading(false);
            setError('');
        };
        const onPause = () => {
            setPlaying(false);
            setLoading(false);
            save();
        };
        const onWaiting = () => {
            if (!audio.paused) setLoading(true);
        };
        const onError = () => {
            setPlaying(false);
            setLoading(false);
            setError('Не удалось загрузить запись. Проверьте подключение и попробуйте ещё раз.');
        };
        audio.addEventListener('loadedmetadata', onMetadata);
        audio.addEventListener('timeupdate', updatePosition);
        audio.addEventListener('playing', onPlaying);
        audio.addEventListener('pause', onPause);
        audio.addEventListener('waiting', onWaiting);
        audio.addEventListener('ended', onPause);
        audio.addEventListener('error', onError);
        window.addEventListener('pagehide', save);
        document.addEventListener('visibilitychange', save);
        return () => {
            playAttemptRef.current += 1;
            save();
            audio.removeEventListener('loadedmetadata', onMetadata);
            audio.removeEventListener('timeupdate', updatePosition);
            audio.removeEventListener('playing', onPlaying);
            audio.removeEventListener('pause', onPause);
            audio.removeEventListener('waiting', onWaiting);
            audio.removeEventListener('ended', onPause);
            audio.removeEventListener('error', onError);
            window.removeEventListener('pagehide', save);
            document.removeEventListener('visibilitychange', save);
            audio.pause();
            audio.removeAttribute('src');
            audio.load();
            elementRef.current = null;
        };
    }, [recording, active]);

    const play = useCallback(async () => {
        const audio = elementRef.current;
        if (!audio) return;
        const attempt = ++playAttemptRef.current;
        setStarted(true);
        setError('');
        setLoading(true);
        if (audio.ended) {
            positionRef.current = 0;
            audio.currentTime = 0;
        }
        if (audio.error) audio.load();
        try {
            await audio.play();
        } catch {
            if (elementRef.current === audio && playAttemptRef.current === attempt) {
                setLoading(false);
                setError('Не удалось включить запись. Нажмите «Воспроизвести», чтобы попробовать ещё раз.');
            }
        }
    }, []);

    const togglePlayback = async () => {
        const audio = elementRef.current;
        if (!audio) return;
        if (!audio.paused || loading) {
            playAttemptRef.current += 1;
            audio.pause();
            setLoading(false);
        } else await play();
    };

    const seek = useCallback((seconds: number) => {
        if (!Number.isFinite(seconds)) return;
        const next = Math.max(0, Math.min(durationRef.current, seconds));
        positionRef.current = next;
        setPosition(next);
        if (elementRef.current && elementRef.current.readyState > 0) elementRef.current.currentTime = next;
    }, []);

    const closeAudio = () => {
        playAttemptRef.current += 1;
        elementRef.current?.pause();
        setLoading(false);
        setPlaying(false);
        setStarted(false);
        setMode('off');
        setError('');
        if (recording) saveAudioPosition(recording, positionRef.current);
    };

    const changeRate = (value: number) => {
        rateRef.current = value;
        setRate(value);
        if (elementRef.current) {
            elementRef.current.defaultPlaybackRate = value;
            elementRef.current.playbackRate = value;
        }
    };

    useEffect(() => {
        if (!recording || !started || !('mediaSession' in navigator) || typeof MediaMetadata === 'undefined') return;
        const session = navigator.mediaSession;
        const metadata = new MediaMetadata({ title: recording.title, artist: 'Богослужение на русском языке' });
        session.metadata = metadata;
        const actions: MediaSessionAction[] = ['play', 'pause', 'seekbackward', 'seekforward', 'seekto'];
        const handler: MediaSessionActionHandler = (event) => {
            if (event.action === 'play')
                void elementRef.current?.play().catch(() => setError('Не удалось включить запись.'));
            if (event.action === 'pause') elementRef.current?.pause();
            if (event.action === 'seekto' && event.seekTime !== undefined) seek(event.seekTime);
            if (event.action === 'seekbackward') seek(positionRef.current - (event.seekOffset ?? 15));
            if (event.action === 'seekforward') seek(positionRef.current + (event.seekOffset ?? 15));
        };
        for (const action of actions) {
            try {
                session.setActionHandler(action, handler);
            } catch {
                // Some browsers support only a subset of media actions.
            }
        }
        return () => {
            if (session.metadata !== metadata) return;
            for (const action of actions) {
                try {
                    session.setActionHandler(action, null);
                } catch {
                    // Unsupported media actions also reject cleanup.
                }
            }
            session.metadata = null;
            session.playbackState = 'none';
        };
    }, [recording, seek, started]);

    useEffect(() => {
        if (!started || !('mediaSession' in navigator)) return;
        navigator.mediaSession.playbackState = playing ? 'playing' : 'paused';
    }, [started, playing]);

    return {
        recording,
        active,
        elementRef,
        position,
        duration,
        started,
        playing,
        loading,
        error,
        expanded,
        rate,
        setMode,
        togglePlayback,
        play,
        seek,
        closeAudio,
        changeRate,
    };
};
