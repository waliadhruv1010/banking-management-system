import {
  BarChart3,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { Card } from "../ui/card";
import { monthlySummary } from "../../lib/mockData";
import { formatCurrency } from "../../lib/format";

export function AnalyticsChart() {
  const maxValue = Math.max(
    ...monthlySummary.flatMap((item) => [
      item.deposits,
      item.withdrawals,
    ])
  );

  return (
    <Card className="p-5">

      <div className="flex items-start justify-between">

        <div>
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BarChart3 className="size-4.5" />
            </div>

            <div>
              <h3 className="font-semibold">
                Financial Overview
              </h3>

              <p className="text-xs text-muted-foreground">
                Deposits vs withdrawals
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">

          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-primary" />
            <span className="text-muted-foreground">
              Deposits
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-muted-foreground/40" />
            <span className="text-muted-foreground">
              Withdrawals
            </span>
          </div>

        </div>

      </div>

      <div className="mt-6 h-56">

        <div className="flex h-full items-end gap-3 md:gap-5">

          {monthlySummary.map((item) => {

            const depositHeight =
              (item.deposits / maxValue) * 100;

            const withdrawalHeight =
              (item.withdrawals / maxValue) * 100;

            return (
              <div
                key={item.month}
                className="flex h-full flex-1 flex-col justify-end"
              >

                <div className="flex h-full items-end justify-center gap-1">

                  <div
                    className="w-3 rounded-t-md bg-primary transition-all duration-500 hover:opacity-80 md:w-5"
                    style={{
                      height: `${depositHeight}%`,
                    }}
                    title={`Deposits: ${formatCurrency(
                      item.deposits,
                      { currency: "INR" }
                    )}`}
                  />

                  <div
                    className="w-3 rounded-t-md bg-muted-foreground/30 transition-all duration-500 hover:opacity-80 md:w-5"
                    style={{
                      height: `${withdrawalHeight}%`,
                    }}
                    title={`Withdrawals: ${formatCurrency(
                      item.withdrawals,
                      { currency: "INR" }
                    )}`}
                  />

                </div>

                <p className="mt-2 text-center text-xs text-muted-foreground">
                  {item.month}
                </p>

              </div>
            );
          })}

        </div>

      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-4">

        <div className="flex items-center gap-3">

          <div className="flex size-8 items-center justify-center rounded-lg bg-positive/10 text-positive">
            <TrendingUp className="size-4" />
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              Total deposits
            </p>

            <p className="font-semibold">
              {formatCurrency(
                monthlySummary.reduce(
                  (sum, item) => sum + item.deposits,
                  0
                ),
                { currency: "INR" }
              )}
            </p>
          </div>

        </div>

        <div className="flex items-center gap-3">

          <div className="flex size-8 items-center justify-center rounded-lg bg-negative/10 text-negative">
            <TrendingDown className="size-4" />
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              Total withdrawals
            </p>

            <p className="font-semibold">
              {formatCurrency(
                monthlySummary.reduce(
                  (sum, item) => sum + item.withdrawals,
                  0
                ),
                { currency: "INR" }
              )}
            </p>
          </div>

        </div>

      </div>

    </Card>
  );
}