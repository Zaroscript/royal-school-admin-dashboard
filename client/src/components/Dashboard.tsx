import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { EnhancedAreaChart, EnhancedLineChart, EnhancedBarChart, EnhancedPieChart } from '@/components/ui/enhanced-charts';
import { motion } from 'framer-motion';
import {
  Users,
  UserCheck,
  BookOpen,
  Calendar,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Activity,
  Award
} from 'lucide-react';

const Dashboard = () => {
  // Sample data for stats
  const stats = [
    { id: 1, title: "إجمالي الطلاب", value: "1,234", change: "+12%", status: "increase", icon: <Award className="w-5 h-5 text-blue-500" /> },
    { id: 2, title: "إجمالي المعلمين", value: "64", change: "+4%", status: "increase", icon: <Activity className="w-5 h-5 text-green-500" /> },
    { id: 3, title: "معدل الحضور", value: "92%", change: "+2%", status: "increase", icon: <CheckCircle className="w-5 h-5 text-purple-500" /> },
    { id: 4, title: "الفصول الدراسية", value: "42", change: "0%", status: "neutral", icon: <Calendar className="w-5 h-5 text-orange-500" /> },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'student',
      message: 'تم تسجيل طالب جديد: محمد أحمد',
      time: 'منذ 5 دقائق',
      status: 'success'
    },
    {
      id: 2,
      type: 'teacher',
      message: 'تم تحديث جدول الأستاذ: سارة محمود',
      time: 'منذ 15 دقيقة',
      status: 'info'
    },
    {
      id: 3,
      type: 'course',
      message: 'تم إضافة مادة جديدة: الفيزياء المتقدمة',
      time: 'منذ ساعة',
      status: 'success'
    },
    {
      id: 4,
      type: 'alert',
      message: 'تحديث مطلوب للنظام',
      time: 'منذ ساعتين',
      status: 'warning'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'اجتماع أولياء الأمور',
      date: '2024-01-15',
      time: '10:00 ص',
      type: 'meeting'
    },
    {
      id: 2,
      title: 'امتحان الرياضيات - الصف الثالث',
      date: '2024-01-17',
      time: '9:00 ص',
      type: 'exam'
    },
    {
      id: 3,
      title: 'ورشة تدريبية للمعلمين',
      date: '2024-01-20',
      time: '2:00 م',
      type: 'workshop'
    }
  ];

  // Chart data with proper Arabic labels
  const attendanceData = [
    { month: 'سبتمبر', students: 92, teachers: 98 },
    { month: 'أكتوبر', students: 89, teachers: 95 },
    { month: 'نوفمبر', students: 94, teachers: 97 },
    { month: 'ديسمبر', students: 91, teachers: 99 },
    { month: 'يناير', students: 96, teachers: 100 },
    { month: 'فبراير', students: 93, teachers: 98 },
  ];

  const gradeDistribution = [
    { name: 'ممتاز', value: 45, color: '#10B981' },
    { name: 'جيد جداً', value: 78, color: '#3B82F6' },
    { name: 'جيد', value: 52, color: '#F59E0B' },
    { name: 'مقبول', value: 23, color: '#EF4444' },
  ];

  const chartConfig = {
    students: {
      label: "الطلاب",
      color: "#3B82F6",
    },
    teachers: {
      label: "المعلمين", 
      color: "#10B981",
    },
  };

  // Chart data for performance overview
  const performanceData = [
    { name: 'يناير', attendance: 85, grades: 78, engagement: 92 },
    { name: 'فبراير', attendance: 88, grades: 82, engagement: 89 },
    { name: 'مارس', attendance: 92, grades: 85, engagement: 94 },
    { name: 'أبريل', attendance: 89, grades: 88, engagement: 91 },
    { name: 'مايو', attendance: 94, grades: 90, engagement: 95 },
    { name: 'يونيو', attendance: 91, grades: 87, engagement: 93 },
  ];

  return (
    <div className="flex flex-col gap-6 p-4 w-full">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 w-full">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 card-hover overflow-hidden border-t-4 border-t-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-1 animate-pulse-slow">{stat.value}</h3>
                  </div>
                  <div className={`p-3 rounded-full ${stat.status === 'increase' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-gray-100 dark:bg-gray-800'} animate-bounce-gentle`}>
                    {stat.icon || <TrendingUp className={`w-5 h-5 ${stat.status === 'increase' ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`} />}
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className={`text-xs font-medium ${stat.status === 'increase' ? 'text-green-600 dark:text-green-400' : stat.status === 'decrease' ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">منذ الشهر الماضي</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 w-full">
        {/* Attendance Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden border-b-4 border-b-blue-500 dark:border-b-blue-600">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="w-5 h-5 text-blue-500 animate-pulse-slow" />
                معدل الحضور
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-80">
                <EnhancedLineChart
                  data={attendanceData}
                  keys={['students', 'teachers']}
                  height={300}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
        {/* Grade Distribution */}
         <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5, delay: 0.5 }}
         >
           <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden border-b-4 border-b-purple-500 dark:border-b-purple-600">
             <CardHeader className="bg-gradient-to-r from-purple-50 to-white dark:from-gray-800 dark:to-gray-900">
               <CardTitle className="flex items-center gap-2 text-lg">
                 <BarChart3 className="w-5 h-5 text-purple-500 animate-pulse-slow" />
                 توزيع الدرجات
               </CardTitle>
             </CardHeader>
             <CardContent>
               <div className="w-full h-80">
                 <EnhancedPieChart
                   data={gradeDistribution}
                   height={300}
                 />
               </div>
             </CardContent>
           </Card>
         </motion.div>
      </div>

      {/* Bottom Section - Activities and Events */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full">
        {/* Recent Activities */}
        <motion.div 
           className="lg:col-span-2"
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.6 }}
         >
          <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden border-r-4 border-r-green-500 dark:border-r-green-600">
            <CardHeader className="mb-4 bg-gradient-to-r from-green-50 to-white dark:from-gray-800 dark:to-gray-900">
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-500" />
                الأنشطة الحديثة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div 
                    key={activity.id} 
                    className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-r-2 hover-lift"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.7 }}
                    style={{ borderRightColor: activity.status === 'success' ? '#10B981' : activity.status === 'warning' ? '#F59E0B' : '#3B82F6' }}
                  >
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      {activity.status === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {activity.status === 'warning' && <AlertCircle className="w-4 h-4 text-yellow-500" />}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
       </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden border-r-4 border-r-orange-500 dark:border-r-orange-600">
            <CardHeader className="mb-4 bg-gradient-to-r from-orange-50 to-white dark:from-gray-800 dark:to-gray-900">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-500" />
                المواعيد القادمة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <motion.div 
                    key={event.id} 
                    className="p-4 border rounded-lg hover:shadow-md transition-all duration-300 hover-scale bg-white dark:bg-gray-900"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.8 }}
                  >
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                      {event.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {event.date}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {event.time}
                      </span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`mt-2 text-xs ${
                        event.type === 'exam' ? 'border-red-200 text-red-700' :
                        event.type === 'meeting' ? 'border-blue-200 text-blue-700' :
                        'border-green-200 text-green-700'
                      }`}
                    >
                      {event.type === 'exam' ? 'امتحان' :
                       event.type === 'meeting' ? 'اجتماع' : 'ورشة'}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden border-b-4 border-b-purple-500 dark:border-b-purple-600">
            <CardHeader className="mb-4 bg-gradient-to-r from-purple-50 to-white dark:from-gray-800 dark:to-gray-900">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-500" />
                نظرة عامة على الأداء
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
              {[
                { label: 'حضور الطلاب', value: 92, color: 'bg-blue-500' },
                { label: 'حضور المعلمين', value: 98, color: 'bg-green-500' },
                { label: 'إنجاز المنهج', value: 75, color: 'bg-purple-500' },
                { label: 'رضا أولياء الأمور', value: 89, color: 'bg-orange-500' }
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{item.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full ${item.color} transition-all duration-1000 ease-out rounded-full`}
                      style={{ 
                        width: `${item.value}%`,
                        animation: `progressFill 1.5s ease-out ${index * 0.2}s both`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden border-b-4 border-b-teal-500 dark:border-b-teal-600">
            <CardHeader className="mb-4 bg-gradient-to-r from-teal-50 to-white dark:from-gray-800 dark:to-gray-900">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-teal-500" />
                الإحصائيات الشهرية
              </CardTitle>
            </CardHeader>
            <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'طالب جديد', value: '156', color: 'blue', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                { label: 'نشاط منجز', value: '23', color: 'green', bg: 'bg-green-50 dark:bg-green-900/20' },
                { label: 'معدل الحضور', value: '89%', color: 'purple', bg: 'bg-purple-50 dark:bg-purple-900/20' },
                { label: 'تقرير جديد', value: '12', color: 'orange', bg: 'bg-orange-50 dark:bg-orange-900/20' }
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className={`text-center p-4 ${stat.bg} rounded-lg hover-scale transition-all duration-300 shadow-sm`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.6 }}
                >
                  <div className={`text-2xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
