"use client";

import Link from "next/link";
import { modules } from "@/data/modules";
import { useLessonProgress } from "@/hooks/useLessonProgress";

const features = [
  {
    href: "/check-in",
    title: "Check-In",
    description: "How are you feeling today?",
    icon: "📋",
  },
  {
    href: "/thought-record",
    title: "Thought Record",
    description: "Reshape unhelpful thoughts",
    icon: "💭",
  },
  {
    href: "/skills",
    title: "Skills",
    description: "Learn CBT tools at your pace",
    icon: "🧠",
  },
  {
    href: "/goals",
    title: "Goals",
    description: "Track your reentry goals",
    icon: "🎯",
  },
  {
    href: "/coping-plan",
    title: "Coping Plan",
    description: "Your personal safety net",
    icon: "🛡️",
  },
];

export default function HomePage() {
  const { getModuleProgress } = useLessonProgress();

  const moduleProgressList = modules.map((mod) =>
    getModuleProgress(mod.id, mod.lessons.length)
  );

  const hasAnyProgress = moduleProgressList.some(
    (mp) => mp.percentComplete > 0
  );

  return (
    <div className="space-y-10">
      <header>
        <h2 className="text-3xl font-semibold text-foreground tracking-tight">
          Welcome to ReFrame
        </h2>
        <p className="text-muted mt-2 text-lg">
          A companion for your journey — one step, one thought, one day at a
          time.
        </p>
      </header>

      <section aria-labelledby="features-heading">
        <h3 id="features-heading" className="sr-only">
          Core features
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="block bg-surface rounded-xl border border-border p-6 hover:shadow-md hover:border-primary-light transition-all focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 group min-h-[44px]"
            >
              <span className="text-3xl" aria-hidden="true">
                {feature.icon}
              </span>
              <h4 className="mt-3 font-semibold text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h4>
              <p className="mt-1 text-sm text-muted leading-relaxed">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="growth-heading"
        className="bg-surface rounded-xl border border-border p-6"
      >
        <h3
          id="growth-heading"
          className="text-lg font-semibold text-foreground"
        >
          Your Growth Path
        </h3>
        <p className="text-sm text-muted mt-1 mb-6">
          Track your progress across CBT skills
        </p>

        {hasAnyProgress ? (
          <div className="space-y-4" role="list" aria-label="Module progress">
            {moduleProgressList.map((mp) => {
              const mod = modules.find((m) => m.id === mp.moduleId);
              if (!mod) return null;
              return (
                <div key={mp.moduleId} role="listitem">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">
                      <span aria-hidden="true">{mod.icon} </span>
                      {mod.title}
                    </span>
                    <span className="text-xs text-muted tabular-nums">
                      {mp.completedLessons}/{mp.totalLessons} lessons
                    </span>
                  </div>
                  <div
                    className="h-2 w-full rounded-full bg-surface-warm overflow-hidden"
                    role="progressbar"
                    aria-valuenow={mp.percentComplete}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${mod.title} progress`}
                  >
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${mp.percentComplete}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted text-sm">
              You haven&apos;t started any lessons yet — that&apos;s okay.
            </p>
            <p className="text-muted text-sm mt-1">
              When you&apos;re ready,{" "}
              <Link
                href="/skills"
                className="text-primary underline underline-offset-2 hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
              >
                explore the skills modules
              </Link>{" "}
              and your progress will show up here.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
