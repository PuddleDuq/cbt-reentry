"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import GoalForm from "@/components/goal-form";
import { GoalCard } from "@/components/goal-card";
import { useGoals } from "@/hooks/useGoals";
import type { AddGoalInput, GoalError } from "@/hooks/useGoals";
import type { Result } from "@/lib/types";

export default function GoalsPage() {
  const { goals, addGoal, toggleStep, getProgress } = useGoals();
  const [error, setError] = useState<string | null>(null);

  // Wrap addGoal to handle errors inline
  const handleAddGoal = useCallback(
    (input: AddGoalInput): Result<void, GoalError> => {
      setError(null);
      const result = addGoal(input);
      if (!result.ok) {
        setError(result.error.message);
      }
      return result;
    },
    [addGoal]
  );

  // Wrap toggleStep to handle errors inline
  const handleToggleStep = useCallback(
    (goalId: string, stepIndex: number) => {
      setError(null);
      const result = toggleStep(goalId, stepIndex);
      if (!result.ok) {
        setError(result.error.message);
      }
    },
    [toggleStep]
  );

  return (
    <div className="space-y-8">
      {/* Header with skip control */}
      <header className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-foreground tracking-tight">
            Reentry Goals
          </h2>
          <p className="text-muted mt-2">
            Break big goals into small steps. Every step forward counts.
          </p>
        </div>
        <Link
          href="/"
          className="text-sm text-muted hover:text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          aria-label="Close goals"
        >
          Close
        </Link>
      </header>

      {/* Inline error alert */}
      {error && (
        <div
          role="alert"
          aria-live="assertive"
          className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
        >
          {error}
        </div>
      )}

      {/* Goal creation form */}
      <GoalForm onSubmit={handleAddGoal} />

      {/* Goals list */}
      <section aria-label="Your goals">
        {goals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted text-lg" aria-live="polite">
              No goals yet. Start with something small.
            </p>
          </div>
        ) : (
          <div className="space-y-4 overflow-y-auto max-h-[60vh]">
            {goals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onToggleStep={handleToggleStep}
                progress={getProgress(goal)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
