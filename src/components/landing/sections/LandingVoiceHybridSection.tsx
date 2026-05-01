import { motion } from "framer-motion";
import { Headphones, MonitorSmartphone } from "lucide-react";
import { LandingSectionFrame } from "./LandingSectionFrame";

export function LandingVoiceHybridSection() {
  return (
    <LandingSectionFrame
      id="voice-hybrid"
      variant="sage"
      eyebrow="Section III — Voice & hybrid"
      title={<>Speaking deserves a room of its own—online or in the hall.</>}
      lead="Fus-ha lives in the mouth and ear as much as the page. Hybrid programs should not punish learners for choosing distance: the same dignity, the same feedback loop, the same expectation of rehearsal between sessions."
    >
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20 xl:gap-24">
        <div className="flex w-full flex-col gap-12 sm:gap-14">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="group relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none"
          >
            <div
              className="relative aspect-square overflow-hidden border border-[hsl(160_25%_28%/0.18)] bg-[hsl(42_40%_99%/0.35)] shadow-[0_24px_60px_-34px_hsl(160_35%_18%/0.35)]"
              style={{ borderRadius: "58% 42% 48% 52% / 48% 38% 62% 52%" }}
            >
              <img
                src="/landing-journey-peer-study.jpg"
                alt="Learners in conversation practice at a table"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(160_35%_18%/0.82)] via-transparent to-[hsl(160_35%_18%/0.18)]" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[hsl(42_40%_99%/0.82)]">
                  <Headphones className="h-3.5 w-3.5" aria-hidden />
                  Pair & circle
                </div>
                <p className="text-sm font-medium leading-relaxed text-[hsl(42_40%_99%)]">
                  Rotating partners, clear prompts, feedback that sounds like Arabic class—not a video call.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="mx-auto w-full max-w-xl border-t-2 border-[hsl(160_25%_28%/0.2)] pt-5 sm:border-t-0 sm:border-l-2 sm:pt-0 sm:pl-6 lg:mx-0 lg:max-w-none lg:pl-8">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-foreground/70">Engineering note</p>
            <p className="mt-3 text-base leading-relaxed text-foreground/70">
              Layouts assume you will mix Arabic and Latin in the same view—labels, error text, and session titles—without breaking alignment or embarrassing
              RTL truncation in front of parents.
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55 }}
          className="group relative min-w-0 mx-auto w-full max-w-2xl lg:max-w-none"
        >
          <div
            className="relative aspect-[16/11] w-full overflow-hidden border border-[hsl(160_25%_28%/0.18)] bg-[hsl(42_40%_99%/0.4)] shadow-[0_36px_85px_-40px_hsl(160_35%_18%/0.42)] lg:aspect-[5/3]"
            style={{ borderRadius: "4rem 1.25rem 3.5rem 1.25rem" }}
          >
            <img
              src="/landing-journey-hybrid-online.jpg"
              alt="Learner following Arabic instruction on a laptop"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(160_35%_18%/0.78)] via-[hsl(160_35%_18%/0.22)] to-transparent" />
            <div className="absolute left-8 top-8 flex items-center gap-2 rounded-full border border-[hsl(42_40%_99%/0.3)] bg-[hsl(160_35%_18%/0.25)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[hsl(42_40%_99%)] backdrop-blur-md sm:left-10 sm:top-10">
              <MonitorSmartphone className="h-3.5 w-3.5" aria-hidden />
              Hybrid spine
            </div>
            <p className="absolute bottom-8 left-8 right-8 max-w-lg font-display text-lg italic leading-snug text-[hsl(42_40%_99%/0.96)] sm:bottom-10 sm:left-10 sm:text-xl">
              One thread for the link, the recording policy, and who still owes a listening pass—so teachers teach instead of detective work.
            </p>
          </div>
        </motion.div>
      </div>
    </LandingSectionFrame>
  );
}
