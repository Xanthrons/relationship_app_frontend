import React from "react";
import { motion } from "framer-motion";

export default function EvaluationProgress({ moodHistory }) {
  const lastFive = moodHistory.slice(-5).map((h) => h.score);
  const lastTen = moodHistory.slice(-10).map((h) => h.score);

  // Use the same logic as the backend check
  const highVibeProgress = lastFive.filter((s) => s >= 8).length * 20;
  const steadyProgress = lastTen.filter((s) => s >= 5).length * 10;

  const finalWidth = Math.max(highVibeProgress, steadyProgress);

  return (
    <div className="space-y-3 pt-6 border-t border-slate-50">
      <div className="flex justify-between items-center px-1">
        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
          Relationship Vibe
        </span>
      </div>

      <div className="h-3 w-full bg-slate-100 rounded-full relative overflow-hidden">
        <motion.div
          animate={{ width: `${finalWidth}%` }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="h-full bg-gradient-to-r from-rose-400 via-rose-500 to-amber-400 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.2)]"
        />
      </div>
    </div>
  );
}
