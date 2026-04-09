import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
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
          <p className="text-muted-foreground mt-3 text-sm">Choose a new password (frontend mock).</p>
        </div>
        <div className="surface-panel p-6 sm:p-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="password">New password</Label>
            <Input id="password" type="password" placeholder="••••••••" className="h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm password</Label>
            <Input id="confirm" type="password" placeholder="••••••••" className="h-11" />
          </div>
          <Button className="w-full h-11 font-semibold" type="button">
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
