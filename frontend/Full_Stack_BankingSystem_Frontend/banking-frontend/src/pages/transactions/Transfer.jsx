import { useEffect, useState } from "react";
import {
  ArrowLeftRight,
  Loader2,
  ShieldCheck,
} from "lucide-react";

import { getMyAccounts } from "../../services/accountService";
import { transferMoney } from "../../services/transactionService";

export default function Transfer() {
  const [accounts, setAccounts] = useState([]);

  const [senderAccountNumber, setSenderAccountNumber] =
    useState("");

  const [receiverAccountNumber, setReceiverAccountNumber] =
    useState("");

  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(true);
  const [transferring, setTransferring] = useState(false);

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
        setSenderAccountNumber(
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

  async function handleTransfer(event) {
    event.preventDefault();

    setMessage("");
    setError("");

    const numericAmount = Number(amount);

    if (!senderAccountNumber) {
      setError("Please select a sender account.");
      return;
    }

    if (!receiverAccountNumber.trim()) {
      setError("Please enter the receiver account number.");
      return;
    }

    if (!numericAmount || numericAmount <= 0) {
      setError("Please enter an amount greater than zero.");
      return;
    }

    if (
      String(senderAccountNumber) ===
      String(receiverAccountNumber).trim()
    ) {
      setError(
        "Sender and receiver accounts cannot be the same."
      );
      return;
    }

    const senderAccount = accounts.find(
      (account) =>
        String(account.accountNumber) ===
        String(senderAccountNumber)
    );

    if (
      senderAccount &&
      numericAmount > Number(senderAccount.balance)
    ) {
      setError("Insufficient balance.");
      return;
    }

    try {
      setTransferring(true);

      await transferMoney(
        senderAccountNumber,
        receiverAccountNumber.trim(),
        numericAmount
      );

      setMessage(
        `₹${numericAmount.toFixed(
          2
        )} transferred successfully.`
      );

      setReceiverAccountNumber("");
      setAmount("");

      // Refresh sender balance
      await loadAccounts();
    } catch (error) {
      console.error("Transfer failed:", error);
      console.error(
        "Server response:",
        error.response?.data
      );

      setError(
        error.response?.data?.message ||
          "Unable to complete the transfer."
      );
    } finally {
      setTransferring(false);
    }
  }

  useEffect(() => {
    loadAccounts();
  }, []);

  const selectedSender = accounts.find(
    (account) =>
      String(account.accountNumber) ===
      String(senderAccountNumber)
  );

  return (
    <div className="mx-auto max-w-2xl space-y-6">

      {/* Header */}
      <div>
        <div className="flex items-center gap-3">

          <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ArrowLeftRight className="size-5" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Transfer Money
            </h1>

            <p className="text-sm text-muted-foreground">
              Send money securely to another account
            </p>
          </div>

        </div>
      </div>


      {/* Transfer Card */}
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
              Create an account before making a transfer.
            </p>

          </div>

        ) : (

          <form
            onSubmit={handleTransfer}
            className="space-y-6"
          >

            {/* From Account */}
            <div className="space-y-2">

              <label className="text-sm font-medium">
                From Account
              </label>

              <select
                value={senderAccountNumber}
                onChange={(event) =>
                  setSenderAccountNumber(
                    event.target.value
                  )
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


            {/* Available Balance */}
            {selectedSender && (

              <div className="rounded-xl bg-muted/50 p-4">

                <p className="text-sm text-muted-foreground">
                  Available Balance
                </p>

                <p className="mt-1 text-2xl font-bold">
                  ₹
                  {Number(
                    selectedSender.balance
                  ).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>

              </div>

            )}


            {/* Receiver */}
            <div className="space-y-2">

              <label className="text-sm font-medium">
                Receiver Account Number
              </label>

              <input
                type="text"
                inputMode="numeric"
                value={receiverAccountNumber}
                onChange={(event) =>
                  setReceiverAccountNumber(
                    event.target.value
                  )
                }
                placeholder="Enter receiver account number"
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />

              <p className="text-xs text-muted-foreground">
                Enter the account number of the person you
                want to transfer money to.
              </p>

            </div>


            {/* Amount */}
            <div className="space-y-2">

              <label className="text-sm font-medium">
                Transfer Amount
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


            {/* Security Notice */}
            <div className="flex gap-3 rounded-xl border border-border bg-muted/30 p-4">

              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />

              <div>
                <p className="text-sm font-medium">
                  Secure Transfer
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Your transfer is protected by JWT
                  authentication and server-side transaction
                  validation.
                </p>
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
              disabled={transferring}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {transferring ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Processing Transfer...
                </>
              ) : (
                <>
                  <ArrowLeftRight className="size-4" />
                  Transfer Money
                </>
              )}

            </button>

          </form>

        )}

      </div>

    </div>
  );
}