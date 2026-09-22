import React, { ReactNode, useEffect, useState } from 'react';
import { css } from 'emotion';
import { useMutation, usePaginatedQuery, useQuery } from 'convex/react';
import { useTheme } from 'emotion-theming';
import { useHistory, useParams } from 'react-router-dom';
import Button from 'components/Button/Button';
import Header from 'components/Header/Header';
import Input from 'components/Input/Input';
import Loader from 'components/Loader/Loader';
import Textarea from 'components/Textarea/Textarea';
import LeftIcon from 'components/svgs/LeftIcon';
import PlusIcon from 'components/svgs/PlusIcon';
import { useSession } from 'containers/AuthProvider';
import { useDocumentTitle } from 'utils/useDocumentTitle';
import type { AppTheme } from 'styles/AppTheme';

import { api } from '../../../convex/_generated/api';
import type { Id } from '../../../convex/_generated/dataModel';

const PAGE_SIZE = 20;

type UpdateStatus = 'draft' | 'published';

type AdminUpdate = {
    _id: Id<'updates'>;
    title?: string;
    body: string;
    cta?: {
        label: string;
        url: string;
    };
    status: UpdateStatus;
    publishedAt: number;
    notifyUntil?: number;
};

type UpdateFormState = {
    title: string;
    body: string;
    ctaLabel: string;
    ctaUrl: string;
    status: UpdateStatus;
    publishedAt: string;
    notifyUntil: string;
};

function toDateTimeLocal(timestamp?: number): string {
    if (!timestamp) {
        return '';
    }

    const date = new Date(timestamp);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000).toISOString().slice(0, 16);
}

function fromDateTimeLocal(value: string): number | undefined {
    if (!value) {
        return undefined;
    }

    const timestamp = new Date(value).getTime();
    return Number.isNaN(timestamp) ? undefined : timestamp;
}

function getEmptyForm(): UpdateFormState {
    return {
        title: '',
        body: '',
        ctaLabel: '',
        ctaUrl: '',
        status: 'draft',
        publishedAt: '',
        notifyUntil: '',
    };
}

function getFormFromUpdate(update: AdminUpdate): UpdateFormState {
    return {
        title: update.title ?? '',
        body: update.body,
        ctaLabel: update.cta?.label ?? '',
        ctaUrl: update.cta?.url ?? '',
        status: update.status,
        publishedAt: toDateTimeLocal(update.publishedAt),
        notifyUntil: toDateTimeLocal(update.notifyUntil),
    };
}

function formatAdminDate(timestamp?: number): string {
    if (!timestamp) {
        return 'не задано';
    }

    return new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(timestamp));
}

const UpdatesAdminHeader = ({ title, action }: { title: string; action?: ReactNode }) => {
    const history = useHistory();

    return (
        <Header>
            <div
                className={css`
                    display: flex;
                    width: 100%;
                    height: 100%;
                    align-items: center;
                `}
            >
                <Button
                    title="Назад"
                    onClick={() => {
                        history.push('/updates');
                    }}
                    className={css`
                        padding: 18px !important;
                    `}
                >
                    <LeftIcon />
                </Button>
                <h1
                    className={css`
                        min-width: 0;
                        flex: 1;
                        overflow: hidden;
                        font-size: 17px;
                        font-weight: 700;
                        line-height: 1.2;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    `}
                >
                    {title}
                </h1>
                {action}
            </div>
        </Header>
    );
};

