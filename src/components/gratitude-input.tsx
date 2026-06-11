"use client";

import { useId, useCallback, ClipboardEvent, ChangeEvent } from "react";

interface GratitudeInputProps {
  value: string;
  onChange: (value: string) => void;
}

const MAX_LENGTH = 500;
const WARNING_THRESHOLD = 450;

export function GratitudeInput({ value, onChange }: GratitudeInputProps) {
  const id = useId();
  const textareaId = `${id}-gratitude`;
  const counterId = `${id}-counter`;
  const errorId = `${id}-error`;

  const charCount = value.length;
  const isWarning = charCount > WARNING_THRESHOLD && charCount < MAX_LENGTH;
  const isAtLimit = charCount >= MAX_LENGTH;

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      if (newValue.length <= MAX_LENGTH) {
        onChange(newValue);
      } else {
        onChange(newValue.slice(0, MAX_LENGTH));
      }
    },
    [onChange]
  );

  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      const pastedText = e.clipboardData.getData("text/plain");
      const textarea = e.currentTarget;
      const selectionStart = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;

      const before = value.slice(0, selectionStart);
      const after = value.slice(selectionEnd);
      const combined = before + pastedText + after;

      if (combined.length <= MAX_LENGTH) {
        onChange(combined);
      } else {
        onChange(combined.slice(0, MAX_LENGTH));
      }
    },
    [value, onChange]
  );

  return (
    <div className="space-y-2">
      <label
        htmlFor={textareaId}
        className="block text-sm font-medium text-foreground"
      >
        What&rsquo;s one thing you&rsquo;re grateful for today?
      </label>

      <textarea
        id={textareaId}
        value={value}
        onChange={handleChange}
        onPaste={handlePaste}
        maxLength={MAX_LENGTH}
        placeholder="A person, moment, or small thing that brightened your day\u2026"
        rows={4}
        aria-describedby={isAtLimit ? `${counterId} ${errorId}` : counterId}
        aria-invalid={isAtLimit ? "true" : undefined}
        className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset resize-y min-h-[100px]"
      />

      <div className="flex items-center justify-between">
        <span
          id={counterId}
          className={`text-xs tabular-nums ${
            isAtLimit
              ? "text-danger font-medium"
              : isWarning
              ? "text-warning font-medium"
              : "text-muted"
          }`}
        >
          {charCount} / {MAX_LENGTH}
        </span>

        {isAtLimit && (
          <span
            id={errorId}
            role="status"
            aria-live="polite"
            className="text-xs text-danger font-medium"
          >
            Character limit reached
          </span>
        )}
      </div>
    </div>
  );
}
