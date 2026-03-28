import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const cast = mutation({
  args: {
    loadoutId: v.id("loadouts"),
    voterIp: v.string(),
    vote: v.union(v.literal("up"), v.literal("down")),
  },
  handler: async (ctx, args) => {
    const loadout = await ctx.db.get(args.loadoutId);
    if (!loadout) {
      throw new Error("Loadout not found");
    }

    const existing = await ctx.db
      .query("votes")
      .withIndex("by_loadout_and_voterIp", (q) =>
        q.eq("loadoutId", args.loadoutId).eq("voterIp", args.voterIp)
      )
      .unique();

    if (existing) {
      if (existing.vote === args.vote) {
        // Same vote again: un-vote (remove)
        await ctx.db.delete(existing._id);
        const delta = args.vote === "up" ? -1 : 1;
        await ctx.db.patch(loadout._id, {
          upvotes: loadout.upvotes + (args.vote === "up" ? -1 : 0),
          downvotes: loadout.downvotes + (args.vote === "down" ? -1 : 0),
          netVotes: loadout.netVotes + delta,
        });
        return { action: "removed" };
      } else {
        // Changing vote direction
        await ctx.db.patch(existing._id, { vote: args.vote });
        const delta = args.vote === "up" ? 2 : -2;
        await ctx.db.patch(loadout._id, {
          upvotes: loadout.upvotes + (args.vote === "up" ? 1 : -1),
          downvotes: loadout.downvotes + (args.vote === "down" ? 1 : -1),
          netVotes: loadout.netVotes + delta,
        });
        return { action: "changed" };
      }
    }

    // New vote
    await ctx.db.insert("votes", {
      loadoutId: args.loadoutId,
      voterIp: args.voterIp,
      vote: args.vote,
    });

    const delta = args.vote === "up" ? 1 : -1;
    await ctx.db.patch(loadout._id, {
      upvotes: loadout.upvotes + (args.vote === "up" ? 1 : 0),
      downvotes: loadout.downvotes + (args.vote === "down" ? 1 : 0),
      netVotes: loadout.netVotes + delta,
    });

    return { action: "created" };
  },
});
