import { useState } from "react";
import {
  DollarSign, TrendingUp, TrendingDown, AlertCircle, CreditCard, FileText,
  Download, Plus, Search, Filter, Printer, MoreVertical, CheckCircle2,
  Wallet, ArrowUpRight, ArrowDownRight, Clock, MessageSquare, ShieldCheck,
  Landmark, PieChart as PieChartIcon, Activity, Receipt, CreditCard as CardIcon, Target
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, Cell, PieChart, Pie, Legend, LineChart, Line
} from "recharts";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

export default function Finance() {
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const initialPayments = [
    { id: "TXN-001", student: "Amina Hassan", class: "Form 4A", amount: 850000, date: "25 Jun 2024", method: "M-Pesa", status: "confirmed", recorder: "Bursar Jane" },
    { id: "TXN-002", student: "Baraka Juma", class: "Form 3B", amount: 450000, date: "24 Jun 2024", method: "Bank", status: "confirmed", recorder: "Bursar Jane" },
    { id: "TXN-003", student: "Fatuma Ali", class: "Form 2A", amount: 850000, date: "24 Jun 2024", method: "M-Pesa", status: "confirmed", recorder: "Admin Ali" },
    { id: "TXN-004", student: "David Kamau", class: "Form 1C", amount: 200000, date: "23 Jun 2024", method: "Cash", status: "pending", recorder: "Bursar Jane" },
  ];

  const classRevenue = [
    { name: "Form 1", actual: 12500000, expected: 15000000 },
    { name: "Form 2", actual: 11000000, expected: 14000000 },
    { name: "Form 3", actual: 15800000, expected: 16000000 },
    { name: "Form 4", actual: 16100000, expected: 16500000 },
  ];

  const paymentChannels = [
    { name: "Bank", value: 45, color: "hsl(var(--primary))" },
    { name: "Mobile Money", value: 40, color: "hsl(var(--accent))" },
    { name: "Cash", value: 15, color: "hsl(var(--warning))" },
  ];

  const expenses = [
    { category: "Salaries", amount: 8500000, status: "paid" },
    { category: "Maintenance", amount: 1200000, status: "pending" },
    { category: "Utilities", amount: 850000, status: "paid" },
    { category: "Stationery", amount: 450000, status: "paid" },
  ];

  const [txnSearch, setTxnSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);

  function fmtK(n: number) {
    return `TSh ${n.toLocaleString()}`;
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* 1️⃣ Financial Summary (Top KPIs) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {[
          { label: t('feesToday'), value: "TSh 1,200,000", icon: Wallet, color: "bg-blue-500" },
          { label: t('feesTerm'), value: "TSh 65,400,000", icon: Landmark, color: "bg-indigo-500" },
          { label: t('expectedRevenue'), value: "TSh 85,000,000", icon: Target, color: "bg-emerald-500" },
          { label: t('performance'), value: "77%", icon: Activity, color: "bg-amber-500" },
          { label: t('outstanding'), value: "TSh 4,200,000", icon: AlertCircle, color: "bg-rose-500" },
          { label: t('expensesMTD'), value: "TSh 11,500,000", icon: TrendingDown, color: "bg-orange-500" },
          { label: t('netPosition'), value: "TSh 53,900,000", icon: DollarSign, color: "bg-primary" },
        ].map((kpi, i) => (
          <div key={i} className="bg-card border border-border p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-all group">
            <div className={`w-10 h-10 rounded-xl ${kpi.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-black/5`}>
              <kpi.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-xl font-black">{kpi.value}</p>
            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 2️⃣ Fee Collection Performance */}
        <div className="lg:col-span-2 chart-wrapper rounded-[2.5rem] p-10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black font-heading">{t('feeCollectionPerformance')}</h3>
              <p className="text-sm text-muted-foreground font-medium">{t('revenueByClassVsExpected')}</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors"><Printer className="w-4 h-4" /></button>
              <button className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all">{t('exportData')}</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={classRevenue} barGap={12}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 700 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fontWeight: 700 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000000).toFixed(1)}M`} />
              <Tooltip cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: 'var(--shadow-lg)' }} />
              <Legend verticalAlign="top" align="right" iconType="circle" />
              <Bar dataKey="actual" name="Actual Collected" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              <Bar dataKey="expected" name="Expected Goal" fill="hsl(var(--muted))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 4️⃣ Payment Channel Breakdown */}
        <div className="chart-wrapper rounded-[2.5rem] p-10">
          <div className="mb-10 text-center">
            <h3 className="text-xl font-black font-heading">{t('paymentChannels')}</h3>
            <p className="text-sm text-muted-foreground font-medium">{t('distributionByMethod')}</p>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={paymentChannels} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={8} dataKey="value">
                  {paymentChannels.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-8">
            {paymentChannels.map(c => (
              <div key={c.name} className="flex items-center justify-between p-3 rounded-2xl bg-muted/30 border border-border/40">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="text-xs font-bold">{c.name}</span>
                </div>
                <span className="text-xs font-black">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 3️⃣ Outstanding Fees Monitoring */}
        <div className="rounded-[2.5rem] border border-border bg-card shadow-sm overflow-hidden p-2">
          <div className="flex items-center justify-between px-8 py-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black font-heading">{t('defaultersList')}</h3>
            </div>
            <span className="px-3 py-1 rounded-lg bg-rose-500/10 text-rose-500 text-[10px] font-black uppercase tracking-widest">
              67 {t('students')}
            </span>
          </div>
          <div className="px-4 pb-4 space-y-1">
            {[
              { name: "Khalid Ibrahim", class: "Form 1A", balance: "TSh 650,000", status: "Overdue 15d" },
              { name: "Amos Tarimo", class: "Form 3C", balance: "TSh 890,000", status: "Overdue 30d" },
              { name: "Neema Grace", class: "Form 2C", balance: "TSh 420,000", status: "Overdue 5d" },
            ].map((d, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-muted/40 transition-all rounded-[1.5rem] group">
                <div className="flex-1">
                  <p className="text-sm font-black">{d.name}</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">{d.class} • {d.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-rose-500">{d.balance}</p>
                  <button className="text-[9px] font-black uppercase text-primary underline">Remind</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-6 mb-6 p-6 rounded-[2rem] bg-rose-500 text-white flex justify-between items-center shadow-lg shadow-rose-500/20">
            <div>
              <p className="text-[10px] font-bold uppercase opacity-80">{t('totalOutstanding')}</p>
              <h4 className="text-xl font-black">TSh 4,218,500</h4>
            </div>
            <TrendingUp className="w-8 h-8 opacity-20" />
          </div>
        </div>

        {/* 5️⃣ Expense Tracking */}
        <div className="rounded-[2.5rem] border border-border bg-card shadow-sm overflow-hidden p-2">
          <div className="flex items-center justify-between px-8 py-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                <Receipt className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black font-heading">{t('monthlyExpenses')}</h3>
            </div>
          </div>
          <div className="px-4 pb-4 space-y-3">
            {expenses.map((e, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted/20 border border-border/40">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${e.status === 'paid' ? 'bg-success' : 'bg-warning'}`} />
                  <div>
                    <p className="text-sm font-black">{e.category}</p>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground">{e.status}</p>
                  </div>
                </div>
                <p className="text-sm font-black">{fmtK(e.amount)}</p>
              </div>
            ))}
          </div>
          <div className="mx-6 mb-6 p-8 rounded-[2.5rem] bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-xl shadow-orange-500/20">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[11px] font-bold uppercase opacity-80 mb-1">Net Position</p>
                <h4 className="text-2xl font-black">TSh 53.9M</h4>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase opacity-80">Budget vs Actual</p>
                <p className="font-black text-sm">94.2%</p>
              </div>
            </div>
            <div className="w-full h-1.5 bg-white/20 rounded-full mt-4">
              <div className="h-full bg-white w-[94%] rounded-full" />
            </div>
          </div>
        </div>

        {/* 7️⃣ Alerts & Financial Risks */}
        <div className="rounded-[2.5rem] border border-border bg-card shadow-sm overflow-hidden p-2">
          <div className="flex items-center justify-between px-8 py-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black font-heading">{t('financialRisks')}</h3>
            </div>
          </div>
          <div className="px-4 pb-4 space-y-4">
            {[
              { msg: "Unusual transaction detected (Ref: RF892JK)", type: "risk" },
              { msg: "Reconciliation discrepancy in M-Pesa channel", type: "reconcile" },
              { msg: "Collection below target in Form 2 (TZS)", type: "warning" },
            ].map((alert, i) => (
              <div key={i} className={`p-5 rounded-3xl flex items-start gap-4 ${alert.type === 'risk' ? 'bg-destructive/5 text-destructive border border-destructive/10' : 'bg-warning/5 text-warning border border-warning/10'}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${alert.type === 'risk' ? 'bg-destructive/10' : 'bg-warning/10'}`}>
                  <AlertCircle className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold leading-relaxed">{alert.msg}</p>
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* 6️⃣ Recent Transactions */}
      <div className="rounded-[3rem] border border-border bg-card shadow-sm overflow-hidden p-2">
        <div className="flex items-center justify-between px-10 py-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black font-heading">{t('recentTransactions')}</h3>
              <p className="text-sm text-muted-foreground font-medium">{t('realTimePaymentRecordings')}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={txnSearch}
                onChange={e => setTxnSearch(e.target.value)}
                placeholder={t('searchPayments')}
                className="pl-12 pr-6 py-3 rounded-2xl border border-border bg-muted/20 text-sm focus:ring-4 ring-primary/5 outline-none transition-all w-64"
              />
            </div>
            {['admin', 'director', 'bursar'].includes(user?.role || '') && (
              <button className="px-6 py-3 rounded-2xl bg-gradient-primary text-white text-sm font-black shadow-lg shadow-primary/20">{t('newRecord')} +</button>
            )}
          </div>
        </div>
        <div className="overflow-x-auto px-6 pb-6">
          <table className="sis-table w-full">
            <thead>
              <tr className="bg-muted/30">
                <th className="rounded-l-2xl">{t('txnID')}</th>
                <th>{t('student')}</th>
                <th>{t('amount')}</th>
                <th>{t('method')}</th>
                <th>{t('recordedBy')}</th>
                <th>{t('date')}</th>
                <th className="rounded-r-2xl">{t('status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {initialPayments.map(p => (
                <tr key={p.id} className="hover:bg-muted/40 transition-colors group">
                  <td className="py-6 px-4">
                    <span className="text-[10px] font-black uppercase text-primary bg-primary/10 px-3 py-1.5 rounded-xl group-hover:bg-primary group-hover:text-white transition-all">
                      {p.id}
                    </span>
                  </td>
                  <td className="py-6 px-4">
                    <div className="font-black text-sm">{p.student}</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase">{p.class}</div>
                  </td>
                  <td className="py-6 px-4 text-sm font-black text-emerald-600">{fmtK(p.amount)}</td>
                  <td className="py-6 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary/40" />
                      <span className="text-xs font-bold">{p.method}</span>
                    </div>
                  </td>
                  <td className="py-6 px-4 text-xs font-bold text-muted-foreground">{p.recorder}</td>
                  <td className="py-6 px-4 text-xs font-bold text-muted-foreground/60">{p.date}</td>
                  <td className="py-6 px-4">
                    <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${p.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-warning/10 text-warning'}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


