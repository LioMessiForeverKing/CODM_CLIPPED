import { query } from "./_generated/server";

export const getCurrent = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("seasons")
      .withIndex("by_isCurrent", (q) => q.eq("isCurrent", true))
      .unique();
  },
});
