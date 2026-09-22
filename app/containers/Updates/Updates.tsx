import React, { useEffect, useRef } from 'react';
import { css } from 'emotion';
import { useMutation, usePaginatedQuery, useQuery } from 'convex/react';
import { useTheme } from 'emotion-theming';
import { useHistory } from 'react-router-dom';
import Header from 'components/Header/Header';
import Button from 'components/Button/Button';
import LeftIcon from 'components/svgs/LeftIcon';
import CrossIcon from 'components/svgs/CrossIcon';
import Loader from 'components/Loader/Loader';
import { useSession } from 'containers/AuthProvider';
import { useDocumentTitle } from 'utils/useDocumentTitle';
import type { AppTheme } from 'styles/AppTheme';

import { api } from '../../../convex/_generated/api';

const PAGE_SIZE = 12;

function formatUpdateDate(timestamp: number): string {
    const secondsAgo = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
    const intervals: Array<{ unit: Intl.RelativeTimeFormatUnit; seconds: number }> = [
        { unit: 'year', seconds: 365 * 24 * 60 * 60 },
        { unit: 'month', seconds: 30 * 24 * 60 * 60 },
        { unit: 'week', seconds: 7 * 24 * 60 * 60 },
        { unit: 'day', seconds: 24 * 60 * 60 },
        { unit: 'hour', seconds: 60 * 60 },
        { unit: 'minute', seconds: 60 },
    ];
    const formatter = new Intl.RelativeTimeFormat('ru', { numeric: 'always' });
    const interval = intervals.find(({ seconds }) => secondsAgo >= seconds);

    if (!interval) {
        return 'только что';
    }

    return formatter.format(-Math.floor(secondsAgo / interval.seconds), interval.unit);
}

const UpdatesHeader = () => {
    const history = useHistory();
    const theme = useTheme<AppTheme>();

    return (
        <Header>
            <div
                className={css`
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    min-width: 0;
                `}
            >
                <Button
                    title="Назад"
                    onClick={() => {
                        history.push('/profile');
                    }}
                    className={css`
                        padding: 18px !important;
                    `}
                >
                    <LeftIcon />
                </Button>
                <div
                    className={css`
                        display: flex;
                        min-width: 0;
                        align-items: center;
                        gap: 11px;
                        padding-right: 14px;
                    `}
                >
                    <span
                        className={css`
                            display: inline-flex;
                            width: 35px;
                            height: 35px;
                            flex-shrink: 0;
                            align-items: center;
                            justify-content: center;
                            border: 1px solid ${theme.colours.lineGray};
                            border-radius: 50%;
                            background: ${theme.colours.white};
                        `}
                    >
                        <CrossIcon colour={theme.colours.blue} />
                    </span>
                    <span
                        className={css`
                            min-width: 0;
                            overflow: hidden;
                            color: ${theme.colours.darkGray};
                            font-size: 16px;
                            line-height: 1.2;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        `}
                    >
                        Православное богослужение на русском языке
                    </span>
                </div>
            </div>
        </Header>
    );
};

