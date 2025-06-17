import React, { useState } from 'react';
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

  const notifications = [
    { id: 1, title: 'New student registration', message: 'Ahmed Ali has been registered', time: '2 min ago', type: 'success' },
    { id: 2, title: 'Exam schedule updated', message: 'Final exams schedule has been updated', time: '1 hour ago', type: 'info' },
    { id: 3, title: 'Payment received', message: 'Payment received from Sarah Ahmed', time: '3 hours ago', type: 'success' },
  ];

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 animate-slide-in-bottom">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left Section - Menu and Logo */}
        <div className="flex items-center space-x-4 space-x-reverse">
          <button
            onClick={onMenuClick}
            className="inline-flex items-center justify-center rounded-lg p-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-0 focus:border-0 transition-all duration-200 lg:hidden hover-glow hover-bounce"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </button>
          
          <div className="flex items-center space-x-3 space-x-reverse animate-slide-in-left">
            <div className="relative group">
              <img 
                src="/logo.png" 
                alt="Royal School Logo" 
                className="h-8 w-8 rounded-lg shadow-lg hover-scale transition-all duration-300"
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover-scale">
                Royal School
              </h1>
              <p className="text-xs text-muted-foreground">
                نظام إدارة المدرسة الملكية
              </p>
            </div>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-4 hidden md:block animate-slide-in-bottom stagger-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="البحث في النظام..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-background border border-input rounded-lg focus:outline-none focus:ring-0 focus:border-input transition-all duration-200 royal-input hover-glow focus:scale-105"
            />
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2 space-x-reverse animate-slide-in-right">
          {/* System Status */}
          <div className="hidden lg:flex items-center space-x-2 space-x-reverse px-3 py-1 rounded-full bg-success/10 border border-success/20">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-success font-medium">متصل</span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="inline-flex items-center justify-center rounded-lg p-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-0 focus:border-0 transition-all duration-200 hover-glow hover-bounce"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-warning" />
            ) : (
              <Moon className="h-5 w-5 text-primary" />
            )}
            <span className="sr-only">Toggle theme</span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-0 focus:border-0 transition-all duration-200 hover-glow hover-bounce relative"
          >
            <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-danger text-danger-foreground text-xs flex items-center justify-center font-medium animate-heart-beat">
                  {notifications.length}
                </span>
              )}
              <span className="sr-only">View notifications</span>
            </button>

            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <div className="absolute left-0 mt-2 w-80 rounded-lg border bg-popover p-4 shadow-lg z-50 animate-slide-in-top dropdown-content">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">الإشعارات</h3>
                  <button className="text-xs text-primary hover:underline focus:outline-none focus:ring-0 focus:border-0 hover-scale">عرض الكل</button>
                </div>
                <div className="space-y-3">
                  {notifications.map((notification, index) => (
                    <div
                      key={notification.id}
                      className="flex items-start space-x-3 space-x-reverse p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-300 cursor-pointer hover-lift animate-slide-in-left"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className={`w-3 h-3 rounded-full mt-2 animate-pulse ${
                        notification.type === 'success' ? 'bg-success' : 
                        notification.type === 'warning' ? 'bg-warning' : 'bg-primary'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground hover-scale">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="inline-flex items-center justify-center space-x-2 space-x-reverse rounded-lg p-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-0 focus:border-0 transition-all duration-200 hover-glow hover-bounce"
            >
              <div className="relative">
                <img
                  src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"}
                  alt="Profile"
                  className="h-8 w-8 rounded-full border-2 border-primary/20 hover-scale"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background animate-pulse"></div>
              </div>
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-foreground hover-scale">{user?.name || 'المستخدم'}</p>
                <p className="text-xs text-muted-foreground">{user?.role || 'مدير النظام'}</p>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute left-0 mt-2 w-64 rounded-lg border bg-popover p-4 shadow-lg z-50 animate-slide-in-top dropdown-content">
                <div className="flex items-center space-x-3 space-x-reverse mb-4">
                  <div className="relative">
                    <img
                      src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"}
                      alt="Profile"
                      className="h-10 w-10 rounded-full border-2 border-primary/20"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background animate-pulse"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{user?.name || 'المستخدم'}</p>
                    <p className="text-sm text-muted-foreground">{user?.email || 'user@royalschool.edu'}</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <button 
                    onClick={handleProfileClick}
                    className="w-full flex items-center space-x-2 space-x-reverse rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 focus:outline-none focus:ring-0 focus:border-0 hover-lift"
                  >
                    <User className="h-4 w-4" />
                    <span>الملف الشخصي</span>
                  </button>
                  <button 
                    onClick={handleSettingsClick}
                    className="w-full flex items-center space-x-2 space-x-reverse rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 focus:outline-none focus:ring-0 focus:border-0 hover-lift"
                  >
                    <Settings className="h-4 w-4" />
                    <span>الإعدادات</span>
                  </button>
                  <button 
                    onClick={handleSignOut}
                    className="w-full flex items-center space-x-2 space-x-reverse rounded-lg px-3 py-2 text-sm text-danger hover:bg-danger/10 transition-all duration-200 focus:outline-none focus:ring-0 focus:border-0 hover-lift"
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
