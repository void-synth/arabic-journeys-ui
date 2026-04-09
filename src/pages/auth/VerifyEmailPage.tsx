import { Link } from "react-router-dom";
import { BookOpen, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center mesh-bg-public px-4 py-12">
      <div className="w-full max-w-[420px] text-center">
        <Link to="/" className="inline-flex items-center gap-2.5">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/15">
            <BookOpen className="h-6 w-6 text-primary" />
          </span>
          <span className="text-2xl font-semibold text-foreground font-display tracking-tight">ArabicLearn</span>
        </Link>
        <div className="surface-panel p-8 sm:p-10 mt-10 text-left">
          <div className="h-14 w-14 rounded-2xl bg-primary/10 ring-1 ring-primary/15 flex items-center justify-center mx-auto">
            <Mail className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground font-display text-center mt-6">Check your inbox</h2>
          <p className="text-muted-foreground mt-3 text-sm text-center leading-relaxed">
            We&apos;ve sent a verification link to your email. This screen is static — no message is actually sent.
          </p>
          <Button variant="outline" className="mt-8 w-full h-11" type="button">
            Resend email
          </Button>
          <div className="text-center mt-6">
            <Link to="/login" className="text-sm font-medium text-primary hover:underline underline-offset-4">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
