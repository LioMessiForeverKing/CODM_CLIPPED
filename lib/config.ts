export const CURRENT_SEASON = "S14 2025";
export const CURRENT_SEASON_SLUG = "s14-2025";

export const WEAPON_CATEGORIES = [
  "assault_rifle",
  "smg",
  "sniper",
  "lmg",
  "shotgun",
  "pistol",
  "marksman",
] as const;

export type WeaponCategory = (typeof WEAPON_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<WeaponCategory, string> = {
  assault_rifle: "AR",
  smg: "SMG",
  sniper: "Sniper",
  lmg: "LMG",
  shotgun: "Shotgun",
  pistol: "Pistol",
  marksman: "Marksman",
};

export const PLAYSTYLES = [
  "aggressive",
  "long-range",
  "support",
  "balanced",
] as const;

export type Playstyle = (typeof PLAYSTYLES)[number];

export const PLAYSTYLE_LABELS: Record<Playstyle, string> = {
  aggressive: "Aggressive",
  "long-range": "Long Range",
  support: "Support",
  balanced: "Balanced",
};
