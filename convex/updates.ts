import { paginationOptsValidator } from 'convex/server';
import { v } from 'convex/values';

import { mutation, query } from './_generated/server';
import type { MutationCtx, QueryCtx } from './_generated/server';

const updateStatus = v.union(v.literal('draft'), v.literal('published'));
const updateCta = v.object({
    label: v.string(),
    url: v.string(),
});

const getAdminUserIds = () =>
    (process.env.UPDATES_ADMIN_USER_IDS ?? '')
        .split(',')
        .map((userId) => userId.trim())
        .filter(Boolean);

const requireAdmin = async (ctx: MutationCtx | QueryCtx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
        throw new Error('Not authenticated');
    }

    if (!getAdminUserIds().includes(identity.subject)) {
        throw new Error('Not authorized');
    }

    return identity;
};

export const adminStatus = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        return {
            isAdmin: identity ? getAdminUserIds().includes(identity.subject) : false,
            userId: identity?.subject ?? null,
        };
    },
});

export const getUnread = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return [];

        const now = Date.now();
        const reads = await ctx.db
            .query('updateReads')
            .withIndex('byUserUpdate', (q) => q.eq('userId', identity.subject))
            .collect();
        const readUpdateIds = new Set(reads.map((read) => read.updateId));

        const updates = await ctx.db
            .query('updates')
            .withIndex('byStatusPublishedAt', (q) => q.eq('status', 'published').lte('publishedAt', now))
            .order('desc')
            .collect();

        return updates.filter(
            (update) => !readUpdateIds.has(update._id) && (update.notifyUntil === undefined || update.notifyUntil > now)
        );
    },
});

export const list = query({
    args: {
        paginationOpts: paginationOptsValidator,
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return {
                page: [],
                isDone: true,
                continueCursor: '',
            };
        }

        const reads = await ctx.db
            .query('updateReads')
            .withIndex('byUserUpdate', (q) => q.eq('userId', identity.subject))
            .collect();
        const readAtByUpdateId = new Map(reads.map((read) => [read.updateId, read.readAt]));

        const page = await ctx.db
            .query('updates')
            .withIndex('byStatusPublishedAt', (q) => q.eq('status', 'published').lte('publishedAt', Date.now()))
            .order('desc')
            .paginate(args.paginationOpts);

        return {
            ...page,
            page: page.page.map((update) => {
                const readAt = readAtByUpdateId.get(update._id) ?? null;
                return {
                    ...update,
                    isRead: readAt !== null,
                    readAt,
                };
            }),
        };
    },
});

export const adminList = query({
    args: {
        paginationOpts: paginationOptsValidator,
    },
    handler: async (ctx, args) => {
        await requireAdmin(ctx);

        return await ctx.db.query('updates').order('desc').paginate(args.paginationOpts);
    },
});

export const adminGet = query({
    args: {
        updateId: v.id('updates'),
    },
    handler: async (ctx, args) => {
        await requireAdmin(ctx);

        return await ctx.db.get(args.updateId);
    },
});

export const markRead = mutation({
    args: {
        updateId: v.id('updates'),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error('Not authenticated');

        const update = await ctx.db.get(args.updateId);
        if (!update || update.status !== 'published' || update.publishedAt > Date.now()) {
            throw new Error('Update not found');
        }

        const existingRead = await ctx.db
            .query('updateReads')
            .withIndex('byUserUpdate', (q) => q.eq('userId', identity.subject).eq('updateId', args.updateId))
            .first();

        if (existingRead) {
            return existingRead._id;
        }

        return await ctx.db.insert('updateReads', {
            userId: identity.subject,
            updateId: args.updateId,
            readAt: Date.now(),
        });
    },
});

export const markAllRead = mutation({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error('Not authenticated');

        const now = Date.now();
        const updates = await ctx.db
            .query('updates')
            .withIndex('byStatusPublishedAt', (q) => q.eq('status', 'published').lte('publishedAt', now))
            .collect();
        const reads = await ctx.db
            .query('updateReads')
            .withIndex('byUserUpdate', (q) => q.eq('userId', identity.subject))
            .collect();
        const readUpdateIds = new Set(reads.map((read) => read.updateId));

        await Promise.all(
            updates
                .filter((update) => !readUpdateIds.has(update._id))
                .map((update) =>
                    ctx.db.insert('updateReads', {
                        userId: identity.subject,
                        updateId: update._id,
                        readAt: now,
                    })
                )
        );
    },
});

export const create = mutation({
    args: {
        title: v.optional(v.union(v.string(), v.null())),
        body: v.string(),
        cta: v.optional(v.union(updateCta, v.null())),
        status: v.optional(updateStatus),
        notifyUntil: v.optional(v.union(v.number(), v.null())),
    },
    handler: async (ctx, args) => {
        await requireAdmin(ctx);

        const now = Date.now();
        const status = args.status ?? 'draft';
        return await ctx.db.insert('updates', {
            title: args.title ?? undefined,
            body: args.body,
            cta: args.cta ?? undefined,
            status,
            publishedAt: status === 'published' ? now : 0,
            notifyUntil: args.notifyUntil ?? undefined,
            createdAt: now,
            updatedAt: now,
        });
    },
});

export const update = mutation({
    args: {
        updateId: v.id('updates'),
        title: v.optional(v.union(v.string(), v.null())),
        body: v.optional(v.string()),
        cta: v.optional(v.union(updateCta, v.null())),
        status: v.optional(updateStatus),
        publishedAt: v.optional(v.number()),
        notifyUntil: v.optional(v.union(v.number(), v.null())),
    },
    handler: async (ctx, args) => {
        await requireAdmin(ctx);

        const existing = await ctx.db.get(args.updateId);
        if (!existing) {
            throw new Error('Update not found');
        }

        const now = Date.now();
        const status = args.status ?? existing.status;
        const patch: Partial<typeof existing> = {
            updatedAt: now,
        };

        if (args.title !== undefined) patch.title = args.title ?? undefined;
        if (args.body !== undefined) patch.body = args.body;
        if (args.cta !== undefined) patch.cta = args.cta ?? undefined;
        if (args.status !== undefined) patch.status = args.status;
        if (args.notifyUntil !== undefined) patch.notifyUntil = args.notifyUntil ?? undefined;
        if (args.publishedAt !== undefined) {
            patch.publishedAt = args.publishedAt;
        } else if (existing.status !== 'published' && status === 'published' && existing.publishedAt === 0) {
            patch.publishedAt = now;
        }

        await ctx.db.patch(args.updateId, patch);
    },
});

export const remove = mutation({
    args: {
        updateId: v.id('updates'),
    },
    handler: async (ctx, args) => {
        await requireAdmin(ctx);

        const reads = await ctx.db
            .query('updateReads')
            .withIndex('byUpdate', (q) => q.eq('updateId', args.updateId))
            .collect();

        await Promise.all(reads.map((read) => ctx.db.delete(read._id)));
        await ctx.db.delete(args.updateId);
    },
});
