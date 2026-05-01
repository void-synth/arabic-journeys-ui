import { StudentLayout } from "@/layouts/StudentLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Link } from "react-router-dom";
import { Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStoredSessions } from "@/lib/useStoredSessions";
import { useAuth } from "@/lib/auth";
import { isStudentOnboardingComplete, readStudentOnboarding } from "@/lib/studentOnboarding";
import { buildSessionsPageHint } from "@/lib/studentOnboardingCopy";

export default function StudentSessions() {
  const auth = useAuth();
  const studentId = auth.userId;
  const sessions = useStoredSessions();
  const mySessions = sessions.filter((s) => (studentId ? s.students.includes(studentId) : false));
  const onboarding = studentId ? readStudentOnboarding(studentId) : null;
  const onboardingDone = studentId ? isStudentOnboardingComplete(studentId) : false;
  const hint = buildSessionsPageHint(onboarding?.profile ?? null, onboardingDone);

  return (
    <StudentLayout title="Session History">
      <div className="page-container">
        <PageHeader title="Session History" description="Past and upcoming sessions tied to your enrollment." />
        <p className="mb-4 text-sm text-foreground/65">{hint}</p>
        {mySessions.length === 0 ? (
          <div className="rounded-2xl border border-[hsl(160_25%_28%/0.12)] bg-[hsl(42_40%_99%/0.55)] p-8 text-center shadow-[0_18px_55px_-38px_hsl(160_35%_18%/0.12)]">
            <Calendar className="mx-auto h-10 w-10 text-primary/80" aria-hidden />
            <p className="mt-4 font-display text-lg font-semibold text-foreground">No sessions yet</p>
            <p className="mt-2 text-sm text-foreground/70">
              When your teacher schedules a class and adds you, it will appear here with date, time, and join links.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild variant="outline" className="rounded-2xl border-[hsl(160_25%_28%/0.18)] bg-[hsl(42_40%_99%/0.65)]">
                <Link to="/student/dashboard">Back to dashboard</Link>
              </Button>
              {!onboardingDone ? (
                <Button asChild className="rounded-2xl bg-primary text-primary-foreground hover:bg-primary">
                  <Link to="/onboarding" className="inline-flex items-center gap-2">
                    <Sparkles className="h-4 w-4" aria-hidden />
                    Complete onboarding
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {mySessions.map((s) => (
              <Link
                key={s.id}
                to={`/student/sessions/${s.id}`}
                className="surface-panel p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/25 transition-colors block"
              >
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm">{s.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {s.teacherName} · {s.date} · {s.time} · {s.duration} min
                  </p>
                </div>
                <StatusBadge status={s.status} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
