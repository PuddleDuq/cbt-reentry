"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { modules } from "@/data/modules";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { ProgressBar } from "@/components/progress-bar";

export default function SkillDetailClient() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { getModuleProgress, isLessonComplete } = useLessonProgress();

  const skillModule = modules.find((m) => m.id === id);

  if (!skillModule) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          Module not found
        </h2>
        <p className="text-muted">
          We couldn&apos;t find this skill module. It may have been moved or
          doesn&apos;t exist yet.
        </p>
        <Link
          href="/skills"
          className="inline-block mt-4 text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          ← Back to all skills
        </Link>
      </div>
    );
  }

  const moduleProgress = getModuleProgress(
    skillModule.id,
    skillModule.lessons.length
  );

  return (
    <div className="space-y-8">
      <Link
        href="/skills"
        className="text-sm text-muted hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        ← Back to all skills
      </Link>

      <header className="flex items-start gap-4">
        <span className="text-4xl" aria-hidden="true">
          {skillModule.icon}
        </span>
        <div>
          <h2 className="text-3xl font-semibold text-foreground tracking-tight">
            {skillModule.title}
          </h2>
          <p className="text-muted mt-2 leading-relaxed">{skillModule.intro}</p>
        </div>
      </header>

      {/* Module progress section */}
      <section aria-labelledby="module-progress-heading" className="space-y-2">
        <div className="flex items-center justify-between">
          <h3
            id="module-progress-heading"
            className="text-sm font-medium text-foreground"
          >
            Module Progress
          </h3>
          <span className="text-sm text-muted tabular-nums">
            {moduleProgress.completedLessons} of {moduleProgress.totalLessons}{" "}
            lessons complete
          </span>
        </div>
        <ProgressBar
          value={moduleProgress.percentComplete}
          label={`${skillModule.title} module progress`}
        />
      </section>

      {/* Lesson list */}
      <section aria-labelledby="lessons-heading">
        <h3
          id="lessons-heading"
          className="text-lg font-semibold text-foreground mb-4"
        >
          Lessons
        </h3>
        <ol className="space-y-3">
          {skillModule.lessons.map((lesson, i) => {
            const completed = isLessonComplete(skillModule.id, lesson.id);

            return (
              <li key={lesson.id}>
                <Link
                  href={`/skills/${skillModule.id}/lesson/${lesson.id}`}
                  className="block bg-surface rounded-xl border border-border p-5 hover:shadow-sm transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <div className="flex items-start gap-4">
                    {/* Sequence number */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 ${
                        completed
                          ? "bg-primary text-white"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {completed ? (
                        <span aria-label="Completed">✓</span>
                      ) : (
                        i + 1
                      )}
                    </div>

                    {/* Lesson info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-foreground">
                          {lesson.title}
                        </h4>
                        {/* Duration badge */}
                        <span className="text-xs text-muted bg-surface-warm px-2 py-0.5 rounded-full whitespace-nowrap tabular-nums">
                          ~{lesson.durationMinutes} min
                        </span>
                      </div>
                      <p className="text-sm text-muted mt-1 line-clamp-2">
                        {lesson.summary}
                      </p>
                    </div>

                    {/* Completion checkmark on the right */}
                    {completed && (
                      <span
                        className="text-primary font-bold text-lg flex-shrink-0"
                        aria-label="Lesson completed"
                      >
                        ✓
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
