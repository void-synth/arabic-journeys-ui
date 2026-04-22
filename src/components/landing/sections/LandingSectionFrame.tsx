import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "canvas" | "mist" | "sage";

const shell: Record<Variant, string> = {
  canvas: "",
  mist: "border-t border-[hsl(160_25%_28%/0.2)] bg-gradient-to-b from-[hsl(42_40%_99%/0.5)] via-[hsl(42_40%_99%/0.12)] to-transparent",
  sage: "border-t border-[hsl(160_25%_28%/0.18)] bg-[hsl(42_28%_97%/0.78)]",
};

export function LandingSectionFrame({
  id,
  eyebrow,
  title,
  lead,
  variant = "canvas",
  headerAlign = "left",
  children,
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  lead: string;
  variant?: Variant;
  headerAlign?: "left" | "center";
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("relative scroll-mt-28 text-foreground", shell[variant])}>
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-12 lg:py-32">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "max-w-3xl",
            headerAlign === "center" && "mx-auto text-center",
          )}
        >
          <h2 className="mt-4 font-display text-[1.65rem] font-medium tracking-tight text-foreground sm:text-4xl lg:text-[2.4rem] lg:leading-[1.1]">
            {title}
          </h2>
          <p className="mt-6 text-base leading-[1.65] text-foreground/70 sm:text-lg">{lead}</p>
        </motion.header>
        <div className={cn(headerAlign === "center" ? "mt-20 lg:mt-28" : "mt-16 lg:mt-24")}>{children}</div>
      </div>
    </section>
  );
}
