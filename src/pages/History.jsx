import { History as HistoryIcon } from "lucide-react";

const History = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-3xl font-black italic uppercase tracking-tighter">
      History
    </h2>
    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 flex flex-col items-center justify-center text-slate-300 min-h-[300px]">
      <HistoryIcon size={48} className="mb-4 opacity-20" />
      <p className="font-bold uppercase text-[10px] tracking-[0.2em]">
        No past activities recorded
      </p>
    </div>
  </div>
);
export default History;
