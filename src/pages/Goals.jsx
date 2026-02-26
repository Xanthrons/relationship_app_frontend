import { Target } from "lucide-react";

const Goals = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-3xl font-black italic uppercase tracking-tighter">
      Shared Goals
    </h2>
    <div className="grid grid-cols-1 gap-4">
      <div className="p-8 bg-white border-2 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center text-slate-400">
        <Target size={40} className="mb-2 opacity-20" />
        <p className="font-bold">Set your first shared goal</p>
      </div>
    </div>
  </div>
);
export default Goals;
