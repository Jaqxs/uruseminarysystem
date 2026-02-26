import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { TrendingUp, Users, GraduationCap, BookOpen, Download, Filter, Calendar, ChevronDown, Share2, Printer, Map, PieChart as PieIcon, ArrowUpRight, ArrowDownRight, Target, Info } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "../context/LanguageContext";

export default function Analytics() {
    const { t, language } = useLanguage();
    const [timeRange, setTimeRange] = useState("6 Months");

    const performanceData = [
        { month: "Jan", math: 65, science: 72, lulu: 68 },
        { month: "Feb", math: 68, science: 75, lulu: 71 },
        { month: "Mar", math: 72, science: 78, lulu: 74 },
        { month: "Apr", math: 70, science: 74, lulu: 72 },
        { month: "May", math: 75, science: 82, lulu: 78 },
        { month: "Jun", math: 82, science: 85, lulu: 81 },
    ].map(d => ({
        ...d,
        month: language === 'sw' && d.month === 'May' ? 'Mei' : d.month
    }));

    const handleExport = () => {
        toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
            loading: t('preparingReport'),
            success: t('reportDownloaded'),
            error: t('failedDownloadReport'),
        });
    };

    const enrollmentTrend = [
        { month: "Jan", count: 1150 },
        { month: "Feb", count: 1180 },
        { month: "Mar", count: 1210 },
        { month: "Apr", count: 1205 },
        { month: "May", count: 1230 },
        { month: "Jun", count: 1248 },
    ].map(d => ({
        ...d,
        month: language === 'sw' && d.month === 'May' ? 'Mei' : d.month
    }));

    const genderDistribution = [
        { name: t('maleCap'), value: 612, color: "#3b82f6" },
        { name: t('femaleCap'), value: 636, color: "#ec4899" },
    ];

    const gradeAnalysis = [
        { subject: t('hisabati'), avg: 72, target: 80, trend: "+4%" },
        { subject: t('scienceLabel'), avg: 78, target: 85, trend: "+2%" },
        { subject: t('kiswahiliSomo'), avg: 85, target: 90, trend: "+1%" },
        { subject: t('kiingereza'), avg: 81, target: 85, trend: "+3%" },
        { subject: t('historia'), avg: 68, target: 75, trend: "-1%" },
    ];

    return (
        <div className="space-y-6 animate-fade-in pb-12">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: TrendingUp, label: t('performanceRate'), value: "88.2%", sub: `+3.1% ${t('thisSeason')}`, gradient: "bg-gradient-card-blue" },
                    { icon: Users, label: t('attendanceRate'), value: "94.5%", sub: t('present'), gradient: "bg-gradient-card-green" },
                    { icon: GraduationCap, label: t('schoolGPA'), value: "3.81", sub: t('outOfFive'), gradient: "bg-gradient-card-rose" },
                    { icon: Target, label: t('targetT1'), value: "92%", sub: t('termProgress'), gradient: "bg-gradient-card-purple" },
                ].map((stat, i) => (
                    <div key={i} onClick={() => toast.info(`${t('loadingReport')} ${stat.label.toLowerCase()}...`)} className="stat-card hover:shadow-xl transition-all cursor-pointer group">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.gradient} mb-3 group-hover:scale-110 transition-transform`}>
                            <stat.icon className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-2xl font-bold font-heading text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Main Performance Chart */}
                <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
                        <div>
                            <h3 className="text-lg font-bold font-heading text-foreground">{t('academicTrend')}</h3>
                            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{t('subjectPerformance')}</p>
                        </div>
                        <button onClick={handleExport} className="p-2 rounded-lg bg-background border border-border hover:bg-muted text-muted-foreground transition-all">
                            <Download className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="p-6 h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={performanceData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
                                <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 600, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} dy={10} />
                                <YAxis tick={{ fontSize: 11, fontWeight: 600, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} domain={[60, 90]} dx={-10} />
                                <Tooltip
                                    contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px" }}
                                />
                                <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '10px', fontWeight: 700 }} />
                                <Line type="monotone" dataKey="math" name={t('hisabati')} stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 0 }} />
                                <Line type="monotone" dataKey="science" name={t('scienceLabel')} stroke="hsl(var(--accent))" strokeWidth={3} dot={{ r: 0 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Enrollment Chart */}
                <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
                    <div className="px-6 py-4 border-b border-border bg-muted/20 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold font-heading text-foreground">{t('enrollmentNumbers')}</h3>
                            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{t('enrollmentTrendSub')}</p>
                        </div>
                        <Users className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="p-6 h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={enrollmentTrend}>
                                <defs>
                                    <linearGradient id="enrollmentGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
                                <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 600, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} dy={10} />
                                <YAxis hide domain={[1100, 1300]} />
                                <Tooltip
                                    contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px" }}
                                />
                                <Area type="monotone" dataKey="count" name={t('students')} stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#enrollmentGradient)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Pie Distribution */}
                <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
                    <div className="px-6 py-4 border-b border-border bg-muted/20 flex items-center gap-2">
                        <PieIcon className="w-5 h-5 text-muted-foreground" />
                        <h3 className="text-lg font-bold font-heading text-foreground">{t('genderDistributionLabel')}</h3>
                    </div>
                    <div className="p-6">
                        <div className="h-[200px] relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={genderDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={8} dataKey="value">
                                        {genderDistribution.map((entry, index) => (
                                            <Cell key={index} fill={entry.color} strokeWidth={0} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px" }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-2xl font-black text-foreground">1,248</span>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase">{t('totalLabel')}</span>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-col gap-2">
                            {genderDistribution.map(g => (
                                <div key={g.name} className="flex items-center justify-between p-3 rounded-xl bg-muted/20">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ background: g.color }} />
                                        <span className="text-xs font-bold text-foreground">{g.name}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-foreground">{g.value}</p>
                                        <p className="text-[9px] text-muted-foreground">{((g.value / 1248) * 100).toFixed(1)}%</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Detailed Analysis */}
                <div className="lg:col-span-2 rounded-2xl border border-border bg-card shadow-card overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
                        <div className="flex items-center gap-2">
                            <Map className="w-5 h-5 text-muted-foreground" />
                            <h3 className="text-lg font-bold font-heading text-foreground">{t('subjectAnalysis')}</h3>
                        </div>
                        <button onClick={() => toast.info(t('openingDetailedAnalysis'))} className="px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-bold text-muted-foreground hover:bg-muted transition-all">{t('details')}</button>
                    </div>
                    <div className="p-6 space-y-4">
                        {gradeAnalysis.map((item, i) => (
                            <div key={i} onClick={() => toast.info(`${t('loadingAnalysisFor')} ${item.subject}...`)} className="group space-y-2 cursor-pointer">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-foreground">{item.subject}</span>
                                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${item.trend.startsWith('+') ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                                            {item.trend}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs font-bold text-primary">{item.avg}%</span>
                                        <span className="text-[9px] font-bold text-muted-foreground uppercase">{t('targetLabel')}: {item.target}%</span>
                                    </div>
                                </div>
                                <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary rounded-full transition-all duration-1000"
                                        style={{ width: `${item.avg}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                        <div className="mt-8 p-6 rounded-2xl bg-foreground text-background flex items-center justify-between shadow-lg">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                    <ArrowUpRight className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-lg font-bold leading-tight">{t('performanceGrown')} 4.2%</p>
                                    <p className="text-xs font-medium opacity-60">{t('comparedToLastTerm')}</p>
                                </div>
                            </div>
                            <button onClick={() => toast.info(t('openingDetailedAnalysis'))} className="px-6 py-2.5 rounded-xl bg-white text-foreground text-[10px] font-black uppercase hover:scale-105 transition-all">
                                {t('seeWhy')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


