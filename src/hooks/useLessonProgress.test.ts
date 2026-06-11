import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useLessonProgress } from "./useLessonProgress";
import { localStorageMock } from "@/test/localStorage-mock";
import { _resetForTesting } from "@/lib/storage";
import type { ExerciseResponse } from "@/lib/types";

describe("useLessonProgress", () => {
  beforeEach(() => {
    localStorageMock.reset();
    _resetForTesting();
  });

  it("returns empty progress array when no lessons completed", () => {
    const { result } = renderHook(() => useLessonProgress());
    expect(result.current.progress).toEqual([]);
  });

  it("marks a lesson complete and updates progress", () => {
    const { result } = renderHook(() => useLessonProgress());

    const responses: ExerciseResponse[] = [
      {
        exerciseIndex: 0,
        type: "reflection",
        response: "I learned something",
        respondedAt: "2024-01-01T00:00:00.000Z",
      },
    ];

    let markResult: ReturnType<typeof result.current.markLessonComplete>;
    act(() => {
      markResult = result.current.markLessonComplete(
        "thinking-traps",
        "what-are-thinking-traps",
        responses
      );
    });

    expect(markResult!.ok).toBe(true);
    expect(result.current.progress).toHaveLength(1);
    expect(result.current.progress[0].moduleId).toBe("thinking-traps");
    expect(result.current.progress[0].lessonId).toBe("what-are-thinking-traps");
    expect(result.current.progress[0].exerciseResponses).toEqual(responses);
    expect(result.current.progress[0].completedAt).toBeTruthy();
  });

  it("skips marking already-complete lesson", () => {
    const { result } = renderHook(() => useLessonProgress());

    act(() => {
      result.current.markLessonComplete("thinking-traps", "lesson-1", []);
    });

    act(() => {
      result.current.markLessonComplete("thinking-traps", "lesson-1", []);
    });

    expect(result.current.progress).toHaveLength(1);
  });

  it("isLessonComplete returns true for completed lesson", () => {
    const { result } = renderHook(() => useLessonProgress());

    act(() => {
      result.current.markLessonComplete("thinking-traps", "lesson-1", []);
    });

    expect(
      result.current.isLessonComplete("thinking-traps", "lesson-1")
    ).toBe(true);
  });

  it("isLessonComplete returns false for incomplete lesson", () => {
    const { result } = renderHook(() => useLessonProgress());

    expect(
      result.current.isLessonComplete("thinking-traps", "lesson-1")
    ).toBe(false);
  });

  it("getModuleProgress computes correct percentage", () => {
    const { result } = renderHook(() => useLessonProgress());

    act(() => {
      result.current.markLessonComplete("thinking-traps", "lesson-1", []);
      result.current.markLessonComplete("thinking-traps", "lesson-2", []);
    });

    const moduleProgress = result.current.getModuleProgress(
      "thinking-traps",
      5
    );
    expect(moduleProgress.moduleId).toBe("thinking-traps");
    expect(moduleProgress.completedLessons).toBe(2);
    expect(moduleProgress.totalLessons).toBe(5);
    expect(moduleProgress.percentComplete).toBe(40); // Math.round((2/5)*100)
  });

  it("getModuleProgress returns 0 when no lessons completed", () => {
    const { result } = renderHook(() => useLessonProgress());

    const moduleProgress = result.current.getModuleProgress(
      "thinking-traps",
      5
    );
    expect(moduleProgress.percentComplete).toBe(0);
    expect(moduleProgress.completedLessons).toBe(0);
  });

  it("getExerciseResponses returns responses for completed lesson", () => {
    const { result } = renderHook(() => useLessonProgress());

    const responses: ExerciseResponse[] = [
      {
        exerciseIndex: 0,
        type: "multiple-choice",
        response: ["option-a"],
        respondedAt: "2024-01-01T00:00:00.000Z",
      },
      {
        exerciseIndex: 1,
        type: "reflection",
        response: "My reflection here",
        respondedAt: "2024-01-01T00:01:00.000Z",
      },
    ];

    act(() => {
      result.current.markLessonComplete("thinking-traps", "lesson-1", responses);
    });

    const retrieved = result.current.getExerciseResponses(
      "thinking-traps",
      "lesson-1"
    );
    expect(retrieved).toEqual(responses);
  });

  it("getExerciseResponses returns empty array for incomplete lesson", () => {
    const { result } = renderHook(() => useLessonProgress());

    const retrieved = result.current.getExerciseResponses(
      "thinking-traps",
      "lesson-1"
    );
    expect(retrieved).toEqual([]);
  });

  it("persists progress to localStorage", () => {
    const { result } = renderHook(() => useLessonProgress());

    act(() => {
      result.current.markLessonComplete("thinking-traps", "lesson-1", []);
    });

    // Verify data was persisted
    const stored = localStorageMock.getItem("reframe:lesson-progress");
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].moduleId).toBe("thinking-traps");
  });

  it("loads persisted progress on initialization", () => {
    const existingProgress = [
      {
        moduleId: "thinking-traps",
        lessonId: "lesson-1",
        completedAt: "2024-01-01T00:00:00.000Z",
        exerciseResponses: [],
      },
    ];
    localStorageMock.setItem(
      "reframe:lesson-progress",
      JSON.stringify(existingProgress)
    );
    _resetForTesting();

    const { result } = renderHook(() => useLessonProgress());
    expect(result.current.progress).toHaveLength(1);
    expect(result.current.isLessonComplete("thinking-traps", "lesson-1")).toBe(
      true
    );
  });
});
