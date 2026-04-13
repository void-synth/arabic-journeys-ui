import { motion } from "framer-motion";
import { Video, Users, BarChart3, Plug } from "lucide-react";

const features = [
  {
    icon: Video,
    title: "Live sessions built for Arabic delivery",
    desc: "Run classes with clear layouts for reading, listening, and participation so learners stay focused from start to finish.",
    image: "/live-session.jpg",
  },
  {
    icon: Users,
    title: "Purpose-built views for every role",
    desc: "Teachers, learners, and admins each see what matters to them, reducing confusion and daily friction.",
    image: "/purpose-view.jpg",
  },
  {
    icon: BarChart3,
    title: "Progress signals you can act on",
    desc: "Track attendance and cohort movement with dashboards designed to support intervention and planning.",
    image: "/progress.jpg",
  },
  {
    icon: Plug,
    title: "Built to scale with your program",
    desc: "From small cohorts to multi-teacher academies, keep operations consistent as your Arabic learning community grows.",
    image: "/scale-program.jpg",
  },
];

export function LandingFeatures() {
  return (
    <section className="relative py-14 sm:py-16 md:py-20 lg:py-24 text-slate-900">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[hsl(220_20%_18%)]">Everything your Arabic program needs, in one place.</h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
            From classroom delivery to operations reporting, the platform keeps teaching quality and team alignment in the same workflow.
          </p>
        </motion.div>

        <div className="mt-8 sm:mt-10 lg:mt-14 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="group"
            >
              <div
                className="relative h-[320px] sm:h-[360px] md:h-[400px] lg:h-[420px] overflow-hidden rounded-3xl bg-cover bg-center transition-all duration-300 group-hover:-translate-y-1"
                style={{ backgroundImage: `url('${f.image}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/20 to-black/80" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <div className="mb-2 sm:mb-3 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-md">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="feature-title-single-line font-display text-md leading-tight text-white">{f.title}</h3>
                  <p className="feature-desc-three-lines mt-2 text-xs leading-relaxed text-white/85">{f.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
