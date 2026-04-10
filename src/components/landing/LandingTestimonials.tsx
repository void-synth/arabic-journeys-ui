import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Finally a shell that feels as intentional as the language we teach — calm, luminous, and serious about craft.",
    name: "Amira K.",
    role: "Program Director, Bayt Al-Lugha",
  },
  {
    quote: "The product story reads in seconds: this is a platform, not a weekend experiment.",
    name: "James R.",
    role: "Founder, LinguaNova",
  },
  {
    quote: "Bilingual presentation done with restraint. That matters when you’re building trust in MENA edtech.",
    name: "Leila M.",
    role: "GP, Desert Bloom Capital",
  },
];

export function LandingTestimonials() {
  return (
    <section className="border-y border-white/40 bg-[hsl(42_24%_96%)] py-24 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-3xl text-[hsl(220_20%_18%)] sm:text-4xl">Soft proof, until yours arrives</h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-slate-600">Placeholder voices — trade for logos and scores when you&apos;re ready.</p>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col rounded-2xl border border-white/55 bg-white/75 p-6 shadow-[0_20px_56px_-28px_rgba(15,23,42,0.12)] backdrop-blur-sm"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 border-t border-slate-200 pt-4">
                <p className="font-semibold text-slate-900">{t.name}</p>
                <p className="text-xs text-slate-500">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
