import { motion } from "framer-motion";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

const testimonials = [
  {
    quote:
      "Our weekend school runs on volunteer energy. ArabicLearn cut the WhatsApp chaos—parents know the room, the time, and when their child missed fus-ha review.",
    name: "Yasmin A.",
    role: "Weekend school principal",
  },
  {
    quote:
      "We teach diplomats and heritage teens in the same building. Separate cohorts, shared admin—finally one place that respects Arabic typography everywhere.",
    name: "Omar H.",
    role: "MSA program coordinator",
  },
  {
    quote:
      "Attendance used to live in one tool, readings in another, Zoom links in a third. Teachers say they reclaimed two hours a week for actual instruction.",
    name: "Dr. Lina M.",
    role: "University language institute lead",
  },
  {
    quote:
      "The learner view is calm: next session, last feedback, what to rehearse aloud. That clarity alone improved completion on our intensive summer track.",
    name: "Noor S.",
    role: "Online academy founder",
  },
];

export function LandingTestimonials() {
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section
      id="voices"
      className="scroll-mt-28 border-t border-white/55 bg-gradient-to-b from-[hsl(160_12%_98%/0.65)] via-white/20 to-transparent py-24 text-slate-900 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[hsl(160_34%_28%)]">Section VI — Voices from the field</p>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-[hsl(220_20%_18%)] sm:text-4xl lg:text-[2.35rem] leading-[1.12]">
            Teams that refuse to let Arabic become &ldquo;the messy program.&rdquo;
          </h2>
          <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
            Whether you are scaling a mosque weekend track or a credit-bearing sequence, the bar is the same: learners should feel the beauty of the language—not
            the friction of your operations stack.
          </p>
        </motion.header>

        <div className="relative mt-16 overflow-hidden sm:mt-20 lg:mt-24">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[hsl(160_12%_98%/0.95)] to-transparent sm:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[hsl(160_12%_98%/0.95)] to-transparent sm:w-20" />
          <div className="marquee-track flex w-max gap-5 sm:gap-6">
            {marqueeItems.map((t, i) => (
              <Card
                key={`${t.name}-${i}`}
                className="w-[300px] shrink-0 rounded-[1.35rem] border-white/70 bg-white/90 shadow-[0_20px_50px_-32px_rgba(15,23,42,0.18)] sm:w-[320px] lg:w-[340px]"
              >
                <CardContent className="p-6 sm:p-7">
                  <CardDescription className="text-sm leading-relaxed text-slate-700">&ldquo;{t.quote}&rdquo;</CardDescription>
                  <div className="mt-6 border-t border-slate-200/80 pt-5">
                    <CardTitle className="text-base font-semibold text-slate-900">{t.name}</CardTitle>
                    <p className="mt-1 text-xs text-slate-500">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
