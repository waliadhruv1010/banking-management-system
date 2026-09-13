import { useEffect, useState } from "react";
import {
  Landmark,
  RefreshCw,
  Plus,
  X,
} from "lucide-react";

import {
  getMyAccounts,
  createAccount,
} from "../../services/accountService";

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [accountType, setAccountType] = useState("SAVINGS");

  async function loadAccounts() {
    try {
      setLoading(true);
      setError("");

      const response = await getMyAccounts();

      console.log("FULL ACCOUNTS RESPONSE:", response);
      console.log("ACCOUNT DATA:", response?.data);

      setAccounts(
        Array.isArray(response?.data)
          ? response.data
          : []
      );

    } catch (error) {
      console.error(
        "Failed to fetch accounts:",
        error
      );

      console.error(
        "Server response:",
        error.response?.data
      );

      setError(
        error.response?.data?.message ||
        "Unable to load your accounts."
      );

    } finally {
      setLoading(false);
    }
  }


  async function handleCreateAccount() {
    try {
      setCreating(true);
      setError("");

      const response =
        await createAccount(accountType);

      console.log(
        "CREATE ACCOUNT RESPONSE:",
        response
      );

      setShowCreate(false);

      // Reload accounts after creation
      await loadAccounts();

    } catch (error) {
      console.error(
        "Failed to create account:",
        error
      );

      console.error(
        "Server response:",
        error.response?.data
      );

      setError(
        error.response?.data?.message ||
        "Unable to create account."
      );

    } finally {
      setCreating(false);
    }
  }


  useEffect(() => {
    loadAccounts();
  }, []);


  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            My Accounts
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            View and manage your banking accounts.
          </p>
        </div>


        <div className="flex gap-2">

          <button
            type="button"
            onClick={loadAccounts}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50"
          >
            <RefreshCw
              className={`size-4 ${
                loading
                  ? "animate-spin"
                  : ""
              }`}
            />

            Refresh
          </button>


          <button
            type="button"
            onClick={() => setShowCreate(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            <Plus className="size-4" />

            Create Account
          </button>

        </div>

      </div>


      {/* ================= ERROR ================= */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}


      {/* ================= LOADING ================= */}

      {loading && (
        <div className="grid gap-5 md:grid-cols-2">

          {[1, 2].map((item) => (
            <div
              key={item}
              className="h-48 animate-pulse rounded-2xl border border-border bg-muted/50"
            />
          ))}

        </div>
      )}


      {/* ================= EMPTY ================= */}

      {!loading &&
        !error &&
        accounts.length === 0 && (

          <div className="flex min-h-60 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-8 text-center">

            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Landmark className="size-6" />
            </div>

            <h2 className="text-lg font-semibold">
              No accounts found
            </h2>

            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              You don't have any banking accounts yet.
            </p>

            <button
              type="button"
              onClick={() => setShowCreate(true)}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              <Plus className="size-4" />
              Create Your First Account
            </button>

          </div>
        )}


      {/* ================= ACCOUNTS ================= */}

      {!loading &&
        !error &&
        accounts.length > 0 && (

          <div className="grid gap-5 md:grid-cols-2">

            {accounts.map((account) => (

              <div
                key={account.accountNumber}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >

                <div className="flex items-start justify-between">

                  <div className="flex items-center gap-3">

                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Landmark className="size-5" />
                    </div>

                    <div>

                      <h2 className="font-semibold">
                        {account.accountType} Account
                      </h2>

                      <p className="text-xs text-muted-foreground">
                        Account #{account.accountNumber}
                      </p>

                    </div>

                  </div>


                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                    {account.status}
                  </span>

                </div>


                <div className="mt-8">

                  <p className="text-sm text-muted-foreground">
                    Available Balance
                  </p>

                  <p className="mt-1 text-3xl font-bold tracking-tight">

                    ₹
                    {Number(
                      account.balance || 0
                    ).toLocaleString(
                      "en-IN",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}

                  </p>

                </div>


                <div className="mt-6 border-t border-border pt-4">

                  <p className="text-xs text-muted-foreground">
                    Created
                  </p>

                  <p className="mt-1 text-sm font-medium">

                    {account.createdAt
                      ? new Date(
                          account.createdAt
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "-"}

                  </p>

                </div>

              </div>

            ))}

          </div>
        )}


      {/* ================= CREATE ACCOUNT MODAL ================= */}

      {showCreate && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-md rounded-2xl bg-card p-6 shadow-xl">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-lg font-semibold">
                  Create Account
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Choose the type of bank account.
                </p>
              </div>


              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="rounded-lg p-2 hover:bg-muted"
              >
                <X className="size-5" />
              </button>

            </div>


            <div className="mt-6 space-y-3">

              <button
                type="button"
                onClick={() =>
                  setAccountType("SAVINGS")
                }
                className={`w-full rounded-xl border p-4 text-left transition ${
                  accountType === "SAVINGS"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-muted"
                }`}
              >

                <p className="font-semibold">
                  Savings Account
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  For personal savings and everyday banking.
                </p>

              </button>


              <button
                type="button"
                onClick={() =>
                  setAccountType("CURRENT")
                }
                className={`w-full rounded-xl border p-4 text-left transition ${
                  accountType === "CURRENT"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-muted"
                }`}
              >

                <p className="font-semibold">
                  Current Account
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Suitable for regular business transactions.
                </p>

              </button>

            </div>


            <button
              type="button"
              onClick={handleCreateAccount}
              disabled={creating}
              className="mt-6 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
            >
              {creating
                ? "Creating..."
                : `Create ${accountType === "SAVINGS" ? "Savings" : "Current"} Account`}
            </button>

          </div>

        </div>

      )}

    </div>
  );
}