import { useState } from "react";
import { Check, X, Clock, Search, Download, ChevronDown } from "lucide-react";

const classes = ["Form 1A", "Form 1B", "Form 2A", "Form 2B", "Form 3A", "Form 3B", "Form 4A", "Form 4B"];

const students = [
  { id: 1, name: "Amina Hassan", avatar: "AH" },
  { id: 2, name: "Baraka Juma", avatar: "BJ" },
  { id: 3, name: "Catherine Mwamba", avatar: "CM" },
  { id: 4, name: "Daniel Osei", avatar: "DO" },
  { id: 5, name: "Esther Kimani", avatar: "EK" },
  { id: 6, name: "Farouk Ally", avatar: "FA" },
  { id: 7, name: "Grace Ndugu", avatar: "GN" },
  { id: 8, name: "Hassan Mrisho", avatar: "HM" },
  { id: 9, name: "Irene Tarehe", avatar: "IT" },
  { id: 10, name: "John Mwenda", avatar: "JM" },
  { id: 11, name: "Kalila Pendo", avatar: "KP" },
  { id: 12, name: "Lavinia Sokoine", avatar: "LS" },
];

type AttStatus = "present" | "absent" | "late" | null;

const weekSummary = [
  { class: "Form 4A", total: 42, present: 40, absent: 2, rate: "95.2%" },
  { class: "Form 3B", total: 38, present: 35, absent: 3, rate: "92.1%" },
  { class: "Form 2A", total: 40, present: 37, absent: 3, rate: "92.5%" },
  { class: "Form 1C", total: 44, present: 44, absent: 0, rate: "100%" },
  { class: "Form 4B", total: 39, present: 36, absent: 3, rate: "92.3%" },
];

