import { Users, GraduationCap, DollarSign, ClipboardCheck, TrendingUp, Briefcase, AlertTriangle, BookOpen, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const attendanceData = [
  { day: "Jum", present: 420, absent: 32 },
  { day: "Isi", present: 405, absent: 47 },
  { day: "Jua", present: 430, absent: 22 },
  { day: "Maz", present: 418, absent: 34 },
  { day: "Ham", present: 422, absent: 30 },
];

const revenueData = [
  { month: "Jan", revenue: 12500000, target: 14000000 },
  { month: "Feb", revenue: 13200000, target: 14000000 },
  { month: "Mar", revenue: 14800000, target: 14000000 },
  { month: "Apr", revenue: 11900000, target: 14000000 },
  { month: "Mei", revenue: 15200000, target: 14000000 },
  { month: "Jun", revenue: 16100000, target: 14000000 },
];

const gradeDistribution = [
  { name: "A", value: 28, color: "hsl(160 84% 39%)" },
  { name: "B", value: 35, color: "hsl(225 73% 45%)" },
  { name: "C", value: 22, color: "hsl(199 89% 48%)" },
  { name: "D", value: 10, color: "hsl(38 92% 50%)" },
  { name: "F", value: 5, color: "hsl(0 84% 60%)" },
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

function StatCard({ icon: Icon, label, value, sub, gradient, change, positive }: any) {
  return (
    <div className="stat-card group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${gradient} shadow-md`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${positive ? "bg-accent-light text-accent" : "bg-destructive-light text-destructive"}`}>
          {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </div>
      </div>
      <p className="text-3xl font-bold font-heading text-foreground mb-1">{value}</p>
      <p className="text-sm font-semibold text-foreground/80">{label}</p>
      <p className="text-xs text-muted-foreground mt-1">{sub}</p>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome banner */}
      <div className="relative rounded-3xl overflow-hidden p-6 md:p-8 text-white" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-10">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-white/30"
              style={{ width: `${60 + i * 40}px`, height: `${60 + i * 40}px`, top: `${-20 + i * 5}px`, right: `${-20 + i * 10}px` }} />
          ))}
        </div>
        <div className="relative flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-white/70 text-sm font-medium mb-1">Karibu, Admin Mkuu 👋</p>
            <h1 className="text-3xl font-bold font-heading mb-2">Bender School SIS</h1>
            <p className="text-white/80 text-sm max-w-lg">Mwaka wa Masomo 2024/2025 • Term 2 • Dar es Salaam, Tanzania</p>
            <div className="flex items-center gap-3 mt-4 flex-wrap">
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium">
                <span className="pulse-dot" style={{ background: "hsl(160 84% 60%)" }} />
                Mfumo Unafanya Kazi
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium">
                <ClipboardCheck className="w-3 h-3" />
                Mahudhurio ya Leo: 93%
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium">
                <DollarSign className="w-3 h-3" />
                TSh 16.1M ya Mwezi
              </div>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-white/60 text-xs">Leo</p>
            <p className="text-2xl font-bold font-heading">
              {new Date().toLocaleDateString("sw-TZ", { weekday: "long" })}
            </p>
            <p className="text-white/80 text-sm">
              {new Date().toLocaleDateString("sw-TZ", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={GraduationCap} label="Wanafunzi Wote" value="1,248" sub="Wanafunzi walioandikishwa" gradient="bg-gradient-card-blue" change="+12" positive />
        <StatCard icon={ClipboardCheck} label="Mahudhurio Leo" value="93.2%" sub="452 kati ya 485 wamefika" gradient="bg-gradient-card-green" change="+2.1%" positive />
        <StatCard icon={DollarSign} label="Mapato Juni" value="16.1M" sub="TSh zilizokusanywa" gradient="bg-gradient-card-amber" change="+8.7%" positive />
        <StatCard icon={AlertTriangle} label="Ada Zinasubiri" value="TSh 4.2M" sub="Kutoka kwa wanafunzi 67" gradient="bg-gradient-card-rose" change="-3" positive={false} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Briefcase} label="Wafanyakazi" value="89" sub="Walimu na watumishi" gradient="bg-gradient-card-purple" change="+3" positive />
        <StatCard icon={BookOpen} label="Masomo" value="28" sub="Masomo yaliyofunzwa" gradient="bg-gradient-card-teal" change="0" positive />
        <StatCard icon={Users} label="Madarasa" value="24" sub="Madarasa yanayofanya kazi" gradient="bg-gradient-card-blue" change="+2" positive />
        <StatCard icon={TrendingUp} label="Wastani wa Alama" value="79.2%" sub="Kuongezeka kwa 3.2%" gradient="bg-gradient-card-green" change="+3.2%" positive />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Chart */}
        <div className="lg:col-span-2 chart-wrapper">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-foreground font-heading">Mahudhurio ya Wiki</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Wanafunzi waliofika dhidi ya waliokosekana</p>
            </div>
            <span className="badge-primary">Wiki hii</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={attendanceData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", boxShadow: "var(--shadow-md)" }}
                cursor={{ fill: "hsl(var(--muted))" }}
              />
              <Bar dataKey="present" name="Waliofika" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              <Bar dataKey="absent" name="Hawakufika" fill="hsl(var(--destructive))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Grade Distribution */}
        <div className="chart-wrapper">
          <div className="mb-6">
            <h3 className="font-bold text-foreground font-heading">Usambazaji wa Alama</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Term 2, 2024</p>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={gradeDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {gradeDistribution.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-5 gap-1 mt-3">
            {gradeDistribution.map(g => (
              <div key={g.name} className="text-center">
                <div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ background: g.color }} />
                <p className="text-xs font-bold" style={{ color: g.color }}>{g.name}</p>
                <p className="text-[10px] text-muted-foreground">{g.value}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="chart-wrapper">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-foreground font-heading">Mapato ya Mwaka</h3>
              <p className="text-xs text-muted-foreground mt-0.5">TSh – Mwaka 2024</p>
            </div>
            <span className="badge-success">+18% mwaka huu</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000000).toFixed(0)}M`} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px" }}
                formatter={(v: any) => [`TSh ${(v/1000000).toFixed(1)}M`, ""]}
              />
              <Area type="monotone" dataKey="revenue" name="Mapato" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#colorRevenue)" />
              <Line type="monotone" dataKey="target" name="Lengo" stroke="hsl(var(--accent))" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Trend */}
        <div className="chart-wrapper">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-foreground font-heading">Mwenendo wa Utendaji</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Wastani wa alama kwa term</p>
            </div>
            <span className="badge-info">Inaongezeka</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={performanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="term" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 85]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px" }} formatter={(v: any) => [`${v}%`, "Wastani"]} />
              <Line type="monotone" dataKey="avg" stroke="hsl(var(--accent))" strokeWidth={3} dot={{ fill: "hsl(var(--accent))", r: 5, strokeWidth: 2, stroke: "white" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Students */}
        <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h3 className="font-bold text-foreground font-heading">Wanafunzi Wapya</h3>
            <button className="text-xs font-semibold text-primary hover:underline">Ona Wote</button>
          </div>
          <div className="divide-y divide-border/50">
            {recentStudents.map(s => (
              <div key={s.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-muted/30 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {s.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.id} • {s.class}</p>
                </div>
                <span className={s.status === "new" ? "badge-warning" : "badge-success"}>
                  {s.status === "new" ? "Mpya" : "Hai"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Fees */}
        <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h3 className="font-bold text-foreground font-heading">Ada Zinasubiri</h3>
            <span className="badge-danger">67 wanafunzi</span>
          </div>
          <div className="divide-y divide-border/50">
            {pendingFees.map((f, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-3.5 hover:bg-muted/30 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-warning-light flex items-center justify-center text-warning text-xs font-bold flex-shrink-0">
                  {f.student.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{f.student}</p>
                  <p className="text-xs text-muted-foreground">{f.class} • Siku {f.days} zilizopita</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-destructive">{f.amount}</p>
                  <button className="text-[10px] text-primary hover:underline font-medium mt-0.5">Tuma ukumbusho</button>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-3 border-t border-border bg-muted/20">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground font-medium">Jumla ya deni</span>
              <span className="font-bold text-destructive">TSh 4,218,500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
