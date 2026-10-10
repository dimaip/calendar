import type { MutationCtx, QueryCtx } from '../_generated/server';

export const getAdminUserIds = () =>
    (process.env.UPDATES_ADMIN_USER_IDS ?? '')
        .split(',')
        .map((userId) => userId.trim())
        .filter(Boolean);

export const requireAdmin = async (ctx: MutationCtx | QueryCtx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Not authenticated');
    if (!getAdminUserIds().includes(identity.subject)) throw new Error('Not authorized');
    return identity;
};