export default function Attendance() {
  const [selectedClass, setSelectedClass] = useState("Form 4A");
  const [attendance, setAttendance] = useState<Record<number, AttStatus>>({});
  const [saved, setSaved] = useState(false);
  const today = new Date().toLocaleDateString("sw-TZ", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const mark = (id: number, status: AttStatus) => {
    setAttendance(prev => ({ ...prev, [id]: prev[id] === status ? null : status }));
    setSaved(false);
  };

  const markAll = (status: AttStatus) => {
    const all: Record<number, AttStatus> = {};
    students.forEach(s => { all[s.id] = status; });
    setAttendance(all);
    setSaved(false);
  };

  const presentCount = Object.values(attendance).filter(v => v === "present").length;
  const absentCount = Object.values(attendance).filter(v => v === "absent").length;
  const lateCount = Object.values(attendance).filter(v => v === "late").length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Jumla ya Wanafunzi", value: students.length, gradient: "bg-gradient-card-blue", color: "text-primary" },
          { label: "Waliofika", value: presentCount, gradient: "bg-gradient-card-green", color: "text-accent" },
          { label: "Waliochelewa", value: lateCount, gradient: "bg-gradient-card-amber", color: "text-warning" },
          { label: "Hawakufika", value: absentCount, gradient: "bg-gradient-card-rose", color: "text-destructive" },
        ].map(s => (
          <div key={s.label} className="stat-card text-center">
            <p className={`text-3xl font-bold font-heading ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-2">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Marking Panel */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card shadow-card overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-border" style={{ background: "var(--gradient-hero)" }}>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="text-white">
                <h3 className="font-bold font-heading">Mahudhurio ya Leo</h3>
                <p className="text-white/70 text-xs mt-0.5">{today}</p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={selectedClass}
                  onChange={e => setSelectedClass(e.target.value)}
                  className="px-3 py-2 rounded-xl text-sm font-medium bg-white/15 text-white border border-white/20 focus:outline-none"
                >
                  {classes.map(c => <option key={c} className="text-foreground bg-card">{c}</option>)}
                </select>
              </div>
            </div>
            {/* Rate bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-white/80 mb-1.5">
                <span>Kiwango cha Mahudhurio</span>
                <span className="font-bold">{students.length > 0 ? Math.round((presentCount / students.length) * 100) : 0}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                <div className="h-full rounded-full bg-white transition-all duration-500" style={{ width: `${(presentCount / students.length) * 100}%` }} />
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex items-center gap-2 px-6 py-3 border-b border-border bg-muted/30">
            <span className="text-xs text-muted-foreground font-medium">Weka wote:</span>
            <button onClick={() => markAll("present")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-light text-accent text-xs font-semibold hover:bg-accent hover:text-white transition-colors">
              <Check className="w-3 h-3" /> Waliofika
            </button>
            <button onClick={() => markAll("absent")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-destructive-light text-destructive text-xs font-semibold hover:bg-destructive hover:text-white transition-colors">
              <X className="w-3 h-3" /> Hawakufika
            </button>
            <button onClick={() => markAll("late")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-warning-light text-warning text-xs font-semibold hover:bg-warning hover:text-white transition-colors">
              <Clock className="w-3 h-3" /> Waliochelewa
            </button>
            <button onClick={() => setAttendance({})} className="ml-auto text-xs text-muted-foreground hover:text-foreground font-medium">
              Futa yote
            </button>
          </div>

          {/* Student list */}
          <div className="divide-y divide-border/40">
            {students.map(s => {
              const status = attendance[s.id];
              return (
                <div key={s.id} className="flex items-center gap-4 px-6 py-3 hover:bg-muted/20 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {s.avatar}
                  </div>
                  <span className="flex-1 text-sm font-medium text-foreground">{s.name}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => mark(s.id, "present")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${status === "present" ? "bg-accent text-white shadow-accent" : "bg-accent-light text-accent hover:bg-accent hover:text-white"}`}>
                      <Check className="w-3 h-3" /> Amefika
                    </button>
                    <button onClick={() => mark(s.id, "late")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${status === "late" ? "bg-warning text-white" : "bg-warning-light text-warning hover:bg-warning hover:text-white"}`}>
                      <Clock className="w-3 h-3" /> Amechelewa
                    </button>
                    <button onClick={() => mark(s.id, "absent")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${status === "absent" ? "bg-destructive text-white" : "bg-destructive-light text-destructive hover:bg-destructive hover:text-white"}`}>
                      <X className="w-3 h-3" /> Hakufika
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Save */}
          <div className="px-6 py-4 border-t border-border bg-muted/20 flex items-center justify-between">
            {saved && <span className="badge-success">✓ Mahudhurio yamehifadhiwa</span>}
            {!saved && <span className="text-xs text-muted-foreground">{Object.keys(attendance).length}/{students.length} wanafunzi wamewekwa</span>}
            <button onClick={() => setSaved(true)}
              className="px-6 py-2.5 rounded-xl bg-gradient-primary text-white text-sm font-semibold shadow-md-blue hover:shadow-lg-blue transition-all hover:-translate-y-0.5">
              Hifadhi Mahudhurio
            </button>
          </div>
        </div>

        {/* Weekly Summary */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="font-bold text-foreground font-heading">Muhtasari wa Wiki</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Mahudhurio kwa darasa</p>
            </div>
            <div className="divide-y divide-border/40">
              {weekSummary.map(w => (
                <div key={w.class} className="px-5 py-3.5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-foreground">{w.class}</span>
                    <span className={`text-xs font-bold ${parseFloat(w.rate) >= 95 ? "text-accent" : parseFloat(w.rate) >= 90 ? "text-warning" : "text-destructive"}`}>{w.rate}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: w.rate,
                        background: parseFloat(w.rate) >= 95 ? "hsl(var(--accent))" : parseFloat(w.rate) >= 90 ? "hsl(var(--warning))" : "hsl(var(--destructive))"
                      }} />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1.5">{w.present}/{w.total} wamefika • {w.absent} hawakufika</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card shadow-card p-5">
            <h3 className="font-bold text-foreground font-heading mb-3">Vitendo vya Haraka</h3>
            <div className="space-y-2">
              {[
                { icon: Download, label: "Pakua Ripoti ya Leo", color: "text-primary" },
                { icon: Search, label: "Tafuta Mwanafunzi", color: "text-accent" },
                { icon: ChevronDown, label: "Historia ya Mahudhurio", color: "text-warning" },
              ].map(a => (
                <button key={a.label} className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-muted transition-colors text-sm font-medium ${a.color}`}>
                  <a.icon className="w-4 h-4" />
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
