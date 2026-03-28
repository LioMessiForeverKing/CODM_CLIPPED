import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const seedWeapon = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    // Idempotency: check if weapon already exists by slug
    const existing = await ctx.db
      .query("weapons")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    if (existing) {
      return { action: "skipped", slug: args.slug };
    }

    await ctx.db.insert("weapons", args);
    return { action: "inserted", slug: args.slug };
  },
});

export const seedSeason = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    startDate: v.number(),
    endDate: v.number(),
    isCurrent: v.boolean(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("seasons")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    if (existing) {
      return { action: "skipped", slug: args.slug };
    }

    await ctx.db.insert("seasons", args);
    return { action: "inserted", slug: args.slug };
  },
});
