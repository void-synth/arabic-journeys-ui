import { motion } from "framer-motion";
import { Radio, Shield, LineChart, Zap } from "lucide-react";

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

export function LandingFeatures() {
  return (
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
  );
}
