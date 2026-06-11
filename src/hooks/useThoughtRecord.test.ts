import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useThoughtRecord } from "./useThoughtRecord";
import { localStorageMock } from "@/test/localStorage-mock";

describe("useThoughtRecord", () => {
  beforeEach(() => {
    localStorageMock.reset();
  });

  it("initializes with situation step and empty data", () => {
    const { result } = renderHook(() => useThoughtRecord());

    expect(result.current.step).toBe("situation");
    expect(result.current.data.id).toBeDefined();
    expect(result.current.data.timestamp).toBeDefined();
    expect(result.current.canAdvance).toBe(false);
  });

  it("canAdvance is false when situation is empty", () => {
    const { result } = renderHook(() => useThoughtRecord());

    expect(result.current.canAdvance).toBe(false);
  });

  it("canAdvance is true when situation is non-empty", () => {
    const { result } = renderHook(() => useThoughtRecord());

    act(() => {
      result.current.setField("situation", "Got rejected from a job");
    });

    expect(result.current.canAdvance).toBe(true);
  });

  it("nextStep advances from situation to thought when canAdvance is true", () => {
    const { result } = renderHook(() => useThoughtRecord());

    act(() => {
      result.current.setField("situation", "Got rejected from a job");
    });
    act(() => {
      result.current.nextStep();
    });

    expect(result.current.step).toBe("thought");
  });

  it("canAdvance on thought step requires all three fields", () => {
    const { result } = renderHook(() => useThoughtRecord());

    // Move to thought step
    act(() => {
      result.current.setField("situation", "Something happened");
    });
    act(() => {
      result.current.nextStep();
    });

    expect(result.current.canAdvance).toBe(false);

    // Add automatic thought only
    act(() => {
      result.current.setField("automaticThought", "I'm a failure");
    });
    expect(result.current.canAdvance).toBe(false);

    // Add emotion
    act(() => {
      result.current.setField("emotion", "anxious");
    });
    expect(result.current.canAdvance).toBe(false);

    // Add intensity
    act(() => {
      result.current.setField("emotionIntensity", 7);
    });
    expect(result.current.canAdvance).toBe(true);
  });

  it("canAdvance on distortion step requires at least one distortion", () => {
    const { result } = renderHook(() => useThoughtRecord());

    // Navigate to distortion step
    act(() => {
      result.current.setField("situation", "Something happened");
    });
    act(() => {
      result.current.nextStep();
    });
    act(() => {
      result.current.setField("automaticThought", "I'm a failure");
      result.current.setField("emotion", "anxious");
      result.current.setField("emotionIntensity", 7);
    });
    act(() => {
      result.current.nextStep();
    });

    expect(result.current.step).toBe("distortion");
    expect(result.current.canAdvance).toBe(false);

    act(() => {
      result.current.setField("distortions", ["all-or-nothing"]);
    });
    expect(result.current.canAdvance).toBe(true);
  });

  it("canAdvance on reframe step requires reframe text and newIntensity 1-10", () => {
    const { result } = renderHook(() => useThoughtRecord());

    // Navigate to reframe step
    act(() => {
      result.current.setField("situation", "Something happened");
    });
    act(() => {
      result.current.nextStep();
    });
    act(() => {
      result.current.setField("automaticThought", "I'm a failure");
      result.current.setField("emotion", "anxious");
      result.current.setField("emotionIntensity", 7);
    });
    act(() => {
      result.current.nextStep();
    });
    act(() => {
      result.current.setField("distortions", ["catastrophizing"]);
    });
    act(() => {
      result.current.nextStep();
    });

    expect(result.current.step).toBe("reframe");
    expect(result.current.canAdvance).toBe(false);

    act(() => {
      result.current.setField("reframe", "One rejection doesn't define me");
    });
    expect(result.current.canAdvance).toBe(false);

    act(() => {
      result.current.setField("newIntensity", 4);
    });
    expect(result.current.canAdvance).toBe(true);
  });

  it("canAdvance is always false on complete step", () => {
    const { result } = renderHook(() => useThoughtRecord());

    // Navigate all the way to complete
    act(() => {
      result.current.setField("situation", "Something");
    });
    act(() => {
      result.current.nextStep();
    });
    act(() => {
      result.current.setField("automaticThought", "Bad thought");
      result.current.setField("emotion", "sad");
      result.current.setField("emotionIntensity", 8);
    });
    act(() => {
      result.current.nextStep();
    });
    act(() => {
      result.current.setField("distortions", ["labeling"]);
    });
    act(() => {
      result.current.nextStep();
    });
    act(() => {
      result.current.setField("reframe", "Better thought");
      result.current.setField("newIntensity", 3);
    });
    act(() => {
      result.current.nextStep();
    });

    expect(result.current.step).toBe("complete");
    expect(result.current.canAdvance).toBe(false);
  });

  it("prevStep goes back without losing data", () => {
    const { result } = renderHook(() => useThoughtRecord());

    act(() => {
      result.current.setField("situation", "Got rejected");
    });
    act(() => {
      result.current.nextStep();
    });
    act(() => {
      result.current.setField("automaticThought", "I'm worthless");
      result.current.setField("emotion", "sad");
      result.current.setField("emotionIntensity", 9);
    });

    // Go back
    act(() => {
      result.current.prevStep();
    });

    expect(result.current.step).toBe("situation");
    expect(result.current.data.situation).toBe("Got rejected");
    expect(result.current.data.automaticThought).toBe("I'm worthless");
    expect(result.current.data.emotion).toBe("sad");
    expect(result.current.data.emotionIntensity).toBe(9);
  });

  it("prevStep does not go below situation", () => {
    const { result } = renderHook(() => useThoughtRecord());

    act(() => {
      result.current.prevStep();
    });

    expect(result.current.step).toBe("situation");
  });

  it("submit persists data to storage and returns ok result", () => {
    const { result } = renderHook(() => useThoughtRecord());

    act(() => {
      result.current.setField("situation", "Argument with roommate");
      result.current.setField("automaticThought", "They hate me");
      result.current.setField("emotion", "anger");
      result.current.setField("emotionIntensity", 8);
      result.current.setField("distortions", ["mind-reading"]);
      result.current.setField("reframe", "Maybe they were just stressed");
      result.current.setField("newIntensity", 4);
    });

    let submitResult: ReturnType<typeof result.current.submit>;
    act(() => {
      submitResult = result.current.submit();
    });

    expect(submitResult!.ok).toBe(true);
  });

  it("reset returns to initial state with new id and timestamp", () => {
    const { result } = renderHook(() => useThoughtRecord());

    const originalId = result.current.data.id;

    act(() => {
      result.current.setField("situation", "Something happened");
    });
    act(() => {
      result.current.nextStep();
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.step).toBe("situation");
    expect(result.current.data.id).toBeDefined();
    expect(result.current.data.id).not.toBe(originalId);
    expect(result.current.data.situation).toBeUndefined();
    expect(result.current.data.automaticThought).toBeUndefined();
  });

  it("emotionIntensity outside 1-10 range does not allow advance", () => {
    const { result } = renderHook(() => useThoughtRecord());

    act(() => {
      result.current.setField("situation", "Something");
    });
    act(() => {
      result.current.nextStep();
    });

    act(() => {
      result.current.setField("automaticThought", "Bad thought");
      result.current.setField("emotion", "fear");
      result.current.setField("emotionIntensity", 0);
    });
    expect(result.current.canAdvance).toBe(false);

    act(() => {
      result.current.setField("emotionIntensity", 11);
    });
    expect(result.current.canAdvance).toBe(false);

    act(() => {
      result.current.setField("emotionIntensity", 10);
    });
    expect(result.current.canAdvance).toBe(true);
  });

  it("whitespace-only strings do not count as non-empty", () => {
    const { result } = renderHook(() => useThoughtRecord());

    act(() => {
      result.current.setField("situation", "   ");
    });
    expect(result.current.canAdvance).toBe(false);
  });
});
