/**
 * ProgressBar — Server-compatible component showing goal completion percentage.
 * No "use client" needed — this is a pure presentational component with no interactivity.
 */

interface ProgressBarProps {
  /** Progress value from 0 to 100 */
  value: number;
  /** Optional accessible label for the progress bar */
  label?: string;
}

export function ProgressBar({ value, label }: ProgressBarProps) {
  // Clamp value between 0 and 100
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className="flex items-center gap-3">
      <div
        className="flex-1 h-2 bg-surface-warm rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Goal progress"}
      >
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${clamped}%` }}
        />
      </div>
      <span className="text-sm font-medium text-primary tabular-nums min-w-[3ch] text-right">
        {clamped}%
      </span>
    </div>
  );
}
