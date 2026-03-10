import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, BookOpen, ClipboardCheck, TrendingUp,
  DollarSign, Briefcase, Package, Clock, MessageSquare,
  Settings, ChevronDown, GraduationCap, Bell, Search, Menu, X,
  LogOut, User, Shield, BarChart3, FileText, Star, Library
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { UserRole } from "@/lib/auth";
import uruLogo from "../assets/uru_logo.jpg";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const { t } = useLanguage();
  const location = useLocation();
  const { user } = useAuth();

  // Define Role Base Access Control for Nav
  const hasAccess = (allowedRoles: string[]) => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  const navGroups = [
    {
      label: t('overview'),
      items: [
        { icon: LayoutDashboard, label: t('dashboard'), path: "/", roles: ['admin', 'director'] },
        { icon: LayoutDashboard, label: t('academicDashboard'), path: "/academic-master", roles: ['academic_master'] },
        { icon: Star, label: t('teacherDashboard'), path: "/teacher", roles: ['teacher'] },
        { icon: BarChart3, label: t('analytics'), path: "/analytics", roles: ['admin', 'director'] },
      ].filter(item => hasAccess(item.roles))
    },
    {
      label: t('academic'),
      items: [
        { icon: Users, label: t('students'), path: "/students", roles: ['admin', 'director', 'teacher', 'academic_master'] },
        { icon: BookOpen, label: t('academics'), path: "/academics", roles: ['admin', 'director', 'teacher', 'academic_master'] },
        { icon: ClipboardCheck, label: t('attendance'), path: "/attendance", roles: ['admin', 'teacher', 'academic_master'] },
        { icon: FileText, label: t('exams'), path: "/exams", roles: ['admin', 'teacher', 'academic_master'] },
        { icon: TrendingUp, label: t('gradesReports'), path: "/grades", roles: ['admin', 'teacher', 'academic_master'] },
        { icon: Clock, label: t('timetable'), path: "/timetable", roles: ['admin', 'teacher', 'academic_master'] },
      ].filter(item => hasAccess(item.roles))
    },
    {
      label: t('administration'),
      items: [
        { icon: Briefcase, label: t('staff'), path: "/staff", roles: ['admin', 'director', 'academic_master'] },
        { icon: DollarSign, label: t('finance'), path: "/finance", roles: ['admin', 'bursar', 'director'] },
        { icon: Package, label: t('inventory'), path: "/inventory", roles: ['admin', 'bursar'] },
      ].filter(item => hasAccess(item.roles))
    },
    {
      label: t('communication'),
      items: [
        { icon: Bell, label: t('announcements'), path: "/announcements", roles: ['admin', 'teacher', 'director', 'bursar', 'academic_master'] },
      ].filter(item => hasAccess(item.roles))
    },
    {
      label: t('system'),
      items: [
        { icon: Shield, label: t('usersRoles'), path: "/users", roles: ['admin'] },
        { icon: Settings, label: t('settings'), path: "/settings", roles: ['admin', 'director'] },
      ].filter(item => hasAccess(item.roles))
    }
  ].filter(group => group.items.length > 0);

  const [expandedGroups, setExpandedGroups] = useState<string[]>(navGroups.map(g => g.label));

  const toggleGroup = (label: string) => {
    setExpandedGroups(prev =>
      prev.includes(label) ? prev.filter(g => g !== label) : [...prev, label]
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full" style={{ background: "var(--gradient-sidebar)" }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border h-[88px]">
        <div className={`rounded-xl bg-white flex items-center justify-center shadow-glow overflow-hidden p-1 transition-all flex-shrink-0 ${collapsed ? 'w-10 h-10' : 'w-12 h-12'}`}>
          <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <p className="font-bold text-sm text-white leading-tight">Uru Seminary</p>
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
          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 group-hover:shadow-glow transition-all text-white text-[10px] font-black tracking-tighter uppercase">
            {user?.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2) : <User className="w-4 h-4" />}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate leading-none mb-0.5">{user?.name || t('adminName')}</p>
              <p className="text-[9px] truncate opacity-50 uppercase font-black tracking-wider" style={{ color: "hsl(var(--sidebar-muted))" }}>
                {user?.role ? t(`role_${user.role}` as any) : t('superAdmin')}
              </p>
            </div>
          )}
        </NavLink>
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
