import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export function Layout() {
  const { t } = useLanguage();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const pageTitles: Record<string, { title: string; subtitle: string }> = {
    "/": { title: t('dashboardTitle'), subtitle: t('dashboardSubtitle') },
    "/analytics": { title: t('analyticsTitle'), subtitle: t('analyticsSubtitle') },
    "/students": { title: t('studentsTitle'), subtitle: t('studentsSubtitle') },
    "/academics": { title: t('academicsTitle'), subtitle: t('academicsSubtitle') },
    "/attendance": { title: t('attendanceTitle'), subtitle: t('attendanceSubtitle') },
    "/grades": { title: t('gradesTitle'), subtitle: t('gradesSubtitle') },
    "/timetable": { title: t('timetableTitle'), subtitle: t('timetableSubtitle') },
    "/staff": { title: t('staffTitle'), subtitle: t('staffSubtitle') },
    "/finance": { title: t('financeTitle'), subtitle: t('financeSubtitle') },
    "/inventory": { title: t('inventoryTitle'), subtitle: t('inventorySubtitle') },

    "/announcements": { title: t('announcementsTitle'), subtitle: t('announcementsSubtitle') },
    "/users": { title: t('usersTitle'), subtitle: t('usersSubtitle') },
    "/settings": { title: t('settingsTitle'), subtitle: t('settingsSubtitle') },
    "/profile": { title: t('profile'), subtitle: t('viewProfile') },
  };

  const page = pageTitles[location.pathname] || { title: "Uru Seminary", subtitle: "" };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar
          onMenuClick={() => setMobileOpen(true)}
          title={page.title}
          subtitle={page.subtitle}
        />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
