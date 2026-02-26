import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, MessageCircle, Calendar, Heart, BellOff } from "lucide-react";

const Notifications = ({ isOpen, onClose, notifications = [] }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[110]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-[85%] max-w-sm bg-slate-50 z-[120] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-8 bg-white flex justify-between items-center border-b border-slate-100">
              <div>
                <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">
                  Sparks
                </h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Latest Updates
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
              >
                <X size={24} />
              </button>
            </div>

            {/* Notification List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {notifications.length > 0 ? (
                notifications.map((notif) => (
                  <NotificationItem key={notif.id} notif={notif} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-slate-300">
                  <BellOff size={48} className="mb-4 opacity-20" />
                  <p className="font-bold uppercase text-xs tracking-widest">
                    All caught up!
                  </p>
                </div>
              )}
            </div>

            {/* Footer Action */}
            <div className="p-6 bg-white border-t border-slate-100">
              <button className="w-full py-4 text-slate-400 font-black uppercase text-[10px] tracking-[0.3em] hover:text-rose-500 transition-colors">
                Clear All Notifications
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const NotificationItem = ({ notif }) => {
  // Map icons based on notification type
  const icons = {
    nudge: <Zap size={18} className="text-amber-500" />,
    chat: <MessageCircle size={18} className="text-blue-500" />,
    planner: <Calendar size={18} className="text-indigo-500" />,
    milestone: <Heart size={18} className="text-rose-500" />,
  };

  return (
    <div
      className={`p-4 rounded-[2rem] bg-white border border-slate-100 shadow-sm flex gap-4 items-start transition-all hover:scale-[1.02] ${!notif.read ? "border-l-4 border-l-rose-500" : ""}`}
    >
      <div className="mt-1 p-2 bg-slate-50 rounded-xl">
        {icons[notif.type] || <Zap size={18} />}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <p className="text-sm font-bold text-slate-800 leading-tight">
            {notif.message}
          </p>
          <span className="text-[9px] font-black text-slate-300 uppercase">
            {notif.time}
          </span>
        </div>
        <p className="text-[10px] text-slate-400 mt-1 font-medium">
          {notif.description}
        </p>
      </div>
    </div>
  );
};

export default Notifications;
