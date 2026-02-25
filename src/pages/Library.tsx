import { BookOpen, Search, Plus, RotateCcw } from "lucide-react";

const books = [
  { id: "LIB-001", title: "Mathematics Form 4", author: "TIE Tanzania", copies: 45, available: 32, category: "Hisabati", status: "available" },
  { id: "LIB-002", title: "English Grammar Advanced", author: "Oxford Press", copies: 38, available: 0, category: "Kiingereza", status: "all-borrowed" },
  { id: "LIB-003", title: "Biology Practical Guide", author: "Longman EA", copies: 30, available: 18, category: "Baiolojia", status: "available" },
  { id: "LIB-004", title: "History of East Africa", author: "Heinemann", copies: 25, available: 5, category: "Historia", status: "low" },
  { id: "LIB-005", title: "Physics Form 3 & 4", author: "TIE Tanzania", copies: 40, available: 22, category: "Fizikia", status: "available" },
  { id: "LIB-006", title: "Kiswahili Fasihi", author: "Ben & Co", copies: 50, available: 41, category: "Kiswahili", status: "available" },
];

const borrowed = [
  { student: "Amina Hassan", book: "Mathematics Form 4", date: "10 Jun 2024", due: "24 Jun 2024", status: "overdue" },
  { student: "Baraka Juma", book: "History of East Africa", date: "15 Jun 2024", due: "29 Jun 2024", status: "due-soon" },
  { student: "Fatuma Ali", book: "Biology Practical Guide", date: "20 Jun 2024", due: "04 Jul 2024", status: "active" },
  { student: "David Kamau", book: "Physics Form 3 & 4", date: "22 Jun 2024", due: "06 Jul 2024", status: "active" },
];

export default function Library() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Vitabu Vyote", value: "1,842", gradient: "bg-gradient-card-blue" },
          { label: "Vinavyopatikana", value: "1,204", gradient: "bg-gradient-card-green" },
          { label: "Vilivyokopwa", value: "638", gradient: "bg-gradient-card-amber" },
          { label: "Vilichelewa", value: "23", gradient: "bg-gradient-card-rose" },
        ].map(s => (
          <div key={s.label} className="stat-card text-center">
            <p className="text-2xl font-bold font-heading text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h3 className="font-bold text-foreground font-heading">Orodha ya Vitabu</h3>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-primary text-white text-sm font-semibold shadow-md-blue">
              <Plus className="w-4 h-4" /> Kitabu Kipya
            </button>
          </div>
          <div className="divide-y divide-border/40">
            {books.map(b => (
              <div key={b.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-muted/20 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-gradient-card-blue flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{b.title}</p>
                  <p className="text-xs text-muted-foreground">{b.author} • {b.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-foreground">{b.available}/{b.copies}</p>
                  <span className={b.status === "available" ? "badge-success" : b.status === "low" ? "badge-warning" : "badge-danger"} style={{ fontSize: "10px" }}>
                    {b.status === "available" ? "Inapatikana" : b.status === "low" ? "Chache" : "Imekwisha"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="font-bold text-foreground font-heading">Vitabu Vilivyokopwa</h3>
          </div>
          <div className="divide-y divide-border/40">
            {borrowed.map((b, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-3.5 hover:bg-muted/20 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center text-white text-xs font-bold">
                  {b.student.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{b.student}</p>
                  <p className="text-xs text-muted-foreground truncate">{b.book}</p>
                  <p className="text-[10px] text-muted-foreground">Inaisha: {b.due}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={b.status === "active" ? "badge-success" : b.status === "due-soon" ? "badge-warning" : "badge-danger"} style={{ fontSize: "10px" }}>
                    {b.status === "active" ? "Hai" : b.status === "due-soon" ? "Karibu Kuisha" : "Imechelewa"}
                  </span>
                  <button className="flex items-center gap-1 text-[10px] text-primary font-semibold hover:underline">
                    <RotateCcw className="w-2.5 h-2.5" /> Rudisha
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
