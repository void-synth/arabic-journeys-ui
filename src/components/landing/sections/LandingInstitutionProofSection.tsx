import { motion } from "framer-motion";
import { Languages, LineChart, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { LandingSectionFrame } from "./LandingSectionFrame";

export function LandingInstitutionProofSection() {
  return (
    <LandingSectionFrame
      id="operating-truth"
      variant="canvas"
      eyebrow="Section V — Operating truth"
      title={<>The institution should feel as intentional as the classroom.</>}
      lead="This is the narrow band where software either earns trust or burns it: roles, permissions, bilingual surfaces, and the story of who showed up. No gallery wall of tiny tiles—just signal, spaced like a briefing room."
    >
      <div className="grid gap-20 lg:grid-cols-12 lg:items-start lg:gap-16 xl:gap-20">
        <div className="space-y-10 lg:col-span-5">
          <div className="space-y-5 text-base leading-relaxed text-slate-600">
            <p>
              Teachers should not memorize five URLs. Parents should not decode screenshots. Admins should not rebuild truth every Sunday night. When operations
              feel engineered, pedagogy gets its air back.
            </p>
          </div>

          <div className="flex max-w-md flex-col gap-5">
            <Card className="border-white/65 bg-white/85 shadow-[0_18px_50px_-28px_rgba(15,23,42,0.2)] backdrop-blur-md">
              <CardContent className="flex items-start gap-3 p-5">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(160_38%_32%)]" aria-hidden />
                <div>
                  <p className="font-medium text-slate-800">Three quiet roles</p>
                  <p className="mt-1 text-sm text-slate-500">Teacher · Learner · Admin—each with a surface that refuses noise.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-white/65 bg-white/85 shadow-[0_18px_50px_-28px_rgba(15,23,42,0.2)] backdrop-blur-md">
              <CardContent className="flex items-start gap-3 p-5">
                <Languages className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(160_38%_32%)]" aria-hidden />
                <div>
                  <p className="font-medium text-slate-800">Arabic-first bilingual UI</p>
                  <p className="mt-1 text-sm text-slate-500">RTL and Latin labels that stay readable in the same glance.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-white/65 bg-white/85 shadow-[0_18px_50px_-28px_rgba(15,23,42,0.2)] backdrop-blur-md">
              <CardContent className="flex items-start gap-3 p-5">
                <LineChart className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(160_38%_32%)]" aria-hidden />
                <div>
                  <p className="font-medium text-slate-800">Session truth, end to end</p>
                  <p className="mt-1 text-sm text-slate-500">Time, link, attendance, and notes in one coherent record.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-14 lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="group relative"
          >
            <div
              className="relative min-h-[280px] overflow-hidden border border-white/55 bg-slate-200/30 shadow-[0_28px_75px_-36px_rgba(15,23,42,0.36)] sm:min-h-[320px]"
              style={{ borderRadius: "2.5rem 2.5rem 4.5rem 0.75rem" }}
            >
              <img
                src="/landing-journey-program-leadership.jpg"
                alt="Program director reviewing Arabic school operations"
                className="absolute inset-0 h-full w-full object-cover object-[center_22%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-slate-950/10" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            <Card className="relative overflow-hidden rounded-3xl border-white/60 bg-white/80 shadow-[0_28px_70px_-34px_rgba(15,23,42,0.22)] backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(160_45%_92%/0.45),transparent_50%)]" aria-hidden />
              <CardContent className="relative p-8 sm:p-10 lg:p-12">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">From pilot programs</p>
                <blockquote className="mt-6 font-display text-xl italic leading-snug text-[hsl(220_22%_22%)] sm:text-2xl">
                  &ldquo;We finally speak one language about Arabic outcomes: who showed up, who is slipping on listening, and which cohort needs a new text—not
                  which spreadsheet was last saved.&rdquo;
                </blockquote>
                <p className="mt-8 text-sm font-medium text-slate-500">— Academic director, community Arabic institute</p>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid gap-10 sm:grid-cols-2 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="relative min-h-[200px] overflow-hidden border border-white/50 shadow-md"
              style={{ borderRadius: "2rem 0.5rem 2rem 2rem" }}
            >
              <img
                src="/landing-journey-notebook-drills.jpg"
                alt="Written Arabic drills in a notebook"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 text-xs font-medium text-white">Evidence of practice, not vibes</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="relative min-h-[200px] overflow-hidden border border-white/50 shadow-md"
              style={{ borderRadius: "0.5rem 2rem 2rem 2rem" }}
            >
              <img
                src="/landing-journey-reading-comprehension.jpg"
                alt="Learner reading for comprehension"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 text-xs font-medium text-white">Reading that graduates from decoding</p>
            </motion.div>
          </div>
        </div>
      </div>
    </LandingSectionFrame>
  );
}
