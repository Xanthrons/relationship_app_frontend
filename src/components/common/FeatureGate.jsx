import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Lock, Users } from "lucide-react";

const FeatureGate = ({ children, featureName }) => {
  const { user } = useAuth();
  const isCouple = user?.mode === "couple";

  if (isCouple) return children;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center animate-in fade-in zoom-in duration-500">
      <div className="w-20 h-20 bg-slate-100 rounded-[2.5rem] flex items-center justify-center mb-6 shadow-inner">
        <Lock className="text-slate-400" size={32} />
      </div>
      <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-2">
        {featureName} is Shared
      </h2>
      <p className="text-slate-500 text-sm max-w-xs mx-auto mb-8 font-medium">
        You need a partner to access the {featureName.toLowerCase()}. Once they
        join using your code, this space will sync between both of you!
      </p>
      <div className="bg-rose-50 px-6 py-3 rounded-2xl border border-rose-100 flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-widest">
        <Users size={16} /> Waiting for Partner
      </div>
    </div>
  );
};

export default FeatureGate;
