import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import weaponsData from "../data/weapons.json";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL!;
const client = new ConvexHttpClient(CONVEX_URL);

async function seed() {
  // Seed the current season
  await client.mutation(api.seed.seedSeason, {
    name: "Season 14 2025",
    slug: "s14-2025",
    startDate: Date.now(),
    endDate: Date.now() + 90 * 24 * 60 * 60 * 1000,
    isCurrent: true,
  });

  console.log("Seeded season: s14-2025");

  // Seed weapons (cast to satisfy TypeScript record types)
  for (const weapon of weaponsData) {
    const result = await client.mutation(api.seed.seedWeapon, {
      name: weapon.name,
      slug: weapon.slug,
      category: weapon.category,
      stats: weapon.stats as Record<string, { damage: number; range: number; fireRate: number; accuracy: number; mobility: number; control: number }>,
      attachmentSlots: weapon.attachmentSlots,
      availableAttachments: weapon.availableAttachments as Record<string, string[]>,
    });
    console.log(`${result.action}: ${result.slug}`);
  }

  console.log("Seed complete!");
}

seed().catch(console.error);
