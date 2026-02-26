import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Eye, EyeOff, Check, X } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const inviteCode = sessionStorage.getItem("inviteCode");

  // --- Functions defined up top to prevent "Initialization Error" ---
  const validateName = (name) => {
    const trimmed = name.trim();
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
    return trimmed.length >= 2 && regex.test(trimmed);
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // --- State ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  // --- Password Rules ---
  const passwordRules = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /\d/.test(formData.password),
    special: /[@$!%*?&]/.test(formData.password),
  };

  const isPasswordSecure = Object.values(passwordRules).every(Boolean);

  // --- Validation Sync ---
  useEffect(() => {
    const valid =
      validateName(formData.name) &&
      validateEmail(formData.email) &&
      isPasswordSecure;
    setIsFormValid(valid);
  }, [formData, isPasswordSecure]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (fieldErrors.general) setFieldErrors({});
  };

  const handleRegister = async (e) => {
    // PREVENT DEFAULT STOPS THE RELOAD
    if (e) e.preventDefault();
    if (!isFormValid || loading) return;

    setLoading(true);
    try {
      const res = await API.post("/auth/register", formData);
      localStorage.setItem("token", res.data.token);
      await checkAuth();
      navigate(inviteCode ? "/onboarding?mode=join" : "/dashboard");
    } catch (err) {
      setFieldErrors({
        general: err.response?.data?.error || "Connection failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08080a] flex items-center justify-center px-6 py-16 relative overflow-hidden transition-colors duration-500">
      <div className="absolute -top-32 -right-32 w-[450px] h-[450px] bg-purple-400/10 rounded-full blur-[140px]" />
      <div className="absolute -bottom-32 -left-32 w-[450px] h-[450px] bg-rose-400/10 rounded-full blur-[140px]" />

      <button
        type="button" // Prevents form submission on click
        onClick={toggleTheme}
        className="absolute top-8 right-8 px-4 py-2 rounded-full bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-md hover:scale-105 transition"
      >
        {isDark ? "☀️" : "🌙"}
      </button>

      <div className="relative w-full max-w-[480px] bg-white/70 dark:bg-[#111115]/90 backdrop-blur-2xl px-12 py-14 rounded-[2.5rem] shadow-2xl border border-white/30 dark:border-white/10">
        <div className="text-center mb-10">
          <h2 className="text-5xl font-extrabold pb-2 bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
            Begin Together
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-3 font-medium italic">
            Create your shared sanctuary.
          </p>
        </div>

        <form onSubmit={handleRegister} noValidate className="space-y-6">
          {/* NAME */}
          <div className="space-y-1">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className={`w-full h-[64px] px-6 rounded-2xl bg-white dark:bg-[#141419] border outline-none transition
                ${!touched.name ? "border-slate-200 dark:border-white/10" : validateName(formData.name) ? "border-emerald-400" : "border-rose-400"}
                dark:text-white`}
            />
          </div>

          {/* EMAIL */}
          <div className="space-y-1">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className={`w-full h-[64px] px-6 rounded-2xl bg-white dark:bg-[#141419] border outline-none transition
                ${!touched.email ? "border-slate-200 dark:border-white/10" : validateEmail(formData.email) ? "border-emerald-400" : "border-rose-400"}
                dark:text-white`}
            />
          </div>

          {/* PASSWORD */}
          <div className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create Password"
                className={`w-full h-[64px] px-6 pr-14 rounded-2xl bg-white dark:bg-[#141419] border outline-none transition
                  ${!touched.password ? "border-slate-200 dark:border-white/10" : isPasswordSecure ? "border-emerald-400" : "border-rose-400"}
                  dark:text-white`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Password Validation Checklist */}
            {formData.password && (
              <div className="grid grid-cols-2 gap-2 text-xs px-2 animate-in fade-in duration-500">
                {Object.entries(passwordRules).map(([key, value]) => (
                  <div
                    key={key}
                    className={`flex items-center gap-2 transition ${value ? "text-emerald-500" : "text-slate-400"}`}
                  >
                    {value ? <Check size={14} /> : <X size={14} />}
                    <span className="font-semibold tracking-tight uppercase text-[9px]">
                      {key === "length" && "8+ Characters"}
                      {key === "uppercase" && "Uppercase"}
                      {key === "lowercase" && "Lowercase"}
                      {key === "number" && "Number"}
                      {key === "special" && "Symbol (@$!%*?&)"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {fieldErrors.general && (
            <p className="text-rose-500 text-sm font-bold text-center bg-rose-500/10 py-3 rounded-2xl">
              {fieldErrors.general}
            </p>
          )}

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`w-full h-[65px] rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center
              ${isFormValid ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-xl hover:scale-[1.02]" : "bg-slate-200 dark:bg-white/5 text-slate-400 cursor-not-allowed"}`}
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              "Create Our World"
            )}
          </button>
        </form>

        <div className="mt-10 text-center space-y-4">
          <Link
            to="/join-partner"
            className="block text-purple-600 dark:text-purple-400 text-xs font-black uppercase tracking-[0.2em] hover:opacity-70 transition-all"
          >
            Have an invite code?
          </Link>
          <Link
            to="/login"
            className="block text-slate-500 dark:text-slate-400 text-sm font-medium"
          >
            Already have an account?
            <span className="ml-2 text-slate-900 dark:text-white underline underline-offset-4 decoration-rose-500">
              Log In
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
