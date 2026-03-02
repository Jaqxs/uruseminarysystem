import { useState } from "react";
import { Download, TrendingUp, Award, Users, Search, Filter, MoreVertical, Star, Target, Zap, ChevronRight, FileText, Info, GraduationCap } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, Cell } from "recharts";
import { toast } from "sonner";
import { useLanguage } from "../context/LanguageContext";

export default function Grades() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");

  const classPerf = [
    { class: "Form 1A", avg: 74, color: "hsl(var(--primary))" },
    { class: "Form 1B", avg: 71, color: "hsl(var(--primary))" },
    { class: "Form 2A", avg: 78, color: "hsl(var(--accent))" },
    { class: "Form 2B", avg: 75, color: "hsl(var(--primary))" },
    { class: "Form 3A", avg: 80, color: "hsl(var(--accent))" },
    { class: "Form 3B", avg: 77, color: "hsl(var(--primary))" },
    { class: "Form 4A", avg: 82, color: "hsl(var(--warning))" },
    { class: "Form 4B", avg: 85, color: "hsl(var(--warning))" },
  ];

  const gradeTrend = [
    { term: `${t('term1')} '23`, avg: 68, high: 92, low: 45 },
    { term: `${t('term2')} '23`, avg: 71, high: 94, low: 48 },
    { term: `Term 3 '23`, avg: 74, high: 95, low: 52 },
    { term: `${t('term1')} '24`, avg: 72, high: 91, low: 50 },
    { term: `${t('term2')} '24`, avg: 76, high: 96, low: 55 },
    { term: `Term 3 '24`, avg: 79, high: 98, low: 58 },
  ];

  const stats = [
    { icon: Award, label: t('average'), value: "76.8%", sub: `+4.2% ${t('thisMonth')}`, gradient: "bg-gradient-card-blue" },
    { icon: TrendingUp, label: t('passRateLabel'), value: "88.4%", sub: t('nectaStandardized'), gradient: "bg-gradient-card-green" },
    { icon: Users, label: t('students'), value: "1,248", sub: t('examTaken'), gradient: "bg-gradient-card-purple" },
    { icon: FileText, label: t('reportsLabel'), value: "92%", sub: t('issuedLabel'), gradient: "bg-gradient-card-amber" },
  ];

  const handleDownloadAll = () => {
    toast.promise(new Promise(resolve => setTimeout(resolve, 2000)), {
      loading: t('preparingAllReports'),
      success: t('reportsDownloaded'),
      error: t('failedToDownloadReports')
    });
  };

  const handleDownloadClass = (cls: string) => {
    toast.success(`${t('classReportDownloaded')} ${cls} ${t('wasDownloaded')}`);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} onClick={() => toast.info(`${t('loadingReport')} ${s.label.toLowerCase()}...`)} className="stat-card hover:shadow-xl transition-all cursor-pointer group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.gradient} mb-3 group-hover:scale-110 transition-transform shadow-sm`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold font-heading text-foreground">{s.value}</p>
            <div className="flex flex-col mt-1">
              <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
              <p className="text-[10px] text-primary/70 font-bold">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden h-[400px]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
            <div>
              <h3 className="text-lg font-bold font-heading text-foreground">{t('classPerformance')}</h3>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{t('avgGradeReport')}</p>
            </div>
            <button onClick={() => toast.info(t('moreFilters'))} className="p-2 rounded-lg bg-background border border-border hover:bg-muted text-muted-foreground transition-all">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={classPerf}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
                <XAxis dataKey="class" tick={{ fontSize: 11, fontWeight: 600, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} dy={10} />
                <YAxis tick={{ fontSize: 11, fontWeight: 600, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} dx={-10} domain={[0, 100]} />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--muted))', opacity: 0.1 }}
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                />
                <Bar dataKey="avg" radius={[4, 4, 4, 4]} barSize={24}>
                  {classPerf.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trend Analysis Chart */}
        <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden h-[400px]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
            <div>
              <h3 className="text-lg font-bold font-heading text-foreground">{t('gradeTrends')}</h3>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{t('performanceTrend')}</p>
            </div>
            <div className="flex items-center gap-2 text-success">
              <TrendingUp className="w-4 h-4" /> <span className="text-[10px] font-bold">+5.4%</span>
            </div>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={gradeTrend}>
                <defs>
                  <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
                <XAxis dataKey="term" tick={{ fontSize: 10, fontWeight: 600, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} dy={10} />
                <YAxis tick={{ fontSize: 11, fontWeight: 600, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} dx={-10} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                />
                <Area type="monotone" dataKey="avg" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorAvg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Reports Panel */}
      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
          <div>
            <h3 className="text-lg font-bold font-heading text-foreground">{t('reportCards')}</h3>
            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{t('clickToDownloadClass')}</p>
          </div>
          <button onClick={handleDownloadAll} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-primary text-white text-sm font-semibold shadow-md-blue hover:shadow-lg-blue transition-all active:scale-95 leading-none">
            <Download className="w-4 h-4" /> {t('downloadAll')}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
          {["Form 1A", "Form 1B", "Form 2A", "Form 2B", "Form 3A", "Form 3B", "Form 4A", "Form 4B"].map((cls) => (
            <div
              key={cls}
              onClick={() => handleDownloadClass(cls)}
              className="group p-4 rounded-xl border border-border/60 bg-muted/10 hover:bg-card hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-110 transition-transform ${cls.startsWith("Form 4") ? "bg-amber-500" : cls.startsWith("Form 3") ? "bg-accent" : "bg-primary"
                  }`}>
                  {cls.split(" ")[1]}
                </div>
                <Download className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-all" />
              </div>
              <p className="text-sm font-bold text-foreground">{cls}</p>
              <p className="text-[10px] text-muted-foreground mb-4 font-semibold uppercase tracking-wider">{t('term2')}</p>

              <div className="flex items-center justify-between pt-3 border-t border-border/30">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="text-[10px] font-bold text-foreground">84.2%</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground">
                  <Users className="w-3 h-3" /> 42
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🇹🇿 NECTA Standardization System Section */}
      <div className="rounded-2xl border border-border bg-card shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 sm:p-8 border-b border-border/50 gap-4 bg-gradient-to-r from-muted/30 to-background relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Flag_of_Tanzania.svg/1200px-Flag_of_Tanzania.svg.png" alt="Tanzania Flag" className="w-5 h-3.5 rounded-sm object-cover shadow-sm" />
              <h3 className="text-xl font-bold font-heading text-foreground">NECTA Standardized Grading Context</h3>
            </div>
            <p className="text-xs text-muted-foreground font-semibold">Tanzanian standard scale currently applied to all subject calculations.</p>
          </div>
          <div className="flex items-center p-1 bg-muted/50 rounded-xl border border-border/50 w-full sm:w-auto">
            <button className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-xs font-bold transition-all ${search === "alevel" ? "text-muted-foreground hover:text-foreground" : "bg-card text-primary shadow-sm ring-1 ring-border"}`} onClick={() => setSearch("olevel")}>
              O-Level (CSEE)
            </button>
            <button className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-xs font-bold transition-all ${search === "olevel" ? "text-muted-foreground hover:text-foreground" : search === "alevel" ? "bg-card text-primary shadow-sm ring-1 ring-border" : "text-muted-foreground hover:text-foreground"}`} onClick={() => setSearch("alevel")}>
              A-Level (ACSEE)
            </button>
          </div>
        </div>

        <div className="bg-background">
          {search !== "alevel" ? (
            // O-Level Grading Visualizer
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
              {/* O-Level Subject Grades */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                  <Target className="w-4 h-4 text-primary" /> Subject Grades & Points
                </h4>
                <div className="space-y-3">
                  {[
                    { grade: "A", range: "75 – 100", pts: 1, label: "Excellent", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
                    { grade: "B", range: "65 – 74", pts: 2, label: "Very Good", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                    { grade: "C", range: "45 – 64", pts: 3, label: "Good", color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
                    { grade: "D", range: "30 – 44", pts: 4, label: "Satisfactory", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
                    { grade: "F", range: "0 – 29", pts: 5, label: "Fail", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20" },
                  ].map((g, i) => (
                    <div key={i} className={`flex items-center justify-between p-3.5 rounded-xl border ${g.border} ${g.bg} transition-all hover:scale-[1.02]`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-lg bg-background flex items-center justify-center font-black text-lg ${g.color} shadow-sm`}>{g.grade}</div>
                        <div>
                          <p className="text-[10px] font-bold text-foreground/60 uppercase tracking-widest leading-none mb-1">Score Range</p>
                          <p className="text-sm font-bold text-foreground">{g.range}%</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-black ${g.color}`}>{g.pts} Point{g.pts > 1 && 's'}</p>
                        <p className="text-[10px] uppercase font-bold text-foreground/60 tracking-wider">({g.label})</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* O-Level Division Criteria */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                  <Award className="w-4 h-4 text-accent" /> Division Classification (Best 7)
                </h4>
                <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/30 border-b border-border">
                        <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Division</th>
                        <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Points Range</th>
                        <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50 text-sm font-medium">
                      {[
                        { div: "Division I", pts: "7 – 17 Points", status: "Outstanding", color: "text-emerald-500", badge: "bg-emerald-500/10 border-emerald-500/20" },
                        { div: "Division II", pts: "18 – 21 Points", status: "Pass", color: "text-blue-500", badge: "bg-blue-500/10 border-blue-500/20" },
                        { div: "Division III", pts: "22 – 25 Points", status: "Pass", color: "text-primary", badge: "bg-primary/10 border-primary/20" },
                        { div: "Division IV", pts: "26 – 33 Points", status: "Pass", color: "text-amber-500", badge: "bg-amber-500/10 border-amber-500/20" },
                        { div: "Division 0", pts: "34 – 35 Points", status: "Fail", color: "text-rose-500", badge: "bg-rose-500/10 border-rose-500/20" },
                      ].map((d, i) => (
                        <tr key={i} className="hover:bg-muted/10 transition-colors">
                          <td className="px-5 py-3.5 font-bold text-foreground">{d.div}</td>
                          <td className="px-5 py-3.5 font-bold text-muted-foreground">{d.pts}</td>
                          <td className="px-5 py-3.5 text-right">
                            <span className={`px-2.5 py-1 rounded border text-[9px] font-bold uppercase tracking-wider ${d.badge} ${d.color}`}>
                              {d.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="p-4 bg-muted/20 border-t border-border flex items-start gap-3">
                    <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                    <p className="text-[10px] text-muted-foreground font-semibold leading-relaxed">
                      For O-Level (CSEE), divisions are determined by the sum of points from the <strong className="text-foreground">seven (7) best-performed subjects</strong>, where having fewer points results in a higher division.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // A-Level Grading Visualizer
            <div className="p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
              <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground mb-6">
                <Target className="w-4 h-4 text-primary" /> Principal Subject Grades & Values
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[
                  { grade: "A", range: "80 – 100", pts: 5, label: "Excellent", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
                  { grade: "B", range: "70 – 79", pts: 4, label: "Very Good", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                  { grade: "C", range: "60 – 69", pts: 3, label: "Good", color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
                  { grade: "D", range: "50 – 59", pts: 2, label: "Average", color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
                  { grade: "E", range: "40 – 49", pts: 1, label: "Satisfactory", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
                  { grade: "S", range: "35 – 39", pts: 0.5, label: "Subsidiary", color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" },
                  { grade: "F", range: "0 – 34", pts: 0, label: "Fail", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20" },
                ].map((g, i) => (
                  <div key={i} className={`flex flex-col p-4 rounded-xl border ${g.border} ${g.bg} transition-all hover:-translate-y-1 hover:shadow-lg`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className={`w-10 h-10 rounded-xl bg-background flex items-center justify-center font-black text-2xl ${g.color} shadow-sm`}>{g.grade}</div>
                      <div className="text-right">
                        <p className={`text-base font-black ${g.color}`}>{g.pts}</p>
                        <p className="text-[9px] uppercase font-bold text-foreground/60 tracking-wider">Points</p>
                      </div>
                    </div>
                    <div className="flex items-end justify-between mt-auto pt-2 border-t border-black/5 dark:border-white/5">
                      <div>
                        <p className="text-[9px] font-bold text-foreground/60 uppercase tracking-widest leading-none mb-1">Score</p>
                        <p className="text-xs font-black text-foreground">{g.range}%</p>
                      </div>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">{g.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-5 rounded-xl bg-primary/5 border border-primary/20 flex flex-col sm:flex-row items-center gap-4 shadow-sm relative overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 relative z-10 text-primary">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="relative z-10 text-center sm:text-left">
                  <h4 className="text-sm font-bold text-foreground mb-1">University Admission Calculation</h4>
                  <p className="text-xs text-muted-foreground font-medium leading-relaxed max-w-3xl">
                    A-Level (ACSEE) points are calculated on a weighted spectrum where <strong className="text-foreground">more points are better</strong> (unlike O-Level). Scoring an A grants 5 points, combining principal passes for university entrance requirements via NACTE/TCU standard systems.
                  </p>
                </div>
                <Award className="w-48 h-48 absolute -right-6 -bottom-10 text-primary opacity-[0.03] rotate-[-15deg] pointer-events-none" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-primary text-white flex items-center justify-between gap-4 shadow-lg relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-white/20 w-fit text-[9px] font-bold uppercase tracking-wider">
              <Zap className="w-3 h-3" /> {t('insightLabel')}
            </div>
            <h3 className="text-xl font-bold font-heading">{t('recordBreakerBody')}</h3>
            <p className="text-xs opacity-90">{t('recordBreakerSub')}</p>
          </div>
          <Award className="w-24 h-24 opacity-20 absolute -right-4 -bottom-4 hidden sm:block pointer-events-none rotate-[-10deg]" />
        </div>

        <div className="p-4 rounded-2xl border border-border bg-card shadow-card flex flex-col justify-center gap-2 relative z-10">
          <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider mb-2">{t('actions')}</p>
          <button onClick={() => toast.info(t('preparingCertificate'))} className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted transition-all group">
            <span className="text-xs font-bold text-foreground">{t('printCertificates')}</span>
            <ChevronRight className="w-3 h-3 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </button>
          <button onClick={() => toast.info("Scheduling meeting...")} className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted transition-all group">
            <span className="text-xs font-bold text-foreground">{t('scheduleMeeting')}</span>
            <ChevronRight className="w-3 h-3 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div >
  );
}

