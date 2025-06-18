import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
  Calendar,
  Clock,
  Award,
  Activity,
  BarChart3,
  Eye,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Crown,
  Shield,
  Database,
  Server,
  Zap,
  Star,
  Target,
  Trophy,
  DollarSign,
  CreditCard,
  FileText,
  Bell,
  Settings,
  Search,
  Filter,
  Download,
  Upload,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Info,
  Sun,
  Cloud,
  CloudRain,
  Thermometer,
  Wind,
  Bookmark,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Globe,
  Wifi,
  Battery,
  Volume2,
  VolumeX,
  Moon,
  Sunrise,
  Sunset,
  Clock4,
  CalendarDays,
  PieChart,
  LineChart,
  AreaChart,
  ScatterChart,
  TrendingDown,
  Minus,
  Equal,
  Percent,
  Hash,
  HashIcon,
  Calculator,
  ClipboardList,
  FileCheck,
  FileX,
  FilePlus,
  FileMinus,
  FileEdit,
  FileSearch,
  FileBarChart,
  FileSpreadsheet,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileCode,
  FileJson,
  FileTextIcon,
  FileType,
  FileDigit,
  FileSymlink,
  FileHeart,
  FileWarning,
  FileQuestion,
  FileLock,
  FileKey,
  UserPlus,
  Cpu,
  HardDrive
} from 'lucide-react';
import { AreaChart as UiAreaChart } from './ui/charts/area-chart';
import { BarChart as UiBarChart } from './ui/charts/bar-chart';
import { PieChart as UiPieChart } from './ui/charts/pie-chart';
import { LineChart as UiLineChart } from './ui/charts/line-chart';

