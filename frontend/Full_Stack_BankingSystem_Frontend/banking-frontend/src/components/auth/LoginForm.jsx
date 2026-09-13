import { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";

import { Button } from "../ui/button";
import { Field, PasswordField } from "./Field";

export function LoginForm({ onSubmit, loading = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password =
        "Password must contain at least 8 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit?.({
      email: email.trim(),
      password,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <Field
        label="Email address"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);

          if (errors.email) {
            setErrors((previous) => ({
              ...previous,
              email: undefined,
            }));
          }
        }}
        icon={<Mail className="size-4" />}
        error={errors.email}
      />

      <PasswordField
        label="Password"
        placeholder="Enter your password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);

          if (errors.password) {
            setErrors((previous) => ({
              ...previous,
              password: undefined,
            }));
          }
        }}
        icon={<Lock className="size-4" />}
        error={errors.password}
      />

      <div className="flex items-center justify-between">

        <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            className="size-4 rounded border-input accent-primary"
          />

          <span>Remember me</span>
        </label>

        <button
          type="button"
          className="text-sm font-medium text-primary hover:underline"
        >
          Forgot password?
        </button>

      </div>

      <Button
        type="submit"
        disabled={loading}
        className="h-11 w-full"
      >
        {loading ? (
          <>
            <span className="mr-2 size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Signing in...
          </>
        ) : (
          <>
            Sign in
            <ArrowRight className="ml-2 size-4" />
          </>
        )}
      </Button>

    </form>
  );
}