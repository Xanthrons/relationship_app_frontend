import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const JoinPartner = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const handleCheckCode = (e) => {
    e.preventDefault();
    if (code.length === 6) {
      // Direct navigation to the Preview route
      // The Preview component handles the actual API validation
      navigate(`/join/${code.toUpperCase()}`);
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-500 bg-sunrise-canvas dark:bg-midnight-canvas flex items-center justify-center px-4 py-12 overflow-hidden relative">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-lg border border-white/20 text-lg transition-all hover:scale-110"
      >
        {isDark ? "☀️" : "🌙"}
      </button>

      {/* RESTORED: Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/10 dark:bg-purple-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-300/20 dark:bg-rose-500/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Main Card */}
      <div className="relative transition-colors duration-500 bg-white/95 dark:bg-midnight-900 backdrop-blur-xl p-10 md:p-14 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] w-full max-w-lg border border-white/20 dark:border-white/10 flex flex-col items-center">
        {/* Animated Icon */}
        <div className="inline-block p-6 bg-white dark:bg-midnight-800 rounded-6xl mb-10 border border-white/20 dark:border-white/10 shadow-soft-xl animate-float">
          <span className="text-6xl">💌</span>
        </div>

        {/* Header */}
        <h2 className="text-5xl font-display font-black text-slate-900 dark:text-white mb-3 text-center tracking-tighter">
          Check the Code
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium mb-10 max-w-sm text-center leading-relaxed italic text-lg">
          Your partner sent a secret code. Enter it below to merge your worlds.
        </p>

        {/* Form */}
        <form onSubmit={handleCheckCode} className="w-full space-y-8">
          <input
            type="text"
            placeholder="000000"
            maxLength="6"
            value={code}
            // Forces uppercase and prevents spaces
            onChange={(e) =>
              setCode(e.target.value.toUpperCase().replace(/\s/g, ""))
            }
            className="w-full text-center text-6xl md:text-7xl font-black tracking-[0.3em] py-12 rounded-6xl bg-gray-50 dark:bg-midnight-800 border-4 border-white dark:border-white/10 text-sunrise-500 dark:text-rose-400 outline-none focus:border-purple-400 dark:focus:border-purple-500 transition-all shadow-inner placeholder:opacity-10"
          />

          <button
            type="submit"
            disabled={code.length !== 6}
            className="group relative w-full overflow-hidden bg-gradient-to-r from-purple-600 to-rose-500 text-white dark:text-midnight-950 dark:bg-white py-7 rounded-2xl font-black text-2xl shadow-[0_10px_20px_rgba(225,29,72,0.3)] hover:shadow-[0_15px_30px_rgba(225,29,72,0.4)] hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50 disabled:translate-y-0"
          >
            <span className="relative z-10">Connect Worlds</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </button>
        </form>

        {/* Navigation Footer */}
        <button
          onClick={() => navigate("/")}
          className="mt-12 text-slate-400 dark:text-gray-400 font-bold hover:text-sunrise-500 dark:hover:text-rose-400 transition-colors flex items-center justify-center gap-2 mx-auto"
        >
          <span>←</span> Back to safety
        </button>
      </div>
    </div>
  );
};

export default JoinPartner;
