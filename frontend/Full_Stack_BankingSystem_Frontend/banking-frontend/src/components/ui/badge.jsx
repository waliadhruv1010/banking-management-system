import React from "react";
import { cn } from "../../lib/utils";

const variants = {
  default:
    "border-transparent bg-primary/10 text-primary",

  neutral:
    "border-border bg-muted text-muted-foreground",

  positive:
    "border-transparent bg-positive/12 text-positive",

  negative:
    "border-transparent bg-negative/12 text-negative",

  warning:
    "border-transparent bg-amber-500/12 text-amber-600",

  outline:
    "border-border text-foreground",
};

function Badge({
  className,
  variant = "default",
  children,
  ...props
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge };