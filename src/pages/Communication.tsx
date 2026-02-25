import { MessageSquare, Send, Search, Plus } from "lucide-react";
import { useState } from "react";

const conversations = [
  { id: 1, name: "Wazazi wa Darasa 4A", type: "group", lastMsg: "Mkutano wa wiki ijayo", time: "Saa 2 zilizopita", unread: 3, avatar: "4A" },
  { id: 2, name: "Hassan Mwangi (Mzazi)", type: "direct", lastMsg: "Asante kwa ripoti", time: "Saa 5 zilizopita", unread: 0, avatar: "HM" },
  { id: 3, name: "Walimu Wote", type: "group", lastMsg: "Mkutano kesho saa 3 asubuhi", time: "Jana", unread: 1, avatar: "WW" },
  { id: 4, name: "Grace Mwamba (Mwalimu)", type: "direct", lastMsg: "Alama za term zimekamilika", time: "Jana", unread: 0, avatar: "GM" },
  { id: 5, name: "Bodi ya Shule", type: "group", lastMsg: "Taarifa ya fedha Q2", time: "Juzi", unread: 0, avatar: "BS" },
];

const messages = [
  { id: 1, sender: "Hassan Mwangi", text: "Habari za asubuhi. Nilikuwa nataka kujua maendeleo ya mtoto wangu Amina.", time: "9:15", mine: false },
  { id: 2, sender: "Mimi", text: "Habari! Amina anafanya vizuri sana. Alipata alama nzuri kwenye mtihani wa mwisho - 94%.", time: "9:18", mine: true },
  { id: 3, sender: "Hassan Mwangi", text: "Mashallah! Asante sana. Je, mahudhurio yake yako sawa?", time: "9:20", mine: false },
  { id: 4, sender: "Mimi", text: "Ndiyo, mahudhurio yake ni 98% mwezi huu. Ni mwanafunzi mzuri sana.", time: "9:22", mine: true },
  { id: 5, sender: "Hassan Mwangi", text: "Asante kwa ripoti. Nitamhamasisha aendelee bidii.", time: "9:25", mine: false },
];

export default function Communication() {
  const [activeConv, setActiveConv] = useState(2);
  const [newMsg, setNewMsg] = useState("");

  return (
    <div className="animate-fade-in">
      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden" style={{ height: "calc(100vh - 180px)" }}>
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-72 border-r border-border flex flex-col flex-shrink-0">
            <div className="px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/60 border border-border/50 text-sm text-muted-foreground">
                <Search className="w-4 h-4 flex-shrink-0" />
                <input placeholder="Tafuta mazungumzo..." className="flex-1 bg-transparent outline-none text-sm" />
              </div>
            </div>
            <div className="p-3">
              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-primary text-white text-sm font-semibold shadow-md-blue">
                <Plus className="w-4 h-4" /> Ujumbe Mpya
              </button>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-border/40">
              {conversations.map(c => (
                <div key={c.id} onClick={() => setActiveConv(c.id)}
                  className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-colors ${activeConv === c.id ? "bg-primary-light/60" : "hover:bg-muted/40"}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${c.type === "group" ? "bg-gradient-card-purple" : "bg-gradient-primary"}`}>
                    {c.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-foreground truncate">{c.name}</p>
                      <span className="text-[10px] text-muted-foreground flex-shrink-0 ml-2">{c.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{c.lastMsg}</p>
                  </div>
                  {c.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                      {c.unread}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chat area */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="px-6 py-4 border-b border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-white text-xs font-bold">HM</div>
              <div>
                <p className="font-bold text-foreground font-heading">Hassan Mwangi (Mzazi)</p>
                <p className="text-xs text-accent flex items-center gap-1"><span className="pulse-dot" /> Mtandaoni</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {messages.map(m => (
                <div key={m.id} className={`flex ${m.mine ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-sm px-4 py-3 rounded-2xl text-sm ${m.mine ? "bg-gradient-primary text-white rounded-br-sm shadow-md-blue" : "bg-muted text-foreground rounded-bl-sm"}`}>
                    {!m.mine && <p className="text-[10px] font-semibold mb-1 text-primary">{m.sender}</p>}
                    <p className="leading-relaxed">{m.text}</p>
                    <p className={`text-[10px] mt-1 ${m.mine ? "text-white/60" : "text-muted-foreground"}`}>{m.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-border">
              <div className="flex items-center gap-3">
                <input
                  value={newMsg}
                  onChange={e => setNewMsg(e.target.value)}
                  placeholder="Andika ujumbe wako..."
                  className="flex-1 px-4 py-3 rounded-xl border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button className="p-3 rounded-xl bg-gradient-primary text-white shadow-md-blue hover:shadow-lg-blue transition-all hover:-translate-y-0.5">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
