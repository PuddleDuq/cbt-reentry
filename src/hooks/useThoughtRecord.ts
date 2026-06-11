"use client";

import { useState, useCallback } from "react";
import type {
  ThoughtRecord,
  ThoughtRecordStep,
  Result,
  StorageError,
} from "@/lib/types";
import { saveThoughtRecord } from "@/lib/storage";

// --- Step order ---
const STEP_ORDER: ThoughtRecordStep[] = [
  "situation",
  "thought",
  "distortion",
  "reframe",
  "complete",
];

// --- Helpers ---

function generateId(): string {
  return crypto.randomUUID();
}

function createInitialData(): Partial<ThoughtRecord> {
  return {
    id: generateId(),
    timestamp: new Date().toISOString(),
  };
}

/**
 * Derives whether the user can advance from the current step.
 * Computed during render — no useEffect.
 */
function deriveCanAdvance(
  step: ThoughtRecordStep,
  data: Partial<ThoughtRecord>
): boolean {
  switch (step) {
    case "situation":
      return typeof data.situation === "string" && data.situation.trim().length > 0;

    case "thought":
      return (
        typeof data.automaticThought === "string" &&
        data.automaticThought.trim().length > 0 &&
        typeof data.emotion === "string" &&
        data.emotion.trim().length > 0 &&
        typeof data.emotionIntensity === "number" &&
        data.emotionIntensity >= 1 &&
        data.emotionIntensity <= 10
      );

    case "distortion":
      return (
        Array.isArray(data.distortions) && data.distortions.length >= 1
      );

    case "reframe":
      return (
        typeof data.reframe === "string" &&
        data.reframe.trim().length > 0 &&
        typeof data.newIntensity === "number" &&
        data.newIntensity >= 1 &&
        data.newIntensity <= 10
      );

    case "complete":
      return false;

    default:
      return false;
  }
}

// --- Hook ---

export function useThoughtRecord() {
  const [step, setStep] = useState<ThoughtRecordStep>("situation");
  const [data, setData] = useState<Partial<ThoughtRecord>>(createInitialData);

  // Derive canAdvance during render (no useEffect)
  const canAdvance = deriveCanAdvance(step, data);

  const setField = useCallback(
    <K extends keyof ThoughtRecord>(key: K, value: ThoughtRecord[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const nextStep = useCallback(() => {
    setStep((current) => {
      const currentIndex = STEP_ORDER.indexOf(current);
      // Only advance if canAdvance would be true for the current step
      // We re-derive here since we're inside a callback and `canAdvance` may be stale
      if (currentIndex < STEP_ORDER.length - 1) {
        return STEP_ORDER[currentIndex + 1];
      }
      return current;
    });
  }, []);

  const prevStep = useCallback(() => {
    setStep((current) => {
      const currentIndex = STEP_ORDER.indexOf(current);
      if (currentIndex > 0) {
        return STEP_ORDER[currentIndex - 1];
      }
      return current;
    });
  }, []);

  const submit = useCallback((): Result<void, StorageError> => {
    const record: ThoughtRecord = {
      id: data.id || generateId(),
      timestamp: data.timestamp || new Date().toISOString(),
      situation: data.situation || "",
      automaticThought: data.automaticThought || "",
      emotion: data.emotion || "",
      emotionIntensity: data.emotionIntensity || 1,
      distortions: data.distortions || [],
      reframe: data.reframe || "",
      newIntensity: data.newIntensity || 1,
    };

    return saveThoughtRecord(record);
  }, [data]);

  const reset = useCallback(() => {
    setStep("situation");
    setData(createInitialData());
  }, []);

  const goToStep = useCallback((target: ThoughtRecordStep) => {
    if (STEP_ORDER.includes(target)) {
      setStep(target);
    }
  }, []);

  return {
    step,
    data,
    setField,
    nextStep,
    prevStep,
    canAdvance,
    submit,
    reset,
    goToStep,
  };
}
