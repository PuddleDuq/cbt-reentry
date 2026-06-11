import { modules } from "@/data/modules";
import SkillDetailClient from "./skill-detail-client";

export function generateStaticParams() {
  return modules.map((m) => ({ id: m.id }));
}

export default function SkillDetailPage() {
  return <SkillDetailClient />;
}
