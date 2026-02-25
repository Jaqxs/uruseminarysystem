import { Download, TrendingUp, Award, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const classPerf = [
  { class: "Form 1A", avg: 74 }, { class: "Form 1B", avg: 71 }, { class: "Form 2A", avg: 78 },
  { class: "Form 2B", avg: 75 }, { class: "Form 3A", avg: 80 }, { class: "Form 3B", avg: 77 },
  { class: "Form 4A", avg: 82 }, { class: "Form 4B", avg: 85 },
];
const trend = [
  { term: "T1 '23", avg: 68 }, { term: "T2 '23", avg: 71 }, { term: "T3 '23", avg: 74 },
  { term: "T1 '24", avg: 72 }, { term: "T2 '24", avg: 76 }, { term: "T3 '24", avg: 79 },
];

export default function Grades() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Award, label: "Wastani wa Shule", value: "76.8%", gradient: "bg-gradient-card-blue" },
          { icon: TrendingUp, label: "Asilimia ya Kufaulu", value: "88.4%", gradient: "bg-gradient-card-green" },
          { icon: Users, label: "Wanafunzi Waliofanya", value: "1,248", gradient: "bg-gradient-card-purple" },
          { icon: Download, label: "Ripoti Zilizotolewa", value: "1,248", gradient: "bg-gradient-card-amber" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className={`w-10 h-10 rounded-xl ${s.gradient} flex items-center justify-center mb-3`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold font-heading text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="chart-wrapper">
          <h3 className="font-bold text-foreground font-heading mb-5">Utendaji kwa Darasa</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={classPerf}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="class" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 90]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px" }} formatter={(v: any) => [`${v}%`, "Wastani"]} />
              <Bar dataKey="avg" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-wrapper">
          <h3 className="font-bold text-foreground font-heading mb-5">Mwenendo wa Mwaka</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="term" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 85]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px" }} formatter={(v: any) => [`${v}%`, "Wastani"]} />
              <Line type="monotone" dataKey="avg" stroke="hsl(var(--accent))" strokeWidth={3} dot={{ fill: "hsl(var(--accent))", r: 5, strokeWidth: 2, stroke: "white" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="rounded-2xl border border-border bg-card shadow-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-foreground font-heading">Kadi za Ripoti</h3>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-primary text-white text-sm font-semibold shadow-md-blue">
            <Download className="w-4 h-4" /> Pakua Zote (PDF)
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {["Form 1A","Form 2A","Form 3A","Form 4A","Form 1B","Form 2B","Form 3B","Form 4B"].map(cls => (
            <button key={cls} className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary hover:bg-primary-light transition-all group">
              <div>
                <p className="text-sm font-bold text-foreground group-hover:text-primary">{cls}</p>
                <p className="text-xs text-muted-foreground">Term 2, 2024</p>
              </div>
              <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
