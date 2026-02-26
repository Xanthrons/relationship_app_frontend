import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  ShieldCheck,
  KeyRound,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  ChevronLeft,
} from "lucide-react";
import API from "../api/axios";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: Code, 3: New Password
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleError = (err) => {
    const msg = err.response?.data?.error || "Something went wrong.";
    setError(msg);
    // Auto-clear error after 4 seconds
    setTimeout(() => setError(""), 4000);
  };

  // Step 1: Request Code
  const handleRequestCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await API.post("/auth/forgot-password", { email });
      setStep(2);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify Code
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await API.post("/auth/verify-reset-code", { email, code });
      setStep(3);
    } catch (err) {
      setError("Invalid or expired code. Please check your email.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Final Reset
  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await API.post("/auth/reset-password", { email, code, newPassword });
      alert("Success! Your password has been updated. ✨");
      navigate("/login");
    } catch (err) {
      setError("Session expired or invalid. Please start over.");
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-midnight-canvas flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in-95 duration-500">
        {/* HEADER SECTION */}
        <header className="text-center space-y-2">
          <div className="inline-flex p-4 bg-rose-500 text-white rounded-[2rem] shadow-xl shadow-rose-500/20 mb-4 transition-transform hover:rotate-12">
            {step === 1 && <Mail size={32} />}
            {step === 2 && <ShieldCheck size={32} />}
            {step === 3 && <KeyRound size={32} />}
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter italic">
            {step === 1 && "Reset"}
            {step === 2 && "Verify"}
            {step === 3 && "Secure"}
          </h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">
            {step === 1 && "Lost your keys?"}
            {step === 2 && "Check your inbox"}
            {step === 3 && "Create a new password"}
          </p>
        </header>

        {/* MAIN CARD */}
        <div className="bg-white dark:bg-midnight-900 p-8 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-white/5 relative overflow-hidden">
          {/* Progress Bar */}
          <div
            className="absolute top-0 left-0 h-1 bg-rose-500 transition-all duration-500"
            style={{ width: `${(step / 3) * 100}%` }}
          />

          {error && (
            <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center gap-3 text-sm font-bold animate-in slide-in-from-top-2">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          {/* STEP 1: EMAIL */}
          {step === 1 && (
            <form onSubmit={handleRequestCode} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full p-5 rounded-[1.5rem] bg-slate-50 dark:bg-white/5 border-2 border-transparent focus:border-rose-500 transition-all font-bold outline-none"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                disabled={loading}
                className="w-full py-5 bg-slate-900 dark:bg-rose-500 text-white rounded-[1.5rem] font-black uppercase tracking-widest hover:shadow-2xl transition-all flex items-center justify-center gap-2"
              >
                {loading ? "Sending..." : "Request Code"}{" "}
                <ArrowRight size={18} />
              </button>
            </form>
          )}

          {/* STEP 2: CODE VERIFICATION */}
          {step === 2 && (
            <form onSubmit={handleVerifyCode} className="space-y-6">
              <div className="space-y-2 text-center">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  6-Digit Code
                </label>
                <input
                  type="text"
                  placeholder="000000"
                  maxLength="6"
                  className="w-full p-5 text-center text-3xl font-mono font-black tracking-[0.3em] rounded-[1.5rem] bg-slate-50 dark:bg-white/5 border-2 border-transparent focus:border-rose-500 outline-none"
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
                <p className="text-[10px] text-slate-400 font-bold uppercase pt-2">
                  Sent to {email}
                </p>
              </div>
              <button
                disabled={loading}
                className="w-full py-5 bg-slate-900 dark:bg-rose-500 text-white rounded-[1.5rem] font-black uppercase tracking-widest hover:shadow-2xl transition-all"
              >
                {loading ? "Verifying..." : "Verify Code"}
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-[10px] font-black uppercase text-slate-400 hover:text-rose-500 transition-colors tracking-widest"
              >
                Wrong Email?
              </button>
            </form>
          )}

          {/* STEP 3: NEW PASSWORD */}
          {step === 3 && (
            <form onSubmit={handleReset} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full p-5 rounded-[1.5rem] bg-slate-50 dark:bg-white/5 border-2 border-transparent focus:border-rose-500 transition-all font-bold outline-none"
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <button
                disabled={loading}
                className="w-full py-5 bg-rose-500 text-white rounded-[1.5rem] font-black uppercase tracking-widest hover:shadow-2xl transition-all flex items-center justify-center gap-2"
              >
                {loading ? "Updating..." : "Update Password"}{" "}
                <CheckCircle size={18} />
              </button>
            </form>
          )}
        </div>

        {/* FOOTER */}
        <p className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-all"
          >
            <ChevronLeft size={14} /> Back to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
