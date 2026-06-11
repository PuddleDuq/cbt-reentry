"use client";

import dynamic from "next/dynamic";
import type { Exercise } from "@/lib/types";
import { ReflectionInput } from "./reflection-input";
import { MultipleChoiceCard } from "./multiple-choice-card";
import { FillInPrompt } from "./fill-in-prompt";
import { ScenarioWalkthrough } from "./scenario-walkthrough";
import { ChecklistActivity } from "./checklist-activity";

const SortingActivity = dynamic(() => import("./sorting-activity"), {
  loading: () => (
    <div className="animate-pulse h-32 rounded-lg bg-surface-warm" aria-label="Loading exercise…" />
  ),
});

interface ExerciseBlockProps {
  exercise: Exercise;
  onResponse: (response: string | string[]) => void;
  savedResponse?: string | string[];
}

export default function ExerciseBlock({ exercise, onResponse, savedResponse }: ExerciseBlockProps) {
  return (
    <section
      aria-label="Interactive exercise"
      className="p-4 rounded-xl border border-border bg-surface space-y-2"
    >
      <div className="flex items-center gap-2 mb-2">
        <span aria-hidden="true" className="text-base">✏️</span>
        <span className="text-xs font-semibold text-primary uppercase tracking-wide">
          Exercise
        </span>
      </div>
      <ExerciseContent
        exercise={exercise}
        onResponse={onResponse}
        savedResponse={savedResponse}
      />
    </section>
  );
}

function ExerciseContent({ exercise, onResponse, savedResponse }: ExerciseBlockProps) {
  switch (exercise.type) {
    case "reflection":
      return (
        <ReflectionInput
          exercise={exercise}
          onResponse={onResponse}
          savedResponse={savedResponse}
        />
      );
    case "multiple-choice":
      return (
        <MultipleChoiceCard
          exercise={exercise}
          onResponse={onResponse}
          savedResponse={savedResponse}
        />
      );
    case "fill-in":
      return (
        <FillInPrompt
          exercise={exercise}
          onResponse={onResponse}
          savedResponse={savedResponse}
        />
      );
    case "scenario":
      return (
        <ScenarioWalkthrough
          exercise={exercise}
          onResponse={onResponse}
          savedResponse={savedResponse}
        />
      );
    case "sorting":
      return (
        <SortingActivity
          exercise={exercise}
          onResponse={onResponse}
          savedResponse={savedResponse}
        />
      );
    case "checklist":
      return (
        <ChecklistActivity
          exercise={exercise}
          onResponse={onResponse}
          savedResponse={savedResponse}
        />
      );
    default:
      return null;
  }
}
