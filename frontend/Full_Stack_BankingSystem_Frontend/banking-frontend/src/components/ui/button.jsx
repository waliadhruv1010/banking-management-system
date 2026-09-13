import React from "react";
import { cn } from "../../lib/utils";

const variants = {
  default:
    "bg-primary text-primary-foreground hover:bg-primary/90",

  destructive:
    "bg-destructive text-white hover:bg-destructive/90",

  outline:
    "border border-border bg-background hover:bg-muted",

  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80",

  ghost:
    "hover:bg-muted hover:text-foreground",

  link:
    "text-primary underline-offset-4 hover:underline",
};

const sizes = {
  default: "h-8 px-3 py-2",
  sm: "h-7 px-2.5 text-sm",
  lg: "h-9 px-4",
  icon: "size-8",
  "icon-sm": "size-7",
  "icon-lg": "size-9",
};

function Button({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-50",
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

export { Button };