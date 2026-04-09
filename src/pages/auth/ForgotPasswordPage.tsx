import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">ArabicLearn</span>
          </Link>
          <p className="text-muted-foreground mt-2">Enter your email to reset your password.</p>
        </div>
        <div className="glass-card rounded-xl p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <Button className="w-full">Send Reset Link</Button>
          <div className="text-center">
            <Link to="/login" className="text-sm text-primary hover:underline">Back to login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
