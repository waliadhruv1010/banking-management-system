import {
  ShieldCheck,
  TrendingUp,
  Landmark,
} from "lucide-react";

import { Logo } from "../banking/Logo";

const highlights = [
  {
    icon: ShieldCheck,
    title: "Secure banking",
    description:
      "Your accounts and transactions are protected with secure authentication.",
  },
  {
    icon: TrendingUp,
    title: "Clear financial insights",
    description:
      "Track balances and transactions with simple, useful financial information.",
  },
  {
    icon: Landmark,
    title: "Everything in one place",
    description:
      "Manage accounts, deposits, withdrawals, transfers, and transactions from one dashboard.",
  },
];

export function AuthShell({ children }) {
  return (
    <main className="flex min-h-screen bg-background">

      {/* Left promotional section */}
      <section className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-primary p-12 text-primary-foreground lg:flex">

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(120% 100% at 100% 0%, rgba(99,102,241,.65) 0%, transparent 55%), radial-gradient(90% 90% at 0% 100%, rgba(16,185,129,.35) 0%, transparent 50%)",
          }}
        />

        <div className="relative z-10">
          <Logo tone="inverted" />
        </div>

        <div className="relative z-10 max-w-md">

          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight">
            Banking made simple, secure and powerful.
          </h1>

          <p className="mt-4 text-pretty text-sm leading-relaxed text-primary-foreground/70">
            Manage your money with clarity, control, and confidence from one
            modern banking platform.
          </p>

          <ul className="mt-10 space-y-6">

            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <li
                  key={item.title}
                  className="flex gap-4"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15">
                    <Icon className="size-5" />
                  </span>

                  <div>
                    <p className="text-sm font-medium">
                      {item.title}
                    </p>

                    <p className="mt-1 text-sm leading-relaxed text-primary-foreground/65">
                      {item.description}
                    </p>
                  </div>
                </li>
              );
            })}

          </ul>

        </div>

        <p className="relative z-10 text-xs text-primary-foreground/50">
          Secure Digital Banking
        </p>

      </section>

      {/* Form section */}
      <section className="flex w-full flex-col lg:w-1/2">

        <div className="flex items-center justify-between p-6 lg:hidden">
          <Logo />
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10">

          <div className="w-full max-w-md">
            {children}
          </div>

        </div>

      </section>

    </main>
  );
}