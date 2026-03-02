import { useState } from "react";
import {
    FileText, Plus, Search, Filter, MoreVertical,
    ChevronRight, Award, Target, TrendingUp, BarChart,
    Users, Save, Brain, CheckCircle2, AlertCircle, Download, Printer
} from "lucide-react";
import {
    BarChart as RechartsBar, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Legend, Cell, LineChart, Line
} from "recharts";
import { toast } from "sonner";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function Examinations() {
    const { t } = useLanguage();
    const { user } = useAuth();
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState("exams"); // exams, marks, analysis
    const [nectaLevel, setNectaLevel] = useState<"psle" | "csee" | "acsee">("csee");

    const exams = [
        { id: "EX-2024-001", title: "Mid-Term Examination", term: "Term 1", date: "15 Mar 2024", status: "completed", students: 1240, type: "Midterm" },
        { id: "EX-2024-002", title: "Terminal Examination", term: "Term 1", date: "22 May 2024", status: "marking", students: 1240, type: "Terminal" },
        { id: "EX-2024-003", title: "Monthly Mock Test", term: "Term 2", date: "10 Jul 2024", status: "upcoming", students: 1248, type: "Mock" },
    ];

    const classPerformance = [
        { class: "Form 4A", avg: 84, passRate: 95 },
        { class: "Form 4B", avg: 78, passRate: 88 },
        { class: "Form 3A", avg: 72, passRate: 82 },
        { class: "Form 3B", avg: 69, passRate: 78 },
        { class: "Form 2A", avg: 81, passRate: 92 },
    ];

    const handleEnterMarks = (exam: string) => {
        toast.info(`${t('enterMarks')} for ${exam}...`);
    };

    return (
        <div className="space-y-6 animate-fade-in pb-12">
            {/* Header section with Tabs */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black font-heading text-foreground">{t('examTitle')}</h2>
                    <p className="text-sm text-muted-foreground">{t('examSubtitle')}</p>
                </div>
                <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-muted/30 border border-border w-fit backdrop-blur-sm">
                    {["exams", "marks", "analysis"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === tab
                                ? "bg-white text-primary shadow-md translate-y-[-1px]"
                                : "text-muted-foreground hover:bg-white/50"
                                }`}
                        >
                            {tab === 'exams' ? t('exams') : tab === 'marks' ? t('marksEntry') : t('analytics')}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            {activeTab === "exams" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Exam List */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {exams.map((exam) => (
                                <div key={exam.id} className="glass-card p-6 rounded-[2rem] hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-8 -mt-8 group-hover:bg-primary/10 transition-colors" />

                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${exam.status === 'completed' ? 'bg-success/10 text-success' :
                                            exam.status === 'marking' ? 'bg-warning/10 text-warning' :
                                                'bg-blue-500/10 text-blue-500'
                                            }`}>
                                            {exam.status}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-black font-heading text-foreground mb-1">{exam.title}</h3>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-6">{exam.term} • {exam.date}</p>

                                    <div className="flex items-center justify-between pt-4 border-t border-border/30">
                                        <div className="flex items-center gap-4">
                                            <div className="text-center">
                                                <p className="text-[9px] font-bold text-muted-foreground/50 uppercase tracking-widest">Students</p>
                                                <p className="text-sm font-black text-foreground">{exam.students}</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-[9px] font-bold text-muted-foreground/50 uppercase tracking-widest">Type</p>
                                                <p className="text-sm font-black text-primary">{exam.type}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => handleEnterMarks(exam.title)} className="p-2.5 rounded-xl bg-primary text-white shadow-md-blue hover:scale-110 transition-all">
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {['admin', 'director', 'teacher'].includes(user?.role || '') && (
                                <button className="flex flex-col items-center justify-center p-6 rounded-[2rem] border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-muted-foreground group">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-muted mb-3 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                        <Plus className="w-6 h-6" />
                                    </div>
                                    <p className="text-sm font-black uppercase tracking-widest">{t('examSetup')}</p>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Quick Stats Sidebar */}
                    <div className="space-y-6">
                        <div className="glass-card p-6 rounded-[2rem] bg-gradient-to-br from-primary to-primary-dark text-white border-0 shadow-lg-blue">
                            <div className="flex items-center justify-between mb-8">
                                <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-md">
                                    <TrendingUp className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest leading-none">Overall Pass Rate</p>
                                    <p className="text-3xl font-black mt-1">87.5%</p>
                                </div>
                            </div>
                            <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden mb-6">
                                <div className="h-full bg-white transition-all duration-[2s]" style={{ width: "87.5%" }} />
                            </div>
                            <p className="text-xs font-medium text-white/80 leading-relaxed">
                                Exam performance is up by <span className="font-black text-white">4.2%</span> compared to the previous term.
                            </p>
                        </div>

                        <div className="glass-card p-6 rounded-[2rem]">
                            <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Pending Tasks</h4>
                            <div className="space-y-3">
                                {[
                                    { task: "Enter Marks - Form 4A Biology", priority: "High" },
                                    { task: "Approve Terminal Results", priority: "Medium" },
                                    { task: "Schedule Monthly Mock", priority: "Low" },
                                ].map((t, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30 group hover:bg-muted/50 cursor-pointer transition-colors">
                                        <div className={`w-2 h-2 rounded-full ${t.priority === 'High' ? 'bg-rose-500' : t.priority === 'Medium' ? 'bg-amber-500' : 'bg-primary'}`} />
                                        <p className="text-xs font-bold text-foreground flex-1">{t.task}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "marks" && (
                <div className="space-y-6">
                    <div className="glass-card rounded-[2rem] overflow-hidden">
                        <div className="flex flex-col md:flex-row md:items-center justify-between px-8 py-6 border-b border-border bg-muted/20 gap-4">
                            <div>
                                <h3 className="text-lg font-black font-heading text-foreground">{t('marksEntry')}</h3>
                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Grading Scale: A (80+), B (70+), C (60+), D (50+), F (Below 50)</p>
                            </div>
                            <select
                                className="bg-background border border-border rounded-xl px-4 py-2 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none min-w-[140px]"
                                value={nectaLevel}
                                onChange={(e) => setNectaLevel(e.target.value as any)}
                            >
                                <option value="psle">PSLE (Std 7)</option>
                                <option value="csee">FTNA/CSEE (F2/F4)</option>
                                <option value="acsee">ACSEE (F6)</option>
                            </select>
                            <select className="bg-background border border-border rounded-xl px-4 py-2 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none min-w-[140px]">
                                <option>Form 4A</option>
                                <option>Form 4B</option>
                            </select>
                            <button className="px-6 py-2 rounded-xl bg-primary text-white text-[10px] font-black uppercase shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                                Load Students
                            </button>
                        </div>
                    </div>
                    <div className="p-0 overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-muted/10 border-b border-border">
                                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase text-muted-foreground tracking-widest">Student Name</th>
                                    <th className="px-6 py-4 text-center text-[10px] font-black uppercase text-muted-foreground tracking-widest">Score (100)</th>
                                    <th className="px-6 py-4 text-center text-[10px] font-black uppercase text-muted-foreground tracking-widest">Grade</th>
                                    <th className="px-6 py-4 text-center text-[10px] font-black uppercase text-muted-foreground tracking-widest">Remarks</th>
                                    <th className="px-8 py-4 text-right text-[10px] font-black uppercase text-muted-foreground tracking-widest">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { id: 1, name: "Amina Hassan", score: 85 },
                                    { id: 2, name: "Juma Salim", score: 62 },
                                    { id: 3, name: "Fatuma Ali", score: 45 },
                                    { id: 4, name: "David Mwenda", score: 74 },
                                    { id: 5, name: "Zainab Omar", score: 91 },
                                ].map((s) => {
                                    const getGrade = (score: number, level: string) => {
                                        if (level === 'psle') {
                                            if (score >= 81) return { grade: 'A', color: 'text-emerald-500', remark: 'Excellent' };
                                            if (score >= 61) return { grade: 'B', color: 'text-blue-500', remark: 'Very Good' };
                                            if (score >= 41) return { grade: 'C', color: 'text-amber-500', remark: 'Good' };
                                            if (score >= 21) return { grade: 'D', color: 'text-orange-500', remark: 'Satisfactory' };
                                            return { grade: 'E', color: 'text-destructive', remark: 'Fail' };
                                        }
                                        if (level === 'acsee') {
                                            if (score >= 80) return { grade: 'A', color: 'text-emerald-500', remark: 'Excellent' };
                                            if (score >= 70) return { grade: 'B', color: 'text-blue-500', remark: 'Very Good' };
                                            if (score >= 60) return { grade: 'C', color: 'text-blue-400', remark: 'Good' };
                                            if (score >= 50) return { grade: 'D', color: 'text-amber-500', remark: 'Average' };
                                            if (score >= 40) return { grade: 'E', color: 'text-orange-500', remark: 'Satisfactory' };
                                            if (score >= 35) return { grade: 'S', color: 'text-orange-400', remark: 'Subsidiary' };
                                            return { grade: 'F', color: 'text-destructive', remark: 'Fail' };
                                        }
                                        // Default: FTNA/CSEE
                                        if (score >= 75) return { grade: 'A', color: 'text-emerald-500', remark: 'Excellent' };
                                        if (score >= 65) return { grade: 'B', color: 'text-blue-500', remark: 'Very Good' };
                                        if (score >= 45) return { grade: 'C', color: 'text-amber-500', remark: 'Good' };
                                        if (score >= 30) return { grade: 'D', color: 'text-orange-500', remark: 'Satisfactory' };
                                        return { grade: 'F', color: 'text-destructive', remark: 'Fail' };
                                    };
                                    const { grade, color, remark } = getGrade(s.score, nectaLevel);
                                    return (
                                        <tr key={s.id} className="border-b border-border/40 hover:bg-muted/5 transition-colors group">
                                            <td className="px-8 py-4">
                                                <p className="text-sm font-black text-foreground">{s.name}</p>
                                                <p className="text-[10px] font-bold text-muted-foreground">BS-2024-00{s.id}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-center">
                                                    <input
                                                        type="number"
                                                        defaultValue={s.score}
                                                        max="100"
                                                        className="w-16 h-10 rounded-xl bg-muted/40 border border-border/50 text-center text-sm font-black focus:ring-2 focus:ring-primary/20 outline-none"
                                                        onChange={(e) => {
                                                            const val = parseInt(e.target.value);
                                                            if (val > 100) toast.error("Score cannot exceed 100");
                                                        }}
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`text-lg font-black ${color}`}>{grade}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-[10px] font-black uppercase text-muted-foreground bg-muted/30 px-3 py-1 rounded-full">{remark}</span>
                                            </td>
                                            <td className="px-8 py-4 text-right">
                                                <button
                                                    onClick={() => toast.success(`Report Card generated for ${s.name}`)}
                                                    className="p-2.5 rounded-xl bg-muted text-foreground hover:bg-primary hover:text-white transition-all shadow-sm"
                                                    title="Preview Report Card"
                                                >
                                                    <Printer className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-8 border-t border-border bg-muted/5 flex justify-between items-center">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider italic">
                            * All marks are auto-saved to temporary cache. Click "Commit Results" to finalize.
                        </p>
                        <button className="px-8 py-3 rounded-2xl bg-gradient-primary text-white font-black shadow-lg shadow-primary/20 hover:scale-105 transition-all uppercase text-[10px] tracking-widest flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" /> Commit Results
                        </button>
                    </div>
                </div>
            )}

            {activeTab === "analysis" && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="glass-card p-6 rounded-[2rem] h-[400px]">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-lg font-black font-heading">{t('classPerformance')}</h3>
                                <button className="p-2 rounded-xl bg-muted/50 hover:bg-muted text-muted-foreground transition-all">
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>
                            <ResponsiveContainer width="100%" height={280}>
                                <RechartsBar data={classPerformance} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
                                    <XAxis dataKey="class" tick={{ fontSize: 10, fontWeight: 700, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} dy={10} />
                                    <YAxis tick={{ fontSize: 10, fontWeight: 700, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} dx={-10} />
                                    <Tooltip
                                        cursor={{ fill: 'hsl(var(--muted))', opacity: 0.1 }}
                                        contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "16px", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                                    />
                                    <Legend verticalAlign="top" align="right" iconType="circle" />
                                    <Bar dataKey="avg" name="Average Grade" fill="hsl(var(--primary))" radius={[6, 6, 6, 6]} barSize={30} />
                                    <Bar dataKey="passRate" name="Pass Rate %" fill="hsl(var(--accent))" radius={[6, 6, 6, 6]} barSize={30} />
                                </RechartsBar>
                            </ResponsiveContainer>
                        </div>

                        <div className="glass-card p-6 rounded-[2rem] h-[400px]">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-lg font-black font-heading">{t('academicTrend')}</h3>
                                <div className="flex items-center gap-2 text-success">
                                    <TrendingUp className="w-4 h-4" /> <span className="text-[10px] font-black">+12.4% vs Last Term</span>
                                </div>
                            </div>
                            <ResponsiveContainer width="100%" height={280}>
                                <LineChart data={[
                                    { name: 'Term 1 WK1', score: 65 },
                                    { name: 'Term 1 WK4', score: 72 },
                                    { name: 'Term 1 WK8', score: 68 },
                                    { name: 'Term 1 WK12', score: 84 },
                                    { name: 'Term 2 WK2', score: 81 },
                                ]}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
                                    <XAxis dataKey="name" tick={{ fontSize: 9, fontWeight: 700, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} dy={10} />
                                    <YAxis tick={{ fontSize: 10, fontWeight: 700, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} dx={-10} />
                                    <Tooltip
                                        contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "16px", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                                    />
                                    <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={4} dot={{ r: 6, fill: "white", stroke: "hsl(var(--primary))", strokeWidth: 3 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    );
}
