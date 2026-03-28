"use client";

import { useState } from "react";
import { useQuery, usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Nav } from "@/components/app/Nav";
import { HeroSection } from "@/components/app/HeroSection";
import { FilterBar } from "@/components/app/FilterBar";
import { LoadoutCard } from "@/components/app/LoadoutCard";
import {
  CURRENT_SEASON_SLUG,
  CURRENT_SEASON,
  type WeaponCategory,
  type Playstyle,
} from "@/lib/config";

export default function Home() {
  const [category, setCategory] = useState<WeaponCategory | null>(null);
  const [playstyle, setPlaystyle] = useState<Playstyle | null>(null);
  const [sort, setSort] = useState<"top" | "newest">("top");

  const { results: loadouts, status, loadMore } = usePaginatedQuery(
    api.loadouts.list,
    {
      season: CURRENT_SEASON_SLUG,
      category: category ?? undefined,
      playstyle: playstyle ?? undefined,
      sort,
    },
    { initialNumItems: 12 }
  );

  const weapons = useQuery(api.weapons.getAll, {});

  // Get top weapon from the first loadout result
  const topLoadout = loadouts?.[0];
  const topWeaponName = topLoadout?.weaponName ?? null;
  const topWeapon = weapons?.find((w) => w.name === topWeaponName);
  const topWeaponStats = topWeapon?.stats?.[CURRENT_SEASON_SLUG] ?? null;

  // Create a weapon stats lookup for inline card expansion
  const weaponStatsMap = new Map<string, typeof topWeaponStats>();
  weapons?.forEach((w) => {
    const stats = w.stats?.[CURRENT_SEASON_SLUG];
    if (stats) weaponStatsMap.set(w.name, stats);
  });

  const isLoading = status === "LoadingFirstPage";

  return (
    <>
      <Nav />
      <HeroSection
        seasonName={CURRENT_SEASON}
        topWeaponName={topWeaponName}
        topWeaponStats={topWeaponStats}
        loadoutCount={loadouts.length}
      />
      <FilterBar
        activeCategory={category}
        activePlatstyle={playstyle}
        activeSort={sort}
        onCategoryChange={setCategory}
        onPlaystyleChange={setPlaystyle}
        onSortChange={setSort}
      />

      <main className="max-w-content mx-auto px-6 py-6">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-surface-1 border border-border rounded-md h-64 animate-skeleton-pulse"
              />
            ))}
          </div>
        ) : loadouts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted text-lg mb-4">
              No loadouts yet this season.
            </p>
            <a
              href="/build"
              className="inline-block bg-accent hover:bg-accent-hover text-black font-display font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-sm transition-colors"
            >
              Be the first to submit
            </a>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {loadouts.map((loadout) => (
                <LoadoutCard
                  key={loadout._id}
                  loadoutId={loadout._id}
                  weaponName={loadout.weaponName}
                  season={loadout.season}
                  playstyle={loadout.playstyle}
                  attachments={loadout.attachments}
                  submittedBy={loadout.submittedBy}
                  upvotes={loadout.upvotes}
                  downvotes={loadout.downvotes}
                  netVotes={loadout.netVotes}
                  weaponStats={weaponStatsMap.get(loadout.weaponName) ?? undefined}
                />
              ))}
            </div>
            {status === "CanLoadMore" && (
              <div className="text-center mt-8">
                <button
                  onClick={() => loadMore(12)}
                  className="text-muted hover:text-white border border-border hover:border-muted px-6 py-2.5 font-display text-sm uppercase tracking-wider rounded-sm transition-colors"
                >
                  Load More Loadouts
                </button>
              </div>
            )}
            {status === "LoadingMore" && (
              <div className="text-center mt-8">
                <span className="text-muted font-display text-sm uppercase tracking-wider">
                  Loading...
                </span>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
