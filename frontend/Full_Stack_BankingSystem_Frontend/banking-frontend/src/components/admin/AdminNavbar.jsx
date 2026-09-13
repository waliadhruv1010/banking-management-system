import { Bell, ShieldCheck } from "lucide-react";

import { useUser } from "../../context/UserContext";

export default function AdminNavbar() {
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">

      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">

        <div>
          <p className="text-sm font-medium text-slate-500">
            Administrator
          </p>

          <p className="text-lg font-semibold text-slate-900">
            Control Center
          </p>
        </div>

        <div className="flex items-center gap-4">

          <button className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100">
            <Bell className="size-5" />

            <span className="absolute right-1 top-1 size-2 rounded-full bg-red-500" />
          </button>

          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          <div className="flex items-center gap-3">

            <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <ShieldCheck className="size-5" />
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-900">
                {user?.name || "Administrator"}
              </p>

              <p className="text-xs text-slate-500">
                {user?.email || "Admin"}
              </p>
            </div>

          </div>

        </div>

      </div>

    </header>
  );
}