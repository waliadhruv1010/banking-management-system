import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  LayoutDashboard,
  Landmark,
  Receipt,
  Settings,
  ShieldCheck,
  User,
  Users,
  BarChart3,
  LogOut,
  X,
} from "lucide-react";

import { cn } from "../../lib/utils";

const mainNav = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    key: "dashboard",
  },
  {
    label: "Accounts",
    icon: Landmark,
    key: "accounts",
  },
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

const accountNav = [
  {
    label: "Profile",
    icon: User,
    key: "profile",
  },
  {
    label: "Settings",
    icon: Settings,
    key: "settings",
  },
];

const adminNav = [
  {
    label: "User Management",
    icon: Users,
    key: "users",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    key: "admin-analytics",
  },
];

function NavList({ items, active, onSelect }) {
  return (
    <ul className="flex flex-col gap-1">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.key;

        return (
          <li key={item.key}>
            <button
              type="button"
              onClick={() => onSelect(item.key)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive &&
                  "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
              )}
            >
              <Icon className="size-[18px] shrink-0" />

              <span className="truncate">
                {item.label}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
      {children}
    </p>
  );
}

export function SidebarContent({
  isAdmin = false,
  onNavigate,
}) {
  const navigate = useNavigate();

  const [active, setActive] = useState("dashboard");

  function handleSelect(key) {
    setActive(key);

    const routes = {
      dashboard: "/dashboard",
      accounts: "/accounts",
      deposit: "/deposit",
      withdraw: "/withdraw",
      transfer: "/transfer",
      transactions: "/transactions",
      profile: "/profile",
      settings: "/settings",
      users: "/admin/users",
      "admin-analytics": "/admin/analytics",
    };

    const path = routes[key];

    if (path) {
      navigate(path);
    }

    onNavigate?.();
  }

  function handleLogout() {
    localStorage.removeItem("token");

    navigate("/login", {
      replace: true,
    });

    onNavigate?.();
  }

  return (
    <div className="flex h-full flex-col gap-6 bg-sidebar p-4 text-sidebar-foreground">

      {/* Logo */}
      <div className="flex items-center gap-2.5 px-2 pt-2">
        <div className="flex size-9 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
          <Landmark className="size-5" />
        </div>

        <div className="leading-tight">
          <p className="text-sm font-semibold">
            Banking System
          </p>

          <p className="text-[11px] text-sidebar-foreground/50">
            Digital Banking
          </p>
        </div>
      </div>


      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-5 overflow-y-auto">

        {/* Main Menu */}
        <div>
          <SectionLabel>
            Menu
          </SectionLabel>

          <NavList
            items={mainNav}
            active={active}
            onSelect={handleSelect}
          />
        </div>


        {/* Account */}
        <div>
          <SectionLabel>
            Account
          </SectionLabel>

          <NavList
            items={accountNav}
            active={active}
            onSelect={handleSelect}
          />
        </div>


        {/* Admin */}
        {isAdmin && (
          <div className="mt-auto rounded-xl border border-sidebar-border/60 bg-sidebar-accent/40 p-2">

            <div className="flex items-center gap-2 px-2 pb-1.5 pt-1">

              <ShieldCheck className="size-3.5 text-sidebar-primary" />

              <SectionLabel>
                Admin
              </SectionLabel>

            </div>

            <NavList
              items={adminNav}
              active={active}
              onSelect={handleSelect}
            />

          </div>
        )}

      </nav>


      {/* Logout */}
      <button
        type="button"
        onClick={handleLogout}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-red-500/15 hover:text-red-500"
      >
        <LogOut className="size-[18px]" />

        Logout
      </button>

    </div>
  );
}


export function Sidebar({
  isAdmin = false,
}) {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-sidebar-border lg:block">

      <div className="sticky top-0 h-svh">

        <SidebarContent
          isAdmin={isAdmin}
        />

      </div>

    </aside>
  );
}


export function MobileSidebar({
  open,
  onClose,
  isAdmin = false,
}) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 lg:hidden",

        open
          ? "pointer-events-auto"
          : "pointer-events-none"
      )}
    >

      {/* Overlay */}
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity",

          open
            ? "opacity-100"
            : "opacity-0"
        )}
      />


      {/* Sidebar */}
      <div
        className={cn(
          "absolute inset-y-0 left-0 w-72 max-w-[85%] shadow-xl transition-transform duration-300",

          open
            ? "translate-x-0"
            : "-translate-x-full"
        )}
      >

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-lg"
          aria-label="Close menu"
        >
          <X className="size-5" />
        </button>


        <SidebarContent
          isAdmin={isAdmin}
          onNavigate={onClose}
        />

      </div>

    </div>
  );
}
