"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { modules } from "@/data/modules";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { LessonContent } from "@/components/lessons/lesson-content";
import type { ExerciseResponse } from "@/lib/types";

export default function LessonDetailClient() {
  const params = useParams<{ id: string; lessonId: string }>();
  const router = useRouter();
  const moduleId = params.id;
  const lessonId = params.lessonId;

  const { isLessonComplete, markLessonComplete } = useLessonProgress();

  // Find module and lesson
  const skillModule = modules.find((m) => m.id === moduleId);
  const lesson = skillModule?.lessons.find((l) => l.id === lessonId);

  // Track scroll completion
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Track exercise responses
  const [exerciseResponses, setExerciseResponses] = useState<ExerciseResponse[]>([]);
  const exerciseAttemptCount = exerciseResponses.length;

  // Track scroll progress for the sticky bar
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Check if lesson is already complete
  const alreadyComplete = skillModule && lesson
    ? isLessonComplete(moduleId, lessonId)
    : false;

  // Determine if the mark complete button should be enabled
  const canComplete = hasScrolledToBottom && exerciseAttemptCount >= 1 && !alreadyComplete;

  // IntersectionObserver to detect when user scrolls to bottom sentinel
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasScrolledToBottom(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Scroll progress tracking
  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setScrollProgress(100);
        return;
      }
      const progress = Math.min(100, Math.round((scrollTop / docHeight) * 100));
      setScrollProgress(progress);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle exercise responses
  const handleExerciseResponse = useCallback(
    (_index: number, response: ExerciseResponse) => {
      setExerciseResponses((prev) => {
        // Replace if same exercise index, otherwise add
        const existing = prev.findIndex(
          (r) => r.exerciseIndex === response.exerciseIndex
        );
        if (existing >= 0) {
          const updated = [...prev];
          updated[existing] = response;
          return updated;
        }
        return [...prev, response];
      });
    },
    []
  );

  // Handle mark complete
  const handleComplete = useCallback(() => {
    if (!canComplete) return;

    const result = markLessonComplete(moduleId, lessonId, exerciseResponses);
    if (result.ok) {
      router.push(`/skills/${moduleId}`);
    }
  }, [canComplete, markLessonComplete, moduleId, lessonId, exerciseResponses, router]);

  // Not found state
  if (!skillModule || !lesson) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          Lesson not found
        </h2>
        <p className="text-muted">
          We couldn&apos;t find this lesson. It may have been moved or
          doesn&apos;t exist yet.
        </p>
        <Link
          href={skillModule ? `/skills/${moduleId}` : "/skills"}
          className="inline-block mt-4 text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          ← Back to {skillModule ? skillModule.title : "all skills"}
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Sticky scroll progress indicator */}
      <div
        className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border"
        role="progressbar"
        aria-valuenow={scrollProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Lesson reading progress"
      >
        <div
          className="h-1 bg-primary transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Lesson header */}
      <header className="pt-6 pb-4 space-y-3">
        <Link
          href={`/skills/${moduleId}`}
          className="text-sm text-muted hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          ← Back to {skillModule.title}
        </Link>

        <div className="flex items-start justify-between gap-3">
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">
            {lesson.title}
          </h1>
          <span className="text-xs text-muted bg-surface-warm px-2.5 py-1 rounded-full whitespace-nowrap tabular-nums flex-shrink-0">
            ~{lesson.durationMinutes} min
          </span>
        </div>

        {alreadyComplete && (
          <div className="inline-flex items-center gap-1.5 text-sm text-primary bg-primary/10 px-3 py-1.5 rounded-full">
            <span aria-hidden="true">✓</span>
            <span>Lesson completed</span>
          </div>
        )}
      </header>

      {/* Lesson content */}
      <div ref={contentRef} className="pb-8">
        <LessonContent
          content={lesson.content}
          onExerciseResponse={handleExerciseResponse}
        />
      </div>

      {/* Bottom sentinel for scroll detection */}
      <div ref={sentinelRef} className="h-1" aria-hidden="true" />

      {/* Mark Complete section */}
      {!alreadyComplete && (
        <div className="py-8 border-t border-border">
          <div className="space-y-3 text-center">
            {!hasScrolledToBottom && (
              <p className="text-sm text-muted">
                Scroll through all the content to unlock completion.
              </p>
            )}
            {hasScrolledToBottom && exerciseAttemptCount < 1 && (
              <p className="text-sm text-muted">
                Try at least one exercise above to mark this lesson complete.
              </p>
            )}
            <button
              onClick={handleComplete}
              disabled={!canComplete}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-primary hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary touch-action-manipulation min-h-[44px] min-w-[44px]"
              aria-label="Mark lesson as complete"
            >
              <span aria-hidden="true">✓</span>
              Mark Complete
            </button>
          </div>
        </div>
      )}

      {/* Already complete — review mode */}
      {alreadyComplete && (
        <div className="py-8 border-t border-border text-center">
          <p className="text-sm text-muted mb-3">
            You&apos;ve already completed this lesson. Feel free to review the content anytime.
          </p>
          <Link
            href={`/skills/${moduleId}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-primary border border-primary/30 hover:bg-primary/5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary min-h-[44px]"
          >
            ← Back to module
          </Link>
        </div>
      )}
    </div>
  );
}
