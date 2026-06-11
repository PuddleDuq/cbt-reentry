import { Suspense } from "react";
import dynamic from "next/dynamic";
import { StepIndicatorSkeleton } from "@/components/step-indicator-skeleton";

const ThoughtRecordForm = dynamic(
  () => import("@/components/thought-record-form"),
  {
    loading: () => <StepIndicatorSkeleton />,
  }
);

export default function ThoughtRecordPage() {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-semibold text-foreground tracking-tight">
          Thought Record
        </h2>
        <p className="text-muted mt-2">
          Walk through a situation step by step to understand and reshape your thinking.
        </p>
      </header>

      <Suspense fallback={<StepIndicatorSkeleton />}>
        <ThoughtRecordForm />
      </Suspense>
    </div>
  );
}
