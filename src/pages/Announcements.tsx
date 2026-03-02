import { useState } from "react";
import { Bell, Plus, Search, Megaphone, Calendar, Send, Trash2, Filter } from "lucide-react";
import { useSisData } from "@/hooks/use-sis-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

export default function Announcements() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const { announcements, addAnnouncement } = useSisData();
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);

  const priorityConfig: Record<string, { badge: string; dot: string; label: string }> = {
    high: { badge: "badge-danger", dot: "bg-destructive", label: t('highPriority') },
    medium: { badge: "badge-warning", dot: "bg-warning", label: t('mediumPriority') },
    low: { badge: "badge-info", dot: "bg-info", label: t('lowPriority') },
  };

  const categories = [t('exam'), t('meeting'), t('sportsCat'), t('financeCat'), t('event'), t('messageCat')];

  const [newAnn, setNewAnn] = useState({
    title: "", content: "", category: t('messageCat'), priority: "medium", author: t('adminMkuu')
  });

  const filtered = announcements.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.content.toLowerCase().includes(search.toLowerCase())
  );

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    addAnnouncement(newAnn);
    setIsAddOpen(false);
    setNewAnn({ title: "", content: "", category: t('messageCat'), priority: "medium", author: t('adminMkuu') });
    toast.success(t('announcementPosted'));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: t('allAnnouncements'), value: announcements.length, gradient: "bg-gradient-card-blue", icon: Megaphone },
          { label: t('urgentImportant'), value: announcements.filter(a => a.priority === 'high').length, gradient: "bg-gradient-card-rose", icon: Bell },
          { label: t('thisMonth'), value: announcements.length, gradient: "bg-gradient-card-green", icon: Calendar },
        ].map((s, i) => (
          <div key={i} onClick={() => toast.info(`${t('loadingReport')} ${s.label.toLowerCase()}...`)} className="stat-card hover:shadow-xl hover:shadow-primary/5 transition-all hover:-translate-y-1 cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${s.gradient} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                <s.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-3xl font-bold font-heading text-foreground">{s.value}</p>
                <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-border bg-card shadow-card overflow-hidden">
        <div className="flex flex-wrap items-center gap-4 px-8 py-6 border-b border-border bg-muted/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-foreground font-heading">{t('announcementBoard')}</h3>
              <p className="text-xs text-muted-foreground">{t('boardSubtitle')}</p>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-card border border-border shadow-sm text-sm text-muted-foreground focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <Search className="w-4 h-4" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={t('searchAnnouncements')}
                className="bg-transparent outline-none text-sm w-48 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {['admin', 'director', 'teacher', 'bursar'].includes(user?.role || '') && (
              <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogTrigger asChild>
                  <button className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-primary text-white text-sm font-bold shadow-md-blue hover:shadow-lg-blue transition-all active:scale-95 leading-none">
                    <Plus className="w-4 h-4" /> {t('postAnnouncement')}
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-xl rounded-[2rem] p-10 text-foreground">
                  <DialogHeader className="mb-6">
                    <DialogTitle className="text-3xl font-bold font-heading">{t('createAnnouncement')}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handlePost} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">{t('headline')}</label>
                      <Input required value={newAnn.title} onChange={e => setNewAnn({ ...newAnn, title: e.target.value })} placeholder={t('placeholderHeadline')} className="rounded-2xl h-12 border-border bg-background" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">{t('group')}</label>
                        <select value={newAnn.category} onChange={e => setNewAnn({ ...newAnn, category: e.target.value })} className="w-full h-12 px-4 rounded-2xl border border-border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer text-foreground">
                          {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">{t('priority')}</label>
                        <select value={newAnn.priority} onChange={e => setNewAnn({ ...newAnn, priority: e.target.value })} className="w-full h-12 px-4 rounded-2xl border border-border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer text-foreground">
                          <option value="low">{t('lowPriority')}</option>
                          <option value="medium">{t('mediumPriority')}</option>
                          <option value="high">{t('highPriority')}</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">{t('fullDetails')}</label>
                      <textarea
                        required
                        value={newAnn.content}
                        onChange={e => setNewAnn({ ...newAnn, content: e.target.value })}
                        placeholder={t('placeholderMessage')}
                        className="w-full h-32 px-4 py-3 rounded-2xl border border-border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none text-foreground"
                      />
                    </div>
                    <DialogFooter>
                      <button type="submit" className="w-full py-4 rounded-2xl bg-gradient-primary text-white font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-2">
                        <Send className="w-4 h-4" /> {t('postToAll')}
                      </button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        <div className="divide-y divide-border/30">
          {filtered.map((a, i) => (
            <div key={i} className="group px-8 py-8 hover:bg-muted/10 transition-all">
              <div className="flex items-start gap-6">
                <div className={`mt-1.5 w-3 h-3 rounded-full flex-shrink-0 shadow-sm ${priorityConfig[a.priority]?.dot || 'bg-muted'} ring-4 ring-background group-hover:ring-muted/50 transition-all`} />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h4 className="text-xl font-bold text-foreground font-heading group-hover:text-primary transition-colors">{a.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">{a.category}</span>
                      <span className={`px-3 py-1 rounded-full ${priorityConfig[a.priority]?.badge || 'bg-muted'} text-[10px] font-bold uppercase tracking-wider`}>
                        {priorityConfig[a.priority]?.label || a.priority}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-4xl mb-6">{a.content}</p>
                  <div className="flex items-center gap-6 text-xs font-semibold text-muted-foreground/70">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-muted/40 transition-colors group-hover:bg-muted/60">
                      <Calendar className="w-3.5 h-3.5" />
                      {a.date}
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-muted/40 transition-colors group-hover:bg-muted/60">
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] text-white">
                        {a.author[0]}
                      </div>
                      {a.author}
                    </div>
                    <button onClick={() => toast.success(t('announcementDeleted'))} className="ml-auto p-2 rounded-xl text-muted-foreground hover:bg-destructive-light hover:text-destructive opacity-0 group-hover:opacity-100 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

