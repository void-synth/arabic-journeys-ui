import { Link, useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, type FormEvent } from "react";
import { useAuth, type DemoRole } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Enter email and password to continue.");
      return;
    }
    const chosenRole: DemoRole = "teacher";
    auth.loginAs(chosenRole);
    navigate("/teacher/dashboard");
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
            Demo login — no server. Sign in to continue.
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
          <Button className="h-11 w-full font-semibold" type="submit">
            Sign in
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
            <p className="pt-2">
              <Link to="/teacher/dashboard" className="font-medium text-primary hover:underline">
                Open teacher dashboard
              </Link>
              {" · "}
              <Link to="/student/dashboard" className="font-medium text-primary hover:underline">
                Open student dashboard
              </Link>
              {" · "}
              <Link to="/admin/dashboard" className="font-medium text-primary hover:underline">
                Open admin dashboard
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
