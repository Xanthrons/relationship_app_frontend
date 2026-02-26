import { Link, useLocation } from "react-router-dom";
import { Home, Calendar, MessageCircle, Gamepad2, Lock } from "lucide-react";

const Navbar = () => {
  const { pathname } = useLocation();

  const navItems = [
    { icon: <Home />, label: "Home", path: "/dashboard" },
    { icon: <Calendar />, label: "Planner", path: "/planner" },
    { icon: <Gamepad2 />, label: "Game", path: "/game" },
    { icon: <MessageCircle />, label: "Chat", path: "/chat" },
    { icon: <Lock />, label: "Vault", path: "/vault" },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-slate-900/90 backdrop-blur-xl rounded-[2.5rem] p-2 flex justify-around items-center shadow-2xl border border-white/10 z-50">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`p-4 rounded-full transition-all duration-300 ${
            pathname === item.path
              ? "bg-rose-500 text-white scale-110 shadow-lg shadow-rose-500/40"
              : "text-slate-400 hover:text-white"
          }`}
        >
          {item.icon}
        </Link>
      ))}
    </nav>
  );
};
export default Navbar;
