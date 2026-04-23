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
});
