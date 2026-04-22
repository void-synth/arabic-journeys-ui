import { Link } from "react-router-dom";

export function LandingFooter() {
  return (
    <footer className="border-t border-[hsl(160_25%_28%/0.2)] bg-[hsl(42_28%_97%)] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <Link to="/" className="flex items-center">
            <img src="/logo1.svg" alt="ArabicLearn Logo" className="h-8 w-auto" />
          </Link>

          <nav className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] font-medium uppercase tracking-[0.28em] text-foreground/60">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <Link to="/login" className="hover:text-foreground">
              Log in
            </Link>
            <Link to="/login" className="hover:text-foreground">
              Sign up
            </Link>
          </nav>

          <div className="mt-10 h-px w-full max-w-4xl bg-[hsl(160_25%_28%/0.12)]" />

          <p className="mt-6 text-sm text-foreground/60">© 2026 ArabicLearn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
