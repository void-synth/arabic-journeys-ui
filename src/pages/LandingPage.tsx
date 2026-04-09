import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Globe2,
  LineChart,
  Radio,
  Shield,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingBackdrop } from "@/components/visual/LandingBackdrop";

const features = [
  {
    icon: Radio,
    title: "Rooms that feel serene, not rushed",
    desc: "Layouts tuned for script, sound, and calm focus — so live sessions feel as composed as the architecture behind them.",
    span: "md:col-span-2",
  },
  {
    icon: Shield,
    title: "One journey, three quiet roles",
    desc: "Teachers, learners, and stewards each get a clear surface — less noise, fewer mistakes, room to breathe.",
    span: "md:col-span-1",
  },
  {
    icon: LineChart,
    title: "Clarity you can show with confidence",
    desc: "Attendance and cohort signals are mocked here — shaped like the real metrics you’ll want when your data plane arrives.",
    span: "md:col-span-1",
  },
  {
    icon: Zap,
    title: "Begin with the experience",
    desc: "No backend in this build: walk the full UI today, then connect your stack when you’re ready — routes and glass stay.",
    span: "md:col-span-2",
  },
];

const testimonials = [
  {
    quote: "Finally a shell that feels as intentional as the language we teach — calm, luminous, and serious about craft.",
    name: "Amira K.",
    role: "Program Director, Bayt Al-Lugha",
  },
  {
    quote: "The product story reads in seconds: this is a platform, not a weekend experiment.",
    name: "James R.",
    role: "Founder, LinguaNova",
  },
  {
    quote: "Bilingual presentation done with restraint. That matters when you’re building trust in MENA edtech.",
    name: "Leila M.",
    role: "GP, Desert Bloom Capital",
  },
];

