import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";
import Accounts from "../pages/accounts/Accounts";
import Deposit from "../pages/transactions/Deposit";
import Withdraw from "../pages/transactions/Withdraw";
import Transfer from "../pages/transactions/Transfer";
import Transactions from "../pages/transactions/Transactions";
import Profile from "../pages/profile/Profile";
import Settings from "../pages/profile/Settings";
import ChangePassword from "../pages/profile/ChangePassword";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

import { AppShell } from "../components/layout/AppShell";
import AdminLayout from "../components/admin/AdminLayout";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminAccounts from "../pages/admin/AdminAccounts";
import AdminTransactions from "../pages/admin/AdminTransactions";

export default function AppRoutes() {
  return (
    <Routes>

      {/* ================= AUTH ================= */}

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />


      {/* ================= USER APP ================= */}

      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/accounts" element={<Accounts />} />

          <Route path="/deposit" element={<Deposit />} />

          <Route path="/withdraw" element={<Withdraw />} />

          <Route path="/transfer" element={<Transfer />} />

          <Route path="/transactions" element={<Transactions />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/settings" element={<Settings />} />

          <Route
            path="/change-password"
            element={<ChangePassword />}
          />

        </Route>
      </Route>


      {/* ================= ADMIN PANEL ================= */}

      <Route element={<AdminRoute />}>

        <Route element={<AdminLayout />}>

          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/users"
            element={<AdminUsers />}
          />

          <Route
            path="/admin/accounts"
            element={<AdminAccounts />}
          />

          <Route
            path="/admin/transactions"
            element={<AdminTransactions />}
          />

        </Route>

      </Route>


      {/* ================= DEFAULT ================= */}

      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />

      <Route
        path="*"
        element={<Navigate to="/dashboard" replace />}
      />

    </Routes>
  );
}