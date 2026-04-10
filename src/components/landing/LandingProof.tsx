import { Users, Globe2, Calendar } from "lucide-react";

export function LandingProof() {
  return (
    <section className="relative overflow-hidden bg-[hsl(220_16%_97%)] py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,hsl(160_28%_88%/0.45),transparent_65%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-3xl text-[hsl(220_20%_18%)] sm:text-4xl">Craft that survives scrutiny — and invites people in.</h2>
            <p className="mt-4 text-slate-600">
              Tables stay legible; glass marks what matters. One coherent system across roles — not a patched theme.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-3 rounded-xl border border-white/55 bg-white/60 px-4 py-3 shadow-sm backdrop-blur-sm">
                <Users className="h-5 w-5 text-[hsl(160_38%_32%)]" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">Three quiet roles</p>
                  <p className="text-xs text-slate-500">Teacher · Learner · Steward</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/55 bg-white/60 px-4 py-3 shadow-sm backdrop-blur-sm">
                <Globe2 className="h-5 w-5 text-[hsl(160_38%_32%)]" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">RTL &amp; Latin in balance</p>
                  <p className="text-xs text-slate-500">Storytelling that feels native</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/55 bg-white/60 px-4 py-3 shadow-sm backdrop-blur-sm">
                <Calendar className="h-5 w-5 text-[hsl(160_38%_32%)]" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">Sessions, clear as daylight</p>
                  <p className="text-xs text-slate-500">Times, links, gentle status</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/50 bg-white/50 p-8 shadow-[0_24px_64px_-32px_rgba(15,23,42,0.1)] backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Whisper from a diligence room</p>
            <p className="mt-4 font-display text-2xl italic text-[hsl(220_22%_22%)]">
              &ldquo;We back teams who ship with taste. This feels like taste.&rdquo;
            </p>
            <p className="mt-6 text-sm text-slate-500">— Partner memo, anonymized</p>
          </div>
        </div>
      </div>
    </section>
  );
}
