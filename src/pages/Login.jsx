import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import API from "../api/axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const { login, checkAuth } = useAuth();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const inviteCode = sessionStorage.getItem("inviteCode");

  // STRICT VALIDATION: Email must be valid & Password must be 8+ chars
  useEffect(() => {
    const isValidEmail = formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const isValid = isValidEmail && formData.password.length >= 8;
    setIsFormValid(isValid);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault(); // Prevents reload
    if (!isFormValid || loading) return;

    setLoading(true);
    setError("");

    try {
      await login(formData.email, formData.password);
      if (inviteCode) {
        try {
          await API.post("/relationship/pair", {
            inviteCode: inviteCode.toUpperCase(),
          });
          sessionStorage.removeItem("inviteCode");
          await checkAuth();
          navigate("/welcome-questions");
        } catch {
          navigate("/dashboard");
        }
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Invalid Access Key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 dark:from-[#0b0b0f] dark:via-[#0f0f14] dark:to-[#0b0b12] flex items-center justify-center px-6 relative overflow-hidden transition-all duration-700">
      {/* Ambient Background Glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-[140px]" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-rose-400/20 rounded-full blur-[140px]" />

      <button
        type="button"
        onClick={toggleTheme}
        className="absolute top-8 right-8 z-50 px-5 py-3 rounded-full bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-lg hover:scale-105 transition-all"
      >
        {isDark ? "☀️" : "🌙"}
      </button>

      <div className="relative w-full max-w-[440px] bg-white/70 dark:bg-white/5 backdrop-blur-2xl p-14 rounded-[3rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] border border-white/30 dark:border-white/10 transition-all duration-500">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-rose-500 bg-clip-text text-transparent tracking-tight">
            Welcome Back
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-3 italic tracking-wide">
            Step back into your shared world.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-7 py-5 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:ring-2 ring-purple-400/60 outline-none transition-all dark:text-white placeholder:text-slate-400"
          />

          <div className="space-y-2 text-right">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-7 py-5 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:ring-2 ring-rose-400/60 outline-none transition-all dark:text-white placeholder:text-slate-400"
            />
            <Link
              to="/forgot-password"
              className="text-[11px] font-semibold text-slate-400 hover:text-rose-500 transition-colors"
            >
              Forgot your secret?
            </Link>
          </div>

          {error && (
            <p className="text-rose-500 text-xs font-semibold text-center bg-rose-500/10 py-3 rounded-xl border border-rose-500/20">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`w-full h-[65px] rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center shadow-xl
          ${
            isFormValid
              ? "bg-gradient-to-r from-purple-600 to-rose-500 text-white hover:shadow-2xl hover:scale-[1.02] active:scale-95"
              : "bg-slate-200 dark:bg-white/5 text-slate-400 dark:text-white/20 cursor-not-allowed"
          }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              "Enter Your World"
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
          <Link to="/register" className="text-slate-400 text-sm font-medium">
            No key yet?{" "}
            <span className="text-slate-900 dark:text-white underline underline-offset-4 decoration-purple-500">
              Create One
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
