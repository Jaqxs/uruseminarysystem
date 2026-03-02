import {
  GraduationCap, DollarSign, Briefcase, AlertTriangle,
  ClipboardCheck, TrendingUp, Calendar, UserMinus,
  ArrowUpRight, ArrowDownRight, ArrowRight, ExternalLink,
  Users, BookOpen, Clock, FileText, LayoutDashboard, UserCheck
} from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { toast } from "sonner";
import { useLanguage } from "../context/LanguageContext";

import { useNavigate } from "react-router-dom";

/**
 * Enhanced KPI Card matching the "Previous Design" + specific detailed requirement
 */
function DashboardCard({
  icon: Icon,
  label,
  value,
  gradient,
  change,
  positive,
  subDetails,
  path,
  children
}: any) {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div
      onClick={() => path ? navigate(path) : toast.info(`${t('loadingReport')} ${label.toLowerCase()}...`)}
      className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-5 hover:shadow-xl hover:shadow-primary/5 transition-all hover:-translate-y-1 cursor-pointer flex flex-col h-full active:scale-[0.98]"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${gradient} shadow-lg shadow-primary/10 group-hover:scale-110 transition-transform`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {change && (
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-full ${positive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
              {positive ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
              {change}
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </div>
        )}
      </div>

      <div className="mb-4">
        <p className="text-xl font-black font-heading text-foreground tracking-tight leading-none mb-1 text-ellipsis overflow-hidden">{value}</p>
        <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.1em]">{label}</p>
      </div>

      {subDetails && (
        <div className="space-y-1.5 pt-3 border-t border-border/40 mt-auto text-[9px] font-bold">
          {subDetails.map((detail: any, i: number) => (
            <div key={i} className="flex justify-between">
              <span className="text-muted-foreground/60">{detail.label}</span>
              <span className="text-foreground/80">{detail.value}</span>
            </div>
          ))}
        </div>
      )}

      {children}

      <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/20 transition-colors" />
    </div>
  );
}

