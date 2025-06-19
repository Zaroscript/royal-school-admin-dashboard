import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

function ErrorPageContent({ error }: { error: Error | null }) {
  const { isDark, toggleTheme } = useTheme();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-royal-green/10 dark:from-blue-950/40 dark:via-purple-950/40 dark:to-green-950/20 relative overflow-hidden">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 left-6 z-10 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 shadow-lg p-2"
        aria-label="تبديل المظهر"
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
      <div className="max-w-md w-full p-8 bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950/60 dark:to-purple-950/60 rounded-2xl shadow-2xl border border-royal-blue/40 text-center space-y-6 animate-fade-in-up relative overflow-hidden">
        {/* System Logo */}
        <div className="flex justify-center mb-2">
          <img src="/logo.png" alt="شعار النظام" className="w-20 h-20 object-contain drop-shadow-lg rounded-full border-4 border-royal-blue/20 bg-white mx-auto" />
        </div>
        {/* System Name */}
        <h1 className="text-3xl font-extrabold text-royal-dark dark:text-royal-white mb-1">نظام إدارة مدرسة رويال</h1>
        {/* Error Title */}
        <h2 className="text-xl font-bold text-royal-red dark:text-royal-orange drop-shadow-sm">حدث خطأ غير متوقع</h2>
        {/* Subtitle */}
        <p className="text-base text-muted-foreground mb-2">عذراً، حدث خطأ في النظام. يرجى إعادة تحميل الصفحة أو المحاولة لاحقاً.</p>
        <button
          className="mt-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold shadow hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
          onClick={() => window.location.reload()}
        >
          إعادة تحميل الصفحة
        </button>
        {process.env.NODE_ENV === 'development' && error && (
          <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto text-sm text-left">
            {error.toString()}
          </pre>
        )}
        {/* Decorative Gradient Blur */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-royal-blue/20 to-royal-green/20 rounded-full blur-2xl z-0" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-royal-red/20 to-royal-orange/20 rounded-full blur-2xl z-0" />
      </div>
    </div>
  );
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorPageContent error={this.state.error} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
