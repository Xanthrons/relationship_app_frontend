import { Heart } from "lucide-react";

const Preferences = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-3xl font-black italic uppercase tracking-tighter">
      Preferences
    </h2>
    <div className="space-y-4">
      {["Love Language", "Favorite Food", "Dream Date"].map((pref) => (
        <div
          key={pref}
          className="p-6 bg-white rounded-[2rem] border border-slate-100 flex justify-between items-center"
        >
          <span className="font-bold text-slate-600">{pref}</span>
          <Heart size={18} className="text-rose-500" />
        </div>
      ))}
    </div>
  </div>
);
export default Preferences;
