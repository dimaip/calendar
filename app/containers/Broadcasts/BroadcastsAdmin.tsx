import type { AppTheme } from 'styles/AppTheme';
import React, { useState } from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import { useMutation, useQuery } from 'convex/react';
import { Link, useHistory, useParams } from 'react-router-dom';

import { api } from '../../../convex/_generated/api';
import type { Doc, Id } from '../../../convex/_generated/dataModel';
import {
    BROADCAST_CHANNEL_URL,
    BROADCAST_DURATION,
    DAY,
    formatMoscowDateTime,
    getBroadcastOccurrence,
    listBroadcastOccurrences,
    parseMoscowDateTime,
} from '../../../convex/lib/broadcastSchedule';
import type { BroadcastOccurrence } from '../../../convex/lib/broadcastSchedule';

import AdminNavigation from 'components/AdminNavigation/AdminNavigation';
import Button from 'components/Button/Button';
import Header from 'components/Header/Header';
import Loader from 'components/Loader/Loader';
import LeftIcon from 'components/svgs/LeftIcon';
import { useSession } from 'containers/AuthProvider';
import { useDocumentTitle } from 'utils/useDocumentTitle';

interface BroadcastFormState {
    title: string;
    startAt: string;
    streamUrl: string;
    weekly: boolean;
    cancelled: boolean;
}

