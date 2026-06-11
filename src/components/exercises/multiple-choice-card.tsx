"use client";

import { useState, useCallback } from "react";
import type { MultipleChoiceExercise } from "@/lib/types";

interface MultipleChoiceCardProps {
  exercise: MultipleChoiceExercise;
  onResponse: (response: string | string[]) => void;
  savedResponse?: string | string[];
}

export function MultipleChoiceCard({ exercise, onResponse, savedResponse }: MultipleChoiceCardProps) {
  const initialSelected: string[] = Array.isArray(savedResponse)
    ? savedResponse
    : typeof savedResponse === "string" && savedResponse
      ? [savedResponse]
      : [];
  const [selected, setSelected] = useState<string[]>(initialSelected);
  const [feedbackText, setFeedbackText] = useState("");

  const handleSelect = useCallback((optionId: string) => {
    let newSelected: string[];
    if (exercise.allowMultiple) {
      newSelected = selected.includes(optionId)
        ? selected.filter((id) => id !== optionId)
        : [...selected, optionId];
    } else {
      newSelected = [optionId];
    }
    setSelected(newSelected);

    const option = exercise.options.find((o) => o.id === optionId);
    if (option) {
      setFeedbackText(option.feedback);
    }

    onResponse(exercise.allowMultiple ? newSelected : newSelected[0]);
  }, [exercise, selected, onResponse]);

  return (
    <div className="space-y-3">
      <p className="text-foreground font-medium text-sm">{exercise.question}</p>
      <div
        role={exercise.allowMultiple ? "group" : "radiogroup"}
        aria-label={exercise.question}
        className="space-y-2"
      >
        {exercise.options.map((option) => {
          const isSelected = selected.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              role={exercise.allowMultiple ? "checkbox" : "radio"}
              aria-checked={isSelected}
              aria-label={option.text}
              onClick={() => handleSelect(option.id)}
              className={`w-full min-h-[44px] px-4 py-3 rounded-lg border-2 text-left text-sm transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
                isSelected
                  ? "border-primary bg-primary/10 text-foreground font-medium"
                  : "border-border bg-surface text-foreground hover:border-primary-light hover:bg-surface-warm"
              }`}
            >
              {option.text}
            </button>
          );
        })}
      </div>
      {feedbackText && (
        <div
          aria-live="polite"
          aria-atomic="true"
          className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm text-foreground"
        >
          <span aria-hidden="true">💬</span>{" "}
          {feedbackText}
        </div>
      )}
    </div>
  );
}
