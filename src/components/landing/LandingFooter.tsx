import { GraduationCap } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="border-t border-emerald-700/30 bg-[hsl(160_42%_38%)] py-10 sm:py-12 lg:py-14">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:gap-8 lg:gap-10 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-white" aria-hidden />
            <span className="font-display text-lg text-white">ArabicLearn</span>
          </div>
          <p className="mt-3 max-w-md text-sm text-white/85 leading-relaxed">
            A purpose-built home for Arabic programs: Modern Standard Arabic tracks, Quranic literacy support, and intensive fus-ha schools that need scheduling,
            attendance, and bilingual clarity without losing the soul of the classroom.
          </p>
        </div>
        <p className="text-sm text-white/85">© 2026 ArabicLearn</p>
      </div>
    </footer>
  );
}
