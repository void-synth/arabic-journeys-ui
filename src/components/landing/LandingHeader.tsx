import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function LandingHeader() {
  return (
    <header className="fixed top-3 sm:top-4 lg:top-6 inset-x-3 sm:inset-x-4 z-50 mx-auto max-w-7xl rounded-2xl border border-white/40 bg-white/30 shadow-[0_8px_40px_-12px_rgba(15,23,42,0.1)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/20">
      <div className="flex h-14 sm:h-[3.75rem] lg:h-16 items-center justify-between px-4 sm:px-5 lg:px-10">
        <Link to="/" className="flex items-center">
          <img src="/logo1.svg" alt="ArabicLearn Logo" className="h-6 sm:h-7 lg:h-8 w-auto" />
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="h-8 px-2.5 sm:h-9 sm:px-3 text-slate-600 hover:bg-white/50 hover:text-slate-900">
              Log in
            </Button>
          </Link>
          <Link to="/login">
            <Button
              size="sm"
              className="h-8 px-2.5 sm:h-9 sm:px-3 border border-white/50 bg-[hsl(160_36%_38%)] text-white shadow-[0_12px_40px_-16px_hsl(160_40%_30%/0.45)] hover:bg-[hsl(160_36%_34%)]"
            >
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
