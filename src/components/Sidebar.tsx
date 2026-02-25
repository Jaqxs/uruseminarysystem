import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, BookOpen, ClipboardCheck, TrendingUp,
  DollarSign, Briefcase, Package, Clock, Library, MessageSquare,
  Settings, ChevronDown, GraduationCap, Bell, Search, Menu, X,
  LogOut, User, Shield, BarChart3
} from "lucide-react";

const navGroups = [
  {
    label: "Overview",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/" },
      { icon: BarChart3, label: "Analytics", path: "/analytics" },
    ]
  },
  {
    label: "Academic",
    items: [
      { icon: Users, label: "Students", path: "/students" },
      { icon: BookOpen, label: "Academics", path: "/academics" },
      { icon: ClipboardCheck, label: "Attendance", path: "/attendance" },
      { icon: TrendingUp, label: "Grades & Reports", path: "/grades" },
      { icon: Clock, label: "Timetable", path: "/timetable" },
    ]
  },
  {
    label: "Administration",
    items: [
      { icon: Briefcase, label: "Staff", path: "/staff" },
      { icon: DollarSign, label: "Finance & Fees", path: "/finance" },
      { icon: Package, label: "Inventory", path: "/inventory" },
      { icon: Library, label: "Library", path: "/library" },
    ]
  },
  {
    label: "Communication",
    items: [
      { icon: MessageSquare, label: "Messages", path: "/communication" },
      { icon: Bell, label: "Announcements", path: "/announcements" },
    ]
  },
  {
    label: "System",
    items: [
      { icon: Shield, label: "Users & Roles", path: "/users" },
      { icon: Settings, label: "Settings", path: "/settings" },
    ]
  }
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["Overview", "Academic", "Administration", "Communication", "System"]);

  const toggleGroup = (label: string) => {
    setExpandedGroups(prev =>
      prev.includes(label) ? prev.filter(g => g !== label) : [...prev, label]
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full" style={{ background: "var(--gradient-sidebar)" }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
        <div className="w-10 h-10 rounded-2xl bg-gradient-primary flex items-center justify-center flex-shrink-0 shadow-glow">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <p className="font-bold text-sm text-white leading-tight">Bender School</p>
            <p className="text-[10px] font-medium" style={{ color: "hsl(var(--sidebar-muted))" }}>Information System</p>
          </div>
        )}
        <button
          onClick={onToggle}
          className="ml-auto p-1.5 rounded-lg transition-colors hidden lg:flex"
          style={{ color: "hsl(var(--sidebar-muted))" }}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs" style={{ background: "hsl(var(--sidebar-accent))", color: "hsl(var(--sidebar-muted))" }}>
            <Search className="w-3.5 h-3.5" />
            <span>Quick search...</span>
            <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded border" style={{ borderColor: "hsl(var(--sidebar-border))" }}>⌘K</span>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {navGroups.map(group => (
          <div key={group.label} className="mb-2">
            {!collapsed && (
              <button
                onClick={() => toggleGroup(group.label)}
                className="flex items-center justify-between w-full px-2 py-1.5 mb-1"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "hsl(var(--sidebar-muted))" }}>
                  {group.label}
                </span>
                <ChevronDown
                  className="w-3 h-3 transition-transform"
                  style={{
                    color: "hsl(var(--sidebar-muted))",
                    transform: expandedGroups.includes(group.label) ? "rotate(0deg)" : "rotate(-90deg)"
                  }}
                />
              </button>
            )}
            {(collapsed || expandedGroups.includes(group.label)) && (
              <div className="space-y-0.5">
                {group.items.map(item => {
                  const isActive = location.pathname === item.path;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onMobileClose}
                      className={`sidebar-item ${isActive ? "active" : ""}`}
                      title={collapsed ? item.label : undefined}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!collapsed && <span>{item.label}</span>}
                      {!collapsed && isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white opacity-70" />
                      )}
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Profile */}
      <div className="p-4 border-t border-sidebar-border">
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">Admin Mkuu</p>
              <p className="text-[10px] truncate" style={{ color: "hsl(var(--sidebar-muted))" }}>Super Admin</p>
            </div>
          )}
          {!collapsed && (
            <button style={{ color: "hsl(var(--sidebar-muted))" }} className="hover:text-white transition-colors">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col h-screen sticky top-0 transition-all duration-300 flex-shrink-0 ${collapsed ? "w-16" : "w-64"}`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={onMobileClose} />
          <aside className="relative w-64 h-full flex flex-col animate-slide-in-left">
            {sidebarContent}
          </aside>
          <button onClick={onMobileClose} className="absolute top-4 right-4 text-white z-10">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </>
  );
}
