import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import { getAvatarEmoji } from "../constants/avatars";
import { Heart, Share2, Copy } from "lucide-react";
import InviteModal from "../components/modals/InviteModal";

const Home = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/relationship/dashboard");
        // This will show { mode: "solo", ... } or { mode: "couple", ... }
        setDashboardData(res.data);
      } catch (err) {
        console.error("Error loading dashboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center font-black animate-pulse text-slate-400">
        ✨ SYNCING WORLD...
      </div>
    );

  // LOGIC ALIGNMENT:
  // Backend maps 'waiting' status to mode: "solo"
  // Backend maps 'full' status to mode: "couple"
  const isSolo = dashboardData?.mode === "solo";
  const inviteLink = `${window.location.origin}/join/${user?.inviteCode}`;

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      <header>
        <h1 className="text-4xl font-black tracking-tighter italic text-slate-900 dark:text-white">
          Hi, {user?.nickname} {getAvatarEmoji(user?.avatar_id)}
        </h1>
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">
          {isSolo ? "Solo Sanctuary" : "Shared World"}
        </p>
      </header>

      {/* Days Together Counter */}
      <section className="bg-white dark:bg-midnight-900 rounded-[3rem] p-12 text-center shadow-xl border border-slate-100 dark:border-white/5 relative">
        <div className="relative inline-block">
          <Heart
            className={`text-rose-500 fill-rose-500 absolute -top-4 -right-6 ${!isSolo ? "animate-bounce" : "opacity-20"}`}
            size={32}
          />
          <h2 className="text-8xl font-black italic tracking-tighter text-slate-900 dark:text-white">
            {dashboardData?.days_together || "0"}
          </h2>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mt-2">
          Days Together
        </p>
      </section>

      {/* --- THE SHARE INVITE SECTION --- */}
      {isSolo ? (
        <div className="bg-gradient-to-br from-purple-600 to-rose-500 rounded-[2.5rem] p-8 text-white shadow-2xl animate-in fade-in zoom-in duration-500">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-white/20 p-4 rounded-full backdrop-blur-md">
              <Share2 size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-black italic uppercase tracking-tighter">
                Your partner hasn't joined yet
              </h3>
              <p className="text-white/80 text-sm font-medium">
                Send your secret link to connect your accounts.
              </p>
            </div>

            <button
              onClick={() => setShowInviteModal(true)}
              className="w-full bg-white text-rose-500 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
            >
              Share Invite Link 💌
            </button>
          </div>
        </div>
      ) : (
        /* Show Partner Card if paired (mode === "couple") */
        <div className="bg-white dark:bg-midnight-900 p-8 rounded-[2.5rem] shadow-lg flex items-center gap-6 border border-slate-100 dark:border-white/5">
          <div className="text-5xl">
            {getAvatarEmoji(dashboardData?.partner?.avatar_id)}
          </div>
          <div>
            <h3 className="text-2xl font-black italic text-slate-900 dark:text-white">
              {dashboardData?.partner?.nickname}
            </h3>
            <p className="text-green-500 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>{" "}
              Connected
            </p>
          </div>
        </div>
      )}

      {/* Invite Modal Overlay */}
      {showInviteModal && (
        <InviteModal
          inviteCode={user?.inviteCode}
          inviteLink={inviteLink}
          onClose={() => setShowInviteModal(false)}
        />
      )}
    </div>
  );
};

export default Home;
