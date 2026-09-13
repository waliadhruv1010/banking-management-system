import { useEffect, useState } from "react";
import {
  Users,
  Search,
  ShieldCheck,
  User,
} from "lucide-react";

import { getAdminUsers } from "../../services/adminService";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  async function loadUsers() {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminUsers();

      setUsers(response);
    } catch (error) {
      console.error("Unable to load admin users:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load users."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  // Search users
  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase();

    return (
      user.name?.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search) ||
      user.role?.toLowerCase().includes(search)
    );
  });

  // Statistics
  const totalUsers = users.length;

  const totalCustomers = users.filter(
    (user) => user.role === "USER"
  ).length;

  const totalAdmins = users.filter(
    (user) => user.role === "ADMIN"
  ).length;

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <p className="text-sm font-medium text-indigo-600">
          Administration
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Users
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage registered banking customers and their access.
        </p>
      </div>


      {/* Error */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm font-medium text-red-600">
            {error}
          </p>
        </div>
      )}


      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

        {/* Total Users */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Users
              </p>

              <p className="mt-3 text-3xl font-bold text-slate-900">
                {loading ? "—" : totalUsers}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Registered accounts
              </p>
            </div>

            <div className="flex size-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Users className="size-5" />
            </div>

          </div>
        </div>


        {/* Customers */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Customers
              </p>

              <p className="mt-3 text-3xl font-bold text-slate-900">
                {loading ? "—" : totalCustomers}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Regular banking users
              </p>
            </div>

            <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <User className="size-5" />
            </div>

          </div>
        </div>


        {/* Administrators */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Administrators
              </p>

              <p className="mt-3 text-3xl font-bold text-slate-900">
                {loading ? "—" : totalAdmins}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                System administrators
              </p>
            </div>

            <div className="flex size-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <ShieldCheck className="size-5" />
            </div>

          </div>
        </div>

      </div>


      {/* Users table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Table header */}
        <div className="flex flex-col gap-4 border-b border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Customer Directory
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View registered users and their access roles.
            </p>
          </div>


          {/* Search */}
          <div className="relative w-full sm:w-72">

            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
            />

          </div>

        </div>


        {/* Loading */}
        {loading && (
          <div className="flex min-h-64 items-center justify-center">
            <p className="text-sm text-slate-500">
              Loading users...
            </p>
          </div>
        )}


        {/* Empty */}
        {!loading && filteredUsers.length === 0 && (
          <div className="flex min-h-64 items-center justify-center p-8">

            <div className="text-center">

              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-slate-100">
                <Users className="size-6 text-slate-400" />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-900">
                No users found
              </h3>

              <p className="mt-1 max-w-sm text-sm text-slate-500">
                {searchTerm
                  ? "Try searching with a different name, email or role."
                  : "No registered users are available."}
              </p>

            </div>

          </div>
        )}


        {/* Users table */}
        {!loading && filteredUsers.length > 0 && (
          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="border-b border-slate-200 bg-slate-50">

                <tr>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    ID
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    User
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Email
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Role
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Created
                  </th>

                </tr>

              </thead>


              <tbody className="divide-y divide-slate-100">

                {filteredUsers.map((user) => (

                  <tr
                    key={user.id}
                    className="transition hover:bg-slate-50"
                  >

                    {/* ID */}
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-500">
                      #{user.id}
                    </td>


                    {/* Name */}
                    <td className="whitespace-nowrap px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                          <User className="size-5" />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {user.name}
                          </p>

                          <p className="text-xs text-slate-500">
                            Banking customer
                          </p>
                        </div>

                      </div>

                    </td>


                    {/* Email */}
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                      {user.email}
                    </td>


                    {/* Role */}
                    <td className="whitespace-nowrap px-6 py-4">

                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          user.role === "ADMIN"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {user.role}
                      </span>

                    </td>


                    {/* Created */}
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "—"}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}