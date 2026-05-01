import type { PrimaryGoal, ArabicLevel, WeeklyAvailability, LearningMode, ScriptConfidence, StudentOnboardingProfile } from "@/lib/studentOnboarding";

export function buildTrackSummary(goal: PrimaryGoal | null, level: ArabicLevel | null) {
  const levelLabel =
    level === "beginner" ? "Beginner track." : level === "intermediate" ? "Intermediate track." : level === "advanced" ? "Advanced track." : "";
  const goalLabel =
    goal === "conversation"
      ? "Conversation-first focus."
      : goal === "quran_classical"
        ? "Quran and classical reading focus."
        : goal === "academic"
          ? "Academic Arabic focus."
          : goal === "exam_prep"
            ? "Exam preparation focus."
            : goal === "heritage_reconnection"
              ? "Heritage reconnection focus."
              : "";
  return `${levelLabel} ${goalLabel}`.trim();
}

export function buildDailyCue(profile: Pick<StudentOnboardingProfile, "goal" | "scriptConfidence" | "availability" | "learningMode">) {
  const { goal, scriptConfidence, availability, learningMode } = profile;
  if (learningMode === "live_classes") {
    return "Live-class rhythm: skim the session title the night before, then join two minutes early to settle audio.";
  }
  if (learningMode === "self_study") {
    return "Self-study rhythm: pick one 15-minute block, one short text, and stop while you still want more.";
  }
  if (availability === "weekends") {
    return "You prefer weekends—stack a light review on Thursday so Friday classes feel easier.";
  }
  if (availability === "weeknights") {
    return "Evening learner: keep sessions to one clear outcome (listening or reading), not both, on busy nights.";
  }
  if (goal === "conversation") return "Daily cue: do a 5-minute speaking warm-up, then review one dialogue line aloud twice.";
  if (goal === "quran_classical") return "Daily cue: read 5-7 lines with careful vowel tracking, then write two root-pattern notes.";
  if (goal === "academic") return "Daily cue: summarize one paragraph in Arabic, then check key grammar endings.";
  if (goal === "exam_prep") return "Daily cue: complete one timed mini-section, then review your two weakest items.";
  if (scriptConfidence === "needs_support") return "Daily cue: practice short words with harakat and rewrite three words by hand.";
  return "Daily cue: keep your warm-up short: read a paragraph aloud, then write three new words with vowels.";
}

export function buildSessionsPageHint(profile: StudentOnboardingProfile | null, onboardingComplete: boolean) {
  if (!onboardingComplete || !profile) {
    return "Complete onboarding so we can tailor reminders to your goals and schedule.";
  }
  if (profile.scriptConfidence === "needs_support") {
    return "Tip: ask your teacher for vowelled readings when new vocabulary appears—small supports keep momentum.";
  }
  if (profile.goal === "quran_classical") {
    return "Tip: pair each session with five minutes of slow recitation review the same evening.";
  }
  if (profile.learningMode === "blended") {
    return "Tip: use live classes for speaking, and the day after for ten minutes of written follow-up.";
  }
  return "Tip: open each session detail the day before class so links and times are already familiar.";
}
