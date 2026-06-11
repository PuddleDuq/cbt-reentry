"use client";

import { useCallback } from "react";
import CrisisBanner from "@/components/crisis-banner";
import { PlanSection } from "@/components/plan-section";
import { SupportContactForm } from "@/components/support-contact-form";
import { useCopingPlan } from "@/hooks/useCopingPlan";
import type { Result, StorageError } from "@/lib/types";

/**
 * Coping Plan page — composes all 5 editable sections in fixed order
 * with CrisisBanner at top and persistence on every operation.
 *
 * Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9
 */
export default function CopingPlanPage() {
  const { plan, addItem, removeItem, reorderItem, addContact, removeContact } =
    useCopingPlan();

  // Section-specific wrappers for PlanSection callbacks
  const addWarningSignal = useCallback(
    (item: string): Result<void, StorageError> => addItem("warningSignals", item),
    [addItem]
  );
  const removeWarningSignal = useCallback(
    (index: number): Result<void, StorageError> => removeItem("warningSignals", index),
    [removeItem]
  );

  const addCopingStrategy = useCallback(
    (item: string): Result<void, StorageError> => addItem("copingStrategies", item),
    [addItem]
  );
  const removeCopingStrategy = useCallback(
    (index: number): Result<void, StorageError> => removeItem("copingStrategies", index),
    [removeItem]
  );
  const reorderCopingStrategy = useCallback(
    (fromIndex: number, toIndex: number): Result<void, StorageError> =>
      reorderItem("copingStrategies", fromIndex, toIndex),
    [reorderItem]
  );

  const addSafeEnvironment = useCallback(
    (item: string): Result<void, StorageError> => addItem("safeEnvironments", item),
    [addItem]
  );
  const removeSafeEnvironment = useCallback(
    (index: number): Result<void, StorageError> => removeItem("safeEnvironments", index),
    [removeItem]
  );

  const addReason = useCallback(
    (item: string): Result<void, StorageError> => addItem("reasonsToStayCourse", item),
    [addItem]
  );
  const removeReason = useCallback(
    (index: number): Result<void, StorageError> => removeItem("reasonsToStayCourse", index),
    [removeItem]
  );

  return (
    <div className="space-y-8">
      {/* Crisis resources — visible without scrolling (Req 5.6) */}
      <CrisisBanner />

      <header>
        <h2 className="text-3xl font-semibold text-foreground tracking-tight">
          Your Coping Plan
        </h2>
        <p className="text-muted mt-2">
          Your personal safety net. Review and update it regularly so it&apos;s
          ready when you need it.
        </p>
      </header>

      {/* Section 1: Warning Signals (Req 5.1, 5.2, 5.3, 5.7) */}
      <PlanSection
        title="Warning Signals"
        items={plan.warningSignals}
        onAdd={addWarningSignal}
        onRemove={removeWarningSignal}
        placeholder="e.g., Feeling isolated or overwhelmed"
      />

      {/* Section 2: Coping Strategies — numbered, reorderable (Req 5.1, 5.2, 5.3, 5.7, 5.8, 5.9) */}
      <PlanSection
        title="Coping Strategies"
        items={plan.copingStrategies}
        onAdd={addCopingStrategy}
        onRemove={removeCopingStrategy}
        onReorder={reorderCopingStrategy}
        numbered={true}
        placeholder="e.g., Call my sponsor"
      />

      {/* Section 3: Support Contacts (Req 5.1, 5.4, 5.5, 5.7) */}
      <section className="bg-surface rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Support Contacts
        </h3>
        <SupportContactForm
          contacts={plan.supportContacts}
          onAdd={addContact}
          onRemove={removeContact}
        />
      </section>

      {/* Section 4: Safe Environments (Req 5.1, 5.2, 5.3, 5.7) */}
      <PlanSection
        title="Safe Environments"
        items={plan.safeEnvironments}
        onAdd={addSafeEnvironment}
        onRemove={removeSafeEnvironment}
        placeholder="e.g., The library, my sponsor's house"
      />

      {/* Section 5: Reasons to Stay the Course (Req 5.1, 5.2, 5.3, 5.7) */}
      <PlanSection
        title="Reasons to Stay the Course"
        items={plan.reasonsToStayCourse}
        onAdd={addReason}
        onRemove={removeReason}
        placeholder="e.g., My children, my health"
      />
    </div>
  );
}
