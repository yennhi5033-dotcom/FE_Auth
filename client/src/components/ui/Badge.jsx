import React from "react";
import { cn } from "../../lib/utils";

export function Badge({ className, variant = "default", children, ...props }) {
  const variants = {
    default: "bg-surface-container-high text-on-surface-variant border-white/10",
    primary: "bg-primary/15 text-primary border-primary/25",
    secondary: "bg-secondary/15 text-secondary border-secondary/30",
    error: "bg-error-container/25 text-error border-error/30",
    warning: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    outline: "text-on-surface border-white/10 bg-transparent",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider transition-colors select-none",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

