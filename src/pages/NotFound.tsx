import { Link } from "react-router-dom";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center mesh-bg-public px-4 py-16">
    <div className="text-center max-w-md">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-muted ring-1 ring-border mb-6">
        <FileQuestion className="h-8 w-8 text-muted-foreground" />
      </div>
      <h1 className="text-4xl font-semibold text-foreground font-display">404</h1>
      <p className="text-muted-foreground mt-3 leading-relaxed">This route isn&apos;t mapped. Double-check the URL or return to the landing page.</p>
      <Link to="/">
        <Button className="mt-8 rounded-xl px-8" type="button">
          Go home
        </Button>
      </Link>
    </div>
  </div>
);

export default NotFound;
