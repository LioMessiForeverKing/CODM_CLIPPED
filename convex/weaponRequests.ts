import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("weaponRequests")
      .withIndex("by_votes")
      .order("desc")
      .take(50);
  },
});

export const submit = mutation({
  args: {
    weaponName: v.string(),
    category: v.optional(v.string()),
    reason: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if this weapon was already requested (case-insensitive)
    const all = await ctx.db.query("weaponRequests").collect();
    const existing = all.find(
      (r) => r.weaponName.toLowerCase() === args.weaponName.toLowerCase()
    );

    if (existing) {
      // Upvote the existing request instead of creating a duplicate
      await ctx.db.patch(existing._id, { votes: existing.votes + 1 });
      return { action: "upvoted", id: existing._id };
    }

    const id = await ctx.db.insert("weaponRequests", {
      weaponName: args.weaponName,
      category: args.category,
      reason: args.reason,
      votes: 1,
    });
    return { action: "created", id };
  },
});

export const upvote = mutation({
  args: { id: v.id("weaponRequests") },
  handler: async (ctx, args) => {
    const request = await ctx.db.get(args.id);
    if (!request) throw new Error("Request not found");
    await ctx.db.patch(args.id, { votes: request.votes + 1 });
  },
});
