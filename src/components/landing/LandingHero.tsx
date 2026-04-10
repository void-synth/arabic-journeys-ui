import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingHero() {
  return (
    <section className="relative min-h-[100svh] flex items-center bg-white pt-24 lg:pt-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center py-20 lg:py-32">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl space-y-10 order-2 lg:order-1"
        >
          <div className="space-y-6">
            <h1 className="font-display text-5xl md:text-6xl lg:text-[4.5rem] font-medium tracking-tight text-slate-900 leading-[1.05]">
              Embark on a journey of <span className="italic text-slate-600">linguistic elegance</span>
            </h1>
          </div>

          <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
            A calm, luminous workspace for individuals and institutions.
            Experience Arabic learning through a narrative of clarity, serenity, and serious craft.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/login">
              <Button size="lg" className="h-14 rounded-full px-10 bg-slate-900 hover:bg-slate-800 text-white shadow-2xl shadow-slate-200 transition-all duration-300">
                Begin gently <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/onboarding">
              <Button size="lg" variant="outline" className="h-14 rounded-full px-10 border-slate-200 text-slate-600 hover:bg-slate-50 transition-all duration-300">
                Explore roles
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Right Content - Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative flex justify-center order-1 lg:order-2"
        >
          <div className="relative w-full max-w-[540px] aspect-[4/5] lg:aspect-square">
            {/* Subtle background card effect */}
            <div className="absolute inset-4 bg-slate-50/50 rounded-[2.5rem] -rotate-2 scale-105" />

            <div className="relative h-full w-full bg-white flex items-center justify-center p-8 overflow-hidden">
              <img
                src="/7112.jpg"
                alt="Arabic Journey Illustration"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subtle bottom gradient sweep */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-slate-50/50 to-transparent" />
    </section>
  );
}
