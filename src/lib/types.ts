// ============================================================================
// ReFrame — Data Models and Type Definitions
// ============================================================================

// --- Union Types ---

export type RiskFactor =
  | "isolation"
  | "cravings"
  | "conflict"
  | "financial-stress"
  | "boredom"
  | "negative-self-talk"
  | "sleep-problems"
  | "anger";

export type CognitiveDistortion =
  | "all-or-nothing"
  | "catastrophizing"
  | "mind-reading"
  | "labeling"
  | "should-statements"
  | "emotional-reasoning"
  | "overgeneralization"
  | "personalization";

export type ThoughtRecordStep =
  | "situation"
  | "thought"
  | "distortion"
  | "reframe"
  | "complete";

export type GoalCategory =
  | "housing"
  | "employment"
  | "education"
  | "relationships"
  | "health"
  | "legal"
  | "financial"
  | "personal-growth";

export type CopingPlanSection = keyof CopingPlan;

export type ExerciseType =
  | "reflection"
  | "multiple-choice"
  | "fill-in"
  | "scenario"
  | "sorting"
  | "checklist";

// --- Core Data Models ---

export interface CheckInEntry {
  id: string;
  timestamp: string;
  mood: 1 | 2 | 3 | 4 | 5;
  riskFactors: RiskFactor[];
  gratitude: string;
}

export interface ThoughtRecord {
  id: string;
  timestamp: string;
  situation: string;
  automaticThought: string;
  emotion: string;
  emotionIntensity: number;
  distortions: CognitiveDistortion[];
  reframe: string;
  newIntensity: number;
}

export interface Goal {
  id: string;
  createdAt: string;
  title: string;
  category: GoalCategory;
  steps: GoalStep[];
}

export interface GoalStep {
  text: string;
  completed: boolean;
}

export interface CopingPlan {
  warningSignals: string[];
  copingStrategies: string[];
  supportContacts: SupportContact[];
  safeEnvironments: string[];
  reasonsToStayCourse: string[];
}

export interface SupportContact {
  name: string;
  role: string;
  phone: string;
}

// --- Skill Module & Lesson Content ---

export interface SkillModule {
  id: string;
  title: string;
  icon: string;
  category: string;
  description: string;
  intro: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  summary: string;
  durationMinutes: number;
  content: LessonContentBlock[];
}

export type LessonContentBlock =
  | { type: "text"; body: string }
  | { type: "example"; title: string; body: string }
  | { type: "tip"; body: string }
  | { type: "exercise"; exercise: Exercise }
  | { type: "key-point"; body: string };

// --- Exercise Types ---

export interface ReflectionExercise {
  type: "reflection";
  prompt: string;
  placeholder?: string;
  minLength?: number;
}

export interface MultipleChoiceExercise {
  type: "multiple-choice";
  question: string;
  options: { id: string; text: string; feedback: string }[];
  allowMultiple?: boolean;
}

export interface FillInExercise {
  type: "fill-in";
  prompt: string;
  hint?: string;
}

export interface ScenarioExercise {
  type: "scenario";
  scenario: string;
  question: string;
  guidedSteps: string[];
}

export interface SortingExercise {
  type: "sorting";
  instruction: string;
  items: { id: string; text: string; category: string }[];
  categories: string[];
}

export interface ChecklistExercise {
  type: "checklist";
  instruction: string;
  items: { id: string; text: string }[];
}

export type Exercise =
  | ReflectionExercise
  | MultipleChoiceExercise
  | FillInExercise
  | ScenarioExercise
  | SortingExercise
  | ChecklistExercise;

// --- Lesson Progress Tracking ---

export interface LessonProgress {
  lessonId: string;
  moduleId: string;
  completedAt: string;
  exerciseResponses: ExerciseResponse[];
}

export interface ExerciseResponse {
  exerciseIndex: number;
  type: ExerciseType;
  response: string | string[];
  respondedAt: string;
}

export interface ModuleProgress {
  moduleId: string;
  completedLessons: number;
  totalLessons: number;
  percentComplete: number;
}

// --- Result Type and Error Handling ---

export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

export type StorageError =
  | { type: "QUOTA_EXCEEDED"; message: string }
  | { type: "PARSE_ERROR"; message: string }
  | { type: "UNAVAILABLE"; message: string };

// --- Storage Constants ---

export const STORAGE_KEYS = {
  CHECK_INS: "reframe:check-ins",
  THOUGHT_RECORDS: "reframe:thought-records",
  GOALS: "reframe:goals",
  COPING_PLAN: "reframe:coping-plan",
  LESSON_PROGRESS: "reframe:lesson-progress",
  SCHEMA_VERSION: "reframe:schema-version",
} as const;

export const CURRENT_SCHEMA_VERSION = 2;
