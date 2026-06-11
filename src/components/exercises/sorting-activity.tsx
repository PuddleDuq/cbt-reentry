"use client";

import { useState, useCallback } from "react";
import type { SortingExercise } from "@/lib/types";

interface SortingActivityProps {
  exercise: SortingExercise;
  onResponse: (response: string | string[]) => void;
  savedResponse?: string | string[];
}

export default function SortingActivity({ exercise, onResponse, savedResponse }: SortingActivityProps) {
  // assignments maps item ID to selected category
  const initialAssignments: Record<string, string> = {};
  if (Array.isArray(savedResponse)) {
    // Saved as "itemId:category" pairs
    savedResponse.forEach((entry) => {
      const [itemId, cat] = entry.split(":");
      if (itemId && cat) initialAssignments[itemId] = cat;
    });
  }

  const [assignments, setAssignments] = useState<Record<string, string>>(initialAssignments);
  const [showResults, setShowResults] = useState(false);

  const unassigned = exercise.items.filter((item) => !assignments[item.id]);
  const allAssigned = unassigned.length === 0;

  const handleAssign = useCallback((itemId: string, category: string) => {
    const updated = { ...assignments, [itemId]: category };
    setAssignments(updated);
  }, [assignments]);

  const handleCheck = useCallback(() => {
    setShowResults(true);
    // Encode response as "itemId:category" for each item
    const response = exercise.items.map((item) => `${item.id}:${assignments[item.id] ?? ""}`);
    onResponse(response);
  }, [assignments, exercise.items, onResponse]);

  const handleReset = useCallback(() => {
    setAssignments({});
    setShowResults(false);
  }, []);

  return (
    <div className="space-y-4">
      <p className="text-sm text-foreground font-medium">{exercise.instruction}</p>

      {/* Unassigned items */}
      {unassigned.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-muted font-medium">Items to sort:</p>
          {unassigned.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-lg border border-border bg-surface"
            >
              <p className="text-sm text-foreground mb-2">{item.text}</p>
              <div
                role="group"
                aria-label={`Assign "${item.text}" to a category`}
                className="flex flex-wrap gap-2"
              >
                {exercise.categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleAssign(item.id, cat)}
                    aria-label={`Put "${item.text}" in "${cat}"`}
                    className="min-w-[44px] min-h-[44px] px-3 py-2 rounded-lg border border-primary/40 text-xs font-medium text-primary hover:bg-primary/10 transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Assigned items grouped by category */}
      {Object.keys(assignments).length > 0 && (
        <div className="space-y-3">
          {exercise.categories.map((cat) => {
            const catItems = exercise.items.filter((item) => assignments[item.id] === cat);
            if (catItems.length === 0) return null;
            return (
              <div key={cat} className="p-3 rounded-lg bg-surface-warm border border-border">
                <p className="text-xs font-semibold text-foreground mb-1">{cat}</p>
                <ul className="space-y-1">
                  {catItems.map((item) => {
                    const isCorrect = item.category === cat;
                    return (
                      <li key={item.id} className="flex items-center gap-2 text-sm">
                        {showResults && (
                          <span aria-hidden="true">{isCorrect ? "✅" : "❌"}</span>
                        )}
                        <span className="text-foreground">{item.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      )}

      {/* Feedback */}
      {showResults && (
        <div aria-live="polite" className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm text-foreground">
          {exercise.items.every((item) => assignments[item.id] === item.category)
            ? "Nice work! You sorted everything correctly."
            : "Some items could go in a different category. That's okay — what matters is thinking it through."}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        {!showResults && allAssigned && (
          <button
            type="button"
            onClick={handleCheck}
            aria-label="Check your answers"
            className="min-w-[44px] min-h-[44px] px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          >
            Check
          </button>
        )}
        {showResults && (
          <button
            type="button"
            onClick={handleReset}
            aria-label="Try sorting again"
            className="min-w-[44px] min-h-[44px] px-4 py-2 rounded-lg border border-border text-sm text-muted hover:bg-surface-warm transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
