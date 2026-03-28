import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  weapons: defineTable({
    name: v.string(),
    slug: v.string(),
    category: v.string(),
    stats: v.record(
      v.string(),
      v.object({
        damage: v.number(),
        range: v.number(),
        fireRate: v.number(),
        accuracy: v.number(),
        mobility: v.number(),
        control: v.number(),
      })
    ),
    attachmentSlots: v.array(v.string()),
    availableAttachments: v.record(v.string(), v.array(v.string())),
    attachmentModifiers: v.optional(
      v.record(v.string(), v.record(v.string(), v.number()))
    ),
    imageUrl: v.optional(v.string()),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"]),

  loadouts: defineTable({
    weaponId: v.id("weapons"),
    weaponName: v.string(),
    category: v.string(),
    attachments: v.record(v.string(), v.string()),
    playstyle: v.string(),
    season: v.string(),
    description: v.string(),
    submittedBy: v.string(),
    upvotes: v.number(),
    downvotes: v.number(),
    netVotes: v.number(),
  })
    .index("by_season_and_netVotes", ["season", "netVotes"])
    .index("by_category_season_netVotes", [
      "category",
      "season",
      "netVotes",
    ])
    .index("by_playstyle_season_netVotes", [
      "playstyle",
      "season",
      "netVotes",
    ])
    .index("by_category_playstyle_season_netVotes", [
      "category",
      "playstyle",
      "season",
      "netVotes",
    ]),

  votes: defineTable({
    loadoutId: v.id("loadouts"),
    voterIp: v.string(),
    vote: v.union(v.literal("up"), v.literal("down")),
  }).index("by_loadout_and_voterIp", ["loadoutId", "voterIp"]),

  weaponRequests: defineTable({
    weaponName: v.string(),
    category: v.optional(v.string()),
    reason: v.optional(v.string()),
    votes: v.number(),
  }).index("by_votes", ["votes"]),

  seasons: defineTable({
    name: v.string(),
    slug: v.string(),
    startDate: v.number(),
    endDate: v.number(),
    isCurrent: v.boolean(),
  })
    .index("by_slug", ["slug"])
    .index("by_isCurrent", ["isCurrent"]),
});
