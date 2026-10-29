import React, { useContext } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import type { SlideProps } from '@material-ui/core/Slide';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Headset from '@material-ui/icons/Headset';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import Close from '@material-ui/icons/Close';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Check from '@material-ui/icons/Check';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

import { AudioContext } from './ServiceAudio';
import playIcon from './assets/play.svg';
import skipBackIcon from './assets/skip-back.svg';
import closeIcon from './assets/close.svg';
import collapseIcon from './assets/collapse.svg';

import type { AppTheme } from 'styles/AppTheme';
import { formatAudioTime } from 'domain/serviceRecordings';

const statusClass = css`
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
`;

const PlayerTransition = React.forwardRef<unknown, SlideProps>(function PlayerTransition(props, ref) {
    return <Slide {...props} direction="up" ref={ref} />;
});

const ServiceAudioPlayer = () => {
    const audio = useContext(AudioContext);
    const theme = useTheme<AppTheme>();
    const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true });
    if (!audio?.recording || !audio.active) return null;
    const { recording, position, duration, playing, loading, error, expanded, rate } = audio;
    const transitionDuration = prefersReducedMotion ? 0 : expanded ? 340 : 280;
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
    const iconButtonClass = `${buttonClass} ${css`
        color: ${theme.colours.primary};
    `}`;
    const skipButtonClass = `${buttonClass} ${css`
        flex-direction: column;
        width: 44px;
        min-height: 52px;
        gap: 3px;
        color: ${theme.colours.primary};
        font-size: 14px;
        line-height: 1;
    `}`;
    const skipIconClass = css`
        display: block;
        width: 21.984px;
        height: 25.2206px;
        background: currentColor;
        mask: url(${skipBackIcon}) center / contain no-repeat;
    `;
    const playButton = (
        <button
            type="button"
            aria-label={playing || loading ? 'Пауза' : 'Воспроизвести'}
            onClick={() => {
                void audio.togglePlayback();
            }}
            className={`${buttonClass} ${css`
                position: relative;
                width: ${expanded ? 61 : 44}px;
                height: ${expanded ? 61 : 44}px;
                background: ${expanded && !playing && !loading ? theme.colours.onPrimary : theme.colours.primary};
                color: ${theme.colours.onPrimary};
                border-radius: 50%;
                & svg {
                    font-size: ${expanded ? 30 : 24}px;
                }
                &:hover {
                    background: ${expanded && !playing && !loading ? theme.colours.onPrimary : theme.colours.primary};
                    opacity: 0.8;
                }
            `}`}
        >
            {playing || loading ? (
                <Pause aria-hidden="true" />
            ) : expanded ? (
                <span
                    aria-hidden="true"
                    className={css`
                        position: absolute;
                        inset: 0;
                        background: ${theme.colours.primary};
                        mask: url(${playIcon}) center / 61px 61px no-repeat;
                    `}
                />
            ) : (
                <PlayArrow aria-hidden="true" />
            )}
            {loading && (
                <CircularProgress
                    aria-hidden="true"
                    color="inherit"
                    size={expanded ? 49 : 36}
                    thickness={2}
                    className={css`
                        position: absolute;
                        top: ${expanded ? 6 : 4}px;
                        left: ${expanded ? 6 : 4}px;
                        pointer-events: none;
                        @media (prefers-reduced-motion: reduce) {
                            &&,
                            & circle {
                                animation: none;
                            }
                        }
                    `}
                />
            )}
        </button>
    );
    const status = loading ? 'Загрузка…' : playing ? 'Воспроизведение' : 'Пауза';
    const progress = Math.min(100, (position / duration) * 100);

    return (
        <>
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
                            className={css`
                                position: relative;
                                height: 3px;
                            `}
                        >
                            <input
                                id="service-audio-compact-seek"
                                aria-label="Прогресс аудиозаписи"
                                aria-valuetext={`${formatAudioTime(position)} из ${formatAudioTime(duration)}`}
                                type="range"
                                min={0}
                                max={duration}
                                step={1}
                                value={Math.min(position, duration)}
                                onChange={(event) => audio.seek(Number(event.target.value))}
                                style={{
                                    backgroundImage: `linear-gradient(to right, ${theme.colours.primary} ${progress}%, ${theme.colours.lineGray} ${progress}%)`,
                                }}
                                className={css`
                                    position: absolute;
                                    top: 50%;
                                    left: 0;
                                    transform: translateY(-50%);
                                    width: 100%;
                                    height: 28px;
                                    margin: 0;
                                    padding: 0;
                                    appearance: none;
                                    -webkit-appearance: none;
                                    background-color: transparent;
                                    background-size: 100% 3px;
                                    background-position: center;
                                    background-repeat: no-repeat;
                                    cursor: pointer;
                                    &:focus {
                                        outline: none;
                                    }
                                    &::-webkit-slider-runnable-track {
                                        height: 3px;
                                        background: transparent;
                                    }
                                    &::-moz-range-track,
                                    &::-moz-range-progress {
                                        height: 3px;
                                        background: transparent;
                                    }
                                    &::-webkit-slider-thumb {
                                        -webkit-appearance: none;
                                        width: 12px;
                                        height: 12px;
                                        margin-top: -4.5px;
                                        border: 0;
                                        border-radius: 50%;
                                        background: ${theme.colours.primary};
                                    }
                                    &::-moz-range-thumb {
                                        width: 12px;
                                        height: 12px;
                                        border: 0;
                                        border-radius: 50%;
                                        background: ${theme.colours.primary};
                                    }
                                    &:focus-visible::-webkit-slider-thumb {
                                        outline: 2px solid ${theme.colours.primary};
                                        outline-offset: 3px;
                                    }
                                    &:focus-visible::-moz-range-thumb {
                                        outline: 2px solid ${theme.colours.primary};
                                        outline-offset: 3px;
                                    }
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
                                        font-size: 16px;
                                    `}
                                >
                                    {recording.title}
                                </span>
                                <small
                                    className={css`
                                        display: block;
                                        color: ${theme.colours.textSecondary};
                                        margin-top: 2px;
                                        font-size: 12px;
                                        line-height: 1.4;
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
                                className={iconButtonClass}
                            >
                                <ExpandLess aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                aria-label="Выйти из аудиорежима"
                                title="Выйти из аудиорежима"
                                onClick={audio.closeAudio}
                                className={iconButtonClass}
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
                                                font-size: 15px;
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
                                                color: ${theme.colours.textSecondary};
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
                                            font-size: 15px;
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
                        <span className={statusClass} role="status">
                            {status}
                        </span>
                    </section>
                </>
            )}
            <Dialog
                open={expanded}
                fullScreen
                TransitionComponent={PlayerTransition}
                transitionDuration={transitionDuration}
                onClose={() => audio.setMode('compact')}
                aria-labelledby="service-audio-title"
                PaperProps={{
                    style: {
                        backgroundColor: theme.colours.white,
                        color: theme.colours.darkGray,
                        colorScheme: theme.colorScheme,
                    },
                    className: css`
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
                        flex-shrink: 0;
                        padding: 2px 4px;
                        background: ${theme.colours.bgGrayLight};
                        border-bottom: 1px solid ${theme.colours.lineGray};
                        & button {
                            width: 44px;
                            height: 44px;
                        }
                    `}
                >
                    <button
                        type="button"
                        aria-label="Свернуть аудиоплеер"
                        onClick={() => audio.setMode('compact')}
                        className={iconButtonClass}
                    >
                        <span
                            aria-hidden="true"
                            className={css`
                                width: 15.2222px;
                                height: 9.4564px;
                                background: currentColor;
                                mask: url(${collapseIcon}) center / contain no-repeat;
                            `}
                        />
                    </button>
                    <span
                        className={css`
                            flex: 1;
                            font-size: 13px;
                            text-align: center;
                        `}
                    >
                        Аудиозапись
                    </span>
                    <button
                        type="button"
                        aria-label="Выйти из аудиорежима"
                        title="Выйти из аудиорежима"
                        onClick={audio.closeAudio}
                        className={iconButtonClass}
                    >
                        <span
                            aria-hidden="true"
                            className={css`
                                width: 12.5px;
                                height: 12.5px;
                                background: currentColor;
                                mask: url(${closeIcon}) center / contain no-repeat;
                            `}
                        />
                    </button>
                </div>
                <div
                    className={css`
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: stretch;
                        flex: 1;
                        flex-shrink: 0;
                        width: 100%;
                        max-width: 420px;
                        box-sizing: border-box;
                        margin: auto;
                        padding: 32px 17px;
                        text-align: center;
                        @media (max-height: 700px) {
                            padding-top: 24px;
                            padding-bottom: 24px;
                        }
                    `}
                >
                    <Headset
                        aria-hidden="true"
                        className={css`
                            align-self: center;
                            margin-bottom: 32px;
                            color: ${theme.colours.primary};
                            font-size: 88px !important;
                            @media (max-height: 700px) {
                                font-size: 64px !important;
                                margin-bottom: 24px;
                            }
                        `}
                    />
                    <h1
                        id="service-audio-title"
                        className={css`
                            margin: 0 0 8px;
                            font-size: 23px;
                            font-weight: 400;
                            line-height: 1.3;
                        `}
                    >
                        {recording.title}
                    </h1>
                    <p
                        className={css`
                            color: ${theme.colours.textSecondary};
                            font-size: 14px;
                            line-height: 1.45;
                            margin: 0 0 32px;
                            @media (max-height: 700px) {
                                margin-bottom: 24px;
                            }
                        `}
                    >
                        На русском языке
                    </p>
                    {recording.hasVariableText && (
                        <p
                            className={css`
                                color: ${theme.colours.textSecondary};
                                font-size: 14px;
                                line-height: 1.5;
                                margin: 0 0 20px;
                            `}
                        >
                            Запись начинается с канона. Начальные молитвы и некоторые изменяемые части в неё не входят.
                        </p>
                    )}
                    <input
                        id="service-audio-seek"
                        aria-label="Прогресс аудиозаписи"
                        type="range"
                        min={0}
                        max={duration}
                        step={1}
                        value={Math.min(position, duration)}
                        onChange={(event) => audio.seek(Number(event.target.value))}
                        aria-valuetext={`${formatAudioTime(position)} из ${formatAudioTime(duration)}`}
                        style={{
                            backgroundImage: `linear-gradient(to right, ${theme.colours.darkGray} ${progress}%, ${theme.colours.lineGray} ${progress}%)`,
                        }}
                        className={css`
                            width: 100%;
                            height: 44px;
                            flex-shrink: 0;
                            margin: 0;
                            padding: 0;
                            appearance: none;
                            -webkit-appearance: none;
                            background-color: transparent;
                            background-size: 100% 2px;
                            background-position: center;
                            background-repeat: no-repeat;
                            cursor: pointer;
                            &:focus {
                                outline: none;
                            }
                            &::-webkit-slider-runnable-track {
                                height: 2px;
                                background: transparent;
                            }
                            &::-moz-range-track,
                            &::-moz-range-progress {
                                height: 2px;
                                background: transparent;
                            }
                            &::-webkit-slider-thumb {
                                -webkit-appearance: none;
                                width: 12px;
                                height: 12px;
                                margin-top: -5px;
                                border: 0;
                                border-radius: 50%;
                                background: ${theme.colours.darkGray};
                            }
                            &::-moz-range-thumb {
                                width: 12px;
                                height: 12px;
                                border: 0;
                                border-radius: 50%;
                                background: ${theme.colours.darkGray};
                            }
                            &:focus-visible::-webkit-slider-thumb {
                                outline: 2px solid ${theme.colours.primary};
                                outline-offset: 3px;
                            }
                            &:focus-visible::-moz-range-thumb {
                                outline: 2px solid ${theme.colours.primary};
                                outline-offset: 3px;
                            }
                        `}
                    />
                    <div
                        className={css`
                            display: flex;
                            justify-content: space-between;
                            color: ${theme.colours.textSecondary};
                            font-size: 13px;
                            line-height: 1.4;
                            font-variant-numeric: tabular-nums;
                        `}
                    >
                        <span>{formatAudioTime(position)}</span>
                        <span>{formatAudioTime(duration)}</span>
                    </div>
                    <div
                        className={css`
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            width: 100%;
                            max-width: 208px;
                            margin: 24px auto;
                        `}
                    >
                        <button
                            type="button"
                            aria-label="Назад на 15 секунд"
                            onClick={() => audio.seek(position - 15)}
                            className={skipButtonClass}
                        >
                            <span aria-hidden="true" className={skipIconClass} />
                            <span>15</span>
                        </button>
                        {playButton}
                        <button
                            type="button"
                            aria-label="Вперёд на 15 секунд"
                            onClick={() => audio.seek(position + 15)}
                            className={skipButtonClass}
                        >
                            <span
                                aria-hidden="true"
                                className={`${skipIconClass} ${css`
                                    transform: scaleX(-1);
                                `}`}
                            />
                            <span>15</span>
                        </button>
                    </div>
                    <div
                        className={css`
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            flex-wrap: wrap;
                            gap: 8px 24px;
                            width: 100%;
                        `}
                    >
                        <div
                            className={css`
                                display: flex;
                                align-items: center;
                                gap: 6px;
                            `}
                        >
                            <label
                                id="service-audio-speed-label"
                                htmlFor="service-audio-speed"
                                className={css`
                                    font-size: 14px;
                                    color: ${theme.colours.textSecondary};
                                    text-align: left;
                                    margin: 0;
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
                                style={{ color: theme.colours.darkGray }}
                                renderValue={(value) => `${Number(value)}×`}
                                onChange={(event) => audio.changeRate(Number(event.target.value))}
                                MenuProps={{
                                    getContentAnchorEl: null,
                                    anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
                                    transformOrigin: { vertical: 'top', horizontal: 'center' },
                                    PaperProps: {
                                        style: {
                                            backgroundColor: theme.colours.bgGrayLight,
                                            color: theme.colours.darkGray,
                                            colorScheme: theme.colorScheme,
                                        },
                                        className: css`
                                            margin-top: 6px;
                                            border: 1px solid ${theme.colours.lineGray};
                                            border-radius: 8px;
                                            box-shadow: 0 6px 20px ${theme.colours.shadow};
                                        `,
                                    },
                                    MenuListProps: { 'aria-labelledby': 'service-audio-speed-label' },
                                }}
                                className={css`
                                    align-self: flex-start;
                                    width: 74px;
                                    flex-shrink: 0;
                                    min-height: 44px;
                                    border-radius: 6px;
                                    font-size: 14px;
                                    font-variant-numeric: tabular-nums;
                                    && .MuiSelect-select {
                                        padding: 12px 24px 12px 8px;
                                        text-align: right;
                                    }
                                    & .MuiSelect-select:focus {
                                        background: transparent;
                                        border-radius: 6px;
                                        outline: none;
                                    }
                                    & .MuiSelect-icon {
                                        right: 0;
                                        font-size: 20px;
                                        color: ${theme.colours.primary};
                                    }
                                    & .MuiOutlinedInput-notchedOutline {
                                        border-color: transparent;
                                    }
                                    &&:hover .MuiOutlinedInput-notchedOutline,
                                    &&.Mui-focused .MuiOutlinedInput-notchedOutline {
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
                        </div>
                        <button
                            type="button"
                            onClick={() => audio.setMode('compact')}
                            className={`${buttonClass} ${css`
                                color: ${theme.colours.primary};
                                padding: 0 8px;
                                font-size: 15px;
                            `}`}
                        >
                            Вернуться к тексту
                        </button>
                    </div>
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
                    <span className={statusClass} role="status">
                        {status}
                    </span>
                </div>
            </Dialog>
        </>
    );
};

export default ServiceAudioPlayer;
