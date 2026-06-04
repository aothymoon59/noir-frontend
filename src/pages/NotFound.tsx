import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <p className="font-display text-[12rem] leading-none font-bold text-gold/30">404</p>
      <h1 className="font-display text-3xl font-bold mt-4">Page not found</h1>
      <p className="text-muted-foreground mt-2 max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild className="mt-6">
        <Link to="/">Back to home</Link>
      </Button>
    </div>
  );
}
