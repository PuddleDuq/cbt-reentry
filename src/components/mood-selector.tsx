"use client";

import { useCallback, useRef } from "react";

interface MoodOption {
  value: 1 | 2 | 3 | 4 | 5;
  label: string;
  emoji: string;
}

const moodOptions: MoodOption[] = [
  { value: 1, label: "Struggling", emoji: "😟" },
  { value: 2, label: "Tough", emoji: "😕" },
  { value: 3, label: "Okay", emoji: "😐" },
  { value: 4, label: "Good", emoji: "🙂" },
  { value: 5, label: "Great", emoji: "😊" },
];

interface MoodSelectorProps {
  value: number | null;
  onChange: (mood: 1 | 2 | 3 | 4 | 5) => void;
}

export function MoodSelector({ value, onChange }: MoodSelectorProps) {
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusOption = useCallback((index: number) => {
    optionRefs.current[index]?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      let nextIndex: number | null = null;

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          event.preventDefault();
          nextIndex = (index + 1) % moodOptions.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          event.preventDefault();
          nextIndex =
            (index - 1 + moodOptions.length) % moodOptions.length;
          break;
        case " ":
        case "Enter":
          event.preventDefault();
          onChange(moodOptions[index].value);
          return;
        default:
          return;
      }

      if (nextIndex !== null) {
        focusOption(nextIndex);
        onChange(moodOptions[nextIndex].value);
      }
    },
    [onChange, focusOption]
  );

  return (
    <div
      role="radiogroup"
      aria-label="Mood selection"
      className="flex flex-wrap gap-3 justify-center"
    >
      {moodOptions.map((option, index) => {
        const isSelected = value === option.value;

        return (
          <button
            key={option.value}
            ref={(el) => {
              optionRefs.current[index] = el;
            }}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={option.label}
            tabIndex={
              isSelected || (value === null && index === 0) ? 0 : -1
            }
            onClick={() => onChange(option.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`flex flex-col items-center justify-center min-w-[44px] min-h-[44px] w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 transition-colors cursor-pointer select-none ${
              isSelected
                ? "border-primary bg-primary/10 ring-2 ring-primary ring-offset-2 ring-offset-background"
                : "border-border bg-surface hover:border-primary-light hover:bg-surface-warm"
            } focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2`}
          >
            <span aria-hidden="true" className="text-2xl sm:text-3xl">
              {option.emoji}
            </span>
            <span
              className={`text-xs mt-1 font-medium ${
                isSelected ? "text-primary-dark" : "text-muted"
              }`}
            >
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
