import Link from "next/link";
import { modules } from "@/data/modules";

export default function SkillsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-semibold text-foreground tracking-tight">
          CBT Skills
        </h2>
        <p className="text-muted mt-2">
          Learn practical tools at your own pace. Each module builds skills you
          can use every day.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((module) => (
          <Link
            key={module.id}
            href={`/skills/${module.id}`}
            className="block bg-surface rounded-xl border border-border p-6 hover:shadow-md hover:border-primary-light transition-all focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 group"
          >
            <div className="flex items-start justify-between">
              <span className="text-3xl" aria-hidden="true">
                {module.icon}
              </span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-surface-warm text-muted">
                {module.category}
              </span>
            </div>
            <h3 className="mt-4 font-semibold text-foreground group-hover:text-primary transition-colors">
              {module.title}
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {module.description}
            </p>
            <p className="mt-4 text-xs text-muted tabular-nums">
              {module.lessons.length} lessons &middot;{" "}
              {getTotalDuration(module.lessons)} min
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function getTotalDuration(lessons: { durationMinutes: number }[]): number {
  return lessons.reduce((sum, lesson) => sum + lesson.durationMinutes, 0);
}
