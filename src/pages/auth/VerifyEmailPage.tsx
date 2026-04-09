import { Link } from "react-router-dom";
import { BookOpen, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm text-center">
        <Link to="/" className="inline-flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-foreground">ArabicLearn</span>
        </Link>
        <div className="glass-card rounded-xl p-8 mt-8">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground mt-4">Check Your Email</h2>
          <p className="text-muted-foreground mt-2 text-sm">We've sent a verification link to your email address. Please click the link to verify your account.</p>
          <Button variant="outline" className="mt-6 w-full">Resend Email</Button>
          <Link to="/login" className="text-sm text-primary hover:underline mt-4 inline-block">Back to login</Link>
        </div>
      </div>
    </div>
  );
}
