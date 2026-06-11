import { modules } from "@/data/modules";
import LessonDetailClient from "./lesson-detail-client";

export function generateStaticParams() {
  return modules.flatMap((m) =>
    m.lessons.map((l) => ({ id: m.id, lessonId: l.id }))
  );
}

export default function LessonDetailPage() {
  return <LessonDetailClient />;
}
