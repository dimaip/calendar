import type { ServiceAudioTimings } from './serviceAudioTimings';

export interface ServiceRecording {
    src: string;
    title: string;
    duration: number;
    language: 'ru';
    hasVariableText: boolean;
    loadTimings: () => Promise<ServiceAudioTimings>;
}

export const serviceRecordings: Partial<Record<string, ServiceRecording>> = {
    pokajanni: {
        src: 'https://molitva.app/audio/services/pokajanni.23cd7bb7caca038a.mp3',
        title: 'Покаянный канон',
        duration: 778.475083,
        language: 'ru',
        hasVariableText: false,
        loadTimings: async () => (await import('data/serviceAudio/pokajanni.json')).default,
    },
    chinPrigotovlenija: {
        src: 'https://molitva.app/audio/services/chin-prigotovlenija.12221d154cf8e5ee.mp3',
        title: 'Чин приготовления',
        duration: 1797.355083,
        language: 'ru',
        hasVariableText: true,
        loadTimings: async () => (await import('data/serviceAudio/chinPrigotovlenija.json')).default,
    },
};

export const formatAudioTime = (seconds: number): string => {
    const total = Math.max(0, Math.floor(Number.isFinite(seconds) ? seconds : 0));
    return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
};

export const readAudioPosition = (recording: ServiceRecording): number => {
    try {
        const position = Number(window.localStorage.getItem(`service-audio:v1:${recording.src}`));
        return Number.isFinite(position) && position >= 0 && position < recording.duration - 1 ? position : 0;
    } catch {
        return 0;
    }
};

export const saveAudioPosition = (recording: ServiceRecording, position: number): void => {
    try {
        const value = Number.isFinite(position) && position >= 0 && position < recording.duration - 1 ? position : 0;
        window.localStorage.setItem(`service-audio:v1:${recording.src}`, String(value));
    } catch {
        // Playback still works when browser storage is unavailable or full.
    }
};
