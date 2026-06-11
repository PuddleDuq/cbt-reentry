/**
 * A mock implementation of the Web Storage API (localStorage).
 * Supports configurable quota and error simulation for testing.
 */
export class LocalStorageMock implements Storage {
  private store: Map<string, string> = new Map();
  private _quotaLimit: number = 5 * 1024 * 1024; // 5MB default
  private _shouldThrowQuotaError: boolean = false;

  get length(): number {
    return this.store.size;
  }

  key(index: number): string | null {
    const keys = Array.from(this.store.keys());
    return keys[index] ?? null;
  }

  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    if (this._shouldThrowQuotaError) {
      throw new DOMException(
        "Failed to execute 'setItem' on 'Storage': Setting the value exceeded the quota.",
        "QuotaExceededError"
      );
    }

    const currentSize = this.getUsedBytes();
    const newSize = currentSize + new Blob([value]).size;
    if (newSize > this._quotaLimit) {
      throw new DOMException(
        "Failed to execute 'setItem' on 'Storage': Setting the value exceeded the quota.",
        "QuotaExceededError"
      );
    }

    this.store.set(key, value);
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }

  /** Get total bytes used in the mock store */
  getUsedBytes(): number {
    let total = 0;
    for (const [key, value] of this.store) {
      total += new Blob([key + value]).size;
    }
    return total;
  }

  /** Set a custom quota limit in bytes */
  setQuotaLimit(bytes: number): void {
    this._quotaLimit = bytes;
  }

  /** Force all setItem calls to throw QuotaExceededError */
  simulateQuotaExceeded(enabled: boolean): void {
    this._shouldThrowQuotaError = enabled;
  }

  /** Reset the mock to initial state */
  reset(): void {
    this.store.clear();
    this._quotaLimit = 5 * 1024 * 1024;
    this._shouldThrowQuotaError = false;
  }
}

export const localStorageMock = new LocalStorageMock();
