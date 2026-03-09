import { useState } from "react";
import {
  Search, Plus, Download, Eye, Edit, Trash2, ChevronLeft, ChevronRight,
  UserCheck, UserX, GraduationCap, History, ShieldAlert, FileText,
  LayoutDashboard, BookOpen, X, ArrowRightLeft, Calendar, Hash,
  MapPin, Phone, Mail, User, AlertTriangle, CheckCircle, Clock, FileBadge
} from "lucide-react";
import { useSisData, Student, DisciplineRecord } from "@/hooks/use-sis-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

const STREAMS = ["A", "B", "C", "D"];
const FORMS = ["Form 1", "Form 2", "Form 3", "Form 4", "Form 5", "Form 6"];
const STATUS_COLORS: Record<string, string> = {
  active: "badge-success",
  new: "badge-info",
  suspended: "badge-danger",
  transferred: "bg-orange-100 text-orange-700 rounded-full px-2 py-0.5 text-[10px] font-bold",
};
const SEVERITY_COLORS: Record<string, string> = {
  low: "bg-amber-400",
  medium: "bg-orange-500",
  high: "bg-destructive",
};

type DetailTab = "profile" | "history" | "discipline" | "attendance" | "documents" | "transfer";

export default function Students() {
  const { t } = useLanguage();
  const { students, addStudent, deleteStudent, updateStudent, addDisciplineRecord } = useSisData();

  // ── Filters ────────────────────────────────────────────────────────────
  const [search, setSearch] = useState("");
  const [filterForm, setFilterForm] = useState("All");
  const [filterStream, setFilterStream] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [page, setPage] = useState(1);
  const { user } = useAuth();
  const PER_PAGE = 8;

  // ── Dialogs ────────────────────────────────────────────────────────────
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [activeDetailTab, setActiveDetailTab] = useState<DetailTab>("profile");
  const [isDisciplineOpen, setIsDisciplineOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  // ── New Student Form ────────────────────────────────────────────────────
  const [newStudent, setNewStudent] = useState({
    name: "", gender: "M", class: "Form 1", stream: "A",
    dob: "", nationalId: "", address: "", guardian: "",
    phone: "", guardianEmail: "", joinedYear: String(new Date().getFullYear()),
    status: "new", fees: "unpaid", gpa: "N/A", attendanceRate: "N/A",
    discipline: [], academicHistory: [], documents: [] as string[],
  });

  // ── Discipline Form ─────────────────────────────────────────────────────
  const [disciplineForm, setDisciplineForm] = useState({
    date: new Date().toLocaleDateString("en-GB").replace(/\//g, "/"),
    incident: "", action: "", severity: "low" as "low" | "medium" | "high",
    reportedBy: "Class Teacher",
  });

  // ── Transfer Form ───────────────────────────────────────────────────────
  const [transferForm, setTransferForm] = useState({ class: "Form 1", stream: "A" });

  // ── Derived Data ────────────────────────────────────────────────────────
  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
    const matchForm = filterForm === "All" || s.class === filterForm;
    const matchStream = filterStream === "All" || s.stream === filterStream;
    const matchStatus = filterStatus === "All" || s.status === filterStatus;
    return matchSearch && matchForm && matchStream && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // ── Handlers ────────────────────────────────────────────────────────────
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStudent(newStudent);
    setIsAddOpen(false);
    setNewStudent({
      name: "", gender: "M", class: "Form 1", stream: "A",
      dob: "", nationalId: "", address: "", guardian: "",
      phone: "", guardianEmail: "", joinedYear: String(new Date().getFullYear()),
      status: "new", fees: "unpaid", gpa: "N/A", attendanceRate: "N/A",
      discipline: [], academicHistory: [], documents: [],
    });
  };

  const handleDisciplineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewingStudent) return;
    addDisciplineRecord(viewingStudent.id, disciplineForm);
    setIsDisciplineOpen(false);
    setDisciplineForm({ date: "", incident: "", action: "", severity: "low", reportedBy: "Class Teacher" });
  };

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewingStudent) return;
    updateStudent(viewingStudent.id, { class: transferForm.class, stream: transferForm.stream });
    toast.success(`${viewingStudent.name} amehamishwa kwenda ${transferForm.class} ${transferForm.stream}`);
    setIsTransferOpen(false);
  };

  // ── Stats ────────────────────────────────────────────────────────────────
  const stats = [
    { icon: GraduationCap, label: "Total Students", value: students.length, sub: "Enrolled", color: "bg-gradient-card-blue" },
    { icon: UserCheck, label: "Active", value: students.filter(s => s.status === "active").length, sub: "Currently studying", color: "bg-gradient-card-green" },
    { icon: UserX, label: "Suspended", value: students.filter(s => s.status === "suspended").length, sub: "Disciplinary action", color: "bg-gradient-card-rose" },
    { icon: Plus, label: "New Admissions", value: students.filter(s => s.status === "new").length, sub: "This year", color: "bg-gradient-card-amber" },
  ];

  const openStudentDetail = (s: Student, tab: DetailTab = "profile") => {
    setViewingStudent(s);
    setActiveDetailTab(tab);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="stat-card hover:shadow-xl transition-all cursor-pointer group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color} mb-3 group-hover:scale-110 transition-transform`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold font-heading text-foreground">{s.value}</p>
            <p className="text-xs font-semibold text-foreground mt-0.5">{s.label}</p>
            <p className="text-[10px] text-muted-foreground">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* ── MAIN TABLE CARD ── */}
      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 p-8 bg-muted/5 border-b border-border/40">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder={t('searchByName')}
              className="w-full pl-12 pr-6 py-3.5 rounded-2xl bg-card border border-border shadow-sm focus:ring-4 ring-primary/5 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/60 font-medium"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filterForm}
              onChange={e => { setFilterForm(e.target.value); setPage(1); }}
              className="px-4 py-3.5 rounded-2xl bg-card border border-border text-sm font-bold focus:ring-4 ring-primary/5 outline-none transition-all"
            >
              <option value="All">{t('allForms')}</option>
              {FORMS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
            <select
              value={filterStream}
              onChange={e => { setFilterStream(e.target.value); setPage(1); }}
              className="px-4 py-3.5 rounded-2xl bg-card border border-border text-sm font-bold focus:ring-4 ring-primary/5 outline-none transition-all"
            >
              <option value="All">{t('allStreams')}</option>
              {STREAMS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select
              value={filterStatus}
              onChange={e => { setFilterStatus(e.target.value); setPage(1); }}
              className="px-4 py-3.5 rounded-2xl bg-card border border-border text-sm font-bold focus:ring-4 ring-primary/5 outline-none transition-all"
            >
              <option value="All">{t('allStatus')}</option>
              <option value="active">{t('active')}</option>
              <option value="new">{t('new')}</option>
              <option value="suspended">{t('suspended')}</option>
              <option value="transferred">{t('transferred')}</option>
            </select>
            <button onClick={() => toast.info("Exporting students list...")}
              className="flex items-center gap-2 px-6 py-3.5 bg-card border border-border rounded-2xl hover:bg-muted/50 transition-all font-black text-xs uppercase tracking-widest shadow-sm">
              <Download className="w-4 h-4" />
              {t('export')}
            </button>
            {['admin', 'director', 'teacher'].includes(user?.role || '') && (
              <button
                onClick={() => setIsAddOpen(true)}
                className="flex items-center gap-2 px-6 py-3.5 bg-gradient-primary text-white rounded-2xl hover:shadow-lg-blue transition-all active:scale-95 font-black text-xs uppercase tracking-widest shadow-md-blue"
              >
                <Plus className="w-4 h-4" />
                {t('registerStudent')}
              </button>
            )}
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="sis-table">
            <thead>
              <tr>
                <th className="rounded-l-2xl">{t('student')}</th>
                <th>{t('admissionNo')}</th>
                <th>{t('classStream')}</th>
                <th>{t('status')}</th>
                <th>{t('divisionGrade')}</th>
                <th>{t('fees')}</th>
                <th className="rounded-r-2xl">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {paginated.map(s => (
                <tr key={s.id} className="hover:bg-muted/10 transition-colors group">
                  <td className="py-4 cursor-pointer" onClick={() => openStudentDetail(s)}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center font-bold text-primary shadow-sm group-hover:scale-110 transition-transform">
                        {s.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-black text-foreground group-hover:text-primary transition-colors">{s.name}</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase">{s.gender === "M" ? t('male') : t('female')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-[11px] font-black text-muted-foreground uppercase tracking-widest leading-none">{s.id}</td>
                  <td className="text-sm font-bold text-foreground">
                    <div className="flex items-center gap-2">
                      {s.class}
                      <span className="w-6 h-6 rounded-md bg-muted border border-border flex items-center justify-center text-[10px] font-black">{s.stream}</span>
                    </div>
                  </td>
                  <td><span className={`badge-pill ${STATUS_COLORS[s.status] || "badge-muted"}`}>{t(s.status)}</span></td>
                  <td>
                    <div className="flex items-center gap-1.5">
                      <FileBadge className="w-3.5 h-3.5 text-primary" />
                      <span className="text-sm font-black text-foreground">{s.gpa}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${s.fees === "paid" ? "text-emerald-500" : "text-rose-500"}`}>
                      {s.fees === "paid" ? t('paid') : t('unpaid')}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                      <button onClick={() => openStudentDetail(s, "profile")}
                        className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors" title="View Profile">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => openStudentDetail(s, "discipline")}
                        className="p-1.5 rounded-lg hover:bg-amber-500/10 text-muted-foreground hover:text-amber-600 transition-colors" title="Discipline">
                        <ShieldAlert className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => openStudentDetail(s, "transfer")}
                        className="p-1.5 rounded-lg hover:bg-info/10 text-muted-foreground hover:text-info transition-colors" title="Transfer">
                        <ArrowRightLeft className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => { if (confirm("Delete this student?")) deleteStudent(s.id); }}
                        className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors" title="Delete">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-14 text-muted-foreground italic">
                    No student found matching the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 border-t border-border gap-4">
          <p className="text-xs text-muted-foreground">
            Showing <span className="font-bold text-foreground">{paginated.length}</span> of{" "}
            <span className="font-bold text-foreground">{filtered.length}</span> students
            {filtered.length !== students.length && ` (filtered from ${students.length})`}
          </p>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="p-1.5 rounded-lg border border-border hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => setPage(n)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${page === n ? "bg-primary text-white" : "border border-border hover:bg-muted"}`}>
                {n}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="p-1.5 rounded-lg border border-border hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          ADD STUDENT DIALOG
      ═══════════════════════════════════════════════════════ */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-2xl rounded-3xl p-0 border-none overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-primary px-8 pt-8 pb-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <DialogTitle className="text-xl font-black text-white">Register New Student</DialogTitle>
                <p className="text-white/70 text-xs mt-0.5">Admission number will be auto-generated</p>
              </div>
            </div>
            {/* Auto-admission preview */}
            <div className="mt-4 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 inline-flex items-center gap-2">
              <Hash className="w-4 h-4 text-white/70" />
              <span className="text-xs font-bold text-white/80">Next ID: </span>
              <span className="font-mono text-sm font-black text-white">BS-{new Date().getFullYear()}-{String(students.length + 1).padStart(3, "0")}</span>
            </div>
          </div>

          <form onSubmit={handleAddSubmit} className="p-8 space-y-5 max-h-[520px] overflow-y-auto sis-scrollbar">
            <div className="grid grid-cols-2 gap-4">
              {/* Biodata Section */}
              <div className="col-span-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                  <User className="w-3.5 h-3.5" /> Student Biodata
                </p>
              </div>

              <div className="col-span-2">
                <label className="label-xs">Full Name *</label>
                <Input required value={newStudent.name} onChange={e => setNewStudent({ ...newStudent, name: e.target.value })}
                  placeholder="e.g. Amin Hassan Mwangi" className="rounded-xl" />
              </div>

              <div>
                <label className="label-xs">Date of Birth</label>
                <Input type="date" value={newStudent.dob} onChange={e => setNewStudent({ ...newStudent, dob: e.target.value })}
                  className="rounded-xl" />
              </div>

              <div>
                <label className="label-xs">Gender *</label>
                <select required value={newStudent.gender} onChange={e => setNewStudent({ ...newStudent, gender: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm">
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="label-xs">National ID / Birth Cert No.</label>
                <Input value={newStudent.nationalId} onChange={e => setNewStudent({ ...newStudent, nationalId: e.target.value })}
                  placeholder="e.g. 20080315-00001-00001-1" className="rounded-xl" />
              </div>

              <div className="col-span-2">
                <label className="label-xs">Home Address</label>
                <Input value={newStudent.address} onChange={e => setNewStudent({ ...newStudent, address: e.target.value })}
                  placeholder="e.g. Kinondoni, Dar es Salaam" className="rounded-xl" />
              </div>

              {/* Class Allocation */}
              <div className="col-span-2 pt-2 border-t border-border">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5" /> Class & Stream Allocation
                </p>
              </div>

              <div>
                <label className="label-xs">Form / Year *</label>
                <select required value={newStudent.class} onChange={e => setNewStudent({ ...newStudent, class: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm">
                  {FORMS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>

              <div>
                <label className="label-xs">Stream *</label>
                <select required value={newStudent.stream} onChange={e => setNewStudent({ ...newStudent, stream: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm">
                  {STREAMS.map(s => <option key={s} value={s}>Stream {s}</option>)}
                </select>
              </div>

              <div>
                <label className="label-xs">Year Joined</label>
                <Input type="number" value={newStudent.joinedYear}
                  onChange={e => setNewStudent({ ...newStudent, joinedYear: e.target.value })}
                  min="2000" max="2030" className="rounded-xl" />
              </div>

              <div>
                <label className="label-xs">Initial Status</label>
                <select value={newStudent.status} onChange={e => setNewStudent({ ...newStudent, status: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm">
                  <option value="new">New</option>
                  <option value="active">Active</option>
                </select>
              </div>

              {/* Guardian Section */}
              <div className="col-span-2 pt-2 border-t border-border">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" /> Guardian / Parent Information
                </p>
              </div>

              <div className="col-span-2">
                <label className="label-xs">Guardian / Parent Name *</label>
                <Input required value={newStudent.guardian} onChange={e => setNewStudent({ ...newStudent, guardian: e.target.value })}
                  placeholder="e.g. Hassan Mwangi" className="rounded-xl" />
              </div>

              <div>
                <label className="label-xs">Phone Number *</label>
                <Input required value={newStudent.phone} onChange={e => setNewStudent({ ...newStudent, phone: e.target.value })}
                  placeholder="+255 7XX XXX XXX" className="rounded-xl" />
              </div>

              <div>
                <label className="label-xs">Guardian Email</label>
                <Input type="email" value={newStudent.guardianEmail}
                  onChange={e => setNewStudent({ ...newStudent, guardianEmail: e.target.value })}
                  placeholder="parent@email.com" className="rounded-xl" />
              </div>

              {/* Documents */}
              <div className="col-span-2 pt-2 border-t border-border">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                  <FileBadge className="w-3.5 h-3.5" /> Required Documents
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {["Birth Certificate", "PSLE / KCPE Result", "Medical Certificate", "Transfer Letter", "Passport Photo"].map(doc => (
                    <label key={doc} className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
                      <input type="checkbox"
                        checked={newStudent.documents.includes(doc)}
                        onChange={e => {
                          const docs = e.target.checked
                            ? [...newStudent.documents, doc]
                            : newStudent.documents.filter(d => d !== doc);
                          setNewStudent({ ...newStudent, documents: docs });
                        }}
                        className="rounded border-border text-primary" />
                      {doc}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setIsAddOpen(false)}
                className="flex-1 py-3 rounded-2xl border border-border text-sm font-semibold hover:bg-muted transition-colors">
                Cancel
              </button>
              <button type="submit"
                className="flex-1 py-3 rounded-2xl bg-gradient-primary text-white font-bold shadow-md-blue hover:shadow-lg-blue transition-all">
                Register Student
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* ═══════════════════════════════════════════════════════
          VIEW STUDENT DETAIL DIALOG
      ═══════════════════════════════════════════════════════ */}
      <Dialog open={!!viewingStudent} onOpenChange={() => { setViewingStudent(null); setActiveDetailTab("profile"); }}>
        <DialogContent className="max-w-2xl rounded-[2.5rem] p-0 border-none bg-card shadow-2xl overflow-hidden">
          {viewingStudent && (() => {
            // Re-fetch live data so discipline updates show immediately
            const live = students.find(s => s.id === viewingStudent.id) ?? viewingStudent;
            return (
              <div className="flex flex-col">
                {/* Header Banner */}
                <div className="bg-gradient-primary p-8 text-white">
                  <div className="flex items-center gap-5">
                    <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-black shadow-xl ring-4 ring-white/10">
                      {live.name.split(" ").slice(0, 2).map(n => n[0]).join("")}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black font-heading">{live.name}</h3>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="font-mono text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-lg">{live.id}</span>
                        <span className="text-xs font-bold opacity-80">{live.class} – Stream {live.stream}</span>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${live.status === "active" ? "bg-emerald-400/30 text-emerald-100" : live.status === "suspended" ? "bg-red-400/30 text-red-100" : "bg-white/20 text-white/80"}`}>
                          {live.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tab Bar */}
                  <div className="flex flex-wrap items-center gap-1 mt-6 bg-black/10 p-1.5 rounded-2xl w-fit">
                    {([
                      { id: "profile", icon: LayoutDashboard, label: "Profile" },
                      { id: "history", icon: History, label: "History" },
                      { id: "attendance", icon: Calendar, label: "Attendance" },
                      { id: "discipline", icon: ShieldAlert, label: "Discipline" },
                      { id: "documents", icon: FileText, label: "Documents" },
                      { id: "transfer", icon: ArrowRightLeft, label: "Transfer" },
                    ] as { id: DetailTab; icon: any; label: string }[]).map(tab => (
                      <button key={tab.id} onClick={() => setActiveDetailTab(tab.id)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wide transition-all ${activeDetailTab === tab.id ? "bg-white text-primary shadow-lg" : "hover:bg-white/10 text-white/70"}`}>
                        <tab.icon className="w-3 h-3" />
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-8 max-h-[420px] overflow-y-auto sis-scrollbar">

                  {/* ── PROFILE TAB ── */}
                  {activeDetailTab === "profile" && (
                    <div className="space-y-5 animate-fade-in">
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { icon: Hash, label: "Admission No.", value: live.id },
                          { icon: Calendar, label: "Date of Birth", value: live.dob || "—" },
                          { icon: User, label: "Gender", value: live.gender === "M" ? "Male" : "Female" },
                          { icon: Calendar, label: "Year Joined", value: live.joinedYear },
                          { icon: MapPin, label: "Home Address", value: live.address || "—" },
                          { icon: Hash, label: "National ID", value: live.nationalId || "—" },
                          { icon: User, label: "Guardian", value: live.guardian },
                          { icon: Phone, label: "Phone", value: live.phone },
                          { icon: Mail, label: "Guardian Email", value: live.guardianEmail || "—" },
                          { icon: BookOpen, label: t('schoolGPA'), value: live.gpa },
                        ].map(field => (
                          <div key={field.label} className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-border/40">
                            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <field.icon className="w-3.5 h-3.5 text-primary" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{field.label}</p>
                              <p className="text-sm font-bold text-foreground mt-0.5">{field.value}</p>
                            </div>
                          </div>
                        ))}
                        {/* Fees */}
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-border/40">
                          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Fee Status</p>
                            <span className={`text-[10px] font-black mt-1 inline-block ${live.fees === "paid" ? "badge-success" : live.fees === "partial" ? "badge-warning" : "badge-danger"}`}>
                              {live.fees.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        {/* Attendance */}
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-border/40">
                          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Clock className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Attendance</p>
                            <p className={`text-lg font-black mt-0.5 ${live.attendanceRate === "N/A" ? "text-muted-foreground" : parseFloat(live.attendanceRate) >= 90 ? "text-emerald-600" : "text-amber-600"}`}>
                              {live.attendanceRate}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── ACADEMIC HISTORY TAB ── */}
                  {activeDetailTab === "history" && (
                    <div className="space-y-3 animate-fade-in">
                      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Academic Records History</p>
                      {live.academicHistory.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground text-xs italic">No academic records yet.</div>
                      ) : (
                        live.academicHistory.map((h, i) => (
                          <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/40 hover:border-primary/30 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <History className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-black">{h.term}</p>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase mt-0.5">
                                  {t('schoolGPA')}: <span className="text-primary">{h.gpa}</span> · Rank: {h.rank} · Attendance: {h.attendance}
                                </p>
                              </div>
                            </div>
                            <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg ${h.status === "Top Performer" || h.status === "Excellence" ? "bg-emerald-100 text-emerald-700" : h.status === "At Risk" ? "bg-red-100 text-red-700" : "bg-muted text-muted-foreground"} border border-border`}>
                              {h.status}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* ── ATTENDANCE TAB ── */}
                  {activeDetailTab === "attendance" && (
                    <div className="space-y-4 animate-fade-in">
                      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Attendance Summary</p>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { label: "Overall Rate", value: live.attendanceRate, icon: CheckCircle, color: "text-emerald-600" },
                          { label: "This Term", value: live.academicHistory[0]?.attendance ?? "N/A", icon: Calendar, color: "text-primary" },
                          { label: "Absences (Est.)", value: live.attendanceRate === "N/A" ? "N/A" : `${Math.round((1 - parseFloat(live.attendanceRate) / 100) * 200)} days`, icon: AlertTriangle, color: "text-amber-600" },
                        ].map(card => (
                          <div key={card.label} className="p-4 rounded-2xl bg-muted/30 border border-border/40 text-center">
                            <card.icon className={`w-6 h-6 mx-auto mb-2 ${card.color}`} />
                            <p className={`text-xl font-black ${card.color}`}>{card.value}</p>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1">{card.label}</p>
                          </div>
                        ))}
                      </div>

                      {/* Per-term attendance from academic history */}
                      <div className="space-y-2">
                        {live.academicHistory.map((h, i) => {
                          const pct = parseFloat(h.attendance) || 0;
                          return (
                            <div key={i} className="flex items-center gap-4">
                              <span className="text-xs font-bold w-28 text-muted-foreground">{h.term}</span>
                              <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                                <div className={`h-full rounded-full transition-all ${pct >= 90 ? "bg-emerald-500" : pct >= 75 ? "bg-amber-500" : "bg-destructive"}`}
                                  style={{ width: `${pct}%` }} />
                              </div>
                              <span className={`text-xs font-bold w-10 text-right ${pct >= 90 ? "text-emerald-600" : pct >= 75 ? "text-amber-600" : "text-destructive"}`}>
                                {h.attendance}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* ── DISCIPLINE TAB ── */}
                  {activeDetailTab === "discipline" && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Discipline Incidents Log</p>
                        <button onClick={() => setIsDisciplineOpen(true)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-700 text-[10px] font-black hover:bg-amber-500/20 transition-colors">
                          <Plus className="w-3 h-3" /> Log Incident
                        </button>
                      </div>

                      {(live.discipline ?? []).length === 0 ? (
                        <div className="p-8 rounded-3xl bg-emerald-500/5 border border-dashed border-emerald-500/30 text-center">
                          <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                          <p className="text-xs font-bold text-emerald-600 uppercase">Clear Record</p>
                          <p className="text-xs font-medium text-emerald-600/70 mt-1">Excellent conduct maintained.</p>
                        </div>
                      ) : (
                        (live.discipline ?? []).map((d, i) => (
                          <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30 border border-border/40">
                            <div className={`w-2 h-12 rounded-full flex-shrink-0 ${SEVERITY_COLORS[d.severity]}`} />
                            <div className="flex-1">
                              <p className="text-sm font-black">{d.incident}</p>
                              <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1">
                                {d.date} · {d.action}
                              </p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">Reported by: {d.reportedBy}</p>
                            </div>
                            <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg ${d.severity === "high" ? "bg-red-100 text-red-700" : d.severity === "medium" ? "bg-orange-100 text-orange-700" : "bg-amber-100 text-amber-700"}`}>
                              {d.severity}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* ── DOCUMENTS TAB ── */}
                  {activeDetailTab === "documents" && (
                    <div className="space-y-4 animate-fade-in">
                      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Student Documents</p>
                      {(live.documents ?? []).length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground text-xs italic">No documents recorded.</div>
                      ) : (
                        <div className="grid grid-cols-2 gap-3">
                          {(live.documents ?? []).map((doc, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30 border border-border/40 hover:border-primary/30 transition-colors cursor-pointer group"
                              onClick={() => toast.info(`Opening ${doc}...`)}>
                              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <FileText className="w-4 h-4 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-foreground">{doc}</p>
                                <p className="text-[10px] text-muted-foreground">Uploaded</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── CLASS TRANSFER TAB ── */}
                  {activeDetailTab === "transfer" && (
                    <div className="space-y-4 animate-fade-in">
                      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Class & Stream Allocation</p>
                      <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 flex items-center gap-4">
                        <ArrowRightLeft className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-muted-foreground">Current Placement</p>
                          <p className="text-lg font-black text-foreground">{live.class} – Stream {live.stream}</p>
                        </div>
                      </div>

                      <form onSubmit={handleTransferSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="label-xs">New Form / Year</label>
                            <select value={transferForm.class} onChange={e => setTransferForm({ ...transferForm, class: e.target.value })}
                              className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm">
                              {FORMS.map(f => <option key={f} value={f}>{f}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="label-xs">New Stream</label>
                            <select value={transferForm.stream} onChange={e => setTransferForm({ ...transferForm, stream: e.target.value })}
                              className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm">
                              {STREAMS.map(s => <option key={s} value={s}>Stream {s}</option>)}
                            </select>
                          </div>
                        </div>
                        <button type="submit"
                          className="w-full py-3 rounded-2xl bg-gradient-primary text-white text-sm font-bold shadow-md-blue hover:shadow-lg-blue transition-all">
                          Apply Transfer
                        </button>
                      </form>
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="px-8 py-5 border-t border-border bg-muted/10 flex flex-wrap justify-end gap-3">
                  <button onClick={() => toast.info("Generating Result Slip...")}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted border border-border text-[10px] font-black uppercase hover:bg-muted/80 transition-all">
                    <FileText className="w-3.5 h-3.5" /> Result Slip
                  </button>
                  <button onClick={() => toast.info("Downloading Admission Letter...")}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted border border-border text-[10px] font-black uppercase hover:bg-muted/80 transition-all">
                    <Download className="w-3.5 h-3.5" /> Admission Letter
                  </button>
                  <button onClick={() => setViewingStudent(null)}
                    className="px-6 py-2 rounded-xl bg-foreground text-background text-[10px] font-black uppercase hover:opacity-90 transition-all">
                    Close
                  </button>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* ═══════════════════════════════════════════════════════
          LOG DISCIPLINE INCIDENT DIALOG
      ═══════════════════════════════════════════════════════ */}
      <Dialog open={isDisciplineOpen} onOpenChange={setIsDisciplineOpen}>
        <DialogContent className="max-w-md rounded-3xl p-8 border-border">
          <DialogTitle className="text-lg font-black font-heading flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-500" /> Log Discipline Incident
          </DialogTitle>
          <form onSubmit={handleDisciplineSubmit} className="space-y-4 mt-4">
            <div>
              <label className="label-xs">Date</label>
              <Input type="date" required value={disciplineForm.date}
                onChange={e => setDisciplineForm({ ...disciplineForm, date: e.target.value })}
                className="rounded-xl" />
            </div>
            <div>
              <label className="label-xs">Incident Description</label>
              <Input required value={disciplineForm.incident}
                onChange={e => setDisciplineForm({ ...disciplineForm, incident: e.target.value })}
                placeholder="e.g. Late to class" className="rounded-xl" />
            </div>
            <div>
              <label className="label-xs">Action Taken</label>
              <Input required value={disciplineForm.action}
                onChange={e => setDisciplineForm({ ...disciplineForm, action: e.target.value })}
                placeholder="e.g. Verbal Warning" className="rounded-xl" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-xs">Severity</label>
                <select value={disciplineForm.severity}
                  onChange={e => setDisciplineForm({ ...disciplineForm, severity: e.target.value as "low" | "medium" | "high" })}
                  className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="label-xs">Reported By</label>
                <Input value={disciplineForm.reportedBy}
                  onChange={e => setDisciplineForm({ ...disciplineForm, reportedBy: e.target.value })}
                  className="rounded-xl" />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setIsDisciplineOpen(false)}
                className="flex-1 py-3 rounded-2xl border border-border text-sm font-semibold hover:bg-muted transition-colors">
                Cancel
              </button>
              <button type="submit"
                className="flex-1 py-3 rounded-2xl bg-amber-500 text-white font-bold hover:bg-amber-600 transition-colors">
                Log Incident
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
