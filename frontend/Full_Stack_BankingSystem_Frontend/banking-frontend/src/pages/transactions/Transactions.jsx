import { useEffect, useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  Receipt,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { getMyAccounts } from "../../services/accountService";
import { getTransactionHistory } from "../../services/transactionService";

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDate(date) {
  return new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function getTransactionIcon(type) {
  switch (type) {
    case "DEPOSIT":
      return <ArrowDownToLine className="size-5" />;

    case "WITHDRAW":
      return <ArrowUpFromLine className="size-5" />;

    case "TRANSFER_OUT":
    case "TRANSFER_IN":
      return <ArrowLeftRight className="size-5" />;

    default:
      return <Receipt className="size-5" />;
  }
}

function getTransactionLabel(type) {
  switch (type) {
    case "DEPOSIT":
      return "Deposit";

    case "WITHDRAW":
      return "Withdrawal";

    case "TRANSFER_OUT":
      return "Transfer Sent";

    case "TRANSFER_IN":
      return "Transfer Received";

    default:
      return type;
  }
}

export default function Transactions() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");

  const [transactions, setTransactions] = useState([]);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [loadingTransactions, setLoadingTransactions] = useState(false);

  const [error, setError] = useState("");

  // Fetch accounts
  useEffect(() => {
    async function loadAccounts() {
      try {
        setLoadingAccounts(true);
        setError("");

        const response = await getMyAccounts();

        if (response.success) {
          const activeAccounts = response.data.filter(
            (account) => account.status === "ACTIVE"
          );

          setAccounts(activeAccounts);

          if (activeAccounts.length > 0) {
            setSelectedAccount(
              String(activeAccounts[0].accountNumber)
            );
          }
        }
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message ||
            "Unable to load your accounts."
        );
      } finally {
        setLoadingAccounts(false);
      }
    }

    loadAccounts();
  }, []);

  // Fetch transaction history
  useEffect(() => {
    if (!selectedAccount) {
      return;
    }

    async function loadTransactions() {
      try {
        setLoadingTransactions(true);
        setError("");

        const response = await getTransactionHistory(
          selectedAccount,
          page,
          10
        );

        if (response.success) {
          setTransactions(response.data.content);
          setTotalPages(response.data.totalPages);
        }
      } catch (err) {
        console.error(err);

        setTransactions([]);

        setError(
          err.response?.data?.message ||
            "Unable to load transaction history."
        );
      } finally {
        setLoadingTransactions(false);
      }
    }

    loadTransactions();
  }, [selectedAccount, page]);

  function handleAccountChange(event) {
    setSelectedAccount(event.target.value);
    setPage(0);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Transaction History
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          View all deposits, withdrawals and transfers.
        </p>
      </div>

      {/* Account Selector */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <label className="mb-2 block text-sm font-medium">
          Select Account
        </label>

        <select
          value={selectedAccount}
          onChange={handleAccountChange}
          disabled={loadingAccounts}
          className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary md:w-96"
        >
          {loadingAccounts && (
            <option value="">Loading accounts...</option>
          )}

          {!loadingAccounts && accounts.length === 0 && (
            <option value="">No active accounts</option>
          )}

          {accounts.map((account) => (
            <option
              key={account.accountNumber}
              value={account.accountNumber}
            >
              {account.accountType} •{" "}
              {account.accountNumber} •{" "}
              {formatCurrency(account.balance)}
            </option>
          ))}
        </select>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Transactions */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="border-b border-border px-5 py-4">
          <h2 className="font-semibold">
            Recent Transactions
          </h2>

          <p className="text-sm text-muted-foreground">
            Account: {selectedAccount || "—"}
          </p>
        </div>

        {loadingTransactions ? (
          <div className="flex min-h-60 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Loading transactions...
            </p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex min-h-60 flex-col items-center justify-center px-5 text-center">
            <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Receipt className="size-6" />
            </div>

            <h3 className="font-semibold">
              No transactions found
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Transactions for this account will appear here.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-5 py-3 font-medium">
                      Transaction
                    </th>

                    <th className="px-5 py-3 font-medium">
                      Description
                    </th>

                    <th className="px-5 py-3 font-medium">
                      Date
                    </th>

                    <th className="px-5 py-3 text-right font-medium">
                      Amount
                    </th>

                    <th className="px-5 py-3 text-right font-medium">
                      Balance
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {transactions.map((transaction) => {
                    const isCredit =
                      transaction.type === "DEPOSIT" ||
                      transaction.type === "TRANSFER_IN";

                    return (
                      <tr
                        key={transaction.id}
                        className="border-b border-border last:border-0 hover:bg-muted/30"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex size-10 items-center justify-center rounded-xl ${
                                isCredit
                                  ? "bg-emerald-100 text-emerald-600"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              {getTransactionIcon(
                                transaction.type
                              )}
                            </div>

                            <div>
                              <p className="text-sm font-medium">
                                {getTransactionLabel(
                                  transaction.type
                                )}
                              </p>

                              <p className="text-xs text-muted-foreground">
                                #{transaction.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-sm text-muted-foreground">
                          {transaction.description || "—"}
                        </td>

                        <td className="px-5 py-4 text-sm text-muted-foreground">
                          {formatDate(transaction.createdAt)}
                        </td>

                        <td
                          className={`px-5 py-4 text-right text-sm font-semibold ${
                            isCredit
                              ? "text-emerald-600"
                              : "text-red-600"
                          }`}
                        >
                          {isCredit ? "+" : "-"}
                          {formatCurrency(transaction.amount)}
                        </td>

                        <td className="px-5 py-4 text-right text-sm font-semibold">
                          {formatCurrency(
                            transaction.balanceAfter
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="divide-y divide-border md:hidden">
              {transactions.map((transaction) => {
                const isCredit =
                  transaction.type === "DEPOSIT" ||
                  transaction.type === "TRANSFER_IN";

                return (
                  <div
                    key={transaction.id}
                    className="p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
                            isCredit
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {getTransactionIcon(
                            transaction.type
                          )}
                        </div>

                        <div>
                          <p className="text-sm font-semibold">
                            {getTransactionLabel(
                              transaction.type
                            )}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {formatDate(transaction.createdAt)}
                          </p>
                        </div>
                      </div>

                      <p
                        className={`text-sm font-bold ${
                          isCredit
                            ? "text-emerald-600"
                            : "text-red-600"
                        }`}
                      >
                        {isCredit ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </p>
                    </div>

                    <div className="mt-3 flex justify-between rounded-lg bg-muted/40 px-3 py-2 text-xs">
                      <span className="text-muted-foreground">
                        Balance after
                      </span>

                      <span className="font-semibold">
                        {formatCurrency(
                          transaction.balanceAfter
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-border px-5 py-4">
              <p className="text-sm text-muted-foreground">
                Page {page + 1} of {totalPages || 1}
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={page === 0}
                  onClick={() => setPage((prev) => prev - 1)}
                  className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="size-4" />
                  Previous
                </button>

                <button
                  type="button"
                  disabled={
                    totalPages === 0 ||
                    page >= totalPages - 1
                  }
                  onClick={() => setPage((prev) => prev + 1)}
                  className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}