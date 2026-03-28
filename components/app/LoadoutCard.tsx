"use client";

import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { VoteButtons } from "./VoteButtons";
import { WeaponStats } from "./StatBar";

interface LoadoutCardProps {
  loadoutId: Id<"loadouts">;
  weaponName: string;
  season: string;
  playstyle: string;
  attachments: Record<string, string>;
  submittedBy: string;
  upvotes: number;
  downvotes: number;
  netVotes: number;
  weaponStats?: {
    damage: number;
    range: number;
    fireRate: number;
    accuracy: number;
    mobility: number;
    control: number;
  };
}

export function LoadoutCard({
  loadoutId,
  weaponName,
  season,
  playstyle,
  attachments,
  submittedBy,
  upvotes,
  downvotes,
  netVotes,
  weaponStats,
}: LoadoutCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-surface-1 border border-border rounded-md p-5 transition-all hover:border-accent-glow hover:shadow-[0_0_24px_rgba(255,107,0,0.06)]">
      {/* Header */}
      <div className="flex justify-between items-start mb-2.5">
        <h3 className="font-display text-card-title uppercase tracking-wider">
          {weaponName}
        </h3>
        <span className="font-data text-badge text-muted border border-border px-2 py-0.5 tracking-wider">
          {season}
        </span>
      </div>

      {/* Playstyle badge */}
      <span className="inline-block font-data text-badge text-accent border border-accent/30 px-2 py-0.5 uppercase tracking-wider mb-3">
        {playstyle}
      </span>

      {/* Attachments */}
      <div className="space-y-0.5 mb-4">
        {Object.entries(attachments).map(([slot, name]) => (
          <div key={slot} className="flex gap-2 text-xs">
            <span className="w-20 text-dim uppercase text-[10px] tracking-wider leading-relaxed">
              {slot.replace("_", " ")}
            </span>
            <span className="text-white/80 font-data text-xs">{name}</span>
          </div>
        ))}
      </div>

      {/* Inline stat expansion */}
      {expanded && weaponStats && (
        <div className="border-t border-white/5 mt-3 animate-fade-in-right">
          <WeaponStats stats={weaponStats} />
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center pt-3.5 border-t border-white/5 mt-3.5">
        <VoteButtons
          loadoutId={loadoutId}
          upvotes={upvotes}
          downvotes={downvotes}
          netVotes={netVotes}
        />
        <span className="text-[11px] text-dim">by {submittedBy}</span>
        {weaponStats && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[11px] text-accent uppercase tracking-wider hover:underline"
          >
            {expanded ? "Hide Stats" : "View Stats"} {expanded ? "\u25B2" : "\u25BC"}
          </button>
        )}
      </div>
    </div>
  );
}
