import { v, type Infer } from 'convex/values';
import { mutation, query } from './_generated/server';
import { requireAdmin } from './lib/admin';
import { broadcastDetails } from './lib/broadcastValidators';
import {
    BROADCAST_DURATION,
    formatMoscowDateTime,
    getBroadcastOccurrence,
    getNextBroadcastOccurrence,
    listBroadcastOccurrences,
    parseMoscowDateTime,
    type BroadcastOccurrence,
} from './lib/broadcastSchedule';

function validateDetails(details: Pick<Infer<typeof broadcastDetails>, 'title' | 'startAt' | 'streamUrl'>) {
    if (!details.title.trim() || details.title.length > 200) throw new Error('Укажите название (до 200 символов).');
    if (
        !Number.isFinite(details.startAt) ||
        !Number.isFinite(new Date(details.startAt).getTime()) ||
        details.startAt % 60000 !== 0 ||
        !Number.isFinite(parseMoscowDateTime(formatMoscowDateTime(details.startAt)))
    ) {
        throw new Error('Укажите корректную дату и время.');
    }
    if (details.streamUrl) {
        let url: URL;
        try {
            url = new URL(details.streamUrl);
        } catch {
            throw new Error('Укажите корректную ссылку.');
        }
        if (!['http:', 'https:'].includes(url.protocol))
            throw new Error('Ссылка должна начинаться с https:// или http://.');
    }
}

export const bannerCandidates = query({
    args: { dayStart: v.number(), dayEnd: v.number(), todayStart: v.number(), todayEnd: v.number() },
    handler: async (ctx, args) => {
        for (const [from, to] of [
            [args.dayStart, args.dayEnd],
            [args.todayStart, args.todayEnd],
        ]) {
            if (!Number.isFinite(from) || !Number.isFinite(to) || to <= from || to - from > 26 * BROADCAST_DURATION) {
                throw new Error('Invalid calendar day');
            }
        }
        const schedules = await ctx.db.query('broadcasts').collect();
        const candidates: BroadcastOccurrence[] = [];
        for (const broadcast of schedules) {
            const exceptions = await ctx.db
                .query('broadcastExceptions')
                .withIndex('byBroadcastDate', (q) => q.eq('broadcastId', broadcast._id))
                .collect();
            candidates.push(
                ...listBroadcastOccurrences(broadcast, exceptions, args.todayStart - BROADCAST_DURATION, args.todayEnd)
            );
            const next = getNextBroadcastOccurrence(broadcast, exceptions, args.todayEnd);
            if (next) candidates.push(next);
            if (args.dayStart !== args.todayStart)
                candidates.push(...listBroadcastOccurrences(broadcast, exceptions, args.dayStart, args.dayEnd));
        }
        const unique = new Map(
            candidates.map((occurrence) => [`${occurrence.broadcastId}:${occurrence.originalDate}`, occurrence])
        );
        return Array.from(unique.values()).sort((a, b) => a.startAt - b.startAt);
    },
});

export const adminList = query({
    args: {},
    handler: async (ctx) => {
        await requireAdmin(ctx);
        return await ctx.db.query('broadcasts').order('desc').collect();
    },
});

export const adminGet = query({
    args: { broadcastId: v.id('broadcasts') },
    handler: async (ctx, args) => {
        await requireAdmin(ctx);
        const broadcast = await ctx.db.get(args.broadcastId);
        if (!broadcast) return null;
        const exceptions = await ctx.db
            .query('broadcastExceptions')
            .withIndex('byBroadcastDate', (q) => q.eq('broadcastId', broadcast._id))
            .collect();
        return { broadcast, exceptions };
    },
});

export const save = mutation({
    args: { broadcastId: v.optional(v.id('broadcasts')), details: broadcastDetails },
    handler: async (ctx, args) => {
        await requireAdmin(ctx);
        validateDetails(args.details);
        const details = {
            ...args.details,
            title: args.details.title.trim(),
            streamUrl: args.details.streamUrl?.trim() || undefined,
        };
        if (args.broadcastId) {
            if (!(await ctx.db.get(args.broadcastId))) throw new Error('Трансляция не найдена.');
            await ctx.db.patch(args.broadcastId, { ...details, updatedAt: Date.now() });
            return args.broadcastId;
        }
        return await ctx.db.insert('broadcasts', { ...details, createdAt: Date.now(), updatedAt: Date.now() });
    },
});

export const saveOccurrence = mutation({
    args: {
        broadcastId: v.id('broadcasts'),
        originalDate: v.string(),
        title: v.string(),
        startAt: v.number(),
        streamUrl: v.optional(v.string()),
        cancelled: v.boolean(),
    },
    handler: async (ctx, args) => {
        await requireAdmin(ctx);
        const broadcast = await ctx.db.get(args.broadcastId);
        if (!broadcast?.weekly || !getBroadcastOccurrence(broadcast, args.originalDate))
            throw new Error('Событие расписания не найдено.');
        validateDetails(args);
        const existing = await ctx.db
            .query('broadcastExceptions')
            .withIndex('byBroadcastDate', (q) =>
                q.eq('broadcastId', args.broadcastId).eq('originalDate', args.originalDate)
            )
            .unique();
        const values = {
            ...args,
            title: args.title.trim(),
            streamUrl: args.streamUrl?.trim() || undefined,
            updatedAt: Date.now(),
        };
        if (existing) await ctx.db.patch(existing._id, values);
        else await ctx.db.insert('broadcastExceptions', values);
    },
});

export const remove = mutation({
    args: { broadcastId: v.id('broadcasts') },
    handler: async (ctx, args) => {
        await requireAdmin(ctx);
        const exceptions = await ctx.db
            .query('broadcastExceptions')
            .withIndex('byBroadcastDate', (q) => q.eq('broadcastId', args.broadcastId))
            .collect();
        for (const exception of exceptions) await ctx.db.delete(exception._id);
        await ctx.db.delete(args.broadcastId);
    },
});

export const resetOccurrence = mutation({
    args: { broadcastId: v.id('broadcasts'), originalDate: v.string() },
    handler: async (ctx, args) => {
        await requireAdmin(ctx);
        const exception = await ctx.db
            .query('broadcastExceptions')
            .withIndex('byBroadcastDate', (q) =>
                q.eq('broadcastId', args.broadcastId).eq('originalDate', args.originalDate)
            )
            .unique();
        if (exception) await ctx.db.delete(exception._id);
    },
});
