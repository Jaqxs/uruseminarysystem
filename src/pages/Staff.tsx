import { Briefcase, Plus, Search, Mail, Phone, Star } from "lucide-react";

const staff = [
  { id: "ST-001", name: "John Kamau", role: "Mwalimu", dept: "Hisabati", phone: "+255 712 111 222", email: "j.kamau@bender.ac.tz", status: "active", exp: "8 miaka", rating: 4.8 },
  { id: "ST-002", name: "Grace Mwamba", role: "Mwalimu", dept: "Kiingereza", phone: "+255 754 333 444", email: "g.mwamba@bender.ac.tz", status: "active", exp: "5 miaka", rating: 4.6 },
  { id: "ST-003", name: "David Osei", role: "Mwalimu", dept: "Sayansi", phone: "+255 767 555 666", email: "d.osei@bender.ac.tz", status: "active", exp: "12 miaka", rating: 4.9 },
  { id: "ST-004", name: "Amina Juma", role: "Mwalimu", dept: "Kiswahili", phone: "+255 745 777 888", email: "a.juma@bender.ac.tz", status: "active", exp: "6 miaka", rating: 4.7 },
  { id: "ST-005", name: "Hassan Mrisho", role: "Mkurugenzi", dept: "Utawala", phone: "+255 786 999 000", email: "h.mrisho@bender.ac.tz", status: "active", exp: "15 miaka", rating: 4.9 },
  { id: "ST-006", name: "Fatuma Ally", role: "Afisa Fedha", dept: "Fedha", phone: "+255 723 121 314", email: "f.ally@bender.ac.tz", status: "active", exp: "4 miaka", rating: 4.5 },
  { id: "ST-007", name: "Baraka Shayo", role: "Mwalimu", dept: "Jiografia", phone: "+255 734 151 617", email: "b.shayo@bender.ac.tz", status: "leave", exp: "3 miaka", rating: 4.3 },
  { id: "ST-008", name: "Neema Grace", role: "Mwalimu", dept: "Baiolojia", phone: "+255 756 181 920", email: "n.grace@bender.ac.tz", status: "active", exp: "7 miaka", rating: 4.7 },
];

export default function Staff() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Walimu Wote", value: "52", gradient: "bg-gradient-card-blue" },
          { label: "Watumishi", value: "37", gradient: "bg-gradient-card-green" },
          { label: "Likizoni", value: "4", gradient: "bg-gradient-card-amber" },
          { label: "Nafasi Wazi", value: "3", gradient: "bg-gradient-card-rose" },
        ].map(s => (
          <div key={s.label} className="stat-card text-center">
            <div className={`w-10 h-10 rounded-xl ${s.gradient} mx-auto mb-3`} />
            <p className="text-2xl font-bold font-heading text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-border">
          <div className="flex-1 min-w-0 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-muted/60 border border-border/50 text-sm text-muted-foreground">
            <Search className="w-4 h-4 flex-shrink-0" />
            <input placeholder="Tafuta mfanyakazi..." className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-primary text-white text-sm font-semibold shadow-md-blue">
            <Plus className="w-4 h-4" /> Mfanyakazi Mpya
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {staff.map(s => (
            <div key={s.id} className="rounded-2xl border border-border p-5 hover:shadow-md-blue transition-all hover:-translate-y-0.5 bg-card">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center text-white font-bold flex-shrink-0">
                  {s.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-foreground truncate font-heading">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.role} • {s.dept}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-warning fill-warning" />
                    <span className="text-xs font-semibold text-warning">{s.rating}</span>
                    <span className="text-[10px] text-muted-foreground">• {s.exp}</span>
                  </div>
                </div>
                <span className={s.status === "active" ? "badge-success" : "badge-warning"}>
                  {s.status === "active" ? "Hai" : "Likizo"}
                </span>
              </div>
              <div className="space-y-1.5 border-t border-border pt-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Phone className="w-3 h-3" /> {s.phone}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Mail className="w-3 h-3" /> {s.email}
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 py-2 rounded-xl text-xs font-semibold bg-primary-light text-primary hover:bg-primary hover:text-white transition-colors">Wasiliana</button>
                <button className="flex-1 py-2 rounded-xl text-xs font-semibold bg-muted text-foreground hover:bg-muted-foreground/20 transition-colors">Maelezo</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
