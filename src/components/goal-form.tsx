"use client";

import { useState, useCallback } from "react";
import type { GoalCategory, Result } from "@/lib/types";
import type { GoalError, AddGoalInput } from "@/hooks/useGoals";

// --- Category options with labels ---

const CATEGORIES: { value: GoalCategory; label: string }[] = [
  { value: "housing", label: "Housing" },
  { value: "employment", label: "Employment" },
  { value: "education", label: "Education" },
  { value: "relationships", label: "Relationships" },
  { value: "health", label: "Health" },
  { value: "legal", label: "Legal" },
  { value: "financial", label: "Financial" },
  { value: "personal-growth", label: "Personal Growth" },
];

// --- Validation errors shape ---

interface FormErrors {
  title?: string;
  steps?: string;
  stepItems?: Record<number, string>;
}

// --- Props ---

interface GoalFormProps {
  onSubmit: (input: AddGoalInput) => Result<void, GoalError>;
}

export default function GoalForm({ onSubmit }: GoalFormProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<GoalCategory>("personal-growth");
  const [steps, setSteps] = useState<string[]>([""]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);

  // --- Validation ---

  const validate = useCallback((): FormErrors => {
    const newErrors: FormErrors = {};

    if (title.trim().length === 0) {
      newErrors.title = "Please enter a goal title";
    }

    const nonEmptySteps = steps.filter((s) => s.trim().length > 0);
    if (nonEmptySteps.length === 0) {
      newErrors.steps = "Add at least one step";
    }

    const stepItemErrors: Record<number, string> = {};
    steps.forEach((step, i) => {
      if (step.trim().length === 0 && steps.length > 1) {
        stepItemErrors[i] = `Step ${i + 1} can\u2019t be empty`;
      } else if (step.length > 200) {
        stepItemErrors[i] = `Step ${i + 1} is too long (max 200 characters)`;
      }
    });

    if (Object.keys(stepItemErrors).length > 0) {
      newErrors.stepItems = stepItemErrors;
    }

    return newErrors;
  }, [title, steps]);

  // --- Submit handler ---

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Filter out empty steps before submitting
    const filteredSteps = steps
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const result = onSubmit({ title, category, steps: filteredSteps });

    if (result.ok) {
      // Clear form on success
      setTitle("");
      setCategory("personal-growth");
      setSteps([""]);
      setErrors({});
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      // Show error from hook
      setErrors({ title: result.error.message });
    }
  };

  // --- Step management ---

  const updateStep = (index: number, value: string) => {
    setSteps((prev) => prev.map((s, i) => (i === index ? value : s)));
    // Clear step-level error when user types
    if (errors.stepItems?.[index]) {
      setErrors((prev) => {
        const newStepItems = { ...prev.stepItems };
        delete newStepItems[index];
        return {
          ...prev,
          stepItems: Object.keys(newStepItems).length > 0 ? newStepItems : undefined,
          steps: undefined,
        };
      });
    }
  };

  const addStep = () => {
    if (steps.length < 20) {
      setSteps((prev) => [...prev, ""]);
    }
  };

  const removeStep = (index: number) => {
    setSteps((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface rounded-xl border border-border p-6 space-y-6"
      noValidate
    >
      {/* Success message */}
      {showSuccess && (
        <div
          role="status"
          aria-live="polite"
          className="px-4 py-3 rounded-lg bg-primary/10 text-primary text-sm font-medium"
        >
          Goal created — you&rsquo;re on your way!
        </div>
      )}

      {/* Validation error announcements (ARIA live region) */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {errors.title && errors.title}
        {errors.steps && errors.steps}
        {errors.stepItems &&
          Object.values(errors.stepItems).join(". ")}
      </div>

      {/* Title field */}
      <div>
        <label
          htmlFor="goal-title"
          className="block font-medium text-foreground text-sm"
        >
          What&rsquo;s your goal?
        </label>
        <input
          id="goal-title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
          }}
          maxLength={100}
          placeholder="e.g., Find stable housing within 60 days"
          aria-describedby={errors.title ? "title-error" : undefined}
          aria-invalid={!!errors.title}
          className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary touch-action-manipulation"
        />
        <div className="mt-1 flex items-center justify-between">
          {errors.title ? (
            <p id="title-error" className="text-sm text-red-600" role="alert">
              {errors.title}
            </p>
          ) : (
            <span />
          )}
          <span
            className="text-xs text-muted tabular-nums"
            aria-label={`${title.length} of 100 characters used`}
          >
            {title.length}/100
          </span>
        </div>
      </div>

      {/* Category dropdown */}
      <div>
        <label
          htmlFor="goal-category"
          className="block font-medium text-foreground text-sm"
        >
          What category fits best?
        </label>
        <select
          id="goal-category"
          value={category}
          onChange={(e) => setCategory(e.target.value as GoalCategory)}
          className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary touch-action-manipulation"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Steps section */}
      <fieldset className="space-y-3">
        <legend className="font-medium text-foreground text-sm">
          Break it into steps:
        </legend>

        {errors.steps && (
          <p className="text-sm text-red-600" role="alert">
            {errors.steps}
          </p>
        )}

        <ol className="space-y-3">
          {steps.map((step, index) => (
            <li key={index} className="space-y-1">
              <div className="flex items-center gap-2">
                <label htmlFor={`step-${index}`} className="sr-only">
                  Step {index + 1}
                </label>
                <input
                  id={`step-${index}`}
                  type="text"
                  value={step}
                  onChange={(e) => updateStep(index, e.target.value)}
                  maxLength={200}
                  placeholder={`Step ${index + 1}`}
                  aria-describedby={
                    errors.stepItems?.[index] ? `step-error-${index}` : undefined
                  }
                  aria-invalid={!!errors.stepItems?.[index]}
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary touch-action-manipulation"
                />
                {steps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    aria-label={`Remove step ${index + 1}`}
                    className="flex items-center justify-center w-11 h-11 rounded-lg text-muted hover:text-red-600 hover:bg-red-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 touch-action-manipulation"
                  >
                    <span aria-hidden="true" className="text-lg leading-none">
                      ✕
                    </span>
                  </button>
                )}
              </div>
              <div className="flex items-center justify-between pl-0.5">
                {errors.stepItems?.[index] ? (
                  <p
                    id={`step-error-${index}`}
                    className="text-sm text-red-600"
                    role="alert"
                  >
                    {errors.stepItems[index]}
                  </p>
                ) : (
                  <span />
                )}
                <span
                  className="text-xs text-muted tabular-nums"
                  aria-label={`Step ${index + 1}: ${step.length} of 200 characters used`}
                >
                  {step.length}/200
                </span>
              </div>
            </li>
          ))}
        </ol>

        <button
          type="button"
          onClick={addStep}
          disabled={steps.length >= 20}
          className="px-4 py-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-lg touch-action-manipulation"
        >
          + Add step
        </button>
        {steps.length >= 20 && (
          <p className="text-xs text-muted">Maximum of 20 steps reached</p>
        )}
      </fieldset>

      {/* Submit button */}
      <button
        type="submit"
        className="w-full px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 touch-action-manipulation"
      >
        Create Goal
      </button>
    </form>
  );
}
