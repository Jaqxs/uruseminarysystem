import { useState } from "react";
import { BookOpen, Users, Award, BarChart2, Clock, Plus, Search, Download, ChevronRight, MoreVertical, Filter, Star, Zap, GraduationCap, Map } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Cell } from "recharts";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useLanguage } from "../context/LanguageContext";

export default function Academics() {
  const { t, language } = useLanguage();

  const initialSubjects = [
    { name: t('hisabati'), teacher: "Mwl. John Kamau", students: 285, avgGrade: 72, pass: 88, icon: "📐", dept: t('scienceDept') },
    { name: t('kiingereza'), teacher: "Mwl. Grace Mwamba", students: 485, avgGrade: 78, pass: 92, icon: "📖", dept: t('languagesDept') },
    { name: t('kiswahiliSomo'), teacher: "Mwl. Amina Juma", students: 485, avgGrade: 82, pass: 95, icon: "✍️", dept: t('languagesDept') },
    { name: t('scienceLabel'), teacher: "Mwl. David Osei", students: 320, avgGrade: 68, pass: 81, icon: "🔬", dept: t('scienceDept') },
    { name: t('historia'), teacher: "Mwl. Fatuma Ali", students: 240, avgGrade: 74, pass: 89, icon: "🏛️", dept: t('artsDept') },
    { name: t('geographyLabel'), teacher: "Mwl. Baraka Shayo", students: 240, avgGrade: 76, pass: 90, icon: "🌍", dept: t('artsDept') },
    { name: t('fizikia'), teacher: "Mwl. Hassan Mrisho", students: 160, avgGrade: 65, pass: 78, icon: "⚛️", dept: t('scienceDept') },
    { name: t('chemistryLabel'), teacher: "Mwl. Rehema Paul", students: 160, avgGrade: 67, pass: 80, icon: "🧪", dept: t('scienceDept') },
    { name: t('baiolojia'), teacher: "Mwl. Neema Grace", students: 200, avgGrade: 71, pass: 86, icon: "🧬", dept: t('scienceDept') },
    { name: t('ict'), teacher: "Mwl. Amos Tarimo", students: 485, avgGrade: 80, pass: 93, icon: "💻", dept: t('scienceDept') },
  ];

  const termPerformance = [
    { subject: t('hisabati'), term1: 68, term2: 72, target: 80 },
    { subject: t('kiingereza'), term1: 75, term2: 78, target: 85 },
    { subject: t('scienceLabel'), term1: 63, term2: 68, target: 75 },
    { subject: t('historia'), term1: 71, term2: 74, target: 80 },
    { subject: "ICT", term1: 77, term2: 80, target: 90 },
  ];

  const radarData = [
    { subject: t('hisabati'), A: 72, fullMark: 100 },
    { subject: t('languagesDept'), A: 80, fullMark: 100 },
    { subject: t('scienceLabel'), A: 68, fullMark: 100 },
    { subject: t('artsDept'), A: 75, fullMark: 100 },
    { subject: t('sportsDept'), A: 85, fullMark: 100 },
    { subject: "ICT", A: 80, fullMark: 100 },
  ];

  const topPerformers = [
    { rank: 1, name: "Zainab Omar", class: "Form 4B", gpa: 4.0, avg: "96.2%", medal: "🥇" },
    { rank: 2, name: "Amina Hassan", class: "Form 4A", gpa: 3.8, avg: "91.4%", medal: "🥈" },
    { rank: 3, name: "Fatuma Ali", class: "Form 2A", gpa: 3.9, avg: "93.1%", medal: "🥉" },
    { rank: 4, name: "Grace Ndugu", class: "Form 2C", gpa: 3.5, avg: "86.8%", medal: "🏅" },
  ];

  const [subjects, setSubjects] = useState(initialSubjects);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: "", teacher: "", icon: "📚", dept: t('scienceDept') });

  const filtered = subjects.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.teacher.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubjects(prev => [{ ...newSubject as any, students: 0, avgGrade: 0, pass: 0 } as any, ...prev]);
    toast.success(`${t('subjectLabel')} ${newSubject.name} ${t('wasDownloaded')}`);
    setIsAddOpen(false);
    setNewSubject({ name: "", teacher: "", icon: "📚", dept: t('scienceDept') });
  };

  const handleDownload = () => {
    toast.promise(new Promise(resolve => setTimeout(resolve, 1500)), {
      loading: t('preparingCertificate'),
      success: t('certificateDownloaded'),
      error: t('failedToDownloadCertificate')
    });
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: BookOpen, label: t('subjects'), value: subjects.length, sub: t('teachingNow'), gradient: "bg-gradient-card-blue" },
          { icon: Users, label: t('teachersCount'), value: "42", sub: t('avgOnePerEach'), gradient: "bg-gradient-card-green" },
          { icon: Award, label: t('averageGPA'), value: "3.2", sub: `${t('targetIs')} 3.5`, gradient: "bg-gradient-card-amber" },
          { icon: BarChart2, label: t('passRate'), value: "88.4%", sub: `+3% ${t('thisYear')}`, gradient: "bg-gradient-card-purple" },
        ].map((s, i) => (
          <div key={i} onClick={() => toast.info(`${t('loadingReport')} ${s.label.toLowerCase()}...`)} className="stat-card hover:shadow-xl transition-all cursor-pointer group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.gradient} mb-3 group-hover:scale-110 transition-transform shadow-sm`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold font-heading text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Overview */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
            <div>
              <h3 className="text-lg font-bold font-heading text-foreground">{t('subjectPerformanceCard')}</h3>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{t('termComparison')}</p>
            </div>
            <div className="flex px-1 py-1 rounded-lg bg-background border border-border">
              <button className="px-3 py-1.5 rounded-md bg-muted text-[9px] font-bold uppercase shadow-sm">{t('barChartLabel')}</button>
              <button className="px-3 py-1.5 rounded-md text-[9px] font-bold uppercase text-muted-foreground hover:bg-muted/50 transition-colors">{t('lineChartLabel')}</button>
            </div>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={termPerformance} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
                <XAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: 600, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} dy={10} />
                <YAxis tick={{ fontSize: 10, fontWeight: 600, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} dx={-10} domain={[0, 100]} />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--muted))', opacity: 0.1 }}
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                />
                <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase' }} />
                <Bar dataKey="term1" name={t('term1')} fill="hsl(var(--primary) / 0.2)" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="term2" name={t('term2')} fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Analysis */}
        <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-muted/20">
            <h3 className="text-lg font-bold font-heading text-foreground">{t('academicHarmony')}</h3>
            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{t('deptDistribution')}</p>
          </div>
          <div className="p-6 h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fontWeight: 700, fill: "hsl(var(--muted-foreground))" }} />
                <Radar name={t('averageRadar')} dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.1} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="px-6 pb-6">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
              <Zap className="w-4 h-4 text-amber-500" />
              <p className="text-[10px] font-bold text-foreground">{t('sportsAttention')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
          <div className="flex items-center gap-2">
            <Map className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-lg font-bold font-heading text-foreground">{t('subjectsList')}</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background border border-border text-xs text-muted-foreground shadow-sm">
              <Search className="w-3.5 h-3.5" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t('search')} className="bg-transparent outline-none w-24" />
            </div>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <button className="p-2 rounded-lg bg-gradient-primary text-white shadow-md hover:shadow-lg transition-all active:scale-95 leading-none">
                  <Plus className="w-4 h-4" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-md rounded-3xl p-8 text-foreground shadow-2xl border-border/50">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold font-heading">{t('addSubject')}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddSubmit} className="space-y-4 mt-6">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-muted-foreground mb-1 block tracking-wider">{t('fullName')}</label>
                    <Input required value={newSubject.name} onChange={e => setNewSubject({ ...newSubject, name: e.target.value })} className="rounded-xl border-border bg-background focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-muted-foreground mb-1 block tracking-wider">{t('teacher')}</label>
                    <Input required value={newSubject.teacher} onChange={e => setNewSubject({ ...newSubject, teacher: e.target.value })} className="rounded-xl border-border bg-background focus:ring-primary/20" />
                  </div>
                  <DialogFooter className="mt-8">
                    <button type="submit" className="w-full py-3 rounded-2xl bg-gradient-primary text-white font-bold shadow-md hover:shadow-lg transition-all active:scale-95">{t('save')}</button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="sis-table">
            <thead>
              <tr>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{t('subjects')}</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{t('department')}</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{t('teacher')}</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{t('average')}</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{t('status')}</th>
                <th className="px-6 py-4 text-right text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl group-hover:scale-110 transition-transform">{s.icon}</span>
                      <span className="text-sm font-bold text-foreground">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="badge-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">{s.dept}</span></td>
                  <td className="px-6 py-4"><span className="text-sm font-medium text-muted-foreground/80">{s.teacher}</span></td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden shadow-inner">
                        <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${s.avgGrade}%` }} />
                      </div>
                      <span className="text-[10px] font-bold text-primary">{s.avgGrade}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className={`badge-${s.pass >= 90 ? 'success' : 'warning'} px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider`}>{s.pass}% {t('pass')}</span></td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-all active:scale-90"><MoreVertical className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Performers */}
      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
          <h3 className="text-lg font-bold font-heading text-foreground">{t('topPerformers')}</h3>
          <button onClick={handleDownload} className="p-2 rounded-lg bg-background border border-border text-muted-foreground hover:bg-muted transition-all active:scale-95 shadow-sm">
            <Download className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
          {topPerformers.map((p, i) => (
            <div key={i} className="p-5 rounded-2xl border border-border/60 bg-muted/10 hover:bg-card hover:shadow-xl transition-all group cursor-pointer">
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center text-white font-bold text-base shadow-md group-hover:scale-110 transition-transform">
                  {p.name.split(" ").map(n => n[0]).join("")}
                </div>
                <span className="text-2xl drop-shadow-sm">{p.medal}</span>
              </div>
              <p className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">{p.name}</p>
              <p className="text-[10px] font-bold text-muted-foreground/60 mb-5 tracking-wide uppercase">{p.class}</p>
              <div className="flex items-center justify-between pt-4 border-t border-border/30">
                <div className="text-center">
                  <p className="text-[9px] font-bold uppercase text-muted-foreground/50 tracking-widest mb-0.5">GPA</p>
                  <p className="text-xs font-bold text-primary">{p.gpa}</p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] font-bold uppercase text-muted-foreground/50 tracking-widest mb-0.5">AVG</p>
                  <p className="text-xs font-bold text-accent">{p.avg}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

