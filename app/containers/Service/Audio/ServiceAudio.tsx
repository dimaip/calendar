import React, { createContext, useContext, useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Headset from '@material-ui/icons/Headset';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import Close from '@material-ui/icons/Close';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Replay from '@material-ui/icons/Replay';
import Check from '@material-ui/icons/Check';
import MenuBook from '@material-ui/icons/MenuBook';
import ArrowBack from '@material-ui/icons/ArrowBack';
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

const AudioContext = createContext<ReturnType<typeof useServiceAudioController> | null>(null);

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
        <button
            type="button"
            aria-label="Открыть аудиоплеер"
            aria-pressed={audio.active}
            title="Аудиозапись на русском языке"
            onClick={() => audio.setMode('compact')}
            className={css`
                display: flex;
                align-items: center;
                justify-content: center;
                min-width: 44px;
                min-height: 44px;
                color: ${theme.colours.primary};
                cursor: pointer;
                border-radius: 6px;
                background: ${audio.active ? theme.colours.bgGray : 'transparent'};
                &:focus-visible {
                    outline: 2px solid ${theme.colours.primary};
                    outline-offset: 2px;
                }
            `}
        >
            <Headset aria-hidden="true" fontSize="small" />
        </button>
    );
};

export const ServiceAudioEntry = () => {
    const audio = useContext(AudioContext);
    const theme = useTheme<AppTheme>();
    if (!audio?.recording || audio.active) return null;
    return (
        <button
            type="button"
            aria-label="Открыть аудиоверсию службы"
            onClick={() => audio.setMode('compact')}
            className={css`
                display: flex;
                align-items: center;
                gap: 12px;
                width: calc(100% - 24px);
                max-width: 680px;
                margin: 12px auto;
                padding: 12px;
                border: 1px solid ${theme.colours.lineGray};
                border-radius: 8px;
                background: ${theme.colours.bgGrayLight};
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
                Аудиоверсия
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
            <span
                className={css`
                    color: ${theme.colours.primary};
                    font-size: 13px;
                `}
            >
                Открыть
            </span>
        </button>
    );
};

export const ServiceAudioPlayer = () => {
    const audio = useContext(AudioContext);
    const theme = useTheme<AppTheme>();
    if (!audio?.recording || !audio.active) return null;
    const { recording, position, duration, playing, loading, error, expanded, rate } = audio;
    const buttonClass = css`
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        min-width: 44px;
        min-height: 44px;
        border-radius: 6px;
        cursor: pointer;
        color: ${theme.colours.darkGray};
        &:hover {
            background: ${theme.colours.bgGray};
        }
    `;
    const playButton = (
        <button
            type="button"
            aria-label={playing || loading ? 'Пауза' : 'Воспроизвести'}
            onClick={() => {
                void audio.togglePlayback();
            }}
            className={`${buttonClass} ${css`
                width: ${expanded ? 68 : 44}px;
                height: ${expanded ? 68 : 44}px;
                background: ${theme.colours.primary};
                color: ${theme.colours.white};
                border-radius: 50%;
                &:hover {
                    background: ${theme.colours.primary};
                    opacity: 0.8;
                }
            `}`}
        >
            {playing || loading ? <Pause aria-hidden="true" /> : <PlayArrow aria-hidden="true" />}
        </button>
    );
    const status = loading ? 'Загрузка…' : playing ? 'Воспроизведение' : 'Пауза';

    return (
        <>
            <style>{`
                ::highlight(service-audio-current) {
                    background-color: #f2d676;
                    color: #241d0c;
                }
            `}</style>
            {recording && (
                <>
                    <div
                        className={css`
                            height: calc(
                                ${error || !audio.text.following || audio.language.lang !== 'ru' ? 132 : 82}px +
                                    env(safe-area-inset-bottom)
                            );
                        `}
                    />
                    <section
                        aria-label="Аудиоплеер службы"
                        data-service-audio-player="true"
                        className={css`
                            position: fixed;
                            z-index: 31;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            padding-bottom: env(safe-area-inset-bottom);
                            padding-left: env(safe-area-inset-left);
                            padding-right: env(safe-area-inset-right);
                            border-top: 1px solid ${theme.colours.lineGray};
                            background: ${theme.colours.bgGrayLight};
                            color: ${theme.colours.darkGray};
                            & button:focus-visible {
                                outline: 2px solid ${theme.colours.primary};
                                outline-offset: 2px;
                            }
                        `}
                    >
                        <div
                            aria-hidden="true"
                            className={css`
                                height: 3px;
                                background: ${theme.colours.lineGray};
                            `}
                        >
                            <div
                                style={{ width: `${Math.min(100, (position / duration) * 100)}%` }}
                                className={css`
                                    height: 100%;
                                    background: ${theme.colours.primary};
                                `}
                            />
                        </div>
                        <div
                            className={css`
                                display: flex;
                                align-items: center;
                                gap: 4px;
                                max-width: 680px;
                                min-height: 64px;
                                margin: auto;
                                padding: 6px 8px;
                            `}
                        >
                            {playButton}
                            <div
                                className={css`
                                    flex: 1;
                                    min-width: 0;
                                    min-height: 48px;
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: center;
                                    padding: 4px 8px;
                                    text-align: left;
                                `}
                            >
                                <span
                                    className={css`
                                        display: block;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        white-space: nowrap;
                                        font-size: 14px;
                                    `}
                                >
                                    {recording.title}
                                </span>
                                <small
                                    className={css`
                                        display: block;
                                        color: ${theme.colours.gray};
                                        font-size: 12px;
                                        font-variant-numeric: tabular-nums;
                                    `}
                                >
                                    {formatAudioTime(position)} / {formatAudioTime(duration)} · РУС
                                </small>
                            </div>
                            <button
                                type="button"
                                aria-label="Развернуть аудиоплеер"
                                onClick={() => audio.setMode('expanded')}
                                className={buttonClass}
                            >
                                <ExpandLess aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                aria-label="Выйти из аудиорежима"
                                title="Выйти из аудиорежима"
                                onClick={audio.closeAudio}
                                className={buttonClass}
                            >
                                <Close aria-hidden="true" />
                            </button>
                        </div>
                        {audio.language.lang !== 'ru' ? (
                            <button
                                type="button"
                                onClick={() => audio.setLanguage({ ...audio.language, lang: 'ru' })}
                                className={`${buttonClass} ${css`
                                    display: flex;
                                    margin: auto;
                                    padding: 0 12px;
                                    color: ${theme.colours.primary};
                                    font-size: 14px;
                                `}`}
                            >
                                Открыть русский текст с подсветкой
                            </button>
                        ) : (
                            !audio.text.following && (
                                <div
                                    className={css`
                                        display: flex;
                                        align-items: center;
                                        flex-wrap: wrap;
                                        gap: 4px;
                                        max-width: 680px;
                                        margin: auto;
                                        padding: 0 12px 6px;
                                        font-size: 14px;
                                    `}
                                >
                                    {audio.text.target ? (
                                        <button
                                            type="button"
                                            onClick={audio.listenFromHere}
                                            className={`${buttonClass} ${css`
                                                gap: 6px;
                                                padding: 0 8px;
                                                color: ${theme.colours.primary};
                                                font-size: 13px;
                                            `}`}
                                        >
                                            <PlayArrow aria-hidden="true" fontSize="small" />
                                            Слушать отсюда · {formatAudioTime(audio.text.target.start)}
                                        </button>
                                    ) : (
                                        <span
                                            className={css`
                                                flex: 1;
                                                padding: 8px;
                                                color: ${theme.colours.gray};
                                                font-size: 13px;
                                            `}
                                        >
                                            {audio.text.unrecorded
                                                ? 'Этот фрагмент не входит в запись'
                                                : 'Ищем место в записи…'}
                                        </span>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => audio.text.followAudio(position)}
                                        className={`${buttonClass} ${css`
                                            padding: 0 8px;
                                            margin-left: auto;
                                            color: ${theme.colours.primary};
                                            gap: 4px;
                                            font-size: 13px;
                                        `}`}
                                    >
                                        <ArrowBack
                                            aria-hidden="true"
                                            className={css`
                                                font-size: 16px !important;
                                            `}
                                        />
                                        К аудио
                                    </button>
                                </div>
                            )
                        )}
                        {audio.timingsError && (
                            <button
                                type="button"
                                onClick={() => audio.setTimingAttempt((value) => value + 1)}
                                className={`${buttonClass} ${css`
                                    display: flex;
                                    margin: auto;
                                    padding: 0 12px;
                                    font-size: 14px;
                                `}`}
                            >
                                Не удалось загрузить подсветку. Повторить
                            </button>
                        )}
                        {error && (
                            <p
                                role="alert"
                                className={css`
                                    max-width: 640px;
                                    margin: 0 auto;
                                    padding: 0 16px 12px;
                                    font-size: 14px;
                                `}
                            >
                                {error}
                            </p>
                        )}
                        <span
                            className={css`
                                position: absolute;
                                width: 1px;
                                height: 1px;
                                overflow: hidden;
                                clip-path: inset(50%);
                            `}
                            role="status"
                        >
                            {status}
                        </span>
                    </section>
                </>
            )}
            <Dialog
                open={expanded}
                fullScreen
                onClose={() => audio.setMode('compact')}
                aria-labelledby="service-audio-title"
                PaperProps={{
                    className: css`
                        background: ${theme.colours.white};
                        color: ${theme.colours.darkGray};
                        padding-top: env(safe-area-inset-top);
                        padding-bottom: env(safe-area-inset-bottom);
                        & button:focus-visible {
                            outline: 2px solid ${theme.colours.primary};
                            outline-offset: 2px;
                        }
                    `,
                }}
            >
                <div
                    className={css`
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        padding: 6px 12px;
                        border-bottom: 1px solid ${theme.colours.lineGray};
                    `}
                >
                    <button
                        type="button"
                        aria-label="Свернуть аудиоплеер"
                        onClick={() => audio.setMode('compact')}
                        className={buttonClass}
                    >
                        <ExpandMore aria-hidden="true" />
                    </button>
                    <span
                        className={css`
                            flex: 1;
                            font-size: 16px;
                        `}
                    >
                        Аудиозапись
                    </span>
                    <button
                        type="button"
                        aria-label="Выйти из аудиорежима"
                        title="Выйти из аудиорежима"
                        onClick={audio.closeAudio}
                        className={buttonClass}
                    >
                        <Close aria-hidden="true" />
                    </button>
                </div>
                <div
                    className={css`
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: stretch;
                        flex: 1;
                        width: 100%;
                        max-width: 480px;
                        box-sizing: border-box;
                        margin: auto;
                        padding: 24px;
                        text-align: center;
                    `}
                >
                    <Headset
                        aria-hidden="true"
                        className={css`
                            align-self: center;
                            margin-bottom: 24px;
                            color: ${theme.colours.primary};
                            font-size: 64px !important;
                        `}
                    />
                    <h1
                        id="service-audio-title"
                        className={css`
                            margin: 0 0 8px;
                            font-size: 26px;
                            line-height: 1.3;
                        `}
                    >
                        {recording.title}
                    </h1>
                    <p
                        className={css`
                            color: ${theme.colours.gray};
                            font-size: 14px;
                            margin: 0 0 24px;
                        `}
                    >
                        На русском языке
                    </p>
                    {recording.hasVariableText && (
                        <p
                            className={css`
                                font-size: 14px;
                                line-height: 1.5;
                                margin: 0 0 20px;
                            `}
                        >
                            Запись начинается с канона. Начальные молитвы и некоторые изменяемые части в неё не входят.
                        </p>
                    )}
                    <label
                        htmlFor="service-audio-seek"
                        className={css`
                            text-align: left;
                            font-size: 14px;
                        `}
                    >
                        Позиция воспроизведения
                    </label>
                    <input
                        id="service-audio-seek"
                        type="range"
                        min={0}
                        max={duration}
                        step={1}
                        value={Math.min(position, duration)}
                        onChange={(event) => audio.seek(Number(event.target.value))}
                        aria-valuetext={`${formatAudioTime(position)} из ${formatAudioTime(duration)}`}
                        className={css`
                            width: 100%;
                            min-height: 44px;
                            margin: 0;
                            accent-color: ${theme.colours.primary};
                            cursor: pointer;
                        `}
                    />
                    <div
                        className={css`
                            display: flex;
                            justify-content: space-between;
                            color: ${theme.colours.gray};
                            font-size: 13px;
                            font-variant-numeric: tabular-nums;
                        `}
                    >
                        <span>{formatAudioTime(position)}</span>
                        <span>{formatAudioTime(duration)}</span>
                    </div>
                    <div
                        className={css`
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            gap: 24px;
                            margin: 24px 0;
                        `}
                    >
                        <button
                            type="button"
                            aria-label="Назад на 15 секунд"
                            onClick={() => audio.seek(position - 15)}
                            className={`${buttonClass} ${css`
                                flex-direction: column;
                                font-size: 12px;
                            `}`}
                        >
                            <Replay aria-hidden="true" />
                            <span>15</span>
                        </button>
                        {playButton}
                        <button
                            type="button"
                            aria-label="Вперёд на 15 секунд"
                            onClick={() => audio.seek(position + 15)}
                            className={`${buttonClass} ${css`
                                flex-direction: column;
                                font-size: 12px;
                            `}`}
                        >
                            <Replay
                                aria-hidden="true"
                                className={css`
                                    transform: scaleX(-1);
                                `}
                            />
                            <span>15</span>
                        </button>
                    </div>
                    <label
                        id="service-audio-speed-label"
                        htmlFor="service-audio-speed"
                        className={css`
                            font-size: 14px;
                            margin-bottom: 6px;
                        `}
                    >
                        Скорость
                    </label>
                    <Select
                        id="service-audio-speed"
                        labelId="service-audio-speed-label"
                        variant="outlined"
                        IconComponent={ExpandMore}
                        value={rate}
                        renderValue={(value) => `${Number(value)}×`}
                        onChange={(event) => audio.changeRate(Number(event.target.value))}
                        MenuProps={{
                            getContentAnchorEl: null,
                            anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
                            transformOrigin: { vertical: 'top', horizontal: 'center' },
                            PaperProps: {
                                className: css`
                                    margin-top: 6px;
                                    border: 1px solid ${theme.colours.lineGray};
                                    border-radius: 8px;
                                    background: ${theme.colours.bgGrayLight};
                                    color: ${theme.colours.darkGray};
                                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
                                `,
                            },
                            MenuListProps: { 'aria-labelledby': 'service-audio-speed-label' },
                        }}
                        className={css`
                            align-self: center;
                            min-width: 120px;
                            min-height: 44px;
                            background: ${theme.colours.bgGrayLight};
                            color: ${theme.colours.darkGray};
                            border-radius: 8px;
                            font-size: 16px;
                            font-variant-numeric: tabular-nums;
                            & .MuiSelect-select {
                                padding: 12px 40px 12px 16px;
                                text-align: left;
                            }
                            & .MuiSelect-select:focus {
                                background: transparent;
                                border-radius: 8px;
                            }
                            & .MuiSelect-icon {
                                right: 10px;
                                color: ${theme.colours.primary};
                            }
                            & .MuiOutlinedInput-notchedOutline {
                                border-color: ${theme.colours.lineGray};
                            }
                            &:hover .MuiOutlinedInput-notchedOutline,
                            &.Mui-focused .MuiOutlinedInput-notchedOutline {
                                border-color: ${theme.colours.primary};
                            }
                        `}
                    >
                        {[0.75, 1, 1.25, 1.5, 2].map((value) => (
                            <MenuItem
                                key={value}
                                value={value}
                                className={css`
                                    display: flex;
                                    justify-content: space-between;
                                    gap: 20px;
                                    min-height: 44px;
                                    padding: 8px 16px;
                                    font-size: 16px;
                                    font-variant-numeric: tabular-nums;
                                    &&.Mui-selected,
                                    &&.Mui-selected:hover,
                                    &:hover,
                                    &:focus-visible {
                                        background: ${theme.colours.bgGray};
                                        color: ${theme.colours.primary};
                                    }
                                `}
                            >
                                {value}×{rate === value && <Check aria-hidden="true" fontSize="small" />}
                            </MenuItem>
                        ))}
                    </Select>
                    {error && (
                        <p
                            role="alert"
                            className={css`
                                font-size: 14px;
                                line-height: 1.5;
                                margin-top: 16px;
                            `}
                        >
                            {error}
                        </p>
                    )}
                    {loading && (
                        <p
                            role="status"
                            className={css`
                                font-size: 14px;
                                margin-top: 12px;
                            `}
                        >
                            Загрузка…
                        </p>
                    )}
                    <button
                        type="button"
                        onClick={() => audio.setMode('compact')}
                        className={`${buttonClass} ${css`
                            gap: 8px;
                            color: ${theme.colours.primary};
                            margin-top: 24px;
                            font-size: 16px;
                        `}`}
                    >
                        <MenuBook aria-hidden="true" fontSize="small" />
                        Вернуться к тексту
                    </button>
                </div>
            </Dialog>
        </>
    );
};
