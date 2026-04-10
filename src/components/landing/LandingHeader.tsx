import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function LandingHeader() {
  return (
    <header className="fixed top-6 inset-x-4 z-50 mx-auto max-w-7xl rounded-2xl border border-white/40 bg-white/30 shadow-[0_8px_40px_-12px_rgba(15,23,42,0.1)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/20">
      <div className="flex h-16 items-center justify-between px-6 lg:px-10">
        <Link to="/" className="flex items-center">
          <img src="/logo1.svg" alt="ArabicLearn Logo" className="h-8 w-auto" />
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-slate-600 hover:bg-white/50 hover:text-slate-900">
              Log in
            </Button>
          </Link>
          <Link to="/login">
            <Button
              size="sm"
              className="border border-white/50 bg-[hsl(160_36%_38%)] text-white shadow-[0_12px_40px_-16px_hsl(160_40%_30%/0.45)] hover:bg-[hsl(160_36%_34%)]"
            >
              signup NIGGA
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
