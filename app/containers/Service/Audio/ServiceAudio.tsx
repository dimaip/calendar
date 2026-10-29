import React, { createContext, lazy, Suspense, useContext, useEffect, useState } from 'react';
import Headset from '@material-ui/icons/Headset';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import { useRecoilState } from 'recoil';

import { useServiceAudio } from './useServiceAudio';
import { useServiceAudioText } from './useServiceAudioText';

import type { AppTheme } from 'styles/AppTheme';
import { formatAudioTime } from 'domain/serviceRecordings';
import type { ServiceRecording } from 'domain/serviceRecordings';
import type { ServiceAudioTimings } from 'domain/serviceAudioTimings';
import langState from 'state/langState';
import Button from 'components/Button/Button';

const useServiceAudioController = (recording: ServiceRecording | undefined) => {
    const controller = useServiceAudio(recording);
    const [language, setLanguage] = useRecoilState(langState);
    const [timings, setTimings] = useState<ServiceAudioTimings | null>(null);
    const [timingsError, setTimingsError] = useState(false);
    const [timingAttempt, setTimingAttempt] = useState(0);
    useEffect(() => {
        if (!recording || !controller.active) return;
        let active = true;
        setTimingsError(false);
        void recording.loadTimings().then(
            (value) => {
                if (active) setTimings(value);
            },
            () => {
                if (active) setTimingsError(true);
            }
        );
        return () => {
            active = false;
        };
    }, [recording, controller.active, timingAttempt]);
    const text = useServiceAudioText(
        timings,
        controller.elementRef,
        controller.active && language.lang === 'ru',
        controller.started,
        controller.expanded
    );
    const listenFromHere = () => {
        if (!text.target) return;
        controller.seek(text.target.start);
        text.followAudio(text.target.start);
        void controller.play();
    };
    return { ...controller, text, listenFromHere, timingsError, setTimingAttempt, language, setLanguage };
};

export const AudioContext = createContext<ReturnType<typeof useServiceAudioController> | null>(null);

export const ServiceAudioProvider = ({
    recording,
    children,
}: {
    recording: ServiceRecording | undefined;
    children: React.ReactNode;
}) => {
    const controller = useServiceAudioController(recording);
    return <AudioContext.Provider value={recording ? controller : null}>{children}</AudioContext.Provider>;
};

export const ServiceAudioButton = () => {
    const audio = useContext(AudioContext);
    const theme = useTheme<AppTheme>();
    if (!audio) return null;
    return (
        <Button
            aria-pressed={audio.active}
            title={audio.active ? 'Выйти из аудиорежима' : 'Открыть аудиоплеер'}
            onClick={() => {
                if (audio.active) audio.closeAudio();
                else audio.setMode('compact');
            }}
            className={css`
                display: inline-flex;
                align-self: center;
                align-items: center;
                justify-content: center;
                && {
                    padding: 5px;
                }
                & svg {
                    font-size: 18px;
                }
                &:focus-visible > span {
                    outline: 2px solid ${theme.colours.primary};
                    outline-offset: 2px;
                }
            `}
        >
            <span
                aria-hidden="true"
                className={css`
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 32px;
                    height: 32px;
                    border-radius: 5px;
                    background: ${audio.active ? theme.colours.primary : theme.colours.bgGray};
                    color: ${audio.active ? theme.colours.onPrimary : theme.colours.darkGray};
                `}
            >
                <Headset aria-hidden="true" fontSize="small" />
            </span>
        </Button>
    );
};

export const ServiceAudioEntry = () => {
    const audio = useContext(AudioContext);
    const theme = useTheme<AppTheme>();
    if (!audio?.recording || audio.active) return null;
    return (
        <button
            type="button"
            aria-label="Слушать аудиозапись"
            onClick={() => audio.setMode('compact')}
            className={css`
                display: flex;
                align-items: center;
                gap: 12px;
                width: calc(100% - 24px);
                max-width: 680px;
                margin: 12px auto;
                padding: 16px;
                border: 0;
                border-radius: 8px;
                background: ${theme.colours.bgGray};
                color: ${theme.colours.darkGray};
                text-align: left;
                cursor: pointer;
                &:focus-visible {
                    outline: 2px solid ${theme.colours.primary};
                    outline-offset: 2px;
                }
            `}
        >
            <Headset
                aria-hidden="true"
                className={css`
                    color: ${theme.colours.primary};
                `}
            />
            <span
                className={css`
                    flex: 1;
                    min-width: 0;
                    font-size: 15px;
                `}
            >
                Слушать аудиозапись
                <small
                    className={css`
                        display: block;
                        margin-top: 4px;
                        color: ${theme.colours.gray};
                        font-size: 12px;
                    `}
                >
                    На русском · {formatAudioTime(audio.recording.duration)}
                </small>
            </span>
        </button>
    );
};

const LazyServiceAudioPlayer = lazy(
    async () => import(/* webpackChunkName: "service-audio-player" */ './ServiceAudioPlayer')
);

export const ServiceAudioPlayer = () => {
    const audio = useContext(AudioContext);
    if (!audio?.active) return null;
    return (
        <Suspense fallback={null}>
            <LazyServiceAudioPlayer />
        </Suspense>
    );
};
