"use client";

import { useState, useCallback, useId, FormEvent } from "react";
import type { Result, StorageError } from "@/lib/types";

interface AddItemFormProps {
  onAdd: (item: string) => Result<void, StorageError>;
  maxLength?: number;
  placeholder?: string;
}

const DEFAULT_MAX_LENGTH = 200;

export function AddItemForm({
  onAdd,
  maxLength = DEFAULT_MAX_LENGTH,
  placeholder = "Add an item\u2026",
}: AddItemFormProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const id = useId();
  const inputId = `${id}-input`;
  const counterId = `${id}-counter`;
  const errorId = `${id}-error`;

  const trimmedLength = value.trim().length;
  const charCount = value.length;
  const isEmpty = trimmedLength === 0;

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setError(null);

      const trimmed = value.trim();
      if (trimmed.length === 0) return;

      const result = onAdd(trimmed);
      if (result.ok) {
        setValue("");
      } else {
        setError(result.error.message);
      }
    },
    [value, onAdd]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (newValue.length <= maxLength) {
        setValue(newValue);
      } else {
        setValue(newValue.slice(0, maxLength));
      }
      if (error) setError(null);
    },
    [maxLength, error]
  );

  return (
    <form onSubmit={handleSubmit} className="mt-3 space-y-2">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            id={inputId}
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            maxLength={maxLength}
            aria-describedby={error ? `${counterId} ${errorId}` : counterId}
            aria-invalid={error ? "true" : undefined}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted/60 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset"
          />
        </div>
        <button
          type="submit"
          disabled={isEmpty}
          className="px-4 py-2 min-w-[44px] min-h-[44px] rounded-lg bg-primary text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset"
        >
          Add
        </button>
      </div>

      <div className="flex items-center justify-between">
        <span
          id={counterId}
          className={`text-xs tabular-nums ${
            charCount >= maxLength
              ? "text-danger font-medium"
              : "text-muted"
          }`}
        >
          {charCount}/{maxLength}
        </span>

        {error && (
          <span
            id={errorId}
            role="status"
            aria-live="polite"
            className="text-xs text-danger font-medium"
          >
            {error}
          </span>
        )}
      </div>
    </form>
  );
}
