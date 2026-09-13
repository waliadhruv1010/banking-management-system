import { useEffect, useState } from "react";
import {
  CreditCard,
  Search,
  Ban,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";

import {
  getAdminAccounts,
  blockAdminAccount,
  unblockAdminAccount,
  closeAdminAccount,
} from "../../services/adminService";

export default function AdminAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // ==============================
  // LOAD ACCOUNTS
  // ==============================

  async function loadAccounts() {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminAccounts();

      console.log("Admin accounts response:", response);
      console.log("Is array:", Array.isArray(response));

      // Backend returns:
      // [
      //   {
      //      id,
      //      accountNumber,
      //      accountType,
      //      status,
      //      balance,
      //      createdAt,
      //      userId,
      //      userName,
      //      userEmail
      //   }
      // ]

      if (Array.isArray(response)) {
        setAccounts(response);
      } else {
        setAccounts([]);
        setError("Invalid accounts response from server.");
      }
    } catch (error) {
      console.error("Unable to load accounts:", error);

      setAccounts([]);

      setError(
        error.response?.data?.message ||
          "Unable to load accounts."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAccounts();
  }, []);

  // ==============================
  // ACCOUNT ACTION
  // ==============================

  async function handleBlock(accountNumber) {
    const confirmed = window.confirm(
      `Are you sure you want to block account ${accountNumber}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(accountNumber);
      setError("");

      await blockAdminAccount(accountNumber);

      await loadAccounts();
    } catch (error) {
      console.error("Unable to block account:", error);

      setError(
        error.response?.data?.message ||
          "Unable to block account."
      );
    } finally {
      setActionLoading(null);
    }
  }

  async function handleUnblock(accountNumber) {
    const confirmed = window.confirm(
      `Are you sure you want to unblock account ${accountNumber}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(accountNumber);
      setError("");

      await unblockAdminAccount(accountNumber);

      await loadAccounts();
    } catch (error) {
      console.error("Unable to unblock account:", error);

      setError(
        error.response?.data?.message ||
          "Unable to unblock account."
      );
    } finally {
      setActionLoading(null);
    }
  }

  async function handleClose(accountNumber) {
    const confirmed = window.confirm(
      `Are you sure you want to permanently close account ${accountNumber}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(accountNumber);
      setError("");

      await closeAdminAccount(accountNumber);

      await loadAccounts();
    } catch (error) {
      console.error("Unable to close account:", error);

      setError(
        error.response?.data?.message ||
          "Unable to close account."
      );
    } finally {
      setActionLoading(null);
    }
  }

  // ==============================
  // SEARCH
  // ==============================

  const filteredAccounts = accounts.filter((account) => {
    const search = searchTerm.toLowerCase();

    return (
      String(account.accountNumber)
        .toLowerCase()
        .includes(search) ||
      account.userName
        ?.toLowerCase()
        .includes(search) ||
      account.userEmail
        ?.toLowerCase()
        .includes(search) ||
      account.accountType
        ?.toLowerCase()
        .includes(search) ||
      account.status
        ?.toLowerCase()
        .includes(search)
    );
  });

  // ==============================
  // STATISTICS
  // ==============================

  const totalAccounts = accounts.length;

  const activeAccounts = accounts.filter(
    (account) => account.status === "ACTIVE"
  ).length;

  const blockedAccounts = accounts.filter(
    (account) => account.status === "BLOCKED"
  ).length;

  const closedAccounts = accounts.filter(
    (account) => account.status === "CLOSED"
  ).length;

  // ==============================
  // FORMAT DATE
  // ==============================

  function formatDate(date) {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  // ==============================
  // FORMAT BALANCE
  // ==============================

  function formatBalance(balance) {
    return Number(balance || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  // ==============================
  // STATUS BADGE
  // ==============================

  function getStatusBadge(status) {
    if (status === "ACTIVE") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          <CheckCircle size={13} />
          Active
        </span>
      );
    }

    if (status === "BLOCKED") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
          <Ban size={13} />
          Blocked
        </span>
      );
    }

    if (status === "CLOSED") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
          <XCircle size={13} />
          Closed
        </span>
      );
    }

    return (
      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
        {status}
      </span>
    );
  }

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-3 text-slate-500">
          <RefreshCw
            size={20}
            className="animate-spin"
          />
          <span>Loading accounts...</span>
        </div>
      </div>
    );
  }

  // ==============================
  // UI
  // ==============================

  return (
    <div className="space-y-6">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Accounts
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage and monitor all customer bank accounts.
          </p>
        </div>

        <button
          onClick={loadAccounts}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <RefreshCw size={16} />
          Refresh
        </button>

      </div>

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* =========================
          STAT CARDS
      ========================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* TOTAL */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Accounts
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {totalAccounts}
              </h2>
            </div>

            <div className="rounded-lg bg-indigo-100 p-3 text-indigo-600">
              <CreditCard size={22} />
            </div>

          </div>
        </div>

        {/* ACTIVE */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Active Accounts
              </p>

              <h2 className="mt-2 text-2xl font-bold text-emerald-600">
                {activeAccounts}
              </h2>
            </div>

            <div className="rounded-lg bg-emerald-100 p-3 text-emerald-600">
              <CheckCircle size={22} />
            </div>

          </div>
        </div>

        {/* BLOCKED */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Blocked Accounts
              </p>

              <h2 className="mt-2 text-2xl font-bold text-amber-600">
                {blockedAccounts}
              </h2>
            </div>

            <div className="rounded-lg bg-amber-100 p-3 text-amber-600">
              <Ban size={22} />
            </div>

          </div>
        </div>

        {/* CLOSED */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Closed Accounts
              </p>

              <h2 className="mt-2 text-2xl font-bold text-red-600">
                {closedAccounts}
              </h2>
            </div>

            <div className="rounded-lg bg-red-100 p-3 text-red-600">
              <XCircle size={22} />
            </div>

          </div>
        </div>

      </div>

      {/* =========================
          SEARCH
      ========================= */}

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

        <div className="relative max-w-md">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search account, user, email, type or status..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />

        </div>

      </div>

      {/* =========================
          ACCOUNT TABLE
      ========================= */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="border-b border-slate-200 bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Account
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Customer
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Type
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Balance
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Created
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredAccounts.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center"
                  >

                    <div className="flex flex-col items-center">

                      <CreditCard
                        size={36}
                        className="text-slate-300"
                      />

                      <p className="mt-3 text-sm font-medium text-slate-600">
                        No accounts found
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Try changing your search.
                      </p>

                    </div>

                  </td>

                </tr>

              ) : (

                filteredAccounts.map((account) => (

                  <tr
                    key={account.id}
                    className="transition hover:bg-slate-50"
                  >

                    {/* ACCOUNT */}

                    <td className="whitespace-nowrap px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                          <CreditCard size={18} />
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {account.accountNumber}
                          </p>

                          <p className="text-xs text-slate-400">
                            ID: {account.id}
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* CUSTOMER */}

                    <td className="px-6 py-4">

                      <div>
                        <p className="font-medium text-slate-800">
                          {account.userName || "—"}
                        </p>

                        <p className="text-xs text-slate-500">
                          {account.userEmail || "—"}
                        </p>
                      </div>

                    </td>

                    {/* TYPE */}

                    <td className="whitespace-nowrap px-6 py-4">

                      <span className="rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {account.accountType}
                      </span>

                    </td>

                    {/* BALANCE */}

                    <td className="whitespace-nowrap px-6 py-4">

                      <span className="font-semibold text-slate-900">
                        ₹{formatBalance(account.balance)}
                      </span>

                    </td>

                    {/* STATUS */}

                    <td className="whitespace-nowrap px-6 py-4">
                      {getStatusBadge(account.status)}
                    </td>

                    {/* CREATED */}

                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                      {formatDate(account.createdAt)}
                    </td>

                    {/* ACTIONS */}

                    <td className="whitespace-nowrap px-6 py-4">

                      <div className="flex justify-end gap-2">

                        {/* ACTIVE → BLOCK */}

                        {account.status === "ACTIVE" && (

                          <button
                            onClick={() =>
                              handleBlock(
                                account.accountNumber
                              )
                            }
                            disabled={
                              actionLoading ===
                              account.accountNumber
                            }
                            title="Block account"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50"
                          >

                            {actionLoading ===
                            account.accountNumber ? (
                              <RefreshCw
                                size={14}
                                className="animate-spin"
                              />
                            ) : (
                              <Ban size={14} />
                            )}

                            Block

                          </button>

                        )}

                        {/* BLOCKED → UNBLOCK */}

                        {account.status === "BLOCKED" && (

                          <button
                            onClick={() =>
                              handleUnblock(
                                account.accountNumber
                              )
                            }
                            disabled={
                              actionLoading ===
                              account.accountNumber
                            }
                            title="Unblock account"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50"
                          >

                            {actionLoading ===
                            account.accountNumber ? (
                              <RefreshCw
                                size={14}
                                className="animate-spin"
                              />
                            ) : (
                              <CheckCircle size={14} />
                            )}

                            Unblock

                          </button>

                        )}

                        {/* ACTIVE/BLOCKED → CLOSE */}

                        {account.status !== "CLOSED" && (

                          <button
                            onClick={() =>
                              handleClose(
                                account.accountNumber
                              )
                            }
                            disabled={
                              actionLoading ===
                              account.accountNumber
                            }
                            title="Close account"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                          >

                            {actionLoading ===
                            account.accountNumber ? (
                              <RefreshCw
                                size={14}
                                className="animate-spin"
                              />
                            ) : (
                              <XCircle size={14} />
                            )}

                            Close

                          </button>

                        )}

                        {/* CLOSED */}

                        {account.status === "CLOSED" && (

                          <span className="px-3 py-2 text-xs font-medium text-slate-400">
                            No actions
                          </span>

                        )}

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        {/* =========================
            FOOTER
        ========================= */}

        <div className="border-t border-slate-200 bg-slate-50 px-6 py-3">

          <p className="text-xs text-slate-500">

            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredAccounts.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {totalAccounts}
            </span>{" "}
            accounts

          </p>

        </div>

      </div>

    </div>
  );
}