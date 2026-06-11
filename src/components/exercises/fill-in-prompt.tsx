"use client";

import { useState, useCallback } from "react";
import type { FillInExercise } from "@/lib/types";

interface FillInPromptProps {
  exercise: FillInExercise;
  onResponse: (response: string | string[]) => void;
  savedResponse?: string | string[];
}

export function FillInPrompt({ exercise, onResponse, savedResponse }: FillInPromptProps) {
  const initialValue = typeof savedResponse === "string" ? savedResponse : "";
  const [text, setText] = useState(initialValue);
  const [isSaved, setIsSaved] = useState(!!savedResponse);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setIsSaved(false);
  }, []);

  const handleSubmit = useCallback(() => {
    if (text.trim().length === 0) return;
    onResponse(text.trim());
    setIsSaved(true);
  }, [text, onResponse]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  // Split prompt text around [blank] placeholder
  const parts = exercise.prompt.split("[blank]");

  return (
    <div className="space-y-3">
      <p className="text-foreground text-sm leading-relaxed inline">
        {parts[0]}
        <input
          type="text"
          aria-label="Fill in the blank"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleSubmit}
          placeholder="your answer"
          className="inline-block min-w-[120px] min-h-[44px] mx-1 px-3 py-1 border-b-2 border-primary bg-transparent text-foreground text-sm font-medium focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
        />
        {parts[1] && <span>{parts[1]}</span>}
      </p>
      {exercise.hint && (
        <p className="text-xs text-muted italic">
          <span aria-hidden="true">💡</span> Hint: {exercise.hint}
        </p>
      )}
      <div className="flex items-center gap-2">
        {isSaved && (
          <span className="text-xs text-success font-medium" aria-live="polite">
            Saved ✓
          </span>
        )}
      </div>
    </div>
  );
}
