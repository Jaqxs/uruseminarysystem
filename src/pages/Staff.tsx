import { useState } from "react";
import { Briefcase, Plus, Search, Mail, Phone, Star, Filter, MoreVertical, Building2 } from "lucide-react";
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

  const [newMember, setNewMember] = useState({
    name: "", role: t('teacherRole'), dept: t('mathAca'), phone: "", email: "", status: "active", exp: `1 ${t('year')}`, rating: 5.0
  });

  const filtered = staff.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.dept.toLowerCase().includes(search.toLowerCase()) ||
    s.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStaff(newMember);
    setIsAddOpen(false);
    setNewMember({ name: "", role: t('teacherRole'), dept: t('mathAca'), phone: "", email: "", status: "active", exp: `1 ${t('year')}`, rating: 5.0 });
    toast.success(t('staffAdded'));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t('staffMembers'), value: staff.length, gradient: "bg-gradient-card-blue", icon: Briefcase },
          { label: t('departments'), value: new Set(staff.map(s => s.dept)).size, gradient: "bg-gradient-card-green", icon: Building2 },
          { label: t('onLeave'), value: staff.filter(s => s.status === 'leave').length, gradient: "bg-gradient-card-amber", icon: Star },
          { label: t('rating'), value: "4.8", gradient: "bg-gradient-card-purple", icon: Star },
        ].map((s, i) => (
          <div key={i} onClick={() => toast.info(`${t('loadingStaffDetail')} ${s.label.toLowerCase()}...`)} className="stat-card hover:shadow-xl hover:shadow-primary/5 transition-all hover:-translate-y-1 cursor-pointer group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.gradient} mb-3 group-hover:scale-110 transition-transform`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold font-heading text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-border">
          <div className="flex-1 min-w-[200px] flex items-center gap-2 px-3 py-2.5 rounded-xl bg-muted/60 border border-border/50 text-sm text-muted-foreground focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <Search className="w-4 h-4 flex-shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('searchStaff')}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-primary text-white text-sm font-semibold shadow-md-blue hover:shadow-lg-blue transition-all">
                <Plus className="w-4 h-4" /> {t('newStaff')}
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-lg rounded-3xl p-8 border-border">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold font-heading">{t('registerNewStaff')}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">{t('fullName')}</label>
                    <Input required value={newMember.name} onChange={e => setNewMember({ ...newMember, name: e.target.value })} placeholder="e.g. John Kamau" className="rounded-xl" />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">{t('role')}</label>
                    <Input required value={newMember.role} onChange={e => setNewMember({ ...newMember, role: e.target.value })} placeholder="e.g. Mwalimu" className="rounded-xl" />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">{t('department')}</label>
                    <Input required value={newMember.dept} onChange={e => setNewMember({ ...newMember, dept: e.target.value })} placeholder="e.g. Hisabati" className="rounded-xl" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">{t('email')}</label>
                    <Input type="email" required value={newMember.email} onChange={e => setNewMember({ ...newMember, email: e.target.value })} placeholder="name@bendel.ac.tz" className="rounded-xl" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">{t('phoneNumber')}</label>
                    <Input required value={newMember.phone} onChange={e => setNewMember({ ...newMember, phone: e.target.value })} placeholder="+255..." className="rounded-xl" />
                  </div>
                </div>
                <DialogFooter className="mt-6">
                  <button type="submit" className="w-full py-3 rounded-2xl bg-gradient-primary text-white font-bold shadow-md-blue hover:shadow-lg-blue transition-all">
                    {t('addStaff')}
                  </button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filtered.map(s => (
            <div key={s.id} className="group relative rounded-3xl border border-border/60 p-6 hover:shadow-xl hover:shadow-primary/5 transition-all hover:-translate-y-1 bg-card/50 backdrop-blur-sm">
              <div className="flex items-start gap-4 mb-5">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-primary/20">
                    {s.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${s.status === 'active' ? 'bg-success' : 'bg-warning'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-foreground truncate font-heading group-hover:text-primary transition-colors">{s.name}</h3>
                  <p className="text-xs font-medium text-muted-foreground/80">{s.role} • {s.dept}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-1 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-xl">
                    <DropdownMenuItem onClick={() => toast.info(`${t('loadingStaffProfile')} ${s.name}...`)} className="text-xs font-medium">{t('editProfile')}</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toast.warning(t('deactivateStaffConfirm'))} className="text-xs font-medium text-destructive">{t('deactivate')}</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="bg-muted/30 rounded-2xl p-3">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">{t('experience')}</p>
                  <p className="text-xs font-bold text-foreground">{s.exp}</p>
                </div>
                <div className="bg-muted/30 rounded-2xl p-3">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">{t('rating')}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-warning fill-warning" />
                    <p className="text-xs font-bold text-foreground">{s.rating}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <div className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center">
                    <Phone className="w-3 h-3" />
                  </div>
                  <span className="font-medium">{s.phone}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <div className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center">
                    <Mail className="w-3 h-3" />
                  </div>
                  <span className="font-medium truncate">{s.email}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => toast.info(`${t('openingMessageWindow')} ${s.name.split(" ")[0]}...`)} className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-primary text-white shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95">
                  {t('message')}
                </button>
                <button onClick={() => toast.info(t('loadingFullProfile'))} className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-muted text-foreground hover:bg-muted-foreground/10 transition-all active:scale-95">
                  {t('viewProfile')}
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold font-heading">{t('noResults')}</h3>
              <p className="text-sm text-muted-foreground">{t('tryAnotherSearch')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

