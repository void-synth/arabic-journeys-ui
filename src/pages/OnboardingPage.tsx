import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, BookOpen, GraduationCap, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import { logEvent } from "@/lib/analytics";
import { syncStudentOnboardingToSupabase } from "@/lib/studentOnboardingSync";
import {
  completeStudentOnboarding,
  getTotalOnboardingSteps,
  readStudentOnboarding,
  saveStudentOnboarding,
  studentOnboardingQuestionOptions,
  type EnrollmentSource,
  type OnboardingTrack,
  type StudentOnboardingProfile,
  type StudentOnboardingState,
} from "@/lib/studentOnboarding";
import { cn } from "@/lib/utils";

export default function OnboardingPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [state, setState] = useState<StudentOnboardingState | null>(null);
  const [error, setError] = useState("");
  const startedLogged = useRef(false);

  useEffect(() => {
    if (!auth.isReady) return;
    if (!auth.isAuthenticated || !auth.role || !auth.userId) {
      navigate("/login");
      return;
    }
    if (auth.role === "teacher") {
      navigate("/teacher/dashboard");
      return;
    }
    if (auth.role === "admin") {
      navigate("/admin/dashboard");
      return;
    }
    let initial = readStudentOnboarding(auth.userId);
    const trackParam = searchParams.get("track");
    if (initial.status === "not_started" && initial.enrollmentSource === "unknown") {
      if (trackParam === "short") {
        initial = saveStudentOnboarding(auth.userId, { enrollmentSource: "rostered", onboardingTrack: "short" });
      } else if (trackParam === "full") {
        initial = saveStudentOnboarding(auth.userId, { enrollmentSource: "self_serve", onboardingTrack: "full" });
      }
    }
    setState(initial);
  }, [auth.isAuthenticated, auth.isReady, auth.role, auth.userId, navigate, searchParams]);

  useEffect(() => {
    if (!state || state.status !== "completed") return;
    navigate("/student/dashboard");
  }, [state, navigate]);

  useEffect(() => {
    if (!state || state.status === "completed" || !auth.userId) return;
    if (startedLogged.current) return;
    startedLogged.current = true;
    logEvent("onboarding_started", { track: state.onboardingTrack, source: state.enrollmentSource });
  }, [state, auth.userId]);

  const totalSteps = state ? getTotalOnboardingSteps(state) : 1;

  const progress = useMemo(() => {
    if (!state) return 0;
    return ((state.currentStep + 1) / totalSteps) * 100;
  }, [state, totalSteps]);

  function updateState(patch: Partial<StudentOnboardingState>) {
    if (!auth.userId || !state) return;
    const next = saveStudentOnboarding(auth.userId, patch);
    setState(next);
  }

  function updateProfile(patch: Partial<StudentOnboardingProfile>) {
    if (!state) return;
    updateState({ profile: { ...state.profile, ...patch } });
  }

  function setEnrollmentPath(source: EnrollmentSource, track: OnboardingTrack) {
    updateState({ enrollmentSource: source, onboardingTrack: track });
  }

  function validateStep(step: number, s: StudentOnboardingState) {
    if (step === 0) return s.enrollmentSource !== "unknown";
    const short = s.onboardingTrack === "short";
    if (short && step === 1) {
      return Boolean(
        s.profile.level && s.profile.goal && s.profile.availability && s.profile.learningMode
      );
    }
    if (step === 1) return Boolean(s.profile.level && s.profile.goal);
    if (step === 2) return Boolean(s.profile.availability && s.profile.learningMode);
    if (step === 3) return Boolean(s.profile.scriptConfidence && s.profile.dialectInterest);
    return true;
  }

  async function handleNext() {
    if (!state || !auth.userId) return;
    setError("");
    if (!validateStep(state.currentStep, state)) {
      setError("Please answer the required questions before continuing.");
      return;
    }

    const total = getTotalOnboardingSteps(state);
    const isLast = state.currentStep >= total - 1;

    if (isLast) {
      const final = completeStudentOnboarding(auth.userId, state.profile, state.onboardingTrack);
      setState(final);
      logEvent("onboarding_step_completed", { step: state.currentStep, track: state.onboardingTrack });
      logEvent("onboarding_completed", { track: state.onboardingTrack, source: state.enrollmentSource });
      await syncStudentOnboardingToSupabase(auth.userId, final);
      navigate("/student/dashboard");
      return;
    }

    logEvent("onboarding_step_completed", { step: state.currentStep, track: state.onboardingTrack });
    updateState({
      status: "in_progress",
      currentStep: Math.min(state.currentStep + 1, total - 1),
    });
  }

  function handleBack() {
    if (!state) return;
    setError("");
    updateState({ currentStep: Math.max(state.currentStep - 1, 0) });
  }

  if (!state) return null;

  const isShort = state.onboardingTrack === "short";
  const isLastStep = state.currentStep >= totalSteps - 1;

  return (
    <div className="flex min-h-screen items-center justify-center mesh-bg-public px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="surface-panel space-y-6 rounded-3xl p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/15">
                <BookOpen className="h-5 w-5 text-primary" />
              </span>
              <span className="font-display text-xl font-semibold tracking-tight text-foreground">ArabicLearn</span>
            </Link>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/60">
              Step {state.currentStep + 1} of {totalSteps}
            </p>
          </div>

          <Progress value={progress} className="h-2" />

          <div className="space-y-4">
            {state.currentStep === 0 ? (
              <div className="space-y-5">
                <div className="space-y-3">
                  <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    Let&apos;s personalize your Arabic journey.
                  </h1>
                  <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    Choose how you joined ArabicLearn. We will ask a few questions—fewer if your teacher or school already enrolled you.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setEnrollmentPath("self_serve", "full")}
                    className={cn(
                      "rounded-2xl border px-4 py-4 text-left transition-colors",
                      state.enrollmentSource === "self_serve"
                        ? "border-primary/45 bg-primary/10 text-foreground"
                        : "border-[hsl(160_25%_28%/0.16)] bg-[hsl(42_40%_99%/0.65)] text-foreground/80 hover:bg-[hsl(42_40%_99%/0.82)]"
                    )}
                  >
                    <UserRound className="mb-2 h-5 w-5 text-primary" aria-hidden />
                    <p className="text-sm font-semibold">I&apos;m enrolling myself</p>
                    <p className="mt-1 text-xs text-foreground/65">A short questionnaire tailors your dashboard.</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEnrollmentPath("rostered", "short")}
                    className={cn(
                      "rounded-2xl border px-4 py-4 text-left transition-colors",
                      state.enrollmentSource === "rostered"
                        ? "border-primary/45 bg-primary/10 text-foreground"
                        : "border-[hsl(160_25%_28%/0.16)] bg-[hsl(42_40%_99%/0.65)] text-foreground/80 hover:bg-[hsl(42_40%_99%/0.82)]"
                    )}
                  >
                    <GraduationCap className="mb-2 h-5 w-5 text-primary" aria-hidden />
                    <p className="text-sm font-semibold">My class or school added me</p>
                    <p className="mt-1 text-xs text-foreground/65">Quick essentials only—your teacher already knows the program.</p>
                  </button>
                </div>
              </div>
            ) : null}

            {state.currentStep === 1 && isShort ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="font-display text-2xl text-foreground">Quick profile</h2>
                  <p className="text-sm text-muted-foreground">So your dashboard matches your level and schedule.</p>
                </div>
                <QuestionGroup
                  label="Current Arabic level"
                  options={studentOnboardingQuestionOptions.level}
                  selected={state.profile.level}
                  onSelect={(value) => updateProfile({ level: value as StudentOnboardingProfile["level"] })}
                />
                <QuestionGroup
                  label="Primary goal"
                  options={studentOnboardingQuestionOptions.goal}
                  selected={state.profile.goal}
                  onSelect={(value) => updateProfile({ goal: value as StudentOnboardingProfile["goal"] })}
                />
                <QuestionGroup
                  label="Weekly availability"
                  options={studentOnboardingQuestionOptions.availability}
                  selected={state.profile.availability}
                  onSelect={(value) => updateProfile({ availability: value as StudentOnboardingProfile["availability"] })}
                />
                <QuestionGroup
                  label="Preferred learning mode"
                  options={studentOnboardingQuestionOptions.learningMode}
                  selected={state.profile.learningMode}
                  onSelect={(value) => updateProfile({ learningMode: value as StudentOnboardingProfile["learningMode"] })}
                />
              </div>
            ) : null}

            {state.currentStep === 1 && !isShort ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="font-display text-2xl text-foreground">Your level and goal</h2>
                  <p className="text-sm text-muted-foreground">Help us place you in the right track from day one.</p>
                </div>
                <QuestionGroup
                  label="Current Arabic level"
                  options={studentOnboardingQuestionOptions.level}
                  selected={state.profile.level}
                  onSelect={(value) => updateProfile({ level: value as StudentOnboardingProfile["level"] })}
                />
                <QuestionGroup
                  label="Primary goal"
                  options={studentOnboardingQuestionOptions.goal}
                  selected={state.profile.goal}
                  onSelect={(value) => updateProfile({ goal: value as StudentOnboardingProfile["goal"] })}
                />
              </div>
            ) : null}

            {state.currentStep === 2 && !isShort ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="font-display text-2xl text-foreground">Your weekly routine</h2>
                  <p className="text-sm text-muted-foreground">We will adapt suggestions to your real schedule.</p>
                </div>
                <QuestionGroup
                  label="Weekly availability"
                  options={studentOnboardingQuestionOptions.availability}
                  selected={state.profile.availability}
                  onSelect={(value) => updateProfile({ availability: value as StudentOnboardingProfile["availability"] })}
                />
                <QuestionGroup
                  label="Preferred learning mode"
                  options={studentOnboardingQuestionOptions.learningMode}
                  selected={state.profile.learningMode}
                  onSelect={(value) => updateProfile({ learningMode: value as StudentOnboardingProfile["learningMode"] })}
                />
              </div>
            ) : null}

            {state.currentStep === 3 && !isShort ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="font-display text-2xl text-foreground">Script and language preferences</h2>
                  <p className="text-sm text-muted-foreground">This helps us tune pacing and practice recommendations.</p>
                </div>
                <QuestionGroup
                  label="Script confidence"
                  options={studentOnboardingQuestionOptions.scriptConfidence}
                  selected={state.profile.scriptConfidence}
                  onSelect={(value) => updateProfile({ scriptConfidence: value as StudentOnboardingProfile["scriptConfidence"] })}
                />
                <QuestionGroup
                  label="Dialect interest"
                  options={studentOnboardingQuestionOptions.dialectInterest}
                  selected={state.profile.dialectInterest}
                  onSelect={(value) => updateProfile({ dialectInterest: value as StudentOnboardingProfile["dialectInterest"] })}
                />
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Anything else we should know? (optional)</p>
                  <Input
                    value={state.profile.notes}
                    onChange={(event) => updateProfile({ notes: event.target.value })}
                    placeholder="Example: I can study 30 minutes before Fajr on weekdays."
                    className="h-11"
                  />
                </div>
              </div>
            ) : null}
          </div>

          {error ? <p className="text-sm text-rose-600">{error}</p> : null}

          <div className="flex items-center justify-between gap-3 pt-2">
            <Button type="button" variant="outline" onClick={handleBack} disabled={state.currentStep === 0}>
              Back
            </Button>
            <Button type="button" onClick={() => void handleNext()}>
              {isLastStep ? "Finish onboarding" : "Continue"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuestionGroup({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: ReadonlyArray<{ value: string; label: string; hint?: string }>;
  selected: string | null;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className={cn(
              "rounded-2xl border px-4 py-3 text-left transition-colors",
              selected === option.value
                ? "border-primary/45 bg-primary/10 text-foreground"
                : "border-[hsl(160_25%_28%/0.16)] bg-[hsl(42_40%_99%/0.65)] text-foreground/80 hover:bg-[hsl(42_40%_99%/0.82)]"
            )}
          >
            <p className="text-sm font-medium">{option.label}</p>
            {option.hint ? <p className="mt-1 text-xs text-foreground/60">{option.hint}</p> : null}
          </button>
        ))}
      </div>
    </div>
  );
}
