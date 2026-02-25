import { BookOpen, Users, Award, BarChart2, Clock, Plus, Search, Download } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const subjects = [
  { name: "Hisabati", teacher: "Mwl. John Kamau", students: 285, avgGrade: 72, pass: 88, icon: "📐" },
  { name: "Kiingereza", teacher: "Mwl. Grace Mwamba", students: 485, avgGrade: 78, pass: 92, icon: "📖" },
  { name: "Kiswahili", teacher: "Mwl. Amina Juma", students: 485, avgGrade: 82, pass: 95, icon: "✍️" },
  { name: "Sayansi", teacher: "Mwl. David Osei", students: 320, avgGrade: 68, pass: 81, icon: "🔬" },
  { name: "Historia", teacher: "Mwl. Fatuma Ali", students: 240, avgGrade: 74, pass: 89, icon: "🏛️" },
  { name: "Jiografia", teacher: "Mwl. Baraka Shayo", students: 240, avgGrade: 76, pass: 90, icon: "🌍" },
  { name: "Fizikia", teacher: "Mwl. Hassan Mrisho", students: 160, avgGrade: 65, pass: 78, icon: "⚛️" },
  { name: "Kemia", teacher: "Mwl. Rehema Paul", students: 160, avgGrade: 67, pass: 80, icon: "🧪" },
  { name: "Baiolojia", teacher: "Mwl. Neema Grace", students: 200, avgGrade: 71, pass: 86, icon: "🧬" },
  { name: "ICT", teacher: "Mwl. Amos Tarimo", students: 485, avgGrade: 80, pass: 93, icon: "💻" },
];

const terms = [
  { subject: "Hisabati", term1: 68, term2: 72, term3: 75 },
  { subject: "Kiingereza", term1: 75, term2: 78, term3: 80 },
  { subject: "Sayansi", term1: 63, term2: 68, term3: 71 },
  { subject: "Historia", term1: 71, term2: 74, term3: 76 },
  { subject: "ICT", term1: 77, term2: 80, term3: 82 },
];

const topPerformers = [
  { rank: 1, name: "Zainab Omar", class: "Form 4B", gpa: 4.0, avg: "96.2%" },
  { rank: 2, name: "Amina Hassan", class: "Form 4A", gpa: 3.8, avg: "91.4%" },
  { rank: 3, name: "Fatuma Ali", class: "Form 2A", gpa: 3.9, avg: "93.1%" },
  { rank: 4, name: "Grace Ndugu", class: "Form 2C", gpa: 3.5, avg: "86.8%" },
  { rank: 5, name: "Rehema Paul", class: "Form 4C", gpa: 3.6, avg: "88.3%" },
];

const radarData = [
  { subject: "Hisabati", A: 72 }, { subject: "Kiingereza", A: 78 },
  { subject: "Sayansi", A: 68 }, { subject: "Historia", A: 74 },
  { subject: "Jiografia", A: 76 }, { subject: "ICT", A: 80 },
];

export default function Academics() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: BookOpen, label: "Masomo Yote", value: "28", sub: "Term 2, 2024/2025", gradient: "bg-gradient-card-blue" },
          { icon: Users, label: "Walimu Wanaofundisha", value: "42", sub: "Kwa masomo yote", gradient: "bg-gradient-card-green" },
          { icon: Award, label: "Wastani wa Darasa", value: "76.8%", sub: "Imeongezeka kwa 3.2%", gradient: "bg-gradient-card-amber" },
          { icon: BarChart2, label: "Asilimia ya Kufaulu", value: "88.4%", sub: "NECTA na mitihani ya ndani", gradient: "bg-gradient-card-purple" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.gradient} mb-3`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold font-heading text-foreground">{s.value}</p>
            <p className="text-xs font-semibold text-foreground/80 mt-1">{s.label}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Performance */}
        <div className="chart-wrapper">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-foreground font-heading">Utendaji kwa Somo</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Wastani wa alama – Term 2</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={terms} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <YAxis dataKey="subject" type="category" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={65} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px" }} formatter={(v: any) => [`${v}%`, ""]} />
              <Bar dataKey="term1" name="Term 1" fill="hsl(var(--primary) / 0.4)" radius={[0, 4, 4, 0]} />
              <Bar dataKey="term2" name="Term 2" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar */}
        <div className="chart-wrapper">
          <div className="mb-5">
            <h3 className="font-bold text-foreground font-heading">Wastani wa Masomo (Radar)</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Ulinganifu wa masomo yote</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <Radar name="Wastani" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.15} strokeWidth={2} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px" }} formatter={(v: any) => [`${v}%`, "Wastani"]} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Subjects Table */}
      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-wrap gap-3">
          <h3 className="font-bold text-foreground font-heading">Orodha ya Masomo</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/60 border border-border/50 text-sm text-muted-foreground">
              <Search className="w-4 h-4" />
              <input placeholder="Tafuta somo..." className="bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm w-36" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-primary text-white text-sm font-semibold shadow-md-blue">
              <Plus className="w-4 h-4" /> Somo Jipya
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="sis-table">
            <thead>
              <tr>
                <th>Somo</th>
                <th>Mwalimu</th>
                <th>Wanafunzi</th>
                <th>Wastani</th>
                <th>Asilimia ya Kufaulu</th>
                <th>Hali</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map(s => (
                <tr key={s.name}>
                  <td>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{s.icon}</span>
                      <span className="font-semibold text-foreground">{s.name}</span>
                    </div>
                  </td>
                  <td><span className="text-sm text-muted-foreground">{s.teacher}</span></td>
                  <td>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-sm font-medium">{s.students}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden w-16">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${s.avgGrade}%` }} />
                      </div>
                      <span className="text-sm font-bold text-primary">{s.avgGrade}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={`text-sm font-bold ${s.pass >= 90 ? "text-accent" : s.pass >= 80 ? "text-warning" : "text-destructive"}`}>{s.pass}%</span>
                  </td>
                  <td>
                    <span className={s.pass >= 90 ? "badge-success" : s.pass >= 80 ? "badge-warning" : "badge-danger"}>
                      {s.pass >= 90 ? "Bora" : s.pass >= 80 ? "Vizuri" : "Inahitaji Msaada"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Performers */}
      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 className="font-bold text-foreground font-heading">Wanafunzi Bora</h3>
          <button className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground border border-border px-3 py-1.5 rounded-lg">
            <Download className="w-3 h-3" /> Pakua PDF
          </button>
        </div>
        <div className="divide-y divide-border/40">
          {topPerformers.map(p => (
            <div key={p.rank} className="flex items-center gap-4 px-6 py-3.5 hover:bg-muted/20 transition-colors">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                p.rank === 1 ? "bg-warning text-white" : p.rank === 2 ? "bg-muted-foreground/30 text-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {p.rank === 1 ? "🥇" : p.rank === 2 ? "🥈" : p.rank === 3 ? "🥉" : p.rank}
              </div>
              <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {p.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.class}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">GPA</p>
                  <p className="font-bold text-primary">{p.gpa}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Wastani</p>
                  <p className="font-bold text-accent">{p.avg}</p>
                </div>
                <Award className={`w-5 h-5 ${p.rank <= 3 ? "text-warning" : "text-muted-foreground"}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
