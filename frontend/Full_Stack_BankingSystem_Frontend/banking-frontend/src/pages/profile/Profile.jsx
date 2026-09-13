import {
  Mail,
  ShieldCheck,
  User,
  Lock,
  Calendar,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function Profile() {
  const { user, loadingUser } = useUser();
  const navigate = useNavigate();

  if (loadingUser) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-3 size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />

          <p className="text-sm text-muted-foreground">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
        Unable to load your profile.
      </div>
    );
  }

  const initials = user.name
    ?.split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="mx-auto max-w-5xl space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          My Profile
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your personal account information.
        </p>
      </div>

      {/* Profile Card */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">

        {/* Top Section */}
        <div className="bg-primary px-6 py-8 text-primary-foreground">
          <div className="flex flex-col items-center gap-4 sm:flex-row">

            {/* Avatar */}
            <div className="flex size-20 items-center justify-center rounded-full bg-white/15 text-2xl font-bold ring-4 ring-white/10">
              {initials || "U"}
            </div>

            <div className="text-center sm:text-left">

              <h2 className="text-2xl font-bold">
                {user.name}
              </h2>

              <p className="mt-1 text-sm opacity-80">
                {user.email}
              </p>

              {/* Role */}
              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
                <ShieldCheck className="size-3.5" />
                {user.role}
              </div>

            </div>

          </div>
        </div>

        {/* Personal Information */}
        <div className="p-6">

          <div className="mb-5">
            <h3 className="text-lg font-semibold">
              Personal Information
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Your registered account information.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">

            {/* Name */}
            <div className="rounded-xl border border-border p-4">
              <div className="flex items-center gap-3">

                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <User className="size-5" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Full Name
                  </p>

                  <p className="mt-1 font-medium">
                    {user.name}
                  </p>
                </div>

              </div>
            </div>

            {/* Email */}
            <div className="rounded-xl border border-border p-4">
              <div className="flex items-center gap-3">

                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="size-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">
                    Email Address
                  </p>

                  <p className="mt-1 truncate font-medium">
                    {user.email}
                  </p>
                </div>

              </div>
            </div>

            {/* Role */}
            <div className="rounded-xl border border-border p-4">
              <div className="flex items-center gap-3">

                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ShieldCheck className="size-5" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Account Role
                  </p>

                  <p className="mt-1 font-medium">
                    {user.role}
                  </p>
                </div>

              </div>
            </div>

            {/* Account Status */}
            <div className="rounded-xl border border-border p-4">
              <div className="flex items-center gap-3">

                <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                  <Calendar className="size-5" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Account Status
                  </p>

                  <p className="mt-1 font-medium text-emerald-600">
                    Active
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Security */}
        <div className="border-t border-border p-6">

          <div className="mb-5">
            <h3 className="text-lg font-semibold">
              Security
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage your account security.
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between">

            {/* Password Info */}
            <div className="flex items-center gap-3">

              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Lock className="size-5" />
              </div>

              <div>
                <p className="font-medium">
                  Password
                </p>

                <p className="text-sm text-muted-foreground">
                  Your password is securely protected.
                </p>
              </div>

            </div>

            {/* Change Password */}
            <button
              type="button"
              onClick={() => navigate("/change-password")}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted"
            >
              Change Password
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}