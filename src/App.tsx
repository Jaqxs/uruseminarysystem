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

import Announcements from "./pages/Announcements";
import Inventory from "./pages/Inventory";
import Grades from "./pages/Grades";
import Examinations from "./pages/Examinations";
import Analytics from "./pages/Analytics";
import UsersRoles from "./pages/UsersRoles";
import SystemSettings from "./pages/SystemSettings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import TeacherDashboard from "./pages/TeacherDashboard";
import AcademicMasterDashboard from "./pages/AcademicMasterDashboard";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/teacher" element={<TeacherDashboard />} />
                <Route path="/academic-master" element={<AcademicMasterDashboard />} />
                <Route path="/students" element={<Students />} />
                <Route path="/academics" element={<Academics />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/grades" element={<Grades />} />
                <Route path="/exams" element={<Examinations />} />
                <Route path="/timetable" element={<Timetable />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/finance" element={<Finance />} />
                <Route path="/inventory" element={<Inventory />} />

                <Route path="/announcements" element={<Announcements />} />
                <Route path="/users" element={<UsersRoles />} />
                <Route path="/settings" element={<SystemSettings />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
