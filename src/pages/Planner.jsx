import { Calendar as CalIcon, Plus } from "lucide-react";

const Planner = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-3xl font-black italic uppercase tracking-tighter">
        Planner
      </h2>
      <button className="p-3 bg-slate-900 text-white rounded-full">
        <Plus />
      </button>
    </div>
    <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] h-64 flex flex-col items-center justify-center text-slate-400">
      <CalIcon size={48} className="mb-2 opacity-20" />
      <p className="font-bold">No upcoming dates yet.</p>
    </div>
  </div>
);

export default Planner;
