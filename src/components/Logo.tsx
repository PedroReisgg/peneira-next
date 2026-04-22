import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className = "" }: LogoProps) => (
  <Link to="/" className={`group flex items-center gap-2 ${className}`}>
    <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-glow text-primary-foreground transition-transform group-hover:scale-110">
      <Zap className="h-5 w-5" strokeWidth={2.5} />
      <div className="absolute inset-0 rounded-lg bg-primary/40 blur-md -z-10" />
    </div>
    <span className="font-display text-xl font-bold tracking-tight">
      Next<span className="text-gradient-primary">Gen</span>
    </span>
  </Link>
);
