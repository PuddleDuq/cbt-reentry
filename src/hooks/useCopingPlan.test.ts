import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useCopingPlan } from "./useCopingPlan";
import { localStorageMock } from "@/test/localStorage-mock";
import { _resetForTesting } from "@/lib/storage";

describe("useCopingPlan", () => {
  beforeEach(() => {
    localStorageMock.reset();
    _resetForTesting();
  });

  describe("initialization", () => {
    it("returns default empty plan when storage is empty", () => {
      const { result } = renderHook(() => useCopingPlan());
      expect(result.current.plan).toEqual({
        warningSignals: [],
        copingStrategies: [],
        supportContacts: [],
        safeEnvironments: [],
        reasonsToStayCourse: [],
      });
    });

    it("loads existing plan from storage", () => {
      const stored = {
        warningSignals: ["feeling isolated"],
        copingStrategies: ["call sponsor"],
        supportContacts: [{ name: "John", role: "Sponsor", phone: "555-1234" }],
        safeEnvironments: ["the library"],
        reasonsToStayCourse: ["my kids"],
      };
      localStorageMock.setItem("reframe:coping-plan", JSON.stringify(stored));
      const { result } = renderHook(() => useCopingPlan());
      expect(result.current.plan).toEqual(stored);
    });
  });

  describe("addItem", () => {
    it("adds a valid item to a section", () => {
      const { result } = renderHook(() => useCopingPlan());

      let res;
      act(() => {
        res = result.current.addItem("warningSignals", "feeling lonely");
      });

      expect(res).toEqual({ ok: true, value: undefined });
      expect(result.current.plan.warningSignals).toEqual(["feeling lonely"]);
    });

    it("trims whitespace from items", () => {
      const { result } = renderHook(() => useCopingPlan());

      act(() => {
        result.current.addItem("safeEnvironments", "  the park  ");
      });

      expect(result.current.plan.safeEnvironments).toEqual(["the park"]);
    });

    it("rejects empty items", () => {
      const { result } = renderHook(() => useCopingPlan());

      let res;
      act(() => {
        res = result.current.addItem("warningSignals", "   ");
      });

      expect(res).toEqual({
        ok: false,
        error: { type: "PARSE_ERROR", message: "Item must be between 1 and 200 characters." },
      });
      expect(result.current.plan.warningSignals).toEqual([]);
    });

    it("rejects items exceeding 200 characters", () => {
      const { result } = renderHook(() => useCopingPlan());

      const longItem = "a".repeat(201);
      let res;
      act(() => {
        res = result.current.addItem("warningSignals", longItem);
      });

      expect(res).toEqual({
        ok: false,
        error: { type: "PARSE_ERROR", message: "Item must be between 1 and 200 characters." },
      });
      expect(result.current.plan.warningSignals).toEqual([]);
    });

    it("accepts items exactly 200 characters", () => {
      const { result } = renderHook(() => useCopingPlan());

      const exactItem = "a".repeat(200);
      let res;
      act(() => {
        res = result.current.addItem("warningSignals", exactItem);
      });

      expect(res).toEqual({ ok: true, value: undefined });
      expect(result.current.plan.warningSignals).toEqual([exactItem]);
    });

    it("rejects adding to supportContacts section", () => {
      const { result } = renderHook(() => useCopingPlan());

      let res;
      act(() => {
        res = result.current.addItem("supportContacts", "some contact");
      });

      expect(res).toEqual({
        ok: false,
        error: { type: "PARSE_ERROR", message: "Use addContact to add support contacts." },
      });
    });

    it("rejects when section has 20 items", () => {
      const plan = {
        warningSignals: Array.from({ length: 20 }, (_, i) => `signal ${i}`),
        copingStrategies: [],
        supportContacts: [],
        safeEnvironments: [],
        reasonsToStayCourse: [],
      };
      localStorageMock.setItem("reframe:coping-plan", JSON.stringify(plan));

      const { result } = renderHook(() => useCopingPlan());

      let res;
      act(() => {
        res = result.current.addItem("warningSignals", "one more");
      });

      expect(res).toEqual({
        ok: false,
        error: { type: "PARSE_ERROR", message: "Section cannot exceed 20 items." },
      });
      expect(result.current.plan.warningSignals).toHaveLength(20);
    });

    it("persists added item to storage", () => {
      const { result } = renderHook(() => useCopingPlan());

      act(() => {
        result.current.addItem("reasonsToStayCourse", "my family");
      });

      const stored = JSON.parse(localStorageMock.getItem("reframe:coping-plan")!);
      expect(stored.reasonsToStayCourse).toEqual(["my family"]);
    });
  });

  describe("removeItem", () => {
    it("removes an item at a valid index", () => {
      const plan = {
        warningSignals: ["signal 1", "signal 2", "signal 3"],
        copingStrategies: [],
        supportContacts: [],
        safeEnvironments: [],
        reasonsToStayCourse: [],
      };
      localStorageMock.setItem("reframe:coping-plan", JSON.stringify(plan));

      const { result } = renderHook(() => useCopingPlan());

      let res;
      act(() => {
        res = result.current.removeItem("warningSignals", 1);
      });

      expect(res).toEqual({ ok: true, value: undefined });
      expect(result.current.plan.warningSignals).toEqual(["signal 1", "signal 3"]);
    });

    it("rejects invalid index", () => {
      const { result } = renderHook(() => useCopingPlan());

      let res;
      act(() => {
        res = result.current.removeItem("warningSignals", 5);
      });

      expect(res).toEqual({
        ok: false,
        error: { type: "PARSE_ERROR", message: "Invalid index." },
      });
    });

    it("rejects negative index", () => {
      const plan = {
        warningSignals: ["item"],
        copingStrategies: [],
        supportContacts: [],
        safeEnvironments: [],
        reasonsToStayCourse: [],
      };
      localStorageMock.setItem("reframe:coping-plan", JSON.stringify(plan));

      const { result } = renderHook(() => useCopingPlan());

      let res;
      act(() => {
        res = result.current.removeItem("warningSignals", -1);
      });

      expect(res).toEqual({
        ok: false,
        error: { type: "PARSE_ERROR", message: "Invalid index." },
      });
    });
  });

  describe("reorderItem", () => {
    it("moves an item from one position to another", () => {
      const plan = {
        warningSignals: [],
        copingStrategies: ["step 1", "step 2", "step 3"],
        supportContacts: [],
        safeEnvironments: [],
        reasonsToStayCourse: [],
      };
      localStorageMock.setItem("reframe:coping-plan", JSON.stringify(plan));

      const { result } = renderHook(() => useCopingPlan());

      let res;
      act(() => {
        res = result.current.reorderItem("copingStrategies", 0, 2);
      });

      expect(res).toEqual({ ok: true, value: undefined });
      expect(result.current.plan.copingStrategies).toEqual(["step 2", "step 3", "step 1"]);
    });

    it("moves item down (from index 2 to 0)", () => {
      const plan = {
        warningSignals: [],
        copingStrategies: ["A", "B", "C"],
        supportContacts: [],
        safeEnvironments: [],
        reasonsToStayCourse: [],
      };
      localStorageMock.setItem("reframe:coping-plan", JSON.stringify(plan));

      const { result } = renderHook(() => useCopingPlan());

      act(() => {
        result.current.reorderItem("copingStrategies", 2, 0);
      });

      expect(result.current.plan.copingStrategies).toEqual(["C", "A", "B"]);
    });

    it("does nothing when fromIndex equals toIndex", () => {
      const plan = {
        warningSignals: [],
        copingStrategies: ["A", "B", "C"],
        supportContacts: [],
        safeEnvironments: [],
        reasonsToStayCourse: [],
      };
      localStorageMock.setItem("reframe:coping-plan", JSON.stringify(plan));

      const { result } = renderHook(() => useCopingPlan());

      let res;
      act(() => {
        res = result.current.reorderItem("copingStrategies", 1, 1);
      });

      expect(res).toEqual({ ok: true, value: undefined });
      expect(result.current.plan.copingStrategies).toEqual(["A", "B", "C"]);
    });

    it("rejects invalid indices", () => {
      const plan = {
        warningSignals: [],
        copingStrategies: ["A", "B"],
        supportContacts: [],
        safeEnvironments: [],
        reasonsToStayCourse: [],
      };
      localStorageMock.setItem("reframe:coping-plan", JSON.stringify(plan));

      const { result } = renderHook(() => useCopingPlan());

      let res;
      act(() => {
        res = result.current.reorderItem("copingStrategies", 0, 5);
      });

      expect(res).toEqual({
        ok: false,
        error: { type: "PARSE_ERROR", message: "Invalid reorder indices." },
      });
    });
  });

  describe("addContact", () => {
    it("adds a valid contact", () => {
      const { result } = renderHook(() => useCopingPlan());

      let res;
      act(() => {
        res = result.current.addContact({
          name: "Jane Doe",
          role: "Counselor",
          phone: "555-9876",
        });
      });

      expect(res).toEqual({ ok: true, value: undefined });
      expect(result.current.plan.supportContacts).toEqual([
        { name: "Jane Doe", role: "Counselor", phone: "555-9876" },
      ]);
    });

    it("trims contact fields", () => {
      const { result } = renderHook(() => useCopingPlan());

      act(() => {
        result.current.addContact({
          name: "  Jane  ",
          role: "  Sponsor  ",
          phone: "  555-1111  ",
        });
      });

      expect(result.current.plan.supportContacts[0]).toEqual({
        name: "Jane",
        role: "Sponsor",
        phone: "555-1111",
      });
    });

    it("rejects empty name", () => {
      const { result } = renderHook(() => useCopingPlan());

      let res;
      act(() => {
        res = result.current.addContact({ name: "  ", role: "Friend", phone: "555-0000" });
      });

      expect(res).toEqual({
        ok: false,
        error: { type: "PARSE_ERROR", message: "Contact name must be between 1 and 100 characters." },
      });
    });

    it("rejects name exceeding 100 characters", () => {
      const { result } = renderHook(() => useCopingPlan());

      let res;
      act(() => {
        res = result.current.addContact({
          name: "a".repeat(101),
          role: "Friend",
          phone: "555-0000",
        });
      });

      expect(res).toEqual({
        ok: false,
        error: { type: "PARSE_ERROR", message: "Contact name must be between 1 and 100 characters." },
      });
    });

    it("rejects empty role", () => {
      const { result } = renderHook(() => useCopingPlan());

      let res;
      act(() => {
        res = result.current.addContact({ name: "John", role: "", phone: "555-0000" });
      });

      expect(res).toEqual({
        ok: false,
        error: { type: "PARSE_ERROR", message: "Contact role must be between 1 and 50 characters." },
      });
    });

    it("rejects role exceeding 50 characters", () => {
      const { result } = renderHook(() => useCopingPlan());

      let res;
      act(() => {
        res = result.current.addContact({
          name: "John",
          role: "a".repeat(51),
          phone: "555-0000",
        });
      });

      expect(res).toEqual({
        ok: false,
        error: { type: "PARSE_ERROR", message: "Contact role must be between 1 and 50 characters." },
      });
    });

    it("rejects empty phone", () => {
      const { result } = renderHook(() => useCopingPlan());

      let res;
      act(() => {
        res = result.current.addContact({ name: "John", role: "Friend", phone: "  " });
      });

      expect(res).toEqual({
        ok: false,
        error: { type: "PARSE_ERROR", message: "Phone number is required." },
      });
    });

    it("rejects when contacts reach 20", () => {
      const plan = {
        warningSignals: [],
        copingStrategies: [],
        supportContacts: Array.from({ length: 20 }, (_, i) => ({
          name: `Contact ${i}`,
          role: "Friend",
          phone: `555-${String(i).padStart(4, "0")}`,
        })),
        safeEnvironments: [],
        reasonsToStayCourse: [],
      };
      localStorageMock.setItem("reframe:coping-plan", JSON.stringify(plan));

      const { result } = renderHook(() => useCopingPlan());

      let res;
      act(() => {
        res = result.current.addContact({ name: "Extra", role: "New", phone: "555-9999" });
      });

      expect(res).toEqual({
        ok: false,
        error: { type: "PARSE_ERROR", message: "Support contacts cannot exceed 20 items." },
      });
    });
  });

  describe("removeContact", () => {
    it("removes a contact at a valid index", () => {
      const plan = {
        warningSignals: [],
        copingStrategies: [],
        supportContacts: [
          { name: "Alice", role: "Sponsor", phone: "555-1111" },
          { name: "Bob", role: "Friend", phone: "555-2222" },
        ],
        safeEnvironments: [],
        reasonsToStayCourse: [],
      };
      localStorageMock.setItem("reframe:coping-plan", JSON.stringify(plan));

      const { result } = renderHook(() => useCopingPlan());

      let res;
      act(() => {
        res = result.current.removeContact(0);
      });

      expect(res).toEqual({ ok: true, value: undefined });
      expect(result.current.plan.supportContacts).toEqual([
        { name: "Bob", role: "Friend", phone: "555-2222" },
      ]);
    });

    it("rejects invalid index", () => {
      const { result } = renderHook(() => useCopingPlan());

      let res;
      act(() => {
        res = result.current.removeContact(0);
      });

      expect(res).toEqual({
        ok: false,
        error: { type: "PARSE_ERROR", message: "Invalid contact index." },
      });
    });
  });
});
