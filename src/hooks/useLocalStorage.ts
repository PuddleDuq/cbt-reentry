"use client";

import { useState, useCallback, useRef } from "react";

/**
 * Generic hook for reactive localStorage access.
 * Uses lazy state initializer to avoid re-parsing on every render,
 * supports functional setState for safe concurrent updates,
 * and caches parsed values in memory.
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // In-memory cache ref to avoid repeated JSON.parse
  const cacheRef = useRef<{ key: string; value: T } | null>(null);

  const [storedValue, setStoredValue] = useState<T>(() => {
    // Lazy state initializer — only runs once on mount
    if (typeof window === "undefined") {
      return defaultValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        return defaultValue;
      }
      const parsed = JSON.parse(item) as T;
      cacheRef.current = { key, value: parsed };
      return parsed;
    } catch {
      // Corrupted JSON or other error — return default
      return defaultValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        // Support functional updates
        const nextValue =
          value instanceof Function ? value(prev) : value;

        // Write to localStorage
        if (typeof window !== "undefined") {
          try {
            const serialized = JSON.stringify(nextValue);
            window.localStorage.setItem(key, serialized);
            // Update in-memory cache
            cacheRef.current = { key, value: nextValue };
          } catch (error: unknown) {
            // Handle QuotaExceededError gracefully — still update React state
            if (
              error instanceof DOMException &&
              (error.name === "QuotaExceededError" ||
                error.code === 22 ||
                error.code === 1014)
            ) {
              console.warn(
                `[useLocalStorage] Storage quota exceeded for key "${key}". State updated but not persisted.`
              );
            } else {
              console.warn(
                `[useLocalStorage] Failed to write to localStorage for key "${key}".`
              );
            }
          }
        }

        return nextValue;
      });
    },
    [key]
  );

  return [storedValue, setValue];
}
