import React from "react";
import { Milestone, Heart, Camera, Calendar } from "lucide-react";

const Journey = () => {
  const milestones = [
    {
      id: 1,
      title: "The First Hello",
      date: "Jan 12, 2024",
      icon: <Heart className="text-rose-500" />,
    },
    {
      id: 2,
      title: "Official Status",
      date: "Feb 14, 2024",
      icon: <Calendar className="text-blue-500" />,
    },
    {
      id: 3,
      title: "First Trip Together",
      date: "June 20, 2024",
      icon: <Camera className="text-orange-500" />,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h2 className="text-3xl font-black italic uppercase tracking-tighter">
        Our Journey
      </h2>

      <div className="relative border-l-2 border-slate-200 ml-4 py-4 space-y-10">
        {milestones.map((m) => (
          <div key={m.id} className="relative pl-10">
            <div className="absolute -left-[11px] top-0 w-5 h-5 bg-white border-4 border-rose-500 rounded-full shadow-sm" />
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-4">
              <div className="p-3 bg-slate-50 rounded-2xl">{m.icon}</div>
              <div>
                <h4 className="font-black text-slate-900 uppercase text-sm tracking-tight">
                  {m.title}
                </h4>
                <p className="text-xs text-slate-400 font-bold">{m.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journey;
