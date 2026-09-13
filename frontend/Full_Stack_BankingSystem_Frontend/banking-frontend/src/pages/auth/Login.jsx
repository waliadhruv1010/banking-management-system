import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

import { AuthShell } from "../../components/auth/AuthShell";
import { LoginForm } from "../../components/auth/LoginForm";
import { Logo } from "../../components/banking/Logo";
import { loginUser } from "../../services/authService";
import { getMyProfile } from "../../services/userService";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  async function handleLogin(credentials) {
    try {
      setLoading(true);
      setServerError("");

      // 1. Login
      const response = await loginUser(credentials);

      console.log("Login response:", response);

      const token = response.data;

      if (!token) {
        throw new Error("JWT token was not received");
      }

      // 2. Save JWT
      localStorage.setItem("token", token);

      // 3. Get logged-in user's profile
      const profileResponse = await getMyProfile();

      console.log("Profile response:", profileResponse);

      const user = profileResponse?.data;

      console.log("Logged-in user:", user);
      console.log("Logged-in user role:", user?.role);

      if (!user) {
        throw new Error("Unable to load user profile");
      }

      // 4. Redirect according to role
      if (user.role === "ADMIN") {
        console.log("ADMIN detected → navigating to /admin");
        navigate("/admin", { replace: true });
      } else {
        console.log("USER detected → navigating to /dashboard");
        navigate("/dashboard", { replace: true });
      }

    } catch (error) {
      console.error("Login failed:", error);

      const message =
        error.response?.data?.message ||
        error.message ||
        "Invalid email or password.";

      setServerError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell>

      <div className="mb-8 lg:hidden">
        <Logo />
      </div>

      <div className="mb-8">
        <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <ShieldCheck className="size-6" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back
        </h1>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Sign in to your Banking System account to continue.
        </p>
      </div>

      {serverError && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      <LoginForm
        onSubmit={handleLogin}
        loading={loading}
      />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-primary hover:underline"
        >
          Create an account
        </Link>
      </p>

      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="size-3.5" />
        Secure banking environment
      </div>

    </AuthShell>
  );
}