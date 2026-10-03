import { v } from 'convex/values';

export const broadcastDetails = v.object({
    title: v.string(),
    startAt: v.number(),
    streamUrl: v.optional(v.string()),
    weekly: v.boolean(),
});
