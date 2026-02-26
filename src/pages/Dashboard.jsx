import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import { getAvatarEmoji } from "../constants/avatars";
import { Heart, Share2 } from "lucide-react";

const Home = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/relationship/dashboard");
        // THIS IS THE IMPORTANT PART
        console.log("DEBUG DASHBOARD:", res.data);
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
      <div className="p-20 text-center font-black animate-pulse">
        ✨ SYNCING...
      </div>
    );

  // Logic based on your controller mapping:
  // If your controller sends { mode: 'solo' }, then isSolo will be true.
  const isSolo = dashboardData?.mode === "solo";

  return (
    <div className="space-y-10 p-6">
      {/* TEMP DEBUG BOX - Remove this once we see what it says */}
      <div className="bg-black text-green-400 p-4 rounded-xl text-xs font-mono mb-4 border border-green-900/50">
        <p className="font-bold border-b border-green-900/50 mb-2 pb-1 underline">
          DEVELOPER DEBUG INFO:
        </p>
        <p>
          Current Mode:{" "}
          <span className="text-white">"{dashboardData?.mode}"</span>
        </p>
        <p>
          isSolo Variable:{" "}
          <span className="text-white">{isSolo ? "TRUE" : "FALSE"}</span>
        </p>
        <p>
          User Nickname: <span className="text-white">{user?.nickname}</span>
        </p>
      </div>

      <header className="space-y-1">
        <h1 className="text-4xl font-black tracking-tighter italic">
          Hey, {user?.nickname} {getAvatarEmoji(user?.avatar_id)}
        </h1>
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">
          {isSolo ? "Solo Mode" : "Shared World"}
        </p>
      </header>

      {/* RELATIONSHIP COUNTER */}
      <section className="text-center py-12 bg-white dark:bg-midnight-900 rounded-[3rem] shadow-xl border border-slate-100">
        <div className="relative inline-block">
          <Heart
            className="text-rose-500 fill-rose-500 absolute -top-4 -right-4 animate-pulse"
            size={32}
          />
          <h1 className="text-7xl font-black italic tracking-tighter">
            {dashboardData?.days_together || "0"}
          </h1>
        </div>
      </section>

      {/* THE BUTTON: Only shows if isSolo is TRUE */}
      {isSolo ? (
        <div className="bg-rose-500 p-8 rounded-[2.5rem] text-white text-center shadow-lg shadow-rose-500/20">
          <h3 className="text-xl font-black italic mb-4">
            You're in solo mode!
          </h3>
          <button
            onClick={() => alert("Invite Code: " + user?.inviteCode)}
            className="bg-white text-rose-500 px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform"
          >
            Share Invite Link 💌
          </button>
        </div>
      ) : (
        /* PARTNER CARD (Shows if mode is "couple") */
        <div className="bg-white dark:bg-midnight-900 p-8 rounded-[2.5rem] shadow-lg flex items-center gap-6">
          <div className="text-5xl">
            {getAvatarEmoji(dashboardData?.partner?.avatar_id)}
          </div>
          <div>
            <h3 className="text-2xl font-black italic">
              {dashboardData?.partner?.nickname}
            </h3>
            <p className="text-green-500 font-bold text-xs">● Online</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
