import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ErrorBoundary from '@/components/ErrorBoundary';

// Lazy load components to improve initial load time
const LoginPage = React.lazy(() => import('@/components/LoginPage'));
const DashboardLayout = React.lazy(() => import('@/components/DashboardLayout'));
const Dashboard = React.lazy(() => import('@/components/Dashboard'));
const StudentsPage = React.lazy(() => import('@/components/StudentsPage'));
const TeachersPage = React.lazy(() => import('@/components/TeachersPage'));
const TeacherProfilePage = React.lazy(() => import('@/components/TeacherProfilePage'));
const UserProfilePage = React.lazy(() => import('@/components/UserProfilePage'));
const CoursesPage = React.lazy(() => import('@/components/CoursesPage'));
const SchedulePage = React.lazy(() => import('@/components/SchedulePage'));
const ReportsPage = React.lazy(() => import('@/components/ReportsPage'));
const DocumentsPage = React.lazy(() => import('@/components/DocumentsPage'));
const SettingsPage = React.lazy(() => import('@/components/SettingsPage'));
const FinancePage = React.lazy(() => import('@/components/FinancePage'));
const AttendancePage = React.lazy(() => import('@/components/AttendancePage'));
const ExamsPage = React.lazy(() => import('@/components/ExamsPage'));
const LibraryPage = React.lazy(() => import('@/components/LibraryPage'));
const EventsPage = React.lazy(() => import('@/components/EventsPage'));
const GradesPage = React.lazy(() => import('@/components/GradesPage'));
const StudentAffairsPage = React.lazy(() => import('@/components/StudentAffairsPage'));
const NotFound = React.lazy(() => import('@/pages/NotFound'));

// Loading component for Suspense fallback
const Loading = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400">جاري التحميل...</p>
    </div>
  </div>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppContent = () => {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="students" element={<StudentsPage />} />
            <Route path="teachers" element={<TeachersPage />} />
            <Route path="teachers/:id" element={<TeacherProfilePage />} />
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="exams" element={<ExamsPage />} />
            <Route path="library" element={<LibraryPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="grades" element={<GradesPage />} />
            <Route path="student-affairs" element={<StudentAffairsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="finance" element={<FinancePage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <AppContent />
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
