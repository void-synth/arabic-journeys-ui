import { motion } from "framer-motion";
import { BookOpenCheck, HeartHandshake } from "lucide-react";
import { LandingSectionFrame } from "./LandingSectionFrame";

export function LandingPathwaysPeopleSection() {
  return (
    <LandingSectionFrame
      id="pathways-people"
      variant="mist"
      eyebrow="Section IV — Pathways & people"
      title={<>One clear path for every kind of learner.</>}
      lead="Run a serious MSA program and still welcome heritage learners with warmth. Keep levels, pacing, and expectations clear—without making anyone feel like they don’t belong."
    >
      <div className="grid gap-16 lg:grid-cols-2 lg:items-start lg:gap-20 xl:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.55, delay: 0.04 }}
          className="space-y-10 lg:pr-6"
        >
          <div className="space-y-5 text-base leading-relaxed text-foreground/70">
            <p>Different learners arrive for different reasons. The product should stay consistent and clear—without forcing one “type” of student voice.</p>
          </div>

          <div className="divide-y divide-[hsl(160_25%_28%/0.14)] rounded-2xl border border-[hsl(160_25%_28%/0.14)] bg-[hsl(42_40%_99%/0.45)]">
            <div className="flex items-start gap-4 p-6">
              <BookOpenCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="font-medium text-foreground">Levels that are easy to follow</p>
                <p className="mt-1 text-sm text-foreground/60">
                  Keep pacing visible—what comes next, what’s being practiced, and why—so teachers and admins stay aligned.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6">
              <HeartHandshake className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="font-medium text-foreground">A welcome that still feels serious</p>
                <p className="mt-1 text-sm text-foreground/60">
                  Simple onboarding that feels professional—so families and learners trust what they’re joining.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-7">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.55 }}
            className="group relative"
          >
            <div
              className="relative min-h-[380px] overflow-hidden border border-[hsl(160_25%_28%/0.18)] bg-[hsl(42_40%_99%/0.35)] shadow-[0_30px_80px_-38px_hsl(160_35%_18%/0.26)] lg:min-h-[480px]"
              style={{ borderRadius: "2.75rem" }}
            >
              <img
                src="/landing-journey-curriculum-shelves.jpg"
                alt="Curriculum and leveled texts on shelves"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(160_35%_18%/0.22)] via-transparent to-[hsl(160_35%_18%/0.78)]" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="group relative overflow-hidden border border-[hsl(160_25%_28%/0.16)] bg-[hsl(42_40%_99%/0.35)] shadow-[0_22px_60px_-34px_hsl(160_35%_18%/0.18)]"
            style={{ borderRadius: "2.25rem" }}
          >
            <div className="relative min-h-[240px] sm:min-h-[280px]">
              <img
                src="/landing-journey-learner-practice.jpg"
                alt="Learner practicing writing and Arabic study at a desk"
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(160_35%_18%/0.78)] via-[hsl(160_35%_18%/0.22)] to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </LandingSectionFrame>
  );
}
