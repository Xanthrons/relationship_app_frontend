import { Lock, Image as ImageIcon } from "lucide-react";

const Vault = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-black italic uppercase tracking-tighter">
      Vault
    </h2>
    <div className="grid grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="aspect-square bg-slate-200 rounded-[2rem] flex items-center justify-center relative overflow-hidden group"
        >
          <ImageIcon className="text-slate-400" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <Lock className="text-white" size={20} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Vault;
