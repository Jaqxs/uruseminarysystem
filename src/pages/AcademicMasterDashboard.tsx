import {
    GraduationCap, TrendingUp, Calendar, FileText,
    Users, BookOpen, Clock, Activity, Target,
    Award, CheckCircle2, AlertCircle, Book, PieChart as PieChartIcon,
    Search, Filter, ChevronRight, LayoutDashboard, UserCheck, ArrowRight
} from "lucide-react";
import {
    AreaChart, Area, BarChart, Bar, XAxis, YAxis,
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
    CartesianGrid
} from "recharts";
import { toast } from "sonner";
import { useLanguage } from "../context/LanguageContext";

/**
 * Enhanced KPI Card for Academic Master
 */
function AcademicKPI({ icon: Icon, label, value, color, trend, trendValue }: any) {
    return (
        <div className="bg-card border border-border/50 p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
            <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-black/5`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
                <p className="text-3xl font-black font-heading tracking-tight mb-1">{value}</p>
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{label}</p>
            </div>
            {trend && (
                <div className={`mt-4 flex items-center gap-1.5 text-[10px] font-black ${trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                    <div className={`px-2 py-0.5 rounded-full ${trend === 'up' ? 'bg-success/10' : 'bg-destructive/10'}`}>
                        {trend === 'up' ? '↑' : '↓'} {trendValue}
                    </div>
                    <span className="text-muted-foreground/60 font-medium lowercase">vs last term</span>
                </div>
            )}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
    );
}

