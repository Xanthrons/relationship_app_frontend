import { User, Shield } from "lucide-react";

const Profile = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-3xl font-black italic uppercase tracking-tighter">
      Profile
    </h2>
    <div className="bg-slate-900 rounded-[3rem] p-8 text-white">
      <div className="w-20 h-20 bg-rose-500 rounded-2xl mb-4" />
      <h3 className="text-2xl font-black italic">Your Identity</h3>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
        <Shield size={12} /> Verified Partner
      </p>
    </div>
  </div>
);
export default Profile;
