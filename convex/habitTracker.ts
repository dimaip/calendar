import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// --- Mutations ---

export const recordSession = mutation({
  args: {
    date: v.string(),
    timeOfDay: v.string(),
    durationSeconds: v.number(),
    serviceId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    await ctx.db.insert("habitTrackerSessions", {
      userId: identity.subject,
      date: args.date,
      timeOfDay: args.timeOfDay,
      durationSeconds: args.durationSeconds,
      serviceId: args.serviceId,
      createdAt: Date.now(),
    });
  },
});

export const saveSettings = mutation({
  args: {
    trackMorning: v.boolean(),
    trackEvening: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("userSettings")
      .withIndex("byUser", (q) => q.eq("userId", identity.subject))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        habitTracker: {
          trackMorning: args.trackMorning,
          trackEvening: args.trackEvening,
        },
      });
    } else {
      await ctx.db.insert("userSettings", {
        userId: identity.subject,
        habitTracker: {
          trackMorning: args.trackMorning,
          trackEvening: args.trackEvening,
        },
      });
    }
  },
});

// --- Queries ---

export const getSettings = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const settings = await ctx.db
      .query("userSettings")
      .withIndex("byUser", (q) => q.eq("userId", identity.subject))
      .unique();

    return settings ?? null;
  },
});

export const getSessionsForRange = query({
  args: {
    startDate: v.string(),
    endDate: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const sessions = await ctx.db
      .query("habitTrackerSessions")
      .withIndex("byUserDate", (q) =>
        q
          .eq("userId", identity.subject)
          .gte("date", args.startDate)
          .lte("date", args.endDate)
      )
      .collect();

    return sessions;
  },
});

export const getStreak = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return 0;

    const settings = await ctx.db
      .query("userSettings")
      .withIndex("byUser", (q) => q.eq("userId", identity.subject))
      .unique();

    if (!settings?.habitTracker) return 0;

    const { trackMorning, trackEvening } = settings.habitTracker;

    // Load all sessions for this user, sorted by date descending
    const sessions = await ctx.db
      .query("habitTrackerSessions")
      .withIndex("byUser", (q) => q.eq("userId", identity.subject))
      .collect();

    // Group sessions by date
    const sessionsByDate: Record<string, Set<string>> = {};
    for (const session of sessions) {
      if (!sessionsByDate[session.date]) {
        sessionsByDate[session.date] = new Set();
      }
      sessionsByDate[session.date].add(session.timeOfDay);
    }

    // Walk backwards from today
    const today = new Date();
    let streak = 0;
    let checkDate = new Date(today);

    // Check if today's goal is met; if not, start from yesterday
    const todayStr = formatDate(checkDate);
    if (!meetsGoal(sessionsByDate[todayStr], trackMorning, trackEvening)) {
      checkDate.setDate(checkDate.getDate() - 1);
    }

    while (true) {
      const dateStr = formatDate(checkDate);
      if (!meetsGoal(sessionsByDate[dateStr], trackMorning, trackEvening)) {
        break;
      }
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    }

    return streak;
  },
});

export const getBestStreak = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return 0;

    const settings = await ctx.db
      .query("userSettings")
      .withIndex("byUser", (q) => q.eq("userId", identity.subject))
      .unique();

    if (!settings?.habitTracker) return 0;

    const { trackMorning, trackEvening } = settings.habitTracker;

    const sessions = await ctx.db
      .query("habitTrackerSessions")
      .withIndex("byUser", (q) => q.eq("userId", identity.subject))
      .collect();

    // Group sessions by date
    const sessionsByDate: Record<string, Set<string>> = {};
    for (const session of sessions) {
      if (!sessionsByDate[session.date]) {
        sessionsByDate[session.date] = new Set();
      }
      sessionsByDate[session.date].add(session.timeOfDay);
    }

    // Get all dates sorted
    const dates = Object.keys(sessionsByDate).sort();
    if (dates.length === 0) return 0;

    let bestStreak = 0;
    let currentStreak = 0;

    for (let i = 0; i < dates.length; i++) {
      if (meetsGoal(sessionsByDate[dates[i]], trackMorning, trackEvening)) {
        // Check if consecutive with previous date
        if (i === 0) {
          currentStreak = 1;
        } else {
          const prev = new Date(dates[i - 1]);
          const curr = new Date(dates[i]);
          const diffDays = Math.round((curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
          if (diffDays === 1) {
            currentStreak++;
          } else {
            currentStreak = 1;
          }
        }
        bestStreak = Math.max(bestStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    }

    return bestStreak;
  },
});

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function meetsGoal(
  timesOfDay: Set<string> | undefined,
  trackMorning: boolean,
  trackEvening: boolean
): boolean {
  if (!timesOfDay) return false;
  if (trackMorning && !timesOfDay.has("morning")) return false;
  if (trackEvening && !timesOfDay.has("evening")) return false;
  return true;
}
