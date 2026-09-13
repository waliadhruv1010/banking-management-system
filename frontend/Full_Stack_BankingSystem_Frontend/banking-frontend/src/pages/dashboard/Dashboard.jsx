import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

import {
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  Receipt,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import { useAccounts } from "../../hooks/useAccounts";
import { getTransactionHistory } from "../../services/transactionService";


// ===============================
// Currency Formatter
// ===============================
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount || 0);
}


// ===============================
// Date Formatter
// ===============================
function formatDate(date) {
  return new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}


// ===============================
// Transaction Icon
// ===============================
function getTransactionIcon(type) {
  switch (type) {
    case "DEPOSIT":
      return <ArrowDownToLine className="size-5" />;

    case "WITHDRAW":
      return <ArrowUpFromLine className="size-5" />;

    case "TRANSFER_IN":
    case "TRANSFER_OUT":
      return <ArrowLeftRight className="size-5" />;

    default:
      return <Receipt className="size-5" />;
  }
}


// ===============================
// Transaction Label
// ===============================
function getTransactionLabel(type) {
  switch (type) {
    case "DEPOSIT":
      return "Deposit";

    case "WITHDRAW":
      return "Withdrawal";

    case "TRANSFER_IN":
      return "Transfer Received";

    case "TRANSFER_OUT":
      return "Transfer Sent";

    default:
      return type;
  }
}


// ===============================
// Credit / Debit
// ===============================
function isCredit(type) {
  return type === "DEPOSIT" || type === "TRANSFER_IN";
}


