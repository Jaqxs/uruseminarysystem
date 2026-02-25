import { useState } from "react";
import { Search, Plus, Filter, Download, Eye, Edit, Trash2, ChevronLeft, ChevronRight, UserCheck, UserX, GraduationCap } from "lucide-react";

const students = [
  { id: "BS-2024-001", name: "Amina Hassan Mwangi", gender: "F", class: "Form 4A", dob: "15/03/2008", guardian: "Hassan Mwangi", phone: "+255 712 345 678", status: "active", fees: "paid", gpa: "3.8" },
  { id: "BS-2024-002", name: "Juma Salim Kiprotich", gender: "M", class: "Form 3B", dob: "22/07/2009", guardian: "Salim Kiprotich", phone: "+255 754 987 654", status: "active", fees: "partial", gpa: "3.2" },
  { id: "BS-2024-003", name: "Fatuma Ali Odhiambo", gender: "F", class: "Form 2A", dob: "08/11/2010", guardian: "Ali Odhiambo", phone: "+255 767 111 222", status: "active", fees: "paid", gpa: "3.9" },
  { id: "BS-2024-004", name: "David Mwenda Kamau", gender: "M", class: "Form 1C", dob: "30/01/2011", guardian: "Mwenda Kamau", phone: "+255 745 333 444", status: "new", fees: "unpaid", gpa: "N/A" },
  { id: "BS-2024-005", name: "Zainab Omar Njoroge", gender: "F", class: "Form 4B", dob: "14/05/2008", guardian: "Omar Njoroge", phone: "+255 786 555 666", status: "active", fees: "paid", gpa: "4.0" },
  { id: "BS-2024-006", name: "Baraka John Mwita", gender: "M", class: "Form 3A", dob: "19/09/2009", guardian: "John Mwita", phone: "+255 723 777 888", status: "active", fees: "partial", gpa: "2.9" },
  { id: "BS-2024-007", name: "Neema Grace Wambua", gender: "F", class: "Form 2C", dob: "25/12/2010", guardian: "Grace Wambua", phone: "+255 734 999 000", status: "active", fees: "paid", gpa: "3.5" },
  { id: "BS-2024-008", name: "Khalid Ibrahim Shayo", gender: "M", class: "Form 1A", dob: "03/04/2011", guardian: "Ibrahim Shayo", phone: "+255 756 121 314", status: "active", fees: "unpaid", gpa: "N/A" },
  { id: "BS-2024-009", name: "Rehema Paul Minja", gender: "F", class: "Form 4C", dob: "11/08/2008", guardian: "Paul Minja", phone: "+255 768 151 617", status: "active", fees: "paid", gpa: "3.6" },
  { id: "BS-2024-010", name: "Amos Elisha Tarimo", gender: "M", class: "Form 3C", dob: "07/02/2009", guardian: "Elisha Tarimo", phone: "+255 779 181 920", status: "suspended", fees: "unpaid", gpa: "2.1" },
];

const classes = ["Wote", "Form 1A", "Form 1B", "Form 1C", "Form 2A", "Form 2B", "Form 2C", "Form 3A", "Form 3B", "Form 3C", "Form 4A", "Form 4B", "Form 4C"];

export default function Students() {
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("Wote");
  const [page, setPage] = useState(1);

  const filtered = students.filter(s =>
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.id.includes(search)) &&
    (selectedClass === "Wote" || s.class === selectedClass)
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: GraduationCap, label: "Wanafunzi Wote", value: "1,248", gradient: "bg-gradient-card-blue" },
          { icon: UserCheck, label: "Wanaosoma", value: "1,186", gradient: "bg-gradient-card-green" },
          { icon: UserX, label: "Wamesimamishwa", value: "12", gradient: "bg-gradient-card-rose" },
          { icon: Plus, label: "Wapya Mwezi Huu", value: "24", gradient: "bg-gradient-card-amber" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.gradient} mb-3`}>
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
          <div className="flex-1 min-w-0 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-muted/60 border border-border/50 text-sm text-muted-foreground">
            <Search className="w-4 h-4 flex-shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Tafuta mwanafunzi kwa jina au nambari..."
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <select
            value={selectedClass}
            onChange={e => setSelectedClass(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {classes.map(c => <option key={c}>{c}</option>)}
          </select>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background text-sm font-medium hover:bg-muted transition-colors">
            <Filter className="w-4 h-4" />
            Chuja
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background text-sm font-medium hover:bg-muted transition-colors">
            <Download className="w-4 h-4" />
            Pakua
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-primary text-white text-sm font-semibold shadow-md-blue hover:shadow-lg-blue transition-all hover:-translate-y-0.5">
            <Plus className="w-4 h-4" />
            Mwanafunzi Mpya
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="sis-table">
            <thead>
              <tr>
                <th>Nambari ya Mwanafunzi</th>
                <th>Jina Kamili</th>
                <th>Jinsi</th>
                <th>Darasa</th>
                <th>Mzazi/Mlezi</th>
                <th>Simu</th>
                <th>GPA</th>
                <th>Ada</th>
                <th>Hali</th>
                <th>Vitendo</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} className="transition-colors">
                  <td>
                    <span className="font-mono text-xs font-semibold text-primary bg-primary-light px-2 py-1 rounded-lg">{s.id}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {s.name.split(" ").slice(0, 2).map(n => n[0]).join("")}
                      </div>
                      <span className="font-medium text-foreground text-sm">{s.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className={s.gender === "F" ? "badge-info" : "badge-primary"}>{s.gender === "F" ? "Ke" : "Me"}</span>
                  </td>
                  <td><span className="text-sm font-medium text-foreground">{s.class}</span></td>
                  <td><span className="text-sm text-muted-foreground">{s.guardian}</span></td>
                  <td><span className="text-sm text-muted-foreground font-mono">{s.phone}</span></td>
                  <td>
                    <span className={`font-bold text-sm ${parseFloat(s.gpa) >= 3.5 ? "text-accent" : parseFloat(s.gpa) >= 2.5 ? "text-warning" : s.gpa === "N/A" ? "text-muted-foreground" : "text-destructive"}`}>
                      {s.gpa}
                    </span>
                  </td>
                  <td>
                    <span className={s.fees === "paid" ? "badge-success" : s.fees === "partial" ? "badge-warning" : "badge-danger"}>
                      {s.fees === "paid" ? "Imelipwa" : s.fees === "partial" ? "Kiasi" : "Haijalipiwa"}
                    </span>
                  </td>
                  <td>
                    <span className={
                      s.status === "active" ? "badge-success" :
                      s.status === "new" ? "badge-info" : "badge-danger"
                    }>
                      {s.status === "active" ? "Hai" : s.status === "new" ? "Mpya" : "Amesimamishwa"}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-primary-light text-muted-foreground hover:text-primary transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-accent-light text-muted-foreground hover:text-accent transition-colors">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-destructive-light text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Kuonyesha <span className="font-semibold text-foreground">{filtered.length}</span> kati ya <span className="font-semibold text-foreground">1,248</span> wanafunzi
          </p>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(Math.max(1, page - 1))} className="p-1.5 rounded-lg border border-border hover:bg-muted transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            {[1, 2, 3, "...", 125].map((p, i) => (
              <button key={i} onClick={() => typeof p === "number" && setPage(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${page === p ? "bg-primary text-white" : "hover:bg-muted text-muted-foreground"}`}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage(page + 1)} className="p-1.5 rounded-lg border border-border hover:bg-muted transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
