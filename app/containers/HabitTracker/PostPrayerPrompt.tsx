import React, { useEffect, useRef, useState } from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import type { AppTheme } from 'styles/AppTheme';

import { trackedPrayerLabelByTimeOfDay } from './trackedPrayerTimeOfDay';
import type { TrackedPrayerTimeOfDay } from './trackedPrayerTimeOfDay';

const POST_PRAYER_PROMPT_DISMISS_MS = 4000;
const POST_PRAYER_PROMPT_ANIMATION_MS = 600;

interface PostPrayerPromptProps {
    timeOfDay: TrackedPrayerTimeOfDay | null | undefined;
    onDismiss: () => void;
}

const PostPrayerPrompt = ({ timeOfDay, onDismiss }: PostPrayerPromptProps) => {
    const theme = useTheme<AppTheme>();
    const [visibleTimeOfDay, setVisibleTimeOfDay] = useState<TrackedPrayerTimeOfDay | null>(timeOfDay ?? null);
    const [isExiting, setIsExiting] = useState(false);
    const onDismissRef = useRef(onDismiss);

    useEffect(() => {
        onDismissRef.current = onDismiss;
    }, [onDismiss]);

    useEffect(() => {
        if (!timeOfDay) return;

        setVisibleTimeOfDay(timeOfDay);
        setIsExiting(false);

        const dismissTimeout = window.setTimeout(() => {
            setIsExiting(true);
        }, POST_PRAYER_PROMPT_DISMISS_MS);
        const removeTimeout = window.setTimeout(() => {
            onDismissRef.current();
            setVisibleTimeOfDay(null);
            setIsExiting(false);
        }, POST_PRAYER_PROMPT_DISMISS_MS + POST_PRAYER_PROMPT_ANIMATION_MS);

        return () => {
            window.clearTimeout(dismissTimeout);
            window.clearTimeout(removeTimeout);
        };
    }, [timeOfDay]);

    if (!visibleTimeOfDay) return null;

    const background = theme.colours?.bgGrayLight || '#EFEFF4';
    const border = theme.colours?.lineGray || '#CECED2';
    const text = theme.colours?.darkGray || '#201f24';
    const blue = theme.colours?.blue || '#4169E1';

    return (
        <>
            <div
                className={css`
                    height: calc(52px + env(safe-area-inset-bottom));
                `}
            />
            <div
                role="status"
                aria-live="polite"
                className={css`
                    position: fixed;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    z-index: 30;
                    box-sizing: border-box;
                    display: flex;
                    width: 100%;
                    min-height: calc(52px + env(safe-area-inset-bottom));
                    align-items: center;
                    gap: 13px;
                    padding: 10px 18px calc(10px + env(safe-area-inset-bottom));
                    border-top: 1px solid ${border};
                    background: ${background};
                    color: ${text};
                    font-size: 16px;
                    line-height: 1.25;
                    animation: ${isExiting ? 'prayerPromptOut' : 'prayerPromptIn'} ${POST_PRAYER_PROMPT_ANIMATION_MS}ms
                        ease-out both;

                    @keyframes prayerPromptIn {
                        from {
                            opacity: 0;
                            transform: translateY(8px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes prayerPromptOut {
                        from {
                            opacity: 1;
                            transform: translateY(0);
                        }
                        to {
                            opacity: 0;
                            transform: translateY(10px);
                        }
                    }

                    @media (prefers-reduced-motion: reduce) {
                        animation: none;
                    }
                `}
            >
                <span
                    className={css`
                        display: flex;
                        width: 31px;
                        height: 31px;
                        flex-shrink: 0;
                        align-items: center;
                        justify-content: center;
                    `}
                    aria-hidden="true"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" fill="none" viewBox="0 0 31 31">
                        <circle
                            cx="15.5"
                            cy="15.5"
                            r="15.5"
                            fill={blue}
                            className={css`
                                transform-origin: 15.5px 15.5px;
                                animation: prayerPromptCircle 380ms ease-out both;

                                @keyframes prayerPromptCircle {
                                    0% {
                                        opacity: 0.65;
                                        transform: scale(0.82);
                                    }
                                    62% {
                                        transform: scale(1.06);
                                    }
                                    100% {
                                        opacity: 1;
                                        transform: scale(1);
                                    }
                                }

                                @media (prefers-reduced-motion: reduce) {
                                    animation: none;
                                }
                            `}
                        />
                        <path
                            d="M8.2 15.95 12.7 20.7 22.8 9.95"
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.4"
                            className={css`
                                stroke-dasharray: 22;
                                stroke-dashoffset: 22;
                                animation: prayerPromptCheck 420ms 130ms ease-out forwards;

                                @keyframes prayerPromptCheck {
                                    to {
                                        stroke-dashoffset: 0;
                                    }
                                }

                                @media (prefers-reduced-motion: reduce) {
                                    animation: none;
                                    stroke-dashoffset: 0;
                                }
                            `}
                        />
                    </svg>
                </span>
                <span>Сегодня вы совершили {trackedPrayerLabelByTimeOfDay[visibleTimeOfDay]} молитву</span>
            </div>
        </>
    );
};

export default PostPrayerPrompt;
