import { motion } from "framer-motion";

const orbits: Record<
  "teacher" | "student" | "admin",
  { cx: string; cy: string; size: string; color: string; duration: number; delay: number }[]
> = {
  teacher: [
    { cx: "15%", cy: "20%", size: "min(55vw, 480px)", color: "hsl(160 45% 78% / 0.55)", duration: 28, delay: 0 },
    { cx: "85%", cy: "15%", size: "min(45vw, 380px)", color: "hsl(38 55% 88% / 0.45)", duration: 32, delay: 2 },
    { cx: "70%", cy: "75%", size: "min(50vw, 420px)", color: "hsl(200 40% 88% / 0.4)", duration: 26, delay: 1 },
  ],
  student: [
    { cx: "80%", cy: "25%", size: "min(50vw, 400px)", color: "hsl(230 42% 88% / 0.45)", duration: 30, delay: 0 },
    { cx: "20%", cy: "70%", size: "min(55vw, 450px)", color: "hsl(168 38% 88% / 0.4)", duration: 27, delay: 1.5 },
    { cx: "50%", cy: "50%", size: "min(60vw, 520px)", color: "hsl(220 30% 92% / 0.35)", duration: 35, delay: 0.5 },
  ],
  admin: [
    { cx: "50%", cy: "10%", size: "min(70vw, 560px)", color: "hsl(220 35% 90% / 0.42)", duration: 34, delay: 0 },
    { cx: "10%", cy: "60%", size: "min(40vw, 360px)", color: "hsl(168 35% 88% / 0.38)", duration: 29, delay: 2 },
    { cx: "90%", cy: "80%", size: "min(45vw, 400px)", color: "hsl(42 48% 88% / 0.4)", duration: 31, delay: 1 },
  ],
};

export function AppAmbientBackground({ variant }: { variant: "teacher" | "student" | "admin" }) {
  const blobs = orbits[variant];

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `linear-gradient(hsl(220 16% 70% / 0.15) 1px, transparent 1px), linear-gradient(90deg, hsl(220 16% 70% / 0.15) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[100px] mix-blend-multiply"
          style={{
            width: b.size,
            height: b.size,
            left: b.cx,
            top: b.cy,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle at 30% 30%, ${b.color}, transparent 65%)`,
          }}
          animate={{
            x: [0, 40, -25, 0],
            y: [0, -35, 20, 0],
            scale: [1, 1.08, 0.95, 1],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: b.delay,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/90" />
    </div>
  );
}
