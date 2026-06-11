"use client";

import { useState, useCallback } from "react";
import { saveCheckIn, getCheckIns } from "@/lib/storage";
import type { CheckInEntry, Result, StorageError, RiskFactor } from "@/lib/types";

/**
 * Domain hook for check-in operations.
 * Wraps StorageManager check-in persistence with reactive state.
 * Uses lazy state initializer to avoid repeated JSON.parse on re-renders.
 */
export function useCheckIn(): {
  submit: (
    mood: CheckInEntry["mood"],
    riskFactors: RiskFactor[],
    gratitude: string
  ) => Result<void, StorageError>;
  history: CheckInEntry[];
} {
  const [history, setHistory] = useState<CheckInEntry[]>(() => {
    const result = getCheckIns();
    return result.ok ? result.value : [];
  });

  const submit = useCallback(
    (
      mood: CheckInEntry["mood"],
      riskFactors: RiskFactor[],
      gratitude: string
    ): Result<void, StorageError> => {
      const entry: CheckInEntry = {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        mood,
        riskFactors,
        gratitude,
      };

      const result = saveCheckIn(entry);

      if (result.ok) {
        setHistory((prev) => [...prev, entry]);
      }

      return result;
    },
    []
  );

  return { submit, history };
}