const UpdatesAdmin = () => {
    const history = useHistory();
    const { updateId } = useParams<{ updateId?: string }>();
    const isCreateScreen = history.location.pathname === '/admin/updates/new';
    const isEditScreen = !!updateId;
    const isFormScreen = isCreateScreen || isEditScreen;
    const title = isCreateScreen
        ? 'Новое обновление'
        : isEditScreen
        ? 'Редактировать обновление'
        : 'Админ: обновления';

    useDocumentTitle(`${title} - Православное богослужение на русском языке`);

    const theme = useTheme<AppTheme>();
    const session = useSession();
    const profile = session.profile;
    const adminStatus = useQuery(api.updates.adminStatus, profile ? undefined : 'skip');
    const updatesQuery = usePaginatedQuery(api.updates.adminList, adminStatus?.isAdmin && !isFormScreen ? {} : 'skip', {
        initialNumItems: PAGE_SIZE,
    });
    const editingUpdate = useQuery(
        api.updates.adminGet,
        adminStatus?.isAdmin && updateId ? { updateId: updateId as Id<'updates'> } : 'skip'
    );
    const createUpdate = useMutation(api.updates.create);
    const updateUpdate = useMutation(api.updates.update);
    const removeUpdate = useMutation(api.updates.remove);
    const [form, setForm] = useState<UpdateFormState>(() => getEmptyForm());
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
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
        setError(null);
        if (isCreateScreen) {
            setForm(getEmptyForm());
            return;
        }
        if (editingUpdate) {
            setForm(getFormFromUpdate(editingUpdate as AdminUpdate));
        }
    }, [editingUpdate?._id, isCreateScreen]);

    const setField = (field: keyof UpdateFormState, value: string) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const save = async () => {
        setError(null);

        const title = form.title.trim();
        const body = form.body.trim();
        const ctaLabel = form.ctaLabel.trim();
        const ctaUrl = form.ctaUrl.trim();
        const publishedAt = fromDateTimeLocal(form.publishedAt);
        const notifyUntil = fromDateTimeLocal(form.notifyUntil);

        if (!body) {
            setError('Текст обновления обязателен.');
            return;
        }
        if ((ctaLabel && !ctaUrl) || (!ctaLabel && ctaUrl)) {
            setError('Для CTA нужны и подпись, и путь.');
            return;
        }

        const cta = ctaLabel && ctaUrl ? { label: ctaLabel, url: ctaUrl } : null;
        setIsSaving(true);

        try {
            if (isEditScreen && updateId) {
                await updateUpdate({
                    updateId: updateId as Id<'updates'>,
                    title: title || null,
                    body,
                    cta,
                    status: form.status,
                    publishedAt,
                    notifyUntil: notifyUntil ?? null,
                });
            } else {
                await createUpdate({
                    title: title || null,
                    body,
                    cta,
                    status: form.status,
                    notifyUntil: notifyUntil ?? null,
                });
            }
            history.push('/admin/updates');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Не удалось сохранить обновление.');
        } finally {
            setIsSaving(false);
        }
    };

    const remove = async (update: AdminUpdate) => {
        if (!confirm('Удалить обновление?')) {
            return;
        }

        setError(null);
        try {
            await removeUpdate({ updateId: update._id });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Не удалось удалить обновление.');
        }
    };

    if (session.isLoading || !profile || adminStatus === undefined) {
        return (
            <div>
                <UpdatesAdminHeader title={title} />
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

    if (!adminStatus.isAdmin) {
        return (
            <div>
                <UpdatesAdminHeader title={title} />
                <main
                    className={css`
                        min-height: calc(100vh - 50px - env(safe-area-inset-top));
                        padding: 24px 14px;
                        background: ${pageBg};
                        color: ${text};
                    `}
                >
                    <div
                        className={css`
                            padding: 18px;
                            border-radius: 8px;
                            background: ${cardBg};
                            font-size: 16px;
                            line-height: 1.35;
                        `}
                    >
                        Нет доступа.
                        {adminStatus.userId && (
                            <div
                                className={css`
                                    margin-top: 10px;
                                    color: ${muted};
                                    font-size: 13px;
                                    line-height: 1.35;
                                    word-break: break-all;
                                `}
                            >
                                ID пользователя: {adminStatus.userId}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        );
    }

    if (isFormScreen) {
        if (isEditScreen && editingUpdate === undefined) {
            return (
                <div>
                    <UpdatesAdminHeader title={title} />
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

        if (isEditScreen && editingUpdate === null) {
            return (
                <div>
                    <UpdatesAdminHeader title={title} />
                    <main
                        className={css`
                            min-height: calc(100vh - 50px - env(safe-area-inset-top));
                            padding: 24px 14px;
                            background: ${pageBg};
                            color: ${text};
                        `}
                    >
                        <div
                            className={css`
                                padding: 18px;
                                border-radius: 8px;
                                background: ${cardBg};
                                font-size: 16px;
                                line-height: 1.35;
                            `}
                        >
                            Обновление не найдено.
                        </div>
                    </main>
                </div>
            );
        }

        return (
            <div>
                <UpdatesAdminHeader title={title} />
                <main
                    className={css`
                        min-height: calc(100vh - 50px - env(safe-area-inset-top));
                        padding: 16px 12px 28px;
                        background: ${pageBg};
                        color: ${text};
                    `}
                >
                    <form
                        onSubmit={(event) => event.preventDefault()}
                        className={css`
                            padding: 14px;
                            border-radius: 8px;
                            background: ${cardBg};
                        `}
                    >
                        <label
                            className={css`
                                display: block;
                                margin-bottom: 10px;
                                font-size: 13px;
                                color: ${muted};
                            `}
                        >
                            Заголовок
                            <Input
                                value={form.title}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    setField('title', event.target.value)
                                }
                                className={css`
                                    margin-top: 5px;
                                `}
                            />
                        </label>
                        <label
                            className={css`
                                display: block;
                                margin-bottom: 10px;
                                font-size: 13px;
                                color: ${muted};
                            `}
                        >
                            Текст
                            <Textarea
                                value={form.body}
                                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                                    setField('body', event.target.value)
                                }
                                className={css`
                                    min-height: 180px !important;
                                    margin-top: 5px;
                                    color: ${text};
                                `}
                            />
                        </label>
                        <div
                            className={css`
                                display: grid;
                                gap: 10px;
                                margin-bottom: 10px;
                            `}
                        >
                            <label
                                className={css`
                                    display: block;
                                    font-size: 13px;
                                    color: ${muted};
                                `}
                            >
                                Статус
                                <select
                                    value={form.status}
                                    onChange={(event) => setField('status', event.target.value)}
                                    className={css`
                                        width: 100%;
                                        margin-top: 5px;
                                        padding: 12px;
                                        border: 1px solid ${theme.colours.lineGray};
                                        border-radius: 5px;
                                        background: ${theme.colours.bgGray};
                                        color: ${text};
                                        font: inherit;
                                    `}
                                >
                                    <option value="draft">Черновик</option>
                                    <option value="published">Опубликовано</option>
                                </select>
                            </label>
                            {isEditScreen && (
                                <label
                                    className={css`
                                        display: block;
                                        font-size: 13px;
                                        color: ${muted};
                                    `}
                                >
                                    Дата публикации
                                    <Input
                                        type="datetime-local"
                                        value={form.publishedAt}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                            setField('publishedAt', event.target.value)
                                        }
                                        className={css`
                                            margin-top: 5px;
                                        `}
                                    />
                                </label>
                            )}
                            <label
                                className={css`
                                    display: block;
                                    font-size: 13px;
                                    color: ${muted};
                                `}
                            >
                                Показывать уведомление до
                                <Input
                                    type="datetime-local"
                                    value={form.notifyUntil}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                        setField('notifyUntil', event.target.value)
                                    }
                                    className={css`
                                        margin-top: 5px;
                                    `}
                                />
                            </label>
                        </div>
                        <div
                            className={css`
                                display: grid;
                                gap: 10px;
                                margin-bottom: 12px;
                            `}
                        >
                            <label
                                className={css`
                                    display: block;
                                    font-size: 13px;
                                    color: ${muted};
                                `}
                            >
                                CTA подпись
                                <Input
                                    value={form.ctaLabel}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                        setField('ctaLabel', event.target.value)
                                    }
                                    className={css`
                                        margin-top: 5px;
                                    `}
                                />
                            </label>
                            <label
                                className={css`
                                    display: block;
                                    font-size: 13px;
                                    color: ${muted};
                                `}
                            >
                                CTA путь
                                <Input
                                    value={form.ctaUrl}
                                    placeholder="#/sermons"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                        setField('ctaUrl', event.target.value)
                                    }
                                    className={css`
                                        margin-top: 5px;
                                    `}
                                />
                            </label>
                        </div>
                        {error && (
                            <div
                                className={css`
                                    margin-bottom: 12px;
                                    color: ${theme.colours.red};
                                    font-size: 14px;
                                    line-height: 1.3;
                                `}
                            >
                                {error}
                            </div>
                        )}
                        <Button
                            disabled={isSaving}
                            onClick={() => void save()}
                            className={css`
                                width: 100%;
                                border-radius: 8px;
                                background: ${primary};
                                color: ${primaryContrast} !important;
                                opacity: ${isSaving ? 0.7 : 1};
                            `}
                        >
                            {isSaving ? 'Сохранение...' : isEditScreen ? 'Сохранить' : 'Создать'}
                        </Button>
                    </form>
                </main>
            </div>
        );
    }

    return (
        <div>
            <UpdatesAdminHeader
                title={title}
                action={
                    <Button
                        title="Новое обновление"
                        onClick={() => history.push('/admin/updates/new')}
                        className={css`
                            padding: 13px 16px !important;
                        `}
                    >
                        <PlusIcon width={22} />
                    </Button>
                }
            />
            <main
                className={css`
                    min-height: calc(100vh - 50px - env(safe-area-inset-top));
                    padding: 16px 12px 28px;
                    background: ${pageBg};
                    color: ${text};
                `}
            >
                {error && (
                    <div
                        className={css`
                            margin-bottom: 12px;
                            color: ${theme.colours.red};
                            font-size: 14px;
                            line-height: 1.3;
                        `}
                    >
                        {error}
                    </div>
                )}
                {updatesQuery.status === 'LoadingFirstPage' ? (
                    <Loader />
                ) : (
                    <div
                        className={css`
                            display: grid;
                            gap: 10px;
                        `}
                    >
                        {updatesQuery.results.map((update) => (
                            <article
                                key={update._id}
                                className={css`
                                    padding: 13px;
                                    border-radius: 8px;
                                    background: ${cardBg};
                                `}
                            >
                                <div
                                    className={css`
                                        display: flex;
                                        align-items: flex-start;
                                        justify-content: space-between;
                                        gap: 12px;
                                        margin-bottom: 8px;
                                    `}
                                >
                                    <div>
                                        <div
                                            className={css`
                                                margin-bottom: 4px;
                                                font-size: 16px;
                                                font-weight: 700;
                                                line-height: 1.25;
                                            `}
                                        >
                                            {update.title || 'Без заголовка'}
                                        </div>
                                        <div
                                            className={css`
                                                color: ${muted};
                                                font-size: 12px;
                                                line-height: 1.3;
                                            `}
                                        >
                                            {update.status === 'published' ? 'Опубликовано' : 'Черновик'} ·{' '}
                                            {formatAdminDate(update.publishedAt)}
                                        </div>
                                    </div>
                                    <span
                                        className={css`
                                            flex-shrink: 0;
                                            padding: 3px 7px;
                                            border-radius: 999px;
                                            background: ${update.status === 'published'
                                                ? theme.colours.blue
                                                : theme.colours.bgGray};
                                            color: ${update.status === 'published' ? '#fff' : muted};
                                            font-size: 11px;
                                            line-height: 1.2;
                                        `}
                                    >
                                        {update.status}
                                    </span>
                                </div>
                                <div
                                    className={css`
                                        display: -webkit-box;
                                        overflow: hidden;
                                        margin-bottom: 8px;
                                        font-size: 14px;
                                        line-height: 1.35;
                                        -webkit-box-orient: vertical;
                                        -webkit-line-clamp: 3;
                                    `}
                                >
                                    {update.body}
                                </div>
                                {update.cta && (
                                    <div
                                        className={css`
                                            margin-bottom: 8px;
                                            color: ${primary};
                                            font-size: 13px;
                                            line-height: 1.3;
                                        `}
                                    >
                                        {update.cta.label} · {update.cta.url}
                                    </div>
                                )}
                                <div
                                    className={css`
                                        margin-bottom: 10px;
                                        color: ${muted};
                                        font-size: 12px;
                                        line-height: 1.3;
                                    `}
                                >
                                    Уведомление до: {formatAdminDate(update.notifyUntil)}
                                </div>
                                <div
                                    className={css`
                                        display: flex;
                                        gap: 8px;
                                    `}
                                >
                                    <Button
                                        onClick={() => {
                                            history.push(`/admin/updates/${update._id}`);
                                        }}
                                        className={css`
                                            flex: 1;
                                            border-radius: 8px;
                                            background: ${theme.colours.bgGray};
                                            color: ${text};
                                        `}
                                    >
                                        Изменить
                                    </Button>
                                    <Button
                                        onClick={() => void remove(update as AdminUpdate)}
                                        className={css`
                                            border-radius: 8px;
                                            color: ${theme.colours.red};
                                        `}
                                    >
                                        Удалить
                                    </Button>
                                </div>
                            </article>
                        ))}
                        {updatesQuery.status === 'CanLoadMore' && (
                            <Button
                                onClick={() => updatesQuery.loadMore(PAGE_SIZE)}
                                className={css`
                                    border-radius: 8px;
                                    background: ${cardBg};
                                    color: ${primary};
                                `}
                            >
                                Загрузить ещё
                            </Button>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default UpdatesAdmin;
