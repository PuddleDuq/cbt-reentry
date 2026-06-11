"use client";

import { useEffect, useRef } from "react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export function StepIndicator({
  currentStep,
  totalSteps,
  labels,
}: StepIndicatorProps) {
  const liveRegionRef = useRef<HTMLDivElement>(null);

  // Announce step changes to screen readers
  useEffect(() => {
    if (liveRegionRef.current) {
      const label = labels?.[currentStep - 1];
      liveRegionRef.current.textContent = label
        ? `Step ${currentStep} of ${totalSteps}: ${label}`
        : `Step ${currentStep} of ${totalSteps}`;
    }
  }, [currentStep, totalSteps, labels]);

  return (
    <div
      aria-label={`Step ${currentStep} of ${totalSteps}`}
      className="flex flex-col items-center gap-2"
    >
      {/* Progress dots with connecting lines */}
      <div className="flex items-center gap-0">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={stepNumber} className="flex items-center">
              {/* Dot */}
              <div
                aria-hidden="true"
                className={`relative flex items-center justify-center w-3 h-3 rounded-full transition-colors ${
                  isCompleted
                    ? "bg-primary"
                    : isCurrent
                      ? "bg-primary ring-2 ring-primary/30 ring-offset-1 ring-offset-background"
                      : "border-2 border-border bg-transparent"
                }`}
              >
                {isCompleted && (
                  <svg
                    className="w-2 h-2 text-white"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 6.5L4.5 9L10 3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>

              {/* Connecting line (between dots, not after last) */}
              {stepNumber < totalSteps && (
                <div
                  aria-hidden="true"
                  className={`w-6 h-0.5 mx-1 transition-colors ${
                    stepNumber < currentStep ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Optional labels below dots */}
      {labels && labels.length > 0 && (
        <div className="flex items-start gap-0 w-full justify-between">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;

            return (
              <span
                key={stepNumber}
                aria-hidden="true"
                className={`text-xs text-center max-w-[4.5rem] leading-tight ${
                  isCompleted || isCurrent ? "text-primary font-medium" : "text-muted"
                }`}
              >
                {labels[index]}
              </span>
            );
          })}
        </div>
      )}

      {/* Visually hidden live region for screen reader announcements */}
      <div
        ref={liveRegionRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
    </div>
  );
}
