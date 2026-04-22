import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function LandingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-3 sm:top-4 lg:top-6 z-50 mx-auto rounded-2xl border border-[hsl(160_25%_28%/0.18)] bg-[hsl(42_40%_99%/0.55)] shadow-[0_8px_40px_-12px_hsl(160_35%_18%/0.1)] backdrop-blur-xl supports-[backdrop-filter]:bg-[hsl(42_40%_99%/0.45)] transition-all duration-300",
        "inset-x-3 sm:inset-x-4 max-w-7xl",
        isScrolled ? "lg:inset-x-16 lg:max-w-4xl" : "",
      ].join(" ")}
    >
      <div
        className={[
          "flex h-14 sm:h-[3.75rem] lg:h-16 items-center justify-between transition-[padding] duration-300",
          isScrolled ? "px-3 sm:px-5 lg:px-8" : "px-3 sm:px-5 lg:px-10",
        ].join(" ")}
      >
        <Link to="/" className="flex min-w-0 items-center">
          <img
            src="/logo1.svg"
            alt="ArabicLearn Logo"
            className="h-6 sm:h-7 lg:h-8 w-auto max-w-[120px] sm:max-w-[160px] lg:max-w-none object-contain"
          />
        </Link>

        <nav
          className={[
            "hidden lg:flex items-center justify-center gap-7 text-[11px] font-semibold uppercase tracking-[0.32em] text-foreground/60 transition-all duration-300",
            isScrolled ? "opacity-0 pointer-events-none -translate-y-1" : "opacity-100 translate-y-0",
          ].join(" ")}
          aria-label="Primary"
        >
          <a href="#script-lineage" className="hover:text-foreground">
            Script
          </a>
          <a href="#cohort-calendar" className="hover:text-foreground">
            Cohorts
          </a>
          <a href="#voice-hybrid" className="hover:text-foreground">
            Hybrid
          </a>
          <a href="#pathways-people" className="hover:text-foreground">
            Pathways
          </a>
          <a href="#operating-truth" className="hover:text-foreground">
            Ops
          </a>
          <a href="#voices" className="hover:text-foreground">
            Voices
          </a>
          <a href="#start" className="hover:text-foreground">
            Start
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link to="/login">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2.5 sm:h-9 sm:px-3 text-foreground/70 hover:bg-[hsl(42_40%_99%/0.7)] hover:text-foreground"
            >
              Log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              size="sm"
              className="h-8 px-2.5 sm:h-9 sm:px-3 border border-[hsl(160_25%_28%/0.18)] bg-primary text-primary-foreground shadow-[0_12px_40px_-16px_hsl(160_40%_30%/0.45)] hover:bg-primary"
            >
              signup
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
