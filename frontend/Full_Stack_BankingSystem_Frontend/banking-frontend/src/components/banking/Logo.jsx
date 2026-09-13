import { cn } from "../../lib/utils";

export function Logo({
  className,
  showWordmark = true,
  tone = "default",
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "grid size-9 place-items-center rounded-xl",
          tone === "inverted"
            ? "bg-white/10 text-white ring-1 ring-white/20"
            : "bg-primary text-primary-foreground"
        )}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 21h18" />
          <path d="M5 21V10l7-5 7 5v11" />
          <path d="M9 21v-6h6v6" />
        </svg>
      </span>

      {showWordmark ? (
        <span
          className={cn(
            "text-lg font-semibold tracking-tight",
            tone === "inverted"
              ? "text-white"
              : "text-foreground"
          )}
        >
          Banking System
        </span>
      ) : (
        <span className="sr-only">
          Banking System
        </span>
      )}
    </span>
  );
}