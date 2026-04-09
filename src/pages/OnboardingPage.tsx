import { Link } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <BookOpen className="h-16 w-16 text-primary mx-auto" />
        <h1 className="text-3xl font-bold text-foreground mt-6">Welcome to ArabicLearn!</h1>
        <p className="text-muted-foreground mt-3">You're all set to start your Arabic learning journey. Choose your role to get started.</p>
        <div className="mt-8 space-y-3">
          <Link to="/teacher/dashboard" className="block">
            <Button variant="outline" className="w-full justify-between">I'm a Teacher <ArrowRight className="h-4 w-4" /></Button>
          </Link>
          <Link to="/student/dashboard" className="block">
            <Button variant="outline" className="w-full justify-between">I'm a Student <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