export default function Dashboard() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Mock data for graphs
  const attendanceData = [
    { day: t('Monday'), present: 420 },
    { day: t('Tuesday'), present: 405 },
    { day: t('Wednesday'), present: 430 },
    { day: t('Thursday'), present: 418 },
    { day: t('Friday'), present: 422 },
  ];

  const staffData = [
    { name: t('teachStaff'), value: 120, color: 'hsl(var(--primary))' },
    { name: t('nonTeachStaff'), value: 36, color: 'hsl(var(--accent))' }
  ];

  const studentData = [
    { name: t('maleStudents'), value: 640, color: 'hsl(var(--sky-500))' },
    { name: t('femaleStudents'), value: 608, color: 'hsl(var(--rose-400))' }
  ];

  const performanceSpark = [
    { val: 65 }, { val: 72 }, { val: 68 }, { val: 74 }, { val: 82 }, { val: 76 }
  ];

  return (
    <div className="space-y-6 animate-fade-in pr-2 pb-8">
      {/* 🏛️ Administrative Welcome Banner */}
      <div className="relative rounded-[2.5rem] overflow-hidden p-8 text-white shadow-xl shadow-primary/10" style={{ background: "var(--gradient-hero)" }}>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-black font-heading tracking-tight leading-tight flex flex-col md:flex-row md:items-baseline md:gap-3">
              Bendel Memorial
              <span className="text-white/40 font-medium text-lg md:border-l md:border-white/20 md:pl-3">Secondary School</span>
            </h1>
            <p className="text-white/70 font-bold text-sm">{t('greeting')}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full lg:w-[320px]">
            <div
              onClick={() => navigate("/attendance")}
              className="bg-white/10 backdrop-blur-md border border-white/5 p-4 rounded-3xl group transition-all hover:bg-white/20 cursor-pointer active:scale-95"
            >
              <p className="text-2xl font-black leading-none mb-1.5">93.2%</p>
              <p className="text-[9px] uppercase font-bold text-white/50 tracking-widest leading-none flex items-center justify-between">
                {t('attendance')}
                <ArrowRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </p>
            </div>
            <div
              onClick={() => navigate("/academics")}
              className="bg-white/10 backdrop-blur-md border border-white/5 p-4 rounded-3xl group transition-all hover:bg-white/20 cursor-pointer active:scale-95"
            >
              <p className="text-2xl font-black leading-none mb-1.5">88.4%</p>
              <p className="text-[9px] uppercase font-bold text-white/50 tracking-widest leading-none flex items-center justify-between">
                {t('academicPass')}
                <ArrowRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 📊 Section 1: Financial Performance */}
      <section className="space-y-4">
        <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/30 flex items-center gap-2 px-2">
          <DollarSign className="w-3.5 h-3.5" /> {t('financialPerformance')}
        </h2>

        {/* Collection Progress Bar */}
        <div
          onClick={() => navigate("/finance")}
          className="bg-card p-6 rounded-3xl border border-border/50 shadow-sm relative group cursor-pointer hover:border-primary/30 transition-all active:scale-[0.99]"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-1">{t('termTarget')}</p>
              <p className="text-2xl font-black font-heading tracking-tight">TSh 250,500,000</p>
            </div>
            <div className="flex gap-8">
              <div className="text-right">
                <p className="text-lg font-black text-success leading-none">TSh 142,500,000</p>
                <p className="text-[9px] font-bold text-muted-foreground uppercase">{t('collectedSoFar')}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-foreground/60 leading-none">TSh 108,000,000</p>
                <p className="text-[9px] font-bold text-muted-foreground uppercase">{t('remaining')}</p>
              </div>
            </div>
          </div>
          <div className="w-full h-4 bg-muted/30 rounded-full overflow-hidden flex ring-4 ring-background">
            <div className="h-full bg-gradient-to-r from-primary to-primary-light w-[57%] shadow-[0_0_15px_rgba(59,130,246,0.3)] animate-pulse-slow" />
          </div>
          <div className="flex items-center justify-between mt-3">
            <p className="text-[10px] font-bold text-muted-foreground italic flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3 text-primary" /> {t('financialGoalTip')}
            </p>
            <p className="text-[10px] font-black uppercase text-primary tracking-widest flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {t('viewAll')} <ArrowRight className="w-3 h-3" />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard
            label={t('totalRevenueLabel')}
            value="TSh 142,500,000"
            icon={DollarSign}
            gradient="bg-gradient-card-blue"
            change="+12.2%"
            positive
            path="/finance"
            subDetails={[
              { label: t('todayRevenue'), value: "TSh 1,200,500" },
              { label: t('termRevenue'), value: "TSh 45,800,000" },
              { label: t('yearToDate'), value: "TSh 142,500,000" }
            ]}
          />
          <DashboardCard
            label={t('outstandingDebtLabel')}
            value="TSh 4,200,000"
            icon={AlertTriangle}
            gradient="bg-gradient-card-rose"
            path="/finance"
            subDetails={[
              { label: t('studentsOwing'), value: `67 ${t('students')}` },
              { label: t('overdueStatus'), value: t('highRisk') },
              { label: t('agingIndicator'), value: t('thirtyPlusDays') }
            ]}
          />
          <DashboardCard
            label={t('pendingFees')}
            value="TSh 8,100,000"
            icon={Clock}
            gradient="bg-gradient-card-amber"
            path="/finance"
            subDetails={[
              { label: t('pendingInvoices'), value: "124 Issues" },
              { label: t('paymentProgress'), value: "82%" }
            ]}
          />
          <DashboardCard
            label={t('expenditureLabel')}
            value="TSh 12,400,000"
            icon={TrendingUp}
            gradient="bg-gradient-card-green"
            path="/analytics"
            subDetails={[
              { label: t('monthToDate'), value: "TSh 2,800,000" },
              { label: t('budgetVsActual'), value: "- TSh 500k" }
            ]}
          />
        </div>
      </section>

      {/* 🔄 Circular Overviews: HR & Student Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Human Resource Circular Overview */}
        <section className="space-y-4">
          <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/30 flex items-center gap-2 px-2">
            <Users className="w-3.5 h-3.5 text-indigo-500" /> {t('hrOverview')}
          </h2>
          <div
            onClick={() => navigate("/staff")}
            className="bg-card p-6 rounded-3xl border border-border/50 shadow-sm flex flex-col md:flex-row items-center gap-8 relative group hover:shadow-xl transition-all h-full cursor-pointer hover:border-primary/30 active:scale-[0.99]"
          >
            <div className="relative w-40 h-40 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={staffData} innerRadius={55} outerRadius={75} paddingAngle={5} dataKey="value" stroke="none">
                    {staffData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-2xl font-black font-heading leading-none">156</p>
                <p className="text-[8px] font-bold text-muted-foreground uppercase">{t('totalStaff')}</p>
              </div>
            </div>

            <div className="flex-1 w-full space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {staffData.map((item, i) => (
                  <div key={i} className="bg-muted/30 p-3 rounded-2xl border border-border/20">
                    <p className="text-xl font-black leading-none mb-1">{item.value}</p>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-3 border-t border-border/40">
                <div className="flex justify-between items-center bg-violet-500/5 p-2 rounded-xl border border-violet-500/10">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-violet-500" />
                    <span className="text-[10px] font-bold text-foreground/70">{t('staffLeaveLabel')}</span>
                  </div>
                  <span className="text-[10px] font-black text-violet-600">8 {t('members')}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-black uppercase text-primary tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  {t('viewAllStaff')} <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Student Overview Circular Overview */}
        <section className="space-y-4">
          <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/30 flex items-center gap-2 px-2">
            <GraduationCap className="w-3.5 h-3.5 text-sky-500" /> {t('studentOverview')}
          </h2>
          <div
            onClick={() => navigate("/students")}
            className="bg-card p-6 rounded-3xl border border-border/50 shadow-sm flex flex-col md:flex-row items-center gap-8 relative group hover:shadow-xl transition-all h-full cursor-pointer hover:border-primary/30 active:scale-[0.99]"
          >
            <div className="relative w-40 h-40 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={studentData} innerRadius={55} outerRadius={75} paddingAngle={2} dataKey="value" stroke="none">
                    {studentData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-2xl font-black font-heading leading-none">1,248</p>
                <p className="text-[8px] font-bold text-muted-foreground uppercase">{t('totalStudents')}</p>
              </div>
            </div>

            <div className="flex-1 w-full space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {studentData.map((item, i) => (
                  <div key={i} className="bg-muted/30 p-3 rounded-2xl border border-border/20">
                    <p className="text-xl font-black leading-none mb-1">{item.value}</p>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-3 border-t border-border/40">
                <div className="flex justify-between items-center bg-rose-500/5 p-2 rounded-xl border border-rose-500/10">
                  <div className="flex items-center gap-2">
                    <UserMinus className="w-3.5 h-3.5 text-rose-500" />
                    <span className="text-[10px] font-bold text-foreground/70">{t('studentLeaveLabel')}</span>
                  </div>
                  <span className="text-[10px] font-black text-rose-600">24 {t('students')}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-black uppercase text-primary tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  {t('viewAllStudents')} <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 📈 Section 4: Academic Performance */}
      <section className="space-y-4">
        <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/30 flex items-center gap-2 px-2">
          <TrendingUp className="w-3.5 h-3.5 text-primary" /> {t('academicPerformance')}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <DashboardCard
              label={t('resultsSummaryTitle')}
              value="76.4%"
              icon={FileText}
              gradient="bg-primary"
              path="/academics"
              subDetails={[
                { label: t('overallAverage'), value: "B+" },
                { label: t('latestExam'), value: "Midterm 2024" }
              ]}
            >
              <div className="h-24 mt-4 opacity-70 group-hover:opacity-100 transition-opacity">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceSpark}>
                    <Area type="monotone" dataKey="val" stroke="currentColor" fill="currentColor" fillOpacity={0.1} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>
          </div>

          <div
            onClick={() => navigate("/analytics")}
            className="lg:col-span-2 bg-card p-6 rounded-3xl border border-border/50 shadow-sm flex flex-col justify-center relative overflow-hidden group cursor-pointer hover:border-primary/30 transition-all active:scale-[0.99]"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-6">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40">{t('performanceIndicator')}</p>
                <p className="text-2xl font-black font-heading tracking-tight leading-tight">{t('passFailDistribution')}</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="flex items-center gap-2 text-[10px] font-black"><span className="w-2.5 h-2.5 rounded-full bg-success" /> {t('passRate')}: 88%</span>
                  <span className="flex items-center gap-2 text-[10px] font-black"><span className="w-2.5 h-2.5 rounded-full bg-destructive" /> {t('failRate')}: 12%</span>
                </div>
              </div>
              <div className="bg-muted/30 p-4 rounded-3xl border border-border/20 flex gap-6">
                <div className="text-center">
                  <p className="text-2xl font-black text-foreground/80">Div II</p>
                  <p className="text-[8px] font-bold uppercase text-muted-foreground">{t('schoolGPA')}</p>
                </div>
                <div className="w-[1px] bg-border/20" />
                <div className="text-center">
                  <p className="text-2xl font-black text-primary">Div I</p>
                  <p className="text-[8px] font-bold uppercase text-muted-foreground">{t('targetLabel')}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex w-full h-8 rounded-full overflow-hidden bg-muted/20 ring-4 ring-background shadow-inner">
                <div className="h-full bg-gradient-to-r from-success/70 to-success w-[88%] shadow-[0_0_20px_rgba(34,197,94,0.3)] flex items-center justify-center text-[10px] font-black text-white">88% {t('successLabel')}</div>
                <div className="h-full bg-gradient-to-r from-destructive to-destructive/80 w-[12%] flex items-center justify-center text-[10px] font-black text-white/50">12%</div>
              </div>
              <div className="flex justify-between items-center text-[11px] font-black text-muted-foreground italic">
                <span className="flex items-center gap-2 text-success"><ArrowUpRight className="w-4 h-4" /> {t('trendingUp')}</span>
                <span className="flex items-center gap-1.5">{t('statusLabel')}: {t('verified')} <ExternalLink className="w-3 h-3" /></span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
