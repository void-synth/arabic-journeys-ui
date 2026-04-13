import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, ChartNoAxesCombined, Globe2, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingHero() {
  return (
    <section className="relative flex items-center pt-12 sm:pt-14 md:pt-16 lg:pt-28 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-7 sm:gap-8 md:gap-10 lg:gap-16 items-center py-8 sm:py-10 md:py-12 lg:py-20">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl space-y-5 sm:space-y-6 lg:space-y-7 order-2 lg:order-1"
        >

          <div className="space-y-4 sm:space-y-5 lg:space-y-6">
            <h1 className="font-display text-4xl sm:text-5xl md:text-5xl lg:text-4xl font-medium tracking-tight text-slate-900 leading-[1.05]">
              Learn Arabic with <span className="italic text-slate-600">structure, confidence, and flow</span>
            </h1>
          </div>

          <p className="text-sm sm:text-base md:text-md text-slate-600 leading-relaxed max-w-lg">
            ArabicLearn helps schools, tutors, and independent learners run clear learning journeys.
            Plan sessions, track attendance, and keep everyone aligned in one focused interface.
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 pt-1 sm:pt-2">
            <Link to="/login">
              <Button size="lg" className="h-11 sm:h-12 lg:h-14 rounded-full px-6 sm:px-8 lg:px-10 bg-[hsl(160_36%_38%)] hover:bg-[hsl(160_36%_38%)] text-white shadow-2xl shadow-slate-200 transition-all duration-300">
                Start learning <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/onboarding">
              <Button size="lg" variant="outline" className="h-11 sm:h-12 lg:h-14 rounded-full px-6 sm:px-8 lg:px-10 border-slate-200 text-slate-600 hover:bg-slate-50 transition-all duration-300">
                View role journeys
              </Button>
            </Link>
          </div>

          <div className="flex w-full rounded-2xl border border-white/60 bg-white/75 backdrop-blur-sm p-0 overflow-hidden mt-1 sm:mt-2 max-w-md">
            <div className="flex-1 p-2.5 sm:p-3 flex flex-col justify-center items-start">
              <div className="mb-1 flex items-center gap-1.5 text-[11px] text-slate-500">
                <Users className="h-3.5 w-3.5" /> Active cohorts
              </div>
              <p className="font-display text-xl sm:text-2xl text-slate-900">24</p>
            </div>
            <div className="w-px bg-slate-200/70 self-stretch my-3" />
            <div className="flex-1 p-2.5 sm:p-3 flex flex-col justify-center items-start">
              <div className="mb-1 flex items-center gap-1.5 text-[11px] text-slate-500">
                <CalendarDays className="h-3.5 w-3.5" /> Weekly sessions
              </div>
              <p className="font-display text-xl sm:text-2xl text-slate-900">78</p>
            </div>
            <div className="w-px bg-slate-200/70 self-stretch my-3" />
            <div className="flex-1 p-2.5 sm:p-3 flex flex-col justify-center items-start">
              <div className="mb-1 flex items-center gap-1.5 text-[11px] text-slate-500">
                <ChartNoAxesCombined className="h-3.5 w-3.5" /> Completion rate
              </div>
              <p className="font-display text-xl sm:text-2xl text-slate-900">91%</p>
            </div>
          </div>
        </motion.div>
   

        {/* Right Content - Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative flex justify-center order-1 lg:order-2"
        >
          <div className="relative w-full max-w-[360px] sm:max-w-[440px] lg:max-w-[540px] aspect-[4/5] lg:aspect-square">
            <div className="relative h-full w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
              <img
                src="/7112-removebg-preview.png"
                alt="Arabic Journey Illustration"
                className="w-full h-full object-contain mix-blend-multiply opacity-95 drop-shadow-[0_20px_30px_rgba(15,23,42,0.16)]"
              />
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
