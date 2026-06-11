"use client";

import { useState } from "react";
import Link from "next/link";
import { MoodSelector } from "@/components/mood-selector";
import { RiskFactorGrid } from "@/components/risk-factor-grid";
import { GratitudeInput } from "@/components/gratitude-input";
import { useCheckIn } from "@/hooks/useCheckIn";
import type { RiskFactor } from "@/lib/types";

export default function CheckInPage() {
  const [mood, setMood] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [riskFactors, setRiskFactors] = useState<RiskFactor[]>([]);
  const [gratitude, setGratitude] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { submit } = useCheckIn();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (mood === null) return;

    setError(null);
    const result = submit(mood, riskFactors, gratitude);

    if (result.ok) {
      setSubmitted(true);
    } else {
      setError(
        "Your check-in couldn\u2019t be saved right now. Your answers are still here \u2014 try again when you\u2019re ready."
      );
    }
  }

  function resetForm() {
    setMood(null);
    setRiskFactors([]);
    setGratitude("");
    setSubmitted(false);
    setError(null);
  }

  if (submitted) {
    return (
      <div className="space-y-6">
        <div className="bg-surface rounded-xl border border-border p-8 text-center space-y-4">
          <span className="text-4xl block" aria-hidden="true">
            ✓
          </span>
          <h2 className="text-2xl font-semibold text-foreground">
            Check-in Complete
          </h2>

          {riskFactors.length > 0 ? (
            <div className="space-y-3">
              <p className="text-muted">
                Thanks for checking in. You identified some challenges today.
                Taking time to review your coping plan can help.
              </p>
              <Link
                href="/coping-plan"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              >
                Review your coping plan
              </Link>
            </div>
          ) : (
            <p className="text-muted">
              Nice work checking in! It sounds like you&rsquo;re in a good place
              today. Keep it up.
            </p>
          )}

          <div className="pt-4">
            <button
              onClick={resetForm}
              className="px-4 py-2 text-sm font-medium text-primary hover:underline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            >
              Check in again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-foreground tracking-tight">
            Daily Check-In
          </h2>
          <p className="text-muted mt-2">
            Taking a moment to notice how you feel builds self-awareness over
            time.
          </p>
        </div>
        <Link
          href="/"
          className="text-sm text-muted hover:text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          aria-label="Skip check-in"
        >
          Skip
        </Link>
      </header>

      <form onSubmit={handleSubmit} aria-label="Daily check-in" className="space-y-8">
        {/* Mood Selection */}
        <fieldset className="bg-surface rounded-xl border border-border p-6">
          <legend className="text-lg font-semibold text-foreground px-2">
            How are you feeling right now?
          </legend>
          <div className="mt-4">
            <MoodSelector value={mood} onChange={setMood} />
          </div>
        </fieldset>

        {/* Risk Factors */}
        <fieldset className="bg-surface rounded-xl border border-border p-6">
          <legend className="text-lg font-semibold text-foreground px-2">
            Any challenges today?
          </legend>
          <p className="text-sm text-muted mt-1 mb-4">
            Select any that apply. No judgment — just awareness.
          </p>
          <RiskFactorGrid selected={riskFactors} onChange={setRiskFactors} />
        </fieldset>

        {/* Gratitude */}
        <div className="bg-surface rounded-xl border border-border p-6">
          <GratitudeInput value={gratitude} onChange={setGratitude} />
        </div>

        {/* Error message */}
        {error && (
          <div
            role="alert"
            aria-live="polite"
            className="rounded-lg border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger"
          >
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={mood === null}
          aria-disabled={mood === null}
          className="w-full py-4 rounded-xl bg-primary text-white font-medium text-lg hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
        >
          Complete Check-in
        </button>
      </form>
    </div>
  );
}
