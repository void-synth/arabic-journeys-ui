import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleSendReset() {
    void (async () => {
      setError("");
      setMessage("");
      if (!email.trim()) {
        setError("Enter your email.");
        return;
      }
      if (!supabase) {
        setError("Supabase is not configured.");
        return;
      }
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (resetError) {
        setError(resetError.message);
        return;
      }
      setMessage("Reset email sent. Check your inbox.");
    })();
  }

  return (
    <div className="min-h-screen flex items-center justify-center mesh-bg-public px-4 py-12">
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/15">
              <BookOpen className="h-6 w-6 text-primary" />
            </span>
            <span className="text-2xl font-semibold text-foreground font-display tracking-tight">ArabicLearn</span>
          </Link>
          <p className="text-muted-foreground mt-3 text-sm">Enter your email to receive a reset link.</p>
        </div>
        <div className="surface-panel p-6 sm:p-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" className="h-11" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
          <p className="text-xs text-muted-foreground">
            Email delivery depends on your Supabase email provider settings.
          </p>
          <Button className="w-full h-11 font-semibold" type="button" onClick={handleSendReset}>
            Send reset link
          </Button>
          <div className="text-center">
            <Link to="/login" className="text-sm font-medium text-primary hover:underline underline-offset-4">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
