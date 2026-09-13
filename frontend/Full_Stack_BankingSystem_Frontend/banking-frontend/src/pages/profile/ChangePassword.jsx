import { useState } from "react";
import { Eye, EyeOff, Lock, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { changePassword } from "../../services/userService";

export default function ChangePassword() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setError("New password must be different from current password.");
      return;
    }

    try {
      setLoading(true);

      const response = await changePassword(
        currentPassword,
        newPassword
      );

      if (response.success) {
        setSuccess("Password changed successfully.");

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(response.message || "Unable to change password.");
      }
    } catch (error) {
      console.error("Change password error:", error);

      setError(
        error.response?.data?.message ||
        "Unable to change password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => navigate("/settings")}
          className="mb-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Settings
        </button>

        <h1 className="text-2xl font-bold tracking-tight">
          Change Password
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Update your password to keep your account secure.
        </p>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Current Password */}
          <PasswordField
            label="Current Password"
            value={currentPassword}
            onChange={setCurrentPassword}
            showPassword={showCurrent}
            setShowPassword={setShowCurrent}
            placeholder="Enter your current password"
          />

          {/* New Password */}
          <PasswordField
            label="New Password"
            value={newPassword}
            onChange={setNewPassword}
            showPassword={showNew}
            setShowPassword={setShowNew}
            placeholder="Enter your new password"
          />

          {/* Confirm Password */}
          <PasswordField
            label="Confirm New Password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            showPassword={showConfirm}
            setShowPassword={setShowConfirm}
            placeholder="Confirm your new password"
          />

          {/* Error */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
              {success}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Lock className="size-4" />

            {loading ? "Changing Password..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}


/* Reusable Password Field */

function PasswordField({
  label,
  value,
  onChange,
  showPassword,
  setShowPassword,
  placeholder,
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        {label}
      </label>

      <div className="relative">
        <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-11 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="size-4" />
          ) : (
            <Eye className="size-4" />
          )}
        </button>
      </div>
    </div>
  );
}