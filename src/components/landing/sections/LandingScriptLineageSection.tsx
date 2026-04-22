import { motion } from "framer-motion";
import { LandingSectionFrame } from "./LandingSectionFrame";

export function LandingScriptLineageSection() {
  return (
    <LandingSectionFrame
      id="script-lineage"
      variant="mist"
      eyebrow="Section I — Script & lineage"
      title={<>Where the pen meets purpose, not just pixels.</>}
      lead="Arabic programs win or lose on respect for the script: harakat, joins, and the cultural weight behind them. This band is about literacy as inheritance—before dashboards, before attendance—so learners know they are inside a living tradition."
    >
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20 xl:gap-24">
        <div className="space-y-6 text-base leading-relaxed text-foreground/70 lg:pr-6">
          <p>
            Weekend schools, institutes, and online academies all share one fragile moment: a learner realizes Arabic is neither decorative nor optional. When
            that happens, your materials should feel curated—manuscripts, calligraphy, and close reading—not like a generic LMS skin.
          </p>
          <p className="text-foreground/80">
            ArabicLearn keeps that lineage legible in the product language: bilingual surfaces, RTL that does not fight Latin glosses, and session flows that
            assume teachers will move between sound, script, and meaning in a single hour.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div
            className="relative min-h-[400px] overflow-hidden border border-[hsl(160_25%_28%/0.18)] bg-[hsl(42_40%_99%/0.35)] shadow-[0_32px_90px_-40px_hsl(160_35%_18%/0.38)] lg:min-h-[540px]"
            style={{
              borderRadius: "3.25rem 0.75rem 3.5rem 2rem",
            }}
          >
            <img
              src="/landing-journey-heritage-text.jpg"
              alt="Illuminated Arabic manuscript with gold script"
              className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[hsl(160_35%_18%/0.82)] via-[hsl(160_35%_18%/0.28)] to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_100%,hsl(160_30%_12%/0.5),transparent)]" />
            <div className="relative flex h-full min-h-[400px] flex-col justify-end p-8 sm:p-10 lg:min-h-[540px] lg:p-12">
              <p className="max-w-md font-display text-xl italic leading-snug text-[hsl(42_40%_99%/0.96)] sm:text-2xl">
                “We teach children that every line has memory—then we ask software not to erase that seriousness.”
              </p>
              <p className="mt-6 text-xs font-medium uppercase tracking-widest text-[hsl(42_40%_99%/0.6)]">Literacy spine · manuscript-forward programs</p>
            </div>
          </div>
        </motion.div>
      </div>
    </LandingSectionFrame>
  );
}
