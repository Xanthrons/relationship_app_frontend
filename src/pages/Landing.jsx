import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Landing = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-500">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-black">
          TwoFold<span className="text-rose-500">.</span>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-100 dark:bg-white/10"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
          <button
            onClick={() => navigate("/login")}
            className="font-bold hover:text-rose-500 transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-rose-500 text-white px-6 py-2 rounded-full font-bold hover:bg-rose-600 transition-all"
          >
            Join Free
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 pt-16 pb-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 className="text-6xl md:text-7xl font-black tracking-tight leading-none">
            Your Relationship, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-rose-500">
              Digitalized.
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            TwoFold is more than an app—it's a private world for you and your
            partner. Bridge the distance with shared milestones, private
            journals, and interactive growth tracking.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-all"
            >
              Create Our World
            </button>
            <button
              onClick={() => navigate("/enter-code")}
              className="px-8 py-4 bg-transparent border-2 border-slate-200 dark:border-white/20 text-slate-900 dark:text-white rounded-2xl font-black text-lg hover:border-rose-500 transition-all"
            >
              Enter Partner Code
            </button>
          </div>
        </div>
        <div className="hidden lg:block relative">
          <div className="w-full h-[500px] bg-gradient-to-br from-purple-100 to-rose-100 dark:from-purple-900/20 dark:to-rose-900/20 rounded-[4rem] border border-white/20 shadow-2xl flex items-center justify-center overflow-hidden">
            <span className="text-8xl animate-float">📱</span>
          </div>
        </div>
      </section>

      {/* Information Desk / Features */}
      <section className="bg-slate-50 dark:bg-white/5 py-24 px-8 border-y border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black mb-16 text-center italic">
            "Built for the modern couple."
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Privacy First",
                text: "End-to-end intimacy. Your photos, chats, and goals are for your eyes only.",
                icon: "🔒",
              },
              {
                title: "Shared Growth",
                text: "Interactive 'Level Up' systems based on your relationship milestones.",
                icon: "📈",
              },
              {
                title: "Distance Bridging",
                text: "Real-time status updates and countdowns for your next meetup.",
                icon: "✈️",
              },
            ].map((f, i) => (
              <div key={i} className="space-y-4">
                <div className="text-4xl">{f.icon}</div>
                <h3 className="text-xl font-bold">{f.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default Landing;
