import { Link, useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth";
import { isStudentOnboardingComplete } from "@/lib/studentOnboarding";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const LOGIN_TIMEOUT_MS = 7000;

  useEffect(() => {
    if (!auth.isReady) return;
    if (!auth.isAuthenticated || !auth.role) return;
    if (auth.role === "admin") navigate("/admin/dashboard");
    else if (auth.role === "student" && !isStudentOnboardingComplete(auth.userId)) navigate("/onboarding");
    else if (auth.role === "student") navigate("/student/dashboard");
    else navigate("/teacher/dashboard");
  }, [auth.isReady, auth.isAuthenticated, auth.role, auth.userId, navigate]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    void (async () => {
      event.preventDefault();
      if (isSubmitting) return;
      setIsSubmitting(true);
      setError("");
      if (!email.trim() || !password.trim()) {
        setError("Enter email and password to continue.");
        setIsSubmitting(false);
        return;
      }
      const result = await Promise.race([
        auth.login(email.trim(), password),
        new Promise<{ error: string }>((resolve) => {
          window.setTimeout(() => {
            resolve({ error: "Sign-in timed out. Please try again." });
          }, LOGIN_TIMEOUT_MS);
        }),
      ]);
      if (result.error) {
        setError(result.error);
        setIsSubmitting(false);
        return;
      }
      if (!result.role) {
        setError("Login succeeded but role is still loading. Please wait a moment.");
      }
      setIsSubmitting(false);
    })();
  }

  function handleGoogleSignIn() {
    void (async () => {
      setError("");
      const result = await auth.signInWithGoogle();
      if (result.error) setError(result.error);
    })();
  }

  return (
    <div className="flex min-h-screen items-center justify-center mesh-bg-public px-4 py-12">
      <div className="w-full max-w-[420px]">
        <div className="mb-10 text-center">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/15">
              <BookOpen className="h-6 w-6 text-primary" />
            </span>
            <span className="font-display text-2xl font-semibold tracking-tight text-foreground">ArabicLearn</span>
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            Sign in with your account.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="surface-panel space-y-5 p-6 sm:p-8">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className="h-11"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              className="h-11"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
              Forgot password?
            </Link>
          </div>
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          <Button className="h-11 w-full font-semibold" type="button" variant="outline" onClick={handleGoogleSignIn} disabled={isSubmitting}>
            Continue with Google
          </Button>
          <Button className="h-11 w-full font-semibold" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link to="/signup" className="font-medium text-primary hover:underline">
              Create account
            </Link>
          </p>
          <div className="space-y-2 pt-1 text-center text-sm leading-relaxed text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">Teacher</span> — sessions, roster (your classes), attendance
            </p>
            <p>
              <span className="font-medium text-foreground">Student</span> — join links, history, your profile
            </p>
            <p>
              <span className="font-medium text-foreground">Admin</span> — all users, sessions, analytics
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
