import {
  Bell,
  Lock,
  Moon,
  LogOut,
  ShieldCheck,
  Sun,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ThemeToggle } from "../../components/common/ThemeToggle";

export default function Settings() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Settings
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account preferences and security.
        </p>
      </div>

      {/* Appearance */}
      <section className="rounded-2xl border border-border bg-card shadow-sm">

        <div className="border-b border-border p-6">
          <h2 className="text-lg font-semibold">
            Appearance
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Customize how your banking dashboard looks.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 p-6">

          <div className="flex items-center gap-3">

            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Moon className="size-5" />
            </div>

            <div>
              <p className="font-medium">
                Theme
              </p>

              <p className="text-sm text-muted-foreground">
                Switch between light and dark mode.
              </p>
            </div>

          </div>

          <ThemeToggle />

        </div>
      </section>

      {/* Notifications */}
      <section className="rounded-2xl border border-border bg-card shadow-sm">

        <div className="border-b border-border p-6">
          <h2 className="text-lg font-semibold">
            Notifications
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage how you receive banking notifications.
          </p>
        </div>

        <div className="divide-y divide-border">

          <div className="flex items-center justify-between gap-4 p-6">

            <div className="flex items-center gap-3">

              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Bell className="size-5" />
              </div>

              <div>
                <p className="font-medium">
                  Transaction Notifications
                </p>

                <p className="text-sm text-muted-foreground">
                  Receive notifications for deposits, withdrawals
                  and transfers.
                </p>
              </div>

            </div>

            <input
              type="checkbox"
              defaultChecked
              className="size-5 accent-[var(--primary)]"
            />

          </div>

          <div className="flex items-center justify-between gap-4 p-6">

            <div>
              <p className="font-medium">
                Security Alerts
              </p>

              <p className="text-sm text-muted-foreground">
                Get notified about important security events.
              </p>
            </div>

            <input
              type="checkbox"
              defaultChecked
              className="size-5 accent-[var(--primary)]"
            />

          </div>

        </div>
      </section>

      {/* Security */}
      <section className="rounded-2xl border border-border bg-card shadow-sm">

        <div className="border-b border-border p-6">

          <div className="flex items-center gap-3">

            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ShieldCheck className="size-5" />
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                Security
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Keep your banking account secure.
              </p>
            </div>

          </div>

        </div>

        <div className="p-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-3">

              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Lock className="size-5" />
              </div>

              <div>
                <p className="font-medium">
                  Password
                </p>

                <p className="text-sm text-muted-foreground">
                  Change your account password.
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={() => navigate("/change-password")}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted"
            >
              Change Password
            </button>

          </div>

        </div>
      </section>

      {/* Logout */}
      <section className="rounded-2xl border border-red-200 bg-card shadow-sm">

        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex size-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
              <LogOut className="size-5" />
            </div>

            <div>
              <p className="font-medium">
                Sign out
              </p>

              <p className="text-sm text-muted-foreground">
                Sign out from your banking account.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Logout
          </button>

        </div>

      </section>

    </div>
  );
}