import { BookOpen } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="border-t border-white/35 bg-[hsl(42_22%_96%)] py-14">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[hsl(160_38%_32%)]" />
            <span className="font-display text-lg text-[hsl(220_20%_18%)]">ArabicLearn</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-slate-600">
            Front-end only in this repo — composed to feel complete today, and to welcome your backend tomorrow.
          </p>
        </div>
        <p className="text-sm text-slate-500">© 2026 ArabicLearn</p>
      </div>
    </footer>
  );
}
