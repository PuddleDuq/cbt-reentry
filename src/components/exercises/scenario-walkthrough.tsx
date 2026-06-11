"use client";

import { useState, useCallback } from "react";
import type { ScenarioExercise } from "@/lib/types";

interface ScenarioWalkthroughProps {
  exercise: ScenarioExercise;
  onResponse: (response: string | string[]) => void;
  savedResponse?: string | string[];
}

export function ScenarioWalkthrough({ exercise, onResponse, savedResponse }: ScenarioWalkthroughProps) {
  const totalSteps = exercise.guidedSteps.length;
  const initialResponses: string[] = Array.isArray(savedResponse)
    ? savedResponse
    : typeof savedResponse === "string" && savedResponse
      ? savedResponse.split("\n---\n")
      : Array(totalSteps).fill("");

  const [stepResponses, setStepResponses] = useState<string[]>(initialResponses);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newResponses = [...stepResponses];
    newResponses[currentStep] = e.target.value;
    setStepResponses(newResponses);
  }, [stepResponses, currentStep]);

  const handleNext = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
      onResponse(stepResponses);
    }
  }, [currentStep, totalSteps, stepResponses, onResponse]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-secondary-light/30 border border-secondary/30">
        <p className="text-sm font-medium text-foreground">
          <span aria-hidden="true">📖</span> Scenario:
        </p>
        <p className="text-sm text-foreground/80 mt-1">{exercise.scenario}</p>
      </div>
      <p className="text-sm text-foreground font-medium">{exercise.question}</p>

      {!isComplete ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted font-medium tabular-nums" data-numeric>
              Step {currentStep + 1} of {totalSteps}
            </span>
            <div className="flex gap-1">
              {exercise.guidedSteps.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i <= currentStep ? "bg-primary" : "bg-border"
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
          <label
            htmlFor="scenario-step-input"
            className="block text-sm text-foreground"
          >
            {exercise.guidedSteps[currentStep]}
          </label>
          <textarea
            id="scenario-step-input"
            aria-label={exercise.guidedSteps[currentStep]}
            value={stepResponses[currentStep]}
            onChange={handleTextChange}
            rows={3}
            placeholder="Write your response here…"
            className="w-full min-h-[80px] p-3 rounded-lg border border-border bg-surface text-foreground text-sm leading-relaxed placeholder:text-muted/60 resize-y focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          />
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              aria-label="Go to previous step"
              className="min-w-[44px] min-h-[44px] px-4 py-2 rounded-lg border border-border text-sm text-muted disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-warm transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={stepResponses[currentStep].trim().length === 0}
              aria-label={currentStep < totalSteps - 1 ? "Go to next step" : "Complete scenario"}
              className="min-w-[44px] min-h-[44px] px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary-dark transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            >
              {currentStep < totalSteps - 1 ? "Next" : "Done"}
            </button>
          </div>
        </div>
      ) : (
        <div aria-live="polite" className="p-3 rounded-lg bg-success/10 border border-success/30 text-sm text-foreground">
          <span aria-hidden="true">✅</span> Great work walking through this scenario!
        </div>
      )}
    </div>
  );
}