const logos = ["Noor EdTech", "MENA Skills Fund", "Qalam Labs", "Desert Bloom", "Riyada VC"];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[hsl(42_28%_97%)] text-slate-800">
      {/* Nav — milky glass over photograph */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/40 bg-white/30 shadow-[0_8px_40px_-12px_rgba(15,23,42,0.06)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/25">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/50 bg-white/40 shadow-sm ring-1 ring-white/60">
              <BookOpen className="h-[18px] w-[18px] text-[hsl(160_38%_32%)]" />
            </span>
            <span className="font-display text-lg tracking-tight text-[hsl(220_18%_18%)]">ArabicLearn</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:bg-white/50 hover:text-slate-900">
                Log in
              </Button>
            </Link>
            <Link to="/login">
              <Button
                size="sm"
                className="border border-white/50 bg-[hsl(160_36%_38%)] text-white shadow-[0_12px_40px_-16px_hsl(160_40%_30%/0.45)] hover:bg-[hsl(160_36%_34%)]"
              >
                Begin gently
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[100svh] overflow-hidden pt-16 text-[hsl(220_16%_22%)]">
        <LandingBackdrop />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-16 px-4 pb-24 pt-20 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:px-8 lg:pt-28">
          <motion.div
            className="max-w-2xl flex-1"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/35 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-[hsl(160_38%_32%)]" />
              Arabic learning, refined
            </div>
            <h1 className="mt-6 max-w-[18ch] font-display text-4xl font-normal leading-[1.08] tracking-tight text-[hsl(220_20%_16%)] sm:text-5xl lg:text-[3.35rem]">
              Embark on a journey of{" "}
              <span className="italic text-[hsl(32_28%_38%)]">linguistic elegance</span>
            </h1>
            <p className="font-arabic mt-6 text-2xl font-medium leading-relaxed text-[hsl(220_14%_38%)] sm:text-[1.65rem]" dir="rtl">
              اكتشف جمال العربية الخالد — بهدوءٍ ووضوح
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              A calm, luminous workspace for cohorts and institutions: live sessions, rosters, attendance, and gentle analytics — all
              here as a front-end story you can feel, with mock data until your backend arrives.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/login">
                <Button
                  size="lg"
                  className="h-12 rounded-full border border-white/50 bg-white/90 px-8 text-base font-semibold text-[hsl(220_18%_18%)] shadow-[0_24px_64px_-28px_rgba(15,23,42,0.18)] backdrop-blur-sm hover:bg-white"
                >
                  Step inside <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/onboarding">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-white/45 bg-white/25 px-8 text-base text-slate-800 shadow-[0_16px_48px_-24px_rgba(15,23,42,0.12)] backdrop-blur-md hover:bg-white/40"
                >
                  Wander the roles
                </Button>
              </Link>
            </div>

            <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-white/35 pt-10 sm:grid-cols-4">
              {[
                { k: "12.4k+", l: "Seats in the story" },
                { k: "4.9", l: "Pilot warmth (mock)" },
                { k: "40+", l: "Markets in the tale" },
                { k: "Ready", l: "When you connect data" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="font-display text-2xl text-[hsl(220_22%_22%)] sm:text-3xl">{s.k}</dt>
                  <dd className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">{s.l}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            className="w-full max-w-md shrink-0 lg:max-w-sm"
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/30 p-6 shadow-[0_32px_80px_-36px_rgba(15,23,42,0.15)] backdrop-blur-xl backdrop-saturate-200">
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-[hsl(42_35%_92%/0.5)]" />
              <div className="relative">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Next light-filled session</p>
                  <span className="flex items-center gap-1.5 rounded-full border border-emerald-200/60 bg-emerald-50/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-800">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
                    </span>
                    Soon
                  </span>
                </div>
                <p className="mt-4 font-display text-2xl text-[hsl(220_20%_18%)]">Conversational Arabic · Majhūl</p>
                <p className="mt-1 text-sm text-slate-600">Tomorrow · 14:00 · 90 min · Cohort pearl</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-lg border border-white/45 bg-white/40 px-2.5 py-1 text-[11px] font-medium text-slate-700 shadow-sm backdrop-blur-sm">
                    Fluency
                  </span>
                  <span className="rounded-lg border border-white/45 bg-white/40 px-2.5 py-1 text-[11px] font-medium text-slate-700 shadow-sm backdrop-blur-sm">
                    Mock invite
                  </span>
                </div>
                <div className="mt-8 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                <p className="mt-5 text-xs leading-relaxed text-slate-500">
                  Frosted glass on marble light — the same quiet language continues through teacher, learner, and steward views.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Logo strip */}
        <div className="relative z-10 border-t border-white/35 bg-white/25 py-8 backdrop-blur-md">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">Trusted in narrative &amp; design rooms</p>
          <div className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4 opacity-90">
            {logos.map((name) => (
              <span key={name} className="font-display text-sm text-slate-600">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Bento — light band */}
      <section className="relative bg-[hsl(42_26%_95%)] py-24 text-slate-900">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[hsl(42_30%_98%)] to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h2 className="font-display text-4xl tracking-tight text-[hsl(220_20%_18%)] sm:text-5xl">Room to grow, without the noise.</h2>
            <p className="mt-4 text-lg text-slate-600">
              A spacious bento of surfaces — metrics and bilingual rhythm included — all front-end for now, ready for your API.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className={`group relative overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-6 shadow-[0_28px_72px_-40px_rgba(15,23,42,0.12)] backdrop-blur-md ${f.span}`}
              >
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-400/20 to-amber-400/10 blur-2xl transition-opacity group-hover:opacity-100" />
                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(160_38%_38%)] text-primary-foreground shadow-md">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="relative mt-5 font-display text-xl text-slate-900">{f.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-slate-600">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiet proof */}
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

      {/* Testimonials */}
      <section className="border-y border-white/40 bg-[hsl(42_24%_96%)] py-24 text-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl text-[hsl(220_20%_18%)] sm:text-4xl">Soft proof, until yours arrives</h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-slate-600">Placeholder voices — trade for logos and scores when you&apos;re ready.</p>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col rounded-2xl border border-white/55 bg-white/75 p-6 shadow-[0_20px_56px_-28px_rgba(15,23,42,0.12)] backdrop-blur-sm"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 border-t border-slate-200 pt-4">
                  <p className="font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
    </div>
  );
}