// ===============================
// Dashboard
// ===============================
export default function Dashboard() {
  const navigate = useNavigate();

  // ===============================
  // Logged-in User
  // ===============================
  const { user, loadingUser } = useUser();


  // ===============================
  // Accounts from Backend
  // ===============================
  const {
    accounts,
    loadingAccounts,
    error: accountsError,
    loadAccounts,
  } = useAccounts();


  // ===============================
  // Transactions
  // ===============================
  const [transactions, setTransactions] = useState([]);

  const [loadingTransactions, setLoadingTransactions] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");


  // ===============================
  // Total Balance
  // ===============================
  const totalBalance = useMemo(() => {
    return accounts.reduce(
      (total, account) =>
        total + Number(account.balance || 0),
      0
    );
  }, [accounts]);


  // ===============================
  // Total Accounts
  // ===============================
  const totalAccounts = accounts.length;


  // ===============================
  // Active Accounts
  // ===============================
  const activeAccounts = accounts.filter(
    (account) => account.status === "ACTIVE"
  ).length;


  // ===============================
  // Load Transactions
  // ===============================
  async function loadTransactions(userAccounts) {
    try {
      setLoadingTransactions(true);

      const transactionResults = [];


      for (const account of userAccounts) {
        try {
          const transactionResponse =
            await getTransactionHistory(
              account.accountNumber,
              0,
              5
            );


          if (transactionResponse.success) {
            const accountTransactions =
              transactionResponse.data?.content || [];


            transactionResults.push(
              ...accountTransactions
            );
          }

        } catch (transactionError) {
          console.error(
            `Unable to load transactions for account ${account.accountNumber}`,
            transactionError
          );
        }
      }


      // Sort newest first
      transactionResults.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );


      // Show latest 5 transactions
      setTransactions(
        transactionResults.slice(0, 5)
      );

    } catch (error) {
      console.error(
        "Unable to load transactions:",
        error
      );
    } finally {
      setLoadingTransactions(false);
    }
  }


  // ===============================
  // Refresh Dashboard
  // ===============================
  async function loadDashboard(showRefresh = false) {
    try {

      if (showRefresh) {
        setRefreshing(true);
      }


      setError("");


      // Refresh accounts
      await loadAccounts();

    } catch (err) {

      console.error(err);


      setError(
        err.response?.data?.message ||
        err.message ||
        "Unable to load dashboard."
      );

    } finally {

      setRefreshing(false);

    }
  }


  // ===============================
  // Load Transactions
  // Whenever accounts change
  // ===============================
  useEffect(() => {

    if (!loadingAccounts) {
      loadTransactions(accounts);
    }

  }, [accounts, loadingAccounts]);


  // ===============================
  // Account Error
  // ===============================
  useEffect(() => {

    if (accountsError) {
      setError(accountsError);
    }

  }, [accountsError]);


  // ===============================
  // Initial Loading
  // ===============================
  const loading =
    loadingUser ||
    loadingAccounts ||
    loadingTransactions;


  // ===============================
  // Loading Screen
  // ===============================
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">

        <div className="text-center">

          <div className="mx-auto mb-3 size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />

          <p className="text-sm text-muted-foreground">
            Loading your dashboard...
          </p>

        </div>

      </div>
    );
  }


  // ===============================
  // Dashboard UI
  // ===============================
  return (
    <div className="space-y-6">


      {/* ========================================
          Header
      ======================================== */}
      <div className="flex items-start justify-between gap-4">

        <div>

          <h1 className="text-2xl font-bold tracking-tight">

            Welcome back,{" "}

            {user?.name || "User"}

          </h1>


          <p className="mt-1 text-sm text-muted-foreground">

            Here's an overview of your banking activity.

          </p>

        </div>


        {/* Refresh Button */}
        <button
          type="button"
          onClick={() => loadDashboard(true)}
          disabled={refreshing}
          className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium transition hover:bg-muted disabled:opacity-50"
        >

          <RefreshCw
            className={`size-4 ${
              refreshing ? "animate-spin" : ""
            }`}
          />


          <span className="hidden sm:inline">
            Refresh
          </span>

        </button>

      </div>


      {/* ========================================
          Error
      ======================================== */}
      {error && (

        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

          {error}

        </div>

      )}


      {/* ========================================
          Dashboard Statistics
      ======================================== */}
      <div className="grid gap-4 md:grid-cols-3">


        {/* ====================================
            Total Balance
        ==================================== */}
        <div className="rounded-2xl bg-primary p-6 text-primary-foreground shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm opacity-80">
                Total Balance
              </p>


              <h2 className="mt-2 text-3xl font-bold">
                {formatCurrency(totalBalance)}
              </h2>


              <p className="mt-2 text-sm opacity-80">

                Across {totalAccounts}{" "}

                {totalAccounts === 1
                  ? "account"
                  : "accounts"}

              </p>

            </div>


            <div className="flex size-12 items-center justify-center rounded-xl bg-white/15">

              <Wallet className="size-6" />

            </div>

          </div>

        </div>


        {/* ====================================
            Total Accounts
        ==================================== */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-muted-foreground">
                Total Accounts
              </p>


              <h2 className="mt-2 text-3xl font-bold">
                {totalAccounts}
              </h2>


              <p className="mt-2 text-sm text-muted-foreground">
                Accounts linked to you
              </p>

            </div>


            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">

              <Wallet className="size-6" />

            </div>

          </div>

        </div>


        {/* ====================================
            Active Accounts
        ==================================== */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-muted-foreground">
                Active Accounts
              </p>


              <h2 className="mt-2 text-3xl font-bold">
                {activeAccounts}
              </h2>


              <p className="mt-2 text-sm text-emerald-600">
                Currently active
              </p>

            </div>


            <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">

              <ShieldCheck className="size-6" />

            </div>

          </div>

        </div>

      </div>


      {/* ========================================
          Accounts
      ======================================== */}
      <div>

        <div className="mb-4 flex items-center justify-between">

          <div>

            <h2 className="text-lg font-semibold">
              Your Accounts
            </h2>


            <p className="text-sm text-muted-foreground">
              Your banking accounts and balances
            </p>

          </div>


          <button
            type="button"
            onClick={() => navigate("/accounts")}
            className="text-sm font-medium text-primary hover:underline"
          >
            View all
          </button>

        </div>


        {/* No Accounts */}
        {accounts.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">

            <Wallet className="mx-auto mb-3 size-8 text-muted-foreground" />


            <h3 className="font-semibold">
              No accounts yet
            </h3>


            <p className="mt-1 text-sm text-muted-foreground">
              Create your first banking account.
            </p>


            <button
              type="button"
              onClick={() => navigate("/accounts")}
              className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Create Account
            </button>

          </div>

        ) : (

          /* Account Cards */
          <div className="grid gap-4 md:grid-cols-2">

            {accounts
              .slice(0, 2)
              .map((account) => (

                <div
                  key={account.accountNumber}
                  className="rounded-2xl border border-border bg-card p-5 shadow-sm"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">

                        <Wallet className="size-5" />

                      </div>


                      <div>

                        <p className="font-semibold">
                          {account.accountType} Account
                        </p>


                        <p className="text-xs text-muted-foreground">

                          ****{" "}

                          {String(
                            account.accountNumber
                          ).slice(-4)}

                        </p>

                      </div>

                    </div>


                    {/* Account Status */}
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        account.status === "ACTIVE"
                          ? "bg-emerald-100 text-emerald-700"
                          : account.status === "BLOCKED"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {account.status}
                    </span>

                  </div>


                  {/* Balance */}
                  <div className="mt-6">

                    <p className="text-sm text-muted-foreground">
                      Available Balance
                    </p>


                    <p className="mt-1 text-2xl font-bold">
                      {formatCurrency(account.balance)}
                    </p>

                  </div>

                </div>

              ))}

          </div>

        )}

      </div>


      {/* ========================================
          Quick Actions
      ======================================== */}
      <div>

        <h2 className="mb-4 text-lg font-semibold">
          Quick Actions
        </h2>


        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">


          {/* Deposit */}
          <button
            type="button"
            onClick={() => navigate("/deposit")}
            className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 transition hover:bg-muted"
          >

            <ArrowDownToLine className="size-6 text-primary" />

            <span className="text-sm font-medium">
              Deposit
            </span>

          </button>


          {/* Withdraw */}
          <button
            type="button"
            onClick={() => navigate("/withdraw")}
            className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 transition hover:bg-muted"
          >

            <ArrowUpFromLine className="size-6 text-primary" />

            <span className="text-sm font-medium">
              Withdraw
            </span>

          </button>


          {/* Transfer */}
          <button
            type="button"
            onClick={() => navigate("/transfer")}
            className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 transition hover:bg-muted"
          >

            <ArrowLeftRight className="size-6 text-primary" />

            <span className="text-sm font-medium">
              Transfer
            </span>

          </button>


          {/* Transactions */}
          <button
            type="button"
            onClick={() => navigate("/transactions")}
            className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 transition hover:bg-muted"
          >

            <Receipt className="size-6 text-primary" />

            <span className="text-sm font-medium">
              Transactions
            </span>

          </button>

        </div>

      </div>


      {/* ========================================
          Recent Transactions
      ======================================== */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-lg font-semibold">
              Recent Transactions
            </h2>


            <p className="text-sm text-muted-foreground">
              Your latest banking activity
            </p>

          </div>


          <button
            type="button"
            onClick={() => navigate("/transactions")}
            className="text-sm font-medium text-primary hover:underline"
          >
            View all
          </button>

        </div>


        {/* No Transactions */}
        {transactions.length === 0 ? (

          <div className="mt-8 text-center">

            <Receipt className="mx-auto mb-3 size-8 text-muted-foreground" />


            <p className="font-medium">
              No transactions yet
            </p>


            <p className="mt-1 text-sm text-muted-foreground">
              Your latest transactions will appear here.
            </p>

          </div>

        ) : (

          /* Transaction List */
          <div className="mt-5 space-y-4">

            {transactions.map((transaction) => {

              const credit =
                isCredit(transaction.type);


              return (

                <div
                  key={`${transaction.id}-${transaction.createdAt}`}
                  className="flex items-center justify-between gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
                >

                  <div className="flex min-w-0 items-center gap-3">

                    {/* Transaction Icon */}
                    <div
                      className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
                        credit
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >

                      {getTransactionIcon(
                        transaction.type
                      )}

                    </div>


                    {/* Transaction Details */}
                    <div className="min-w-0">

                      <p className="truncate font-medium">

                        {getTransactionLabel(
                          transaction.type
                        )}

                      </p>


                      <p className="truncate text-xs text-muted-foreground">

                        {transaction.description ||
                          formatDate(
                            transaction.createdAt
                          )}

                      </p>

                    </div>

                  </div>


                  {/* Amount */}
                  <p
                    className={`shrink-0 font-semibold ${
                      credit
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >

                    {credit ? "+" : "-"}

                    {formatCurrency(
                      transaction.amount
                    )}

                  </p>

                </div>

              );

            })}

          </div>

        )}

      </div>

    </div>
  );
}