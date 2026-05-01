import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { BookOpen, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/lib/auth";

export default function VerifyEmailPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [status, setStatus] = useState<"pending" | "verified" | "error">("pending");
  const [message, setMessage] = useState("We sent a verification link to your email. Open it from your inbox to continue.");
  const [resendState, setResendState] = useState<"idle" | "sending">("idle");
  const email = useMemo(() => params.get("email") ?? "", [params]);

  useEffect(() => {
    if (auth.isAuthenticated && auth.userId) {
      setStatus("verified");
      setMessage("Email verification confirmed. Redirecting...");
      const timeout = window.setTimeout(() => {
        if (auth.role === "admin") navigate("/admin/dashboard");
        else if (auth.role === "teacher") navigate("/teacher/dashboard");
        else navigate("/student/dashboard");
      }, 900);
      return () => window.clearTimeout(timeout);
    }
    return undefined;
  }, [auth.isAuthenticated, auth.userId, auth.role, navigate]);

  async function handleResend() {
    if (!supabase) {
      setStatus("error");
      setMessage("Supabase is not configured.");
      return;
    }
    if (!email) {
      setStatus("error");
      setMessage("Missing email. Return to sign-up and try again.");
      return;
    }
    setResendState("sending");
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: `${window.location.origin}/verify-email` },
    });
    setResendState("idle");
    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }
    setStatus("pending");
    setMessage("Verification email resent. Check your inbox (and spam folder).");
  }

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
            {message}
          </p>
          <p className={`mt-2 text-center text-xs ${status === "error" ? "text-rose-600" : "text-emerald-700"}`}>
            {status === "verified" ? "Verified" : status === "error" ? "Needs attention" : "Awaiting verification"}
          </p>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Delivery depends on your Supabase email provider (SMTP) configuration.
          </p>
          <Button variant="outline" className="mt-8 w-full h-11" type="button" onClick={() => void handleResend()} disabled={resendState === "sending"}>
            {resendState === "sending" ? "Sending..." : "Resend email"}
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
