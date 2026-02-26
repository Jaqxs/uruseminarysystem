import { useState } from "react";
import { Download, TrendingUp, Award, Users, Search, Filter, MoreVertical, Star, Target, Zap, ChevronRight, FileText } from "lucide-react";
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

      {/* Quick Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-primary text-white flex items-center justify-between gap-4 shadow-lg">
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-white/20 w-fit text-[9px] font-bold uppercase tracking-wider">
              <Zap className="w-3 h-3" /> {t('insightLabel')}
            </div>
            <h3 className="text-xl font-bold font-heading">{t('recordBreakerBody')}</h3>
            <p className="text-xs opacity-90">{t('recordBreakerSub')}</p>
          </div>
          <Award className="w-12 h-12 opacity-20 hidden sm:block" />
        </div>

        <div className="p-4 rounded-2xl border border-border bg-card shadow-card flex flex-col justify-center gap-2">
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
    </div>
  );
}

