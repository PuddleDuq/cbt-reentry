"use client";

import { useState, useCallback } from "react";
import { getCopingPlan, saveCopingPlan } from "@/lib/storage";
import type {
  CopingPlan,
  CopingPlanSection,
  SupportContact,
  Result,
  StorageError,
} from "@/lib/types";

const DEFAULT_PLAN: CopingPlan = {
  warningSignals: [],
  copingStrategies: [],
  supportContacts: [],
  safeEnvironments: [],
  reasonsToStayCourse: [],
};

const MAX_ITEMS_PER_SECTION = 20;
const MAX_ITEM_LENGTH = 200;
const MAX_CONTACT_NAME_LENGTH = 100;
const MAX_CONTACT_ROLE_LENGTH = 50;

/**
 * Domain hook for coping plan management.
 * Handles adding, removing, and reordering plan items with validation.
 * Uses lazy state initializer and functional setState for safe updates.
 */
export function useCopingPlan(): {
  plan: CopingPlan;
  addItem: (section: CopingPlanSection, item: string) => Result<void, StorageError>;
  removeItem: (section: CopingPlanSection, index: number) => Result<void, StorageError>;
  reorderItem: (
    section: "copingStrategies",
    fromIndex: number,
    toIndex: number
  ) => Result<void, StorageError>;
  addContact: (contact: SupportContact) => Result<void, StorageError>;
  removeContact: (index: number) => Result<void, StorageError>;
} {
  const [plan, setPlan] = useState<CopingPlan>(() => {
    const result = getCopingPlan();
    if (result.ok && result.value !== null) {
      return result.value;
    }
    return DEFAULT_PLAN;
  });

  const persist = useCallback((updatedPlan: CopingPlan): Result<void, StorageError> => {
    return saveCopingPlan(updatedPlan);
  }, []);

  const addItem = useCallback(
    (section: CopingPlanSection, item: string): Result<void, StorageError> => {
      // supportContacts must use addContact
      if (section === "supportContacts") {
        return {
          ok: false,
          error: {
            type: "PARSE_ERROR",
            message: "Use addContact to add support contacts.",
          },
        };
      }

      const trimmed = item.trim();

      if (trimmed.length === 0 || trimmed.length > MAX_ITEM_LENGTH) {
        return {
          ok: false,
          error: {
            type: "PARSE_ERROR",
            message: `Item must be between 1 and ${MAX_ITEM_LENGTH} characters.`,
          },
        };
      }

      let result: Result<void, StorageError> = { ok: true, value: undefined };

      setPlan((prev) => {
        const currentSection = prev[section] as string[];
        if (currentSection.length >= MAX_ITEMS_PER_SECTION) {
          result = {
            ok: false,
            error: {
              type: "PARSE_ERROR",
              message: `Section cannot exceed ${MAX_ITEMS_PER_SECTION} items.`,
            },
          };
          return prev;
        }

        const updated: CopingPlan = {
          ...prev,
          [section]: [...currentSection, trimmed],
        };

        const persistResult = saveCopingPlan(updated);
        if (!persistResult.ok) {
          result = persistResult;
          return prev;
        }

        return updated;
      });

      return result;
    },
    []
  );

  const removeItem = useCallback(
    (section: CopingPlanSection, index: number): Result<void, StorageError> => {
      let result: Result<void, StorageError> = { ok: true, value: undefined };

      setPlan((prev) => {
        const currentSection = prev[section];
        if (index < 0 || index >= currentSection.length) {
          result = {
            ok: false,
            error: {
              type: "PARSE_ERROR",
              message: "Invalid index.",
            },
          };
          return prev;
        }

        const updatedSection = [...currentSection];
        updatedSection.splice(index, 1);

        const updated: CopingPlan = {
          ...prev,
          [section]: updatedSection,
        };

        const persistResult = saveCopingPlan(updated);
        if (!persistResult.ok) {
          result = persistResult;
          return prev;
        }

        return updated;
      });

      return result;
    },
    []
  );

  const reorderItem = useCallback(
    (
      section: "copingStrategies",
      fromIndex: number,
      toIndex: number
    ): Result<void, StorageError> => {
      let result: Result<void, StorageError> = { ok: true, value: undefined };

      setPlan((prev) => {
        const strategies = prev.copingStrategies;
        if (
          fromIndex < 0 ||
          fromIndex >= strategies.length ||
          toIndex < 0 ||
          toIndex >= strategies.length
        ) {
          result = {
            ok: false,
            error: {
              type: "PARSE_ERROR",
              message: "Invalid reorder indices.",
            },
          };
          return prev;
        }

        if (fromIndex === toIndex) {
          return prev;
        }

        const updatedStrategies = [...strategies];
        const [moved] = updatedStrategies.splice(fromIndex, 1);
        updatedStrategies.splice(toIndex, 0, moved);

        const updated: CopingPlan = {
          ...prev,
          copingStrategies: updatedStrategies,
        };

        const persistResult = saveCopingPlan(updated);
        if (!persistResult.ok) {
          result = persistResult;
          return prev;
        }

        return updated;
      });

      return result;
    },
    []
  );

  const addContact = useCallback(
    (contact: SupportContact): Result<void, StorageError> => {
      const name = contact.name.trim();
      const role = contact.role.trim();
      const phone = contact.phone.trim();

      if (name.length === 0 || name.length > MAX_CONTACT_NAME_LENGTH) {
        return {
          ok: false,
          error: {
            type: "PARSE_ERROR",
            message: `Contact name must be between 1 and ${MAX_CONTACT_NAME_LENGTH} characters.`,
          },
        };
      }

      if (role.length === 0 || role.length > MAX_CONTACT_ROLE_LENGTH) {
        return {
          ok: false,
          error: {
            type: "PARSE_ERROR",
            message: `Contact role must be between 1 and ${MAX_CONTACT_ROLE_LENGTH} characters.`,
          },
        };
      }

      if (phone.length === 0) {
        return {
          ok: false,
          error: {
            type: "PARSE_ERROR",
            message: "Phone number is required.",
          },
        };
      }

      let result: Result<void, StorageError> = { ok: true, value: undefined };

      setPlan((prev) => {
        if (prev.supportContacts.length >= MAX_ITEMS_PER_SECTION) {
          result = {
            ok: false,
            error: {
              type: "PARSE_ERROR",
              message: `Support contacts cannot exceed ${MAX_ITEMS_PER_SECTION} items.`,
            },
          };
          return prev;
        }

        const updated: CopingPlan = {
          ...prev,
          supportContacts: [
            ...prev.supportContacts,
            { name, role, phone },
          ],
        };

        const persistResult = saveCopingPlan(updated);
        if (!persistResult.ok) {
          result = persistResult;
          return prev;
        }

        return updated;
      });

      return result;
    },
    []
  );

  const removeContact = useCallback(
    (index: number): Result<void, StorageError> => {
      let result: Result<void, StorageError> = { ok: true, value: undefined };

      setPlan((prev) => {
        if (index < 0 || index >= prev.supportContacts.length) {
          result = {
            ok: false,
            error: {
              type: "PARSE_ERROR",
              message: "Invalid contact index.",
            },
          };
          return prev;
        }

        const updatedContacts = [...prev.supportContacts];
        updatedContacts.splice(index, 1);

        const updated: CopingPlan = {
          ...prev,
          supportContacts: updatedContacts,
        };

        const persistResult = saveCopingPlan(updated);
        if (!persistResult.ok) {
          result = persistResult;
          return prev;
        }

        return updated;
      });

      return result;
    },
    []
  );

  return { plan, addItem, removeItem, reorderItem, addContact, removeContact };
}
