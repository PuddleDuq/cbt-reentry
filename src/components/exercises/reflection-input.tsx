"use client";

import { useState, useCallback } from "react";
import type { ReflectionExercise } from "@/lib/types";

interface ReflectionInputProps {
  exercise: ReflectionExercise;
  onResponse: (response: string | string[]) => void;
  savedResponse?: string | string[];
}

export function ReflectionInput({ exercise, onResponse, savedResponse }: ReflectionInputProps) {
  const initialValue = typeof savedResponse === "string" ? savedResponse : "";
  const [text, setText] = useState(initialValue);
  const [isSaved, setIsSaved] = useState(!!savedResponse);

  const maxLength = 1000;
  const minLength = exercise.minLength ?? 0;
  const charCount = text.length;
  const isValid = charCount >= minLength;

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.slice(0, maxLength);
    setText(value);
    setIsSaved(false);
  }, []);

  const handleSave = useCallback(() => {
    if (!isValid) return;
    onResponse(text);
    setIsSaved(true);
  }, [text, isValid, onResponse]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSave();
    }
  }, [handleSave]);

  return (
    <div className="space-y-3">
      <label htmlFor="reflection-textarea" className="block text-foreground font-medium text-sm">
        {exercise.prompt}
      </label>
      <textarea
        id="reflection-textarea"
        aria-label={exercise.prompt}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={exercise.placeholder ?? "Take your time. There are no wrong answers."}
        rows={4}
        className="w-full min-h-[120px] p-3 rounded-lg border border-border bg-surface text-foreground text-sm leading-relaxed placeholder:text-muted/60 resize-y focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted tabular-nums" data-numeric>
          {charCount}/{maxLength}
          {minLength > 0 && !isValid && (
            <span className="text-warning ml-2">
              (min {minLength} characters)
            </span>
          )}
        </span>
        <div className="flex items-center gap-2">
          {isSaved && (
            <span className="text-xs text-success font-medium" aria-live="polite">
              Saved ✓
            </span>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={!isValid || text.length === 0}
            aria-label="Save your reflection"
            className="min-w-[44px] min-h-[44px] px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary-dark transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
