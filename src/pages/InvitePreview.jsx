import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

const InvitePreview = () => {
  const { user, checkAuth } = useAuth();
  const navigate = useNavigate();
  const { code } = useParams();

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);

  const fetchPreview = useCallback(async () => {
    if (!code) {
      setError("No invitation code was found.");
      setVerifying(false);
      return;
    }
    setVerifying(true);
    try {
      const res = await API.get(
        `/relationship/preview/${code.trim().toUpperCase()}`,
      );
      if (res.data) {
        setPreview(res.data);
        sessionStorage.setItem("inviteCode", code.toUpperCase().trim());
      }
    } catch (err) {
      sessionStorage.removeItem("inviteCode");
      setError(err.response?.data?.error || "This invite link is invalid.");
    } finally {
      setVerifying(false);
    }
  }, [code]);

  useEffect(() => {
    fetchPreview();
  }, [fetchPreview]);

  const handleJoinAction = async () => {
    if (user) {
      // --- LOGGED IN USER: INSTANT PAIR ---
      setLoading(true);
      try {
        await API.post("/relationship/pair", {
          inviteCode: code.toUpperCase(),
          // We use their existing profile data
          nickname: user.nickname,
          avatar_id: user.avatar_id,
        });

        sessionStorage.removeItem("inviteCode");
        await checkAuth();

        // Go straight to the quiz/welcome
        navigate("/welcome-questions");
      } catch (err) {
        setError(err.response?.data?.error || "Failed to join.");
      } finally {
        setLoading(false);
      }
    } else {
      // --- GUEST: GO TO REGISTER ---
      navigate("/register");
    }
  };

  if (verifying)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Verifying...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-midnight-canvas flex items-center justify-center p-4">
      <div className="bg-white dark:bg-midnight-900 rounded-[3rem] p-10 shadow-2xl text-center space-y-8 w-full max-w-md border border-slate-100 dark:border-white/5">
        <div className="space-y-2">
          <h2 className="text-rose-500 font-black tracking-widest text-xs uppercase">
            Invitation From
          </h2>
          <h1 className="text-5xl font-black text-slate-900 dark:text-white italic tracking-tighter">
            {preview?.creatorNickname}
          </h1>
        </div>

        <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-[2rem] italic text-slate-600 dark:text-slate-300 text-lg">
          "{preview?.message}"
        </div>

        <div className="space-y-4">
          <button
            onClick={handleJoinAction}
            disabled={loading}
            className="w-full bg-rose-500 text-white py-6 rounded-[2rem] font-black text-2xl shadow-xl shadow-rose-500/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            {loading
              ? "Connecting..."
              : user
                ? "Join Now ❤️"
                : "Create Account"}
          </button>

          {!user && (
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-transparent border-2 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-50 transition-all"
            >
              Already have an account? Log In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvitePreview;
