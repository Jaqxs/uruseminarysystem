import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/": { title: "Dashibodi", subtitle: "Karibu kwenye Bender School Information System" },
  "/analytics": { title: "Takwimu & Uchambuzi", subtitle: "Ripoti za kina za shule" },
  "/students": { title: "Wanafunzi", subtitle: "Usimamizi wa wanafunzi wote" },
  "/academics": { title: "Masomo", subtitle: "Muundo wa masomo na mitaala" },
  "/attendance": { title: "Mahudhurio", subtitle: "Ufuatiliaji wa mahudhurio ya kila siku" },
  "/grades": { title: "Alama & Ripoti", subtitle: "Matokeo na kadi za ripoti" },
  "/timetable": { title: "Ratiba", subtitle: "Ratiba za masomo na walimu" },
  "/staff": { title: "Wafanyakazi", subtitle: "Usimamizi wa walimu na wafanyakazi" },
  "/finance": { title: "Fedha & Ada", subtitle: "Usimamizi wa malipo na fedha" },
  "/inventory": { title: "Mali & Bidhaa", subtitle: "Ufuatiliaji wa mali ya shule" },
  "/library": { title: "Maktaba", subtitle: "Usimamizi wa vitabu na mikopo" },
  "/communication": { title: "Mawasiliano", subtitle: "Ujumbe na mawasiliano" },
  "/announcements": { title: "Matangazo", subtitle: "Tangazo na habari za shule" },
  "/users": { title: "Watumiaji & Majukumu", subtitle: "Udhibiti wa usalama na ruhusa" },
  "/settings": { title: "Mipangilio", subtitle: "Usanidi wa mfumo" },
};

export function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const page = pageTitles[location.pathname] || { title: "Bender SIS", subtitle: "" };

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
