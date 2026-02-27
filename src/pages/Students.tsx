import { useState } from "react";
import { Search, Plus, Filter, Download, Eye, Edit, Trash2, ChevronLeft, ChevronRight, UserCheck, UserX, GraduationCap, X, History, ShieldAlert, FileText, LayoutDashboard } from "lucide-react";
import { useSisData, Student } from "@/hooks/use-sis-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useLanguage } from "../context/LanguageContext";

export default function Students() {
  const { t, language } = useLanguage();
  const { students, addStudent, deleteStudent } = useSisData();

  const classes = [t('allClasses'), "Form 1A", "Form 1B", "Form 1C", "Form 2A", "Form 2B", "Form 2C", "Form 3A", "Form 3B", "Form 3C", "Form 4A", "Form 4B", "Form 4C"];

  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState(t('allClasses'));
  const [page, setPage] = useState(1);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [activeDetailTab, setActiveDetailTab] = useState('profile');

  const [newStudent, setNewStudent] = useState({
    name: "", gender: "M", class: "Form 1A", dob: "", guardian: "", phone: "", status: "new", fees: "unpaid", gpa: "N/A"
  });

  const filtered = students.filter(s =>
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.id.includes(search)) &&
    (selectedClass === t('allClasses') || s.class === selectedClass)
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStudent(newStudent);
    setIsAddOpen(false);
    setNewStudent({ name: "", gender: "M", class: "Form 1A", dob: "", guardian: "", phone: "", status: "new", fees: "unpaid", gpa: "N/A" });
    toast.success(t('studentRegistered'));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: GraduationCap, label: t('allStudents'), value: students.length, gradient: "bg-gradient-card-blue" },
          { icon: UserCheck, label: t('activeStudents'), value: students.filter(s => s.status === 'active').length, gradient: "bg-gradient-card-green" },
          { icon: UserX, label: t('suspendedStudents'), value: students.filter(s => s.status === 'suspended').length, gradient: "bg-gradient-card-rose" },
          { icon: Plus, label: t('newOnes'), value: students.filter(s => s.status === 'new').length, gradient: "bg-gradient-card-amber" },
        ].map(s => (
          <div key={s.label} onClick={() => toast.info(`${t('loadingReport')} ${s.label.toLowerCase()}...`)} className="stat-card hover:shadow-xl transition-all cursor-pointer group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.gradient} mb-3 group-hover:scale-110 transition-transform`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold font-heading text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-border">
          <div className="flex-1 min-w-[200px] flex items-center gap-2 px-3 py-2.5 rounded-xl bg-muted/60 border border-border/50 text-sm text-muted-foreground focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <Search className="w-4 h-4 flex-shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('searchStudent')}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <select
            value={selectedClass}
            onChange={e => setSelectedClass(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {classes.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button
            onClick={() => toast.info(t('exportingStudents'))}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background text-sm font-medium hover:bg-muted transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">{t('download')}</span>
          </button>

          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-primary text-white text-sm font-semibold shadow-md-blue hover:shadow-lg-blue transition-all hover:-translate-y-0.5">
                <Plus className="w-4 h-4" />
                {t('newStudent')}
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-lg rounded-3xl p-8 border-border">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold font-heading">{t('registerNewStudent')}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">{t('fullName')}</label>
                    <Input required value={newStudent.name} onChange={e => setNewStudent({ ...newStudent, name: e.target.value })} placeholder="e.g. Amina Hassan" className="rounded-xl" />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">{t('gender')}</label>
                    <select value={newStudent.gender} onChange={e => setNewStudent({ ...newStudent, gender: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm">
                      <option value="M">{t('male')}</option>
                      <option value="F">{t('female')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">{t('class')}</label>
                    <select value={newStudent.class} onChange={e => setNewStudent({ ...newStudent, class: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm">
                      {classes.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">{t('guardian')}</label>
                    <Input required value={newStudent.guardian} onChange={e => setNewStudent({ ...newStudent, guardian: e.target.value })} placeholder="e.g. Hassan Mwangi" className="rounded-xl" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">{t('phoneNumber')}</label>
                    <Input required value={newStudent.phone} onChange={e => setNewStudent({ ...newStudent, phone: e.target.value })} placeholder="+255..." className="rounded-xl" />
                  </div>
                </div>
                <DialogFooter className="mt-6">
                  <button type="submit" className="w-full py-3 rounded-2xl bg-gradient-primary text-white font-bold shadow-md-blue hover:shadow-lg-blue transition-all">
                    {t('registerStudent')}
                  </button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="sis-table">
            <thead>
              <tr>
                <th>{t('studentID')}</th>
                <th>{t('fullName')}</th>
                <th>{t('gender')}</th>
                <th>{t('class')}</th>
                <th className="hidden lg:table-cell">{t('guardian')}</th>
                <th>{t('feesStatus')}</th>
                <th>{t('status')}</th>
                <th>{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} onClick={() => toast.info(`${t('loadingStaffProfile')} ${s.name}...`)} className="group transition-colors hover:bg-muted/30 cursor-pointer">
                  <td>
                    <span className="font-mono text-[10px] font-bold text-primary bg-primary-light px-2 py-1 rounded-lg">{s.id}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm">
                        {s.name.split(" ").slice(0, 2).map(n => n[0]).join("")}
                      </div>
                      <span className="font-semibold text-foreground text-sm truncate max-w-[150px]">{s.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className={s.gender === "F" ? "badge-info" : "badge-primary"}>
                      {s.gender === "F" ? t('female') : t('male')}
                    </span>
                  </td>
                  <td><span className="text-sm font-medium text-foreground">{s.class}</span></td>
                  <td className="hidden lg:table-cell"><span className="text-xs text-muted-foreground">{s.guardian}</span></td>
                  <td>
                    <span className={s.fees === "paid" ? "badge-success" : s.fees === "partial" ? "badge-warning" : "badge-danger"}>
                      {s.fees === "paid" ? t('paid') : s.fees === "partial" ? t('partial') : t('unpaid')}
                    </span>
                  </td>
                  <td>
                    <span className={
                      s.status === "active" ? "badge-success" :
                        s.status === "new" ? "badge-info" : "badge-danger"
                    }>
                      {s.status === "active" ? t('active') : s.status === "new" ? t('newOnes') : t('suspended')}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button onClick={(e) => { e.stopPropagation(); setViewingStudent(s); }} className="p-1.5 rounded-lg hover:bg-primary-light text-muted-foreground hover:text-primary transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); toast.success(`${t('edit')} ${s.name}...`); }} className="p-1.5 rounded-lg hover:bg-accent-light text-muted-foreground hover:text-accent transition-colors">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); deleteStudent(s.id); }} className="p-1.5 rounded-lg hover:bg-destructive-light text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-muted-foreground italic">{t('noStudentFound')}</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 border-t border-border gap-4">
          <p className="text-xs text-muted-foreground">
            {t('showing')} <span className="font-semibold text-foreground">{filtered.length}</span> {t('outOf')} <span className="font-semibold text-foreground">{students.length}</span> {t('studentsCountLabel')}
          </p>
          <div className="flex items-center gap-2">
            <button onClick={() => toast.info(t('firstPage'))} className="p-1.5 rounded-lg border border-border hover:bg-muted transition-colors opacity-50 cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-primary text-white">1</button>
            <button onClick={() => toast.info(t('noMorePages'))} className="p-1.5 rounded-lg border border-border hover:bg-muted transition-colors opacity-50 cursor-not-allowed">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* View Student Dialog */}
      <Dialog open={!!viewingStudent} onOpenChange={() => { setViewingStudent(null); setActiveDetailTab('profile'); }}>
        <DialogContent className="max-w-xl rounded-[2.5rem] p-0 border-none bg-card shadow-2xl overflow-hidden">
          {viewingStudent && (
            <div className="flex flex-col h-full">
              {/* Header Banner */}
              <div className="bg-gradient-primary p-8 text-white relative">
                <div className="relative z-10 flex items-center gap-6">
                  <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-black shadow-xl ring-4 ring-white/10">
                    {viewingStudent.name.split(" ").slice(0, 2).map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black font-heading mb-1">{viewingStudent.name}</h3>
                    <div className="flex items-center gap-2 opacity-80">
                      <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-lg">{viewingStudent.id}</span>
                      <span className="text-xs font-bold">{viewingStudent.class}</span>
                    </div>
                  </div>
                </div>
                {/* Tabs Navigation */}
                <div className="flex items-center gap-1 mt-8 bg-black/10 p-1.5 rounded-2xl w-fit">
                  {[
                    { id: 'profile', icon: LayoutDashboard, label: 'Profile' },
                    { id: 'history', icon: History, label: 'History' },
                    { id: 'discipline', icon: ShieldAlert, label: 'Discipline' }
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setActiveDetailTab(t.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${activeDetailTab === t.id ? 'bg-white text-primary shadow-lg' : 'hover:bg-white/10 text-white/70'}`}
                    >
                      <t.icon className="w-3.5 h-3.5" />
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-8 max-h-[400px] overflow-y-auto sis-scrollbar">
                {activeDetailTab === 'profile' && (
                  <div className="grid grid-cols-2 gap-6 animate-fade-in">
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Guardian Name</p>
                        <p className="text-sm font-bold text-foreground">{viewingStudent.guardian}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Contact Phone</p>
                        <p className="text-sm font-bold text-foreground">{viewingStudent.phone}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Gender</p>
                        <span className={`badge-primary px-3`}>{viewingStudent.gender === 'M' ? 'Male' : 'Female'}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Fee Status</p>
                        <span className={viewingStudent.fees === "paid" ? "badge-success px-3" : viewingStudent.fees === "partial" ? "badge-warning px-3" : "badge-danger px-3"}>
                          {viewingStudent.fees.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Current GPA</p>
                        <p className="text-xl font-black text-primary">{viewingStudent.gpa}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Status</p>
                        <span className={`badge-info px-3`}>{viewingStudent.status.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeDetailTab === 'history' && (
                  <div className="space-y-4 animate-fade-in">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Academic Records History</p>
                    <div className="space-y-2">
                      {[
                        { term: '2023 Term 3', gpa: '3.82', rank: '4/45', status: 'Promoted' },
                        { term: '2023 Term 2', gpa: '3.75', rank: '7/45', status: 'Normal' },
                        { term: '2023 Term 1', gpa: '3.90', rank: '2/48', status: 'Excellence' }
                      ].map((h, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/40">
                          <div>
                            <p className="text-sm font-black">{h.term}</p>
                            <p className="text-[10px] font-black text-primary uppercase">GPA: {h.gpa} • Rank: {h.rank}</p>
                          </div>
                          <span className="text-[9px] font-black uppercase text-muted-foreground bg-white px-2 py-1 rounded-lg border border-border">{h.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeDetailTab === 'discipline' && (
                  <div className="space-y-4 animate-fade-in">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Discipline Incidents Log</p>
                    <div className="space-y-2">
                      {[
                        { date: '12 May 2024', incident: 'Class Latency', action: 'Verbal Warning', severity: 'low' },
                        { date: '04 Mar 2024', incident: 'Uniform Violation', action: 'Written Warning', severity: 'low' }
                      ].map((d, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30 border border-border/40">
                          <div className={`w-2 h-10 rounded-full ${d.severity === 'high' ? 'bg-destructive' : 'bg-warning'}`} />
                          <div className="flex-1">
                            <p className="text-sm font-black">{d.incident}</p>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase">{d.date} • {d.action}</p>
                          </div>
                          <ShieldAlert className="w-4 h-4 text-warning opacity-40" />
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 p-6 rounded-3xl bg-emerald-500/5 border border-dashed border-emerald-500/30 text-center">
                      <p className="text-[10px] font-bold text-emerald-600 uppercase">Clear Records</p>
                      <p className="text-xs font-medium text-emerald-600/70 mt-1">Excellent conduct maintained for the current term.</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6 border-t border-border bg-muted/10 flex justify-end gap-3">
                <button onClick={() => toast.info('Generating Result Slip...')} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted border border-border text-[10px] font-black uppercase hover:bg-muted/80 transition-all">
                  <FileText className="w-4 h-4" /> Result Slip
                </button>
                <button onClick={() => setViewingStudent(null)} className="px-6 py-2 rounded-xl bg-foreground text-background text-[10px] font-black uppercase hover:opacity-90 transition-all">
                  Close
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

