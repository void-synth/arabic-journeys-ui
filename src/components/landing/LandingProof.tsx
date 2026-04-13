import { UserRound, Languages, CalendarClock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function LandingProof() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-16 md:py-20 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:gap-8 lg:gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[hsl(220_20%_18%)]">Built for real learning operations, not just demos.</h2>
            <p className="mt-4 text-slate-600">
              Keep scheduling, participation, and role communication clear with one consistent system that scales with your team.
            </p>
            <div className="mt-6 sm:mt-7 lg:mt-8 flex flex-wrap gap-3 sm:gap-4">
              <Card className="w-full border-white/65 bg-white/80 shadow-[0_16px_44px_-24px_rgba(15,23,42,0.22)] backdrop-blur-lg sm:w-auto">
                <CardContent className="flex items-center gap-3 p-4">
                  <UserRound className="h-5 w-5 text-[hsl(160_38%_32%)]" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Three quiet roles</p>
                    <p className="text-xs text-slate-500">Teacher · Learner · Admin</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="w-full border-white/65 bg-white/80 shadow-[0_16px_44px_-24px_rgba(15,23,42,0.22)] backdrop-blur-lg sm:w-auto">
                <CardContent className="flex items-center gap-3 p-4">
                  <Languages className="h-5 w-5 text-[hsl(160_38%_32%)]" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Arabic-first bilingual experience</p>
                    <p className="text-xs text-slate-500">RTL and Latin content that stays readable</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="w-full border-white/65 bg-white/80 shadow-[0_16px_44px_-24px_rgba(15,23,42,0.22)] backdrop-blur-lg sm:w-auto">
                <CardContent className="flex items-center gap-3 p-4">
                  <CalendarClock className="h-5 w-5 text-[hsl(160_38%_32%)]" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Session management that stays simple</p>
                    <p className="text-xs text-slate-500">Time, link, and attendance context in one view</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <Card className="relative overflow-hidden rounded-3xl border-white/60 bg-white/75 shadow-[0_30px_78px_-34px_rgba(15,23,42,0.24)] backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(160_45%_90%/0.5),transparent_45%)]" />
            <CardHeader className="relative pb-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">From early adopter feedback</p>
            </CardHeader>
            <CardContent className="relative">
              <CardDescription className="font-display text-xl sm:text-2xl italic leading-snug text-[hsl(220_22%_22%)]">
                &ldquo;Our teachers got onboarded quickly, and our learners understood exactly where to go each week.&rdquo;
              </CardDescription>
              <CardTitle className="mt-6 text-sm font-medium text-slate-500">— Program operations lead</CardTitle>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
