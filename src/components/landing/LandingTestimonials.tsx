import { motion } from "framer-motion";
import { CircleHelp, ChevronDown } from "lucide-react";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
  return (
    <section
      id="voices"
      className="scroll-mt-28 border-t border-[hsl(160_25%_28%/0.2)] bg-gradient-to-b from-[hsl(42_40%_99%/0.5)] via-[hsl(42_40%_99%/0.12)] to-transparent py-24 text-foreground sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-[2.35rem] leading-[1.12]">
            Teams that refuse to let Arabic become &ldquo;the messy program.&rdquo;
          </h2>
          <p className="mt-6 text-base leading-relaxed text-foreground/70 sm:text-lg">
            Whether you are scaling a mosque weekend track or a credit-bearing sequence, the bar is the same: learners should feel the beauty of the language—not
            the friction of your operations stack.
          </p>
        </motion.header>

        <div className="mx-auto mt-14 max-w-5xl sm:mt-16 lg:mt-20">
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:gap-x-14 lg:gap-y-12">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.04 + i * 0.04 }}
                className="relative"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[hsl(160_25%_28%/0.14)] bg-[hsl(42_40%_99%/0.55)] text-2xl leading-none text-primary/55"
                    aria-hidden
                  >
                    &ldquo;
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm sm:text-base leading-relaxed text-foreground/75">&ldquo;{t.quote}&rdquo;</p>
                    <div className="mt-5 pt-4 border-t border-[hsl(160_25%_28%/0.12)]">
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="mt-1 text-xs text-foreground/60">{t.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    question: "Is ArabicLearn for schools or individual learners?",
    answer:
      "Both. It’s designed for programs (cohorts, sessions, attendance) while keeping a calm learner view for homework, notes, and what’s next.",
  },
  {
    question: "Does it support Arabic + English in the same UI?",
    answer:
      "Yes. The layout assumes Arabic and Latin appear together—labels, names, and notes—without breaking alignment or readability.",
  },
  {
    question: "Can we start simple and add features later?",
    answer:
      "Yes. Start with scheduling and attendance, then expand into notifications, materials, and deeper tracking when the program is ready.",
  },
];

export function LandingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-[hsl(160_25%_28%/0.2)] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-12">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[hsl(160_34%_28%)]">FAQ</p>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </motion.header>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16 sm:mt-16">
          <div className="lg:col-span-7">
            <div className="divide-y divide-[hsl(160_25%_28%/0.14)]">
              {faqs.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={item.question} className="py-6 sm:py-7">
                    <button
                      type="button"
                      onClick={() => setOpenIndex((prev) => (prev === index ? null : index))}
                      className="w-full text-left"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-0.5 shrink-0">
                          <CircleHelp className="h-6 w-6 text-primary/70" aria-hidden />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm sm:text-base font-semibold text-foreground leading-relaxed">{item.question}</p>
                        </div>
                        <ChevronDown
                          className={[
                            "mt-0.5 h-5 w-5 shrink-0 text-foreground/45 transition-transform duration-300",
                            isOpen ? "rotate-180" : "rotate-0",
                          ].join(" ")}
                          aria-hidden
                        />
                      </div>
                    </button>

                    <div
                      className={[
                        "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      ].join(" ")}
                    >
                      <div className="overflow-hidden">
                        <p className="mt-4 text-sm sm:text-base leading-relaxed text-foreground/70">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5 lg:pt-2">
            <div className="rounded-3xl border border-[hsl(160_25%_28%/0.16)] bg-[hsl(42_40%_99%/0.55)] px-6 py-10 sm:px-10 sm:py-12">
              <div className="mx-auto max-w-md text-center lg:text-left">
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[hsl(160_34%_28%)]">Newsletter</p>
                <h3 className="mt-4 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                  Occasional notes for Arabic programs.
                </h3>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-foreground/70">
                  Product updates, rollout patterns, and calm ops ideas—written for teachers and program leads.
                </p>

                <form className="mt-8 flex flex-col gap-3">
                  <Input
                    type="email"
                    placeholder="Email address"
                    className="h-11 sm:h-12 border-[hsl(160_25%_28%/0.2)] bg-[hsl(42_40%_99%/0.9)] text-foreground placeholder:text-foreground/45"
                  />
                  <Button
                    type="button"
                    className="h-11 sm:h-12 bg-primary text-primary-foreground hover:bg-primary border border-[hsl(160_25%_28%/0.18)]"
                  >
                    Subscribe
                  </Button>
                </form>

                <p className="mt-4 text-xs text-foreground/55">No spam. Unsubscribe anytime.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LandingNewsletter() {
  return (
    <section className="border-t border-[hsl(160_25%_28%/0.2)] py-16 sm:py-18 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-12">
        <div className="rounded-3xl border border-[hsl(160_25%_28%/0.16)] bg-[hsl(42_40%_99%/0.55)] px-6 py-10 sm:px-10 sm:py-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[hsl(160_34%_28%)]">Newsletter</p>
            <h3 className="mt-4 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
              Occasional notes for Arabic programs.
            </h3>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-foreground/70">
              Product updates, rollout patterns, and calm ops ideas—written for teachers and program leads.
            </p>

            <form className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <Input
                type="email"
                placeholder="Email address"
                className="h-11 sm:h-12 sm:w-[360px] border-[hsl(160_25%_28%/0.2)] bg-[hsl(42_40%_99%/0.9)] text-foreground placeholder:text-foreground/45"
              />
              <Button
                type="button"
                className="h-11 sm:h-12 bg-primary text-primary-foreground hover:bg-primary border border-[hsl(160_25%_28%/0.18)]"
              >
                Subscribe
              </Button>
            </form>

            <p className="mt-4 text-xs text-foreground/55">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
