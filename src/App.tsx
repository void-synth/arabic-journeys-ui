import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";

import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherSessions from "./pages/teacher/TeacherSessions";
import SessionForm from "./pages/teacher/SessionForm";
import SessionDetail from "./pages/teacher/SessionDetail";
import TeacherStudents from "./pages/teacher/TeacherStudents";
import AdminStudentForm from "./pages/admin/AdminStudentForm";
import StudentProfile from "./pages/teacher/StudentProfile";
import TeacherAttendance from "./pages/teacher/TeacherAttendance";
import TeacherNotifications from "./pages/teacher/TeacherNotifications";
import TeacherSettings from "./pages/teacher/TeacherSettings";

import StudentDashboard from "./pages/student/StudentDashboard";
import StudentSessions from "./pages/student/StudentSessions";
import StudentSessionDetail from "./pages/student/StudentSessionDetail";
import StudentNotifications from "./pages/student/StudentNotifications";
import StudentSettings from "./pages/student/StudentSettings";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTeachers from "./pages/admin/AdminTeachers";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminSessions from "./pages/admin/AdminSessions";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";

import NotFound from "./pages/NotFound";
import ForbiddenPage from "./pages/ForbiddenPage";
import OnboardingPage from "./pages/OnboardingPage";

import { UnderConstructionGate } from "@/components/shared/UnderConstructionGate";
import { AuthProvider } from "@/lib/auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UnderConstructionGate>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/verify-email" element={<VerifyEmailPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/forbidden" element={<ForbiddenPage />} />

              {/* Teacher */}
              <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
              <Route path="/teacher/sessions" element={<TeacherSessions />} />
              <Route path="/teacher/sessions/create" element={<SessionForm />} />
              <Route path="/teacher/sessions/:id" element={<SessionDetail />} />
              <Route path="/teacher/sessions/:id/edit" element={<SessionForm />} />
              <Route path="/teacher/students" element={<TeacherStudents />} />
              <Route path="/teacher/students/:id" element={<StudentProfile />} />
              <Route path="/teacher/attendance" element={<TeacherAttendance />} />
              <Route path="/teacher/notifications" element={<TeacherNotifications />} />
              <Route path="/teacher/settings" element={<TeacherSettings />} />

              {/* Student */}
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/sessions" element={<StudentSessions />} />
              <Route path="/student/sessions/:id" element={<StudentSessionDetail />} />
              <Route path="/student/notifications" element={<StudentNotifications />} />
              <Route path="/student/settings" element={<StudentSettings />} />

              {/* Admin */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/teachers" element={<AdminTeachers />} />
              <Route path="/admin/students" element={<AdminStudents />} />
              <Route path="/admin/students/new" element={<AdminStudentForm />} />
              <Route path="/admin/students/:id/edit" element={<AdminStudentForm />} />
              <Route path="/admin/sessions" element={<AdminSessions />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              <Route path="/admin/settings" element={<AdminSettings />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </UnderConstructionGate>
  </QueryClientProvider>
);

export default App;
