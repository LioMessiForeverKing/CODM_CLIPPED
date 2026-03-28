import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL!;
const client = new ConvexHttpClient(CONVEX_URL);

const SEASON = "s14-2025";

interface LoadoutSeed {
  weaponSlug: string;
  weaponName: string;
  category: string;
  attachments: Record<string, string>;
  playstyle: string;
  description: string;
  submittedBy: string;
  upvotes: number;
  downvotes: number;
}

const loadouts: LoadoutSeed[] = [
  // === iFerg Loadouts ===
  {
    weaponSlug: "mac-10",
    weaponName: "MAC-10",
    category: "smg",
    attachments: {
      muzzle: "Agency Suppressor",
      barrel: "Task Force Barrel",
      stock: "No Stock",
      rear_grip: "SASR Jungle Grip",
      ammunition: "43 Round Speed Mag",
    },
    playstyle: "aggressive",
    description:
      "iFerg's go-to MAC-10 rush build. Maximum mobility with suppressed flanking power. Dominates close-range ranked matches.",
    submittedBy: "iFerg",
    upvotes: 72,
    downvotes: 5,
  },
  {
    weaponSlug: "qq9",
    weaponName: "QQ9",
    category: "smg",
    attachments: {
      muzzle: "Monolithic Suppressor",
      barrel: "MIP Extended Light Barrel",
      stock: "No Stock",
      rear_grip: "Granulated Grip Tape",
      laser: "OWC Laser - Tactical",
    },
    playstyle: "aggressive",
    description:
      "iFerg's legendary QQ9 build from ranked. Fast ADS, great hipfire, still shreds at mid-range. A classic.",
    submittedBy: "iFerg",
    upvotes: 91,
    downvotes: 7,
  },
  {
    weaponSlug: "m13",
    weaponName: "M13",
    category: "assault_rifle",
    attachments: {
      barrel: "RTC Marksman",
      stock: "No Stock",
      rear_grip: "Granulated Grip Tape",
      ammunition: ".300 Blackout Ammo",
      underbarrel: "Ranger Foregrip",
    },
    playstyle: "balanced",
    description:
      "iFerg's zero-recoil M13 that beams across the map. The .300 Blackout ammo makes this thing a laser with insane TTK.",
    submittedBy: "iFerg",
    upvotes: 97,
    downvotes: 8,
  },
  {
    weaponSlug: "fennec",
    weaponName: "Fennec",
    category: "smg",
    attachments: {
      barrel: "MIP Light Barrel (Short)",
      stock: "No Stock",
      rear_grip: "Stippled Grip Tape",
      ammunition: "Akimbo",
      laser: "MIP Laser 5mW",
    },
    playstyle: "aggressive",
    description:
      "iFerg's Akimbo Fennec chaos build. Spray and pray at close range — hilarious and surprisingly effective in hardpoint.",
    submittedBy: "iFerg",
    upvotes: 68,
    downvotes: 15,
  },
  {
    weaponSlug: "dl-q33",
    weaponName: "DL Q33",
    category: "sniper",
    attachments: {
      barrel: "OWC Marksman",
      optic: "Default Scope",
      stock: "OWC Skeleton Stock",
      rear_grip: "Stippled Grip Tape",
      laser: "OWC Laser - Tactical",
    },
    playstyle: "aggressive",
    description:
      "iFerg quickscope DL Q33 for S&D. Lightning ADS speed while keeping one-shot potential. Hit your shots or get clipped.",
    submittedBy: "iFerg",
    upvotes: 58,
    downvotes: 4,
  },

  // === Noah (NoahFromYouTube) Loadouts ===
  {
    weaponSlug: "ak-47",
    weaponName: "AK-47",
    category: "assault_rifle",
    attachments: {
      muzzle: "OWC Compensator",
      barrel: "OWC Ranger",
      stock: "YKM Combat Stock",
      rear_grip: "Granulated Grip Tape",
      underbarrel: "Strike Foregrip",
    },
    playstyle: "balanced",
    description:
      "Noah's balanced AK-47 for all-around ranked play. Recoil is manageable, damage is still elite. The OG never dies.",
    submittedBy: "Noah",
    upvotes: 82,
    downvotes: 6,
  },
  {
    weaponSlug: "cbr4",
    weaponName: "CBR4",
    category: "smg",
    attachments: {
      muzzle: "Monolithic Suppressor",
      barrel: "MIP Extended Light Barrel",
      stock: "No Stock",
      rear_grip: "Granulated Grip Tape",
      laser: "OWC Laser - Tactical",
    },
    playstyle: "aggressive",
    description:
      "Noah's ranked CBR4 meta build. This was THE weapon to run for multiple seasons. Suppressed, fast, and consistent.",
    submittedBy: "Noah",
    upvotes: 93,
    downvotes: 7,
  },
  {
    weaponSlug: "kilo-141",
    weaponName: "Kilo 141",
    category: "assault_rifle",
    attachments: {
      muzzle: "Monolithic Suppressor",
      barrel: "OWC Ranger",
      stock: "RTC Steady Stock",
      rear_grip: "Granulated Grip Tape",
      underbarrel: "Ranger Foregrip",
    },
    playstyle: "long-range",
    description:
      "Noah's Kilo 141 for holding lanes. Steady stock + Ranger makes this a headglitch monster. Zero recoil at long range.",
    submittedBy: "Noah",
    upvotes: 65,
    downvotes: 4,
  },
  {
    weaponSlug: "holger-26",
    weaponName: "Holger 26",
    category: "lmg",
    attachments: {
      muzzle: "Monolithic Suppressor",
      barrel: "MIP Extended Light Barrel",
      stock: "No Stock",
      ammunition: "30 Round Light Mag",
      rear_grip: "Granulated Grip Tape",
    },
    playstyle: "balanced",
    description:
      "Noah's Holger 26 AR conversion. With the 30 Round Light Mag it handles like an AR but hits like an LMG. Underrated.",
    submittedBy: "Noah",
    upvotes: 54,
    downvotes: 3,
  },

  // === HawksNest Loadouts ===
  {
    weaponSlug: "m13",
    weaponName: "M13",
    category: "assault_rifle",
    attachments: {
      muzzle: "Monolithic Suppressor",
      barrel: "Tempus Marksman",
      stock: "RTC Steady Stock",
      underbarrel: "Ranger Foregrip",
      rear_grip: "Granulated Grip Tape",
    },
    playstyle: "long-range",
    description:
      "HawksNest's statistically optimal M13 for maximum accuracy. Tested every combo — this has the tightest spread at range.",
    submittedBy: "HawksNest",
    upvotes: 83,
    downvotes: 5,
  },
  {
    weaponSlug: "type-25",
    weaponName: "Type 25",
    category: "assault_rifle",
    attachments: {
      muzzle: "OWC Compensator",
      barrel: "OWC Ranger",
      stock: "No Stock",
      rear_grip: "Stippled Grip Tape",
      laser: "OWC Laser - Tactical",
    },
    playstyle: "aggressive",
    description:
      "HawksNest speed Type 25 for aggressive ranked play. Insane fire rate with enough stability to win gunfights consistently.",
    submittedBy: "HawksNest",
    upvotes: 49,
    downvotes: 3,
  },
  {
    weaponSlug: "peacekeeper-mk2",
    weaponName: "Peacekeeper MK2",
    category: "assault_rifle",
    attachments: {
      barrel: "Task Force Barrel",
      stock: "No Stock",
      rear_grip: "Airborne Elastic Wrap",
      ammunition: "40 Round Fast Mag",
      laser: "OWC Laser - Tactical",
    },
    playstyle: "aggressive",
    description:
      "HawksNest's Peacekeeper build after the buff. Task Force + Elastic Wrap gives elite ADS. One of the best hybrid weapons now.",
    submittedBy: "HawksNest",
    upvotes: 61,
    downvotes: 4,
  },

  // === Bobby Plays Loadouts ===
  {
    weaponSlug: "dr-h",
    weaponName: "DR-H",
    category: "assault_rifle",
    attachments: {
      muzzle: "OWC Compensator",
      barrel: "OWC Marksman",
      stock: "No Stock",
      ammunition: "30 Round OTM Mag",
      rear_grip: "Granulated Grip Tape",
    },
    playstyle: "aggressive",
    description:
      "Bobby's OTM DR-H that melts everything. The OTM mag is mandatory — turns a 4-shot kill into a 3-shot at close range.",
    submittedBy: "BobbyPlays",
    upvotes: 71,
    downvotes: 5,
  },
  {
    weaponSlug: "man-o-war",
    weaponName: "Man-O-War",
    category: "assault_rifle",
    attachments: {
      muzzle: "OWC Compensator",
      barrel: "OWC Marksman",
      stock: "YKM Combat Stock",
      rear_grip: "Granulated Grip Tape",
      underbarrel: "Ranger Foregrip",
    },
    playstyle: "long-range",
    description:
      "Bobby's ranked Man-O-War that 3-taps at insane distances. Slow but deadly — play your angles and you won't lose gunfights.",
    submittedBy: "BobbyPlays",
    upvotes: 52,
    downvotes: 4,
  },
  {
    weaponSlug: "pp19-bizon",
    weaponName: "PP19 Bizon",
    category: "smg",
    attachments: {
      muzzle: "Monolithic Suppressor",
      barrel: "OWC Ranger",
      stock: "No Stock",
      rear_grip: "Stippled Grip Tape",
      laser: "MIP Laser 5mW",
    },
    playstyle: "aggressive",
    description:
      "Bobby's hipfire Bizon. 84 rounds, no reloads needed. Rush in, spray the room, come out alive. Perfect for hardpoint.",
    submittedBy: "BobbyPlays",
    upvotes: 40,
    downvotes: 2,
  },

  // === Parker the Slayer Loadouts ===
  {
    weaponSlug: "locus",
    weaponName: "Locus",
    category: "sniper",
    attachments: {
      barrel: "YKM Lightweight Short",
      optic: "Default Scope",
      stock: "OWC Skeleton Stock",
      rear_grip: "Stippled Grip Tape",
      laser: "OWC Laser - Tactical",
    },
    playstyle: "aggressive",
    description:
      "Parker's quickscope Locus for S&D highlights. Fastest ADS possible while keeping one-shot consistency. Pure skill weapon.",
    submittedBy: "ParkerTheSlayer",
    upvotes: 67,
    downvotes: 5,
  },
  {
    weaponSlug: "rus-79u",
    weaponName: "RUS-79U",
    category: "smg",
    attachments: {
      muzzle: "Monolithic Suppressor",
      barrel: "MIP Extended Light Barrel",
      stock: "No Stock",
      rear_grip: "Granulated Grip Tape",
      ammunition: "38 Round Extended Mag",
    },
    playstyle: "aggressive",
    description:
      "Parker's RUS rush build. One of the most balanced SMGs in the game — good at everything, bad at nothing. Reliable ranked pick.",
    submittedBy: "ParkerTheSlayer",
    upvotes: 43,
    downvotes: 2,
  },
  {
    weaponSlug: "swordfish",
    weaponName: "Swordfish",
    category: "assault_rifle",
    attachments: {
      barrel: "OWC Ranger",
      stock: "YKM Combat Stock",
      rear_grip: "Granulated Grip Tape",
      ammunition: "Halberd Mag",
      underbarrel: "Strike Foregrip",
    },
    playstyle: "long-range",
    description:
      "Parker's Swordfish with Halberd rounds. One burst kill at most ranges. High skill ceiling but incredibly rewarding.",
    submittedBy: "ParkerTheSlayer",
    upvotes: 38,
    downvotes: 3,
  },

  // === Jokesta Loadouts ===
  {
    weaponSlug: "cr-56-amax",
    weaponName: "CR-56 AMAX",
    category: "assault_rifle",
    attachments: {
      muzzle: "Monolithic Suppressor",
      barrel: "OWC Ranger",
      stock: "YKM Combat Stock",
      ammunition: "M67 Ammo",
      rear_grip: "Granulated Grip Tape",
    },
    playstyle: "balanced",
    description:
      "Jokesta's AMAX with M67 rounds — the sleeper pick. Two-shot potential at close range. Risk-reward playstyle that hits different.",
    submittedBy: "Jokesta",
    upvotes: 56,
    downvotes: 7,
  },
  {
    weaponSlug: "as-val",
    weaponName: "AS VAL",
    category: "assault_rifle",
    attachments: {
      muzzle: "OWC Compensator",
      barrel: "OWC Ranger",
      stock: "No Stock",
      rear_grip: "Stippled Grip Tape",
      ammunition: "30 Round Extended Mag",
    },
    playstyle: "aggressive",
    description:
      "Jokesta's stealth AS VAL. Built-in suppressor + insane fire rate. Perfect for flanking in S&D. They won't hear you coming.",
    submittedBy: "Jokesta",
    upvotes: 46,
    downvotes: 3,
  },
  {
    weaponSlug: "krm-262",
    weaponName: "KRM-262",
    category: "shotgun",
    attachments: {
      muzzle: "Choke",
      barrel: "OWC Marksman",
      stock: "No Stock",
      rear_grip: "Stippled Grip Tape",
      laser: "MIP Laser 5mW",
    },
    playstyle: "aggressive",
    description:
      "Jokesta's KRM for Shipment and Nuketown. One-shot machine. Choke tightens the spread, Marksman extends the range. Pure chaos.",
    submittedBy: "Jokesta",
    upvotes: 34,
    downvotes: 2,
  },

  // === Godzly Loadouts ===
  {
    weaponSlug: "mac-10",
    weaponName: "MAC-10",
    category: "smg",
    attachments: {
      muzzle: "Agency Suppressor",
      barrel: "Reinforced Heavy Barrel",
      stock: "Raider Stock",
      rear_grip: "Airborne Elastic Wrap",
      laser: "OWC Laser - Tactical",
    },
    playstyle: "aggressive",
    description:
      "Godzly's tournament MAC-10. Reinforced barrel for that extra range while keeping the insane mobility. Pro league viable.",
    submittedBy: "Godzly",
    upvotes: 51,
    downvotes: 3,
  },
  {
    weaponSlug: "qxr",
    weaponName: "QXR",
    category: "smg",
    attachments: {
      muzzle: "Monolithic Suppressor",
      barrel: "MIP Extended Light Barrel",
      stock: "No Stock",
      ammunition: "Enhanced Bolt",
      rear_grip: "Granulated Grip Tape",
    },
    playstyle: "aggressive",
    description:
      "Godzly's Enhanced Bolt QXR. The bolt mod turns this into a completely different weapon — absurd fire rate with suppressor for stealth.",
    submittedBy: "Godzly",
    upvotes: 39,
    downvotes: 2,
  },

  // === Path.exe Loadouts ===
  {
    weaponSlug: "kilo-141",
    weaponName: "Kilo 141",
    category: "assault_rifle",
    attachments: {
      muzzle: "OWC Compensator",
      barrel: "OWC Ranger",
      stock: "YKM Combat Stock",
      rear_grip: "Granulated Grip Tape",
      underbarrel: "Strike Foregrip",
    },
    playstyle: "balanced",
    description:
      "Path.exe's data-driven Kilo 141. Statistically the most consistent AR build — minimal recoil variance across all ranges.",
    submittedBy: "Path.exe",
    upvotes: 70,
    downvotes: 4,
  },
  {
    weaponSlug: "icr-1",
    weaponName: "ICR-1",
    category: "assault_rifle",
    attachments: {
      muzzle: "Monolithic Suppressor",
      barrel: "OWC Ranger",
      stock: "MIP Strike Stock",
      rear_grip: "Granulated Grip Tape",
      underbarrel: "Ranger Foregrip",
    },
    playstyle: "long-range",
    description:
      "Path.exe's laser beam ICR-1. Literally zero recoil — the stat bars don't lie. Best beginner-friendly AR for ranked.",
    submittedBy: "Path.exe",
    upvotes: 59,
    downvotes: 3,
  },

  // === Community Meta Loadouts ===
  {
    weaponSlug: "ppsh-41",
    weaponName: "PPSh-41",
    category: "smg",
    attachments: {
      muzzle: "Agency Suppressor",
      barrel: "Task Force Barrel",
      stock: "No Stock",
      rear_grip: "Airborne Elastic Wrap",
      ammunition: "71 Round Drum Mag",
    },
    playstyle: "aggressive",
    description:
      "Community meta PPSh with 71 rounds. Never stop shooting. The drum mag + Task Force combo is pure ranked domination.",
    submittedBy: "CommunityMeta",
    upvotes: 85,
    downvotes: 6,
  },
  {
    weaponSlug: "mx9",
    weaponName: "MX9",
    category: "smg",
    attachments: {
      muzzle: "Agency Suppressor",
      barrel: "Task Force Barrel",
      stock: "No Stock",
      rear_grip: "Airborne Elastic Wrap",
      ammunition: "Large Caliber Ammo",
    },
    playstyle: "aggressive",
    description:
      "The MX9 that terrorized ranked for seasons. Large caliber ammo + Task Force = 3-shot kill machine. Still strong after nerfs.",
    submittedBy: "CommunityMeta",
    upvotes: 95,
    downvotes: 11,
  },
  {
    weaponSlug: "switchblade-x9",
    weaponName: "Switchblade X9",
    category: "smg",
    attachments: {
      muzzle: "Agency Suppressor",
      barrel: "Task Force Barrel",
      stock: "No Stock",
      rear_grip: "Airborne Elastic Wrap",
      ammunition: "50 Round Drum Mag",
    },
    playstyle: "aggressive",
    description:
      "The Switchblade X9 ranked meta. Insane mobility with drum mag sustain. Rush every lane and win trades with superior fire rate.",
    submittedBy: "CommunityMeta",
    upvotes: 64,
    downvotes: 5,
  },
  {
    weaponSlug: "rpd",
    weaponName: "RPD",
    category: "lmg",
    attachments: {
      muzzle: "Monolithic Suppressor",
      barrel: "OWC Ranger",
      stock: "YKM Combat Stock",
      rear_grip: "Granulated Grip Tape",
      underbarrel: "Operator Foregrip",
    },
    playstyle: "support",
    description:
      "The classic RPD support build for domination. Hold down lanes, suppress pushes, never run out of ammo. Anchor your team.",
    submittedBy: "CommunityMeta",
    upvotes: 33,
    downvotes: 2,
  },
  {
    weaponSlug: "hdr",
    weaponName: "HDR",
    category: "sniper",
    attachments: {
      muzzle: "Monolithic Suppressor",
      barrel: "HDR Pro Barrel",
      optic: "Variable Zoom Scope",
      stock: "FTAC Stalker-Scout",
      rear_grip: "Stippled Grip Tape",
    },
    playstyle: "long-range",
    description:
      "The ultimate long-range HDR for Crossfire and large maps. Variable zoom + Pro barrel for max bullet velocity. One shot, one kill.",
    submittedBy: "CommunityMeta",
    upvotes: 41,
    downvotes: 2,
  },
  {
    weaponSlug: "sks",
    weaponName: "SKS",
    category: "marksman",
    attachments: {
      muzzle: "OWC Light Suppressor",
      barrel: "OWC Marksman",
      optic: "3x Tactical Scope",
      stock: "OWC Skeleton Stock",
      rear_grip: "Granulated Grip Tape",
    },
    playstyle: "long-range",
    description:
      "Slept-on SKS marksman build. Two-tap at any range with semi-auto precision. High skill ceiling, massive reward for good aim.",
    submittedBy: "CommunityMeta",
    upvotes: 29,
    downvotes: 1,
  },
  {
    weaponSlug: "jak-12",
    weaponName: "JAK-12",
    category: "shotgun",
    attachments: {
      muzzle: "Choke",
      barrel: "MIP Extended Light Barrel",
      stock: "No Stock",
      ammunition: "32 Round Drum Mag",
      laser: "MIP Laser 5mW",
    },
    playstyle: "aggressive",
    description:
      "Full-auto JAK-12 with drum mag. 32 rounds of pure shotgun spam. Shipment hardpoint MVP — just hold down the trigger.",
    submittedBy: "CommunityMeta",
    upvotes: 47,
    downvotes: 6,
  },
];

async function seedLoadouts() {
  console.log("Clearing existing loadouts...");
  const cleared = await client.mutation(api.seed.clearLoadouts, {});
  console.log(`Cleared ${cleared.deleted} existing loadouts`);

  console.log(`\nSeeding ${loadouts.length} loadouts...\n`);

  for (const loadout of loadouts) {
    const result = await client.mutation(api.seed.seedLoadout, {
      ...loadout,
      season: SEASON,
    });

    if (result.action === "inserted") {
      console.log(`  + ${result.weapon} by ${result.by}`);
    } else {
      console.log(`  ! Skipped: ${result.reason}`);
    }
  }

  console.log(`\nDone! Seeded ${loadouts.length} loadouts.`);
}

seedLoadouts().catch(console.error);
