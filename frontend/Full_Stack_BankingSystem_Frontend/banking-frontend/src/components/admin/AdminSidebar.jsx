import {
  LayoutDashboard,
  Users,
  CreditCard,
  ArrowLeftRight,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const navigation = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      name: "Accounts",
      path: "/admin/accounts",
      icon: CreditCard,
    },
    {
      name: "Transactions",
      path: "/admin/transactions",
      icon: ArrowLeftRight,
    },
  ];

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-200 bg-slate-950 lg:block">

      {/* Logo */}
      <div className="flex h-20 items-center gap-3 border-b border-slate-800 px-6">

        <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-600">
          <ShieldCheck className="size-5 text-white" />
        </div>

        <div>
          <p className="font-bold text-white">
            Banking System
          </p>

          <p className="text-xs text-slate-400">
            ADMIN PANEL
          </p>
        </div>

      </div>

      {/* Navigation */}
      <nav className="space-y-2 p-4">

        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`
              }
            >
              <Icon className="size-5" />
              {item.name}
            </NavLink>
          );
        })}

      </nav>

      {/* Bottom */}
      <div className="absolute bottom-0 w-full border-t border-slate-800 p-4">

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="size-5" />
          Logout
        </button>

      </div>

    </aside>
  );
}