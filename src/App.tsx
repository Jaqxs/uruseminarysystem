import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Academics from "./pages/Academics";
import Attendance from "./pages/Attendance";
import Finance from "./pages/Finance";
import Staff from "./pages/Staff";
import Timetable from "./pages/Timetable";
import Communication from "./pages/Communication";
import Announcements from "./pages/Announcements";
import Inventory from "./pages/Inventory";
import Library from "./pages/Library";
import Grades from "./pages/Grades";
import UsersRoles from "./pages/UsersRoles";
import SystemSettings from "./pages/SystemSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/grades" element={<Grades />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/library" element={<Library />} />
            <Route path="/communication" element={<Communication />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/users" element={<UsersRoles />} />
            <Route path="/settings" element={<SystemSettings />} />
            <Route path="/analytics" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
