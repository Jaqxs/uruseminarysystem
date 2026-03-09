import { useState, useEffect } from "react";
import { Bell, Search, Menu, ChevronDown, Plus, LogOut, User, Settings, Shield, Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

interface TopbarProps {
  onMenuClick: () => void;
  title: string;
  subtitle?: string;
}

export function Topbar({ onMenuClick, title, subtitle }: TopbarProps) {
  const { t, language, setLanguage } = useLanguage();
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const notifications = [
    { id: 1, text: t('notif1'), time: `5 ${t('minAgo')}`, type: "warning" },
    { id: 2, text: t('notif2'), time: `1 ${t('hrAgo')}`, type: "danger" },
    { id: 3, text: t('notif3'), time: `2 ${t('hrsAgo')}`, type: "info" },
    { id: 4, text: t('notif4'), time: `3 ${t('hrsAgo')}`, type: "success" },
  ];

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSearchSelect = (path: string) => {
    setSearchOpen(false);
    navigate(path);
  };


  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 px-6 py-4 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      {/* Universal Search Dialog */}
      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder={t('search')} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading={t('quickPages')}>
            <CommandItem onSelect={() => handleSearchSelect("/")}>
              <User className="mr-2 h-4 w-4" />
              <span>{t('dashboard')}</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSearchSelect("/students")}>
              <User className="mr-2 h-4 w-4" />
              <span>{t('students')}</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSearchSelect("/staff")}>
              <User className="mr-2 h-4 w-4" />
              <span>{t('staff')}</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSearchSelect("/finance")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>{t('finance')}</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={t('settings')}>
            <CommandItem onSelect={() => handleSearchSelect("/profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>{t('profile')}</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSearchSelect("/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>{t('settings')}</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-xl hover:bg-muted transition-colors"
      >
        <Menu className="w-5 h-5 text-foreground" />
      </button>

      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-bold truncate font-heading">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
      </div>

      {/* Search Trigger */}
      {location.pathname !== "/" && (
        <div
          onClick={() => setSearchOpen(true)}
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/60 border border-border/50 text-sm text-muted-foreground w-56 hover:bg-muted transition-colors cursor-pointer"
        >
          <Search className="w-4 h-4" />
          <span>{t('search')}</span>
          <kbd className="ml-auto text-[10px] px-1.5 py-0.5 rounded border border-border bg-background">⌘K</kbd>
        </div>
      )}

      {/* Language Toggle */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-2.5 rounded-xl hover:bg-muted transition-colors flex items-center gap-1.5 shadow-sm">
            <Globe className="w-4 h-4 text-foreground" />
            <span className="text-xs font-bold uppercase">{language}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32 rounded-2xl p-2 shadow-lg border-border">
          <DropdownMenuItem
            onClick={() => setLanguage('en')}
            className={`rounded-xl cursor-pointer ${language === 'en' ? 'bg-primary/10 text-primary font-bold' : ''}`}
          >
            English
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setLanguage('sw')}
            className={`rounded-xl cursor-pointer ${language === 'sw' ? 'bg-primary/10 text-primary font-bold' : ''}`}
          >
            Kiswahili
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setNotifOpen(!notifOpen)}
          className="relative p-2.5 rounded-xl hover:bg-muted transition-colors"
        >
          <Bell className="w-5 h-5 text-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive border-2 border-background" />
        </button>
        {notifOpen && (
          <div className="absolute right-0 top-12 w-80 rounded-2xl shadow-lg-blue border border-border bg-card z-50 overflow-hidden animate-scale-in">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <p className="font-semibold text-sm">{t('notifications')}</p>
              <span className="badge-danger">{notifications.length} {t('newNotif')}</span>
            </div>
            <div className="divide-y divide-border/50 max-h-[400px] overflow-y-auto">
              {notifications.map(n => (
                <div key={n.id} className="flex gap-3 px-4 py-3 hover:bg-muted/40 cursor-pointer transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.type === "warning" ? "bg-warning" :
                    n.type === "danger" ? "bg-destructive" :
                      n.type === "info" ? "bg-info" : "bg-accent"
                    }`} />
                  <div>
                    <p className="text-xs font-medium text-foreground">{n.text}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-border">
              <button
                onClick={() => {
                  setNotifOpen(false);
                  toast.success(t('markAllRead'));
                }}
                className="text-xs font-semibold text-primary hover:underline w-full text-center"
              >
                {t('viewAllNotifications')}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick add */}
      {['admin', 'director', 'teacher', 'bursar'].includes(user?.role || '') && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-primary text-white text-sm font-semibold shadow-md-blue hover:shadow-lg-blue transition-all hover:-translate-y-0.5">
              <Plus className="w-4 h-4" />
              <span>{t('addPlus')}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-2xl p-2 shadow-lg border-border">
            <DropdownMenuLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{t('addNew')}</DropdownMenuLabel>
            {['admin', 'director', 'teacher'].includes(user?.role || '') && <DropdownMenuItem onClick={() => navigate("/students")} className="rounded-xl cursor-pointer">{t('student')}</DropdownMenuItem>}
            {['admin', 'director'].includes(user?.role || '') && <DropdownMenuItem onClick={() => navigate("/staff")} className="rounded-xl cursor-pointer">{t('staffMember')}</DropdownMenuItem>}
            {['admin', 'director', 'teacher', 'bursar'].includes(user?.role || '') && <DropdownMenuItem onClick={() => navigate("/announcements")} className="rounded-xl cursor-pointer">{t('announcement')}</DropdownMenuItem>}
            {['admin', 'bursar'].includes(user?.role || '') && <DropdownMenuItem onClick={() => navigate("/inventory")} className="rounded-xl cursor-pointer">{t('item')}</DropdownMenuItem>}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* Avatar Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center text-white text-sm font-bold shadow-md-blue group-hover:shadow-glow transition-all uppercase">
              {user ? user.name.split(" ").map(n => n[0]).join("").slice(0, 2) : "AM"}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors hidden sm:block" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 shadow-lg border-border">
          <div className="flex items-center gap-3 p-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold uppercase text-xs tracking-tighter">
              {user?.name ? user.name.split(" ").filter(Boolean).map(n => n[0]).join("").slice(0, 2) : "AM"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold truncate leading-none mb-1">{user?.name || t('adminName')}</p>
              <p className="text-[10px] text-muted-foreground truncate">{user?.email || "admin@uruseminary.ac.tz"}</p>
            </div>
          </div>
          <DropdownMenuSeparator className="bg-border/50" />
          <DropdownMenuItem onClick={() => navigate("/profile")} className="rounded-xl cursor-pointer py-2">
            <User className="mr-2 h-4 w-4" />
            <span>{t('myProfile')}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/settings")} className="rounded-xl cursor-pointer py-2">
            <Settings className="mr-2 h-4 w-4" />
            <span>{t('settings')}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-xl cursor-pointer py-2">
            <Shield className="mr-2 h-4 w-4" />
            <span>{t('security')}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-border/50" />
          <DropdownMenuItem
            onClick={() => {
              toast.info(t('loggedOutAll'));
              logout();
              navigate("/login");
            }}
            className="rounded-xl cursor-pointer py-2 text-destructive focus:text-destructive focus:bg-destructive-light"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t('logoutLabel')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

