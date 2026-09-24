import React from "react";
import { cn } from "../../lib/utils";

export const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", children, ...props }, ref) => {
    const variants = {
      default:
        "bg-primary-container hover:bg-primary-container/90 text-white shadow-md active:scale-98 transition-all duration-150",
      primary:
        "bg-gradient-to-r from-[#6366F1] to-[#4F46E5] hover:brightness-110 text-white shadow-[0_4px_14px_0_rgba(99,102,241,0.35)] shadow-inner active:scale-98 transition-all duration-150",
      secondary:
        "bg-surface-container-high/70 hover:bg-surface-container-highest text-on-surface border border-white/10 hover:border-white/20 transition-all",
      outline:
        "border border-white/10 bg-transparent hover:bg-white/5 text-on-surface transition-all",
      ghost:
        "hover:bg-surface-container-high/60 text-on-surface-variant hover:text-on-surface transition-colors",
      destructive:
        "bg-error-container/20 text-error hover:bg-error-container/40 border border-error/20 transition-colors",
      danger:
        "bg-red-600 hover:bg-red-700 text-white shadow-md transition-colors",
      success:
        "bg-secondary/15 text-secondary border border-secondary/30 hover:bg-secondary/25 transition-colors",
    };

    const sizes = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-12 rounded-lg px-6 text-base",
      icon: "h-9 w-9 p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

