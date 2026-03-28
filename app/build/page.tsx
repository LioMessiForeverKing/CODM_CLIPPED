"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Nav } from "@/components/app/Nav";
import { WeaponStats } from "@/components/app/StatBar";
import {
  CURRENT_SEASON_SLUG,
  CATEGORY_LABELS,
  PLAYSTYLE_LABELS,
  WEAPON_CATEGORIES,
  PLAYSTYLES,
  type WeaponCategory,
  type Playstyle,
} from "@/lib/config";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const STEP_LABELS = ["Category", "Weapon", "Attachments", "Details", "Preview"];

export default function BuildPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [selectedCategory, setSelectedCategory] = useState<WeaponCategory | null>(null);
  const [selectedWeaponId, setSelectedWeaponId] = useState<Id<"weapons"> | null>(null);
  const [attachments, setAttachments] = useState<Record<string, string>>({});
  const [playstyle, setPlaystyle] = useState<Playstyle | null>(null);
  const [description, setDescription] = useState("");
  const [submittedBy, setSubmittedBy] = useState("");

  const weapons = useQuery(
    api.weapons.getByCategory,
    selectedCategory ? { category: selectedCategory } : "skip"
  );

  const allWeapons = useQuery(api.weapons.getAll, {});
  const selectedWeapon = allWeapons?.find((w) => w._id === selectedWeaponId);

  const submitLoadout = useMutation(api.loadouts.submit);

  const handleSubmit = async () => {
    if (!selectedWeaponId || !selectedWeapon || !playstyle) return;

    await submitLoadout({
      weaponId: selectedWeaponId,
      weaponName: selectedWeapon.name,
      category: selectedWeapon.category,
      attachments,
      playstyle,
      season: CURRENT_SEASON_SLUG,
      description: description || "",
      submittedBy: submittedBy || "Anonymous",
    });

    setStep(6);
  };

  const goBack = () => {
    if (step === 3) setAttachments({});
    if (step > 1) setStep((step - 1) as Step);
  };

  return (
    <>
      <Nav />
      <main className="max-w-[800px] mx-auto px-6 py-8">
        {step <= 5 && (
          <>
            <h1 className="font-display text-section md:text-section uppercase tracking-wider text-center mb-2">
              Build Your <span className="text-accent">Loadout</span>
            </h1>
            <p className="text-muted text-sm text-center mb-8">
              Choose your weapon, pick your attachments, submit to the leaderboard.
            </p>

            {/* Step indicator */}
            <div className="flex justify-center gap-1 mb-8">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`h-1 rounded-full transition-colors ${
                    s === step
                      ? "w-10 bg-accent"
                      : s < step
                        ? "w-10 bg-dim"
                        : "w-10 bg-border"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        <div className="animate-fade-in-right">
          {/* Step 1: Category */}
          {step === 1 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {WEAPON_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedWeaponId(null);
                    setAttachments({});
                    setStep(2);
                  }}
                  className="bg-surface-2 border border-border p-6 text-center hover:border-accent/40 transition-colors rounded-md"
                >
                  <div className="font-display text-sm font-bold uppercase tracking-wider text-muted">
                    {CATEGORY_LABELS[cat]}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Weapon */}
          {step === 2 && (
            <div>
              {step > 1 && (
                <button onClick={goBack} className="text-muted text-sm mb-4 hover:text-white">
                  &larr; Back
                </button>
              )}
              {weapons === undefined ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-surface-1 border border-border rounded-md animate-skeleton-pulse" />
                  ))}
                </div>
              ) : weapons.length === 0 ? (
                <p className="text-muted text-center py-8">No weapons available for this category yet.</p>
              ) : (
                <div className="space-y-3">
                  {weapons.map((weapon) => {
                    const stats = weapon.stats?.[CURRENT_SEASON_SLUG];
                    return (
                      <button
                        key={weapon._id}
                        onClick={() => {
                          setSelectedWeaponId(weapon._id);
                          setAttachments({});
                          setStep(3);
                        }}
                        className="w-full bg-surface-1 border border-border p-4 text-left hover:border-accent/40 transition-colors rounded-md"
                      >
                        <div className="font-display text-card-title uppercase tracking-wider mb-2">
                          {weapon.name}
                        </div>
                        {stats && (
                          <div className="opacity-60">
                            <WeaponStats stats={stats} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Attachments */}
          {step === 3 && selectedWeapon && (
            <div>
              <button onClick={goBack} className="text-muted text-sm mb-4 hover:text-white">
                &larr; Back
              </button>
              {(() => {
                const filledCount = Object.values(attachments).filter(Boolean).length;
                const maxAttachments = 5;
                const atLimit = filledCount >= maxAttachments;

                return (
                  <>
                    <div className="text-center mb-6">
                      <h2 className="font-display text-2xl font-bold uppercase tracking-wider">
                        {selectedWeapon.name}
                      </h2>
                      <p className="text-muted text-xs mt-1">
                        {selectedWeapon.category.replace("_", " ")} · Choose {maxAttachments} of {selectedWeapon.attachmentSlots.length} slots
                      </p>
                      <div className="flex justify-center gap-1 mt-3">
                        {Array.from({ length: maxAttachments }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${i < filledCount ? "bg-accent" : "bg-border"}`}
                          />
                        ))}
                        <span className="text-muted text-[10px] ml-2 font-data">
                          {filledCount}/{maxAttachments}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {selectedWeapon.attachmentSlots.map((slot) => {
                        const options = selectedWeapon.availableAttachments[slot] ?? [];
                        const hasValue = !!attachments[slot];
                        const isDisabled = !hasValue && atLimit;

                        return (
                          <div key={slot} className={`flex items-center gap-3 ${isDisabled ? "opacity-40" : ""}`}>
                            <label className="w-24 text-right text-[11px] uppercase tracking-wider text-muted shrink-0">
                              {slot.replace("_", " ")}
                            </label>
                            <select
                              value={attachments[slot] ?? ""}
                              disabled={isDisabled}
                              onChange={(e) => {
                                const val = e.target.value;
                                setAttachments((prev) => {
                                  const next = { ...prev };
                                  if (val) {
                                    next[slot] = val;
                                  } else {
                                    delete next[slot];
                                  }
                                  return next;
                                });
                              }}
                              className="flex-1 bg-surface-2 border border-border text-white px-3 py-2.5 text-sm rounded-sm focus:border-accent outline-none disabled:cursor-not-allowed"
                            >
                              <option value="">{isDisabled ? "Limit reached (5/5)" : `Select ${slot.replace("_", " ")}`}</option>
                              {options.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          </div>
                        );
                      })}
                    </div>
                  </>
                );
              })()}
              {!selectedWeapon.attachmentModifiers && (
                <p className="text-muted text-xs text-center mt-4">
                  Stat modifiers not yet available for this weapon.
                </p>
              )}
              <div className="text-center mt-8">
                <button
                  onClick={() => setStep(4)}
                  className="bg-accent hover:bg-accent-hover text-black font-display font-bold text-sm uppercase tracking-wider px-8 py-3 rounded-sm transition-colors"
                >
                  Next: Add Details &rarr;
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Metadata */}
          {step === 4 && (
            <div>
              <button onClick={goBack} className="text-muted text-sm mb-4 hover:text-white">
                &larr; Back
              </button>
              <div className="space-y-5 max-w-md mx-auto">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted mb-1.5 font-medium">
                    Playstyle
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {PLAYSTYLES.map((ps) => (
                      <button
                        key={ps}
                        onClick={() => setPlaystyle(ps)}
                        className={`px-3 py-2.5 text-sm border rounded-sm transition-colors ${
                          playstyle === ps
                            ? "text-accent border-accent bg-accent/[0.08]"
                            : "text-muted border-border hover:border-muted"
                        }`}
                      >
                        {PLAYSTYLE_LABELS[ps]}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted mb-1.5 font-medium">
                    Your Name (optional)
                  </label>
                  <input
                    type="text"
                    value={submittedBy}
                    onChange={(e) => setSubmittedBy(e.target.value)}
                    placeholder="Anonymous"
                    className="w-full bg-surface-2 border border-border text-white px-3 py-2.5 text-sm rounded-sm focus:border-accent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted mb-1.5 font-medium">
                    Description (optional)
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Best close-range setup for ranked..."
                    className="w-full bg-surface-2 border border-border text-white px-3 py-2.5 text-sm rounded-sm focus:border-accent outline-none"
                  />
                </div>
              </div>
              <div className="text-center mt-8">
                <button
                  onClick={() => setStep(5)}
                  disabled={!playstyle}
                  className="bg-accent hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed text-black font-display font-bold text-sm uppercase tracking-wider px-8 py-3 rounded-sm transition-colors"
                >
                  Preview &rarr;
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Preview */}
          {step === 5 && selectedWeapon && playstyle && (
            <div>
              <button onClick={goBack} className="text-muted text-sm mb-4 hover:text-white">
                &larr; Back
              </button>
              <p className="text-muted text-xs text-center mb-4 uppercase tracking-wider">
                This is how your loadout will appear on the leaderboard
              </p>
              <div className="bg-surface-1 border border-border rounded-md p-5 max-w-lg mx-auto">
                <div className="flex justify-between items-start mb-2.5">
                  <h3 className="font-display text-card-title uppercase tracking-wider">
                    {selectedWeapon.name}
                  </h3>
                  <span className="font-data text-badge text-muted border border-border px-2 py-0.5 tracking-wider">
                    {CURRENT_SEASON_SLUG.toUpperCase()}
                  </span>
                </div>
                <span className="inline-block font-data text-badge text-accent border border-accent/30 px-2 py-0.5 uppercase tracking-wider mb-3">
                  {PLAYSTYLE_LABELS[playstyle]}
                </span>
                <div className="space-y-0.5 mb-4">
                  {Object.entries(attachments)
                    .filter(([, name]) => name)
                    .map(([slot, name]) => (
                      <div key={slot} className="flex gap-2 text-xs">
                        <span className="w-20 text-dim uppercase text-[10px] tracking-wider leading-relaxed">
                          {slot.replace("_", " ")}
                        </span>
                        <span className="text-white/80 font-data text-xs">{name}</span>
                      </div>
                    ))}
                </div>
                <div className="pt-3 border-t border-white/5 text-[11px] text-dim">
                  by {submittedBy || "Anonymous"}
                </div>
              </div>
              <div className="text-center mt-8">
                <button
                  onClick={handleSubmit}
                  className="bg-accent hover:bg-accent-hover text-black font-display font-bold text-base uppercase tracking-wider px-10 py-3.5 rounded-sm transition-colors"
                >
                  Submit Loadout
                </button>
              </div>
            </div>
          )}

          {/* Step 6: Success */}
          {step === 6 && (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">&#10003;</div>
              <h2 className="font-display text-section uppercase tracking-wider mb-2">
                Loadout Submitted!
              </h2>
              <p className="text-muted mb-8">
                Your build is live on the leaderboard. See how it ranks.
              </p>
              <button
                onClick={() => router.push("/?sort=newest")}
                className="bg-accent hover:bg-accent-hover text-black font-display font-bold text-sm uppercase tracking-wider px-8 py-3 rounded-sm transition-colors"
              >
                View on Leaderboard
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
