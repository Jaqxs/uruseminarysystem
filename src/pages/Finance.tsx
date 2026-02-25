import { DollarSign, TrendingUp, TrendingDown, AlertCircle, CreditCard, FileText, Download, Plus, Search } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const monthlyData = [
  { month: "Jan", collected: 12500000, target: 14000000, outstanding: 1500000 },
  { month: "Feb", collected: 13200000, target: 14000000, outstanding: 800000 },
  { month: "Mar", collected: 14800000, target: 14000000, outstanding: 200000 },
  { month: "Apr", collected: 11900000, target: 14000000, outstanding: 2100000 },
  { month: "Mei", collected: 15200000, target: 14000000, outstanding: 0 },
  { month: "Jun", collected: 16100000, target: 14000000, outstanding: 0 },
];

const recentPayments = [
  { student: "Amina Hassan", class: "Form 4A", amount: 850000, date: "25 Jun 2024", method: "M-Pesa", status: "confirmed" },
  { student: "Baraka Juma", class: "Form 3B", amount: 450000, date: "24 Jun 2024", method: "Benki", status: "confirmed" },
  { student: "Fatuma Ali", class: "Form 2A", amount: 850000, date: "24 Jun 2024", method: "M-Pesa", status: "confirmed" },
  { student: "David Kamau", class: "Form 1C", amount: 200000, date: "23 Jun 2024", method: "Pesa Taslimu", status: "pending" },
  { student: "Zainab Omar", class: "Form 4B", amount: 850000, date: "22 Jun 2024", method: "M-Pesa", status: "confirmed" },
  { student: "Grace Ndugu", class: "Form 2C", amount: 350000, date: "21 Jun 2024", method: "Benki", status: "confirmed" },
];

const feeStructure = [
  { class: "Form 1", tuition: 650000, activity: 80000, exam: 50000, total: 780000 },
  { class: "Form 2", tuition: 700000, activity: 80000, exam: 55000, total: 835000 },
  { class: "Form 3", tuition: 750000, activity: 80000, exam: 60000, total: 890000 },
  { class: "Form 4", tuition: 800000, activity: 80000, exam: 70000, total: 950000 },
];

const outstanding = [
  { student: "Khalid Ibrahim", class: "Form 1A", balance: 650000, dueDate: "01 Jul 2024", days: 5 },
  { student: "Amos Tarimo", class: "Form 3C", balance: 890000, dueDate: "15 Jun 2024", days: 15 },
  { student: "Neema Grace", class: "Form 2C", balance: 420000, dueDate: "01 Jul 2024", days: 5 },
  { student: "Rehema Paul", class: "Form 4C", balance: 200000, dueDate: "25 Jun 2024", days: 1 },
];

function fmt(n: number) {
  return `TSh ${(n / 1000000).toFixed(1)}M`;
}
function fmtK(n: number) {
  return `TSh ${n.toLocaleString()}`;
}

export default function Finance() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: DollarSign, label: "Mapato Juni", value: "TSh 16.1M", sub: "+8.7% kuliko mwezi jana", gradient: "bg-gradient-card-blue", color: "text-primary" },
          { icon: TrendingUp, label: "Waliolipa Kamili", value: "1,181", sub: "Kati ya wanafunzi 1,248", gradient: "bg-gradient-card-green", color: "text-accent" },
          { icon: AlertCircle, label: "Deni Linalosalia", value: "TSh 4.2M", sub: "Kutoka kwa wanafunzi 67", gradient: "bg-gradient-card-rose", color: "text-destructive" },
          { icon: TrendingDown, label: "Mapato Mwaka", value: "TSh 83.7M", sub: "Lengo: TSh 90M", gradient: "bg-gradient-card-amber", color: "text-warning" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.gradient} mb-3 shadow-md`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <p className={`text-2xl font-bold font-heading ${s.color}`}>{s.value}</p>
            <p className="text-xs font-semibold text-foreground/80 mt-1">{s.label}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="chart-wrapper">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-foreground font-heading">Makusanyo ya Kila Mwezi</h3>
              <p className="text-xs text-muted-foreground mt-0.5">TSh – Mwaka 2024</p>
            </div>
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground border border-border px-3 py-1.5 rounded-lg">
              <Download className="w-3 h-3" /> Pakua
            </button>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000000).toFixed(0)}M`} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px" }} formatter={(v: any) => [fmt(v), ""]} />
              <Bar dataKey="collected" name="Zilizokusanywa" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              <Bar dataKey="outstanding" name="Zinazosalia" fill="hsl(var(--destructive))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Fee Structure */}
        <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h3 className="font-bold text-foreground font-heading">Muundo wa Ada</h3>
            <span className="badge-primary">2024/2025</span>
          </div>
          <div className="overflow-x-auto">
            <table className="sis-table">
              <thead>
                <tr>
                  <th>Darasa</th>
                  <th>Masomo</th>
                  <th>Shughuli</th>
                  <th>Mtihani</th>
                  <th>Jumla</th>
                </tr>
              </thead>
              <tbody>
                {feeStructure.map(f => (
                  <tr key={f.class}>
                    <td><span className="font-semibold text-foreground">{f.class}</span></td>
                    <td className="text-muted-foreground text-xs">{fmtK(f.tuition)}</td>
                    <td className="text-muted-foreground text-xs">{fmtK(f.activity)}</td>
                    <td className="text-muted-foreground text-xs">{fmtK(f.exam)}</td>
                    <td><span className="font-bold text-primary">{fmtK(f.total)}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Payments & Outstanding */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent */}
        <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h3 className="font-bold text-foreground font-heading">Malipo ya Hivi Karibuni</h3>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                <Search className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-primary text-white text-xs font-semibold shadow-md-blue">
                <Plus className="w-3 h-3" /> Rekodi Malipo
              </button>
            </div>
          </div>
          <div className="divide-y divide-border/50">
            {recentPayments.map((p, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-3.5 hover:bg-muted/30 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-gradient-card-green flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {p.student.split(" ").slice(0, 2).map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{p.student}</p>
                  <p className="text-[11px] text-muted-foreground">{p.class} • {p.date} • {p.method}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-accent">{fmtK(p.amount)}</p>
                  <span className={p.status === "confirmed" ? "badge-success" : "badge-warning"} style={{ fontSize: "10px" }}>
                    {p.status === "confirmed" ? "✓ Imethibitishwa" : "⏳ Inasubiri"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Outstanding */}
        <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h3 className="font-bold text-foreground font-heading">Madeni Yanayosalia</h3>
            <span className="badge-danger">67 wanafunzi</span>
          </div>
          <div className="divide-y divide-border/50">
            {outstanding.map((o, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-3.5 hover:bg-muted/30 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-destructive-light flex items-center justify-center text-destructive text-xs font-bold flex-shrink-0">
                  {o.student.split(" ").slice(0, 2).map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{o.student}</p>
                  <p className="text-[11px] text-muted-foreground">{o.class} • Inaisha: {o.dueDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-destructive">{fmtK(o.balance)}</p>
                  <div className="flex items-center gap-1 justify-end mt-1">
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${o.days <= 3 ? "bg-destructive-light text-destructive" : "bg-warning-light text-warning"}`}>
                      Siku {o.days}
                    </span>
                    <button className="text-[10px] text-primary hover:underline font-medium">Ukumbusho</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-3 border-t border-border">
            <button className="w-full py-2.5 rounded-xl border border-destructive/30 text-destructive text-sm font-semibold hover:bg-destructive-light transition-colors flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" />
              Toa Ripoti ya Madeni
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
