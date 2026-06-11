"use client";

import React, { useState, useId } from "react";
import type { Goal, GoalCategory } from "@/lib/types";
import { ProgressBar } from "./progress-bar";

// --- Category color mappings ---

const categoryColors: Record<GoalCategory, { bg: string; text: string }> = {
  housing: { bg: "bg-primary/10", text: "text-primary-dark" },
  employment: { bg: "bg-secondary/20", text: "text-warning" },
  education: { bg: "bg-accent/10", text: "text-accent" },
  relationships: { bg: "bg-danger/10", text: "text-danger" },
  health: { bg: "bg-success/10", text: "text-success" },
  legal: { bg: "bg-muted/10", text: "text-muted" },
  financial: { bg: "bg-secondary/10", text: "text-secondary" },
  "personal-growth": { bg: "bg-primary-light/10", text: "text-primary" },
};

const categoryLabels: Record<GoalCategory, string> = {
  housing: "Housing",
  employment: "Employment",
  education: "Education",
  relationships: "Relationships",
  health: "Health",
  legal: "Legal",
  financial: "Financial",
  "personal-growth": "Personal Growth",
};

// --- Props ---

interface GoalCardProps {
  goal: Goal;
  onToggleStep: (goalId: string, stepIndex: number) => void;
  progress: number;
}

// --- GoalCard Component ---

export const GoalCard = React.memo(function GoalCard({
  goal,
  onToggleStep,
  progress,
}: GoalCardProps) {
  const [expanded, setExpanded] = useState(false);
  const checklistId = useId();

  const colors = categoryColors[goal.category] ?? {
    bg: "bg-muted/10",
    text: "text-muted",
  };

  return (
    <article
      className="bg-surface rounded-xl border border-border p-6"
      style={{ contentVisibility: "auto" }}
    >
      {/* Category badge */}
      <span
        className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${colors.bg} ${colors.text}`}
      >
        {categoryLabels[goal.category] ?? goal.category}
      </span>

      {/* Title */}
      <h3 className="mt-2 font-semibold text-foreground">{goal.title}</h3>

      {/* Progress bar */}
      <div className="mt-3">
        <ProgressBar value={progress} label={`${goal.title} progress`} />
      </div>

      {/* Expand/collapse toggle */}
      <button
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        aria-controls={checklistId}
        className="mt-4 flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors min-h-[44px] min-w-[44px]"
      >
        <span
          aria-hidden="true"
          className={`inline-block transition-transform duration-200 ${expanded ? "rotate-90" : ""}`}
        >
          ▶
        </span>
        {expanded ? "Hide steps" : `Show steps (${goal.steps.length})`}
      </button>

      {/* Step checklist */}
      {expanded && (
        <ul id={checklistId} className="mt-3 space-y-2" role="list">
          {goal.steps.map((step, index) => (
            <li key={index} className="flex items-center gap-3">
              <button
                onClick={() => onToggleStep(goal.id, index)}
                className="relative flex items-center justify-center flex-shrink-0 w-11 h-11"
                aria-label={`Mark "${step.text}" as ${step.completed ? "incomplete" : "complete"}`}
              >
                <span
                  className={`w-5 h-5 flex items-center justify-center rounded border transition-colors ${
                    step.completed
                      ? "bg-primary border-primary text-white"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {step.completed && (
                    <span aria-hidden="true" className="text-xs font-bold">
                      ✓
                    </span>
                  )}
                </span>
              </button>
              <span
                className={`text-sm ${
                  step.completed
                    ? "line-through text-muted"
                    : "text-foreground"
                }`}
              >
                {step.text}
              </span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
});
