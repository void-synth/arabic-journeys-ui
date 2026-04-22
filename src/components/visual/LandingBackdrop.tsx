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
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(42_40%_99%/0.32)] via-[hsl(42_40%_99%/0.12)] to-[hsl(42_28%_96%/0.45)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(42_40%_99%/0.18)] via-transparent to-[hsl(42_40%_99%/0.12)]" />
      {/* Gentle vignette so type and glass sit forward */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_45%,transparent_24%,hsl(160_35%_18%/0.06)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[hsl(42_40%_99%/0.35)] to-transparent" />
    </div>
  );
}
