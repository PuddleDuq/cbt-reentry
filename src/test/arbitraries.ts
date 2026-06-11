import * as fc from "fast-check";
import type {
  CheckInEntry,
  ThoughtRecord,
  Goal,
  GoalStep,
  GoalCategory,
  CopingPlan,
  SupportContact,
  LessonProgress,
  ExerciseResponse,
  ExerciseType,
  RiskFactor,
  CognitiveDistortion,
} from "@/lib/types";

// --- Constants ---

const RISK_FACTORS: RiskFactor[] = [
  "isolation",
  "cravings",
  "conflict",
  "financial-stress",
  "boredom",
  "negative-self-talk",
  "sleep-problems",
  "anger",
];

const COGNITIVE_DISTORTIONS: CognitiveDistortion[] = [
  "all-or-nothing",
  "catastrophizing",
  "mind-reading",
  "labeling",
  "should-statements",
  "emotional-reasoning",
  "overgeneralization",
  "personalization",
];

const GOAL_CATEGORIES: GoalCategory[] = [
  "housing",
  "employment",
  "education",
  "relationships",
  "health",
  "legal",
  "financial",
  "personal-growth",
];

const EXERCISE_TYPES: ExerciseType[] = [
  "reflection",
  "multiple-choice",
  "fill-in",
  "scenario",
  "sorting",
  "checklist",
];

// --- Primitive Arbitraries ---

/** UUID v4 format string */
export const arbUuid = fc.uuid();

/** ISO 8601 datetime string */
export const arbIsoDatetime = fc.date().map((d) => d.toISOString());

/** Non-empty string with configurable max length */
export const arbNonEmptyString = (maxLength: number) =>
  fc.string({ minLength: 1, maxLength });

/** String with configurable length bounds */
export const arbString = (minLength: number, maxLength: number) =>
  fc.string({ minLength, maxLength });

/** Mood value 1-5 */
export const arbMood = fc.integer({ min: 1, max: 5 }) as fc.Arbitrary<
  1 | 2 | 3 | 4 | 5
>;

/** Intensity value 1-10 */
export const arbIntensity = fc.integer({ min: 1, max: 10 });

/** Subset of risk factors */
export const arbRiskFactors = fc.subarray(RISK_FACTORS, {
  minLength: 0,
  maxLength: RISK_FACTORS.length,
});

/** Subset of cognitive distortions (at least one) */
export const arbDistortions = fc.subarray(COGNITIVE_DISTORTIONS, {
  minLength: 1,
  maxLength: COGNITIVE_DISTORTIONS.length,
});

/** Goal category */
export const arbGoalCategory = fc.constantFrom(...GOAL_CATEGORIES);

/** Exercise type */
export const arbExerciseType = fc.constantFrom(...EXERCISE_TYPES);

// --- Data Model Arbitraries ---

/** Arbitrary for CheckInEntry */
export const arbCheckInEntry: fc.Arbitrary<CheckInEntry> = fc.record({
  id: arbUuid,
  timestamp: arbIsoDatetime,
  mood: arbMood,
  riskFactors: arbRiskFactors,
  gratitude: fc.string({ minLength: 0, maxLength: 500 }),
});

/** Arbitrary for ThoughtRecord */
export const arbThoughtRecord: fc.Arbitrary<ThoughtRecord> = fc.record({
  id: arbUuid,
  timestamp: arbIsoDatetime,
  situation: arbNonEmptyString(500),
  automaticThought: arbNonEmptyString(500),
  emotion: arbNonEmptyString(100),
  emotionIntensity: arbIntensity,
  distortions: arbDistortions,
  reframe: arbNonEmptyString(500),
  newIntensity: arbIntensity,
});

/** Arbitrary for GoalStep */
export const arbGoalStep: fc.Arbitrary<GoalStep> = fc.record({
  text: arbString(1, 200),
  completed: fc.boolean(),
});

/** Arbitrary for Goal */
export const arbGoal: fc.Arbitrary<Goal> = fc.record({
  id: arbUuid,
  createdAt: arbIsoDatetime,
  title: arbString(1, 100),
  category: arbGoalCategory,
  steps: fc.array(arbGoalStep, { minLength: 1, maxLength: 20 }),
});

/** Arbitrary for SupportContact */
export const arbSupportContact: fc.Arbitrary<SupportContact> = fc.record({
  name: arbString(1, 100),
  role: arbString(1, 50),
  phone: fc
    .tuple(
      fc.integer({ min: 200, max: 999 }),
      fc.integer({ min: 200, max: 999 }),
      fc.integer({ min: 1000, max: 9999 })
    )
    .map(([area, prefix, line]) => `${area}-${prefix}-${line}`),
});

/** Arbitrary for CopingPlan */
export const arbCopingPlan: fc.Arbitrary<CopingPlan> = fc.record({
  warningSignals: fc.array(arbString(1, 200), {
    minLength: 0,
    maxLength: 20,
  }),
  copingStrategies: fc.array(arbString(1, 200), {
    minLength: 0,
    maxLength: 20,
  }),
  supportContacts: fc.array(arbSupportContact, {
    minLength: 0,
    maxLength: 20,
  }),
  safeEnvironments: fc.array(arbString(1, 200), {
    minLength: 0,
    maxLength: 20,
  }),
  reasonsToStayCourse: fc.array(arbString(1, 200), {
    minLength: 0,
    maxLength: 20,
  }),
});

/** Arbitrary for ExerciseResponse */
export const arbExerciseResponse: fc.Arbitrary<ExerciseResponse> = fc.record({
  exerciseIndex: fc.integer({ min: 0, max: 10 }),
  type: arbExerciseType,
  response: fc.oneof(
    arbNonEmptyString(300),
    fc.array(arbNonEmptyString(100), { minLength: 1, maxLength: 5 })
  ),
  respondedAt: arbIsoDatetime,
});

/** Arbitrary for LessonProgress */
export const arbLessonProgress: fc.Arbitrary<LessonProgress> = fc.record({
  lessonId: fc
    .tuple(
      fc.constantFrom(
        "thinking-traps",
        "managing-triggers",
        "emotional-regulation",
        "problem-solving",
        "healthy-relationships",
        "building-your-future"
      ),
      fc.constantFrom(
        "lesson-1",
        "lesson-2",
        "lesson-3",
        "lesson-4",
        "lesson-5",
        "lesson-6"
      )
    )
    .map(([mod, lesson]) => `${mod}/${lesson}`),
  moduleId: fc.constantFrom(
    "thinking-traps",
    "managing-triggers",
    "emotional-regulation",
    "problem-solving",
    "healthy-relationships",
    "building-your-future"
  ),
  completedAt: arbIsoDatetime,
  exerciseResponses: fc.array(arbExerciseResponse, {
    minLength: 1,
    maxLength: 6,
  }),
});
