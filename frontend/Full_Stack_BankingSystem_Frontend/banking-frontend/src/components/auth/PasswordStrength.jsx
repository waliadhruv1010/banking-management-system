import { Check } from "lucide-react";

const requirements = [
  {
    label: "At least 8 characters",
    test: (password) => password.length >= 8,
  },
  {
    label: "One uppercase letter",
    test: (password) => /[A-Z]/.test(password),
  },
  {
    label: "One lowercase letter",
    test: (password) => /[a-z]/.test(password),
  },
  {
    label: "One number",
    test: (password) => /\d/.test(password),
  },
];

export function PasswordStrength({ password }) {
  if (!password) return null;

  const passed = requirements.filter((requirement) =>
    requirement.test(password)
  ).length;

  const percentage = (passed / requirements.length) * 100;

  let label = "Very weak";

  if (passed === 2) label = "Weak";
  if (passed === 3) label = "Good";
  if (passed === 4) label = "Strong";

  return (
    <div className="mt-3 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          Password strength
        </span>

        <span className="text-xs font-medium text-foreground">
          {label}
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {requirements.map((requirement) => {
          const isPassed = requirement.test(password);

          return (
            <div
              key={requirement.label}
              className="flex items-center gap-2 text-xs"
            >
              <span
                className={`flex size-4 items-center justify-center rounded-full ${
                  isPassed
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {isPassed && <Check className="size-2.5" />}
              </span>

              <span className="text-muted-foreground">
                {requirement.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}