import { motion } from "framer-motion";
import { BookOpenCheck, HeartHandshake } from "lucide-react";
import { LandingSectionFrame } from "./LandingSectionFrame";

export function LandingPathwaysPeopleSection() {
  return (
    <LandingSectionFrame
      id="pathways-people"
      variant="mist"
      eyebrow="Section IV — Pathways & people"
      title={<>MSA sequencing and diaspora dignity, written as one brief—not two products.</>}
      lead="Strong programs already know their grammar arc and their placement story. This band is about making that map legible to learners and admins alike, while onboarding honors why someone walked through the door."
    >
      <div className="grid gap-20 lg:grid-cols-2 lg:items-center lg:gap-24 xl:gap-28">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.55 }}
          className="group relative order-2 lg:order-1"
        >
          <div
            className="relative min-h-[380px] overflow-hidden border border-white/55 bg-slate-200/30 shadow-[0_30px_80px_-38px_rgba(15,23,42,0.38)] lg:min-h-[480px]"
            style={{ borderRadius: "1rem 2.75rem 3.5rem 2rem" }}
          >
            <img
              src="/landing-journey-curriculum-shelves.jpg"
              alt="Curriculum and leveled texts on shelves"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/25 via-transparent to-slate-950/80" />
            <div className="absolute left-8 top-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
              <BookOpenCheck className="h-3.5 w-3.5" aria-hidden />
              Pathways
            </div>
            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
              <h3 className="font-display text-2xl text-white sm:text-3xl">Levels that admit they are levels</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/88">
                Morphology blocks, high-frequency roots, and reading bands stay visible so academic leads can defend pacing to any board—or any skeptical uncle in
                the parking lot.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="order-1 space-y-10 lg:order-2 lg:pl-4"
        >
          <div className="space-y-5 text-base leading-relaxed text-slate-600">
            <p>
              Heritage learners, diplomats, and faith-motivated students often share a timetable but not the same inner story. The product should never force a
              single tone—only a single standard of clarity.
            </p>
          </div>

          <div
            className="group relative mx-auto max-w-md overflow-hidden border border-white/55 bg-slate-200/25 shadow-[0_26px_70px_-36px_rgba(15,23,42,0.33)] lg:mx-0 lg:max-w-none"
            style={{ borderRadius: "3rem 3rem 1.25rem 1.25rem" }}
          >
            <div className="relative min-h-[320px] sm:min-h-[360px]">
              <img
                src="/landing-journey-learner-practice.jpg"
                alt="Learner practicing writing and Arabic study at a desk"
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
              <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md sm:left-8 sm:top-8">
                <HeartHandshake className="h-3.5 w-3.5" aria-hidden />
                Welcome layer
              </div>
              <p className="absolute bottom-6 left-6 right-6 text-sm font-medium leading-relaxed text-white/92 sm:bottom-8 sm:left-8 sm:right-8 sm:text-base">
                Plain-language onboarding that still signals academic seriousness—because trust is part of pedagogy.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </LandingSectionFrame>
  );
}
