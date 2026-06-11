"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useThoughtRecord } from "@/hooks/useThoughtRecord";
import { StepIndicator } from "@/components/step-indicator";
import type { CognitiveDistortion, ThoughtRecordStep } from "@/lib/types";

// --- Distortion data ---

const DISTORTIONS: {
  id: CognitiveDistortion;
  label: string;
  description: string;
}[] = [
  {
    id: "all-or-nothing",
    label: "All-or-Nothing",
    description: "Seeing things in black and white, no middle ground",
  },
  {
    id: "catastrophizing",
    label: "Catastrophizing",
    description: "Jumping to the worst possible outcome",
  },
  {
    id: "mind-reading",
    label: "Mind Reading",
    description: "Assuming you know what others think",
  },
  {
    id: "labeling",
    label: "Labeling",
    description: "Putting a fixed label on yourself or others",
  },
  {
    id: "should-statements",
    label: "Should Statements",
    description: "Rigid rules about how things must be",
  },
  {
    id: "emotional-reasoning",
    label: "Emotional Reasoning",
    description: "Treating feelings as facts",
  },
  {
    id: "overgeneralization",
    label: "Overgeneralization",
    description: "Using one event to predict everything",
  },
  {
    id: "personalization",
    label: "Personalization",
    description: "Blaming yourself for things outside your control",
  },
];

// --- Step labels for indicator ---

const STEP_LABELS = ["Situation", "Thought", "Distortion", "Reframe"];

// --- Step number mapping ---

function stepToNumber(step: string): number {
  switch (step) {
    case "situation":
      return 1;
    case "thought":
      return 2;
    case "distortion":
      return 3;
    case "reframe":
      return 4;
    case "complete":
      return 5;
    default:
      return 1;
  }
}

// --- Valid steps for URL sync ---

const VALID_STEPS: ThoughtRecordStep[] = [
  "situation",
  "thought",
  "distortion",
  "reframe",
  "complete",
];

function isValidStep(value: string | null): value is ThoughtRecordStep {
  return value !== null && VALID_STEPS.includes(value as ThoughtRecordStep);
}

// --- Main Component ---

