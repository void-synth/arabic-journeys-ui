import { Link } from "react-router-dom";
import { ShieldX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center">
        <ShieldX className="h-16 w-16 text-destructive mx-auto" />
        <h1 className="text-4xl font-bold text-foreground mt-4">403</h1>
        <p className="text-muted-foreground mt-2">You don't have permission to access this page.</p>
        <Link to="/"><Button className="mt-6">Go Home</Button></Link>
      </div>
    </div>
  );
}
