import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AVATARS } from "../constants/avatars";
import { REL_STATUS_OPTIONS } from "../constants/relStatus";
import InviteModal from "../components/modals/InviteModal";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Onboarding = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, checkAuth } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const isJoinMode =
    searchParams.get("mode") === "join" ||
    !!sessionStorage.getItem("inviteCode");
  const inviteCode = sessionStorage.getItem("inviteCode");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteData, setInviteData] = useState({ code: "", link: "" });

  const [formData, setFormData] = useState({
    nickname: user?.nickname || "",
    avatar_id: user?.avatar_id || 1,
    gender: user?.gender || "",
    rel_status: "Dating",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        nickname: user.nickname || prev.nickname,
        avatar_id: user.avatar_id || prev.avatar_id,
        gender: user.gender || prev.gender,
      }));
    }
  }, [user]);

  const isNicknameValid = formData.nickname.trim().length >= 2;
  const isGenderValid = formData.gender !== "";

  const handleFinish = async () => {
    setLoading(true);
    try {
      if (isJoinMode && inviteCode) {
        await API.post("/relationship/pair", {
          inviteCode: inviteCode,
          nickname: formData.nickname,
          avatar_id: formData.avatar_id,
        });
        setSuccess(true);
        sessionStorage.removeItem("inviteCode");
        setTimeout(async () => {
          await checkAuth();
          navigate("/welcome-questions");
        }, 2000);
      } else {
        const res = await API.post("/relationship/onboard-creator", formData);
        setInviteData({ code: res.data.inviteCode, link: res.data.inviteLink });
        setShowInviteModal(true);
        // await checkAuth();
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Setup failed.");
    } finally {
      if (!isJoinMode) setLoading(false);
    }
  };

  if (isJoinMode && !user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#08080a] flex items-center justify-center">
        <div className="h-10 w-10 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#08080a] flex flex-col items-center justify-center">
        <div className="text-8xl animate-bounce">❤️</div>
        <h2 className="mt-8 text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
          Worlds Linked
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08080a] flex items-center justify-center p-6 relative transition-colors duration-700">
      {/* --- PROGRESS BAR --- */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-200 dark:bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-rose-500 to-purple-600 transition-all duration-700"
          style={{ width: step === 1 ? "50%" : "100%" }}
        />
      </div>

      <button
        onClick={toggleTheme}
        className="absolute top-8 right-8 z-50 p-4 rounded-2xl bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-lg hover:scale-105 transition"
      >
        {isDark ? "☀️" : "🌙"}
      </button>

      <div className="relative w-full max-w-lg bg-white/90 dark:bg-[#111115]/90 backdrop-blur-3xl rounded-[3.5rem] p-10 md:p-14 shadow-2xl border border-white dark:border-white/5">
        {step === 1 ? (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="text-center">
              <span className="text-[10px] font-bold text-rose-500 tracking-[0.4em] uppercase">
                Step 01
              </span>
              <h2 className="text-4xl font-black bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent tracking-tighter uppercase">
                Identity
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col ml-1">
                <span className="text-slate-500 dark:text-slate-400 text-sm italic">
                  What shall your partner call you?
                </span>
                <span className="text-[10px] text-rose-500 font-bold uppercase tracking-[0.2em] mt-1">
                  Nickname
                </span>
              </div>
              <input
                type="text"
                value={formData.nickname}
                onChange={(e) =>
                  setFormData({ ...formData, nickname: e.target.value })
                }
                className="w-full h-[65px] px-8 rounded-2xl bg-slate-100 dark:bg-white/5 border-none outline-none focus:ring-2 ring-rose-500/50 text-slate-900 dark:text-white font-bold text-xl transition-all"
                placeholder="Bubba, Princess, Love..."
              />
            </div>

            <div className="space-y-4">
              <div className="flex flex-col ml-1">
                <span className="text-slate-500 dark:text-slate-400 text-sm italic">
                  Choose a reflection of yourself
                </span>
                <span className="text-[10px] text-rose-500 font-bold uppercase tracking-[0.2em] mt-1">
                  Avatar
                </span>
              </div>
              <div className="grid grid-cols-4 gap-4 p-4 bg-slate-100 dark:bg-white/5 rounded-[2.5rem]">
                {AVATARS.map((avatar) => (
                  <button
                    key={avatar.id}
                    onClick={() =>
                      setFormData({ ...formData, avatar_id: avatar.id })
                    }
                    className={`text-4xl p-4 rounded-2xl transition-all duration-300 ${
                      formData.avatar_id === avatar.id
                        ? "bg-white dark:bg-white/10 scale-110 shadow-xl ring-2 ring-rose-500"
                        : "opacity-30 grayscale hover:opacity-100"
                    }`}
                  >
                    {avatar.emoji}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => (isJoinMode ? handleFinish() : setStep(2))}
              disabled={!isNicknameValid || loading}
              className={`w-full h-[75px] rounded-[2rem] font-black text-xl transition-all shadow-xl ${
                isNicknameValid && !loading
                  ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white hover:scale-[1.02]"
                  : "bg-slate-200 dark:bg-white/5 text-slate-400"
              }`}
            >
              {loading ? "SAVING..." : "CONTINUE →"}
            </button>
          </div>
        ) : (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="text-center">
              <span className="text-[10px] font-bold text-purple-500 tracking-[0.4em] uppercase">
                Step 02
              </span>
              <h2 className="text-4xl font-black bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent tracking-tighter uppercase">
                Connection
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col ml-1">
                <span className="text-slate-500 dark:text-slate-400 text-sm italic">
                  Your personal identity
                </span>
                <span className="text-[10px] text-purple-500 font-bold uppercase tracking-[0.2em] mt-1">
                  Gender
                </span>
              </div>
              <div className="flex gap-4">
                {["Boy", "Girl"].map((g) => (
                  <button
                    key={g}
                    onClick={() => setFormData({ ...formData, gender: g })}
                    className={`flex-1 h-[65px] rounded-2xl font-black border-2 transition-all flex items-center justify-center gap-3 ${
                      formData.gender === g
                        ? "bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-500/40 scale-[1.05]"
                        : "border-slate-100 dark:border-white/5 text-slate-400"
                    }`}
                  >
                    <span className="text-xl">{g === "Boy" ? "👦" : "👧"}</span>
                    {g.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col ml-1">
                <span className="text-slate-500 dark:text-slate-400 text-sm italic">
                  Define your current journey together
                </span>
                <span className="text-[10px] text-purple-500 font-bold uppercase tracking-[0.2em] mt-1">
                  Status
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 max-h-[260px] overflow-y-auto pr-2 custom-scrollbar">
                {REL_STATUS_OPTIONS.map((status) => (
                  <button
                    key={status.id}
                    onClick={() =>
                      setFormData({ ...formData, rel_status: status.id })
                    }
                    className={`p-5 rounded-3xl border-2 transition-all flex flex-col items-center gap-1 ${
                      formData.rel_status === status.id
                        ? "bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-500/30 scale-[1.02]"
                        : "border-slate-100 dark:border-white/5 text-slate-400 hover:border-purple-500/30"
                    }`}
                  >
                    <span className="text-2xl mb-1">{status.icon}</span>
                    <span className="font-black text-[10px] tracking-widest">
                      {status.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <button
                onClick={handleFinish}
                disabled={loading || !isGenderValid}
                className={`w-full h-[75px] rounded-[2rem] font-black text-xl transition-all shadow-xl ${
                  isGenderValid && !loading
                    ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white hover:scale-[1.02]"
                    : "bg-slate-200 dark:bg-white/5 text-slate-400"
                }`}
              >
                {loading ? "CREATING..." : "FINISH & GET LINK"}
              </button>

              {/* --- ADDED BACK BUTTON --- */}
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-widest hover:text-rose-500 transition-colors py-2"
              >
                ← Edit Identity & Avatar
              </button>
            </div>
          </div>
        )}
      </div>

      {showInviteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#08080a]/90 backdrop-blur-md">
          <InviteModal
            inviteCode={inviteData.code}
            inviteLink={inviteData.link}
            onClose={async () => {
              await checkAuth(); // ✅ NOW we trigger the redirect
              navigate("/dashboard");
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Onboarding;
