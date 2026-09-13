import {
  ArrowUpRight,
  Landmark,
} from "lucide-react";

import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  formatCurrency,
  maskAccountNumber,
} from "../../lib/format";

export function AccountCard({ account }) {
  const isPositive = account.trend >= 0;

  return (
    <Card className="group relative overflow-hidden p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Landmark className="size-5" />
          </div>

          <div>
            <p className="font-semibold">
              {account.name}
            </p>

            <p className="mt-0.5 text-xs text-muted-foreground">
              {maskAccountNumber(account.number)}
            </p>
          </div>

        </div>

        <Badge
          variant="secondary"
          className="capitalize"
        >
          {account.status}
        </Badge>

      </div>

      <div className="mt-6">

        <p className="text-xs text-muted-foreground">
          Available balance
        </p>

        <p className="mt-1 text-2xl font-bold tracking-tight">
          {formatCurrency(account.balance, {
            currency: account.currency,
          })}
        </p>

      </div>

      <div className="mt-5 flex items-center justify-between">

        <span
          className={`text-xs font-medium ${
            isPositive
              ? "text-positive"
              : "text-negative"
          }`}
        >
          {isPositive ? "+" : ""}
          {account.trend}% this month
        </span>

        <button
          type="button"
          className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          View details
          <ArrowUpRight className="size-3.5" />
        </button>

      </div>

    </Card>
  );
}