export default function ThoughtRecordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    step,
    data,
    setField,
    nextStep,
    prevStep,
    canAdvance,
    submit,
    reset,
    goToStep,
  } = useThoughtRecord();

  const [storageError, setStorageError] = useState<string | null>(null);

  // --- URL → step sync on mount ---
  const hasInitialized = useRef(false);
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const urlStep = searchParams.get("step");
    if (isValidStep(urlStep) && urlStep !== step) {
      goToStep(urlStep);
    }
  }, [searchParams, step, goToStep]);

  // --- Step → URL sync ---
  useEffect(() => {
    const currentUrlStep = searchParams.get("step");
    if (currentUrlStep !== step) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("step", step);
      router.replace(`/thought-record?${params.toString()}`, { scroll: false });
    }
  }, [step, searchParams, router]);

  // Focus management: focus the section heading on step change
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.focus();
    }
  }, [step]);

  // Initialize intensity defaults when entering those steps.
  // The slider displays a default but the hook data is undefined until user interacts.
  useEffect(() => {
    if (step === "thought" && data.emotionIntensity === undefined) {
      setField("emotionIntensity", 5);
    }
    if (step === "reframe" && data.newIntensity === undefined) {
      setField("newIntensity", 5);
    }
  }, [step, data.emotionIntensity, data.newIntensity, setField]);

  const currentStepNumber = stepToNumber(step);

  // --- Toggle distortion selection ---
  function toggleDistortion(id: CognitiveDistortion) {
    const current = data.distortions || [];
    const updated = current.includes(id)
      ? current.filter((d) => d !== id)
      : [...current, id];
    setField("distortions", updated);
  }

  // --- Handle submit ---
  const handleSubmit = useCallback(() => {
    setStorageError(null);
    const result = submit();
    if (!result.ok) {
      setStorageError(
        result.error.type === "QUOTA_EXCEEDED"
          ? "Your browser storage is full. Try clearing some old data and try again."
          : "Something went wrong saving your thought record. Please try again."
      );
    }
  }, [submit]);

  // --- Situation Step ---
  if (step === "situation") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <StepIndicator
            currentStep={currentStepNumber}
            totalSteps={4}
            labels={STEP_LABELS}
          />
          <Link
            href="/"
            className="text-sm text-muted hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-surface-warm min-h-[44px] min-w-[44px] flex items-center"
            aria-label="Skip thought record and return home"
          >
            Skip
          </Link>
        </div>

        <section
          ref={sectionRef}
          tabIndex={-1}
          className="bg-surface rounded-xl border border-border p-6 space-y-4 outline-none"
          aria-labelledby="situation-heading"
        >
          <div>
            <h3 id="situation-heading" className="text-lg font-semibold text-foreground">
              What happened?
            </h3>
            <p className="text-sm text-muted mt-1">
              Describe the situation briefly. What was going on?
            </p>
          </div>

          <div>
            <label htmlFor="situation-input" className="sr-only">
              Describe the situation
            </label>
            <textarea
              id="situation-input"
              value={data.situation || ""}
              onChange={(e) => setField("situation", e.target.value)}
              rows={4}
              placeholder="For example: I was at a job interview and the interviewer seemed distracted…"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none"
              aria-describedby="situation-help"
            />
            <p id="situation-help" className="text-xs text-muted mt-1">
              Where were you? What triggered the feeling?
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={nextStep}
              disabled={!canAdvance}
              className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px] min-w-[44px]"
            >
              Next
            </button>
          </div>
        </section>
      </div>
    );
  }

  // --- Thought Step ---
  if (step === "thought") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <StepIndicator
            currentStep={currentStepNumber}
            totalSteps={4}
            labels={STEP_LABELS}
          />
          <Link
            href="/"
            className="text-sm text-muted hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-surface-warm min-h-[44px] min-w-[44px] flex items-center"
            aria-label="Skip thought record and return home"
          >
            Skip
          </Link>
        </div>

        <section
          ref={sectionRef}
          tabIndex={-1}
          className="bg-surface rounded-xl border border-border p-6 space-y-5 outline-none"
          aria-labelledby="thought-heading"
        >
          <div>
            <h3 id="thought-heading" className="text-lg font-semibold text-foreground">
              What thought popped into your head?
            </h3>
            <p className="text-sm text-muted mt-1">
              Write it exactly as it came to you. No editing needed.
            </p>
          </div>

          <div>
            <label htmlFor="thought-input" className="block text-sm font-medium text-foreground mb-1">
              Your automatic thought
            </label>
            <textarea
              id="thought-input"
              value={data.automaticThought || ""}
              onChange={(e) => setField("automaticThought", e.target.value)}
              rows={3}
              placeholder="For example: They think I'm not worth their time. I'll never get hired."
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none"
            />
          </div>

          <div>
            <label htmlFor="emotion-input" className="block text-sm font-medium text-foreground mb-1">
              What emotion came up?
            </label>
            <input
              id="emotion-input"
              type="text"
              value={data.emotion || ""}
              onChange={(e) => setField("emotion", e.target.value)}
              placeholder="For example: rejected, anxious, angry"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
            />
          </div>

          <div>
            <label htmlFor="intensity-slider" className="block text-sm font-medium text-foreground mb-1">
              How intense was it? <span className="tabular-nums">({data.emotionIntensity || 5}/10)</span>
            </label>
            <input
              id="intensity-slider"
              type="range"
              min={1}
              max={10}
              value={data.emotionIntensity || 5}
              onChange={(e) => setField("emotionIntensity", Number(e.target.value))}
              className="w-full accent-primary"
              aria-valuemin={1}
              aria-valuemax={10}
              aria-valuenow={data.emotionIntensity || 5}
              aria-valuetext={`${data.emotionIntensity || 5} out of 10`}
            />
            <div className="flex justify-between text-xs text-muted mt-1">
              <span>Mild</span>
              <span>Extreme</span>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-surface-warm transition-colors min-h-[44px] min-w-[44px]"
            >
              Back
            </button>
            <button
              type="button"
              onClick={nextStep}
              disabled={!canAdvance}
              className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px] min-w-[44px]"
            >
              Next
            </button>
          </div>
        </section>
      </div>
    );
  }

  // --- Distortion Step ---
  if (step === "distortion") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <StepIndicator
            currentStep={currentStepNumber}
            totalSteps={4}
            labels={STEP_LABELS}
          />
          <Link
            href="/"
            className="text-sm text-muted hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-surface-warm min-h-[44px] min-w-[44px] flex items-center"
            aria-label="Skip thought record and return home"
          >
            Skip
          </Link>
        </div>

        <section
          ref={sectionRef}
          tabIndex={-1}
          className="bg-surface rounded-xl border border-border p-6 space-y-5 outline-none"
          aria-labelledby="distortion-heading"
        >
          <div>
            <h3 id="distortion-heading" className="text-lg font-semibold text-foreground">
              Which thinking traps do you notice?
            </h3>
            <p className="text-sm text-muted mt-1">
              Select any that match your thought. Most people find at least one.
            </p>
          </div>

          {/* Original thought callout */}
          <div className="bg-surface-warm rounded-lg p-4 border border-border/60">
            <p className="text-xs font-medium text-muted uppercase tracking-wide mb-1">
              Your thought
            </p>
            <p className="text-sm text-foreground italic">
              &ldquo;{data.automaticThought}&rdquo;
            </p>
          </div>

          {/* Distortion cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            role="group"
            aria-label="Cognitive distortions"
          >
            {DISTORTIONS.map((d) => {
              const isSelected = (data.distortions || []).includes(d.id);
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => toggleDistortion(d.id)}
                  className={`text-left p-4 rounded-lg border transition-colors min-h-[44px] ${
                    isSelected
                      ? "border-accent bg-accent/10 ring-1 ring-accent/30"
                      : "border-border hover:border-accent/50"
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className="font-medium text-sm text-foreground">
                    {d.label}
                  </span>
                  <p className="text-xs text-muted mt-1">{d.description}</p>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-surface-warm transition-colors min-h-[44px] min-w-[44px]"
            >
              Back
            </button>
            <button
              type="button"
              onClick={nextStep}
              disabled={!canAdvance}
              className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px] min-w-[44px]"
            >
              Next
            </button>
          </div>
        </section>
      </div>
    );
  }

  // --- Reframe Step ---
  if (step === "reframe") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <StepIndicator
            currentStep={currentStepNumber}
            totalSteps={4}
            labels={STEP_LABELS}
          />
          <Link
            href="/"
            className="text-sm text-muted hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-surface-warm min-h-[44px] min-w-[44px] flex items-center"
            aria-label="Skip thought record and return home"
          >
            Skip
          </Link>
        </div>

        <section
          ref={sectionRef}
          tabIndex={-1}
          className="bg-surface rounded-xl border border-border p-6 space-y-5 outline-none"
          aria-labelledby="reframe-heading"
        >
          <div>
            <h3 id="reframe-heading" className="text-lg font-semibold text-foreground">
              Write a more balanced thought
            </h3>
            <p className="text-sm text-muted mt-1">
              Knowing the traps, what&apos;s a fairer way to see this?
            </p>
          </div>

          {/* Original thought + distortions callout */}
          <div className="bg-surface-warm rounded-lg p-4 border border-border/60 space-y-2">
            <div>
              <p className="text-xs font-medium text-muted uppercase tracking-wide mb-1">
                Original thought
              </p>
              <p className="text-sm text-foreground italic">
                &ldquo;{data.automaticThought}&rdquo;
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted uppercase tracking-wide mb-1">
                Thinking traps
              </p>
              <p className="text-sm text-accent font-medium">
                {(data.distortions || [])
                  .map((id) => DISTORTIONS.find((d) => d.id === id)?.label)
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>
          </div>

          <div>
            <label htmlFor="reframe-input" className="block text-sm font-medium text-foreground mb-1">
              Your balanced thought
            </label>
            <textarea
              id="reframe-input"
              value={data.reframe || ""}
              onChange={(e) => setField("reframe", e.target.value)}
              rows={4}
              placeholder="For example: They might have been checking something important. One interview doesn't define my whole future."
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none"
            />
          </div>

          <div>
            <label htmlFor="new-intensity-slider" className="block text-sm font-medium text-foreground mb-1">
              How intense is the emotion now? <span className="tabular-nums">({data.newIntensity || 5}/10)</span>
            </label>
            <input
              id="new-intensity-slider"
              type="range"
              min={1}
              max={10}
              value={data.newIntensity || 5}
              onChange={(e) => setField("newIntensity", Number(e.target.value))}
              className="w-full accent-primary"
              aria-valuemin={1}
              aria-valuemax={10}
              aria-valuenow={data.newIntensity || 5}
              aria-valuetext={`${data.newIntensity || 5} out of 10`}
            />
            <div className="flex justify-between text-xs text-muted mt-1">
              <span>Mild</span>
              <span>Extreme</span>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-surface-warm transition-colors min-h-[44px] min-w-[44px]"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => {
                nextStep();
                handleSubmit();
              }}
              disabled={!canAdvance}
              className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px] min-w-[44px]"
            >
              Complete
            </button>
          </div>

          {storageError && (
            <div
              role="alert"
              aria-live="polite"
              className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700"
            >
              {storageError}
            </div>
          )}
        </section>
      </div>
    );
  }

  // --- Summary / Complete Step ---
  if (step === "complete") {
    const intensityChange = (data.emotionIntensity || 5) - (data.newIntensity || 5);
    const changeLabel =
      intensityChange > 0
        ? `down ${intensityChange} point${intensityChange !== 1 ? "s" : ""}`
        : intensityChange < 0
          ? `up ${Math.abs(intensityChange)} point${Math.abs(intensityChange) !== 1 ? "s" : ""}`
          : "no change";

    return (
      <div className="space-y-6">
        <section
          ref={sectionRef}
          tabIndex={-1}
          className="bg-surface rounded-xl border border-border p-8 text-center space-y-6 outline-none"
          aria-labelledby="summary-heading"
        >
          <span className="text-4xl" aria-hidden="true">🌱</span>
          <h3 id="summary-heading" className="text-2xl font-semibold text-foreground">
            Nice work
          </h3>
          <p className="text-muted max-w-md mx-auto">
            You examined your thought and found a more balanced perspective. Your emotion intensity went from{" "}
            <span className="tabular-nums font-medium">{data.emotionIntensity || 5}/10</span> to{" "}
            <span className="tabular-nums font-medium">{data.newIntensity || 5}/10</span>{" "}
            ({changeLabel}).
          </p>

          {/* Summary card */}
          <div className="bg-surface-warm rounded-lg p-6 text-left max-w-lg mx-auto space-y-4">
            <div>
              <p className="text-xs font-medium text-muted uppercase tracking-wide">
                Situation
              </p>
              <p className="text-sm text-foreground mt-1">
                {data.situation}
              </p>
            </div>

            <div className="border-t border-border pt-3">
              <p className="text-xs font-medium text-muted uppercase tracking-wide">
                Original thought
              </p>
              <p className="text-sm text-foreground mt-1 italic">
                &ldquo;{data.automaticThought}&rdquo;
              </p>
              <p className="text-xs text-muted mt-1 tabular-nums">
                Intensity: {data.emotionIntensity || 5}/10
              </p>
            </div>

            {/* Arrow divider */}
            <div className="flex justify-center" aria-hidden="true">
              <svg className="w-5 h-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.19l2.72-2.72a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 111.06-1.06l2.72 2.72V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
              </svg>
            </div>

            <div className="border-t border-border pt-3">
              <p className="text-xs font-medium text-muted uppercase tracking-wide">
                Reframe
              </p>
              <p className="text-sm text-primary-dark mt-1 font-medium">
                &ldquo;{data.reframe}&rdquo;
              </p>
              <p className="text-xs text-muted mt-1 tabular-nums">
                Intensity: {data.newIntensity || 5}/10
              </p>
            </div>
          </div>

          {storageError && (
            <div
              role="alert"
              aria-live="polite"
              className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700 text-left max-w-lg mx-auto"
            >
              {storageError}
            </div>
          )}

          <button
            type="button"
            onClick={reset}
            className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors min-h-[44px] min-w-[44px]"
          >
            Start a New Record
          </button>
        </section>
      </div>
    );
  }

  return null;
}
