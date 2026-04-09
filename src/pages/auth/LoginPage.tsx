import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">ArabicLearn</span>
          </Link>
          <p className="text-muted-foreground mt-2">Welcome back! Sign in to continue.</p>
        </div>
        <div className="glass-card rounded-xl p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-primary hover:underline">Forgot password?</Link>
          </div>
          <Button className="w-full">Sign In</Button>
          <div className="text-center text-sm text-muted-foreground pt-2">
            Demo logins:{" "}
            <Link to="/teacher/dashboard" className="text-primary hover:underline">Teacher</Link>{" · "}
            <Link to="/student/dashboard" className="text-primary hover:underline">Student</Link>{" · "}
            <Link to="/admin/dashboard" className="text-primary hover:underline">Admin</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
