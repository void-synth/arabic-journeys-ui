import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { isStudentOnboardingComplete } from "@/lib/studentOnboarding";

export default function SignUpPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!auth.isReady) return;
    if (!auth.isAuthenticated || !auth.role) return;
    if (auth.role === "admin") navigate("/admin/dashboard");
    else if (auth.role === "teacher") navigate("/teacher/dashboard");
    else if (!isStudentOnboardingComplete(auth.userId)) navigate("/onboarding");
    else navigate("/student/dashboard");
  }, [auth.isReady, auth.isAuthenticated, auth.role, auth.userId, navigate]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    void (async () => {
      event.preventDefault();
      setError("");
      setSuccess("");

      if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
        setError("Please fill all fields.");
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
      const result = await auth.signup({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
        role: "student",
      });
      if (result.error) {
        setError(result.error);
        return;
      }
      setSuccess("Account created. Check your inbox for a verification email.");
      navigate(`/verify-email?email=${encodeURIComponent(email.trim().toLowerCase())}`);
    })();
  }

  function handleGoogleSignUp() {
    void (async () => {
      setError("");
      const result = await auth.signInWithGoogle();
      if (result.error) {
        setError(result.error);
      }
    })();
  }

  return (
    <div className="flex min-h-screen items-center justify-center mesh-bg-public px-4 py-12">
      <div className="w-full max-w-[440px]">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/15">
              <BookOpen className="h-6 w-6 text-primary" />
            </span>
            <span className="font-display text-2xl font-semibold tracking-tight text-foreground">ArabicLearn</span>
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">Create your account for ArabicLearn.</p>
        </div>

        <form onSubmit={handleSubmit} className="surface-panel space-y-5 p-6 sm:p-8">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="At least 8 characters"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11"
            />
            <p className="text-xs text-muted-foreground">Use at least 8 characters.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Repeat password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-11"
            />
          </div>

          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          {success ? <p className="text-sm text-emerald-700">{success}</p> : null}

          <Button className="h-11 w-full font-semibold" type="button" variant="outline" onClick={handleGoogleSignUp}>
            Continue with Google
          </Button>
          <Button className="h-11 w-full font-semibold" type="submit">
            Create account
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
