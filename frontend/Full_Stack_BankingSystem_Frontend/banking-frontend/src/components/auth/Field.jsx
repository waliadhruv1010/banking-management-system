import {
  forwardRef,
  useId,
  useState,
} from "react";

import {
  AlertCircle,
  Check,
  Eye,
  EyeOff,
} from "lucide-react";

import { cn } from "../../lib/utils";

const baseInput =
  "h-11 w-full rounded-lg border bg-card px-3 text-sm text-foreground shadow-xs outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50";

export const Field = forwardRef(function Field(
  {
    label,
    icon,
    error,
    valid,
    className,
    id,
    ...props
  },
  ref
) {
  const generatedId = useId();

  const fieldId = id ?? generatedId;

  const describedBy = error
    ? `${fieldId}-error`
    : undefined;

  return (
    <div className="space-y-1.5">

      <label
        htmlFor={fieldId}
        className="text-sm font-medium text-foreground"
      >
        {label}
      </label>

      <div className="relative">

        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </span>
        )}

        <input
          ref={ref}
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            baseInput,
            icon && "pl-9",
            (valid || error) && "pr-9",
            error
              ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
              : "border-input",
            className
          )}
          {...props}
        />

        {error ? (
          <AlertCircle className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-destructive" />
        ) : valid ? (
          <Check className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-positive" />
        ) : null}

      </div>

      {error && (
        <p
          id={describedBy}
          className="text-xs font-medium text-destructive"
        >
          {error}
        </p>
      )}

    </div>
  );
});

export const PasswordField = forwardRef(function PasswordField(
  {
    label,
    error,
    className,
    id,
    icon,
    ...props
  },
  ref
) {
  const [visible, setVisible] = useState(false);

  const generatedId = useId();

  const fieldId = id ?? generatedId;

  const describedBy = error
    ? `${fieldId}-error`
    : undefined;

  return (
    <div className="space-y-1.5">

      <label
        htmlFor={fieldId}
        className="text-sm font-medium text-foreground"
      >
        {label}
      </label>

      <div className="relative">

        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </span>
        )}

        <input
          ref={ref}
          id={fieldId}
          type={visible ? "text" : "password"}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            baseInput,
            "pr-10",
            icon && "pl-9",
            error
              ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
              : "border-input",
            className
          )}
          {...props}
        />

        <button
          type="button"
          onClick={() => setVisible((value) => !value)}
          aria-label={
            visible
              ? "Hide password"
              : "Show password"
          }
          className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {visible ? (
            <EyeOff className="size-4" />
          ) : (
            <Eye className="size-4" />
          )}
        </button>

      </div>

      {error && (
        <p
          id={describedBy}
          className="text-xs font-medium text-destructive"
        >
          {error}
        </p>
      )}

    </div>
  );
});