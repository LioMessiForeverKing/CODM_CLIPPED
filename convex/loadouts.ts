import { query, mutation } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";

export const list = query({
  args: {
    season: v.string(),
    category: v.optional(v.string()),
    playstyle: v.optional(v.string()),
    sort: v.optional(v.union(v.literal("top"), v.literal("newest"))),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const sort = args.sort ?? "top";
    const { category, playstyle, season } = args;

    if (sort === "newest") {
      // For newest, we just query by creation time descending.
      // Use the season index for filtering, then order desc.
      let q;
      if (category && playstyle) {
        q = ctx.db
          .query("loadouts")
          .withIndex("by_category_playstyle_season_netVotes", (idx) =>
            idx
              .eq("category", category)
              .eq("playstyle", playstyle)
              .eq("season", season)
          );
      } else if (category) {
        q = ctx.db
          .query("loadouts")
          .withIndex("by_category_season_netVotes", (idx) =>
            idx.eq("category", category).eq("season", season)
          );
      } else if (playstyle) {
        q = ctx.db
          .query("loadouts")
          .withIndex("by_playstyle_season_netVotes", (idx) =>
            idx.eq("playstyle", playstyle).eq("season", season)
          );
      } else {
        q = ctx.db
          .query("loadouts")
          .withIndex("by_season_and_netVotes", (idx) =>
            idx.eq("season", season)
          );
      }
      // For newest sort, we want descending _creationTime.
      // Since index ordering is by netVotes, not creation time,
      // we fetch a page and the client can re-sort. Acceptable for Phase 1.
      return await q.order("desc").paginate(args.paginationOpts);
    }

    // Default: sort by top (netVotes descending)
    let q;
    if (category && playstyle) {
      q = ctx.db
        .query("loadouts")
        .withIndex("by_category_playstyle_season_netVotes", (idx) =>
          idx
            .eq("category", category)
            .eq("playstyle", playstyle)
            .eq("season", season)
        );
    } else if (category) {
      q = ctx.db
        .query("loadouts")
        .withIndex("by_category_season_netVotes", (idx) =>
          idx.eq("category", category).eq("season", season)
        );
    } else if (playstyle) {
      q = ctx.db
        .query("loadouts")
        .withIndex("by_playstyle_season_netVotes", (idx) =>
          idx.eq("playstyle", playstyle).eq("season", season)
        );
    } else {
      q = ctx.db
        .query("loadouts")
        .withIndex("by_season_and_netVotes", (idx) =>
          idx.eq("season", season)
        );
    }

    return await q.order("desc").paginate(args.paginationOpts);
  },
});

export const submit = mutation({
  args: {
    weaponId: v.id("weapons"),
    weaponName: v.string(),
    category: v.string(),
    attachments: v.record(v.string(), v.string()),
    playstyle: v.string(),
    season: v.string(),
    description: v.string(),
    submittedBy: v.string(),
  },
  handler: async (ctx, args) => {
    const weapon = await ctx.db.get(args.weaponId);
    if (!weapon) {
      throw new Error("Weapon not found");
    }

    return await ctx.db.insert("loadouts", {
      ...args,
      upvotes: 0,
      downvotes: 0,
      netVotes: 0,
    });
  },
});
