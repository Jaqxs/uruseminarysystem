import { Shield, Plus, Search, User, Lock } from "lucide-react";

const users = [
  { name: "Admin Mkuu", email: "admin@bender.ac.tz", role: "Super Admin", lastLogin: "Leo, 8:32 AM", status: "active" },
  { name: "Hassan Mrisho", email: "h.mrisho@bender.ac.tz", role: "Mkurugenzi", lastLogin: "Leo, 9:15 AM", status: "active" },
  { name: "Fatuma Ally", email: "f.ally@bender.ac.tz", role: "Afisa Fedha", lastLogin: "Jana, 3:22 PM", status: "active" },
  { name: "John Kamau", email: "j.kamau@bender.ac.tz", role: "Mwalimu", lastLogin: "Leo, 7:58 AM", status: "active" },
  { name: "Grace Mwamba", email: "g.mwamba@bender.ac.tz", role: "Mwalimu", lastLogin: "Jana, 4:10 PM", status: "active" },
  { name: "Ahmed Omar", email: "a.omar@bender.ac.tz", role: "Mzazi", lastLogin: "Juzi, 6:32 PM", status: "active" },
];

const roles = [
  { name: "Super Admin", count: 1, permissions: "Udhibiti wote wa mfumo", color: "bg-destructive-light text-destructive" },
  { name: "Mkurugenzi", count: 2, permissions: "Usimamizi wa shule yote", color: "bg-warning-light text-warning" },
  { name: "Mwalimu", count: 52, permissions: "Mahudhurio, alama, mawasiliano", color: "bg-primary-light text-primary" },
  { name: "Afisa Fedha", count: 3, permissions: "Fedha na ripoti za malipo", color: "bg-accent-light text-accent" },
  { name: "Mzazi", count: 890, permissions: "Kuona maendeleo ya mtoto", color: "bg-info-light text-info" },
  { name: "Mwanafunzi", count: 1248, permissions: "Kuona alama na ratiba", color: "bg-muted text-muted-foreground" },
];

export default function Users() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-foreground font-heading">Majukumu ya Mfumo</h3>
            </div>
          </div>
          <div className="divide-y divide-border/40">
            {roles.map(r => (
              <div key={r.name} className="flex items-center gap-4 px-6 py-4 hover:bg-muted/20 transition-colors">
                <div className={`px-3 py-1.5 rounded-xl text-xs font-bold flex-shrink-0 ${r.color}`}>{r.name}</div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{r.permissions}</p>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-sm font-bold text-foreground">{r.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
          <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-border">
            <h3 className="font-bold text-foreground font-heading">Watumiaji wa Hivi Karibuni</h3>
            <div className="ml-auto flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/60 border border-border/50 text-sm text-muted-foreground">
                <Search className="w-4 h-4" />
                <input placeholder="Tafuta..." className="bg-transparent outline-none text-sm w-28" />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-primary text-white text-xs font-semibold shadow-md-blue">
                <Plus className="w-3.5 h-3.5" /> Mtumiaji Mpya
              </button>
            </div>
          </div>
          <div className="divide-y divide-border/40">
            {users.map((u, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-3.5 hover:bg-muted/20 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {u.name.split(" ").map(n => n[0]).join("").slice(0,2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{u.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="badge-primary text-[10px]">{u.role}</span>
                  <p className="text-[10px] text-muted-foreground mt-1">{u.lastLogin}</p>
                </div>
                <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                  <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
