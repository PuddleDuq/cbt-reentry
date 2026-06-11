"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import type { LessonContentBlock, ExerciseResponse, ExerciseType } from "@/lib/types";
import { TextBlock } from "./text-block";
import { ExampleBlock } from "./example-block";
import { TipBlock } from "./tip-block";
import { KeyPointBlock } from "./key-point-block";

const ExerciseBlock = dynamic(
  () => import("@/components/exercises/exercise-block"),
  { loading: () => <ExerciseBlockSkeleton /> }
);

function ExerciseBlockSkeleton() {
  return (
    <div className="bg-surface-warm rounded-lg p-6 animate-pulse">
      <div className="h-4 bg-border rounded w-3/4 mb-3" />
      <div className="h-4 bg-border rounded w-1/2" />
    </div>
  );
}

interface LessonContentProps {
  content: LessonContentBlock[];
  onExerciseResponse?: (index: number, response: ExerciseResponse) => void;
}

export function LessonContent({ content, onExerciseResponse }: LessonContentProps) {
  const [attemptedExercises, setAttemptedExercises] = useState<Set<number>>(
    () => new Set()
  );

  const handleExerciseResponse = useCallback(
    (index: number, response: ExerciseResponse) => {
      setAttemptedExercises((prev) => {
        const next = new Set(prev);
        next.add(index);
        return next;
      });
      onExerciseResponse?.(index, response);
    },
    [onExerciseResponse]
  );

  return (
    <div className="space-y-6">
      {content.map((block, index) => {
        switch (block.type) {
          case "text":
            return <TextBlock key={index} body={block.body} />;
          case "example":
            return (
              <ExampleBlock key={index} title={block.title} body={block.body} />
            );
          case "tip":
            return <TipBlock key={index} body={block.body} />;
          case "key-point":
            return <KeyPointBlock key={index} body={block.body} />;
          case "exercise":
            return (
              <ExerciseBlock
                key={index}
                exercise={block.exercise}
                onResponse={(response: string | string[]) =>
                  handleExerciseResponse(index, {
                    exerciseIndex: index,
                    type: block.exercise.type as ExerciseType,
                    response,
                    respondedAt: new Date().toISOString(),
                  })
                }
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
