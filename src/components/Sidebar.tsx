import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, BookOpen, ClipboardCheck, TrendingUp,
  DollarSign, Briefcase, Package, Clock, Library, MessageSquare,
  Settings, ChevronDown, GraduationCap, Bell, Search, Menu, X,
  LogOut, User, Shield, BarChart3, FileText, Star
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const { t } = useLanguage();
  const location = useLocation();

  const navGroups = [
    {
      label: t('overview'),
      items: [
        { icon: LayoutDashboard, label: t('dashboard'), path: "/" },
        { icon: Star, label: t('teacherDashboard'), path: "/teacher" },
        { icon: BarChart3, label: t('analytics'), path: "/analytics" },
      ]
    },
    {
      label: t('academic'),
      items: [
        { icon: Users, label: t('students'), path: "/students" },
        { icon: BookOpen, label: t('academics'), path: "/academics" },
        { icon: ClipboardCheck, label: t('attendance'), path: "/attendance" },
        { icon: FileText, label: t('exams'), path: "/exams" },
        { icon: TrendingUp, label: t('gradesReports'), path: "/grades" },
        { icon: Clock, label: t('timetable'), path: "/timetable" },
      ]
    },
    {
      label: t('administration'),
      items: [
        { icon: Briefcase, label: t('staff'), path: "/staff" },
        { icon: DollarSign, label: t('finance'), path: "/finance" },
        { icon: Package, label: t('inventory'), path: "/inventory" },
        { icon: Library, label: t('library'), path: "/library" },
      ]
    },
    {
      label: t('communication'),
      items: [
        { icon: MessageSquare, label: t('messages'), path: "/communication" },
        { icon: Bell, label: t('announcements'), path: "/announcements" },
      ]
    },
    {
      label: t('system'),
      items: [
        { icon: Shield, label: t('usersRoles'), path: "/users" },
        { icon: Settings, label: t('settings'), path: "/settings" },
      ]
    }
  ];

  const [expandedGroups, setExpandedGroups] = useState<string[]>(navGroups.map(g => g.label));

  const toggleGroup = (label: string) => {
    setExpandedGroups(prev =>
      prev.includes(label) ? prev.filter(g => g !== label) : [...prev, label]
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full" style={{ background: "var(--gradient-sidebar)" }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mx-auto mb-6 shadow-glow overflow-hidden p-2">
          <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <p className="font-bold text-sm text-white leading-tight">Bendel Schools</p>
            <p className="text-[10px] font-medium" style={{ color: "hsl(var(--sidebar-muted))" }}>Management System</p>
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
            <span>{t('quickSearch')}</span>
            <kbd className="ml-auto text-[10px] px-1.5 py-0.5 rounded border border-sidebar-border">⌘K</kbd>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1 sis-scrollbar">
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
        <NavLink
          to="/profile"
          className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""} hover:bg-sidebar-accent p-2 rounded-xl transition-colors group ${location.pathname === "/profile" ? "bg-sidebar-accent" : ""}`}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 group-hover:shadow-glow transition-all">
            <User className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{t('adminName')}</p>
              <p className="text-[10px] truncate" style={{ color: "hsl(var(--sidebar-muted))" }}>{t('superAdmin')}</p>
            </div>
          )}
        </NavLink>
        {!collapsed && (
          <NavLink
            to="/login"
            style={{ color: "hsl(var(--sidebar-muted))" }}
            className="flex items-center gap-2 mt-4 px-2 hover:text-white transition-colors text-xs font-medium"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t('logout')}</span>
          </NavLink>
        )}
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
