import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom"; // 1. Import Link
import {
  X,
  Activity,
  History,
  Heart,
  BookOpen,
  User,
  Target,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Menu = ({ isOpen, onClose }) => {
  const { logout } = useAuth();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
          />

          {/* Slide-out Menu */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-[85%] max-w-sm bg-white z-[101] shadow-2xl flex flex-col p-6"
          >
            {/* Header Area */}
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-rose-500/20">
                  US
                </div>
                <h2 className="font-black uppercase tracking-tighter text-xl text-slate-900">
                  TwoFold Menu
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
              >
                <X size={24} />
              </button>
            </div>

            {/* Main Navigation Links */}
            <div className="flex-1 space-y-1">
              {/* Added paths for each link */}
              <MenuLink
                icon={<Activity size={22} />}
                label="Our Journey"
                to="/journey"
                onClick={onClose}
              />
              <MenuLink
                icon={<History size={22} />}
                label="History"
                to="/history"
                onClick={onClose}
              />
              <MenuLink
                icon={<Heart size={22} />}
                label="Preferences"
                to="/preferences"
                onClick={onClose}
              />
              <MenuLink
                icon={<BookOpen size={22} />}
                label="Journal"
                to="/journal"
                onClick={onClose}
              />
              <MenuLink
                icon={<User size={22} />}
                label="Profile"
                to="/profile"
                onClick={onClose}
              />
              <MenuLink
                icon={<Target size={22} />}
                label="Shared Goals"
                to="/goals"
                onClick={onClose}
              />
            </div>

            {/* Bottom Section */}
            <div className="mt-auto pt-6 border-t border-slate-100 space-y-2">
              <Link
                to="/settings"
                onClick={onClose}
                className="w-full flex items-center gap-4 p-4 text-slate-600 font-bold uppercase text-[13px] tracking-widest hover:bg-slate-50 rounded-2xl transition-all group"
              >
                <Settings
                  size={22}
                  className="group-hover:rotate-45 transition-transform duration-500"
                />
                <span>Settings</span>
              </Link>

              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="w-full flex items-center gap-4 p-4 text-rose-500 font-bold uppercase text-[13px] tracking-widest hover:bg-rose-50 rounded-2xl transition-all"
              >
                <LogOut size={22} />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Sub-component now uses <Link> instead of <button>
const MenuLink = ({ icon, label, to, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="w-full flex items-center gap-4 p-4 text-slate-500 font-bold uppercase text-[13px] tracking-widest hover:bg-slate-50 hover:text-slate-900 rounded-2xl transition-all group"
  >
    <span className="text-slate-400 group-hover:text-rose-500 transition-colors">
      {icon}
    </span>
    <span>{label}</span>
  </Link>
);

export default Menu;
