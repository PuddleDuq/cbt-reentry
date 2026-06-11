import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useLocalStorage } from "./useLocalStorage";
import { localStorageMock } from "@/test/localStorage-mock";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorageMock.reset();
  });

  it("returns default value when localStorage is empty", () => {
    const { result } = renderHook(() =>
      useLocalStorage("test:key", "default")
    );
    expect(result.current[0]).toBe("default");
  });

  it("reads existing value from localStorage", () => {
    localStorageMock.setItem("test:key", JSON.stringify("stored-value"));
    const { result } = renderHook(() =>
      useLocalStorage("test:key", "default")
    );
    expect(result.current[0]).toBe("stored-value");
  });

  it("writes value to localStorage when set", () => {
    const { result } = renderHook(() =>
      useLocalStorage("test:key", "default")
    );

    act(() => {
      result.current[1]("new-value");
    });

    expect(result.current[0]).toBe("new-value");
    expect(JSON.parse(localStorageMock.getItem("test:key")!)).toBe(
      "new-value"
    );
  });

  it("supports functional updates", () => {
    const { result } = renderHook(() =>
      useLocalStorage<string[]>("test:array", ["a"])
    );

    act(() => {
      result.current[1]((prev) => [...prev, "b"]);
    });

    expect(result.current[0]).toEqual(["a", "b"]);
    expect(JSON.parse(localStorageMock.getItem("test:array")!)).toEqual([
      "a",
      "b",
    ]);
  });

  it("handles complex objects", () => {
    const complexObj = { id: "1", items: [{ text: "hello", done: true }] };
    const { result } = renderHook(() =>
      useLocalStorage("test:complex", complexObj)
    );

    expect(result.current[0]).toEqual(complexObj);

    const updated = { id: "1", items: [{ text: "world", done: false }] };
    act(() => {
      result.current[1](updated);
    });

    expect(result.current[0]).toEqual(updated);
    expect(JSON.parse(localStorageMock.getItem("test:complex")!)).toEqual(
      updated
    );
  });

  it("returns default value when localStorage has corrupted JSON", () => {
    localStorageMock.setItem("test:corrupt", "not-valid-json{{{");
    const { result } = renderHook(() =>
      useLocalStorage("test:corrupt", "fallback")
    );
    expect(result.current[0]).toBe("fallback");
  });

  it("still updates state when quota is exceeded", () => {
    const { result } = renderHook(() =>
      useLocalStorage("test:quota", "initial")
    );

    // Simulate quota exceeded
    localStorageMock.simulateQuotaExceeded(true);

    act(() => {
      result.current[1]("new-value");
    });

    // State should be updated even though persistence failed
    expect(result.current[0]).toBe("new-value");
  });

  it("supports multiple functional updates in sequence", () => {
    const { result } = renderHook(() =>
      useLocalStorage<number>("test:counter", 0)
    );

    act(() => {
      result.current[1]((prev) => prev + 1);
    });
    act(() => {
      result.current[1]((prev) => prev + 1);
    });
    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(3);
  });
});
