"use client";

import { useState, useCallback } from "react";
import { Id } from "@/convex/_generated/dataModel";

interface VoteButtonsProps {
  loadoutId: Id<"loadouts">;
  upvotes: number;
  downvotes: number;
  netVotes: number;
}

function getVoteState(loadoutId: string): "up" | "down" | null {
  if (typeof window === "undefined") return null;
  try {
    const votes = JSON.parse(localStorage.getItem("clipped-votes") || "{}");
    return votes[loadoutId] ?? null;
  } catch {
    return null;
  }
}

function setVoteState(loadoutId: string, vote: "up" | "down" | null) {
  if (typeof window === "undefined") return;
  try {
    const votes = JSON.parse(localStorage.getItem("clipped-votes") || "{}");
    if (vote === null) {
      delete votes[loadoutId];
    } else {
      votes[loadoutId] = vote;
    }
    localStorage.setItem("clipped-votes", JSON.stringify(votes));
  } catch {
    // localStorage unavailable
  }
}

export function VoteButtons({ loadoutId, netVotes }: VoteButtonsProps) {
  const [currentVote, setCurrentVote] = useState<"up" | "down" | null>(
    () => getVoteState(loadoutId)
  );
  const [optimisticDelta, setOptimisticDelta] = useState(0);
  const [loading, setLoading] = useState(false);

  const vote = useCallback(
    async (direction: "up" | "down") => {
      if (loading) return;
      setLoading(true);

      const prevVote = currentVote;
      let newVote: "up" | "down" | null;
      let delta: number;

      if (prevVote === direction) {
        // Un-vote
        newVote = null;
        delta = direction === "up" ? -1 : 1;
      } else if (prevVote === null) {
        // New vote
        newVote = direction;
        delta = direction === "up" ? 1 : -1;
      } else {
        // Change direction
        newVote = direction;
        delta = direction === "up" ? 2 : -2;
      }

      // Optimistic update
      setCurrentVote(newVote);
      setOptimisticDelta((prev) => prev + delta);
      setVoteState(loadoutId, newVote);

      try {
        await fetch("/api/vote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ loadoutId, vote: direction }),
        });
      } catch {
        // Rollback on error
        setCurrentVote(prevVote);
        setOptimisticDelta((prev) => prev - delta);
        setVoteState(loadoutId, prevVote);
      } finally {
        setLoading(false);
      }
    },
    [loadoutId, currentVote, loading]
  );

  const displayVotes = netVotes + optimisticDelta;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => vote("up")}
        disabled={loading}
        className={`w-8 h-8 flex items-center justify-center border rounded-sm text-sm transition-all ${
          currentVote === "up"
            ? "text-success border-success"
            : "text-dim border-border hover:text-success hover:border-success/40"
        }`}
        aria-label="Upvote loadout"
      >
        &#9650;
      </button>
      <span
        className={`font-data text-base font-bold min-w-[36px] text-center ${
          displayVotes > 0 ? "text-success" : displayVotes < 0 ? "text-danger" : "text-muted"
        }`}
      >
        {displayVotes > 0 ? `+${displayVotes}` : displayVotes}
      </span>
      <button
        onClick={() => vote("down")}
        disabled={loading}
        className={`w-8 h-8 flex items-center justify-center border rounded-sm text-sm transition-all ${
          currentVote === "down"
            ? "text-danger border-danger"
            : "text-dim border-border hover:text-danger hover:border-danger/40"
        }`}
        aria-label="Downvote loadout"
      >
        &#9660;
      </button>
    </div>
  );
}
