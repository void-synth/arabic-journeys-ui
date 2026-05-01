import { readStoredJSON, writeStoredJSON } from "@/lib/localStorageJson";

export type OnboardingStatus = "not_started" | "in_progress" | "completed";

export type ArabicLevel = "beginner" | "intermediate" | "advanced";
export type PrimaryGoal = "conversation" | "quran_classical" | "academic" | "exam_prep" | "heritage_reconnection";
export type WeeklyAvailability = "weekdays" | "weeknights" | "weekends" | "mixed";
export type LearningMode = "live_classes" | "self_study" | "blended";
export type ScriptConfidence = "needs_support" | "comfortable_reading" | "strong_read_write";
export type DialectInterest = "msa_only" | "msa_plus_dialect";

export type EnrollmentSource = "self_serve" | "rostered" | "unknown";
export type OnboardingTrack = "full" | "short";

export interface StudentOnboardingProfile {
  level: ArabicLevel | null;
  goal: PrimaryGoal | null;
  availability: WeeklyAvailability | null;
  learningMode: LearningMode | null;
  scriptConfidence: ScriptConfidence | null;
  dialectInterest: DialectInterest | null;
  notes: string;
}

export interface StudentOnboardingState {
  status: OnboardingStatus;
  currentStep: number;
  profile: StudentOnboardingProfile;
  updatedAt: string | null;
  enrollmentSource: EnrollmentSource;
  onboardingTrack: OnboardingTrack;
}

const ONBOARDING_STORAGE_PREFIX = "neoarabi_student_onboarding_v1";

/** Full path: step 0 path/welcome, 1 level+goal, 2 routine, 3 script+dialect. */
export const STUDENT_ONBOARDING_STEPS_FULL = 4;
/** Short (rostered): step 0 path/welcome, 1 level+goal+routine combined. */
export const STUDENT_ONBOARDING_STEPS_SHORT = 2;

/** @deprecated Use STUDENT_ONBOARDING_STEPS_FULL or getTotalOnboardingSteps */
export const STUDENT_ONBOARDING_STEPS = STUDENT_ONBOARDING_STEPS_FULL;

const defaultProfile: StudentOnboardingProfile = {
  level: null,
  goal: null,
  availability: null,
  learningMode: null,
  scriptConfidence: null,
  dialectInterest: null,
  notes: "",
};

const defaultState: StudentOnboardingState = {
  status: "not_started",
  currentStep: 0,
  profile: defaultProfile,
  updatedAt: null,
  enrollmentSource: "unknown",
  onboardingTrack: "full",
};

function onboardingKey(userId: string) {
  return `${ONBOARDING_STORAGE_PREFIX}:${userId}`;
}

function normalizeState(raw: StudentOnboardingState): StudentOnboardingState {
  const enrollmentSource: EnrollmentSource =
    raw.enrollmentSource && raw.enrollmentSource !== "unknown"
      ? raw.enrollmentSource
      : raw.status === "not_started"
        ? "unknown"
        : "self_serve";

  const onboardingTrack: OnboardingTrack =
    raw.onboardingTrack === "short" ? "short" : "full";

  return {
    ...raw,
    enrollmentSource,
    onboardingTrack,
    profile: {
      ...defaultProfile,
      ...raw.profile,
    },
  };
}

export function getTotalOnboardingSteps(state: Pick<StudentOnboardingState, "onboardingTrack" | "enrollmentSource">) {
  if (state.enrollmentSource === "unknown") return STUDENT_ONBOARDING_STEPS_FULL;
  return state.onboardingTrack === "short" ? STUDENT_ONBOARDING_STEPS_SHORT : STUDENT_ONBOARDING_STEPS_FULL;
}

export function readStudentOnboarding(userId: string): StudentOnboardingState {
  const raw = readStoredJSON(onboardingKey(userId), defaultState) as StudentOnboardingState;
  return normalizeState({
    ...defaultState,
    ...raw,
    profile: { ...defaultProfile, ...raw.profile },
  });
}

export function saveStudentOnboarding(userId: string, patch: Partial<StudentOnboardingState>) {
  const current = readStudentOnboarding(userId);
  const merged: StudentOnboardingState = {
    ...current,
    ...patch,
    profile: {
      ...current.profile,
      ...(patch.profile ?? {}),
    },
    updatedAt: new Date().toISOString(),
  };
  writeStoredJSON(onboardingKey(userId), merged);
  return merged;
}

function lastStepIndex(track: OnboardingTrack) {
  return track === "short" ? STUDENT_ONBOARDING_STEPS_SHORT - 1 : STUDENT_ONBOARDING_STEPS_FULL - 1;
}

/** Defaults for profile fields not collected on the short track. */
const shortTrackProfileDefaults: Partial<StudentOnboardingProfile> = {
  scriptConfidence: "comfortable_reading",
  dialectInterest: "msa_only",
};

export function completeStudentOnboarding(userId: string, profile: StudentOnboardingProfile, track: OnboardingTrack) {
  const mergedProfile =
    track === "short"
      ? {
          ...profile,
          scriptConfidence: profile.scriptConfidence ?? shortTrackProfileDefaults.scriptConfidence!,
          dialectInterest: profile.dialectInterest ?? shortTrackProfileDefaults.dialectInterest!,
        }
      : profile;
  return saveStudentOnboarding(userId, {
    status: "completed",
    currentStep: lastStepIndex(track),
    profile: mergedProfile,
  });
}

export function isStudentOnboardingComplete(userId: string | null) {
  if (!userId) return false;
  return readStudentOnboarding(userId).status === "completed";
}

export const studentOnboardingQuestionOptions = {
  level: [
    { value: "beginner", label: "Beginner", hint: "I need strong foundations." },
    { value: "intermediate", label: "Intermediate", hint: "I can read/speak some Arabic." },
    { value: "advanced", label: "Advanced", hint: "I want refinement and fluency." },
  ],
  goal: [
    { value: "conversation", label: "Conversation fluency" },
    { value: "quran_classical", label: "Quran and classical reading" },
    { value: "academic", label: "Academic or school Arabic" },
    { value: "exam_prep", label: "Exam preparation" },
    { value: "heritage_reconnection", label: "Heritage reconnection" },
  ],
  availability: [
    { value: "weekdays", label: "Weekday daytime" },
    { value: "weeknights", label: "Weekday evenings" },
    { value: "weekends", label: "Weekends" },
    { value: "mixed", label: "Flexible / mixed" },
  ],
  learningMode: [
    { value: "live_classes", label: "Live classes" },
    { value: "self_study", label: "Self-study first" },
    { value: "blended", label: "Blended (live + self-study)" },
  ],
  scriptConfidence: [
    { value: "needs_support", label: "I need support with script and vowels" },
    { value: "comfortable_reading", label: "Comfortable reading with some support" },
    { value: "strong_read_write", label: "Strong reading and writing confidence" },
  ],
  dialectInterest: [
    { value: "msa_only", label: "MSA only for now" },
    { value: "msa_plus_dialect", label: "MSA + dialect exposure" },
  ],
} as const;
