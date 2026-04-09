import { Link } from "react-router-dom";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-background px-4">
    <div className="text-center">
      <FileQuestion className="h-16 w-16 text-muted-foreground mx-auto" />
      <h1 className="text-4xl font-bold text-foreground mt-4">404</h1>
      <p className="text-muted-foreground mt-2">The page you're looking for doesn't exist.</p>
      <Link to="/"><Button className="mt-6">Go Home</Button></Link>
    </div>
  </div>
);

export default NotFound;
