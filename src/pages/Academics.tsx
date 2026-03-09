import { useState } from "react";
import {
  BookOpen, Users, Award, BarChart2, Clock, Plus, Search, Download,
  ChevronRight, MoreVertical, Filter, Star, Zap, GraduationCap, Map,
  TrendingUp, TrendingDown, Target, AlertTriangle, CheckCircle2,
  Calendar, Layers, Activity, FileText, ClipboardCheck, ArrowUpRight
} from "lucide-react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Cell,
  AreaChart, Area, LineChart, Line, ComposedChart
} from "recharts";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useLanguage } from "../context/LanguageContext";

export default function Academics() {
  const { t } = useLanguage();
  const [activeLevel, setActiveLevel] = useState<"O-Level" | "A-Level">("O-Level");

  const initialSubjects = [
    { id: 1, name: t('civics'), teacher: "Mwl. Stephen John", students: 485, avgGrade: 78, pass: 85, icon: "🏛️", dept: t('artsDept'), level: "O-Level" },
    { id: 2, name: t('history'), teacher: "Mwl. Francis Mark", students: 485, avgGrade: 74, pass: 82, icon: "⏳", dept: t('artsDept'), level: "O-Level" },
    { id: 3, name: t('geography'), teacher: "Mwl. Baraka Shayo", students: 485, avgGrade: 76, pass: 88, icon: "🌍", dept: t('artsDept'), level: "O-Level" },
    { id: 4, name: t('kiswahili'), teacher: "Mwl. Stephen John", students: 485, avgGrade: 85, pass: 95, icon: "✍️", dept: t('languagesDept'), level: "O-Level" },
    { id: 5, name: t('english'), teacher: "Mwl. Gabriel Mwamba", students: 485, avgGrade: 82, pass: 92, icon: "📖", dept: t('languagesDept'), level: "O-Level" },
    { id: 6, name: t('biology'), teacher: "Mwl. Neville Gabriel", students: 485, avgGrade: 75, pass: 86, icon: "🧬", dept: t('scienceDept'), level: "O-Level" },
    { id: 7, name: t('math'), teacher: "Mwl. John Kamau", students: 485, avgGrade: 68, pass: 75, icon: "📐", dept: t('scienceDept'), level: "O-Level" },
    { id: 8, name: t('physics'), teacher: "Mwl. Peter Macha", students: 240, avgGrade: 65, pass: 70, icon: "⚛️", dept: t('scienceDept'), level: "O-Level" },
    { id: 9, name: t('chemistry'), teacher: "Mwl. Rehema Paul", students: 240, avgGrade: 67, pass: 72, icon: "🧪", dept: t('scienceDept'), level: "O-Level" },

    { id: 10, name: t('advancedMath'), teacher: "Mwl. John Kamau", students: 45, avgGrade: 65, pass: 75, icon: "📐", dept: t('scienceDept'), level: "A-Level" },
    { id: 11, name: t('physics'), teacher: "Mwl. Peter Macha", students: 40, avgGrade: 62, pass: 70, icon: "⚛️", dept: t('scienceDept'), level: "A-Level" },
    { id: 12, name: t('generalStudies'), teacher: "Mwl. Gabriel Mwamba", students: 120, avgGrade: 85, pass: 98, icon: "🌍", dept: t('languagesDept'), level: "A-Level" },
  ];

  const examPerformanceData = activeLevel === "O-Level"
    ? [
      { month: "Jan", internal: 68, external: 62 },
      { month: "Feb", internal: 72, external: 65 },
      { month: "Mar", internal: 70, external: 72 },
      { month: "Apr", internal: 75, external: 78 },
      { month: "May", internal: 82, external: 80 },
      { month: "Jun", internal: 85, external: 84 },
    ]
    : [
      { month: "Jan", internal: 60, external: 58 },
      { month: "Feb", internal: 65, external: 60 },
      { month: "Mar", internal: 66, external: 65 },
      { month: "Apr", internal: 70, external: 72 },
      { month: "May", internal: 75, external: 74 },
      { month: "Jun", internal: 78, external: 76 },
    ];

  const generalTrendData = activeLevel === "O-Level"
    ? [
      { term: "Term 1 2023", avg: 68, pass: 82 },
      { term: "Term 2 2023", avg: 72, pass: 85 },
      { term: "Term 1 2024", avg: 76, pass: 88 },
    ]
    : [
      { term: "Term 1 2023", avg: 58, pass: 70 },
      { term: "Term 2 2023", avg: 62, pass: 74 },
      { term: "Term 1 2024", avg: 66, pass: 78 },
    ];

  const latestExams = activeLevel === "O-Level"
    ? [
      { name: "Mid-Term Exam", status: "Completed", progress: 100, reports: "Released", color: "bg-emerald-500" },
      { name: "Monthly Test (June)", status: "Ongoing", progress: 65, reports: "Pending", color: "bg-amber-500" },
      { name: "Mock Exam", status: "Not Started", progress: 0, reports: "Scheduled", color: "bg-muted" },
    ]
    : [
      { name: "Unit Test 1 (A-Level)", status: "Completed", progress: 100, reports: "Released", color: "bg-emerald-500" },
      { name: "Practical Lab Exam", status: "Ongoing", progress: 45, reports: "In Progress", color: "bg-amber-500" },
      { name: "National Prep Exam", status: "Not Started", progress: 0, reports: "August", color: "bg-muted" },
    ];

  const upcomingExams = [
    { name: "Final Terminal", date: "July 12, 2024", classes: "All Forms", countdown: "12 Days" },
    { name: "NECTA Selection", date: "August 05, 2024", classes: "Form 4 & 6", countdown: "34 Days" },
  ];

  const timetableSnapshot = [
    { period: "08:00 - 08:40", subject: t('math'), teacher: "J. Kamau", room: "F4A" },
    { period: "08:40 - 09:20", subject: t('english'), teacher: "G. Mwamba", room: "F4A" },
    { period: "09:20 - 10:00", subject: t('physics'), teacher: "P. Macha", room: "Lab 1" },
  ];

  const [subjects, setSubjects] = useState(initialSubjects);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filteredSubjects = subjects.filter(s =>
    s.level === activeLevel &&
    (s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.teacher.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-4 animate-fade-in pb-8">
      {/* 🚀 Academic Level Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-1.5 bg-muted/30 rounded-2xl border border-border/50">
        <div className="flex p-0.5 gap-1">
          <button
            onClick={() => setActiveLevel("O-Level")}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeLevel === "O-Level" ? "bg-card text-primary shadow ring-1 ring-border" : "text-muted-foreground hover:text-foreground"}`}
          >
            <GraduationCap className={`w-3.5 h-3.5 ${activeLevel === "O-Level" ? "text-primary" : "text-muted-foreground"}`} />
            {t('oLevel')}
          </button>
          <button
            onClick={() => setActiveLevel("A-Level")}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeLevel === "A-Level" ? "bg-card text-primary shadow ring-1 ring-border" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Award className={`w-3.5 h-3.5 ${activeLevel === "A-Level" ? "text-primary" : "text-muted-foreground"}`} />
            {t('aLevel')}
          </button>
        </div>
        <div className="flex items-center gap-2 pr-3">
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-muted/40 border border-border text-[10px] font-bold text-muted-foreground hover:bg-muted/60 transition-all">
            <Filter className="w-3 h-3" /> {t('filterByTerm')}
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-[10px] font-bold shadow-md shadow-primary/20 hover:scale-105 transition-all">
            <Download className="w-3 h-3" /> {t('exportReport')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        {/* 📊 LEFT COLUMN: Snapshots & KPIs */}
        <div className="xl:col-span-3 space-y-4">
          {/* Section: Academic Performance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-card p-4 rounded-2xl border border-border shadow-sm flex flex-col justify-between group hover:shadow-md transition-all border-l-4 border-l-primary/40">
              <div className="flex items-center justify-between mb-1.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Activity className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1 text-[9px] font-black text-success">
                  <ArrowUpRight className="w-2.5 h-2.5" /> {activeLevel === "O-Level" ? "+3.2%" : "+1.8%"}
                </div>
              </div>
              <div>
                <p className="text-2xl font-black font-heading leading-tight mb-0.5">{activeLevel === "O-Level" ? "76.4%" : "68.2%"}</p>
                <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">{t('overallSchoolAverage')}</p>
              </div>
            </div>

            <div className="bg-card p-4 rounded-2xl border border-border shadow-sm flex flex-col justify-between group hover:shadow-md transition-all border-l-4 border-l-emerald-500/40">
              <div className="flex items-center justify-between mb-1.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-[8px] font-black text-emerald-600 uppercase">Above Target</div>
              </div>
              <div>
                <p className="text-2xl font-black font-heading leading-tight mb-0.5">{activeLevel === "O-Level" ? "88%" : "82%"}</p>
                <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">{t('passRate')}</p>
              </div>
            </div>

            <div className="bg-card p-4 rounded-2xl border border-border shadow-sm flex flex-col justify-between group hover:shadow-md transition-all border-l-4 border-l-rose-500/40">
              <div className="flex items-center justify-between mb-1.5">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-600">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="px-2 py-0.5 rounded-full bg-rose-500/10 text-[8px] font-black text-rose-600 uppercase">Warning</div>
              </div>
              <div>
                <p className="text-2xl font-black font-heading leading-tight mb-0.5">{activeLevel === "O-Level" ? "12%" : "18%"}</p>
                <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">{t('failRate')}</p>
              </div>
            </div>
          </div>

          {/* Comparative & Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-card p-5 rounded-2xl border border-border shadow-sm group">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-black font-heading leading-none mb-1">{t('internalExams')} vs {t('externalExams')}</h3>
                  <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">Performance comparison</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold"><span className="w-2 h-2 rounded-full bg-primary" /> {t('internalExams')}</div>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold"><span className="w-2 h-2 rounded-full bg-accent" /> {t('externalExams')}</div>
                </div>
              </div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={examPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
                    <XAxis dataKey="month" tick={{ fontSize: 9, fontWeight: 700 }} axisLine={false} tickLine={false} dy={8} />
                    <YAxis tick={{ fontSize: 9, fontWeight: 700 }} axisLine={false} tickLine={false} dx={-10} domain={[40, 100]} />
                    <Tooltip cursor={{ fill: 'hsl(var(--muted))', opacity: 0.1 }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-md)', fontSize: '10px' }} />
                    <Bar dataKey="internal" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} barSize={24} />
                    <Line type="monotone" dataKey="external" stroke="hsl(var(--accent))" strokeWidth={3} dot={{ r: 4, fill: "hsl(var(--card))", strokeWidth: 2 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-card p-5 rounded-2xl border border-border shadow-sm group">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-black font-heading leading-none mb-1">{t('schoolPerformanceOverview')}</h3>
                  <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">General school health</p>
                </div>
                <div className="flex gap-2">
                  <div className="bg-muted/30 px-2.5 py-1 rounded-lg border border-border text-[8px] font-black uppercase text-secondary group-hover:bg-primary/10 group-hover:text-primary transition-all cursor-pointer">
                    {t('bestPerformingClass')}: Form 4B
                  </div>
                </div>
              </div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={generalTrendData}>
                    <defs>
                      <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
                    <XAxis dataKey="term" tick={{ fontSize: 8, fontWeight: 800 }} axisLine={false} tickLine={false} dy={8} />
                    <YAxis hide />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-md)', fontSize: '10px' }} />
                    <Area type="monotone" dataKey="avg" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorAvg)" />
                    <Area type="monotone" dataKey="pass" stroke="hsl(var(--accent))" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 flex justify-between items-center text-[9px] font-black uppercase tracking-widest italic text-rose-500 bg-rose-500/5 px-3 py-1.5 rounded-lg border border-rose-500/10 animate-pulse">
                <span>⚠️ {t('weakestClass')}: Form 1A (Drop of 4.5%)</span>
                <ChevronRight className="w-2.5 h-2.5" />
              </div>
            </div>
          </div>

          {/* Subjects Table Section */}
          <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden border-t-4 border-t-primary">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-5 border-b border-border/50 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black font-heading mb-0.5">{t('subjectsList')}</h3>
                  <p className="text-xs font-medium text-muted-foreground">{t('currentlyStudying')} ({filteredSubjects.length} {t('subjects')})</p>
                </div>
              </div>
              <div className="relative group w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={t('searchByName')}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-muted/20 border border-border/60 hover:border-primary/30 focus:border-primary focus:ring-2 ring-primary/10 outline-none transition-all placeholder:text-muted-foreground/60 text-xs font-bold"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="sis-table w-full">
                <thead>
                  <tr className="bg-muted/5">
                    <th className="px-6 py-4 text-left text-[9px] uppercase font-black tracking-widest text-foreground/40">{t('subjects')}</th>
                    <th className="px-4 py-4 text-left text-[9px] uppercase font-black tracking-widest text-foreground/40">{t('teacher')}</th>
                    <th className="px-4 py-4 text-left text-[9px] uppercase font-black tracking-widest text-foreground/40">{t('averageGrade')}</th>
                    <th className="px-4 py-4 text-left text-[9px] uppercase font-black tracking-widest text-foreground/40">{t('status')}</th>
                    <th className="px-6 py-4 text-right text-[9px] uppercase font-black tracking-widest text-foreground/40">{t('actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  {filteredSubjects.map((s) => (
                    <tr key={s.id} className="hover:bg-primary/5 transition-all group">
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl drop-shadow-sm group-hover:scale-110 transition-transform duration-300">{s.icon}</span>
                          <div>
                            <p className="text-xs font-black text-foreground group-hover:text-primary transition-colors">{s.name}</p>
                            <p className="text-[9px] font-bold text-muted-foreground uppercase">{s.dept}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-xs font-bold text-muted-foreground/80">{s.teacher}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 w-20 h-2 bg-muted rounded-full overflow-hidden shadow-inner ring-1 ring-border/20">
                            <div
                              className="h-full bg-gradient-to-r from-primary/60 to-primary transition-all duration-1000 shadow-[0_0_8px_hsl(var(--primary)/0.4)]"
                              style={{ width: `${s.avgGrade}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-black text-primary">{s.avgGrade}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm ${s.pass >= 90 ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'}`}>
                          {s.pass}% {t('pass')}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        <button className="p-2 rounded-lg hover:bg-white hover:shadow text-muted-foreground hover:text-primary transition-all active:scale-95 border border-transparent hover:border-border">
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredSubjects.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-muted-foreground font-bold italic opacity-30 text-sm">
                        {t('noResults')}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 📋 RIGHT COLUMN: Status & Schedule */}
        <div className="xl:col-span-1 flex flex-col gap-4">

          {/* Latest Exam Status Widget */}
          <div className="bg-card p-4 rounded-3xl border border-border shadow-sm flex flex-col gap-4 overflow-hidden relative group hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between relative z-10">
              <div>
                <h3 className="text-base font-black font-heading leading-tight">{t('latestExamStatus')}</h3>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5">Real-time progress</p>
              </div>
              <div className="p-2 rounded-xl bg-orange-500/10 text-orange-500 group-hover:rotate-12 transition-transform">
                <FileText className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              {latestExams.map((exam, i) => (
                <div key={i} className="flex flex-col gap-1.5 relative">
                  <div className="flex justify-between items-end">
                    <p className="text-xs font-bold text-foreground leading-none">{exam.name}</p>
                    <span className={`text-[9px] font-black uppercase ${exam.color === 'bg-emerald-500' ? 'text-emerald-500' : exam.color === 'bg-amber-500' ? 'text-amber-500' : 'text-muted-foreground'}`}>{exam.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden shadow-inner">
                    <div className={`h-full ${exam.color} rounded-full`} style={{ width: `${exam.progress}%` }} />
                  </div>
                  <div className="flex justify-between items-center text-[9px] font-semibold">
                    <span className="text-muted-foreground">{exam.status}</span>
                    <span className={exam.reports === 'Released' ? 'text-emerald-500' : 'text-amber-500 tracking-wider uppercase'}>{exam.reports}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:scale-110 group-hover:rotate-[15deg] transition-all duration-700">
              <ClipboardCheck className="w-32 h-32 rotate-12" />
            </div>
          </div>

          {/* Upcoming Exams List - Dark Sleek Card */}
          <div className="bg-foreground text-background p-5 rounded-3xl shadow-lg relative overflow-hidden group">
            <div className="flex items-start justify-between relative z-10 mb-4">
              <div>
                <h3 className="text-base font-black font-heading leading-tight text-white">{t('upcomingExams')}</h3>
                <p className="text-[10px] text-white/50 font-bold uppercase tracking-wider mt-0.5">Next 30 days</p>
              </div>
              <div className="p-2 rounded-xl bg-white/10 text-white group-hover:bg-white/20 transition-colors">
                <Calendar className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-2 relative z-10">
              {upcomingExams.map((ue, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex flex-col gap-2 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-black text-white">{ue.name}</p>
                    <span className="text-[9px] font-black uppercase tracking-widest bg-white/20 text-white px-2 py-1 rounded-md">{ue.countdown}</span>
                  </div>
                  <div className="flex justify-between items-center text-white/60">
                    <span className="text-[10px] font-semibold flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {ue.date}</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider">{ue.classes}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl group-hover:bg-accent/30 transition-colors duration-500 pointer-events-none" />
          </div>

          {/* Timetable Snapshot - Timeline Style */}
          <div className="bg-card p-5 rounded-3xl border border-border shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-black font-heading leading-none">{t('timetableSnapshot')}</h3>
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-primary" />
              </div>
            </div>

            <div className="flex flex-col relative before:absolute before:inset-y-3 before:left-[17px] before:w-[2px] before:bg-border my-1">
              {timetableSnapshot.map((item, i) => {
                const isNow = i === 1; // Highlight the second item as 'Now'
                return (
                  <div key={i} className="flex gap-4 py-2.5 relative group hover:bg-muted/30 rounded-2xl px-2 transition-colors cursor-pointer">
                    {/* Timeline Dot */}
                    <div className={`mt-1.5 w-[14px] h-[14px] rounded-full border-[3px] border-card flex-shrink-0 relative z-10 shadow-sm transition-transform group-hover:scale-125 ${isNow ? 'bg-primary ring-2 ring-primary/20 animate-pulse' : 'bg-muted-foreground/30'}`} />

                    <div className="flex-1 flex flex-col gap-0.5">
                      <div className="flex justify-between items-start">
                        <p className={`text-xs font-black ${isNow ? 'text-primary' : 'text-foreground'}`}>{item.subject}</p>
                        <div className="text-right">
                          <p className={`text-[10px] font-black ${isNow ? 'text-foreground' : 'text-muted-foreground'} tracking-wider`}>{item.period.split(' - ')[0]}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-[10px] font-semibold text-muted-foreground">{item.teacher}</p>
                        <span className="w-1 h-1 rounded-full bg-border" />
                        <p className={`text-[8px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded ${isNow ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>{item.room}</p>
                        {isNow && <span className="ml-auto text-[8px] font-black uppercase text-primary/70 tracking-widest animate-pulse">Now</span>}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <button className="mt-1 w-full py-2.5 flex items-center justify-center gap-1.5 text-[10px] font-black tracking-widest uppercase text-muted-foreground hover:text-primary bg-muted/30 hover:bg-primary/5 rounded-xl transition-colors border border-transparent hover:border-primary/10">
              {t('viewFullTimetable')} <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


