import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import { AuthProvider, useAuth, type AppRole } from "@/lib/auth";

const queryClient = new QueryClient();

function roleDashboardPath(role: AppRole) {
  if (role === "admin") return "/admin/dashboard";
  if (role === "teacher") return "/teacher/dashboard";
  return "/student/dashboard";
}

function HomeRoute() {
  const auth = useAuth();
  if (!auth.isReady) return null;
  if (auth.isAuthenticated && auth.userId && auth.role) {
    return <Navigate to={roleDashboardPath(auth.role)} replace />;
  }
  return <LandingPage />;
}

function ProtectedRoute({ children, allow }: { children: JSX.Element; allow: AppRole[] }) {
  const auth = useAuth();
  if (!auth.isReady) return null;
  if (!auth.isAuthenticated || !auth.userId || !auth.role) return <Navigate to="/login" replace />;
  if (!allow.includes(auth.role)) return <Navigate to={roleDashboardPath(auth.role)} replace />;
  return children;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeRoute />} />
            <Route path="/dashboard" element={<HomeRoute />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/forbidden" element={<ForbiddenPage />} />

            {/* Teacher */}
            <Route path="/teacher/dashboard" element={<ProtectedRoute allow={["teacher"]}><TeacherDashboard /></ProtectedRoute>} />
            <Route path="/teacher/sessions" element={<ProtectedRoute allow={["teacher"]}><TeacherSessions /></ProtectedRoute>} />
            <Route path="/teacher/sessions/create" element={<ProtectedRoute allow={["teacher"]}><SessionForm /></ProtectedRoute>} />
            <Route path="/teacher/sessions/:id" element={<ProtectedRoute allow={["teacher"]}><SessionDetail /></ProtectedRoute>} />
            <Route path="/teacher/sessions/:id/edit" element={<ProtectedRoute allow={["teacher"]}><SessionForm /></ProtectedRoute>} />
            <Route path="/teacher/students" element={<ProtectedRoute allow={["teacher"]}><TeacherStudents /></ProtectedRoute>} />
            <Route path="/teacher/students/:id" element={<ProtectedRoute allow={["teacher"]}><StudentProfile /></ProtectedRoute>} />
            <Route path="/teacher/attendance" element={<ProtectedRoute allow={["teacher"]}><TeacherAttendance /></ProtectedRoute>} />
            <Route path="/teacher/notifications" element={<ProtectedRoute allow={["teacher"]}><TeacherNotifications /></ProtectedRoute>} />
            <Route path="/teacher/settings" element={<ProtectedRoute allow={["teacher"]}><TeacherSettings /></ProtectedRoute>} />

            {/* Student */}
            <Route path="/student/dashboard" element={<ProtectedRoute allow={["student"]}><StudentDashboard /></ProtectedRoute>} />
            <Route path="/student/sessions" element={<ProtectedRoute allow={["student"]}><StudentSessions /></ProtectedRoute>} />
            <Route path="/student/sessions/:id" element={<ProtectedRoute allow={["student"]}><StudentSessionDetail /></ProtectedRoute>} />
            <Route path="/student/notifications" element={<ProtectedRoute allow={["student"]}><StudentNotifications /></ProtectedRoute>} />
            <Route path="/student/settings" element={<ProtectedRoute allow={["student"]}><StudentSettings /></ProtectedRoute>} />

            {/* Admin */}
            <Route path="/admin/dashboard" element={<ProtectedRoute allow={["admin"]}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/teachers" element={<ProtectedRoute allow={["admin"]}><AdminTeachers /></ProtectedRoute>} />
            <Route path="/admin/students" element={<ProtectedRoute allow={["admin"]}><AdminStudents /></ProtectedRoute>} />
            <Route path="/admin/students/new" element={<ProtectedRoute allow={["admin"]}><AdminStudentForm /></ProtectedRoute>} />
            <Route path="/admin/students/:id/edit" element={<ProtectedRoute allow={["admin"]}><AdminStudentForm /></ProtectedRoute>} />
            <Route path="/admin/sessions" element={<ProtectedRoute allow={["admin"]}><AdminSessions /></ProtectedRoute>} />
            <Route path="/admin/analytics" element={<ProtectedRoute allow={["admin"]}><AdminAnalytics /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute allow={["admin"]}><AdminSettings /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
