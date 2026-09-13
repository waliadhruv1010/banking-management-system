import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-100">

      <AdminSidebar />

      <div className="lg:pl-64">

        <AdminNavbar />

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}