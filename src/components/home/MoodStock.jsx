import React, { useState, useEffect } from "react";
import { Trophy, Zap, Heart } from "lucide-react";
import confetti from "canvas-confetti";
import MoodPicker from "./MoodPicker";
import EvaluationProgress from "./EvaluationProgress";
import { APP_LEVELS } from "../../utils/levels";

export default function MoodStock() {
  const [moodHistory, setMoodHistory] = useState([]); // Array of {date: 'YYYY-MM-DD', score: 8}
  const [currentMood, setCurrentMood] = useState(null);
  const [level, setLevel] = useState(1);
  const [showCelebration, setShowCelebration] = useState(false);
  const [supportMessage, setSupportMessage] = useState(null);

  const todayStr = new Date().toISOString().split("T")[0];

  // Initialize data and check for Level Up celebration from a previous day
  useEffect(() => {
    const savedHistory = JSON.parse(
      localStorage.getItem("moodHistory") || "[]"
    );
    const savedLevel = parseInt(localStorage.getItem("moodLevel") || "1");
    const pendingCelebration =
      localStorage.getItem("pendingCelebration") === "true";

    setMoodHistory(savedHistory);
    setLevel(savedLevel);

    // Find if user already picked a mood today
    const todaysEntry = savedHistory.find((entry) => entry.date === todayStr);
    if (todaysEntry) setCurrentMood(todaysEntry.score);

    if (pendingCelebration) {
      handleCelebration();
    }

    checkWellness(savedHistory);
  }, []);

  const handleMoodSelect = (val) => {
    setCurrentMood(val);

    let updatedHistory = [...moodHistory];
    const index = updatedHistory.findIndex((entry) => entry.date === todayStr);

    if (index !== -1) {
      updatedHistory[index].score = val; // Update today's choice
    } else {
      updatedHistory.push({ date: todayStr, score: val }); // First entry of the day
    }

    setMoodHistory(updatedHistory);
    localStorage.setItem("moodHistory", JSON.stringify(updatedHistory));

    // Check if this new entry triggers a level up for TOMORROW
    checkLevelProgress(updatedHistory);
  };

  const checkLevelProgress = (history) => {
    const lastFive = history.slice(-5).map((h) => h.score);
    const lastTen = history.slice(-10).map((h) => h.score);

    if (
      (lastFive.length === 5 && lastFive.every((s) => s >= 8)) ||
      (lastTen.length === 10 && lastTen.every((s) => s >= 5))
    ) {
      // We don't level up immediately to avoid "lying"
      // We flag it so when they return another time/day, it celebrates
      localStorage.setItem("moodLevel", level + 1);
      localStorage.setItem("pendingCelebration", "true");
    }
  };

  const handleCelebration = () => {
    setShowCelebration(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#fb7185", "#fbbf24", "#818cf8"],
    });
    localStorage.removeItem("pendingCelebration");
  };

  const checkWellness = (history) => {
    const lastMoods = history.slice(-8).reverse();
    let streak = 0;
    for (let m of lastMoods) {
      if (m.score < 5) streak++;
      else break;
    }

    if (streak >= 8)
      setSupportMessage(
        "Sending a hug... I've let your partner know you need some extra love. ❤️"
      );
    else if (streak >= 5)
      setSupportMessage(
        "Hey... noticed things have been heavy. How can I help you beat this? 🫂"
      );
    else setSupportMessage(null);
  };

  const currentLevelData = APP_LEVELS[level] || {
    name: "Eternal Bond",
    icon: "♾️",
  };

  return (
    <div className="px-4">
      {/* Level Up Pop-up */}
      {showCelebration && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
          <div className="bg-white rounded-[3rem] p-10 text-center animate-in zoom-in duration-300 max-w-sm">
            <div className="text-6xl mb-4">{currentLevelData.icon}</div>
            <h2 className="text-2xl font-black text-slate-800 uppercase italic">
              Evolution!
            </h2>
            <p className="text-slate-500 text-sm mt-2 font-medium">
              Your bond has grown. You've reached the level of
              <span className="text-rose-500 font-bold">
                {" "}
                {currentLevelData.name}
              </span>
              .
            </p>
            <button
              onClick={() => setShowCelebration(false)}
              className="mt-8 w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest"
            >
              Keep Growing
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-slate-100 relative overflow-hidden">
        <Zap
          size={140}
          className="absolute -bottom-10 -right-10 text-slate-50/50 pointer-events-none"
        />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-2xl shadow-xl shadow-slate-100">
              {currentLevelData.icon}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                Current Standing
              </p>
              <h3 className="text-lg font-black text-slate-800 uppercase italic">
                {currentLevelData.name}
              </h3>
            </div>
          </div>

          {supportMessage && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex gap-3">
              <Heart className="text-rose-500 shrink-0" size={18} />
              <p className="text-xs font-bold text-rose-700">
                {supportMessage}
              </p>
            </div>
          )}

          <MoodPicker onSelect={handleMoodSelect} lastSelected={currentMood} />

          <EvaluationProgress moodHistory={moodHistory} />
        </div>
      </div>
    </div>
  );
}
