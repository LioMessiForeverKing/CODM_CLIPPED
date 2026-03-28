"use client";

import { WeaponStats } from "./StatBar";

interface HeroSectionProps {
  seasonName: string;
  topWeaponName: string | null;
  topWeaponStats: {
    damage: number;
    range: number;
    fireRate: number;
    accuracy: number;
    mobility: number;
    control: number;
  } | null;
  loadoutCount: number;
}

export function HeroSection({
  seasonName,
  topWeaponName,
  topWeaponStats,
  loadoutCount,
}: HeroSectionProps) {
  return (
    <section className="text-center py-12 md:py-16 border-b border-border bg-gradient-to-b from-surface-1 to-bg">
      <p className="text-xs tracking-[3px] uppercase text-muted mb-2">
        {seasonName}
      </p>
      {topWeaponName ? (
        <>
          <h1 className="font-display text-hero-mobile md:text-hero uppercase tracking-wider mb-4">
            Top Weapon: <span className="text-accent">{topWeaponName}</span>
          </h1>
          <p className="text-muted text-sm mb-6">
            Community&apos;s #1 pick this season
            {loadoutCount > 0 && ` · ${loadoutCount} loadouts submitted`}
          </p>
          {topWeaponStats && (
            <div className="max-w-[400px] mx-auto">
              <WeaponStats stats={topWeaponStats} />
            </div>
          )}
        </>
      ) : (
        <>
          <h1 className="font-display text-hero-mobile md:text-hero uppercase tracking-wider mb-4">
            CLIP<span className="text-accent">P</span>ED
          </h1>
          <p className="text-muted text-sm">
            The loadout leaderboard for CODM. Be the first to submit a build.
          </p>
        </>
      )}
    </section>
  );
}
