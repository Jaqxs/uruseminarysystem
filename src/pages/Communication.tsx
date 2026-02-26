import { MessageSquare, Send, Search, Plus, MoreHorizontal, Paperclip, Smile, Phone, Video, Users, User, ShieldCheck, CheckCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "../context/LanguageContext";

export default function Communication() {
  const { t, language } = useLanguage();

  const conversations = [
    { id: 1, name: t('parentGroup4A'), type: "group", lastMsg: t('meetingMsg'), time: "2h", unread: 3, avatar: "4A", members: 42, color: "bg-purple-500" },
    { id: 2, name: t('parentName'), type: "direct", lastMsg: t('reportThanks'), time: "5h", unread: 0, avatar: "HM", status: "online", color: "bg-primary" },
    { id: 3, name: t('allTeachersMsg'), type: "group", lastMsg: t('labMeeting'), time: t('yesterday'), unread: 1, avatar: "WW", members: 18, color: "bg-accent" },
    { id: 4, name: t('teacherNameMsg'), type: "direct", lastMsg: t('marksComplete'), time: t('yesterday'), unread: 0, avatar: "GM", status: "offline", color: "bg-primary" },
    { id: 5, name: t('schoolBoard'), type: "group", lastMsg: t('q2Report'), time: t('twoDaysAgo'), unread: 0, avatar: "BS", members: 8, color: "bg-warning" },
  ];

  const initialMessages = [
    { id: 1, sender: "Hassan Mwangi", text: t('msg1'), time: "9:15 AM", mine: false },
    { id: 2, sender: t('me'), text: t('msg2'), time: "9:18 AM", mine: true },
    { id: 3, sender: "Hassan Mwangi", text: t('msg3'), time: "9:20 AM", mine: false },
    { id: 4, sender: t('me'), text: t('msg4'), time: "9:22 AM", mine: true },
    { id: 5, sender: "Hassan Mwangi", text: t('msg5'), time: "9:25 AM", mine: false },
  ];

  const [activeConvId, setActiveConvId] = useState(2);
  const [newMsg, setNewMsg] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [search, setSearch] = useState("");

  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0];

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newMsg.trim()) return;

    const msg = {
      id: messages.length + 1,
      sender: t('me'),
      text: newMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mine: true
    };

    setMessages([...messages, msg]);
    setNewMsg("");

    setTimeout(() => {
      toast.info(t('messageSent'));
    }, 500);
  };

  const filteredConversations = conversations.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-in space-y-6 pb-6 h-[calc(100vh-140px)]">
      <div className="flex h-full rounded-[2.5rem] border border-border bg-card shadow-sm overflow-hidden p-2">
        {/* Sidebar */}
        <div className="w-80 border-r border-border/40 flex flex-col bg-muted/5">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-black font-heading text-foreground">{t('simbulizi')}</h1>
              <button onClick={() => toast.info(t('startChat'))} className="p-2.5 rounded-2xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={t('searchChat')}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-border/60 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/60 shadow-sm"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto sis-scrollbar px-3 space-y-1">
            {filteredConversations.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveConvId(c.id)}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-[1.75rem] transition-all relative ${activeConvId === c.id ? "bg-white shadow-md border-border/40 scale-[1.02]" : "hover:bg-muted/50 border-transparent text-muted-foreground"
                  }`}
              >
                <div className="relative flex-shrink-0">
                  <div className={`w-12 h-12 rounded-2xl ${c.color} flex items-center justify-center text-white font-black shadow-lg shadow-black/5`}>
                    {c.avatar}
                  </div>
                  {c.status === "online" && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white bg-success" />
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-sm font-black truncate tracking-tight ${activeConvId === c.id ? 'text-foreground' : 'text-muted-foreground'}`}>{c.name}</p>
                    <span className="text-[10px] font-bold text-muted-foreground/60 flex-shrink-0">{c.time}</span>
                  </div>
                  <p className="text-xs font-medium truncate mt-0.5 opacity-70 italic">{c.lastMsg}</p>
                </div>
                {c.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-black flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
                    {c.unread}
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="p-4 mt-auto">
            <div className="p-4 rounded-3xl bg-primary/5 border border-primary/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black uppercase text-primary tracking-widest leading-none">{t('secure')}</p>
                <p className="text-[11px] font-medium text-muted-foreground truncate">{t('encrypted')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Header */}
          <div className="px-8 py-6 border-b border-border/40 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className={`w-12 h-12 rounded-2xl ${activeConv.color} flex items-center justify-center text-white font-black shadow-lg`}>
                  {activeConv.avatar}
                </div>
                {activeConv.status === "online" && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white bg-success" />
                )}
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-black font-heading text-foreground tracking-tight">{activeConv.name}</h3>
                <p className="text-xs font-bold text-muted-foreground/60 flex items-center gap-1.5 uppercase tracking-widest">
                  {activeConv.type === 'group' ? (
                    <> <Users className="w-3 h-3" /> {activeConv.members} {t('participants')} </>
                  ) : (
                    <> {activeConv.status === 'online' ? <span className="text-success lowercase">{t('onlineNow')}</span> : <span className="lowercase">{t('lastSeenRecently')}</span>} </>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => toast.promise(new Promise(r => setTimeout(r, 1000)), { loading: `${t('callLoading')} ${activeConv.name}...`, success: t('callSuccess'), error: t('failed') })} className="p-3 rounded-2xl hover:bg-muted text-muted-foreground transition-all">
                <Phone className="w-5 h-5" />
              </button>
              <button onClick={() => toast.info(`${t('loadingReport')} video...`)} className="p-3 rounded-2xl hover:bg-muted text-muted-foreground transition-all">
                <Video className="w-5 h-5" />
              </button>
              <button onClick={() => toast.info(t('chatSettings'))} className="p-3 rounded-2xl hover:bg-muted text-muted-foreground transition-all border border-transparent hover:border-border/60">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-10 py-8 space-y-8 bg-muted/5 min-h-0 sis-scrollbar">
            <div className="flex flex-col gap-6">
              <div className="flex justify-center my-4">
                <span className="px-4 py-1.5 rounded-full bg-white border border-border/60 text-[10px] font-black text-muted-foreground uppercase tracking-widest shadow-sm">{t('todayLabel')}</span>
              </div>

              {messages.map((m, i) => (
                <div key={m.id} className={`flex ${m.mine ? "justify-end" : "justify-start"}`}>
                  <div className={`flex gap-3 max-w-[70%] ${m.mine ? 'flex-row-reverse' : 'flex-row'}`}>
                    {!m.mine && (
                      <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-[10px] font-black mt-1">
                        {m.sender.split(" ").map(n => n[0]).join("")}
                      </div>
                    )}
                    <div className="space-y-1">
                      <div className={`relative px-6 py-4 rounded-[2rem] text-sm font-medium shadow-sm leading-relaxed ${m.mine
                        ? "bg-gradient-primary text-white rounded-tr-none"
                        : "bg-white border border-border/40 text-foreground rounded-tl-none"
                        }`}>
                        {!m.mine && <p className="text-[10px] font-black uppercase text-primary/60 mb-2 tracking-widest">{m.sender}</p>}
                        {m.text}
                      </div>
                      <div className={`flex items-center gap-2 px-2 ${m.mine ? 'justify-end' : 'justify-start'}`}>
                        <span className="text-[10px] font-bold text-muted-foreground/40">{m.time}</span>
                        {m.mine && <CheckCheck className="w-3 h-3 text-primary opacity-60" />}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="px-10 py-8 bg-white border-t border-border/40">
            <form onSubmit={handleSend} className="flex items-center gap-4 bg-muted/30 p-2 rounded-[2rem] border border-border/40 focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/5 transition-all">
              <div className="flex items-center gap-1 pl-2">
                <button onClick={() => toast.info(t('openingFileManager'))} type="button" className="p-2.5 rounded-full hover:bg-white text-muted-foreground transition-all">
                  <Paperclip className="w-5 h-5" />
                </button>
                <button onClick={() => toast.info(t('loadingEmoji'))} type="button" className="p-2.5 rounded-full hover:bg-white text-muted-foreground transition-all">
                  <Smile className="w-5 h-5" />
                </button>
              </div>

              <input
                value={newMsg}
                onChange={e => setNewMsg(e.target.value)}
                placeholder={t('typeMessage')}
                className="flex-1 bg-transparent px-2 py-3 outline-none text-sm font-bold text-foreground placeholder:text-muted-foreground/60 w-full"
              />

              <button
                type="submit"
                className="p-3.5 rounded-full bg-gradient-primary text-white shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

