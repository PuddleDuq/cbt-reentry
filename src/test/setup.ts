import "@testing-library/jest-dom/vitest";
import { localStorageMock } from "./localStorage-mock";

// Replace global localStorage with mock for all tests
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});
