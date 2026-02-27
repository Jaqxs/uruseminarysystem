import { useState } from "react";
import { Users, GraduationCap, DollarSign, ClipboardCheck, TrendingUp, Briefcase, AlertTriangle, BookOpen, ArrowUpRight, ArrowDownRight, Search, Plus, Send, Download, ExternalLink, Calendar, Bell, Clock } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { toast } from "sonner";

import { useLanguage } from "../context/LanguageContext";

function StatCard({ icon: Icon, label, value, sub, gradient, change, positive }: any) {
  const { t, language } = useLanguage();
  return (
    <div onClick={() => toast.info(`${t('loadingReport')} ${label.toLowerCase()}...`)} className="group relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 hover:shadow-2xl hover:shadow-primary/5 transition-all hover:-translate-y-1 cursor-pointer">
      <div className="flex items-start justify-between mb-6">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${gradient} shadow-lg shadow-primary/10 group-hover:scale-110 transition-transform`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full ${positive ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
          {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </div>
      </div>
      <p className="text-3xl font-black font-heading text-foreground tracking-tight mb-1">{value}</p>
      <p className="text-xs font-bold text-foreground/70 uppercase tracking-widest">{label}</p>
      <p className="text-[11px] font-medium text-muted-foreground/60 mt-1">{sub}</p>

      {/* Decorative background element */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
    </div>
  );
}

export default function Dashboard() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const attendanceData = [
    { day: t('Monday'), present: 420, absent: 32 },
    { day: t('Tuesday'), present: 405, absent: 47 },
    { day: t('Wednesday'), present: 430, absent: 22 },
    { day: t('Thursday'), present: 418, absent: 34 },
    { day: t('Friday'), present: 422, absent: 30 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 12500000, target: 14000000 },
    { month: "Feb", revenue: 13200000, target: 14000000 },
    { month: "Mar", revenue: 14800000, target: 14000000 },
    { month: "Apr", revenue: 11900000, target: 14000000 },
    { month: t('may'), revenue: 15200000, target: 14000000 },
    { month: "Jun", revenue: 16100000, target: 14000000 },
  ];

  const gradeDistribution = [
    { name: "A", value: 28, color: "hsl(var(--primary))" },
    { name: "B", value: 35, color: "hsl(var(--accent))" },
    { name: "C", value: 22, color: "hsl(var(--warning))" },
    { name: "D", value: 10, color: "hsl(var(--muted-foreground))" },
    { name: "F", value: 5, color: "hsl(var(--destructive))" },
  ];

  const performanceTrend = [
    { term: "Term 1 '23", avg: 68 },
    { term: "Term 2 '23", avg: 71 },
    { term: "Term 3 '23", avg: 74 },
    { term: "Term 1 '24", avg: 72 },
    { term: "Term 2 '24", avg: 76 },
    { term: "Term 3 '24", avg: 79 },
  ];

  const recentStudents = [
    { id: "BS-2024-001", name: "Amina Hassan Mwangi", class: "Form 4A", status: "active", avatar: "AH" },
    { id: "BS-2024-002", name: "Juma Salim Kiprotich", class: "Form 3B", status: "active", avatar: "JS" },
    { id: "BS-2024-003", name: "Fatuma Ali Odhiambo", class: "Form 2A", status: "active", avatar: "FA" },
    { id: "BS-2024-004", name: "David Mwenda Kamau", class: "Form 1C", status: "new", avatar: "DM" },
    { id: "BS-2024-005", name: "Zainab Omar Njoroge", class: "Form 4B", status: "active", avatar: "ZO" },
  ];

  const pendingFees = [
    { student: "Kalila Mgeni", class: "Form 3A", amount: "TSh 450,000", days: 15 },
    { student: "Baraka Ndugu", class: "Form 2B", amount: "TSh 320,000", days: 8 },
    { student: "Neema Juma", class: "Form 4C", amount: "TSh 280,000", days: 22 },
    { student: "Hassan Ally", class: "Form 1A", amount: "TSh 180,000", days: 5 },
  ];

  const sendReminder = (student: string) => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1200)), {
      loading: `${t('sendingReminder')} ${student}...`,
      success: t('reminderSent'),
      error: t('failedToSendMessage'),
    });
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Premium Welcome Banner */}
      <div className="relative rounded-[3rem] overflow-hidden p-10 md:p-12 text-white shadow-2xl shadow-primary/20" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-15 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-white/40 ring-1 ring-white/10"
              style={{
                width: `${100 + i * 60}px`,
                height: `${100 + i * 60}px`,
                top: `${-40 + i * 10}px`,
                right: `${-40 + i * 15}px`,
                transform: `rotate(${i * 10}deg)`
              }} />
          ))}
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              {t('systemWorking')}
            </div>

            <div>
              <p className="text-white/80 font-bold mb-1 ml-1 text-lg">{t('greeting')}</p>
              <h1 className="text-2xl md:text-3xl font-black font-heading tracking-tight leading-tight">Bendel Schools <span className="text-white/60 font-medium text-xl md:text-2xl">Management System</span></h1>
            </div>

            <p className="text-white/80 font-medium max-w-xl text-lg leading-relaxed">
              {t('welcomeHub')}{' '}
              <span className="text-white font-black underline underline-offset-4 decoration-white/30">
                {new Date().toLocaleDateString(language === 'sw' ? "sw-TZ" : "en-US", { weekday: "long", day: "numeric", month: "long" })}
              </span>.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <button onClick={() => toast.info(t('registerStudent'))} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-primary text-sm font-black shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95">
                <Plus className="w-4 h-4" /> {t('registerStudent')}
              </button>
              <button onClick={() => toast.promise(new Promise(r => setTimeout(r, 1000)), { loading: t('preparingReport'), success: t('reportTodayDownloaded'), error: "Error" })} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-white text-sm font-black hover:bg-white/30 transition-all">
                {t('dailyReport')} <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:w-[400px]">
            {[
              { label: t('attendance'), value: "93%", icon: ClipboardCheck },
              { label: t('academicPass'), value: "88%", icon: TrendingUp },
              { label: t('revenueMonth'), value: "16.1M", icon: DollarSign },
              { label: t('teachers'), value: "89", icon: Briefcase },
            ].map((item, i) => (
              <div key={i} onClick={() => toast.info(`${t('loadingReport')} ${item.label.toLowerCase()}...`)} className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-[2rem] hover:bg-white/15 transition-colors cursor-pointer group">
                <item.icon className="w-5 h-5 mb-3 text-white/60 group-hover:scale-110 transition-transform" />
                <p className="text-2xl font-black">{item.value}</p>
                <p className="text-[10px] uppercase font-bold text-white/60 tracking-widest">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Search & Actions */}
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1 w-full relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            className="w-full h-16 pl-14 pr-6 rounded-3xl border border-border bg-card shadow-sm text-foreground placeholder:text-muted-foreground focus:ring-4 focus:ring-primary/10 outline-none transition-all text-lg font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => toast.info(language === 'sw' ? "Una taarifa 3 mpya kutoka kwa walimu." : "You have 3 new notifications from teachers.")} className="h-16 w-16 flex items-center justify-center rounded-3xl bg-card border border-border shadow-sm text-foreground hover:bg-muted transition-all relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-4 right-4 w-3 h-3 rounded-full bg-destructive border-2 border-card" />
          </button>
          <button onClick={() => toast.success(t('settingsTitle'))} className="h-16 px-8 rounded-3xl bg-gradient-primary text-white font-black shadow-lg shadow-primary/20 hover:shadow-xl transition-all">
            {language === 'sw' ? 'Hatua za Haraka' : 'Quick Actions'}
          </button>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard icon={GraduationCap} label={t('totalStudents')} value="1,248" sub={language === 'sw' ? "Sajili mpya 45 mwezi huu" : "45 new registrations this month"} gradient="bg-gradient-card-blue" change="+12" positive />
        <StatCard icon={Briefcase} label={t('staff')} value="156" sub={language === 'sw' ? "Waalimu 120, Watawala 36" : "120 Teachers, 36 Staff"} gradient="bg-gradient-card-purple" change="+2" positive />
        <StatCard icon={DollarSign} label={language === 'sw' ? "Mapato ya Leo" : "Fee Collection Today"} value="TSh 1.2M" sub={language === 'sw' ? "Kupitia Njia 3" : "Across 3 channels"} gradient="bg-gradient-card-green" change="+15%" positive />
        <StatCard icon={AlertTriangle} label={t('outstandingFees')} value="TSh 4.2M" sub={language === 'sw' ? "Wanafunzi 67" : "67 students"} gradient="bg-gradient-card-rose" change="-3" positive={false} />
        <StatCard icon={ClipboardCheck} label={t('attendance')} value="93.2%" sub={language === 'sw' ? "Wanafunzi & Wafanyakazi" : "Students & Staff"} gradient="bg-gradient-card-amber" change="+2.1%" positive />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Teacher Performance */}
        <div className="chart-wrapper p-10 rounded-[2.5rem]">
          <div className="mb-10">
            <h3 className="text-xl font-black font-heading text-foreground">{language === 'sw' ? 'Utendaji wa Walimu' : 'Teacher Performance'}</h3>
            <p className="text-sm text-muted-foreground font-medium">{language === 'sw' ? 'Wastani wa ufundishaji' : 'Teaching effectiveness average'}</p>
          </div>
          <div className="space-y-6">
            {[
              { name: "Grace Mwamba", rating: 98, subject: "Mathematics" },
              { name: "John Doe", rating: 92, subject: "Physics" },
              { name: "Sarah Smith", rating: 85, subject: "Biology" },
            ].map((teacher, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>{teacher.name} ({teacher.subject})</span>
                  <span className="text-primary">{teacher.rating}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${teacher.rating}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Attendance Summary */}
        <div className="chart-wrapper p-10 rounded-[2.5rem]">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black font-heading text-foreground">{t('attendanceOverview')}</h3>
              <p className="text-sm text-muted-foreground font-medium">{language === 'sw' ? 'Mahudhurio ya wanafunzi na walimu' : 'Student & Staff attendance summary'}</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)' }} />
              <Legend iconType="circle" />
              <Bar dataKey="present" name="Students" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="absent" name="Staff" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Academic Performance Trend */}
        <div className="chart-wrapper p-10 rounded-[2.5rem]">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black font-heading text-foreground">{language === 'sw' ? 'Mwenendo wa Kitaaluma' : 'Academic Performance Trend'}</h3>
              <p className="text-sm text-muted-foreground font-medium">{language === 'sw' ? 'Mchanganuo wa ufaulu kwa mwaka' : 'Yearly performance trend analysis'}</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={performanceTrend}>
              <defs>
                <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
              <XAxis dataKey="term" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)' }} />
              <Area type="monotone" dataKey="avg" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorAvg)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Exams */}
        <div className="rounded-[2.5rem] border border-border bg-card shadow-sm overflow-hidden p-2">
          <div className="flex items-center justify-between px-8 py-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black font-heading text-foreground">{language === 'sw' ? 'Mitihani Inayokuja' : 'Upcoming Exams'}</h3>
            </div>
            <span className="px-3 py-1 rounded-lg bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest">
              Term 2
            </span>
          </div>
          <div className="space-y-1">
            {[
              { name: "Midterm Assessment", date: "March 15, 2024", classes: "All Classes", type: "Internal" },
              { name: "Mock Exam", date: "April 02, 2024", classes: "Form 4, Standard 7", type: "Standardized" },
              { name: "End of Term", date: "May 20, 2024", classes: "All Classes", type: "Internal" },
            ].map((exam, i) => (
              <div key={i} className="flex items-center gap-4 px-8 py-4 hover:bg-muted/40 transition-all rounded-[1.5rem] group mx-2">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-foreground/40 font-bold text-xs">
                  {exam.date.split(" ")[1].replace(",", "")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-foreground truncate">{exam.name}</p>
                  <p className="text-xs font-bold text-muted-foreground/60">{exam.classes}</p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-black uppercase text-accent tracking-tighter">{exam.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className="rounded-[2.5rem] border border-border bg-card shadow-sm overflow-hidden p-2">
          <div className="flex items-center justify-between px-8 py-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive">
                <Bell className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black font-heading text-foreground">{language === 'sw' ? 'Tahadhari za Mfumo' : 'System Alerts'}</h3>
            </div>
          </div>
          <div className="px-4 pb-4 space-y-3">
            {[
              { msg: "High outstanding balance in Form 4A", type: "risk" },
              { msg: "3 teachers haven't entered midterm marks", type: "warning" },
              { msg: "System backup completed successfully", type: "info" },
            ].map((alert, i) => (
              <div key={i} className={`p-4 rounded-2xl flex items-center gap-3 ${alert.type === 'risk' ? 'bg-destructive/10 text-destructive' : alert.type === 'warning' ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'}`}>
                <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                <p className="text-xs font-bold leading-tight">{alert.msg}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="rounded-[2.5rem] border border-border bg-card shadow-sm overflow-hidden p-2">
          <div className="flex items-center justify-between px-8 py-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black font-heading text-foreground">{t('recentActivity')}</h3>
            </div>
          </div>
          <div className="space-y-1">
            {[
              { action: "Updated Form 4A timetable", user: "Admin", time: "2 hrs ago" },
              { action: "Approved fees for 15 students", user: "Principal", time: "4 hrs ago" },
              { action: "Sent meeting notice to parents", user: "Secretary", time: "Yesterday" },
            ].map((act, i) => (
              <div key={i} className="flex items-center gap-4 px-8 py-4 hover:bg-muted/40 transition-all rounded-[1.5rem] group mx-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-foreground truncate">{act.action}</p>
                  <p className="text-xs font-bold text-muted-foreground/60">{act.user} • {act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Students Table */}
        <div className="rounded-[2.5rem] border border-border bg-card shadow-sm overflow-hidden p-2">
          <div className="flex items-center justify-between px-8 py-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black font-heading text-foreground">{t('newStudents')}</h3>
            </div>
            <button onClick={() => toast.info(`${t('loadingReport')} ${t('students').toLowerCase()}...`)} className="text-[10px] font-black uppercase text-primary hover:underline flex items-center gap-1">
              {t('viewAll')} <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-1">
            {recentStudents.map(s => (
              <div key={s.id} className="flex items-center gap-4 px-8 py-4 hover:bg-muted/40 transition-all rounded-[1.5rem] group mx-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center text-white text-sm font-black shadow-lg shadow-primary/10 group-hover:scale-105 transition-transform">
                  {s.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-foreground truncate">{s.name}</p>
                  <p className="text-xs font-bold text-muted-foreground/60">{s.id} • {s.class}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${s.status === "new" ? "bg-warning/10 text-warning" : "bg-success/10 text-success"}`}>
                    {s.status === "new" ? t('newOnes') : t('active')}
                  </span>
                  <p className="text-[10px] font-bold text-muted-foreground/40">{language === 'sw' ? 'Leo' : 'Today'}, 9:24 AM</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Fees Table */}
        <div className="rounded-[2.5rem] border border-border bg-card shadow-sm overflow-hidden p-2">
          <div className="flex items-center justify-between px-8 py-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black font-heading text-foreground">{t('pendingFees')}</h3>
            </div>
            <span className="px-3 py-1 rounded-lg bg-destructive/10 text-destructive text-[10px] font-black uppercase tracking-widest">
              67 {t('studentsCountLabel')}
            </span>
          </div>
          <div className="space-y-1">
            {pendingFees.map((f, i) => (
              <div key={i} className="flex items-center gap-4 px-8 py-4 hover:bg-muted/40 transition-all rounded-[1.5rem] group mx-2">
                <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive text-sm font-black">
                  {f.student.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-foreground truncate">{f.student}</p>
                  <p className="text-xs font-bold text-muted-foreground/60">{f.class} • {language === 'sw' ? 'Deni tangu siku' : 'Debt since days'} {f.days}</p>
                </div>
                <div className="text-right space-y-2">
                  <p className="text-sm font-black text-destructive">{f.amount}</p>
                  <button
                    onClick={() => sendReminder(f.student)}
                    className="flex items-center gap-1.5 ml-auto px-3 py-1.5 rounded-xl bg-primary/10 text-primary text-[10px] font-black uppercase hover:bg-primary hover:text-white transition-all"
                  >
                    <Send className="w-3 h-3" /> {t('reminder')}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-4 p-6 rounded-[2rem] bg-muted/30 border border-border/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{language === 'sw' ? 'Jumla ya Madeni' : 'Total Debt'}</span>
              <span className="text-lg font-black text-destructive">TSh 4,218,500</span>
            </div>
            <div className="w-full h-2 bg-muted/60 rounded-full overflow-hidden">
              <div className="h-full bg-destructive w-[65%] rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

