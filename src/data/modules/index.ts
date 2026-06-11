import type { SkillModule } from "@/lib/types";
import { thinkingTraps } from "./thinking-traps";
import { managingTriggers } from "./managing-triggers";
import { emotionalRegulation } from "./emotional-regulation";
import { problemSolving } from "./problem-solving";
import { healthyRelationships } from "./healthy-relationships";
import { buildingYourFuture } from "./building-your-future";

export const modules: SkillModule[] = [
  thinkingTraps,
  managingTriggers,
  emotionalRegulation,
  problemSolving,
  healthyRelationships,
  buildingYourFuture,
];
