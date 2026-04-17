import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "canvas" | "mist" | "sage";

const shell: Record<Variant, string> = {
  canvas: "",
  mist: "border-t border-white/55 bg-gradient-to-b from-white/40 via-white/[0.07] to-transparent",
  sage: "border-t border-emerald-900/[0.08] bg-[hsl(160_14%_97%/0.78)]",
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
    <section id={id} className={cn("relative scroll-mt-28 text-slate-900", shell[variant])}>
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
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[hsl(160_34%_28%)]">{eyebrow}</p>
          <h2 className="mt-4 font-display text-[1.65rem] font-medium tracking-tight text-slate-900 sm:text-4xl lg:text-[2.4rem] lg:leading-[1.1]">
            {title}
          </h2>
          <p className="mt-6 text-base leading-[1.65] text-slate-600 sm:text-lg">{lead}</p>
        </motion.header>
        <div className={cn(headerAlign === "center" ? "mt-20 lg:mt-28" : "mt-16 lg:mt-24")}>{children}</div>
      </div>
    </section>
  );
}
