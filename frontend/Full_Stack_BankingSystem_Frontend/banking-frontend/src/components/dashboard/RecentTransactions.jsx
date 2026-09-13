import {
  ArrowDownLeft,
  ArrowUpRight,
  ArrowLeftRight,
  Receipt,
} from "lucide-react";

import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

import {
  formatCurrency,
  formatDate,
} from "../../lib/format";

import { transactions } from "../../lib/mockData";

function getTransactionIcon(type) {
  switch (type) {
    case "deposit":
      return ArrowDownLeft;

    case "transfer":
      return ArrowLeftRight;

    case "payment":
      return ArrowUpRight;

    default:
      return Receipt;
  }
}

export function RecentTransactions() {
  return (
    <Card className="p-5">

      <div className="flex items-center justify-between">

        <div>
          <h3 className="font-semibold">
            Recent Transactions
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Your latest account activity
          </p>
        </div>

        <button
          type="button"
          className="text-sm font-medium text-primary hover:underline"
        >
          View all
        </button>

      </div>

      <div className="mt-5 divide-y divide-border">

        {transactions.map((transaction) => {

          const Icon = getTransactionIcon(
            transaction.type
          );

          const isCredit =
            transaction.amount > 0;

          return (
            <div
              key={transaction.id}
              className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
            >

              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
                  isCredit
                    ? "bg-positive/10 text-positive"
                    : "bg-negative/10 text-negative"
                }`}
              >
                <Icon className="size-5" />
              </div>

              <div className="min-w-0 flex-1">

                <p className="truncate text-sm font-medium">
                  {transaction.description}
                </p>

                <div className="mt-1 flex items-center gap-2">

                  <p className="text-xs text-muted-foreground">
                    {transaction.account}
                  </p>

                  <span className="text-muted-foreground/40">
                    •
                  </span>

                  <p className="text-xs text-muted-foreground">
                    {formatDate(transaction.date)}
                  </p>

                </div>

              </div>

              <div className="text-right">

                <p
                  className={`text-sm font-semibold ${
                    isCredit
                      ? "text-positive"
                      : "text-negative"
                  }`}
                >
                  {isCredit ? "+" : ""}
                  {formatCurrency(
                    transaction.amount,
                    {
                      currency: "INR",
                      signed: false,
                    }
                  )}
                </p>

                <Badge
                  variant="secondary"
                  className="mt-1 text-[10px]"
                >
                  {transaction.status}
                </Badge>

              </div>

            </div>
          );
        })}

      </div>

    </Card>
  );
}