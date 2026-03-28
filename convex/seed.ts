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

export const clearWeapons = mutation({
  args: {},
  handler: async (ctx) => {
    const weapons = await ctx.db.query("weapons").collect();
    for (const w of weapons) {
      await ctx.db.delete(w._id);
    }
    return { deleted: weapons.length };
  },
});

export const seedLoadout = mutation({
  args: {
    weaponSlug: v.string(),
    weaponName: v.string(),
    category: v.string(),
    attachments: v.record(v.string(), v.string()),
    playstyle: v.string(),
    season: v.string(),
    description: v.string(),
    submittedBy: v.string(),
    upvotes: v.number(),
    downvotes: v.number(),
  },
  handler: async (ctx, args) => {
    // Look up weapon by slug
    const weapon = await ctx.db
      .query("weapons")
      .withIndex("by_slug", (q) => q.eq("slug", args.weaponSlug))
      .unique();

    if (!weapon) {
      return { action: "skipped", reason: `weapon not found: ${args.weaponSlug}` };
    }

    const netVotes = args.upvotes - args.downvotes;

    await ctx.db.insert("loadouts", {
      weaponId: weapon._id,
      weaponName: args.weaponName,
      category: args.category,
      attachments: args.attachments,
      playstyle: args.playstyle,
      season: args.season,
      description: args.description,
      submittedBy: args.submittedBy,
      upvotes: args.upvotes,
      downvotes: args.downvotes,
      netVotes,
    });

    return { action: "inserted", weapon: args.weaponName, by: args.submittedBy };
  },
});

export const clearLoadouts = mutation({
  args: {},
  handler: async (ctx) => {
    const loadouts = await ctx.db.query("loadouts").collect();
    for (const l of loadouts) {
      await ctx.db.delete(l._id);
    }
    return { deleted: loadouts.length };
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
