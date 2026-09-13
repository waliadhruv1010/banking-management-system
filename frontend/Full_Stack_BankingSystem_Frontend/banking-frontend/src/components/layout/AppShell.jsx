import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Sidebar, MobileSidebar } from "./Sidebar";
import { Header } from "./Header";

export function AppShell() {

  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();

  const titles = {
  "/dashboard": "Dashboard",
  "/accounts": "My Accounts",
  "/deposit": "Deposit Money",
  "/withdraw": "Withdraw Money",
  "/transfer": "Transfer Money",
  "/transactions": "Transaction History",
};

  const title =
    titles[location.pathname] || "Banking System";

  return (
    <div className="flex min-h-screen bg-background">

      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar */}
      <MobileSidebar
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Header */}
        <Header
          title={title}
          onMenuClick={() => setMobileOpen(true)}
        />

        {/* Page */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}