import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function AdminRoute() {
  const { user, loadingUser } = useUser();

  if (loadingUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-sm text-slate-500">
          Checking administrator access...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}