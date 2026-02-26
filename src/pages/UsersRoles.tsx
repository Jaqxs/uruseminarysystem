import { useLanguage } from "../context/LanguageContext";
import { Shield, Plus, Search, User, Lock } from "lucide-react";
import { toast } from "sonner";

export default function Users() {
  const { t } = useLanguage();

  const users = [
    { name: t('adminMkuu'), email: "admin@bendel.ac.tz", role: t('superAdmin'), lastLogin: `${t('today')}, 8:32 AM`, status: "active" },
    { name: "Hassan Mrisho", email: "h.mrisho@bendel.ac.tz", role: t('director'), lastLogin: `${t('today')}, 9:15 AM`, status: "active" },
    { name: "Fatuma Ally", email: "f.ally@bendel.ac.tz", role: t('financeOfficer'), lastLogin: `${t('yesterday')}, 3:22 PM`, status: "active" },
    { name: "John Kamau", email: "j.kamau@bendel.ac.tz", role: t('teacherRole'), lastLogin: `${t('today')}, 7:58 AM`, status: "active" },
    { name: "Grace Mwamba", email: "g.mwamba@bendel.ac.tz", role: t('teacherRole'), lastLogin: `${t('yesterday')}, 4:10 PM`, status: "active" },
    { name: "Ahmed Omar", email: "a.omar@bendel.ac.tz", role: t('parentRole'), lastLogin: `${t('twoDaysAgo')}, 6:32 PM`, status: "active" },
  ];

  const roles = [
    { name: t('superAdmin'), count: 1, permissions: t('fullSystemControl'), color: "bg-destructive-light text-destructive" },
    { name: t('director'), count: 2, permissions: t('wholeSchoolManagement'), color: "bg-warning-light text-warning" },
    { name: t('teacherRole'), count: 52, permissions: t('teacherPermissions'), color: "bg-primary-light text-primary" },
    { name: t('financeOfficer'), count: 3, permissions: t('financePermissions'), color: "bg-accent-light text-accent" },
    { name: t('parentRole'), count: 890, permissions: t('parentPermissions'), color: "bg-info-light text-info" },
    { name: t('studentRole'), count: 1248, permissions: t('studentPermissions'), color: "bg-muted text-muted-foreground" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-foreground font-heading">{t('systemRoles')}</h3>
            </div>
          </div>
          <div className="divide-y divide-border/40">
            {roles.map(r => (
              <div key={r.name} className="flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-colors cursor-pointer group" onClick={() => toast.info(`${t('loadingRole')} ${r.name}...`)}>
                <div className={`px-3 py-1.5 rounded-xl text-xs font-bold flex-shrink-0 ${r.color} shadow-sm group-hover:scale-105 transition-transform`}>{r.name}</div>
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
          <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-border bg-muted/20">
            <h3 className="font-bold text-foreground font-heading">{t('recentUsers')}</h3>
            <div className="ml-auto flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-background border border-border text-sm text-muted-foreground focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <Search className="w-4 h-4" />
                <input placeholder={t('search')} className="bg-transparent outline-none text-sm w-28 text-foreground placeholder:text-muted-foreground" />
              </div>
              <button onClick={() => toast.info(t('preparingUserForm'))} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-primary text-white text-xs font-semibold shadow-md-blue hover:shadow-lg-blue transition-all active:scale-95 leading-none">
                <Plus className="w-3.5 h-3.5" /> {t('newUser')}
              </button>
            </div>
          </div>
          <div className="divide-y divide-border/40">
            {users.map((u, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-3.5 hover:bg-muted/30 transition-colors group">
                <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                  {u.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{u.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="badge-primary text-[10px]">{u.role}</span>
                  <p className="text-[10px] text-muted-foreground mt-1">{u.lastLogin}</p>
                </div>
                <button onClick={() => toast.warning(`${t('userAccessLocked')} ${u.name.split(" ")[0]}...`)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
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
