import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
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
            Demo login — no server. Use the links below to open each role&apos;s workspace.
          </p>
        </div>
        <div className="surface-panel space-y-5 p-6 sm:p-8">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" autoComplete="email" className="h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" autoComplete="current-password" className="h-11" />
          </div>
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
              Forgot password?
            </Link>
          </div>
          <Button className="h-11 w-full font-semibold" type="button">
            Sign in
          </Button>
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
                Open teacher
              </Link>
              {" · "}
              <Link to="/student/dashboard" className="font-medium text-primary hover:underline">
                Open student
              </Link>
              {" · "}
              <Link to="/admin/dashboard" className="font-medium text-primary hover:underline">
                Open admin
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
