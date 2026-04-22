import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingHero() {
  return (
    <section className="relative flex items-center pt-12 sm:pt-14 md:pt-16 lg:pt-28 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-7 sm:gap-8 md:gap-10 lg:gap-16 items-center py-8 sm:py-10 md:py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl space-y-5 sm:space-y-6 lg:space-y-7 order-2 lg:order-1"
        >
          <div className="space-y-4 sm:space-y-5 lg:space-y-6">
            <h1 className="font-display text-4xl sm:text-5xl md:text-5xl lg:text-[2.65rem] xl:text-5xl font-medium tracking-tight text-foreground leading-[1.08] whitespace-nowrap">
              Built for Arabic teachers and learners<br />
              <span className="text-foreground/70">make every class count</span>
            </h1>
          </div>
     
          <p className="text-sm sm:text-base md:text-md text-foreground/70 leading-relaxed max-w-lg">
            Where Arabic is lived, not just learned—simple tools for teachers, students, and programs that care.
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 pt-1 sm:pt-2">
            <Link to="/login">
              <Button
                size="lg"
                className="h-11 sm:h-12 lg:h-14 rounded-lg px-6 sm:px-8 lg:px-10 bg-primary hover:bg-primary text-primary-foreground shadow-2xl shadow-[hsl(160_35%_18%/0.12)] transition-all duration-300"
              >
                Open your workspace <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/onboarding">
              <Button
                size="lg"
                variant="outline"
                className="h-11 sm:h-12 lg:h-14 rounded-lg px-6 sm:px-8 lg:px-10 border-[hsl(160_25%_28%/0.25)] text-foreground/80 hover:bg-[hsl(42_40%_99%/0.6)] transition-all duration-300"
              >
                See journeys by role
              </Button>
            </Link>
          </div>

          <p className="flex items-start gap-2 text-xs text-foreground/60 max-w-md">
            <Globe2 className="h-4 w-4 shrink-0 text-primary" aria-hidden />
            Built for weekend schools, online academies, and university language institutes that teach Arabic as a living language—not a forgotten attachment.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative flex justify-center order-1 lg:order-2"
        >
          <div className="relative w-full max-w-[360px] sm:max-w-[440px] lg:max-w-[540px] aspect-[4/5] lg:aspect-square">
            <div className="relative h-full w-full flex items-center justify-center overflow-hidden p-4 sm:p-6 lg:p-8">
              <img
                src="/7112-removebg-preview.png"
                alt="Hand-drawn composition of iconic Islamic architecture and the Kaaba"
                className="h-full w-full object-contain mix-blend-multiply opacity-[0.96] drop-shadow-[0_20px_30px_hsl(160_35%_18%/0.16)]"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function LandingHeroStats() {
  return (
    <section className="relative py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="mx-auto flex w-full max-w-md rounded-2xl border border-[hsl(160_25%_28%/0.18)] bg-[hsl(42_40%_99%/0.78)] backdrop-blur-sm p-0 overflow-hidden">
          <div className="flex-1 p-2.5 sm:p-3 flex flex-col justify-center items-start">
            <div className="mb-1 flex items-center gap-1.5 text-[11px] text-foreground/60">
              Active cohorts
            </div>
            <p className="font-display text-xl sm:text-2xl text-foreground">24</p>
          </div>
          <div className="w-px bg-[hsl(160_25%_28%/0.12)] self-stretch my-3" />
          <div className="flex-1 p-2.5 sm:p-3 flex flex-col justify-center items-start">
            <div className="mb-1 flex items-center gap-1.5 text-[11px] text-foreground/60">
              Weekly sessions
            </div>
            <p className="font-display text-xl sm:text-2xl text-foreground">78</p>
          </div>
          <div className="w-px bg-[hsl(160_25%_28%/0.12)] self-stretch my-3" />
          <div className="flex-1 p-2.5 sm:p-3 flex flex-col justify-center items-start">
            <div className="mb-1 flex items-center gap-1.5 text-[11px] text-foreground/60">
              On-track learners
            </div>
            <p className="font-display text-xl sm:text-2xl text-foreground">91%</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LandingTrustMarquee() {
  const items = [
    "Bilingual UI",
    "RTL-first",
    "Calm workflows",
    "Role-based surfaces",
    "Fast scheduling",
  ];

  const marqueeItems = [...items, ...items, ...items];

  return (
    <section className="relative pb-10 sm:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="relative overflow-hidden rounded-2xl border border-[hsl(160_25%_28%/0.14)] bg-[hsl(42_40%_99%/0.45)]">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[hsl(42_28%_97%/0.98)] to-transparent sm:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[hsl(42_28%_97%/0.98)] to-transparent sm:w-20" />

          <div className="marquee-track flex w-max items-center gap-6 px-6 py-4 sm:gap-8 sm:px-10 sm:py-5">
            {marqueeItems.map((item, i) => (
              <div key={`${item}-${i}`} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-primary/60" aria-hidden />
                <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-foreground/60">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
