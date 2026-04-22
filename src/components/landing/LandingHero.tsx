import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, BookMarked, CalendarDays, ChartNoAxesCombined, Globe2, Users } from "lucide-react";
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
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-800/15 bg-white/55 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-emerald-900/80 backdrop-blur-sm">
            <BookMarked className="h-3.5 w-3.5" aria-hidden />
            Arabic · MSA pathways · RTL-ready product
          </div>

          <div className="space-y-4 sm:space-y-5 lg:space-y-6">
            <h1 className="font-display text-4xl sm:text-5xl md:text-5xl lg:text-[2.65rem] xl:text-5xl font-medium tracking-tight text-slate-900 leading-[1.08]">
              The operating system for{" "}
              <span className="italic text-slate-600">serious Arabic learning journeys</span>
            </h1>
          </div>

          <p className="text-sm sm:text-base md:text-md text-slate-600 leading-relaxed max-w-lg">
            ArabicLearn connects teachers, learners, and program leads around one truth: Arabic is not “another subject file.” It is sound, script, culture, and
            weekly discipline—best run when scheduling, attendance, and bilingual UI stay quietly excellent in the background.
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 pt-1 sm:pt-2">
            <Link to="/login">
              <Button size="lg" className="h-11 sm:h-12 lg:h-14 rounded-full px-6 sm:px-8 lg:px-10 bg-[hsl(160_36%_38%)] hover:bg-[hsl(160_36%_38%)] text-white shadow-2xl shadow-slate-200 transition-all duration-300">
                Open your workspace <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/onboarding">
              <Button size="lg" variant="outline" className="h-11 sm:h-12 lg:h-14 rounded-full px-6 sm:px-8 lg:px-10 border-slate-200 text-slate-600 hover:bg-slate-50 transition-all duration-300">
                See journeys by role
              </Button>
            </Link>
          </div>

          <div className="flex w-full rounded-2xl border border-white/60 bg-white/75 backdrop-blur-sm p-0 overflow-hidden mt-1 sm:mt-2 max-w-md">
            <div className="flex-1 p-2.5 sm:p-3 flex flex-col justify-center items-start">
              <div className="mb-1 flex items-center gap-1.5 text-[11px] text-slate-500">
                <Users className="h-3.5 w-3.5" aria-hidden /> Active cohorts
              </div>
              <p className="font-display text-xl sm:text-2xl text-slate-900">24</p>
            </div>
            <div className="w-px bg-slate-200/70 self-stretch my-3" />
            <div className="flex-1 p-2.5 sm:p-3 flex flex-col justify-center items-start">
              <div className="mb-1 flex items-center gap-1.5 text-[11px] text-slate-500">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden /> Weekly sessions
              </div>
              <p className="font-display text-xl sm:text-2xl text-slate-900">78</p>
            </div>
            <div className="w-px bg-slate-200/70 self-stretch my-3" />
            <div className="flex-1 p-2.5 sm:p-3 flex flex-col justify-center items-start">
              <div className="mb-1 flex items-center gap-1.5 text-[11px] text-slate-500">
                <ChartNoAxesCombined className="h-3.5 w-3.5" aria-hidden /> On-track learners
              </div>
              <p className="font-display text-xl sm:text-2xl text-slate-900">91%</p>
            </div>
          </div>

          <p className="flex items-start gap-2 text-xs text-slate-500 max-w-md">
            <Globe2 className="h-4 w-4 shrink-0 text-[hsl(160_36%_38%)]" aria-hidden />
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
                className="h-full w-full object-contain mix-blend-multiply opacity-[0.96] drop-shadow-[0_20px_30px_rgba(15,23,42,0.16)]"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
