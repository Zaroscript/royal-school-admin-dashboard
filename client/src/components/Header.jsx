import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import {
  Bell,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Search,
  Menu,
  Shield,
  Activity,
  Zap,
  Crown,
  Star
} from 'lucide-react';

const Header = ({ onMenuClick }) => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  // Refs for dropdown containers
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);

  const notifications = [
    { id: 1, title: 'تسجيل طالب جديد', message: 'تم تسجيل أحمد علي بنجاح', time: 'منذ دقيقتين', type: 'success' },
    { id: 2, title: 'تحديث جدول الامتحانات', message: 'تم تحديث جدول الامتحانات النهائية', time: 'منذ ساعة', type: 'info' },
    { id: 3, title: 'استلام دفعة مالية', message: 'تم استلام دفعة من سارة أحمد', time: 'منذ 3 ساعات', type: 'success' },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setIsProfileOpen(false); // Close dropdown
    navigate('/profile');
  };

  const handleSettingsClick = () => {
    setIsProfileOpen(false); // Close dropdown
    navigate('/settings');
  };

  const handleSignOut = async () => {
    try {
      setIsProfileOpen(false); // Close dropdown
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  const handleViewAllNotifications = () => {
    setIsNotificationsOpen(false); // Close dropdown
    // Navigate to notifications page or handle as needed
    // navigate('/notifications');
  };

  // Generate user initials for placeholder
  const getUserInitials = (name) => {
    if (!name) return 'م';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Enhanced user avatar component
  const UserAvatar = ({ user, size = 'md' }) => {
    const sizeClasses = {
      sm: 'h-8 w-8 text-sm',
      md: 'h-10 w-10 text-base',
      lg: 'h-12 w-12 text-lg'
    };

    if (user?.avatar) {
      return (
        <img
          src={user.avatar}
          alt="Profile"
          className={`${sizeClasses[size]} rounded-full border-2 border-blue-200 dark:border-blue-600 shadow-md hover:scale-105 transition-all duration-200`}
        />
      );
    }

    return (
      <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold flex items-center justify-center border-2 border-blue-200 dark:border-blue-600 shadow-md hover:scale-105 transition-all duration-200`}>
        {getUserInitials(user?.name)}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left Section - Menu and Logo */}
        <div className="flex items-center space-x-4 space-x-reverse">
          <button
            onClick={onMenuClick}
            className="inline-flex items-center justify-center rounded-lg p-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none transition-all duration-200 lg:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </button>
          
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="relative group">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300">
                <Crown className="h-5 w-5 text-white" />
              </div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Royal School
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                نظام إدارة مدرسة رويال
              </p>
            </div>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="البحث في النظام..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-200 placeholder-slate-500 dark:placeholder-slate-400"
            />
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2 space-x-reverse">
          {/* System Status */}
          <div className="hidden lg:flex items-center space-x-2 space-x-reverse px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">متصل</span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="inline-flex items-center justify-center rounded-lg p-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none transition-all duration-200"
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none transition-all duration-200 relative"
          >
            <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-medium animate-pulse">
                  {notifications.length}
                </span>
              )}
              <span className="sr-only">View notifications</span>
            </button>

            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <div className="absolute left-0 mt-2 w-80 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md p-4 shadow-xl z-50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-slate-900 dark:text-white">الإشعارات</h3>
                  <button 
                    onClick={handleViewAllNotifications}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
                  >
                    عرض الكل
                  </button>
                </div>
                <div className="space-y-3">
                  {notifications.map((notification, index) => (
                    <div
                      key={notification.id}
                      className="flex items-start space-x-3 space-x-reverse p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 cursor-pointer"
                      onClick={() => setIsNotificationsOpen(false)}
                    >
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        notification.type === 'success' ? 'bg-emerald-500' : 
                        notification.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{notification.title}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{notification.message}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="inline-flex items-center justify-center space-x-2 space-x-reverse rounded-lg p-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none transition-all duration-200"
            >
              <div className="relative">
                <UserAvatar user={user} size="sm" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800 animate-pulse"></div>
              </div>
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-slate-900 dark:text-white">{user?.name || 'المستخدم'}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">{user?.role || 'مدير النظام'}</p>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute left-0 mt-2 w-64 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md p-4 shadow-xl z-50">
                <div className="flex items-center space-x-3 space-x-reverse mb-4">
                  <div className="relative">
                    <UserAvatar user={user} size="md" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800 animate-pulse"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{user?.name || 'المستخدم'}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{user?.email || 'user@royalschool.edu'}</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <button 
                    onClick={handleProfileClick}
                    className="w-full flex items-center space-x-2 space-x-reverse rounded-lg px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 focus:outline-none"
                  >
                    <User className="h-4 w-4" />
                    <span>الملف الشخصي</span>
                  </button>
                  <button 
                    onClick={handleSettingsClick}
                    className="w-full flex items-center space-x-2 space-x-reverse rounded-lg px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 focus:outline-none"
                  >
                    <Settings className="h-4 w-4" />
                    <span>الإعدادات</span>
                  </button>
                  <button 
                    onClick={handleSignOut}
                    className="w-full flex items-center space-x-2 space-x-reverse rounded-lg px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 focus:outline-none"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>تسجيل الخروج</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
