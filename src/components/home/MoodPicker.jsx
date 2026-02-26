import React, { useState } from "react";

const MOOD_MAP = {
  1: {
    emoji: "😩",
    label: "Exhausted",
    bg: "hover:bg-red-50",
    text: "text-red-500",
    active: "bg-red-500",
  },
  2: {
    emoji: "😔",
    label: "Low",
    bg: "hover:bg-orange-50",
    text: "text-orange-500",
    active: "bg-orange-500",
  },
  3: {
    emoji: "😕",
    label: "Meh",
    bg: "hover:bg-amber-50",
    text: "text-amber-500",
    active: "bg-amber-500",
  },
  4: {
    emoji: "😐",
    label: "Neutral",
    bg: "hover:bg-yellow-50",
    text: "text-yellow-500",
    active: "bg-yellow-500",
  },
  5: {
    emoji: "🙂",
    label: "Okay",
    bg: "hover:bg-lime-50",
    text: "text-lime-500",
    active: "bg-lime-500",
  },
  6: {
    emoji: "😊",
    label: "Good",
    bg: "hover:bg-green-50",
    text: "text-green-500",
    active: "bg-green-500",
  },
  7: {
    emoji: "😌",
    label: "Chilled",
    bg: "hover:bg-teal-50",
    text: "text-teal-500",
    active: "bg-teal-500",
  },
  8: {
    emoji: "✨",
    label: "High Vibe",
    bg: "hover:bg-cyan-50",
    text: "text-cyan-500",
    active: "bg-cyan-500",
  },
  9: {
    emoji: "🤩",
    label: "Radiant",
    bg: "hover:bg-indigo-50",
    text: "text-indigo-500",
    active: "bg-indigo-500",
  },
  10: {
    emoji: "🔥",
    label: "Elite",
    bg: "hover:bg-rose-50",
    text: "text-rose-500",
    active: "bg-rose-500",
  },
};

export default function MoodPicker({ onSelect, lastSelected }) {
  const [hovered, setHovered] = useState(null);
  const points = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="w-full mb-8">
      {/* LABEL DISPLAY - Text color now matches the mood theme */}
      <div className="h-6 flex justify-center mb-4">
        <span
          className={`text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-300 ${
            hovered ? MOOD_MAP[hovered].text : "text-slate-300"
          }`}
        >
          {hovered ? MOOD_MAP[hovered].label : "How's the energy?"}
        </span>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {points.map((num) => (
          <button
            key={num}
            onMouseEnter={() => setHovered(num)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onSelect(num)}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 transform active:scale-90 ${
              lastSelected === num
                ? `${MOOD_MAP[num].active} scale-110 shadow-lg text-white`
                : `bg-slate-50 ${MOOD_MAP[num].bg} text-slate-400`
            }`}
          >
            <span
              className={`text-2xl mb-1 ${
                lastSelected && lastSelected !== num && "opacity-40 grayscale"
              }`}
            >
              {MOOD_MAP[num].emoji}
            </span>
            <span
              className={`text-[8px] font-black ${
                lastSelected === num ? "text-white/60" : "opacity-30"
              }`}
            >
              {num}
            </span>

            {/* IN-BUTTON TOOLTIP (Optional, also matches color) */}
            <div
              className={`absolute -top-8 scale-0 group-hover:scale-100 transition-all text-[8px] font-bold ${MOOD_MAP[num].text}`}
            >
              {MOOD_MAP[num].label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