export default function AcademicMasterDashboard() {
    const { t } = useLanguage();

    const gradeDist = [
        { name: 'Division I', value: 45, color: '#3b82f6' },
        { name: 'Division II', value: 82, color: '#8b5cf6' },
        { name: 'Division III', value: 124, color: '#10b981' },
        { name: 'Division IV', value: 36, color: '#f59e0b' },
        { name: 'Division 0', value: 12, color: '#ef4444' }
    ];

    const subPerformance = [
        { subject: 'Physics', avg: 82, target: 85 },
        { subject: 'Mathematics', avg: 74, target: 80 },
        { subject: 'Chemistry', avg: 79, target: 82 },
        { subject: 'Biology', avg: 88, target: 85 },
        { subject: 'Geography', avg: 91, target: 88 }
    ];

    const timelineData = [
        { month: 'Jan', avg: 68 },
        { month: 'Feb', avg: 72 },
        { month: 'Mar', avg: 70 },
        { month: 'Apr', avg: 78 },
        { month: 'May', avg: 82 },
        { month: 'Jun', avg: 85 }
    ];

    return (
        <div className="space-y-8 animate-fade-in pr-2 pb-12">
            {/* 🎓 Academic Banner */}
            <div className="relative rounded-[3rem] overflow-hidden p-10 text-white shadow-2xl shadow-primary/20"
                style={{ background: "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)" }}>
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                    <GraduationCap className="w-full h-full -rotate-12 translate-x-1/4 translate-y-1/4" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest italic">
                            <Award className="w-3.5 h-3.5" /> Academic Excellence Focus
                        </div>
                        <h1 className="text-4xl font-black font-heading tracking-tight leading-tight">
                            Academic Master's Control Room
                        </h1>
                        <p className="text-white/80 font-medium max-w-xl">
                            Oversight of curriculum implementation, teacher performance, and student academic growth metrics.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={() => toast.info("Preparing reports...")} className="px-6 py-3 rounded-2xl bg-white text-primary text-sm font-black shadow-lg hover:scale-105 transition-all">
                            Generate Reports
                        </button>
                        <button className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all">
                            <Calendar className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <AcademicKPI
                    label="Average Enrollment"
                    value="1,248"
                    color="bg-indigo-500"
                    icon={Users}
                    trend="up"
                    trendValue="+4%"
                />
                <AcademicKPI
                    label="Academic Pass Rate"
                    value="88.4%"
                    color="bg-emerald-500"
                    icon={CheckCircle2}
                    trend="up"
                    trendValue="+2.1%"
                />
                <AcademicKPI
                    label="Staff Attendance"
                    value="98.2%"
                    color="bg-blue-500"
                    icon={UserCheck}
                    trend="down"
                    trendValue="-0.5%"
                />
                <AcademicKPI
                    label="Active Subjects"
                    value="18"
                    color="bg-amber-500"
                    icon={Book}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-card border border-border/50 rounded-[3rem] p-8 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-black font-heading">Performance Evolution</h3>
                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mt-1">Growth Trend 2024</p>
                        </div>
                    </div>
                    <div className="h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={timelineData}>
                                <defs>
                                    <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700 }} />
                                <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                                <Area type="monotone" dataKey="avg" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorAvg)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-card border border-border/50 rounded-[3rem] p-8 shadow-sm flex flex-col items-center">
                    <h3 className="text-xl font-black font-heading w-full text-center">Division Distribution</h3>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1 mb-6">Latest Exam Session</p>

                    <div className="relative w-full h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={gradeDist}
                                    innerRadius={70}
                                    outerRadius={95}
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {gradeDist.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <p className="text-4xl font-black font-heading leading-none">299</p>
                            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter">Total Results</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-6 w-full">
                        {gradeDist.map((item, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-[10px] font-black uppercase text-muted-foreground">{item.name}</span>
                                </div>
                                <span className="text-sm font-black">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="bg-card border border-border/50 rounded-[3rem] p-8 shadow-sm">
                    <h3 className="text-xl font-black font-heading">Subject Leaderboard</h3>
                    <p className="text-xs text-muted-foreground font-bold italic mb-8">Top active subjects performance</p>

                    <div className="space-y-6 mt-4">
                        {subPerformance.map((sub, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-black text-xs">
                                            {sub.subject[0]}
                                        </div>
                                        <span className="font-black text-sm">{sub.subject}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs font-bold text-muted-foreground">Target: {sub.target}%</span>
                                        <span className="text-sm font-black text-primary">{sub.avg}%</span>
                                    </div>
                                </div>
                                <div className="h-2 w-full bg-muted/40 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full" style={{ width: `${sub.avg}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-indigo-50 border border-indigo-100/50 rounded-[2.5rem] p-6 text-indigo-900 group">
                        <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6">
                            <Activity className="w-5 h-5 text-indigo-500" />
                        </div>
                        <h4 className="font-black font-heading text-lg mb-2">Curriculum Progress</h4>
                        <p className="text-xs font-medium text-indigo-900/60 mb-6 leading-relaxed">
                            Form 4 Syllabus coverage is at 78%. Recommend boosting Science revision hours.
                        </p>
                        <div className="mt-auto pt-4 border-t border-indigo-200/30 flex items-center justify-between font-black uppercase tracking-widest text-[10px]">
                            <span className="opacity-40 italic">Reviewing...</span>
                            <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:scale-110 transition-all">
                                <ChevronRight className="w-4 h-4 text-indigo-500" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-rose-50 border border-rose-100/50 rounded-[2.5rem] p-6 text-rose-900">
                        <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6">
                            <AlertCircle className="w-5 h-5 text-rose-500" />
                        </div>
                        <h4 className="font-black font-heading text-lg mb-2">Academic Risk</h4>
                        <p className="text-xs font-medium text-rose-900/60 mb-6 leading-relaxed">
                            12 students in Form 2C are consistently scoring below Division III threshold.
                        </p>
                        <div className="mt-auto pt-4 border-t border-rose-200/30">
                            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-rose-500 hover:gap-3 transition-all">
                                View Defaulters <ArrowRight className="w-3 h-3" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-card border border-border/50 rounded-[2.5rem] p-6 col-span-1 md:col-span-2 flex items-center justify-between group cursor-pointer hover:bg-primary hover:text-white transition-all duration-500">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-white group-hover:text-primary transition-colors">
                                <Target className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-black font-heading text-lg">Exam Readiness Assessment</h4>
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Prepare for NECTA 2024</p>
                            </div>
                        </div>
                        <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" />
                    </div>
                </div>
            </div>
        </div>
    );
}
