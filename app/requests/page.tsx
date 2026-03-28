"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Nav } from "@/components/app/Nav";
import { CATEGORY_LABELS, WEAPON_CATEGORIES } from "@/lib/config";

export default function RequestsPage() {
  const requests = useQuery(api.weaponRequests.list, {});
  const submitRequest = useMutation(api.weaponRequests.submit);
  const upvoteRequest = useMutation(api.weaponRequests.upvote);

  const [weaponName, setWeaponName] = useState("");
  const [category, setCategory] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!weaponName.trim()) return;

    await submitRequest({
      weaponName: weaponName.trim(),
      category: category || undefined,
      reason: reason.trim() || undefined,
    });

    setWeaponName("");
    setCategory("");
    setReason("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <Nav />
      <main className="max-w-content mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-display text-section md:text-section uppercase tracking-wider text-center mb-2">
            Request a <span className="text-accent">Weapon</span>
          </h1>
          <p className="text-muted text-sm text-center mb-10">
            Don&apos;t see your gun? Request it and the community can upvote.
            Most-requested weapons get added first.
          </p>

          {/* Submit form */}
          <form
            onSubmit={handleSubmit}
            className="bg-surface-1 border border-border rounded-md p-6 mb-10"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-muted mb-1.5 font-medium">
                  Weapon Name *
                </label>
                <input
                  type="text"
                  value={weaponName}
                  onChange={(e) => setWeaponName(e.target.value)}
                  placeholder="e.g. Krig 6, FAMAS, Grau 5.56..."
                  required
                  className="w-full bg-surface-2 border border-border text-white px-3 py-2.5 text-sm rounded-sm focus:border-accent outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-muted mb-1.5 font-medium">
                  Category (optional)
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-surface-2 border border-border text-white px-3 py-2.5 text-sm rounded-sm focus:border-accent outline-none"
                >
                  <option value="">Select category</option>
                  {WEAPON_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {CATEGORY_LABELS[cat]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-muted mb-1.5 font-medium">
                  Why should we add it? (optional)
                </label>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="It's meta this season, just got buffed..."
                  className="w-full bg-surface-2 border border-border text-white px-3 py-2.5 text-sm rounded-sm focus:border-accent outline-none"
                />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <button
                type="submit"
                className="bg-accent hover:bg-accent-hover text-black font-display font-bold text-sm uppercase tracking-wider px-6 py-2.5 rounded-sm transition-colors"
              >
                Submit Request
              </button>
              {submitted && (
                <span className="text-success text-sm animate-fade-in-right">
                  Request submitted!
                </span>
              )}
            </div>
          </form>

          {/* Requests list */}
          <h2 className="font-display text-xl font-bold uppercase tracking-wider mb-4">
            Community Requests
          </h2>

          {requests === undefined ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-16 bg-surface-1 border border-border rounded-md animate-skeleton-pulse"
                />
              ))}
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted">
                No requests yet. Be the first to suggest a weapon!
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {requests.map((req) => (
                <div
                  key={req._id}
                  className="bg-surface-1 border border-border rounded-md px-5 py-3.5 flex items-center justify-between gap-4 hover:border-accent-glow transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-base font-bold uppercase tracking-wider truncate">
                        {req.weaponName}
                      </span>
                      {req.category && (
                        <span className="font-data text-badge text-muted border border-border px-2 py-0.5 tracking-wider shrink-0">
                          {CATEGORY_LABELS[
                            req.category as keyof typeof CATEGORY_LABELS
                          ] ?? req.category}
                        </span>
                      )}
                    </div>
                    {req.reason && (
                      <p className="text-muted text-xs mt-1 truncate">
                        {req.reason}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => upvoteRequest({ id: req._id })}
                    className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-sm hover:border-success/40 hover:text-success transition-colors shrink-0"
                  >
                    <span className="text-sm">&#9650;</span>
                    <span className="font-data text-sm font-bold">
                      {req.votes}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
