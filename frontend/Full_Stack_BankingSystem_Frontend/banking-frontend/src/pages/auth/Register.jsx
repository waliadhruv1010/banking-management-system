import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, ShieldCheck } from "lucide-react";

import { AuthShell } from "../../components/auth/AuthShell";
import { RegisterForm } from "../../components/auth/RegisterForm";
import { Logo } from "../../components/banking/Logo";
import { registerUser } from "../../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  async function handleRegister(userData) {
    try {
      setLoading(true);
      setServerError("");

      const response = await registerUser(userData);

      console.log("Registration response:", response);

      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);

      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";

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
          <UserPlus className="size-6" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight">
          Create your account
        </h1>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Open your Banking System account and start managing your money
          securely.
        </p>
      </div>

      {serverError && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      <RegisterForm
        onSubmit={handleRegister}
        loading={loading}
      />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>

      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="size-3.5" />
        Secure banking environment
      </div>

    </AuthShell>
  );
}
