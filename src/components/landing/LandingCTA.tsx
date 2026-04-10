import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function LandingCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(42_26%_96%)] to-[hsl(220_14%_96%)] py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,hsl(160_25%_90%/0.5),transparent_60%)]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%231e293b\' fill-opacity=\'0.04\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl text-[hsl(220_20%_18%)] sm:text-5xl">Open the doors when your data is ready.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Stroll the full surface today — then connect Supabase, Postgres, or your LMS. The interface layer stays as luminous as you left it.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/login">
            <Button
              size="lg"
              className="h-12 rounded-full border border-white/50 bg-white/90 px-10 text-base font-semibold text-slate-900 shadow-[0_20px_56px_-28px_rgba(15,23,42,0.15)] hover:bg-white"
            >
              Enter the app
            </Button>
          </Link>
          <Link to="/onboarding">
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-slate-300/80 bg-white/50 px-10 text-base text-slate-800 shadow-sm backdrop-blur-sm hover:bg-white/80"
            >
              Stroll by role
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
