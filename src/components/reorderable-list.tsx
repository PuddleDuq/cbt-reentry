"use client";

import type { Result, StorageError } from "@/lib/types";

interface ReorderableListProps {
  items: string[];
  onReorder: (fromIndex: number, toIndex: number) => Result<void, StorageError>;
  onRemove: (index: number) => Result<void, StorageError>;
}

export default function ReorderableList({
  items,
  onReorder,
  onRemove,
}: ReorderableListProps) {
  return (
    <ol className="space-y-2">
      {items.map((item, index) => (
        <li
          key={`${index}-${item}`}
          className="flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-lg px-4 py-3"
        >
          <span className="text-sm font-medium text-primary tabular-nums min-w-[1.5rem]">
            {index + 1}.
          </span>
          <span className="flex-1 text-sm text-foreground break-words">
            {item}
          </span>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => onReorder(index, index - 1)}
              disabled={index === 0}
              aria-label="Move up"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md text-muted hover:text-foreground hover:bg-surface-warm disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset"
            >
              <span aria-hidden="true">↑</span>
            </button>
            <button
              type="button"
              onClick={() => onReorder(index, index + 1)}
              disabled={index === items.length - 1}
              aria-label="Move down"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md text-muted hover:text-foreground hover:bg-surface-warm disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset"
            >
              <span aria-hidden="true">↓</span>
            </button>
            <button
              type="button"
              onClick={() => onRemove(index)}
              aria-label={`Remove ${item}`}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md text-muted hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>
        </li>
      ))}
    </ol>
  );
}
