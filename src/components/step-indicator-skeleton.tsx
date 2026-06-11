"use client";

/**
 * Loading skeleton shown while the ThoughtRecordForm is dynamically imported.
 * Mimics the step indicator + content area layout to minimize CLS.
 */
export function StepIndicatorSkeleton() {
  return (
    <div className="space-y-8 animate-pulse" aria-busy="true" aria-label="Loading thought record form">
      {/* Step indicator skeleton */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-0">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-border" />
              {i < 3 && <div className="w-6 h-0.5 mx-1 bg-border" />}
            </div>
          ))}
        </div>
        <div className="flex items-start gap-4">
          {["Situation", "Thought", "Distortion", "Reframe"].map((label) => (
            <span key={label} className="text-xs text-muted/40 max-w-[4.5rem] text-center">
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Content area skeleton */}
      <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
        <div className="h-5 w-48 bg-border rounded" />
        <div className="h-3 w-64 bg-border/60 rounded" />
        <div className="h-24 w-full bg-border/40 rounded-lg" />
        <div className="h-11 w-32 bg-border/60 rounded-lg" />
      </div>
    </div>
  );
}
