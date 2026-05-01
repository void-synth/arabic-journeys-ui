import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isRecoveryReady, setIsRecoveryReady] = useState(false);

  useEffect(() => {
    void (async () => {
      if (!supabase) {
        setError("Supabase is not configured.");
        return;
      }
      const { data } = await supabase.auth.getSession();
      if (!data.session?.user) {
        setError("Reset link is invalid or expired. Request a new password reset email.");
        return;
      }
      setIsRecoveryReady(true);
    })();
  }, []);

  function handleResetPassword() {
    void (async () => {
      setError("");
      setMessage("");
      if (!password || !confirmPassword) {
        setError("Fill both password fields.");
        return;
      }
      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (!supabase) {
        setError("Supabase is not configured.");
        return;
      }
      if (!isRecoveryReady) {
        setError("Reset link is invalid or expired. Request a new password reset email.");
        return;
      }
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        setError(updateError.message);
        return;
      }
      setMessage("Password reset successful. You can now log in.");
      setPassword("");
      setConfirmPassword("");
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
          <p className="text-muted-foreground mt-3 text-sm">Choose your new password.</p>
        </div>
        <div className="surface-panel p-6 sm:p-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="password">New password</Label>
            <Input id="password" type="password" placeholder="••••••••" className="h-11" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm password</Label>
            <Input id="confirm" type="password" placeholder="••••••••" className="h-11" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
          <p className="text-xs text-muted-foreground">
            Password reset requires the active recovery session from your reset email link.
          </p>
          <Button className="w-full h-11 font-semibold" type="button" onClick={handleResetPassword} disabled={!isRecoveryReady}>
            Reset password
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
