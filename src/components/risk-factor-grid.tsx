"use client";

import type { RiskFactor } from "@/lib/types";

interface RiskFactorOption {
  value: RiskFactor;
  label: string;
  emoji: string;
}

const riskFactorOptions: RiskFactorOption[] = [
  { value: "isolation", label: "Isolation", emoji: "🏠" },
  { value: "cravings", label: "Cravings", emoji: "🔄" },
  { value: "conflict", label: "Conflict", emoji: "⚡" },
  { value: "financial-stress", label: "Financial Stress", emoji: "💰" },
  { value: "boredom", label: "Boredom", emoji: "😴" },
  { value: "negative-self-talk", label: "Negative Self-Talk", emoji: "💭" },
  { value: "sleep-problems", label: "Sleep Problems", emoji: "🌙" },
  { value: "anger", label: "Anger", emoji: "🔥" },
];

interface RiskFactorGridProps {
  selected: RiskFactor[];
  onChange: (factors: RiskFactor[]) => void;
}

export function RiskFactorGrid({ selected, onChange }: RiskFactorGridProps) {
  function toggleFactor(factor: RiskFactor) {
    if (selected.includes(factor)) {
      onChange(selected.filter((f) => f !== factor));
    } else {
      onChange([...selected, factor]);
    }
  }

  return (
    <div role="group" aria-label="Risk factors">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {riskFactorOptions.map((option) => {
          const isSelected = selected.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => toggleFactor(option.value)}
              aria-pressed={isSelected}
              className={`flex items-center gap-2 min-h-[44px] min-w-[44px] px-4 py-3 rounded-lg border text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset ${
                isSelected
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-surface text-muted hover:border-primary-light"
              }`}
            >
              <span aria-hidden="true">{option.emoji}</span>
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
