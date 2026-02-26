import { useState } from "react";
import { DollarSign, TrendingUp, TrendingDown, AlertCircle, CreditCard, FileText, Download, Plus, Search, Filter, Printer, MoreVertical, CheckCircle2, Wallet, ArrowUpRight, ArrowDownRight, Clock, MessageSquare, ShieldCheck, Landmark } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Cell } from "recharts";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useLanguage } from "../context/LanguageContext";

export default function Finance() {
  const { t, language } = useLanguage();

  const initialPayments = [
    { id: "TXN-001", student: "Amina Hassan", class: "Form 4A", amount: 850000, date: "25 Jun 2024", method: "M-Pesa", status: "confirmed", reference: "RF892JK9L", isNew: false },
    { id: "TXN-002", student: "Baraka Juma", class: "Form 3B", amount: 450000, date: "24 Jun 2024", method: t('bank'), status: "confirmed", reference: "BK9120LL1", isNew: false },
    { id: "TXN-003", student: "Fatuma Ali", class: "Form 2A", amount: 850000, date: "24 Jun 2024", method: "M-Pesa", status: "confirmed", reference: "RF112MM2A", isNew: false },
    { id: "TXN-004", student: "David Kamau", class: "Form 1C", amount: 200000, date: "23 Jun 2024", method: t('cash'), status: "pending", reference: "--", isNew: false },
    { id: "TXN-005", student: "Zainab Omar", class: "Form 4B", amount: 850000, date: "22 Jun 2024", method: "M-Pesa", status: "confirmed", reference: "RF002PP3Q", isNew: false },
    { id: "TXN-006", student: "Grace Ndugu", class: "Form 2C", amount: 350000, date: "21 Jun 2024", method: t('bank'), status: "confirmed", reference: "BK882XX2Y", isNew: false },
  ];

  const feeStructure = [
    { class: "Form 1", tuition: 650000, activity: 80000, exam: 50000, total: 780000, students: 320 },
    { class: "Form 2", tuition: 700000, activity: 80000, exam: 55000, total: 835000, students: 280 },
    { class: "Form 3", tuition: 750000, activity: 80000, exam: 60000, total: 890000, students: 310 },
    { class: "Form 4", tuition: 800000, activity: 80000, exam: 70000, total: 950000, students: 338 },
  ];

  const outstanding = [
    { student: "Khalid Ibrahim", class: "Form 1A", balance: 650000, dueDate: "01 Jul 2024", days: 5, urgency: "medium" },
    { student: "Amos Tarimo", class: "Form 3C", balance: 890000, dueDate: "15 Jun 2024", days: 15, urgency: "high" },
    { student: "Neema Grace", class: "Form 2C", balance: 420000, dueDate: "01 Jul 2024", days: 5, urgency: "medium" },
    { student: "Rehema Paul", class: "Form 4C", balance: 200000, dueDate: "25 Jun 2024", days: 1, urgency: "low" },
  ];

  const [payments, setPayments] = useState(initialPayments);
  const [txnSearch, setTxnSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newPayment, setNewPayment] = useState({
    student: "", class: "Form 1A", amount: "", method: "M-Pesa", date: new Date().toLocaleDateString('en-GB')
  });

  const monthlyData = [
    { month: "Jan", collected: 12500000, target: 14000000, outstanding: 1500000 },
    { month: "Feb", collected: 13200000, target: 14000000, outstanding: 800000 },
    { month: "Mar", collected: 14800000, target: 14000000, outstanding: 200000 },
    { month: "Apr", collected: 11900000, target: 14000000, outstanding: 2100000 },
    { month: language === 'sw' ? "Mei" : "May", collected: 15200000, target: 14000000, outstanding: 0 },
    { month: "Jun", collected: 16100000, target: 14000000, outstanding: 0 },
  ];

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry = {
      id: `TXN-${Math.floor(Math.random() * 900) + 100}`,
      ...newPayment,
      amount: parseInt(newPayment.amount),
      status: "confirmed" as const,
      reference: Math.random().toString(36).substring(7).toUpperCase(),
      isNew: true
    };
    setPayments([entry, ...payments as any]);
    setIsAddOpen(false);
    toast.success(`${t('paidStudents')} ${newPayment.student} ${t('paymentReceived')}`);
    setNewPayment({ student: "", class: "Form 1A", amount: "", method: "M-Pesa", date: new Date().toLocaleDateString('en-GB') });

    // Remove highlight after 3 seconds
    setTimeout(() => {
      setPayments(current => current.map(p => p.id === entry.id ? { ...p, isNew: false } : p));
    }, 3000);
  };

  const filteredPayments = payments.filter(p =>
    p.student.toLowerCase().includes(txnSearch.toLowerCase()) ||
    p.id.toLowerCase().includes(txnSearch.toLowerCase())
  );

  function fmtK(n: number) {
    return `TSh ${n.toLocaleString()}`;
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Stats Board */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: `${t('revenueMonth')} Jun`, value: "TSh 16.1M", sub: `+8.7% ${t('vsLastMonth')}`, gradient: "bg-gradient-card-blue", icon: DollarSign },
          { label: t('paidStudents'), value: "1,181", sub: `94.6% ${t('ofStudents')}`, gradient: "bg-gradient-card-green", icon: CheckCircle2 },
          { label: t('outstandingFees'), value: "TSh 4.2M", sub: t('outstandingFees'), gradient: "bg-gradient-card-rose", icon: AlertCircle },
          { label: t('annualTarget'), value: "TSh 83.7M", sub: `93% ${language === 'sw' ? 'Ishatimia' : 'Completed'}`, gradient: "bg-gradient-card-amber", icon: TrendingUp },
        ].map((s, i) => (
          <div key={i} onClick={() => toast.info(`${t('loadingReport')} ${s.label.toLowerCase()}...`)} className="stat-card hover:shadow-xl transition-all cursor-pointer group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.gradient} mb-3 group-hover:scale-110 transition-transform`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold font-heading text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Analytics Card */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
            <div>
              <h3 className="text-lg font-bold font-heading text-foreground">{t('feeCollections')}</h3>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{t('monthlyRevenueTrend')}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => toast.info(t('printingStats'))} className="p-2 rounded-lg bg-background border border-border hover:bg-muted text-muted-foreground transition-all">
                <Printer className="w-4 h-4" />
              </button>
              <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-primary text-white text-sm font-semibold shadow-md-blue hover:shadow-lg-blue transition-all">
                    <Plus className="w-4 h-4" /> {t('recordPayment')}
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-md rounded-3xl p-8 text-foreground">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold font-heading">{t('newFeeRecord')}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handlePaymentSubmit} className="space-y-4 mt-4">
                    <div>
                      <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">{t('studentName')}</label>
                      <Input required value={newPayment.student} onChange={e => setNewPayment({ ...newPayment, student: e.target.value })} placeholder={t('fullName')} className="rounded-xl border-border bg-background" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">{t('amountTSh')}</label>
                        <Input type="number" required value={newPayment.amount} onChange={e => setNewPayment({ ...newPayment, amount: e.target.value })} className="rounded-xl border-border bg-background" />
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">{t('paymentMethod')}</label>
                        <select value={newPayment.method} onChange={e => setNewPayment({ ...newPayment, method: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm text-foreground">
                          <option value="M-Pesa">{t('mpesa')}</option>
                          <option value="Benki">{t('bank')}</option>
                          <option value="Pesa Taslimu">{t('cash')}</option>
                        </select>
                      </div>
                    </div>
                    <DialogFooter className="mt-6">
                      <button type="submit" className="w-full py-3 rounded-2xl bg-gradient-primary text-white font-bold shadow-md-blue hover:shadow-lg-blue transition-all">
                        {t('addPayment')}
                      </button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="p-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 600, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} dy={10} />
                <YAxis tick={{ fontSize: 11, fontWeight: 600, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000000).toFixed(0)}M`} dx={-10} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px" }}
                />
                <Area type="monotone" dataKey="collected" stroke="hsl(var(--primary))" strokeWidth={3} fill="url(#areaGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fee Structure */}
        <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-muted/20">
            <h3 className="text-lg font-bold font-heading text-foreground">{t('feeStructure')}</h3>
            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{t('academicYear')} 2024/2025</p>
          </div>
          <div className="p-4 space-y-3">
            {feeStructure.map((f, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border/50 hover:bg-muted/30 transition-colors">
                <div>
                  <p className="text-sm font-bold text-foreground">{language === 'sw' ? f.class.replace('Form', 'Darasa la') : f.class}</p>
                  <p className="text-[10px] text-muted-foreground">{f.students} {t('studentsCountLabel')}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">{fmtK(f.total)}</p>
                  <p className="text-[9px] text-muted-foreground uppercase font-semibold">{t('perTerm')}</p>
                </div>
              </div>
            ))}
            <button className="w-full py-2.5 mt-2 rounded-xl border border-dashed border-border text-xs font-bold text-muted-foreground hover:bg-muted transition-colors">
              {t('editStructure')}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions Table */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
            <h3 className="text-lg font-bold font-heading text-foreground">{t('recentTransactions')}</h3>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background border border-border">
              <Search className="w-3.5 h-3.5 text-muted-foreground" />
              <input
                value={txnSearch}
                onChange={e => setTxnSearch(e.target.value)}
                placeholder={t('search')}
                className="bg-transparent outline-none text-xs w-32"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="sis-table">
              <thead>
                <tr>
                  <th>{t('transactionID')}</th>
                  <th>{t('studentName')}</th>
                  <th>{t('amountLabel')}</th>
                  <th>{t('method')}</th>
                  <th>{t('date')}</th>
                  <th>{t('status')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map(p => (
                  <tr key={p.id} className="hover:bg-muted/30">
                    <td><span className="text-[10px] font-bold text-primary bg-primary-light px-2 py-1 rounded-lg">{p.id}</span></td>
                    <td><span className="text-sm font-semibold">{p.student}</span></td>
                    <td><span className="text-sm font-bold text-success">{fmtK(p.amount)}</span></td>
                    <td><span className="text-xs text-muted-foreground">{p.method}</span></td>
                    <td><span className="text-xs text-muted-foreground">{p.date}</span></td>
                    <td>
                      <span className={p.status === 'confirmed' ? 'badge-success' : 'badge-warning'}>
                        {p.status === 'confirmed' ? t('confirmed') : t('pending')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Debtors List */}
        <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
            <h3 className="text-lg font-bold font-heading text-rose-500 uppercase tracking-tight">{t('debtors')}</h3>
            <button onClick={() => toast.success(t('remindersSent'))} className="text-[10px] font-bold bg-rose-500 text-white px-3 py-1.5 rounded-lg hover:bg-rose-600 transition-colors">
              {t('remindAll')}
            </button>
          </div>
          <div className="p-4 space-y-3">
            {outstanding.map((o, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl border-l-4 border-l-rose-500 bg-muted/20 hover:bg-muted/30 transition-colors">
                <div>
                  <p className="text-sm font-bold text-foreground">{o.student}</p>
                  <p className="text-[10px] text-muted-foreground uppercase">{o.class} • -{o.days} {t('days')}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-rose-600">{fmtK(o.balance)}</p>
                  <button onClick={() => toast.info(`SMS inatumwa kwa ${o.student.split(" ")[0]}...`)} className="text-[9px] font-black text-white bg-foreground px-2 py-1 rounded-md mt-1">
                    {t('remindSMS')}
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white text-center">
              <p className="text-[10px] font-bold uppercase opacity-80">{t('totalDebt')}</p>
              <h4 className="text-xl font-bold">TSh 4.2M</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


