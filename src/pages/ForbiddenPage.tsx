import { Link } from "react-router-dom";
import { ShieldX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center mesh-bg-public px-4 py-16">
      <div className="text-center max-w-md">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 ring-1 ring-destructive/20 mb-6">
          <ShieldX className="h-8 w-8 text-destructive" />
        </div>
        <h1 className="text-4xl font-semibold text-foreground font-display">403</h1>
        <p className="text-muted-foreground mt-3 leading-relaxed">You don&apos;t have permission to view this area. This is a static message — no role checks run in the client.</p>
        <Link to="/">
          <Button className="mt-8 rounded-xl px-8" type="button">
            Go home
          </Button>
        </Link>
      </div>
    </div>
  );
}