const Updates = () => {
    useDocumentTitle('Обновления - Православное богослужение на русском языке');

    const theme = useTheme<AppTheme>();
    const history = useHistory();
    const session = useSession();
    const markAllRead = useMutation(api.updates.markAllRead);
    const markedReadRef = useRef(false);
    const profile = session.profile;
    const adminStatus = useQuery(api.updates.adminStatus, profile ? undefined : 'skip');
    const updatesQuery = usePaginatedQuery(api.updates.list, profile ? {} : 'skip', {
        initialNumItems: PAGE_SIZE,
    });
    const { loadMore, results, status } = updatesQuery;
    const loadOlderRef = useRef<HTMLDivElement | null>(null);
    const updates = [...results].reverse();
    const pageBg = theme.colours?.bgGrayLight || '#EFEFF4';
    const cardBg = theme.colours?.white || '#ffffff';
    const text = theme.colours?.darkGray || '#201f24';
    const muted = theme.colours?.gray || '#717175';
    const primary = theme.colours?.primary || '#ae831a';
    const primaryContrast = theme.colours?.white === '#201f24' ? '#201f24' : '#ffffff';

    useEffect(() => {
        if (!session.isLoading && !profile) {
            void session.signIn();
        }
    }, [profile, session]);

    useEffect(() => {
        if (!profile || markedReadRef.current) {
            return;
        }

        markedReadRef.current = true;
        void markAllRead();
    }, [markAllRead, profile]);

    useEffect(() => {
        const loadOlderElement = loadOlderRef.current;
        if (!loadOlderElement || status !== 'CanLoadMore') {
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    loadMore(PAGE_SIZE);
                }
            },
            { rootMargin: '160px 0px 0px 0px' }
        );

        observer.observe(loadOlderElement);
        return () => observer.disconnect();
    }, [loadMore, status]);

    if (session.isLoading || !profile) {
        return (
            <div>
                <UpdatesHeader />
                <div
                    className={css`
                        display: flex;
                        min-height: calc(100vh - 50px - env(safe-area-inset-top));
                        align-items: center;
                        justify-content: center;
                        background: ${pageBg};
                    `}
                >
                    <Loader />
                </div>
            </div>
        );
    }

    return (
        <div>
            <UpdatesHeader />
            <main
                className={css`
                    display: flex;
                    min-height: calc(100vh - 50px - env(safe-area-inset-top));
                    flex-direction: column;
                    background: ${pageBg};
                    color: ${text};
                `}
            >
                <div
                    className={css`
                        flex: 1;
                        padding: 20px 12px 18px;
                    `}
                >
                    {adminStatus?.isAdmin && (
                        <Button
                            onClick={() => {
                                history.push('/admin/updates');
                            }}
                            className={css`
                                display: block;
                                margin: 0 0 14px auto;
                                padding: 8px 12px !important;
                                border-radius: 8px;
                                background: ${cardBg};
                                color: ${primary};
                                font-size: 14px;
                                line-height: 1.2;
                            `}
                        >
                            Админ
                        </Button>
                    )}
                    {status === 'LoadingFirstPage' ? (
                        <div
                            className={css`
                                display: flex;
                                min-height: 280px;
                                align-items: center;
                                justify-content: center;
                            `}
                        >
                            <Loader />
                        </div>
                    ) : (
                        <>
                            {status === 'CanLoadMore' && (
                                <div ref={loadOlderRef}>
                                    <Button
                                        onClick={() => loadMore(PAGE_SIZE)}
                                        className={css`
                                            display: block;
                                            margin: 0 auto 17px;
                                            padding: 0 !important;
                                            color: ${primary};
                                            font-size: 14px;
                                            line-height: 1.2;
                                            text-decoration: underline;
                                            text-underline-offset: 2px;
                                            cursor: pointer;
                                        `}
                                    >
                                        Показать более ранние
                                    </Button>
                                </div>
                            )}
                            {status === 'LoadingMore' && (
                                <div
                                    className={css`
                                        margin-bottom: 17px;
                                    `}
                                >
                                    <Loader width={34} />
                                </div>
                            )}
                            {updates.length === 0 ? (
                                <div
                                    className={css`
                                        display: flex;
                                        min-height: 280px;
                                        align-items: center;
                                        justify-content: center;
                                        padding: 0 24px;
                                        color: ${muted};
                                        font-size: 15px;
                                        line-height: 1.35;
                                        text-align: center;
                                    `}
                                >
                                    Здесь будут появляться новости об обновлениях приложения.
                                </div>
                            ) : (
                                <div
                                    className={css`
                                        display: flex;
                                        flex-direction: column;
                                        gap: 12px;
                                    `}
                                >
                                    {updates.map((update) => (
                                        <article
                                            key={update._id}
                                            className={css`
                                                max-width: 92%;
                                                align-self: flex-start;
                                                padding: 14px 15px 15px;
                                                border: 1px solid ${theme.colours.lineGray};
                                                border-radius: 8px 8px 8px 2px;
                                                background: ${cardBg};
                                                box-shadow: 0 1px 1px rgba(0, 0, 0, 0.06);
                                            `}
                                        >
                                            {update.title && (
                                                <h2
                                                    className={css`
                                                        margin-bottom: 8px;
                                                        color: ${text};
                                                        font-size: 16px;
                                                        font-weight: 700;
                                                        line-height: 1.25;
                                                    `}
                                                >
                                                    {update.title}
                                                </h2>
                                            )}
                                            <div
                                                className={css`
                                                    color: ${text};
                                                    font-size: 16px;
                                                    line-height: 1.32;
                                                    white-space: pre-wrap;
                                                `}
                                            >
                                                {update.body}
                                            </div>
                                            {update.cta && (
                                                <a
                                                    className={css`
                                                        display: inline-block;
                                                        margin-top: 13px;
                                                        color: ${primary};
                                                        font-size: 15px;
                                                        line-height: 1.2;
                                                        text-decoration: underline;
                                                        text-underline-offset: 2px;
                                                    `}
                                                    href={update.cta.url}
                                                    target="_blank"
                                                    rel="noopener"
                                                >
                                                    {update.cta.label}
                                                </a>
                                            )}
                                            <time
                                                className={css`
                                                    display: block;
                                                    margin-top: 10px;
                                                    color: ${muted};
                                                    font-size: 12px;
                                                    line-height: 1.2;
                                                    text-align: right;
                                                `}
                                                dateTime={new Date(update.publishedAt).toISOString()}
                                            >
                                                {formatUpdateDate(update.publishedAt)}
                                            </time>
                                        </article>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
                <div
                    className={css`
                        position: sticky;
                        bottom: 0;
                        padding: 12px 12px calc(12px + env(safe-area-inset-bottom));
                        background: linear-gradient(180deg, transparent 0, ${pageBg} 18px, ${pageBg} 100%);
                    `}
                >
                    <a
                        className={css`
                            display: flex;
                            width: 100%;
                            height: 46px;
                            align-items: center;
                            justify-content: center;
                            border-radius: 8px;
                            background: ${primary};
                            color: ${primaryContrast};
                            font-size: 15px;
                            line-height: 1.2;
                            text-decoration: none;
                        `}
                        href="mailto:pb@psmb.ru"
                    >
                        Сообщить об ошибке
                    </a>
                </div>
            </main>
        </div>
    );
};

export default Updates;
