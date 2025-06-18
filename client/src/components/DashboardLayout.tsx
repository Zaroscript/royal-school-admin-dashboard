import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Header from './Header';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  Crown,
  Shield,
  Activity,
  Bell,
  User,
  Home,
  School,
  Library,
  Calculator,
  CreditCard,
  ClipboardList,
  Award,
  Clock,
  TrendingUp,
  Database,
  Server,
  Wifi,
  Battery,
  Zap,
  Star,
  Target,
  Trophy,
  ChevronRight,
  ChevronLeft,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Sun,
  Moon,
  Volume2,
  VolumeX
} from 'lucide-react';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const navigation = [
    {
      name: 'لوحة التحكم',
      href: '/dashboard',
      icon: LayoutDashboard,
      badge: null,
      description: 'نظرة عامة على النظام',
      gradient: 'from-blue-600 to-purple-600',
      category: 'main'
    },
    {
      name: 'الطلاب',
      href: '/students',
      icon: Users,
      badge: '125',
      description: 'إدارة بيانات الطلاب',
      gradient: 'from-blue-500 to-indigo-500',
      category: 'academic'
    },
    {
      name: 'المعلمين',
      href: '/teachers',
      icon: GraduationCap,
      badge: '45',
      description: 'إدارة بيانات المعلمين',
      gradient: 'from-indigo-500 to-purple-500',
      category: 'academic'
    },
    {
      name: 'المواد الدراسية',
      href: '/courses',
      icon: BookOpen,
      badge: '32',
      description: 'إدارة المواد والمناهج',
      gradient: 'from-purple-500 to-blue-500',
      category: 'academic'
    },
    {
      name: 'الجدول الدراسي',
      href: '/schedule',
      icon: Calendar,
      badge: null,
      description: 'إدارة الجداول الدراسية',
      gradient: 'from-blue-600 to-cyan-500',
      category: 'academic'
    },
    {
      name: 'الحضور والغياب',
      href: '/attendance',
      icon: ClipboardList,
      badge: 'اليوم',
      description: 'تتبع حضور الطلاب',
      gradient: 'from-cyan-500 to-blue-500',
      category: 'academic'
    },
    {
      name: 'الامتحانات',
      href: '/exams',
      icon: Award,
      badge: 'قريب',
      description: 'إدارة الامتحانات والنتائج',
      gradient: 'from-blue-500 to-purple-600',
      category: 'academic'
    },
    {
      name: 'الدرجات',
      href: '/grades',
      icon: TrendingUp,
      badge: null,
      description: 'إدارة درجات الطلاب',
      gradient: 'from-purple-600 to-blue-500',
      category: 'academic'
    },
    {
      name: 'المكتبة',
      href: '/library',
      icon: Library,
      badge: '1.2K',
      description: 'إدارة المكتبة والكتب',
      gradient: 'from-blue-500 to-indigo-600',
      category: 'services'
    },
    {
      name: 'الأنشطة والفعاليات',
      href: '/events',
      icon: Activity,
      badge: '5',
      description: 'إدارة الأنشطة المدرسية',
      gradient: 'from-indigo-600 to-purple-500',
      category: 'services'
    },
    {
      name: 'الوثائق',
      href: '/documents',
      icon: FileText,
      badge: '250',
      description: 'إدارة الوثائق والملفات',
      gradient: 'from-purple-500 to-blue-600',
      category: 'services'
    },
    {
      name: 'الشؤون المالية',
      href: '/finance',
      icon: CreditCard,
      badge: 'محدث',
      description: 'إدارة الشؤون المالية',
      gradient: 'from-blue-600 to-purple-500',
      category: 'finance'
    },
    {
      name: 'التقارير',
      href: '/reports',
      icon: BarChart3,
      badge: null,
      description: 'عرض وتحليل التقارير',
      gradient: 'from-purple-500 to-indigo-500',
      category: 'reports'
    },
    {
      name: 'شؤون الطلاب',
      href: '/student-affairs',
      icon: School,
      badge: '12',
      description: 'إدارة شؤون الطلاب',
      gradient: 'from-indigo-500 to-blue-600',
      category: 'services'
    },
    {
      name: 'الإعدادات',
      href: '/settings',
      icon: Settings,
      badge: null,
      description: 'إعدادات النظام',
      gradient: 'from-blue-500 to-purple-600',
      category: 'system'
    }
  ];

  const filteredNavigation = navigation.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const isActive = (href) => location.pathname === href;

  const categories = {
    main: 'الرئيسية',
    academic: 'الأكاديمي',
    services: 'الخدمات',
    finance: 'المالية',
    reports: 'التقارير',
    system: 'النظام'
  };

  const groupedNavigation = filteredNavigation.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="h-screen bg-background flex animate-fade-in-up overflow-hidden">
      {/* Sticky Sidebar */}
      <aside className={`fixed inset-y-0 right-0 z-50 w-72 transform transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
      } lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen`}>
        <div className="flex h-full flex-col bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-l border-slate-200 dark:border-slate-700 shadow-2xl">
          {/* Sidebar Header */}
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 p-6 relative overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-blue-600/20 animate-pulse-slow"></div>
            <div className="relative z-10 flex items-center space-x-3 space-x-reverse">
              <div className="relative group">
                <img 
                  src="/logo.png" 
                  alt="Royal School Logo" 
                  className="h-12 w-12 rounded-xl shadow-lg hover-scale transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-white animate-slide-in-left">
                  Royal School
                </h1>
                <p className="text-xs text-white/80 animate-slide-in-left stagger-1">
                  نظام إدارة مدرسة رويال
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="البحث في القائمة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2 text-sm bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4 overflow-y-auto custom-scrollbar min-h-0">
            {Object.entries(groupedNavigation).map(([category, items]) => (
              <div key={category} className="space-y-2">
                <div className="px-3 py-2">
                  <h3 className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    {categories[category]}
                  </h3>
                </div>
                {(items as any[]).map((item, index) => {
                  const Icon = item.icon;
              return (
                    <button
                      key={item.name}
                      onClick={() => {
                        navigate(item.href);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 group focus:outline-none focus:ring-0 focus:border-0 hover-lift animate-slide-in-left nav-item ${
                        isActive(item.href)
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className={`p-2 rounded-lg transition-all duration-300 ${
                        isActive(item.href)
                          ? 'bg-white/20 text-white'
                          : `bg-gradient-to-br ${item.gradient} text-white group-hover:scale-110`
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 text-right">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.name}</span>
                          {item.badge && (
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              isActive(item.href)
                                ? 'bg-white/20 text-white'
                                : 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs opacity-70 mt-1">{item.description}</p>
                      </div>
                    </button>
              );
            })}
              </div>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-3 flex-shrink-0">
            {/* User Profile */}
            <div className="flex items-center space-x-3 space-x-reverse p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300">
              <div className="relative">
                <img
                  src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"}
                  alt="Profile"
                  className="h-10 w-10 rounded-full border-2 border-blue-200 dark:border-blue-600 hover-scale"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800 animate-pulse"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900 dark:text-white">{user?.name || 'المستخدم'}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">{user?.role || 'مدير النظام'}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={toggleTheme}
                className="flex-1 flex items-center justify-center space-x-2 space-x-reverse px-3 py-2 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 hover-lift"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span>{isDark ? 'الوضع النهاري' : 'الوضع الليلي'}</span>
              </button>
              <button className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all duration-300 hover-lift">
                <Volume2 className="h-4 w-4" />
              </button>
            </div>
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 space-x-reverse px-4 py-3 text-sm font-medium rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 hover-lift"
            >
              <LogOut className="h-5 w-5" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 lg:mr-0">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-6 animate-fade-in-up">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden animate-fade-in-up backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
