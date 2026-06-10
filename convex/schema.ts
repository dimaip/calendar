import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  userSettings: defineTable({
    userId: v.string(),
    habitTracker: v.optional(
      v.object({
        trackMorning: v.boolean(),
        trackEvening: v.boolean(),
      })
    ),
  }).index("byUser", ["userId"]),

  habitTrackerSessions: defineTable({
    userId: v.string(),
    date: v.string(),
    timeOfDay: v.string(),
    durationSeconds: v.number(),
    serviceId: v.string(),
    createdAt: v.number(),
  })
    .index("byUserDate", ["userId", "date"])
    .index("byUser", ["userId"])
    .index("byUserSession", ["userId", "date", "timeOfDay", "serviceId"]),

  updates: defineTable({
    title: v.optional(v.string()),
    body: v.string(),
    cta: v.optional(
      v.object({
        label: v.string(),
        url: v.string(),
      })
    ),
    status: v.union(v.literal("draft"), v.literal("published")),
    publishedAt: v.number(),
    notifyUntil: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("byStatusPublishedAt", ["status", "publishedAt"]),

  updateReads: defineTable({
    userId: v.string(),
    updateId: v.id("updates"),
    readAt: v.number(),
  })
    .index("byUserUpdate", ["userId", "updateId"])
    .index("byUpdate", ["updateId"]),
});
