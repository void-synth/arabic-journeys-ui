import { motion } from "framer-motion";
import { CalendarRange, UsersRound } from "lucide-react";
import { LandingSectionFrame } from "./LandingSectionFrame";

export function LandingCohortCalendarSection() {
  return (
    <LandingSectionFrame
      id="cohort-calendar"
      variant="canvas"
      headerAlign="center"
      eyebrow="Section II — Cohort & calendar"
      title={<>The week, choreographed—not improvised in chat apps.</>}
      lead="Arabic schools do not fail on passion. They fail on drift: links in one thread, attendance in another, parents guessing which door. This section is only about the rhythm of showing up—two cards, two decisions, nothing else competing for attention."
    >
      <div className="mx-auto grid max-w-5xl gap-16 lg:grid-cols-2 lg:gap-20 xl:gap-24">
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="group relative"
        >
          <div
            className="relative min-h-[400px] overflow-hidden border border-white/50 bg-slate-900/5 shadow-[0_28px_70px_-36px_rgba(15,23,42,0.35)] ring-1 ring-slate-900/[0.04] transition-shadow duration-500 group-hover:shadow-[0_36px_80px_-32px_rgba(15,23,42,0.4)] lg:min-h-[460px]"
            style={{ borderRadius: "2.75rem" }}
          >
            <img
              src="/landing-journey-cohort-sessions.jpg"
              alt="Learners in a cohort session around a table"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/88 via-slate-950/35 to-transparent" />
            <div className="relative flex h-full min-h-[400px] flex-col justify-end p-8 sm:p-10 lg:min-h-[460px]">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/90 backdrop-blur-sm">
                <UsersRound className="h-3.5 w-3.5" aria-hidden />
                Cohort surface
              </div>
              <h3 className="font-display text-2xl text-white sm:text-3xl">Same level, same story</h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/85">
                When pacing is visible, tutors stop apologizing for “where we are in the book.” Families see a single arc: listening, roots, review—not a pile
                of disconnected handouts.
              </p>
            </div>
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="group relative lg:mt-14"
        >
          <div
            className="relative min-h-[400px] overflow-hidden border border-white/50 bg-slate-900/5 shadow-[0_28px_70px_-36px_rgba(15,23,42,0.35)] ring-1 ring-slate-900/[0.04] transition-shadow duration-500 group-hover:shadow-[0_36px_80px_-32px_rgba(15,23,42,0.4)] lg:min-h-[460px]"
            style={{ borderRadius: "0.85rem 3.25rem 2.25rem 3rem" }}
          >
            <img
              src="/landing-journey-operations-planning.jpg"
              alt="Team coordinating schedules and program logistics"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/88 via-slate-950/30 to-slate-950/10" />
            <div className="relative flex h-full min-h-[400px] flex-col justify-end p-8 sm:p-10 lg:min-h-[460px]">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/90 backdrop-blur-sm">
                <CalendarRange className="h-3.5 w-3.5" aria-hidden />
                Time & place
              </div>
              <h3 className="font-display text-2xl text-white sm:text-3xl">Ramadan-aware, timezone-honest</h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/85">
                Sessions carry the context admins actually need: who teaches, which room or link, and what “attended” means for your policy—without turning the
                calendar into a second full-time job.
              </p>
            </div>
          </div>
        </motion.article>
      </div>
    </LandingSectionFrame>
  );
}
