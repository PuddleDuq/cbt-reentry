import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { arbCheckInEntry, arbThoughtRecord, arbGoal, arbCopingPlan, arbLessonProgress, arbExerciseResponse } from "./arbitraries";
import { localStorageMock } from "./localStorage-mock";

describe("Test infrastructure", () => {
  it("localStorage mock works", () => {
    localStorageMock.reset();
    localStorageMock.setItem("test-key", "test-value");
    expect(localStorageMock.getItem("test-key")).toBe("test-value");
    localStorageMock.removeItem("test-key");
    expect(localStorageMock.getItem("test-key")).toBeNull();
  });

  it("localStorage mock simulates quota exceeded", () => {
    localStorageMock.reset();
    localStorageMock.simulateQuotaExceeded(true);
    expect(() => localStorageMock.setItem("key", "value")).toThrow();
    localStorageMock.simulateQuotaExceeded(false);
  });

  it("fast-check arbitraries generate valid CheckInEntry", () => {
    fc.assert(
      fc.property(arbCheckInEntry, (entry) => {
        expect(entry.mood).toBeGreaterThanOrEqual(1);
        expect(entry.mood).toBeLessThanOrEqual(5);
        expect(entry.gratitude.length).toBeLessThanOrEqual(500);
        expect(entry.id).toBeDefined();
        expect(entry.timestamp).toBeDefined();
      })
    );
  });

  it("fast-check arbitraries generate valid ThoughtRecord", () => {
    fc.assert(
      fc.property(arbThoughtRecord, (record) => {
        expect(record.situation.length).toBeGreaterThan(0);
        expect(record.emotionIntensity).toBeGreaterThanOrEqual(1);
        expect(record.emotionIntensity).toBeLessThanOrEqual(10);
        expect(record.distortions.length).toBeGreaterThan(0);
      })
    );
  });

  it("fast-check arbitraries generate valid Goal", () => {
    fc.assert(
      fc.property(arbGoal, (goal) => {
        expect(goal.title.length).toBeGreaterThanOrEqual(1);
        expect(goal.title.length).toBeLessThanOrEqual(100);
        expect(goal.steps.length).toBeGreaterThanOrEqual(1);
        expect(goal.steps.length).toBeLessThanOrEqual(20);
        for (const step of goal.steps) {
          expect(step.text.length).toBeGreaterThanOrEqual(1);
          expect(step.text.length).toBeLessThanOrEqual(200);
        }
      })
    );
  });

  it("fast-check arbitraries generate valid CopingPlan", () => {
    fc.assert(
      fc.property(arbCopingPlan, (plan) => {
        expect(plan.warningSignals.length).toBeLessThanOrEqual(20);
        expect(plan.copingStrategies.length).toBeLessThanOrEqual(20);
        expect(plan.supportContacts.length).toBeLessThanOrEqual(20);
        expect(plan.safeEnvironments.length).toBeLessThanOrEqual(20);
        expect(plan.reasonsToStayCourse.length).toBeLessThanOrEqual(20);
      })
    );
  });

  it("fast-check arbitraries generate valid LessonProgress", () => {
    fc.assert(
      fc.property(arbLessonProgress, (progress) => {
        expect(progress.lessonId).toContain("/");
        expect(progress.moduleId.length).toBeGreaterThan(0);
        expect(progress.exerciseResponses.length).toBeGreaterThanOrEqual(1);
      })
    );
  });

  it("fast-check arbitraries generate valid ExerciseResponse", () => {
    fc.assert(
      fc.property(arbExerciseResponse, (response) => {
        expect(response.exerciseIndex).toBeGreaterThanOrEqual(0);
        expect(["reflection", "multiple-choice", "fill-in", "scenario", "sorting", "checklist"]).toContain(response.type);
        expect(response.respondedAt).toBeDefined();
      })
    );
  });
});
