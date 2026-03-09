import { useLanguage } from "../context/LanguageContext";
import { Shield, Plus, Search, User, Lock, Clock, Monitor, Download } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

export default function Users() {
  const { t } = useLanguage();
  const { user } = useAuth();

  const users = [
    { name: "Rev. Fr. Rector", email: "admin@uruseminary.ac.tz", role: t('superAdmin'), lastLogin: `${t('today')}, 8:32 AM`, status: "active" },
    { name: "Rev. Fr. Peter Macha", email: "p.macha@uruseminary.ac.tz", role: t('director'), lastLogin: `${t('today')}, 9:15 AM`, status: "active" },
    { name: "Br. Francis Ally", email: "f.ally@uruseminary.ac.tz", role: t('bursar'), lastLogin: `${t('yesterday')}, 3:22 PM`, status: "active" },
    { name: "Dr. Amos Tarimo", email: "a.tarimo@uruseminary.ac.tz", role: t('academicMaster'), lastLogin: `${t('today')}, 10:45 AM`, status: "active" },
    { name: "Mr. John Kamau", email: "j.kamau@uruseminary.ac.tz", role: t('teacherRole'), lastLogin: `${t('today')}, 7:58 AM`, status: "active" },
    { name: "Andrew Thomas", email: "a.thomas@uruseminary.ac.tz", role: t('itAdminRole'), lastLogin: `${t('twoDaysAgo')}, 6:32 PM`, status: "active" },
  ];

  const roles = [
    {
      name: t('superAdmin'),
      count: 1,
      permissions: t('fullSystemControl'),
      color: "bg-destructive/10 text-destructive",
      icon: Shield,
    },
    {
      name: t('director'),
      count: 1,
      permissions: t('wholeSchoolManagement'),
      color: "bg-amber-500/10 text-amber-600",
      icon: User,
    },
    {
      name: t('bursar'),
      count: 2,
      permissions: t('financePermissions'),
      color: "bg-emerald-500/10 text-emerald-600",
      icon: User,
    },
    {
      name: t('academicMaster'),
      count: 1,
      permissions: t("wholeSchoolManagement"),
      color: "bg-purple-500/10 text-purple-600",
      icon: Shield,
    },
    {
      name: t('teacherRole'),
      count: 48,
      permissions: t('teacherPermissions'),
      color: "bg-primary/10 text-primary",
      icon: User,
    },
    {
      name: t('itAdminRole'),
      count: 2,
      permissions: t('itAdminPermissions'),
      color: "bg-sky-500/10 text-sky-600",
      icon: Monitor,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Role summary + users grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Roles Card */}
        <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-foreground font-heading">{t('systemRoles')}</h3>
            </div>
            <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-1 rounded-lg">{roles.length} {t('usersRoles')}</span>
          </div>
          <div className="divide-y divide-border/40">
            {roles.map(r => {
              const Icon = r.icon;
              return (
                <div
                  key={r.name}
                  className="flex items-center gap-4 px-6 py-3.5 hover:bg-muted/30 transition-colors cursor-pointer group"
                  onClick={() => toast.info(`${t('loadingRole')} ${r.name}...`)}
                >
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold flex-shrink-0 ${r.color} shadow-sm group-hover:scale-105 transition-transform`}>
                    <Icon className="w-3 h-3" />
                    {r.name}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground leading-snug">{r.permissions}</p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <User className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-sm font-bold text-foreground">{r.count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Users Card */}
        <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
          <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-border bg-muted/20">
            <h3 className="font-bold text-foreground font-heading">{t('recentUsers')}</h3>
            <div className="ml-auto flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-background border border-border text-sm text-muted-foreground focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <Search className="w-4 h-4" />
                <input placeholder={t('search')} className="bg-transparent outline-none text-sm w-28 text-foreground placeholder:text-muted-foreground" />
              </div>
              {user?.role === 'admin' && (
                <button onClick={() => toast.info(t('preparingUserForm'))} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-primary text-white text-xs font-semibold shadow-md-blue hover:shadow-lg-blue transition-all active:scale-95 leading-none">
                  <Plus className="w-3.5 h-3.5" /> {t('newUser')}
                </button>
              )}
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

      {/* Audit Logs */}
      <div className="rounded-[2.5rem] border border-border bg-card shadow-sm overflow-hidden p-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-8 py-8 border-b border-border/40 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black font-heading mb-1">{t('auditLogs')}</h3>
              <p className="text-sm text-muted-foreground font-medium">{t('criticalActivities')}</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-[1.25rem] bg-muted/20 border border-border hover:bg-muted/40 transition-all text-sm font-bold">
            <Download className="w-4 h-4" />
            {t('exportLogs')}
          </button>
        </div>
        <div className="divide-y divide-border/30">
          {[
            { user: t('adminMkuu'), action: "Changed Academic Year to 2024/25", time: 10, module: "Admin" },
            { user: "Rev. Fr. Peter Macha", action: "Approved staff payroll (June 2024)", time: 300, module: "Finance" },
            { user: "Br. Francis Ally", action: "Generated TZS Financial Statement", time: 1440, module: "Finance" },
            { user: "Andrew Thomas", action: "Updated system backup configuration", time: 2880, module: "IT" },
          ].map((log, i) => (
            <div key={i} className="flex items-center gap-6 px-10 py-5 hover:bg-muted/10 transition-colors group">
              <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:scale-150 transition-transform" />
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground leading-none">{log.action}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/40">{log.module}</span>
                  <span className="text-[10px] font-medium text-muted-foreground/60 italic">{t('by')} {log.user}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">{log.time < 60 ? `${log.time} ${t('minsAgo')}` : `${Math.floor(log.time / 60)} ${t('hrsAgo')}`}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
