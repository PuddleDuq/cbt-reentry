"use client";

import { useState, useCallback } from "react";
import { saveLessonProgress, getLessonProgress } from "@/lib/storage";
import type {
  LessonProgress,
  ModuleProgress,
  ExerciseResponse,
  Result,
  StorageError,
} from "@/lib/types";

/**
 * Domain hook for lesson completion tracking.
 * Manages lesson progress state with lazy initialization from StorageManager.
 * Computes module progress as derived state (no useEffect).
 */
export function useLessonProgress(): {
  progress: LessonProgress[];
  getModuleProgress: (moduleId: string, totalLessons: number) => ModuleProgress;
  isLessonComplete: (moduleId: string, lessonId: string) => boolean;
  markLessonComplete: (
    moduleId: string,
    lessonId: string,
    responses: ExerciseResponse[]
  ) => Result<void, StorageError>;
  getExerciseResponses: (moduleId: string, lessonId: string) => ExerciseResponse[];
} {
  const [progress, setProgress] = useState<LessonProgress[]>(() => {
    const result = getLessonProgress();
    return result.ok ? result.value : [];
  });

  const getModuleProgress = useCallback(
    (moduleId: string, totalLessons: number): ModuleProgress => {
      const completedLessons = progress.filter(
        (entry) => entry.moduleId === moduleId
      ).length;

      return {
        moduleId,
        completedLessons,
        totalLessons,
        percentComplete: Math.round((completedLessons / totalLessons) * 100),
      };
    },
    [progress]
  );

  const isLessonComplete = useCallback(
    (moduleId: string, lessonId: string): boolean => {
      return progress.some(
        (entry) => entry.moduleId === moduleId && entry.lessonId === lessonId
      );
    },
    [progress]
  );

  const markLessonComplete = useCallback(
    (
      moduleId: string,
      lessonId: string,
      responses: ExerciseResponse[]
    ): Result<void, StorageError> => {
      // Use functional update to avoid stale closure over progress array
      let result: Result<void, StorageError> = { ok: true, value: undefined };

      setProgress((prev) => {
        // Skip if already complete
        const alreadyComplete = prev.some(
          (entry) => entry.moduleId === moduleId && entry.lessonId === lessonId
        );
        if (alreadyComplete) {
          return prev;
        }

        const entry: LessonProgress = {
          moduleId,
          lessonId,
          completedAt: new Date().toISOString(),
          exerciseResponses: responses,
        };

        const updated = [...prev, entry];
        const persistResult = saveLessonProgress(updated);

        if (!persistResult.ok) {
          result = persistResult;
          return prev; // Don't update state if persist failed
        }

        return updated;
      });

      return result;
    },
    []
  );

  const getExerciseResponses = useCallback(
    (moduleId: string, lessonId: string): ExerciseResponse[] => {
      const entry = progress.find(
        (p) => p.moduleId === moduleId && p.lessonId === lessonId
      );
      return entry ? entry.exerciseResponses : [];
    },
    [progress]
  );

  return {
    progress,
    getModuleProgress,
    isLessonComplete,
    markLessonComplete,
    getExerciseResponses,
  };
}
