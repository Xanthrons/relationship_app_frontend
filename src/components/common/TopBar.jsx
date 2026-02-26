import React, { useState } from "react";
import { Bell, Menu as MenuIcon } from "lucide-react";
import Menu from "./Menu";
import Notifications from "./Notifications"; // Our new component

const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // This data will eventually come from your Backend/Socket.io
  const dummyNotifs = [
    {
      id: 1,
      type: "nudge",
      message: "Nudge from Firamerga",
      description: "Thinking of you right now!",
      time: "2m ago",
      read: false,
    },
    {
      id: 2,
      type: "planner",
      message: "New Date Idea",
      description: "Sushi Night was added to the planner",
      time: "1h ago",
      read: true,
    },
  ];

  return (
    <>
      <header className="flex justify-between items-center p-6 bg-transparent sticky top-0 z-[80]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-rose-500/20">
            TF
          </div>
          <h2 className="font-black uppercase tracking-tighter italic text-xl">
            TwoFold
          </h2>
        </div>

        <div className="flex gap-2">
          {/* Notification Button */}
          <button
            onClick={() => setIsNotifOpen(true)}
            className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 relative"
          >
            <Bell size={20} className="text-slate-600" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100"
          >
            <MenuIcon size={20} className="text-slate-600" />
          </button>
        </div>
      </header>

      {/* Drawers */}
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <Notifications
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
        notifications={dummyNotifs}
      />
    </>
  );
};

export default TopBar;
