import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useGoals } from "./useGoals";
import { localStorageMock } from "@/test/localStorage-mock";
import { _resetForTesting } from "@/lib/storage";

describe("useGoals", () => {
  beforeEach(() => {
    localStorageMock.reset();
    _resetForTesting();
  });

  describe("initialization", () => {
    it("returns empty goals array when localStorage is empty", () => {
      const { result } = renderHook(() => useGoals());
      expect(result.current.goals).toEqual([]);
    });

    it("loads existing goals from localStorage on mount", () => {
      const existingGoals = [
        {
          id: "goal-1",
          createdAt: "2024-01-01T00:00:00.000Z",
          title: "Find housing",
          category: "housing",
          steps: [
            { text: "Search listings", completed: true },
            { text: "Schedule viewings", completed: false },
          ],
        },
      ];
      localStorageMock.setItem("reframe:goals", JSON.stringify(existingGoals));

      const { result } = renderHook(() => useGoals());
      expect(result.current.goals).toEqual(existingGoals);
    });
  });

  describe("addGoal", () => {
    it("creates a goal with valid inputs", () => {
      const { result } = renderHook(() => useGoals());

      act(() => {
        const res = result.current.addGoal({
          title: "Get a job",
          category: "employment",
          steps: ["Update resume", "Apply to 5 positions"],
        });
        expect(res.ok).toBe(true);
      });

      expect(result.current.goals).toHaveLength(1);
      expect(result.current.goals[0].title).toBe("Get a job");
      expect(result.current.goals[0].category).toBe("employment");
      expect(result.current.goals[0].steps).toEqual([
        { text: "Update resume", completed: false },
        { text: "Apply to 5 positions", completed: false },
      ]);
      expect(result.current.goals[0].id).toBeDefined();
      expect(result.current.goals[0].createdAt).toBeDefined();
    });

    it("trims title and step text", () => {
      const { result } = renderHook(() => useGoals());

      act(() => {
        result.current.addGoal({
          title: "  Find housing  ",
          category: "housing",
          steps: ["  Search listings  "],
        });
      });

      expect(result.current.goals[0].title).toBe("Find housing");
      expect(result.current.goals[0].steps[0].text).toBe("Search listings");
    });

    it("rejects empty title", () => {
      const { result } = renderHook(() => useGoals());
      let res: ReturnType<typeof result.current.addGoal>;

      act(() => {
        res = result.current.addGoal({
          title: "   ",
          category: "housing",
          steps: ["Step 1"],
        });
      });

      expect(res!.ok).toBe(false);
      if (!res!.ok) {
        expect(res!.error.type).toBe("VALIDATION_ERROR");
      }
      expect(result.current.goals).toHaveLength(0);
    });

    it("rejects title longer than 100 characters", () => {
      const { result } = renderHook(() => useGoals());
      let res: ReturnType<typeof result.current.addGoal>;

      act(() => {
        res = result.current.addGoal({
          title: "a".repeat(101),
          category: "housing",
          steps: ["Step 1"],
        });
      });

      expect(res!.ok).toBe(false);
      expect(result.current.goals).toHaveLength(0);
    });

    it("rejects zero steps", () => {
      const { result } = renderHook(() => useGoals());
      let res: ReturnType<typeof result.current.addGoal>;

      act(() => {
        res = result.current.addGoal({
          title: "Valid title",
          category: "housing",
          steps: [],
        });
      });

      expect(res!.ok).toBe(false);
      if (!res!.ok) {
        expect(res!.error.type).toBe("VALIDATION_ERROR");
      }
    });

    it("rejects more than 20 steps", () => {
      const { result } = renderHook(() => useGoals());
      let res: ReturnType<typeof result.current.addGoal>;

      act(() => {
        res = result.current.addGoal({
          title: "Valid title",
          category: "housing",
          steps: Array.from({ length: 21 }, (_, i) => `Step ${i + 1}`),
        });
      });

      expect(res!.ok).toBe(false);
      if (!res!.ok) {
        expect(res!.error.type).toBe("VALIDATION_ERROR");
      }
    });

    it("rejects a step with empty text", () => {
      const { result } = renderHook(() => useGoals());
      let res: ReturnType<typeof result.current.addGoal>;

      act(() => {
        res = result.current.addGoal({
          title: "Valid title",
          category: "housing",
          steps: ["Valid step", "   "],
        });
      });

      expect(res!.ok).toBe(false);
      if (!res!.ok) {
        expect(res!.error.type).toBe("VALIDATION_ERROR");
      }
    });

    it("rejects a step longer than 200 characters", () => {
      const { result } = renderHook(() => useGoals());
      let res: ReturnType<typeof result.current.addGoal>;

      act(() => {
        res = result.current.addGoal({
          title: "Valid title",
          category: "housing",
          steps: ["a".repeat(201)],
        });
      });

      expect(res!.ok).toBe(false);
      if (!res!.ok) {
        expect(res!.error.type).toBe("VALIDATION_ERROR");
      }
    });

    it("persists goals to localStorage", () => {
      const { result } = renderHook(() => useGoals());

      act(() => {
        result.current.addGoal({
          title: "Get a job",
          category: "employment",
          steps: ["Apply"],
        });
      });

      const stored = JSON.parse(localStorageMock.getItem("reframe:goals")!);
      expect(stored).toHaveLength(1);
      expect(stored[0].title).toBe("Get a job");
    });
  });

  describe("toggleStep", () => {
    it("toggles a step from incomplete to complete", () => {
      const { result } = renderHook(() => useGoals());

      act(() => {
        result.current.addGoal({
          title: "Find housing",
          category: "housing",
          steps: ["Search listings", "Call landlord"],
        });
      });

      act(() => {
        const res = result.current.toggleStep(result.current.goals[0].id, 0);
        expect(res.ok).toBe(true);
      });

      expect(result.current.goals[0].steps[0].completed).toBe(true);
      expect(result.current.goals[0].steps[1].completed).toBe(false);
    });

    it("toggles a step from complete back to incomplete", () => {
      const { result } = renderHook(() => useGoals());

      act(() => {
        result.current.addGoal({
          title: "Find housing",
          category: "housing",
          steps: ["Search listings"],
        });
      });

      act(() => {
        result.current.toggleStep(result.current.goals[0].id, 0);
      });

      act(() => {
        result.current.toggleStep(result.current.goals[0].id, 0);
      });

      expect(result.current.goals[0].steps[0].completed).toBe(false);
    });

    it("returns error for non-existent goal ID", () => {
      const { result } = renderHook(() => useGoals());
      let res: ReturnType<typeof result.current.toggleStep>;

      act(() => {
        res = result.current.toggleStep("non-existent-id", 0);
      });

      expect(res!.ok).toBe(false);
    });

    it("returns error for out-of-bounds step index", () => {
      const { result } = renderHook(() => useGoals());

      act(() => {
        result.current.addGoal({
          title: "Find housing",
          category: "housing",
          steps: ["One step"],
        });
      });

      let res: ReturnType<typeof result.current.toggleStep>;
      act(() => {
        res = result.current.toggleStep(result.current.goals[0].id, 5);
      });

      expect(res!.ok).toBe(false);
    });

    it("persists toggled step to localStorage", () => {
      const { result } = renderHook(() => useGoals());

      act(() => {
        result.current.addGoal({
          title: "Find housing",
          category: "housing",
          steps: ["Search"],
        });
      });

      act(() => {
        result.current.toggleStep(result.current.goals[0].id, 0);
      });

      const stored = JSON.parse(localStorageMock.getItem("reframe:goals")!);
      expect(stored[0].steps[0].completed).toBe(true);
    });
  });

  describe("getProgress", () => {
    it("returns 0 for no completed steps", () => {
      const { result } = renderHook(() => useGoals());

      act(() => {
        result.current.addGoal({
          title: "Find housing",
          category: "housing",
          steps: ["Step 1", "Step 2", "Step 3"],
        });
      });

      const progress = result.current.getProgress(result.current.goals[0]);
      expect(progress).toBe(0);
    });

    it("returns 100 for all completed steps", () => {
      const { result } = renderHook(() => useGoals());

      act(() => {
        result.current.addGoal({
          title: "Find housing",
          category: "housing",
          steps: ["Step 1", "Step 2"],
        });
      });

      act(() => {
        result.current.toggleStep(result.current.goals[0].id, 0);
      });
      act(() => {
        result.current.toggleStep(result.current.goals[0].id, 1);
      });

      const progress = result.current.getProgress(result.current.goals[0]);
      expect(progress).toBe(100);
    });

    it("computes correct rounded percentage", () => {
      const { result } = renderHook(() => useGoals());

      act(() => {
        result.current.addGoal({
          title: "Find housing",
          category: "housing",
          steps: ["Step 1", "Step 2", "Step 3"],
        });
      });

      act(() => {
        result.current.toggleStep(result.current.goals[0].id, 0);
      });

      // 1/3 = 33.33... → rounds to 33
      const progress = result.current.getProgress(result.current.goals[0]);
      expect(progress).toBe(33);
    });

    it("returns 0 for a goal with zero steps", () => {
      const { result } = renderHook(() => useGoals());
      const emptyGoal = {
        id: "test",
        createdAt: "2024-01-01T00:00:00.000Z",
        title: "Test",
        category: "housing" as const,
        steps: [],
      };

      const progress = result.current.getProgress(emptyGoal);
      expect(progress).toBe(0);
    });
  });
});
