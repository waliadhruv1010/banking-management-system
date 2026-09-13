import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const location = useLocation();

  const token = localStorage.getItem("token");

  console.log("ProtectedRoute token:", token);

  // No JWT → send user to login
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // JWT exists → allow access
  return <Outlet />;
}
