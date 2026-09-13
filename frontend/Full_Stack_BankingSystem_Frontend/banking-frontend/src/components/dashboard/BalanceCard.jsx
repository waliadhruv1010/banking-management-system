import { useState } from "react";
import { Eye, EyeOff, TrendingUp } from "lucide-react";

import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { formatCurrency, maskCurrency } from "../../lib/format";
import { totalBalance, balanceTrend } from "../../lib/mockData";

export function BalanceCard() {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <Card className="overflow-hidden border-0 bg-primary text-primary-foreground shadow-lg">
      <div className="p-6 md:p-7">

        <div className="flex items-start justify-between">

          <div>
            <p className="text-sm text-primary-foreground/70">
              Total Balance
            </p>

            <div className="mt-2 flex items-center gap-3">

              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                {showBalance
                  ? formatCurrency(totalBalance, { currency: "INR" })
                  : maskCurrency()}
              </h2>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowBalance(!showBalance)}
                className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                aria-label="Toggle balance visibility"
              >
                {showBalance ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </Button>

            </div>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-positive/15 px-3 py-1.5 text-sm font-medium text-positive">
            <TrendingUp className="size-4" />
            {balanceTrend}%
          </div>

        </div>

        <div className="mt-8 flex items-center justify-between">

          <div>
            <p className="text-xs text-primary-foreground/50">
              Available balance
            </p>

            <p className="mt-1 text-sm font-medium">
              Ready to use
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-primary-foreground/50">
              Currency
            </p>

            <p className="mt-1 text-sm font-medium">
              INR
            </p>
          </div>

        </div>

      </div>
    </Card>
  );
}