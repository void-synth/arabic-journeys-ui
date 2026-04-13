import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

const testimonials = [
  {
    quote: "We replaced three separate tools with one workflow, and our teachers spend more time teaching than coordinating.",
    name: "Amira K",
    role: "Program Director",
  },
  {
    quote: "The onboarding path is clear for every role. New team members become productive in days, not weeks.",
    name: "James R",
    role: "Operations Lead",
  },
  {
    quote: "Attendance, scheduling, and communication are finally in sync. It feels designed for how language programs actually run.",
    name: "Leila M",
    role: "Academic Coordinator",
  },
];

export function LandingTestimonials() {
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section className="border-y border-white/50 py-14 sm:py-16 md:py-20 lg:py-24 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-2xl sm:text-3xl lg:text-4xl text-[hsl(220_20%_18%)]">Trusted by teams building modern Arabic learning.</h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-slate-600">What institutions value most: clarity, adoption speed, and dependable classroom flow.</p>
        <div className="relative mt-8 sm:mt-10 lg:mt-14 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[hsl(42_24%_96%)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[hsl(42_24%_96%)] to-transparent" />
          <div className="marquee-track flex w-max gap-4">
            {marqueeItems.map((t, i) => (
              <Card key={`${t.name}-${i}`} className="w-[280px] sm:w-[300px] lg:w-[320px] rounded-2xl border-white/70 bg-white/85 shadow-none">
                <CardContent className="p-4 sm:p-5">
                  <CardDescription className="text-sm leading-relaxed text-slate-700">&ldquo;{t.quote}&rdquo;</CardDescription>
                  <div className="mt-5 border-t border-slate-200/80 pt-4">
                    <CardTitle className="text-base font-semibold text-slate-900">{t.name}</CardTitle>
                    <p className="text-xs text-slate-500">{t.role}</p>
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
