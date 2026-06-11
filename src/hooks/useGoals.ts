"use client";

import { useState, useCallback, useRef } from "react";
import { saveGoals, getGoals } from "@/lib/storage";
import type { Goal, GoalStep, GoalCategory, Result, StorageError } from "@/lib/types";

// --- Validation Error Type ---

export type GoalValidationError = {
  type: "VALIDATION_ERROR";
  message: string;
};

export type GoalError = StorageError | GoalValidationError;

// --- Input type for addGoal ---

export interface AddGoalInput {
  title: string;
  category: GoalCategory;
  steps: string[];
}

/**
 * Domain hook for goal CRUD operations.
 * Uses lazy state initializer to load goals from StorageManager on mount.
 * toggleStep uses functional setState to avoid stale closures.
 * Progress is computed as derived state during render (no useEffect).
 */
export function useGoals(): {
  goals: Goal[];
  addGoal: (input: AddGoalInput) => Result<void, GoalError>;
  toggleStep: (goalId: string, stepIndex: number) => Result<void, GoalError>;
  getProgress: (goal: Goal) => number;
} {
  const [goals, setGoals] = useState<Goal[]>(() => {
    const result = getGoals();
    return result.ok ? result.value : [];
  });

  // Keep a ref synchronized with goals for synchronous reads in toggleStep
  const goalsRef = useRef(goals);
  goalsRef.current = goals;

  const addGoal = useCallback(
    (input: AddGoalInput): Result<void, GoalError> => {
      // Validate title: trimmed length 1–100
      const trimmedTitle = input.title.trim();
      if (trimmedTitle.length < 1 || trimmedTitle.length > 100) {
        return {
          ok: false,
          error: {
            type: "VALIDATION_ERROR",
            message: "Title must be between 1 and 100 characters.",
          },
        };
      }

      // Validate steps count: 1–20
      if (input.steps.length < 1 || input.steps.length > 20) {
        return {
          ok: false,
          error: {
            type: "VALIDATION_ERROR",
            message: "Goals must have between 1 and 20 steps.",
          },
        };
      }

      // Validate each step: trimmed length 1–200
      for (let i = 0; i < input.steps.length; i++) {
        const trimmedStep = input.steps[i].trim();
        if (trimmedStep.length < 1 || trimmedStep.length > 200) {
          return {
            ok: false,
            error: {
              type: "VALIDATION_ERROR",
              message: `Step ${i + 1} must be between 1 and 200 characters.`,
            },
          };
        }
      }

      // Create goal object
      const steps: GoalStep[] = input.steps.map((text) => ({
        text: text.trim(),
        completed: false,
      }));

      const newGoal: Goal = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        title: trimmedTitle,
        category: input.category,
        steps,
      };

      const updatedGoals = [...goalsRef.current, newGoal];
      const result = saveGoals(updatedGoals);

      if (!result.ok) {
        return result;
      }

      setGoals(updatedGoals);
      return { ok: true, value: undefined };
    },
    []
  );

  const toggleStep = useCallback(
    (goalId: string, stepIndex: number): Result<void, GoalError> => {
      const currentGoals = goalsRef.current;

      const goalIndex = currentGoals.findIndex((g) => g.id === goalId);
      if (goalIndex === -1) {
        return {
          ok: false,
          error: {
            type: "VALIDATION_ERROR",
            message: "Goal not found.",
          },
        };
      }

      const goal = currentGoals[goalIndex];
      if (stepIndex < 0 || stepIndex >= goal.steps.length) {
        return {
          ok: false,
          error: {
            type: "VALIDATION_ERROR",
            message: "Step index out of bounds.",
          },
        };
      }

      // Create updated goals array with toggled step using functional setState
      // to avoid stale closures in concurrent scenarios
      const updatedGoals = currentGoals.map((g, i) => {
        if (i !== goalIndex) return g;
        return {
          ...g,
          steps: g.steps.map((step, si) => {
            if (si !== stepIndex) return step;
            return { ...step, completed: !step.completed };
          }),
        };
      });

      // Persist to storage first
      const saveResult = saveGoals(updatedGoals);
      if (!saveResult.ok) {
        return saveResult;
      }

      // Use functional setState to ensure we're working with latest state
      setGoals(() => updatedGoals);
      return { ok: true, value: undefined };
    },
    []
  );

  const getProgress = useCallback((goal: Goal): number => {
    const total = goal.steps.length;
    if (total === 0) return 0;
    const completed = goal.steps.filter((s) => s.completed).length;
    return Math.round((completed / total) * 100);
  }, []);

  return { goals, addGoal, toggleStep, getProgress };
}
