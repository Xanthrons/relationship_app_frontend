import { Send } from "lucide-react";

const Chat = () => (
  <div className="flex flex-col h-[70vh]">
    <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-4">
      Chat
    </h2>
    <div className="flex-1 space-y-4 overflow-y-auto pb-4">
      <div className="bg-slate-100 p-4 rounded-2xl rounded-bl-none max-w-[80%]">
        <p className="text-sm">Hey! Miss you ❤️</p>
      </div>
      <div className="bg-rose-500 text-white p-4 rounded-2xl rounded-br-none max-w-[80%] ml-auto">
        <p className="text-sm">Miss you too! Almost home.</p>
      </div>
    </div>
    <div className="relative mt-auto">
      <input
        className="w-full p-5 bg-white border border-slate-200 rounded-full pr-14"
        placeholder="Type a message..."
      />
      <button className="absolute right-2 top-2 p-3 bg-rose-500 text-white rounded-full">
        <Send size={18} />
      </button>
    </div>
  </div>
);

export default Chat;
