"use client";

import { useState, useCallback } from "react";
import type { ChecklistExercise } from "@/lib/types";

interface ChecklistActivityProps {
  exercise: ChecklistExercise;
  onResponse: (response: string | string[]) => void;
  savedResponse?: string | string[];
}

export function ChecklistActivity({ exercise, onResponse, savedResponse }: ChecklistActivityProps) {
  const initialChecked: string[] = Array.isArray(savedResponse)
    ? savedResponse
    : [];
  const [checked, setChecked] = useState<string[]>(initialChecked);

  const handleToggle = useCallback((itemId: string) => {
    const updated = checked.includes(itemId)
      ? checked.filter((id) => id !== itemId)
      : [...checked, itemId];
    setChecked(updated);
    onResponse(updated);
  }, [checked, onResponse]);

  return (
    <div className="space-y-3">
      <p className="text-sm text-foreground font-medium">{exercise.instruction}</p>
      <fieldset>
        <legend className="sr-only">{exercise.instruction}</legend>
        <div className="space-y-2">
          {exercise.items.map((item) => {
            const isChecked = checked.includes(item.id);
            return (
              <label
                key={item.id}
                className={`flex items-center gap-3 min-h-[44px] px-3 py-2 rounded-lg border cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 ${
                  isChecked
                    ? "border-primary bg-primary/5"
                    : "border-border bg-surface hover:bg-surface-warm"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleToggle(item.id)}
                  aria-label={item.text}
                  className="w-5 h-5 rounded border-border text-primary accent-primary focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                />
                <span className={`text-sm ${isChecked ? "text-foreground font-medium" : "text-foreground"}`}>
                  {item.text}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
      {checked.length > 0 && (
        <p aria-live="polite" className="text-xs text-success font-medium">
          {checked.length} item{checked.length !== 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
}
