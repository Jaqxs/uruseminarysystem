import { useLanguage } from "../context/LanguageContext";
import {
    BookOpen, Users, Clock, AlertCircle, Megaphone,
    CheckCircle2, ChevronRight, Calendar, UserCheck,
    FileEdit, Star, GraduationCap, Target
} from "lucide-react";
import { toast } from "sonner";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from "recharts";

export default function TeacherDashboard() {
    const { t, language } = useLanguage();

    const myClasses = [
        { name: "Form 4A", subject: "Mathematics", students: 42, performance: "84%" },
        { name: "Form 3B", subject: "Further Math", students: 38, performance: "78%" },
        { name: "Form 2C", subject: "Mathematics", students: 45, performance: "81%" },
    ];

    const pendingMarks = [
        { exam: "Midterm Assessment", class: "Form 4A", subject: "Math", deadline: "2 days left" },
        { exam: "Weekly Quiz 4", class: "Form 3B", subject: "Math", deadline: "Today" },
    ];

    const todayLessons = [
        { time: "08:00 - 09:20", class: "Form 4A", room: "Room 102", active: true },
        { time: "10:00 - 11:20", class: "Form 3B", room: "Math Lab", active: false },
        { time: "14:00 - 15:20", class: "Form 2C", room: "Room 204", active: false },
    ];

    const classAttendanceData = [
        { class: "F4A", present: 40, absent: 2 },
        { class: "F3B", present: 35, absent: 3 },
        { class: "F2C", present: 43, absent: 2 },
    ];

    const announcements = [
        { title: "Staff Meeting", time: "Tomorrow, 08:30 AM", type: "urgent" },
        { title: "Syllabus Review", time: "Friday, 02:00 PM", type: "general" },
    ];

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            {/* Header Context */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-8 rounded-[2.5rem] border border-border">
                <div>
                    <h2 className="text-2xl font-black font-heading text-foreground">
                        {language === 'sw' ? 'Habari, Mwalimu Mwamba' : 'Hello, Teacher Mwamba'}
                    </h2>
                    <p className="text-sm text-muted-foreground font-medium">
                        {language === 'sw' ? 'Umebakiza vipindi 3 leo.' : 'You have 3 lessons scheduled for today.'}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-sm font-bold">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        <p className="text-[10px] uppercase font-bold text-accent tracking-widest">{t('term2')} • Week 8</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shadow-sm">
                        <Calendar className="w-6 h-6" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 1. My Classes Widget */}
                <div className="lg:col-span-2 rounded-[2.5rem] border border-border bg-card shadow-sm overflow-hidden p-2">
                    <div className="flex items-center justify-between px-8 py-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <Users className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-black font-heading">{language === 'sw' ? 'Madarasa Yangu' : 'My Classes'}</h3>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-6">
                        {myClasses.map((cl, i) => (
                            <div key={i} className="p-6 rounded-[2rem] bg-muted/20 border border-border/40 hover:bg-card hover:shadow-xl transition-all group cursor-pointer">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-bold text-xs text-primary shadow-sm group-hover:scale-110 transition-transform">
                                        {cl.name.split(" ")[1]}
                                    </div>
                                    <Target className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <p className="text-sm font-black">{cl.name}</p>
                                <p className="text-[10px] font-bold text-muted-foreground mb-4 uppercase tracking-wider">{cl.subject}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-primary">{cl.students} Students</span>
                                    <span className="text-[10px] font-black text-emerald-500">{cl.performance} Avg</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. Announcements Widget */}
                <div className="rounded-[2.5rem] border border-border bg-card shadow-sm overflow-hidden p-2">
                    <div className="flex items-center justify-between px-8 py-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                                <Megaphone className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-black font-heading">{t('announcements')}</h3>
                        </div>
                    </div>
                    <div className="px-4 pb-4 space-y-3">
                        {announcements.map((a, i) => (
                            <div key={i} className={`p-4 rounded-2xl border ${a.type === 'urgent' ? 'bg-destructive/5 border-destructive/10' : 'bg-muted/30 border-border/40'}`}>
                                <p className={`text-xs font-black ${a.type === 'urgent' ? 'text-destructive' : 'text-foreground'}`}>{a.title}</p>
                                <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase">{a.time}</p>
                            </div>
                        ))}
                    </div>
                    <button className="w-full py-4 text-[10px] font-black uppercase text-primary border-t border-border/40 hover:bg-muted/20 transition-all">
                        View All Staff Bulletins
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 3. Today's Lessons Widget */}
                <div className="rounded-[2.5rem] border border-border bg-card shadow-sm overflow-hidden p-2">
                    <div className="flex items-center justify-between px-8 py-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                                <Clock className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-black font-heading">{language === 'sw' ? 'Vipindi vya Leo' : "Today's Lessons"}</h3>
                        </div>
                    </div>
                    <div className="px-4 pb-4 space-y-2">
                        {todayLessons.map((lesson, i) => (
                            <div key={i} className={`flex items-center gap-4 px-6 py-4 rounded-[1.5rem] transition-all ${lesson.active ? 'bg-accent/10 border border-accent/20 ring-4 ring-accent/5' : 'hover:bg-muted/40'}`}>
                                <div className={`w-2 h-10 rounded-full ${lesson.active ? 'bg-accent' : 'bg-muted-foreground/20'}`} />
                                <div className="flex-1">
                                    <p className={`text-sm font-black ${lesson.active ? 'text-accent' : 'text-foreground'}`}>{lesson.class}</p>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{lesson.time} • {lesson.room}</p>
                                </div>
                                {lesson.active && <span className="text-[8px] font-black bg-accent text-white px-2 py-0.5 rounded-full uppercase">In Session</span>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Pending Marks Entry Widget */}
                <div className="rounded-[2.5rem] border border-border bg-card shadow-sm overflow-hidden p-2">
                    <div className="flex items-center justify-between px-8 py-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500">
                                <FileEdit className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-black font-heading">{language === 'sw' ? 'Kujaza Alama' : 'Marks Entry'}</h3>
                        </div>
                    </div>
                    <div className="px-4 pb-4 space-y-3">
                        {pendingMarks.map((p, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted/20 border border-border/40 group hover:border-rose-500/40 transition-all cursor-pointer">
                                <div>
                                    <p className="text-sm font-black">{p.exam}</p>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{p.class} • {p.subject}</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-[9px] font-black text-rose-500 uppercase flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" /> {p.deadline}
                                    </span>
                                    <button className="text-[9px] font-black uppercase text-primary underline mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Enter Marks</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. Student Attendance Chart/Summary */}
                <div className="chart-wrapper rounded-[2.5rem] p-10">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-xl font-black font-heading">{t('attendance')}</h3>
                        <UserCheck className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div className="h-[180px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={classAttendanceData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
                                <XAxis dataKey="class" tick={{ fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: 'hsl(var(--muted))', opacity: 0.1 }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)' }} />
                                <Bar dataKey="present" name="Present" fill="hsl(var(--emerald-500))" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-6 flex items-center justify-between p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                        <div>
                            <p className="text-[10px] font-bold text-emerald-600 uppercase">Avg Attendance</p>
                            <p className="text-lg font-black text-emerald-600">95.8%</p>
                        </div>
                        <button onClick={() => toast.info('Taking attendance...')} className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-[10px] font-black uppercase shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all">
                            Mark Today
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
