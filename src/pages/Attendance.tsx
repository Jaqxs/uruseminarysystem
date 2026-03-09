import { useState } from "react";
import { Check, X, Clock, Search, Download, ChevronDown, Calendar, Filter, UserX, UserCheck, AlertCircle, Send, MoreHorizontal, User } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "../context/LanguageContext";

const classes = ["Form 1A", "Form 1B", "Form 2A", "Form 2B", "Form 3A", "Form 3B", "Form 4A", "Form 4B"];

const initialStudents = [
  { id: 1, name: "Stephen Peter", avatar: "SP" },
  { id: 2, name: "Baraka John", avatar: "BJ" },
  { id: 3, name: "Clement Mwamba", avatar: "CM" },
  { id: 4, name: "Daniel Osei", avatar: "DO" },
  { id: 5, name: "Emmanuel Kimani", avatar: "EK" },
  { id: 6, name: "Fabian Mark", avatar: "FM" },
  { id: 7, name: "Gabriel Ndugu", avatar: "GN" },
  { id: 8, name: "Peter Macha", avatar: "PM" },
  { id: 9, name: "Isaac Tarehe", avatar: "IT" },
  { id: 10, name: "John Mwenda", avatar: "JM" },
  { id: 11, name: "Keneth Pendo", avatar: "KP" },
  { id: 12, name: "Lazarus Sokoine", avatar: "LS" },
];

type AttStatus = "present" | "absent" | "late" | null;

const weekSummary = [
  { class: "Form 4A", total: 42, present: 40, absent: 2, rate: "95.2%", trend: "+2%" },
  { class: "Form 3B", total: 38, present: 35, absent: 3, rate: "92.1%", trend: "-1%" },
  { class: "Form 2A", total: 40, present: 37, absent: 3, rate: "92.5%", trend: "0%" },
  { class: "Form 1C", total: 44, present: 44, absent: 0, rate: "100%", trend: "+5%" },
  { class: "Form 4B", total: 39, present: 36, absent: 3, rate: "92.3%", trend: "-2%" },
];

export default function Attendance() {
  const { t, language } = useLanguage();
  const [selectedClass, setSelectedClass] = useState("Form 4A");
  const [attendance, setAttendance] = useState<Record<number, AttStatus>>({});
  const [search, setSearch] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const today = new Date().toLocaleDateString(language === 'sw' ? "sw-TZ" : "en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const mark = (id: number, status: AttStatus) => {
    setAttendance(prev => ({ ...prev, [id]: prev[id] === status ? null : status }));
  };

  const markAll = (status: AttStatus) => {
    const all: Record<number, AttStatus> = {};
    initialStudents.forEach(s => { all[s.id] = status; });
    setAttendance(all);
    const statusLabel = status === 'present' ? t('wamefika') : status === 'late' ? t('wamechelewa') : t('hawajafika');
    toast.message(`${t('allMarkedAs')}: ${statusLabel}`);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success(t('attendanceSaved'));
    }, 1500);
  };

  const filtered = initialStudents.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  const presentCount = Object.values(attendance).filter(v => v === "present").length;
  const absentCount = Object.values(attendance).filter(v => v === "absent").length;
  const lateCount = Object.values(attendance).filter(v => v === "late").length;
  const markedCount = Object.keys(attendance).length;
  const rate = initialStudents.length > 0 ? Math.round((presentCount / initialStudents.length) * 100) : 0;

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Stats Board */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('students'), value: initialStudents.length, gradient: "bg-gradient-card-blue", icon: User },
          { label: t('present'), value: presentCount, gradient: "bg-gradient-card-green", icon: UserCheck },
          { label: t('late'), value: lateCount, gradient: "bg-gradient-card-amber", icon: Clock },
          { label: t('absent'), value: absentCount, gradient: "bg-gradient-card-rose", icon: UserX },
        ].map((s, i) => (
          <div key={i} onClick={() => toast.info(`${t('loadingReport')} ${s.label.toLowerCase()}...`)} className="stat-card hover:shadow-xl transition-all cursor-pointer group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.gradient} mb-3 group-hover:scale-110 transition-transform`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold font-heading text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Attendance List */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card shadow-card overflow-hidden">
          <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-border bg-muted/20 gap-4">
            <div>
              <h3 className="text-lg font-bold font-heading text-foreground">{t('attendanceRegister')}</h3>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase">{today}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background border border-border text-xs text-muted-foreground">
                <Search className="w-3.5 h-3.5" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t('search')} className="bg-transparent outline-none w-24" />
              </div>
              <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-bold text-foreground">
                {classes.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="p-4 overflow-y-auto max-h-[600px] sis-scrollbar">
            <div className="space-y-1">
              {filtered.map(s => {
                const status = attendance[s.id];
                return (
                  <div key={s.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/30 transition-all border border-transparent hover:border-border/40 group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xs font-bold group-hover:scale-105 transition-transform">
                      {s.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">{s.name}</p>
                      <p className="text-[10px] text-muted-foreground font-semibold uppercase">{selectedClass}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => mark(s.id, "present")} className={`p-2 rounded-lg transition-all ${status === 'present' ? 'bg-success text-white shadow-sm' : 'bg-muted/50 text-muted-foreground hover:bg-success/10 hover:text-success'}`}>
                        <Check className="w-4 h-4" />
                      </button>
                      <button onClick={() => mark(s.id, "late")} className={`p-2 rounded-lg transition-all ${status === 'late' ? 'bg-warning text-white shadow-sm' : 'bg-muted/50 text-muted-foreground hover:bg-warning/10 hover:text-warning'}`}>
                        <Clock className="w-4 h-4" />
                      </button>
                      <button onClick={() => mark(s.id, "absent")} className={`p-2 rounded-lg transition-all ${status === 'absent' ? 'bg-destructive text-white shadow-sm' : 'bg-muted/50 text-muted-foreground hover:bg-destructive/10 hover:text-destructive'}`}>
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-6 border-t border-border bg-muted/20 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary flex items-center justify-center text-[10px] font-bold">
                {rate}%
              </div>
              <p className="text-xs font-bold text-muted-foreground uppercase">{t('todayRate')}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => markAll('present')} className="px-4 py-2 rounded-xl border border-border bg-background text-xs font-bold hover:bg-muted transition-all">
                {t('markAll')}
              </button>
              <button onClick={handleSave} disabled={isSaving} className="px-6 py-2.5 rounded-xl bg-gradient-primary text-white text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2">
                {isSaving ? <Clock className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {isSaving ? t('saving') : t('save')}
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card shadow-card p-6">
            <h3 className="text-lg font-bold font-heading mb-4">{t('weeklyTrend')}</h3>
            <div className="space-y-4">
              {weekSummary.map((w, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-foreground">{w.class}</span>
                    <span className="text-muted-foreground">{w.rate}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: w.rate }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-primary p-6 text-white shadow-md">
            <h3 className="text-lg font-bold font-heading mb-4">{t('actions')}</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-xs font-bold group">
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" /> {t('pdfReport')}
              </button>
              <button onClick={() => {
                toast.promise(new Promise(resolve => setTimeout(resolve, 2000)), {
                  loading: t('sendingSMS'),
                  success: t('smsSent'),
                  error: 'Failed to send SMS'
                })
              }} className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-xs font-bold group">
                <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /> {t('sendSMS')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

