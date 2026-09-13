import { useState } from "react";
import { User, Mail, Lock, ArrowRight } from "lucide-react";

import { Button } from "../ui/button";
import { Field, PasswordField } from "./Field";

export function RegisterForm({ onSubmit, loading = false }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must contain at least 8 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    onSubmit?.({
      name: name.trim(),
      email: email.trim(),
      password: password,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <Field
        label="Full name"
        type="text"
        placeholder="Enter your full name"
        autoComplete="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        icon={<User className="size-4" />}
        error={errors.name}
      />

      <Field
        label="Email address"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        icon={<Mail className="size-4" />}
        error={errors.email}
      />

      <PasswordField
        label="Password"
        placeholder="Create a password"
        autoComplete="new-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        icon={<Lock className="size-4" />}
        error={errors.password}
      />

      <PasswordField
        label="Confirm password"
        placeholder="Repeat your password"
        autoComplete="new-password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        icon={<Lock className="size-4" />}
        error={errors.confirmPassword}
      />

      <label className="flex cursor-pointer items-start gap-3 text-sm">
        <input
          type="checkbox"
          required
          className="mt-0.5 size-4 rounded border-input accent-primary"
        />

        <span className="leading-relaxed text-muted-foreground">
          I agree to the{" "}
          <span className="font-medium text-primary">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="font-medium text-primary">
            Privacy Policy
          </span>
          .
        </span>
      </label>

      <Button
        type="submit"
        disabled={loading}
        className="h-11 w-full"
      >
        {loading ? (
          <>
            <span className="mr-2 size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Creating account...
          </>
        ) : (
          <>
            Create account
            <ArrowRight className="ml-2 size-4" />
          </>
        )}
      </Button>

    </form>
  );
}
