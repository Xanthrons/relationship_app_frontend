import { Gamepad2, Flame } from "lucide-react";

const Game = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-black italic uppercase tracking-tighter">
      The Game
    </h2>
    <div className="bg-gradient-to-br from-orange-400 to-rose-500 p-8 rounded-[2.5rem] text-white shadow-xl shadow-rose-500/20">
      <Flame className="mb-4" />
      <h3 className="text-2xl font-black mb-2">Daily Spark</h3>
      <p className="text-lg opacity-90">
        "If we could teleport anywhere for 24 hours, where would we go?"
      </p>
      <button className="mt-6 bg-white text-rose-500 px-6 py-3 rounded-full font-black text-sm uppercase">
        Answer Now
      </button>
    </div>
  </div>
);

export default Game;
