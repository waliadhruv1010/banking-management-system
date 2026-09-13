import { useEffect, useState } from "react";
import { ArrowUpFromLine, Loader2 } from "lucide-react";

import { getMyAccounts } from "../../services/accountService";
import { withdrawMoney } from "../../services/transactionService";

export default function Withdraw() {
  const [accounts, setAccounts] = useState([]);
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(true);
  const [withdrawing, setWithdrawing] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadAccounts() {
    try {
      setLoading(true);
      setError("");

      const response = await getMyAccounts();

      const accountData = Array.isArray(response?.data)
        ? response.data
        : [];

      const activeAccounts = accountData.filter(
        (account) => account.status === "ACTIVE"
      );

      setAccounts(activeAccounts);

      if (activeAccounts.length > 0) {
        setAccountNumber(
          String(activeAccounts[0].accountNumber)
        );
      }
    } catch (error) {
      console.error("Failed to load accounts:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load your accounts."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleWithdraw(event) {
    event.preventDefault();

    setMessage("");
    setError("");

    const numericAmount = Number(amount);

    if (!accountNumber) {
      setError("Please select an account.");
      return;
    }

    if (!numericAmount || numericAmount <= 0) {
      setError("Please enter an amount greater than zero.");
      return;
    }

    // Frontend balance check
    const selectedAccount = accounts.find(
      (account) =>
        String(account.accountNumber) === String(accountNumber)
    );

    if (
      selectedAccount &&
      numericAmount > Number(selectedAccount.balance)
    ) {
      setError("Insufficient balance.");
      return;
    }

    try {
      setWithdrawing(true);

      await withdrawMoney(
        accountNumber,
        numericAmount
      );

      setMessage(
        `₹${numericAmount.toFixed(
          2
        )} withdrawn successfully.`
      );

      setAmount("");

      // Refresh account balance
      await loadAccounts();

    } catch (error) {
      console.error("Withdrawal failed:", error);
      console.error(
        "Server response:",
        error.response?.data
      );

      setError(
        error.response?.data?.message ||
          "Unable to complete the withdrawal."
      );
    } finally {
      setWithdrawing(false);
    }
  }

  useEffect(() => {
    loadAccounts();
  }, []);

  const selectedAccount = accounts.find(
    (account) =>
      String(account.accountNumber) ===
      String(accountNumber)
  );

  return (
    <div className="mx-auto max-w-2xl space-y-6">

      {/* Header */}
      <div>
        <div className="flex items-center gap-3">

          <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ArrowUpFromLine className="size-5" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Withdraw Money
            </h1>

            <p className="text-sm text-muted-foreground">
              Withdraw money from your bank account
            </p>
          </div>

        </div>
      </div>


      {/* Card */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">

        {loading ? (

          <div className="flex items-center justify-center py-12">
            <Loader2 className="size-6 animate-spin text-primary" />
          </div>

        ) : accounts.length === 0 ? (

          <div className="rounded-xl border border-dashed border-border p-8 text-center">

            <p className="font-medium">
              No active accounts available
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Create an account before making a withdrawal.
            </p>

          </div>

        ) : (

          <form
            onSubmit={handleWithdraw}
            className="space-y-6"
          >

            {/* Account */}
            <div className="space-y-2">

              <label className="text-sm font-medium">
                Select Account
              </label>

              <select
                value={accountNumber}
                onChange={(event) =>
                  setAccountNumber(event.target.value)
                }
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >

                {accounts.map((account) => (

                  <option
                    key={account.accountNumber}
                    value={account.accountNumber}
                  >
                    {account.accountType} Account — ****{" "}
                    {String(account.accountNumber).slice(-4)}
                  </option>

                ))}

              </select>

            </div>


            {/* Balance */}
            {selectedAccount && (

              <div className="rounded-xl bg-muted/50 p-4">

                <p className="text-sm text-muted-foreground">
                  Available Balance
                </p>

                <p className="mt-1 text-2xl font-bold">
                  ₹
                  {Number(
                    selectedAccount.balance
                  ).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {selectedAccount.accountType} Account
                </p>

              </div>

            )}


            {/* Amount */}
            <div className="space-y-2">

              <label className="text-sm font-medium">
                Withdrawal Amount
              </label>

              <div className="relative">

                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  ₹
                </span>

                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={amount}
                  onChange={(event) =>
                    setAmount(event.target.value)
                  }
                  placeholder="Enter amount"
                  className="h-12 w-full rounded-lg border border-border bg-background pl-8 pr-3 text-lg font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />

              </div>

            </div>


            {/* Error */}
            {error && (

              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>

            )}


            {/* Success */}
            {message && (

              <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {message}
              </div>

            )}


            {/* Submit */}
            <button
              type="submit"
              disabled={withdrawing}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {withdrawing ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ArrowUpFromLine className="size-4" />
                  Withdraw Money
                </>
              )}

            </button>

          </form>

        )}

      </div>

    </div>
  );
}