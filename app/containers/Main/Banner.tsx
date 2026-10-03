import React from 'react';
import { css } from 'emotion';

import { BROADCAST_CHANNEL_URL } from '../../../convex/lib/broadcastSchedule';

import { formatBroadcastCountdown } from 'domain/broadcastBanner';
import type { BroadcastBanner } from 'domain/broadcastBanner';

const Banner = ({ banner, now }: { banner: BroadcastBanner; now: number }) => (
    <a
        href={banner.occurrence?.streamUrl || BROADCAST_CHANNEL_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-broadcast-state={banner.state}
        data-broadcast-placement={banner.placement}
        className={css`
            display: block;
            position: relative;
            overflow: hidden;
            min-height: ${banner.state === 'generic' ? '80px' : banner.state === 'live' ? '108px' : '141px'};
            background-color: #aa945f;
            background-image: url('/assets/icons/hands.svg?v=figma-20261003');
            background-repeat: no-repeat;
            background-size: auto ${banner.state === 'live' || banner.state === 'generic' ? '141px' : '100%'};
            background-position: right top;
            color: #fff;
            border-radius: 10px;
            padding: 12px;
            margin: 0 -10px;
            text-decoration: none;
            line-height: 1.15;
            &:focus-visible {
                outline: 3px solid #201f24;
                outline-offset: 3px;
            }
        `}
    >
        <div
            className={css`
                position: relative;
                width: 72%;
                max-width: 360px;
                overflow-wrap: anywhere;
            `}
        >
            <div
                className={css`
                    color: #201f24;
                    font-size: 18px;
                    line-height: 1.15;
                    @media (max-width: 360px) {
                        font-size: 16px;
                    }
                `}
            >
                {banner.state === 'live' && banner.occurrence ? (
                    <>Трансляция: {banner.occurrence.title}</>
                ) : (
                    <>
                        Трансляция богослужений
                        <br />
                        на русском языке
                    </>
                )}
            </div>
            {banner.occurrence && (
                <>
                    <div
                        className={css`
                            margin-top: ${banner.state === 'live' ? '20px' : '10px'};
                            font-size: ${banner.state === 'live' ? '22px' : '34px'};
                            font-variant-numeric: tabular-nums;
                            line-height: 1.1;
                            white-space: nowrap;
                            @media (max-width: 360px) {
                                font-size: ${banner.state === 'live' ? '22px' : '32px'};
                            }
                        `}
                    >
                        {banner.state === 'live' ? (
                            <span
                                className={css`
                                    display: inline-flex;
                                    align-items: center;
                                    gap: 6px;
                                    &::before {
                                        content: '';
                                        width: 9px;
                                        height: 9px;
                                        flex-shrink: 0;
                                        border-radius: 50%;
                                        background: #ed2345;
                                    }
                                `}
                            >
                                идет прямо сейчас
                            </span>
                        ) : banner.state === 'countdown' ? (
                            formatBroadcastCountdown(banner.occurrence.startAt, now)
                        ) : (
                            <time dateTime={new Date(banner.occurrence.startAt).toISOString()}>
                                {new Intl.DateTimeFormat('ru-RU', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: '2-digit',
                                }).format(banner.occurrence.startAt)}{' '}
                                {new Intl.DateTimeFormat('ru-RU', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                }).format(banner.occurrence.startAt)}
                            </time>
                        )}
                    </div>
                    {banner.state !== 'live' && (
                        <div
                            className={css`
                                margin-top: 4px;
                                font-size: 13px;
                                line-height: 1.15;
                            `}
                        >
                            {banner.state === 'countdown'
                                ? 'время до начала трансляции'
                                : 'начало ближайшей трансляции'}
                            <br />
                            {banner.occurrence.title}
                        </div>
                    )}
                </>
            )}
        </div>
    </a>
);
export default Banner;