const Dashboard = () => {
  const quickStats = [
    {
      title: 'إجمالي الطلاب',
      value: '1,247',
      change: '+12%',
      changeType: 'increase',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-500/10',
      description: 'مقارنة بالشهر الماضي',
      gradient: 'from-blue-500/20 to-blue-500/5'
    },
    {
      title: 'المعلمين النشطين',
      value: '45',
      change: '+3',
      changeType: 'increase',
      icon: GraduationCap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-500/10',
      description: 'مقارنة بالشهر الماضي',
      gradient: 'from-purple-500/20 to-purple-500/5'
    },
    {
      title: 'المواد الدراسية',
      value: '32',
      change: '+2',
      changeType: 'increase',
      icon: BookOpen,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-500/10',
      description: 'مقارنة بالشهر الماضي',
      gradient: 'from-indigo-500/20 to-indigo-500/5'
    },
    {
      title: 'معدل الحضور',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-500/10',
      description: 'مقارنة بالأسبوع الماضي',
      gradient: 'from-cyan-500/20 to-cyan-500/5'
    }
  ];

  const recentActivities = [
    { id: 1, action: 'تم تسجيل طالب جديد', user: 'أحمد علي', time: 'منذ 5 دقائق', type: 'success', icon: UserPlus },
    { id: 2, action: 'تم تحديث جدول الامتحانات', user: 'سارة أحمد', time: 'منذ ساعة', type: 'info', icon: Calendar },
    { id: 3, action: 'تم استلام دفعة مالية', user: 'محمد حسن', time: 'منذ 3 ساعات', type: 'success', icon: DollarSign },
    { id: 4, action: 'تم إضافة مادة دراسية جديدة', user: 'فاطمة علي', time: 'منذ 5 ساعات', type: 'warning', icon: BookOpen },
    { id: 5, action: 'تم إرسال تقرير الأداء', user: 'علي محمد', time: 'منذ 6 ساعات', type: 'info', icon: FileText },
    { id: 6, action: 'تم تحديث بيانات المعلم', user: 'نور الدين', time: 'منذ 8 ساعات', type: 'success', icon: Edit },
  ];

  const upcomingEvents = [
    { id: 1, title: 'امتحانات منتصف الفصل', date: '15 مارس', type: 'exam', priority: 'high', icon: FileText },
    { id: 2, title: 'اجتماع أولياء الأمور', date: '20 مارس', type: 'meeting', priority: 'medium', icon: Users },
    { id: 3, title: 'رحلة مدرسية', date: '25 مارس', type: 'trip', priority: 'low', icon: MapPin },
    { id: 4, title: 'حفل التخرج', date: '30 مارس', type: 'ceremony', priority: 'high', icon: Trophy },
    { id: 5, title: 'ورشة عمل للمعلمين', date: '5 أبريل', type: 'workshop', priority: 'medium', icon: GraduationCap },
    { id: 6, title: 'معرض العلوم', date: '10 أبريل', type: 'exhibition', priority: 'low', icon: BookOpen },
  ];

  const notifications = [
    { id: 1, title: 'تحديث النظام', message: 'تم تحديث النظام إلى الإصدار الجديد', time: 'منذ 10 دقائق', type: 'info', read: false },
    { id: 2, title: 'دفعة مالية جديدة', message: 'تم استلام دفعة مالية بقيمة 5000 ريال', time: 'منذ ساعة', type: 'success', read: false },
    { id: 3, title: 'تقرير الحضور', message: 'تقرير الحضور الشهري جاهز للتحميل', time: 'منذ 3 ساعات', type: 'warning', read: true },
    { id: 4, title: 'صيانة النظام', message: 'سيتم إجراء صيانة للنظام غداً من 2-4 صباحاً', time: 'منذ 5 ساعات', type: 'info', read: true },
  ];

  const academicPerformance = [
    { subject: 'الرياضيات', average: 85, improvement: '+5%', students: 120, color: 'bg-red-500' },
    { subject: 'العلوم', average: 78, improvement: '+3%', students: 115, color: 'bg-blue-500' },
    { subject: 'اللغة العربية', average: 92, improvement: '+7%', students: 125, color: 'bg-green-500' },
    { subject: 'اللغة الإنجليزية', average: 81, improvement: '+4%', students: 118, color: 'bg-orange-500' },
    { subject: 'الدراسات الاجتماعية', average: 88, improvement: '+6%', students: 122, color: 'bg-purple-500' },
  ];

  const financialOverview = [
    { month: 'يناير', income: 45000, expenses: 32000, profit: 13000 },
    { month: 'فبراير', income: 48000, expenses: 35000, profit: 13000 },
    { month: 'مارس', income: 52000, expenses: 38000, profit: 14000 },
    { month: 'أبريل', income: 49000, expenses: 36000, profit: 13000 },
    { month: 'مايو', income: 55000, expenses: 40000, profit: 15000 },
    { month: 'يونيو', income: 58000, expenses: 42000, profit: 16000 },
  ];

  const attendanceTrends = [
    { day: 'الأحد', attendance: 95, absent: 5 },
    { day: 'الاثنين', attendance: 92, absent: 8 },
    { day: 'الثلاثاء', attendance: 94, absent: 6 },
    { day: 'الأربعاء', attendance: 96, absent: 4 },
    { day: 'الخميس', attendance: 93, absent: 7 },
    { day: 'الجمعة', attendance: 0, absent: 0 },
    { day: 'السبت', attendance: 0, absent: 0 },
  ];

  const systemMetrics = [
    { name: 'استخدام المعالج', value: 23, color: 'bg-blue-500', icon: Cpu },
    { name: 'استخدام الذاكرة', value: 67, color: 'bg-orange-500', icon: HardDrive },
    { name: 'مساحة التخزين', value: 45, color: 'bg-green-500', icon: HardDrive },
    { name: 'استخدام الشبكة', value: 34, color: 'bg-purple-500', icon: Wifi },
    { name: 'قوة البطارية', value: 89, color: 'bg-red-500', icon: Battery },
  ];

  const weatherData = {
    temperature: 28,
    condition: 'مشمس',
    humidity: 65,
    windSpeed: 12,
    icon: Sun,
    forecast: [
      { day: 'اليوم', temp: 28, icon: Sun },
      { day: 'غداً', temp: 26, icon: Cloud },
      { day: 'بعد غد', temp: 24, icon: CloudRain },
      { day: 'الخميس', temp: 27, icon: Sun },
    ]
  };

  // Chart Data
  const attendanceChartData = [
    { month: 'يناير', حضور: 94, غياب: 6 },
    { month: 'فبراير', حضور: 92, غياب: 8 },
    { month: 'مارس', حضور: 96, غياب: 4 },
    { month: 'أبريل', حضور: 93, غياب: 7 },
    { month: 'مايو', حضور: 95, غياب: 5 },
    { month: 'يونيو', حضور: 97, غياب: 3 },
  ];

  const academicChartData = [
    { subject: 'الرياضيات', متوسط: 85, طلاب: 120 },
    { subject: 'العلوم', متوسط: 78, طلاب: 115 },
    { subject: 'اللغة العربية', متوسط: 92, طلاب: 125 },
    { subject: 'اللغة الإنجليزية', متوسط: 81, طلاب: 118 },
    { subject: 'الدراسات الاجتماعية', متوسط: 88, طلاب: 122 },
  ];

  const financialChartData = [
    { month: 'يناير', إيرادات: 45000, مصروفات: 32000 },
    { month: 'فبراير', إيرادات: 48000, مصروفات: 35000 },
    { month: 'مارس', إيرادات: 52000, مصروفات: 38000 },
    { month: 'أبريل', إيرادات: 49000, مصروفات: 36000 },
    { month: 'مايو', إيرادات: 55000, مصروفات: 40000 },
    { month: 'يونيو', إيرادات: 58000, مصروفات: 42000 },
  ];

  const studentDistributionData = [
    { name: 'الصف الأول', value: 180 },
    { name: 'الصف الثاني', value: 165 },
    { name: 'الصف الثالث', value: 190 },
    { name: 'الصف الرابع', value: 175 },
    { name: 'الصف الخامس', value: 200 },
    { name: 'الصف السادس', value: 185 },
  ];

  const performanceTrendData = [
    { week: 'الأسبوع 1', الرياضيات: 82, العلوم: 75, العربية: 89 },
    { week: 'الأسبوع 2', الرياضيات: 85, العلوم: 78, العربية: 91 },
    { week: 'الأسبوع 3', الرياضيات: 87, العلوم: 80, العربية: 93 },
    { week: 'الأسبوع 4', الرياضيات: 89, العلوم: 82, العربية: 94 },
    { week: 'الأسبوع 5', الرياضيات: 91, العلوم: 85, العربية: 95 },
    { week: 'الأسبوع 6', الرياضيات: 93, العلوم: 87, العربية: 96 },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Enhanced Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 p-8 rounded-2xl text-white relative overflow-hidden animate-slide-in-bottom">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-600/20 animate-pulse-slow"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold mb-2 animate-slide-in-left">
                مرحباً بك في نظام إدارة مدرسة رويال
              </h1>
              <p className="text-white/90 text-lg animate-slide-in-left stagger-1">
                نظرة عامة على أداء النظام والإحصائيات المهمة
              </p>
              <div className="flex items-center space-x-4 space-x-reverse animate-slide-in-left stagger-2">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">النظام يعمل بشكل طبيعي</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">آخر تحديث: منذ دقيقتين</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-4 space-x-reverse">
              <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm animate-float">
                <Crown className="h-12 w-12 text-white/80" />
              </div>
              <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm animate-float" style={{ animationDelay: '0.5s' }}>
                <Trophy className="h-12 w-12 text-white/80" />
              </div>
            </div>
          </div>
          
          {/* Quick Actions Bar */}
          <div className="flex flex-wrap gap-3 animate-slide-in-bottom stagger-3">
            <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/30 hover-lift">
              <Plus className="h-4 w-4 ml-2" />
              إضافة طالب جديد
            </Button>
            <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/30 hover-lift">
              <Calendar className="h-4 w-4 ml-2" />
              جدولة حدث
            </Button>
            <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/30 hover-lift">
              <FileText className="h-4 w-4 ml-2" />
              إنشاء تقرير
            </Button>
            <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/30 hover-lift">
              <Settings className="h-4 w-4 ml-2" />
              إعدادات النظام
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={index} 
              className="card-hover hover-lift animate-slide-in-bottom"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} hover-rotate`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="flex items-center space-x-2 space-x-reverse text-xs text-muted-foreground mb-1">
                  {stat.changeType === 'increase' ? (
                    <div className="flex items-center space-x-1 space-x-reverse text-green-500 animate-bounce-gentle">
                      <ArrowUpRight className="h-3 w-3" />
                      <span className="font-medium">{stat.change}</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 space-x-reverse text-red-500 animate-bounce-gentle">
                      <ArrowDownRight className="h-3 w-3" />
                      <span className="font-medium">{stat.change}</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Activities and Events */}
        <div className="xl:col-span-2 space-y-6">
          {/* Recent Activities and Upcoming Events */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Enhanced Recent Activities */}
            <Card className="card-hover animate-slide-in-bottom stagger-3">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="p-2 rounded-lg bg-blue-500/10 animate-pulse-slow">
                      <Activity className="h-5 w-5 text-blue-500" />
                    </div>
                    <span>النشاطات الأخيرة</span>
                  </div>
                  <Badge variant="outline" className="text-xs">6 نشاطات</Badge>
                </CardTitle>
                <CardDescription>آخر التحديثات في النظام</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div 
                        key={activity.id} 
                        className="flex items-start space-x-3 space-x-reverse p-3 rounded-lg hover:bg-muted/50 transition-all duration-300 animate-slide-in-left hover-lift"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className={`p-2 rounded-lg ${
                          activity.type === 'success' ? 'bg-emerald-500/10' : 
                          activity.type === 'warning' ? 'bg-amber-500/10' : 'bg-blue-500/10'
                        }`}>
                          <Icon className={`h-4 w-4 ${
                            activity.type === 'success' ? 'text-emerald-500' : 
                            activity.type === 'warning' ? 'text-amber-500' : 'text-blue-500'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground hover-scale">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.user}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4 hover-glow focus:outline-none focus:ring-0 focus:border-0"
                >
                  <Eye className="h-4 w-4 ml-2" />
                  عرض جميع النشاطات
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced Upcoming Events */}
            <Card className="card-hover animate-slide-in-bottom stagger-4">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="p-2 rounded-lg bg-purple-500/10 animate-float">
                      <Calendar className="h-5 w-5 text-purple-500" />
                    </div>
                    <span>الأحداث القادمة</span>
                  </div>
                  <Badge variant="outline" className="text-xs">6 أحداث</Badge>
                </CardTitle>
                <CardDescription>الأحداث والفعاليات المهمة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => {
                    const Icon = event.icon;
                    return (
                      <div 
                        key={event.id} 
                        className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-muted/30 to-muted/10 hover:from-muted/50 hover:to-muted/20 transition-all duration-300 animate-slide-in-right hover-lift"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className={`p-2 rounded-lg ${
                            event.priority === 'high' ? 'bg-red-500/10' : 
                            event.priority === 'medium' ? 'bg-amber-500/10' : 'bg-emerald-500/10'
                          }`}>
                            <Icon className={`h-4 w-4 ${
                              event.priority === 'high' ? 'text-red-500' : 
                              event.priority === 'medium' ? 'text-amber-500' : 'text-emerald-500'
                            }`} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground hover-scale">{event.title}</p>
                            <p className="text-xs text-muted-foreground">{event.date}</p>
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            event.priority === 'high' ? 'border-red-500 text-red-500' : 
                            event.priority === 'medium' ? 'border-amber-500 text-amber-500' : 'border-emerald-500 text-emerald-500'
                          }`}
                        >
                          {event.type === 'exam' ? 'امتحان' : 
                           event.type === 'meeting' ? 'اجتماع' : 
                           event.type === 'trip' ? 'رحلة' : 
                           event.type === 'ceremony' ? 'حفل' :
                           event.type === 'workshop' ? 'ورشة' : 'معرض'}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4 hover-glow focus:outline-none focus:ring-0 focus:border-0"
                >
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة حدث جديد
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Academic Performance Chart */}
          <Card className="card-hover animate-slide-in-bottom stagger-11">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <div className="p-2 rounded-lg bg-indigo-500/10 animate-bounce-gentle">
                  <BarChart3 className="h-5 w-5 text-indigo-500" />
                </div>
                <span>الأداء الأكاديمي</span>
              </CardTitle>
              <CardDescription>متوسط درجات الطلاب حسب المادة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {academicPerformance.map((subject, index) => (
                  <div key={subject.subject} className="space-y-2 animate-slide-in-left" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{subject.subject}</span>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="text-sm font-bold">{subject.average}%</span>
                        <Badge variant="outline" className="text-xs text-emerald-500 border-emerald-500">
                          {subject.improvement}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="flex-1">
                        <Progress value={subject.average} className="h-2" />
                      </div>
                      <span className="text-xs text-muted-foreground w-12 text-left">
                        {subject.students} طالب
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Financial Overview */}
          <Card className="card-hover animate-slide-in-bottom stagger-12">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <div className="p-2 rounded-lg bg-cyan-500/10 animate-pulse-slow">
                  <DollarSign className="h-5 w-5 text-cyan-500" />
               </div>
                <span>الملخص المالي</span>
              </CardTitle>
              <CardDescription>الإيرادات والمصروفات الشهرية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {financialOverview.map((month, index) => (
                  <div key={month.month} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-300 animate-slide-in-right hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-500">{month.month.slice(0, 3)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{month.month}</p>
                        <p className="text-xs text-muted-foreground">صافي الربح: {month.profit.toLocaleString()} ريال</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-emerald-500">+{month.income.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">-{month.expenses.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Notifications Center */}
          <Card className="card-hover animate-slide-in-bottom stagger-7">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="p-2 rounded-lg bg-purple-500/10 animate-heart-beat">
                    <Bell className="h-5 w-5 text-purple-500" />
                  </div>
                  <span>مركز الإشعارات</span>
                </div>
                <Badge variant="outline" className="text-xs">2 جديد</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification, index) => (
                  <div 
                    key={notification.id} 
                    className={`p-3 rounded-lg border transition-all duration-300 animate-slide-in-left hover-lift ${
                      notification.read ? 'bg-muted/30 border-muted' : 'bg-blue-500/5 border-blue-500/20'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start space-x-2 space-x-reverse">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        notification.type === 'success' ? 'bg-emerald-500' : 
                        notification.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                      } ${!notification.read ? 'animate-pulse' : ''}`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4 hover-glow focus:outline-none focus:ring-0 focus:border-0"
              >
                <Bell className="h-4 w-4 ml-2" />
                عرض جميع الإشعارات
              </Button>
            </CardContent>
          </Card>

          {/* Weather Widget */}
          <Card className="card-hover animate-slide-in-bottom stagger-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <div className="p-2 rounded-lg bg-blue-500/10 animate-float">
                  <Sun className="h-5 w-5 text-blue-500" />
      </div>
                <span>الطقس</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <Sun className="h-12 w-12 text-blue-500 animate-pulse-slow" />
                  <div>
                    <p className="text-3xl font-bold">{weatherData.temperature}°C</p>
                    <p className="text-sm text-muted-foreground">{weatherData.condition}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Thermometer className="h-3 w-3" />
                    <span>الرطوبة: {weatherData.humidity}%</span>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Wind className="h-3 w-3" />
                    <span>الرياح: {weatherData.windSpeed} كم/س</span>
                  </div>
                </div>
                <div className="flex justify-between text-xs">
                  {weatherData.forecast.map((day, index) => (
                    <div key={index} className="text-center">
                      <p className="font-medium">{day.day}</p>
                      <div className="flex items-center justify-center mt-1">
                        {day.icon === Sun ? <Sun className="h-4 w-4 text-blue-500" /> :
                         day.icon === Cloud ? <Cloud className="h-4 w-4 text-gray-500" /> :
                         <CloudRain className="h-4 w-4 text-blue-500" />}
                      </div>
                      <p className="text-xs">{day.temp}°</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="card-hover animate-slide-in-bottom stagger-9">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <div className="p-2 rounded-lg bg-indigo-500/10 animate-heart-beat">
                  <Shield className="h-5 w-5 text-indigo-500" />
                </div>
                <span>حالة النظام</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {systemMetrics.map((metric, index) => (
                <div key={metric.name} className="space-y-2 animate-slide-in-left" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex justify-between text-sm">
                    <span>{metric.name}</span>
                    <span className="font-medium">{metric.value}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full animate-progress ${metric.color}`} 
                      style={{ width: `${metric.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="card-hover animate-slide-in-bottom stagger-10">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <div className="p-2 rounded-lg bg-purple-500/10 animate-pulse-slow">
                  <Zap className="h-5 w-5 text-purple-500" />
                </div>
                <span>إجراءات سريعة</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start hover-glow" variant="outline">
                <Users className="h-4 w-4 ml-2" />
                إضافة طالب جديد
              </Button>
              <Button className="w-full justify-start hover-glow" variant="outline">
                <GraduationCap className="h-4 w-4 ml-2" />
                إضافة معلم جديد
              </Button>
              <Button className="w-full justify-start hover-glow" variant="outline">
                <BookOpen className="h-4 w-4 ml-2" />
                إضافة مادة دراسية
              </Button>
              <Button className="w-full justify-start hover-glow" variant="outline">
                <Calendar className="h-4 w-4 ml-2" />
                جدولة حدث جديد
              </Button>
              <Button className="w-full justify-start hover-glow" variant="outline">
                <FileText className="h-4 w-4 ml-2" />
                إنشاء تقرير
              </Button>
              <Button className="w-full justify-start hover-glow" variant="outline">
                <Download className="h-4 w-4 ml-2" />
                تصدير البيانات
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Attendance Trends */}
      <Card className="card-hover animate-slide-in-bottom stagger-13">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 space-x-reverse">
            <div className="p-2 rounded-lg bg-blue-500/10 animate-bounce-gentle">
              <TrendingUp className="h-5 w-5 text-blue-500" />
            </div>
            <span>اتجاهات الحضور</span>
          </CardTitle>
          <CardDescription>معدل الحضور خلال الأسبوع</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-4">
            {attendanceTrends.map((day, index) => (
              <div key={day.day} className="text-center space-y-2 animate-slide-in-bottom" style={{ animationDelay: `${index * 0.1}s` }}>
                <p className="text-sm font-medium">{day.day}</p>
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-muted flex items-center justify-center">
                    <span className="text-xs font-bold">{day.attendance}%</span>
                  </div>
                  {day.attendance > 0 && (
                    <div 
                      className="absolute inset-0 rounded-full border-4 border-green-500"
                      style={{ 
                        clipPath: `polygon(50% 50%, 50% 0%, ${50 + (day.attendance * 0.36)}% 0%, ${50 + (day.attendance * 0.36)}% 50%)` 
                      }}
                    ></div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">غائب: {day.absent}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comprehensive Analytics Dashboard */}
      <Card className="card-hover animate-slide-in-bottom stagger-14">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 space-x-reverse">
            <div className="p-2 rounded-lg bg-purple-500/10 animate-pulse-slow">
              <PieChart className="h-5 w-5 text-purple-500" />
            </div>
            <span>لوحة التحليلات الشاملة</span>
          </CardTitle>
          <CardDescription>تحليلات مفصلة وإحصائيات متقدمة</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" className="hover-glow">نظرة عامة</TabsTrigger>
              <TabsTrigger value="academic" className="hover-glow">أكاديمي</TabsTrigger>
              <TabsTrigger value="financial" className="hover-glow">مالي</TabsTrigger>
              <TabsTrigger value="attendance" className="hover-glow">الحضور</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20">
                  <div className="flex items-center space-x-2 space-x-reverse mb-2">
                    <Users className="h-5 w-5 text-red-500" />
                    <span className="font-medium">إجمالي الطلاب</span>
                  </div>
                  <p className="text-2xl font-bold text-red-500">1,247</p>
                  <p className="text-xs text-muted-foreground">+12% من الشهر الماضي</p>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                  <div className="flex items-center space-x-2 space-x-reverse mb-2">
                    <GraduationCap className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">المعلمين</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-500">45</p>
                  <p className="text-xs text-muted-foreground">+3 من الشهر الماضي</p>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
                  <div className="flex items-center space-x-2 space-x-reverse mb-2">
                    <BookOpen className="h-5 w-5 text-green-500" />
                    <span className="font-medium">المواد الدراسية</span>
                  </div>
                  <p className="text-2xl font-bold text-green-500">32</p>
                  <p className="text-xs text-muted-foreground">+2 من الشهر الماضي</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="academic" className="space-y-4 mt-6">
              <div className="space-y-4">
                <h4 className="font-medium">أفضل المواد أداءً</h4>
                {academicPerformance.slice(0, 3).map((subject, index) => (
                  <div key={subject.subject} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-300">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className={`w-3 h-3 rounded-full ${subject.color}`}></div>
                      <span className="text-sm font-medium">{subject.subject}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{subject.average}%</p>
                      <p className="text-xs text-muted-foreground">{subject.students} طالب</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="financial" className="space-y-4 mt-6">
              <div className="space-y-4">
                <h4 className="font-medium">الإيرادات الشهرية</h4>
                {financialOverview.slice(0, 4).map((month, index) => (
                  <div key={month.month} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-300">
                    <span className="text-sm font-medium">{month.month}</span>
                    <div className="text-right">
                      <p className="text-sm font-bold text-green-500">+{month.income.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">صافي: {month.profit.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="attendance" className="space-y-4 mt-6">
              <div className="space-y-4">
                <h4 className="font-medium">معدل الحضور الأسبوعي</h4>
                <div className="grid grid-cols-7 gap-2">
                  {attendanceTrends.map((day, index) => (
                    <div key={day.day} className="text-center p-2 rounded-lg bg-muted/30">
                      <p className="text-xs font-medium">{day.day}</p>
                      <p className="text-lg font-bold text-green-500">{day.attendance}%</p>
                      <p className="text-xs text-muted-foreground">{day.absent} غائب</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground animate-slide-in-bottom">الرسوم البيانية والتحليلات</h2>
        
        {/* Performance Trends Chart */}
        <Card className="card-hover animate-slide-in-bottom stagger-15">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 space-x-reverse">
              <div className="p-2 rounded-lg bg-green-500/10 animate-bounce-gentle">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <span>اتجاهات الأداء الأكاديمي</span>
            </CardTitle>
            <CardDescription>تطور متوسط الدرجات خلال الأسابيع الستة الماضية</CardDescription>
          </CardHeader>
          <CardContent>
            <UiLineChart
              data={performanceTrendData}
              index="week"
              categories={["الرياضيات", "العلوم", "العربية"]}
              colors={["#ef4444", "#3b82f6", "#22c55e"]}
              valueFormatter={(value) => `${value}%`}
              height={350}
            />
          </CardContent>
        </Card>

        {/* Financial Overview Chart */}
        <Card className="card-hover animate-slide-in-bottom stagger-16">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 space-x-reverse">
              <div className="p-2 rounded-lg bg-orange-500/10 animate-pulse-slow">
                <DollarSign className="h-5 w-5 text-orange-500" />
              </div>
              <span>الملخص المالي الشهري</span>
            </CardTitle>
            <CardDescription>الإيرادات والمصروفات خلال الأشهر الستة الماضية</CardDescription>
          </CardHeader>
          <CardContent>
            <UiAreaChart
              data={financialChartData}
              index="month"
              categories={["إيرادات", "مصروفات"]}
              colors={["#22c55e", "#ef4444"]}
              valueFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              height={350}
            />
          </CardContent>
        </Card>

        {/* Academic Performance Bar Chart */}
        <Card className="card-hover animate-slide-in-bottom stagger-17">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 space-x-reverse">
              <div className="p-2 rounded-lg bg-blue-500/10 animate-float">
                <BarChart3 className="h-5 w-5 text-blue-500" />
              </div>
              <span>الأداء الأكاديمي حسب المادة</span>
            </CardTitle>
            <CardDescription>متوسط الدرجات وعدد الطلاب لكل مادة دراسية</CardDescription>
          </CardHeader>
          <CardContent>
            <UiBarChart
              data={academicChartData}
              index="subject"
              categories={["متوسط", "طلاب"]}
              colors={["#3b82f6", "#f97316"]}
              valueFormatter={(value) => value.toString()}
              height={350}
            />
          </CardContent>
        </Card>

        {/* Student Distribution Pie Chart */}
        <Card className="card-hover animate-slide-in-bottom stagger-18">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 space-x-reverse">
              <div className="p-2 rounded-lg bg-purple-500/10 animate-heart-beat">
                <PieChart className="h-5 w-5 text-purple-500" />
              </div>
              <span>توزيع الطلاب حسب الصفوف</span>
            </CardTitle>
            <CardDescription>عدد الطلاب في كل صف دراسي</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <UiPieChart
                data={studentDistributionData}
                index="name"
                category="value"
                colors={["#ef4444", "#3b82f6", "#22c55e", "#f97316", "#8b5cf6", "#06b6d4"]}
                valueFormatter={(value) => value.toString()}
                height={300}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {studentDistributionData.map((item, index) => (
                <div key={item.name} className="flex items-center space-x-2 space-x-reverse p-2 rounded-lg bg-muted/30">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: ["#ef4444", "#3b82f6", "#22c55e", "#f97316", "#8b5cf6", "#06b6d4"][index] }}
                  ></div>
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.value} طالب</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Attendance Trends Area Chart */}
        <Card className="card-hover animate-slide-in-bottom stagger-19">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 space-x-reverse">
              <div className="p-2 rounded-lg bg-green-500/10 animate-bounce-gentle">
                <Users className="h-5 w-5 text-green-500" />
              </div>
              <span>اتجاهات الحضور والغياب</span>
              </CardTitle>
            <CardDescription>معدل الحضور والغياب خلال الأشهر الستة الماضية</CardDescription>
            </CardHeader>
            <CardContent>
            <UiAreaChart
              data={attendanceChartData}
              index="month"
              categories={["حضور", "غياب"]}
              colors={["#22c55e", "#ef4444"]}
              valueFormatter={(value) => `${value}%`}
              height={350}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
