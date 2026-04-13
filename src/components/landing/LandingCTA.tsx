import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function LandingCTA() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-16 md:py-20 lg:py-24">
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="font-display text-2xl sm:text-3xl text-[hsl(220_20%_18%)]">Start your Arabic learning journey today.</h2>
        <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-sm sm:text-md text-slate-600">
          Explore the complete experience now, then connect your data stack when your team is ready to go live.
        </p>
        <div className="mt-6 sm:mt-8 lg:mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
          <Link to="/login">
            <Button
              size="lg"
              className="h-10 sm:h-11 lg:h-12 rounded-full border border-white/50 bg-white/90 px-6 sm:px-8 lg:px-10 text-sm sm:text-base font-semibold text-slate-900 shadow-[0_20px_56px_-28px_rgba(15,23,42,0.15)] hover:bg-white"
            >
              Enter the app
            </Button>
          </Link>
          <Link to="/onboarding">
            <Button
              size="lg"
              variant="outline"
              className="h-10 sm:h-11 lg:h-12 rounded-full border-slate-300/80 bg-white/50 px-6 sm:px-8 lg:px-10 text-sm sm:text-base text-slate-800 shadow-sm backdrop-blur-sm hover:bg-white/80"
            >
              Explore by role
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
