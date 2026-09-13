import { useEffect, useState } from "react";

import {
  Users,
  CreditCard,
  CheckCircle2,
  Ban,
} from "lucide-react";

import AdminStatCard from "../../components/admin/AdminStatCard";
import { getAdminDashboard } from "../../services/adminService";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminDashboard();

      setStats(response);

    } catch (error) {
      console.error(
        "Unable to load admin dashboard:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load dashboard statistics."
      );

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <p className="text-sm text-red-600">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Heading */}
      <div>
        <p className="text-sm font-medium text-indigo-600">
          Overview
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Monitor users, accounts and banking operations.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <AdminStatCard
          title="Total Users"
          value={stats.totalUsers}
          description="Registered customers"
          icon={Users}
        />

        <AdminStatCard
          title="Total Accounts"
          value={stats.totalAccounts}
          description="All customer accounts"
          icon={CreditCard}
        />

        <AdminStatCard
          title="Active Accounts"
          value={stats.activeAccounts}
          description="Currently active"
          icon={CheckCircle2}
        />

        <AdminStatCard
          title="Blocked Accounts"
          value={stats.blockedAccounts}
          description="Require attention"
          icon={Ban}
        />

      </div>

      {/* Activity section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Banking Operations
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Use the sidebar to manage users, accounts and transactions.
          </p>
        </div>

      </div>

    </div>
  );
}