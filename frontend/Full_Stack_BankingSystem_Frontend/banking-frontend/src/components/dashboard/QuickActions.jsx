import {
  ArrowDownToLine,
  ArrowLeftRight,
  ArrowUpFromLine,
  Receipt,
} from "lucide-react";

import { Card } from "../ui/card";

const actions = [
  {
    label: "Deposit",
    icon: ArrowDownToLine,
    key: "deposit",
  },
  {
    label: "Withdraw",
    icon: ArrowUpFromLine,
    key: "withdraw",
  },
  {
    label: "Transfer",
    icon: ArrowLeftRight,
    key: "transfer",
  },
  {
    label: "Transactions",
    icon: Receipt,
    key: "transactions",
  },
];

export function QuickActions({ onAction }) {
  return (
    <Card className="p-5">

      <div>
        <h3 className="font-semibold">
          Quick Actions
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your money quickly
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.key}
              type="button"
              onClick={() => onAction?.(action.key)}
              className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-muted/30 p-4 transition-all hover:-translate-y-0.5 hover:bg-muted hover:shadow-sm"
            >

              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" />
              </div>

              <span className="text-xs font-medium">
                {action.label}
              </span>

            </button>
          );
        })}

      </div>

    </Card>
  );
}