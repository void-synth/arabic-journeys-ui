import { Link } from "react-router-dom";
import { BookOpen, ArrowRight, GraduationCap, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center mesh-bg-public px-4 py-16">
      <div className="w-full max-w-lg">
        <div className="mb-10 text-center">
          <span className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/15">
            <BookOpen className="h-7 w-7 text-primary" />
          </span>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Pick a role</h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            Each area matches real permissions: instructors run classes, learners join sessions, admins manage the directory.
          </p>
        </div>
        <div className="grid gap-4">
          <Link to="/teacher/dashboard" className="group block">
            <div className="glass-card flex items-center justify-between gap-4 rounded-2xl p-6 transition-transform duration-200 group-hover:-translate-y-0.5">
              <div className="flex min-w-0 items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </span>
                <div className="min-w-0 text-left">
                  <p className="font-display font-semibold text-foreground">Teacher</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">Your sessions, learner roster, attendance</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
            </div>
          </Link>
          <Link to="/student/dashboard" className="group block">
            <div className="glass-card flex items-center justify-between gap-4 rounded-2xl p-6 transition-transform duration-200 group-hover:-translate-y-0.5">
              <div className="flex min-w-0 items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/10">
                  <UserCircle className="h-6 w-6 text-primary" />
                </span>
                <div className="min-w-0 text-left">
                  <p className="font-display font-semibold text-foreground">Student</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">Join classes, history, messages</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
            </div>
          </Link>
          <Link to="/admin/dashboard" className="block">
            <Button variant="outline" className="h-12 w-full rounded-xl border-border bg-background/90 hover:bg-muted/80" type="button">
              Admin — directory, sessions, analytics
            </Button>
          </Link>
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          <Link to="/" className="font-medium text-primary underline-offset-4 hover:underline">
            Back to marketing site
          </Link>
        </p>
      </div>
    </div>
  );
}
