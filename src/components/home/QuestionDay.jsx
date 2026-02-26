import React, { useState, useEffect } from "react";
import { Heart, Send, Sparkles, Quote, Lock, Users } from "lucide-react";
import { motion } from "framer-motion";
import questionsData from "../../data/dailyQuestions.json";

export default function QuestionDay() {
  const [todayEntry, setTodayEntry] = useState(null);
  const [answer, setAnswer] = useState("");
  const [isShared, setIsShared] = useState(false); // DEFAULT SET TO PRIVATE
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const now = new Date();
    const currentMonth = now.toLocaleString("en-US", { month: "long" });
    const currentDay = now.getDate();

    const found = questionsData.data.find(
      (item) => item.Month === currentMonth && item.Day === currentDay
    );
    setTodayEntry(found);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!answer.trim()) return;

    // Save to Firebase/Database
    console.log("Saving entry...", {
      questionId: todayEntry.ID,
      text: answer,
      sharedWithPartner: isShared,
      timestamp: new Date(),
    });

    setIsSubmitted(true);
  };

  if (!todayEntry) return null;

  return (
    <div className="px-4">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 relative overflow-hidden">
        <Quote
          className="absolute top-6 right-8 text-slate-50 rotate-180"
          size={48}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-rose-500 p-2.5 rounded-2xl text-white shadow-lg shadow-rose-100">
                <Heart size={18} fill="currentColor" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Question of the Day
                </p>
                <p className="text-xs font-bold text-rose-400 italic leading-none mt-1">
                  Theme: {todayEntry.Theme}
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-black text-slate-800 leading-tight mb-8 pr-6">
            "{todayEntry.Question}"
          </h3>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Write your heart out..."
                  className="w-full h-40 bg-slate-50 border-none rounded-[2rem] p-6 text-sm font-medium text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-rose-100 resize-none outline-none shadow-inner"
                />
                <Sparkles
                  className="absolute bottom-5 right-6 text-rose-100 pointer-events-none"
                  size={18}
                />
              </div>

              {/* PRIVACY TOGGLE SECTION */}
              <div className="flex items-center justify-between px-3 py-3 bg-slate-50/50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2">
                  <div
                    className={`p-1.5 rounded-lg transition-colors ${
                      isShared
                        ? "bg-rose-100 text-rose-500"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {isShared ? <Users size={14} /> : <Lock size={14} />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-700 leading-none">
                      {isShared ? "Shared Mode" : "Private Mode"}
                    </span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mt-1">
                      {isShared
                        ? "Partner can see your answer"
                        : "Only visible to you"}
                    </span>
                  </div>
                </div>

                {/* Modern Toggle */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isShared}
                    onChange={() => setIsShared(!isShared)}
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-slate-100"
              >
                Submit Entry <Send size={14} />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 text-center bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200"
            >
              <div
                className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  isShared
                    ? "bg-rose-100 text-rose-500"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {isShared ? <Users size={20} /> : <Lock size={20} />}
              </div>
              <p className="text-slate-800 font-black italic text-sm">
                Entry Logged.
              </p>
              <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mt-1">
                {isShared
                  ? "Your partner has been notified"
                  : "This remains for your eyes only"}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
