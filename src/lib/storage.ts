// ============================================================================
// ReFrame — StorageManager
// localStorage persistence with Result type error handling, in-memory caching,
// and schema versioning.
// ============================================================================

import type {
  CheckInEntry,
  ThoughtRecord,
  Goal,
  CopingPlan,
  LessonProgress,
  Result,
  StorageError,
} from "@/lib/types";
import { STORAGE_KEYS, CURRENT_SCHEMA_VERSION } from "@/lib/types";

// --- In-memory read cache ---
const cache = new Map<string, unknown>();

// --- Helpers ---

function isLocalStorageAvailable(): boolean {
  try {
    if (typeof window === "undefined") return false;
    const testKey = "__reframe_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

function unavailableError(): Result<never, StorageError> {
  return {
    ok: false,
    error: { type: "UNAVAILABLE", message: "localStorage is not available" },
  };
}

function writeItem(key: string, value: unknown): Result<void, StorageError> {
  if (!isLocalStorageAvailable()) return unavailableError();

  try {
    const json = JSON.stringify(value);
    window.localStorage.setItem(key, json);
    cache.delete(key);
    return { ok: true, value: undefined };
  } catch (err: unknown) {
    if (
      err instanceof DOMException &&
      (err.name === "QuotaExceededError" ||
        err.code === 22 ||
        err.code === 1014)
    ) {
      return {
        ok: false,
        error: {
          type: "QUOTA_EXCEEDED",
          message: "Storage quota exceeded. Try clearing old data.",
        },
      };
    }
    return unavailableError();
  }
}

function readItem<T>(key: string, fallback: T): Result<T, StorageError> {
  if (!isLocalStorageAvailable()) return unavailableError();

  if (cache.has(key)) {
    return { ok: true, value: cache.get(key) as T };
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) {
      cache.set(key, fallback);
      return { ok: true, value: fallback };
    }
    const parsed = JSON.parse(raw) as T;
    cache.set(key, parsed);
    return { ok: true, value: parsed };
  } catch {
    // Corrupted JSON — return empty defaults
    cache.set(key, fallback);
    return { ok: true, value: fallback };
  }
}

// --- Schema versioning ---

function ensureSchema(): void {
  if (!isLocalStorageAvailable()) return;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.SCHEMA_VERSION);
    const version = raw !== null ? Number(raw) : 0;

    if (version < CURRENT_SCHEMA_VERSION) {
      runMigrations(version);
      window.localStorage.setItem(
        STORAGE_KEYS.SCHEMA_VERSION,
        String(CURRENT_SCHEMA_VERSION)
      );
      // Invalidate entire cache after migration
      cache.clear();
    }
  } catch {
    // If we can't read the version, attempt to set it
    try {
      window.localStorage.setItem(
        STORAGE_KEYS.SCHEMA_VERSION,
        String(CURRENT_SCHEMA_VERSION)
      );
    } catch {
      // silently fail
    }
  }
}

function runMigrations(fromVersion: number): void {
  // Migration from v0/v1 to v2: no-op for now (just updates the version number)
  if (fromVersion < 2) {
    // Future migrations would transform data here
  }
}

// Track whether schema check has run this session
let schemaChecked = false;

function checkSchemaOnce(): void {
  if (!schemaChecked) {
    ensureSchema();
    schemaChecked = true;
  }
}

// --- Public API ---

export function saveCheckIn(
  entry: CheckInEntry
): Result<void, StorageError> {
  checkSchemaOnce();
  const existing = readItem<CheckInEntry[]>(STORAGE_KEYS.CHECK_INS, []);
  if (!existing.ok) return existing;

  const updated = [...existing.value, entry];
  return writeItem(STORAGE_KEYS.CHECK_INS, updated);
}

export function getCheckIns(): Result<CheckInEntry[], StorageError> {
  checkSchemaOnce();
  return readItem<CheckInEntry[]>(STORAGE_KEYS.CHECK_INS, []);
}

export function saveThoughtRecord(
  record: ThoughtRecord
): Result<void, StorageError> {
  checkSchemaOnce();
  const existing = readItem<ThoughtRecord[]>(STORAGE_KEYS.THOUGHT_RECORDS, []);
  if (!existing.ok) return existing;

  const updated = [...existing.value, record];
  return writeItem(STORAGE_KEYS.THOUGHT_RECORDS, updated);
}

export function getThoughtRecords(): Result<ThoughtRecord[], StorageError> {
  checkSchemaOnce();
  return readItem<ThoughtRecord[]>(STORAGE_KEYS.THOUGHT_RECORDS, []);
}

export function saveGoals(goals: Goal[]): Result<void, StorageError> {
  checkSchemaOnce();
  return writeItem(STORAGE_KEYS.GOALS, goals);
}

export function getGoals(): Result<Goal[], StorageError> {
  checkSchemaOnce();
  return readItem<Goal[]>(STORAGE_KEYS.GOALS, []);
}

export function saveCopingPlan(
  plan: CopingPlan
): Result<void, StorageError> {
  checkSchemaOnce();
  return writeItem(STORAGE_KEYS.COPING_PLAN, plan);
}

export function getCopingPlan(): Result<CopingPlan | null, StorageError> {
  checkSchemaOnce();
  return readItem<CopingPlan | null>(STORAGE_KEYS.COPING_PLAN, null);
}

export function saveLessonProgress(
  progress: LessonProgress[]
): Result<void, StorageError> {
  checkSchemaOnce();
  return writeItem(STORAGE_KEYS.LESSON_PROGRESS, progress);
}

export function getLessonProgress(): Result<LessonProgress[], StorageError> {
  checkSchemaOnce();
  return readItem<LessonProgress[]>(STORAGE_KEYS.LESSON_PROGRESS, []);
}

export function clear(): Result<void, StorageError> {
  if (!isLocalStorageAvailable()) return unavailableError();

  try {
    const keys: string[] = Object.values(STORAGE_KEYS);
    for (const key of keys) {
      window.localStorage.removeItem(key);
    }
    cache.clear();
    schemaChecked = false;
    return { ok: true, value: undefined };
  } catch {
    return unavailableError();
  }
}

export function getStorageUsage(): Result<
  { used: number; keys: number },
  StorageError
> {
  if (!isLocalStorageAvailable()) return unavailableError();

  try {
    let used = 0;
    let keyCount = 0;
    const storageKeys: string[] = Object.values(STORAGE_KEYS);
    for (const key of storageKeys) {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        used += key.length + item.length;
        keyCount++;
      }
    }
    // Multiply by 2 for UTF-16 encoding (localStorage uses UTF-16)
    return { ok: true, value: { used: used * 2, keys: keyCount } };
  } catch {
    return unavailableError();
  }
}

// Export for testing purposes
export function _resetForTesting(): void {
  cache.clear();
  schemaChecked = false;
}
