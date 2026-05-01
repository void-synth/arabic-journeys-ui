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
      <div className="grid gap-16 lg:grid-cols-2 lg:items-start lg:gap-20 xl:gap-24">
        <div className="mx-auto w-full max-w-xl space-y-10 lg:mx-0 lg:max-w-none lg:pr-6">
          <div className="space-y-5 text-base leading-relaxed text-foreground/70">
            <p>
              Teachers should not memorize five URLs. Parents should not decode screenshots. Admins should not rebuild truth every Sunday night. When operations
              feel engineered, pedagogy gets its air back.
            </p>
          </div>

          <div className="divide-y divide-[hsl(160_25%_28%/0.14)] rounded-2xl border border-[hsl(160_25%_28%/0.14)] bg-[hsl(42_40%_99%/0.45)]">
            <div className="flex items-start gap-4 p-6">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="font-medium text-foreground">Three quiet roles</p>
                <p className="mt-1 text-sm text-foreground/60">Teacher · Learner · Admin—each with a surface that refuses noise.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6">
              <Languages className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="font-medium text-foreground">Arabic-first bilingual UI</p>
                <p className="mt-1 text-sm text-foreground/60">RTL and Latin labels that stay readable in the same glance.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6">
              <LineChart className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="font-medium text-foreground">Session truth, end to end</p>
                <p className="mt-1 text-sm text-foreground/60">Time, link, attendance, and notes in one coherent record.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-xl space-y-7 lg:mx-0 lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="group relative overflow-hidden border border-[hsl(160_25%_28%/0.18)] bg-[hsl(42_40%_99%/0.35)] shadow-[0_28px_75px_-36px_hsl(160_35%_18%/0.22)]"
            style={{ borderRadius: "2.75rem" }}
          >
            <div className="relative min-h-[360px] sm:min-h-[420px]">
              <img
                src="/landing-journey-program-leadership.jpg"
                alt="Program director reviewing Arabic school operations"
                className="absolute inset-0 h-full w-full object-cover object-[center_22%] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(160_35%_18%/0.6)] via-[hsl(160_35%_18%/0.2)] to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[hsl(42_40%_99%/0.75)]">
                  Operating clarity
                </p>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-[hsl(42_40%_99%/0.9)]">
                  Roles, schedules, and attendance that feel calm—so the classroom stays the main event.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.06 }}
          >
            <Card className="relative overflow-hidden rounded-3xl border border-[hsl(160_25%_28%/0.16)] bg-[hsl(42_40%_99%/0.55)] shadow-[0_18px_50px_-28px_hsl(160_35%_18%/0.12)]">
              <CardContent className="p-8 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-foreground/55">From pilot programs</p>
                <blockquote className="mt-6 font-display text-xl italic leading-snug text-foreground sm:text-2xl">
                  &ldquo;We finally speak one language about Arabic outcomes: who showed up, who is slipping on listening, and which cohort needs a new text—not
                  which spreadsheet was last saved.&rdquo;
                </blockquote>
                <p className="mt-8 text-sm font-medium text-foreground/60">— Academic director, community Arabic institute</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </LandingSectionFrame>
  );
}
