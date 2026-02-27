import { useState } from "react";
import {
  Briefcase, Plus, Search, Mail, Phone, Star, Filter,
  MoreVertical, Building2, Calendar, DollarSign,
  CheckCircle2, XCircle, Clock, TrendingUp, Download,
  UserCheck, UserMinus, FileText, LayoutDashboard, History, ShieldAlert, UserCog, BadgeCheck
} from "lucide-react";
import { useSisData, Staff as StaffType } from "@/hooks/use-sis-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useLanguage } from "../context/LanguageContext";

export default function Staff() {
  const { t } = useLanguage();
  const { staff, addStaff } = useSisData();
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("records"); // records, leave, payroll
  const [viewingStaff, setViewingStaff] = useState<StaffType | null>(null);
  const [activeStaffTab, setActiveStaffTab] = useState('profile');

  const [newMember, setNewMember] = useState({
    name: "", role: t('teacherRole'), dept: "Science", phone: "", email: "", status: "active", exp: `1 ${t('year')}`, rating: 5.0
  });

  const filtered = staff.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.dept.toLowerCase().includes(search.toLowerCase()) ||
    s.role.toLowerCase().includes(search.toLowerCase())
  );

  const leaveRequests = [
    { name: "John Kamau", reason: "Sick Leave", duration: "3 Days", start: "12 Jul", status: "pending" },
    { name: "Grace Mwamba", reason: "Personal Matters", duration: "1 Day", start: "15 Jul", status: "pending" },
    { name: "Amos Tarimo", reason: "Paternity Leave", duration: "7 Days", start: "01 Aug", status: "approved" },
  ];

  const payrollData = [
    { name: "John Kamau", salary: "1,200,000", lastPaid: "28 Jun 2024", status: "paid" },
    { name: "Grace Mwamba", salary: "1,150,000", lastPaid: "28 Jun 2024", status: "paid" },
    { name: "Fatuma Ali", salary: "950,000", lastPaid: "28 Jun 2024", status: "paid" },
    { name: "Baraka Shayo", salary: "950,000", lastPaid: "25 May 2024", status: "pending" },
  ];

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStaff(newMember);
    setIsAddOpen(false);
    setNewMember({ name: "", role: t('teacherRole'), dept: "Science", phone: "", email: "", status: "active", exp: `1 ${t('year')}`, rating: 5.0 });
    toast.success(t('staffAdded'));
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header with Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black font-heading text-foreground">{t('staff')}</h2>
          <p className="text-sm text-muted-foreground">{t('staffSubtitle')}</p>
        </div>
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-muted/30 border border-border w-fit backdrop-blur-sm">
          {["records", "leave", "payroll"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === tab
                ? "bg-white text-primary shadow-md translate-y-[-1px]"
                : "text-muted-foreground hover:bg-white/50"
                }`}
            >
              {tab === 'records' ? t('staffMembers') : tab === 'leave' ? t('leaveManagement') : t('payroll')}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "records" && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: t('staffMembers'), value: staff.length, gradient: "bg-gradient-card-blue", icon: Briefcase },
              { label: t('departments'), value: new Set(staff.map(s => s.dept)).size, gradient: "bg-gradient-card-green", icon: Building2 },
              { label: t('onLeave'), value: staff.filter(s => s.status === 'leave').length, gradient: "bg-gradient-card-amber", icon: Calendar },
              { label: t('staffAttendance'), value: "98%", gradient: "bg-gradient-card-purple", icon: UserCheck },
            ].map((s, i) => (
              <div key={i} onClick={() => toast.info(`${t('loadingStaffDetail')} ${s.label.toLowerCase()}...`)} className="stat-card hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.gradient} mb-3 group-hover:scale-110 transition-transform shadow-sm`}>
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold font-heading text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
            <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-border bg-muted/20">
              <div className="flex-1 min-w-[200px] flex items-center gap-2 px-3 py-2.5 rounded-xl bg-background border border-border/50 text-sm shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={t('searchStaff')}
                  className="flex-1 bg-transparent outline-none text-foreground text-xs font-medium"
                />
              </div>

              <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-primary text-white text-xs font-bold shadow-md-blue hover:shadow-lg-blue transition-all active:scale-95 leading-none">
                    <Plus className="w-4 h-4" /> {t('newStaff')}
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-lg rounded-[2rem] p-8 border-border/50 shadow-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold font-heading">{t('registerNewStaff')}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddSubmit} className="space-y-4 mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="text-[10px] font-bold uppercase text-muted-foreground mb-1 block tracking-wider">{t('fullName')}</label>
                        <Input required value={newMember.name} onChange={e => setNewMember({ ...newMember, name: e.target.value })} className="rounded-xl border-border bg-background focus:ring-primary/20" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-muted-foreground mb-1 block tracking-wider">{t('role')}</label>
                        <Input required value={newMember.role} onChange={e => setNewMember({ ...newMember, role: e.target.value })} className="rounded-xl border-border bg-background focus:ring-primary/20" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-muted-foreground mb-1 block tracking-wider">{t('department')}</label>
                        <Input required value={newMember.dept} onChange={e => setNewMember({ ...newMember, dept: e.target.value })} className="rounded-xl border-border bg-background focus:ring-primary/20" />
                      </div>
                      <div className="col-span-2">
                        <label className="text-[10px] font-bold uppercase text-muted-foreground mb-1 block tracking-wider">{t('email')}</label>
                        <Input type="email" required value={newMember.email} onChange={e => setNewMember({ ...newMember, email: e.target.value })} placeholder="name@bendel.ac.tz" className="rounded-xl border-border bg-background focus:ring-primary/20" />
                      </div>
                    </div>
                    <DialogFooter className="mt-8">
                      <button type="submit" className="w-full py-3 rounded-2xl bg-gradient-primary text-white font-bold shadow-md hover:shadow-lg transition-all active:scale-95">
                        {t('addStaff')}
                      </button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {filtered.map(s => (
                <div key={s.id} className="group relative glass-card p-6 rounded-[2rem] hover:shadow-xl hover:shadow-primary/5 transition-all hover:-translate-y-1">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center text-white text-xl font-bold shadow-md group-hover:scale-110 transition-transform">
                        {s.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${s.status === 'active' ? 'bg-success' : 'bg-warning'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-foreground truncate font-heading group-hover:text-primary transition-colors leading-tight">{s.name}</h3>
                      <p className="text-[10px] font-bold text-muted-foreground/80 uppercase tracking-wider mt-0.5">{s.role} • {s.dept}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-all">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-2xl p-2 border-border/50 shadow-xl">
                        <DropdownMenuItem onClick={() => toast.info(`${t('editProfile')}...`)} className="rounded-xl px-4 py-2 text-xs font-bold">{t('editProfile')}</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.warning(t('deactivateStaffConfirm'))} className="rounded-xl px-4 py-2 text-xs font-bold text-destructive">{t('deactivate')}</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-muted/30 rounded-2xl p-3 border border-border/10">
                      <p className="text-[9px] font-black uppercase text-muted-foreground/50 tracking-widest mb-1">{t('experience')}</p>
                      <p className="text-xs font-bold text-foreground">{s.exp}</p>
                    </div>
                    <div className="bg-muted/30 rounded-2xl p-3 border border-border/10">
                      <p className="text-[9px] font-black uppercase text-muted-foreground/50 tracking-widest mb-1">{t('rating')}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <p className="text-xs font-bold text-foreground">{s.rating}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => toast.info(`${t('openingMessageWindow')} ${s.name.split(" ")[0]}...`)} className="flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-primary text-white shadow-md shadow-primary/10 hover:shadow-lg transition-all active:scale-95 leading-none">
                      {t('message')}
                    </button>
                    <button onClick={() => setViewingStaff(s)} className="flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-muted text-foreground hover:bg-muted-foreground/10 transition-all active:scale-95 leading-none">
                      {t('viewProfile')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* View Staff Detailed Dialog */}
      <Dialog open={!!viewingStaff} onOpenChange={() => { setViewingStaff(null); setActiveStaffTab('profile'); }}>
        <DialogContent className="max-w-xl rounded-[2.5rem] p-0 border-none bg-card shadow-2xl overflow-hidden">
          {viewingStaff && (
            <div className="flex flex-col h-full">
              {/* Header Banner */}
              <div className="bg-gradient-hero p-8 text-white relative">
                <div className="relative z-10 flex items-center gap-6">
                  <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-black shadow-xl ring-4 ring-white/10 text-white">
                    {viewingStaff.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black font-heading mb-1 text-white">{viewingStaff.name}</h3>
                    <div className="flex items-center gap-2 opacity-80">
                      <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-lg">{viewingStaff.role}</span>
                      <span className="text-xs font-bold">{viewingStaff.dept}</span>
                    </div>
                  </div>
                </div>
                {/* Tabs Navigation */}
                <div className="flex items-center gap-1 mt-8 bg-black/10 p-1.5 rounded-2xl w-fit">
                  {[
                    { id: 'profile', icon: UserCog, label: 'Profile' },
                    { id: 'performance', icon: BadgeCheck, label: 'Performance' },
                    { id: 'contract', icon: FileText, label: 'Contract' }
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setActiveStaffTab(t.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${activeStaffTab === t.id ? 'bg-white text-primary shadow-lg' : 'hover:bg-white/10 text-white/70'}`}
                    >
                      <t.icon className="w-3.5 h-3.5" />
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-8 max-h-[400px] overflow-y-auto sis-scrollbar">
                {activeStaffTab === 'profile' && (
                  <div className="grid grid-cols-2 gap-6 animate-fade-in">
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">{t('email')}</p>
                        <p className="text-sm font-bold text-foreground">{viewingStaff.email}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">{t('phoneNumber')}</p>
                        <p className="text-sm font-bold text-foreground">{viewingStaff.phone}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Experience</p>
                        <p className="text-sm font-bold text-foreground">{viewingStaff.exp}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Status</p>
                        <span className={`badge-success px-3 uppercase text-[9px] font-black`}>{viewingStaff.status}</span>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Performance Rating</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <p className="text-xl font-black">{viewingStaff.rating}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeStaffTab === 'performance' && (
                  <div className="space-y-4 animate-fade-in">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Annual Reviews History</p>
                    <div className="space-y-2">
                      {[
                        { year: '2023', score: '4.8/5.0', comm: 'Excellent curriculum delivery and student engagement.', status: 'Exceeds' },
                        { year: '2022', score: '4.5/5.0', comm: 'Demonstrated strong leadership in department projects.', status: 'Promoted' }
                      ].map((p, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-muted/30 border border-border/40">
                          <div className="flex justify-between items-start mb-2">
                            <p className="text-sm font-black">Review Year: {p.year}</p>
                            <span className="text-[9px] font-black uppercase text-primary bg-primary/5 px-2 py-1 rounded-lg border border-primary/10">{p.status}</span>
                          </div>
                          <p className="text-xs text-muted-foreground font-medium italic">"{p.comm}"</p>
                          <p className="text-[10px] font-black text-foreground mt-2 uppercase tracking-tight">Rating Score: {p.score}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeStaffTab === 'contract' && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-muted/30 border border-border/40">
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Employment Type</p>
                        <p className="text-sm font-bold uppercase">Permanent</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-muted/30 border border-border/40">
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Join Date</p>
                        <p className="text-sm font-bold uppercase">12 Jan 2018</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-rose-500/5 border border-dashed border-rose-500/30">
                      <p className="text-[10px] font-black uppercase text-rose-600 tracking-widest mb-1">Contract Expiration</p>
                      <p className="text-sm font-black text-rose-600 uppercase">31 Dec 2026 (Renewable)</p>
                    </div>
                    <button onClick={() => toast.info('Opening document...')} className="w-full py-4 rounded-2xl bg-muted/50 border border-border flex items-center justify-center gap-3 hover:bg-muted transition-all group">
                      <FileText className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Download Signed Contract (PDF)</span>
                    </button>
                  </div>
                )}
              </div>
              <div className="p-6 border-t border-border bg-muted/10 flex justify-end gap-3">
                <button onClick={() => toast.info('Opening Payroll records...')} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted border border-border text-[10px] font-black uppercase hover:bg-muted/80 transition-all">
                  <DollarSign className="w-4 h-4" /> View Payslips
                </button>
                <button onClick={() => setViewingStaff(null)} className="px-6 py-2 rounded-xl bg-foreground text-background text-[10px] font-black uppercase hover:opacity-90 transition-all">
                  Close
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {activeTab === "leave" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-[2rem] overflow-hidden">
              <div className="px-8 py-6 border-b border-border bg-muted/20 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black font-heading text-foreground">{t('leaveRequests')}</h3>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Review pending applications</p>
                </div>
                <button className="p-2 rounded-xl bg-background border border-border text-muted-foreground hover:bg-muted transition-all">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
              <div className="divide-y divide-border/20">
                {leaveRequests.map((req, i) => (
                  <div key={i} className="p-6 flex items-center justify-between hover:bg-muted/10 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold shadow-sm">
                        {req.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">{req.name}</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase">{req.reason} • {req.duration}</p>
                        <p className="text-[9px] font-bold text-primary mt-1">Starts: {req.start}</p>
                      </div>
                    </div>
                    {req.status === 'pending' ? (
                      <div className="flex gap-2">
                        <button onClick={() => toast.success(t('approve'))} className="p-2 rounded-xl bg-success/10 text-success hover:bg-success hover:text-white transition-all shadow-sm">
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => toast.error(t('decline'))} className="p-2 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-all shadow-sm">
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="px-3 py-1.5 rounded-full bg-success/10 text-success text-[10px] font-black uppercase tracking-widest">
                        {req.status}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-[2rem] h-fit">
            <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Leave Summary</h4>
            <div className="space-y-4">
              {[
                { label: "Annual Leave Taken", value: "45 Days", icon: Calendar, color: "text-blue-500" },
                { label: "Sick Leave Taken", value: "12 Days", icon: Clock, color: "text-rose-500" },
                { label: "Staff Available", value: "38/42", icon: UserCheck, color: "text-success" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-border/10">
                  <div className={`p-2 rounded-xl bg-white shadow-sm ${s.color}`}>
                    <s.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mb-0.5">{s.label}</p>
                    <p className="text-sm font-black text-foreground">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "payroll" && (
        <div className="space-y-6">
          <div className="glass-card rounded-[2rem] overflow-hidden">
            <div className="px-8 py-6 border-b border-border bg-muted/20 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black font-heading text-foreground">{t('payroll')}</h3>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Termly Salary Distribution Management</p>
              </div>
              <button onClick={() => toast.info("Downloading CSV...")} className="px-4 py-2 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-md-blue hover:scale-105 transition-all leading-none">
                <Download className="w-4 h-4 inline mr-2" /> Export
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-muted/10">
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('fullName')}</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('salary')} (TSh)</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('lastPaid')}</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('status')}</th>
                    <th className="px-8 py-4 text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  {payrollData.map((p, i) => (
                    <tr key={i} className="hover:bg-muted/5 transition-colors">
                      <td className="px-8 py-5 font-bold text-sm text-foreground">{p.name}</td>
                      <td className="px-8 py-5 text-sm font-black text-primary">{p.salary}</td>
                      <td className="px-8 py-5 text-xs text-muted-foreground font-medium">{p.lastPaid}</td>
                      <td className="px-8 py-5">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${p.status === 'paid' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                          }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className="p-1.5 rounded-lg hover:bg-primary/10 text-primary transition-all">
                          <FileText className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
