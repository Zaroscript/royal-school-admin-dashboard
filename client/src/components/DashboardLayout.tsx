import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Home,
  Users,
  BookOpen,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  GraduationCap,
  UserCheck,
  BarChart3,
  FileText,
  DollarSign,
  TrendingUp,
  BadgeCheck
} from 'lucide-react';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1] || 'dashboard';

  const menuItems = [
    { id: '', label: 'لوحة التحكم', icon: Home },
    { id: 'students', label: 'الطلاب', icon: Users },
    { id: 'teachers', label: 'المعلمين', icon: GraduationCap },
    { id: 'attendance', label: 'الحضور والغياب', icon: UserCheck },
    { id: 'courses', label: 'المواد الدراسية', icon: BookOpen },
    { id: 'exams', label: 'الامتحانات', icon: FileText },
    { id: 'schedule', label: 'الجدول الدراسي', icon: Calendar },
    { id: 'library', label: 'المكتبة', icon: BookOpen },
    { id: 'events', label: 'الأحداث', icon: Calendar },
    { id: 'student-affairs', label: 'شؤون الطلاب', icon: Users },
    { id: 'grades', label: 'الدرجات والتقدم', icon: TrendingUp },
    { id: 'finance', label: 'الإدارة المالية', icon: DollarSign },
    { id: 'reports', label: 'التقارير', icon: BarChart3 },
    { id: 'documents', label: 'المستندات', icon: FileText },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-40 w-64 h-screen transition-transform ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } md:translate-x-0`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold">Royal School</h2>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          <ul className="space-y-2 font-medium">
            {menuItems.map((item) => {
              const isActive = currentPath === item.id;
              const ItemIcon = item.icon;
              return (
                <li key={item.id}>
                  <Link
                    to={`/${item.id}`}
                    className={`flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                      isActive ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    <ItemIcon className={`w-5 h-5 ${isActive ? 'text-blue-600 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'}`} />
                    <span className="ms-3">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <div className="md:mr-64">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem className="flex-col items-start">
                    <div className="font-medium">{user?.name}</div>
                    <div className="text-sm text-gray-500">{user?.email}</div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>تسجيل الخروج</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
