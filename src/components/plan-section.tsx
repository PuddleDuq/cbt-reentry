"use client";

import dynamic from "next/dynamic";
import type { Result, StorageError } from "@/lib/types";
import { AddItemForm } from "@/components/add-item-form";

const ReorderableList = dynamic(() => import("@/components/reorderable-list"));

interface PlanSectionProps {
  title: string;
  items: string[];
  onAdd: (item: string) => Result<void, StorageError>;
  onRemove: (index: number) => Result<void, StorageError>;
  onReorder?: (fromIndex: number, toIndex: number) => Result<void, StorageError>;
  numbered?: boolean;
  placeholder?: string;
}

export function PlanSection({
  title,
  items,
  onAdd,
  onRemove,
  onReorder,
  numbered = false,
  placeholder,
}: PlanSectionProps) {
  const count = items.length;

  return (
    <section className="bg-surface rounded-xl border border-border p-6">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <span
          className="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-2 rounded-full bg-primary/10 text-primary text-xs font-medium tabular-nums"
          aria-label={`${count} item${count !== 1 ? "s" : ""}`}
        >
          {count}
        </span>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-muted italic py-4">
          No items yet. Add one below.
        </p>
      ) : onReorder ? (
        <ReorderableList
          items={items}
          onReorder={onReorder}
          onRemove={onRemove}
        />
      ) : numbered ? (
        <ol className="space-y-2">
          {items.map((item, index) => (
            <li
              key={`${index}-${item}`}
              className="flex items-center justify-between rounded-lg px-4 py-3 bg-surface-warm border border-border"
            >
              <span className="text-sm text-foreground break-words">
                <span className="font-medium text-primary mr-2 tabular-nums">
                  {index + 1}.
                </span>
                {item}
              </span>
              <button
                type="button"
                onClick={() => onRemove(index)}
                aria-label={`Remove ${item}`}
                className="shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md text-muted hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset"
              >
                <span aria-hidden="true">✕</span>
              </button>
            </li>
          ))}
        </ol>
      ) : (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={`${index}-${item}`}
              className="flex items-center justify-between rounded-lg px-4 py-3 bg-surface-warm border border-border"
            >
              <span className="text-sm text-foreground break-words">{item}</span>
              <button
                type="button"
                onClick={() => onRemove(index)}
                aria-label={`Remove ${item}`}
                className="shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md text-muted hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset"
              >
                <span aria-hidden="true">✕</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <AddItemForm onAdd={onAdd} placeholder={placeholder} />
    </section>
  );
}
