import { useState } from "react";
import { Bell, Search, Menu, ChevronDown, Plus } from "lucide-react";

interface TopbarProps {
  onMenuClick: () => void;
  title: string;
  subtitle?: string;
}

export function Topbar({ onMenuClick, title, subtitle }: TopbarProps) {
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { id: 1, text: "Wanafunzi 3 hawakufika leo", time: "Dakika 5 zilizopita", type: "warning" },
    { id: 2, text: "Ada ya mwezi zinasubiri - Darasa 4A", time: "Saa 1 iliyopita", type: "danger" },
    { id: 3, text: "Ripoti mpya imeundwa - Term 2", time: "Saa 2 zilizopita", type: "info" },
    { id: 4, text: "Mwanafunzi mpya ameandikishwa", time: "Saa 3 zilizopita", type: "success" },
  ];

  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 px-6 py-4 border-b border-border/60 bg-background/80 backdrop-blur-xl">
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

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/60 border border-border/50 text-sm text-muted-foreground w-56 hover:bg-muted transition-colors cursor-pointer">
        <Search className="w-4 h-4" />
        <span>Tafuta...</span>
        <kbd className="ml-auto text-[10px] px-1.5 py-0.5 rounded border border-border bg-background">⌘K</kbd>
      </div>

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
              <p className="font-semibold text-sm">Arifa</p>
              <span className="badge-danger">{notifications.length} mpya</span>
            </div>
            <div className="divide-y divide-border/50">
              {notifications.map(n => (
                <div key={n.id} className="flex gap-3 px-4 py-3 hover:bg-muted/40 cursor-pointer transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    n.type === "warning" ? "bg-warning" :
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
              <button className="text-xs font-semibold text-primary hover:underline w-full text-center">
                Ona arifa zote
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick add */}
      <button className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-primary text-white text-sm font-semibold shadow-md-blue hover:shadow-lg-blue transition-all hover:-translate-y-0.5">
        <Plus className="w-4 h-4" />
        <span>Ongeza</span>
      </button>

      {/* Avatar */}
      <div className="flex items-center gap-2 cursor-pointer group">
        <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center text-white text-sm font-bold shadow-md-blue">
          AM
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors hidden sm:block" />
      </div>
    </header>
  );
}
