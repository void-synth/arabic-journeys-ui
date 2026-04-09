/**
 * Full-bleed landing photography — high-key marble colonnade.
 * Light veils keep copy legible without losing the airy, milky mood.
 */
export function LandingBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 bg-cover bg-[center_35%] bg-no-repeat"
        style={{ backgroundImage: "url('/landing-page-bg.jpg')" }}
      />
      {/* Milky luminosity — soft vertical read, preserves floor reflection */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/20 to-[hsl(42_28%_96%/0.92)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/35 via-transparent to-white/25" />
      {/* Gentle vignette so type and glass sit forward */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_45%,transparent_20%,hsl(220_15%_18%/0.12)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-white/60 to-transparent" />
    </div>
  );
}