function BroadcastForm({
    broadcast,
    occurrence,
    exception,
}: {
    broadcast: Doc<'broadcasts'> | null;
    occurrence?: BroadcastOccurrence;
    exception?: Doc<'broadcastExceptions'>;
}) {
    const history = useHistory();
    const save = useMutation(api.broadcasts.save);
    const saveOccurrence = useMutation(api.broadcasts.saveOccurrence);
    const resetOccurrence = useMutation(api.broadcasts.resetOccurrence);
    const remove = useMutation(api.broadcasts.remove);
    const [form, setForm] = useState<BroadcastFormState>(() => ({
        title: occurrence?.title ?? broadcast?.title ?? '',
        startAt: occurrence
            ? formatMoscowDateTime(occurrence.startAt)
            : broadcast
              ? formatMoscowDateTime(broadcast.startAt)
              : '',
        streamUrl: occurrence ? (occurrence.streamUrl ?? '') : (broadcast?.streamUrl ?? ''),
        weekly: broadcast?.weekly ?? false,
        cancelled: exception?.cancelled ?? false,
    }));
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const theme = useTheme<AppTheme>();
    const formClass = css`
        display: grid;
        gap: 16px;
        padding: 16px;
        border-radius: 8px;
        background: ${theme.colours.white};
        label {
            display: grid;
            gap: 6px;
        }
        input:not([type='checkbox']),
        select {
            width: 100%;
            min-width: 0;
            padding: 12px;
            border: 1px solid ${theme.colours.lineGray};
            border-radius: 5px;
            background: ${theme.colours.bgGray};
            color: ${theme.colours.darkGray};
            font: inherit;
            color-scheme: ${theme.palette.type};
        }
        input[type='checkbox'] {
            width: 18px;
            height: 18px;
            accent-color: ${theme.colours.primary};
        }
        p {
            font-size: 13px;
            line-height: 1.4;
        }
        button {
            border-radius: 5px;
            padding: 12px;
            cursor: pointer;
        }
        button:disabled {
            opacity: 0.5;
            cursor: wait;
        }
    `;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        const startAt = parseMoscowDateTime(form.startAt);
        if (!Number.isFinite(startAt)) {
            setError('Проверьте дату и время трансляции.');
            return;
        }
        setSaving(true);
        try {
            if (broadcast && occurrence) {
                await saveOccurrence({
                    broadcastId: broadcast._id,
                    originalDate: occurrence.originalDate,
                    title: form.title,
                    startAt,
                    streamUrl: form.streamUrl.trim() || undefined,
                    cancelled: form.cancelled,
                });
                history.push(`/admin/broadcasts/${broadcast._id}`);
            } else {
                await save({
                    broadcastId: broadcast?._id,
                    details: {
                        title: form.title,
                        startAt,
                        streamUrl: form.streamUrl.trim() || undefined,
                        weekly: form.weekly,
                    },
                });
                history.push('/admin/broadcasts');
            }
        } catch (cause) {
            setError(cause instanceof Error ? cause.message : 'Не удалось сохранить трансляцию.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <form
            className={formClass}
            onSubmit={(event) => {
                void handleSubmit(event);
            }}
        >
            {occurrence && (
                <p>Изменения относятся только к событию {occurrence.originalDate}. Остальное расписание сохранится.</p>
            )}
            <label>
                Название богослужения
                <input
                    required
                    maxLength={200}
                    value={form.title}
                    onChange={(event) => setForm({ ...form, title: event.target.value })}
                />
            </label>
            <label>
                {form.weekly && !occurrence ? 'Начало расписания, дата и время (мск)' : 'Дата и время (мск)'}
                <input
                    required
                    type="datetime-local"
                    min="2020-01-01T00:00"
                    value={form.startAt}
                    onChange={(event) => setForm({ ...form, startAt: event.target.value })}
                />
            </label>
            <p>
                Введите московское время. Посетители увидят время в своём часовом поясе. После начала баннер показывает
                «Идет трансляция» в течение одного часа.
            </p>
            <label>
                Ссылка на трансляцию (необязательно)
                <input
                    type="url"
                    placeholder={BROADCAST_CHANNEL_URL}
                    value={form.streamUrl}
                    onChange={(event) => setForm({ ...form, streamUrl: event.target.value })}
                />
            </label>
            <p>Если ссылка не задана, баннер откроет канал с трансляциями.</p>
            {!occurrence && (
                <>
                    <label>
                        Повторение
                        <select
                            value={form.weekly ? 'weekly' : 'once'}
                            onChange={(event) => setForm({ ...form, weekly: event.target.value === 'weekly' })}
                        >
                            <option value="once">Один раз</option>
                            <option value="weekly">Каждую неделю</option>
                        </select>
                    </label>
                    {form.weekly && (
                        <p>
                            Повторяется каждую неделю в день и время начала расписания. Чтобы закончить, удалите
                            расписание.
                        </p>
                    )}
                </>
            )}
            {occurrence && (
                <label>
                    <input
                        type="checkbox"
                        checked={form.cancelled}
                        onChange={(event) => setForm({ ...form, cancelled: event.target.checked })}
                    />
                    Отменить только это событие
                </label>
            )}
            {error && <p role="alert">{error}</p>}
            <button
                disabled={saving}
                type="submit"
                className={css`
                    background: ${theme.colours.primary};
                    color: ${theme.colours.white};
                `}
            >
                {saving ? 'Сохранение…' : 'Сохранить'}
            </button>
            {broadcast && occurrence && exception && (
                <Button
                    disabled={saving}
                    onClick={() => {
                        setSaving(true);
                        setError(null);
                        void resetOccurrence({ broadcastId: broadcast._id, originalDate: occurrence.originalDate })
                            .then(() => {
                                history.push(`/admin/broadcasts/${broadcast._id}`);
                            })
                            .catch((cause: unknown) => {
                                setError(cause instanceof Error ? cause.message : 'Не удалось восстановить событие.');
                            })
                            .finally(() => setSaving(false));
                    }}
                >
                    Вернуть событие к расписанию
                </Button>
            )}
            {broadcast && !occurrence && (
                <Button
                    disabled={saving}
                    onClick={() => {
                        if (
                            !confirm(
                                broadcast.weekly
                                    ? 'Удалить расписание и все изменения его событий?'
                                    : 'Удалить трансляцию?'
                            )
                        )
                            return;
                        setSaving(true);
                        setError(null);
                        void remove({ broadcastId: broadcast._id })
                            .then(() => {
                                history.push('/admin/broadcasts');
                            })
                            .catch((cause: unknown) => {
                                setError(cause instanceof Error ? cause.message : 'Не удалось удалить трансляцию.');
                            })
                            .finally(() => setSaving(false));
                    }}
                >
                    {broadcast.weekly ? 'Удалить расписание' : 'Удалить трансляцию'}
                </Button>
            )}
        </form>
    );
}

export default function BroadcastsAdmin() {
    const { broadcastId, originalDate } = useParams<'broadcastId' | 'originalDate'>();
    const isNew = broadcastId === 'new';
    const session = useSession();
    const adminStatus = useQuery(api.updates.adminStatus, session.profile ? {} : 'skip');
    const schedules = useQuery(api.broadcasts.adminList, adminStatus?.isAdmin && !broadcastId ? {} : 'skip');
    const editing = useQuery(
        api.broadcasts.adminGet,
        adminStatus?.isAdmin && broadcastId && !isNew ? { broadcastId: broadcastId as Id<'broadcasts'> } : 'skip'
    );
    const history = useHistory();
    const theme = useTheme<AppTheme>();
    const title = originalDate
        ? 'Событие расписания'
        : isNew
          ? 'Новая трансляция'
          : broadcastId
            ? 'Редактировать трансляцию'
            : 'Админ: трансляции';
    useDocumentTitle(`${title} - Православное богослужение на русском языке`);

    let content: React.ReactNode;
    if (session.isLoading || (session.profile && adminStatus === undefined)) content = <Loader />;
    else if (!session.profile)
        content = (
            <Button
                onClick={() => {
                    void session.signIn();
                }}
            >
                Войти для управления трансляциями
            </Button>
        );
    else if (!adminStatus?.isAdmin) content = <p>Нет доступа к управлению трансляциями.</p>;
    else if (isNew) content = <BroadcastForm broadcast={null} />;
    else if (broadcastId) {
        if (editing === undefined) content = <Loader />;
        else if (!editing) content = <p>Трансляция не найдена.</p>;
        else {
            const { broadcast, exceptions } = editing;
            const base = originalDate ? getBroadcastOccurrence(broadcast, originalDate) : null;
            const exception = exceptions.find((item) => item.originalDate === originalDate);
            const occurrence =
                base && exception
                    ? { ...base, title: exception.title, startAt: exception.startAt, streamUrl: exception.streamUrl }
                    : base;
            if (originalDate && !occurrence) content = <p>Событие расписания не найдено.</p>;
            else {
                const now = Date.now();
                const preview = listBroadcastOccurrences(broadcast, [], now - BROADCAST_DURATION, now + 28 * DAY);
                const dates = Array.from(
                    new Set([
                        ...preview.map((item) => item.originalDate),
                        ...exceptions
                            .filter((item) => item.startAt + BROADCAST_DURATION > now)
                            .map((item) => item.originalDate),
                    ])
                ).sort();
                content = (
                    <>
                        <BroadcastForm
                            key={`${broadcast._id}:${originalDate ?? 'series'}`}
                            broadcast={broadcast}
                            occurrence={occurrence ?? undefined}
                            exception={exception}
                        />
                        {!originalDate && broadcast.weekly && (
                            <section
                                className={css`
                                    margin-top: 24px;
                                `}
                            >
                                <h2>Ближайшие события</h2>
                                <p>События на четыре недели и индивидуальные изменения. Всё время — московское.</p>
                                {dates.length === 0 && <p>В ближайшие четыре недели событий нет.</p>}
                                {dates.map((date) => {
                                    const baseOccurrence = getBroadcastOccurrence(broadcast, date);
                                    if (!baseOccurrence) return null;
                                    const override = exceptions.find((item) => item.originalDate === date);
                                    return (
                                        <div
                                            key={date}
                                            className={css`
                                                padding: 14px 0;
                                                border-bottom: 1px solid ${theme.colours.lineGray};
                                            `}
                                        >
                                            <Link to={`/admin/broadcasts/${broadcast._id}/occurrence/${date}`}>
                                                {formatMoscowDateTime(
                                                    override?.startAt ?? baseOccurrence.startAt
                                                ).replace('T', ' ')}{' '}
                                                мск — {override?.title ?? baseOccurrence.title}
                                                {override?.cancelled ? ' (отменено)' : override ? ' (изменено)' : ''}
                                            </Link>
                                        </div>
                                    );
                                })}
                            </section>
                        )}
                    </>
                );
            }
        }
    } else
        content = (
            <>
                <Link
                    className={css`
                        display: inline-block;
                        margin-bottom: 18px;
                        color: ${theme.colours.primary};
                    `}
                    to="/admin/broadcasts/new"
                >
                    + Новая трансляция
                </Link>
                {schedules === undefined ? (
                    <Loader />
                ) : schedules.length === 0 ? (
                    <p>Трансляций пока нет.</p>
                ) : (
                    schedules.map((broadcast) => (
                        <article
                            key={broadcast._id}
                            className={css`
                                padding: 16px;
                                margin-bottom: 12px;
                                border-radius: 8px;
                                background: ${theme.colours.white};
                            `}
                        >
                            <Link
                                to={`/admin/broadcasts/${broadcast._id}`}
                                className={css`
                                    display: block;
                                    font-weight: 600;
                                    margin-bottom: 8px;
                                `}
                            >
                                {broadcast.title}
                            </Link>
                            <p>
                                {broadcast.weekly
                                    ? `Каждую неделю: ${new Intl.DateTimeFormat('ru-RU', {
                                          timeZone: 'Europe/Moscow',
                                          weekday: 'long',
                                      }).format(
                                          broadcast.startAt
                                      )} в ${formatMoscowDateTime(broadcast.startAt).slice(11)} мск`
                                    : `${formatMoscowDateTime(broadcast.startAt).replace('T', ' ')} мск`}
                            </p>
                            {broadcast.weekly && <p>С {formatMoscowDateTime(broadcast.startAt).slice(0, 10)}</p>}
                            <Link to={`/admin/broadcasts/${broadcast._id}`}>
                                Редактировать{broadcast.weekly ? ' расписание и события' : ''}
                            </Link>
                        </article>
                    ))
                )}
            </>
        );

    return (
        <div>
            <Header>
                <div
                    className={css`
                        display: flex;
                        align-items: center;
                        height: 100%;
                        width: 100%;
                    `}
                >
                    <Button
                        title="Назад"
                        onClick={() => {
                            history.push(broadcastId ? '/admin/broadcasts' : '/updates');
                        }}
                    >
                        <LeftIcon />
                    </Button>
                    <h1
                        className={css`
                            font-size: 17px;
                            font-weight: 700;
                        `}
                    >
                        {title}
                    </h1>
                </div>
            </Header>
            {adminStatus?.isAdmin && <AdminNavigation />}
            <main
                className={css`
                    min-height: calc(100vh - 50px);
                    padding: 16px 12px 28px;
                    background: ${theme.colours.bgGrayLight};
                    color: ${theme.colours.darkGray};
                    line-height: 1.4;
                `}
            >
                {content}
            </main>
        </div>
    );
}
