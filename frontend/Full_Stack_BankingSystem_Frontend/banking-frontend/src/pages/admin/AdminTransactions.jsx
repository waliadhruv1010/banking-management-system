import { useEffect, useState } from "react";
import {
  ArrowLeftRight,
  Search,
  RefreshCw,
  ArrowDownToLine,
  ArrowUpFromLine,
  Repeat2,
} from "lucide-react";

import { getAdminTransactions } from "../../services/adminService";

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");

  // ==============================
  // LOAD TRANSACTIONS
  // ==============================

  async function loadTransactions() {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminTransactions();

      console.log("Admin transactions response:", response);
      console.log("Is array:", Array.isArray(response));

      if (Array.isArray(response)) {
        setTransactions(response);
      } else {
        setTransactions([]);
        setError("Invalid transactions response from server.");
      }
    } catch (error) {
      console.error(
        "Unable to load transactions:",
        error
      );

      setTransactions([]);

      setError(
        error.response?.data?.message ||
          "Unable to load transactions."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  // ==============================
  // FILTER TRANSACTIONS
  // ==============================

  const filteredTransactions = transactions.filter(
    (transaction) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        String(transaction.id)
          .toLowerCase()
          .includes(search) ||
        String(transaction.accountNumber)
          .toLowerCase()
          .includes(search) ||
        transaction.userName
          ?.toLowerCase()
          .includes(search) ||
        transaction.userEmail
          ?.toLowerCase()
          .includes(search) ||
        transaction.type
          ?.toLowerCase()
          .includes(search) ||
        transaction.description
          ?.toLowerCase()
          .includes(search);

      const matchesType =
        typeFilter === "ALL" ||
        transaction.type === typeFilter;

      return matchesSearch && matchesType;
    }
  );

  // ==============================
  // STATISTICS
  // ==============================

  const totalTransactions = transactions.length;

  const deposits = transactions.filter(
    (transaction) =>
      transaction.type === "DEPOSIT"
  ).length;

  const withdrawals = transactions.filter(
    (transaction) =>
      transaction.type === "WITHDRAW"
  ).length;

  const transfers = transactions.filter(
    (transaction) =>
      transaction.type === "TRANSFER_IN" ||
      transaction.type === "TRANSFER_OUT"
  ).length;

  // ==============================
  // FORMAT DATE
  // ==============================

  function formatDate(date) {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // ==============================
  // FORMAT AMOUNT
  // ==============================

  function formatAmount(amount) {
    return Number(amount || 0).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  }

  // ==============================
  // TRANSACTION BADGE
  // ==============================

  function getTransactionBadge(type) {
    if (type === "DEPOSIT") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          <ArrowDownToLine size={13} />
          Deposit
        </span>
      );
    }

    if (type === "WITHDRAW") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
          <ArrowUpFromLine size={13} />
          Withdrawal
        </span>
      );
    }

    if (type === "TRANSFER_IN") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          <Repeat2 size={13} />
          Transfer In
        </span>
      );
    }

    if (type === "TRANSFER_OUT") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
          <Repeat2 size={13} />
          Transfer Out
        </span>
      );
    }

    return (
      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
        {type}
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

          <span>
            Loading transactions...
          </span>
        </div>
      </div>
    );
  }

  // ==============================
  // UI
  // ==============================

  return (
    <div className="space-y-8">

      {/* =========================
          HEADER
      ========================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <p className="text-sm font-medium text-indigo-600">
            Administration
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Transactions
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Monitor banking transactions across all
            customer accounts.
          </p>
        </div>

        <button
          onClick={loadTransactions}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <RefreshCw size={16} />
          Refresh
        </button>

      </div>

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* =========================
          STAT CARDS
      ========================= */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {/* TOTAL */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Transactions
              </p>

              <p className="mt-3 text-3xl font-bold text-slate-900">
                {totalTransactions}
              </p>
            </div>

            <div className="flex size-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <ArrowLeftRight className="size-5" />
            </div>

          </div>

        </div>

        {/* DEPOSITS */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <p className="text-sm font-medium text-slate-500">
            Deposits
          </p>

          <p className="mt-3 text-3xl font-bold text-emerald-600">
            {deposits}
          </p>

          <p className="mt-2 text-xs text-slate-500">
            Total deposit transactions
          </p>

        </div>

        {/* WITHDRAWALS */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <p className="text-sm font-medium text-slate-500">
            Withdrawals
          </p>

          <p className="mt-3 text-3xl font-bold text-red-600">
            {withdrawals}
          </p>

          <p className="mt-2 text-xs text-slate-500">
            Total withdrawal transactions
          </p>

        </div>

        {/* TRANSFERS */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <p className="text-sm font-medium text-slate-500">
            Transfers
          </p>

          <p className="mt-3 text-3xl font-bold text-blue-600">
            {transfers}
          </p>

          <p className="mt-2 text-xs text-slate-500">
            Incoming and outgoing transfers
          </p>

        </div>

      </div>

      {/* =========================
          TRANSACTION TABLE
      ========================= */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* TABLE HEADER */}

        <div className="flex flex-col gap-4 border-b border-slate-200 p-6 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Transaction History
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Monitor transactions performed across the
              banking system.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">

            {/* SEARCH */}

            <div className="relative w-full sm:w-72">

              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
              />

            </div>

            {/* TYPE FILTER */}

            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value)
              }
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:bg-white"
            >

              <option value="ALL">
                All Types
              </option>

              <option value="DEPOSIT">
                Deposits
              </option>

              <option value="WITHDRAW">
                Withdrawals
              </option>

              <option value="TRANSFER_IN">
                Transfer In
              </option>

              <option value="TRANSFER_OUT">
                Transfer Out
              </option>

            </select>

          </div>

        </div>

        {/* =========================
            TABLE
        ========================= */}

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="border-b border-slate-200 bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Transaction
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Customer
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Account
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Type
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Amount
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Balance After
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Date
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredTransactions.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    className="px-6 py-16 text-center"
                  >

                    <div className="flex flex-col items-center">

                      <div className="flex size-14 items-center justify-center rounded-2xl bg-slate-100">
                        <ArrowLeftRight className="size-6 text-slate-400" />
                      </div>

                      <h3 className="mt-4 text-sm font-semibold text-slate-900">
                        No transactions found
                      </h3>

                      <p className="mt-1 max-w-sm text-sm text-slate-500">
                        No transactions match your
                        current search or filter.
                      </p>

                    </div>

                  </td>

                </tr>

              ) : (

                filteredTransactions.map(
                  (transaction) => (

                    <tr
                      key={transaction.id}
                      className="transition hover:bg-slate-50"
                    >

                      {/* TRANSACTION */}

                      <td className="whitespace-nowrap px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex size-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                            <ArrowLeftRight size={17} />
                          </div>

                          <div>

                            <p className="font-semibold text-slate-900">
                              #{transaction.id}
                            </p>

                            <p className="max-w-[180px] truncate text-xs text-slate-400">
                              {transaction.description ||
                                "No description"}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* CUSTOMER */}

                      <td className="px-6 py-4">

                        <div>

                          <p className="font-medium text-slate-800">
                            {transaction.userName ||
                              "—"}
                          </p>

                          <p className="text-xs text-slate-500">
                            {transaction.userEmail ||
                              "—"}
                          </p>

                        </div>

                      </td>

                      {/* ACCOUNT */}

                      <td className="whitespace-nowrap px-6 py-4">

                        <span className="font-medium text-slate-700">
                          {transaction.accountNumber}
                        </span>

                      </td>

                      {/* TYPE */}

                      <td className="whitespace-nowrap px-6 py-4">
                        {getTransactionBadge(
                          transaction.type
                        )}
                      </td>

                      {/* AMOUNT */}

                      <td className="whitespace-nowrap px-6 py-4">

                        <span className="font-semibold text-slate-900">
                          ₹
                          {formatAmount(
                            transaction.amount
                          )}
                        </span>

                      </td>

                      {/* BALANCE */}

                      <td className="whitespace-nowrap px-6 py-4">

                        <span className="font-medium text-slate-700">
                          ₹
                          {formatAmount(
                            transaction.balanceAfter
                          )}
                        </span>

                      </td>

                      {/* DATE */}

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                        {formatDate(
                          transaction.createdAt
                        )}
                      </td>

                    </tr>

                  )
                )

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
              {filteredTransactions.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {totalTransactions}
            </span>{" "}
            transactions

          </p>

        </div>

      </div>

    </div>
  );
}