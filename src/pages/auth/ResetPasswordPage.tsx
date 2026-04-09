import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">ArabicLearn</span>
          </Link>
          <p className="text-muted-foreground mt-2">Create a new password.</p>
        </div>
        <div className="glass-card rounded-xl p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm Password</Label>
            <Input id="confirm" type="password" placeholder="••••••••" />
          </div>
          <Button className="w-full">Reset Password</Button>
          <div className="text-center">
            <Link to="/login" className="text-sm text-primary hover:underline">Back to login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
