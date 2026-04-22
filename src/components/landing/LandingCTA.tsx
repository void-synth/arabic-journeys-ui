import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function LandingCTA() {
  return (
    <section
      id="start"
      className="scroll-mt-28 border-t border-[hsl(160_25%_28%/0.2)] bg-gradient-to-b from-transparent to-[hsl(42_40%_99%/0.45)] py-24 sm:py-28 lg:py-32"
    >
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Bring every Arabic journey into one calm surface.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg">
            Start with the experience your teachers and learners deserve today. When you are ready, wire in your real cohorts, branding, and reporting—without
            rewriting the story of how your program teaches Arabic.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: 0.06 }}
          className="mt-12 flex flex-wrap justify-center gap-3 sm:mt-14 sm:gap-4"
        >
          <Link to="/login">
            <Button
              size="lg"
              className="h-11 rounded-full border border-[hsl(160_25%_28%/0.18)] bg-[hsl(42_40%_99%/0.92)] px-8 text-base font-semibold text-foreground shadow-[0_24px_60px_-28px_hsl(160_35%_18%/0.18)] hover:bg-[hsl(42_40%_99%/0.98)] sm:h-12 sm:px-10"
            >
              Enter the app
            </Button>
          </Link>
          <Link to="/onboarding">
            <Button
              size="lg"
              variant="outline"
              className="h-11 rounded-full border-[hsl(160_25%_28%/0.22)] bg-[hsl(42_40%_99%/0.55)] px-8 text-base text-foreground shadow-sm backdrop-blur-sm hover:bg-[hsl(42_40%_99%/0.85)] sm:h-12 sm:px-10"
            >
              Explore by role
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
