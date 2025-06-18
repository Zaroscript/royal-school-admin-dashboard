import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AreaChart } from '@/components/ui/charts/area-chart';
import { BarChart } from '@/components/ui/charts/bar-chart';
import { PieChart } from '@/components/ui/charts/pie-chart';
import {
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  Download,
  Calendar as CalendarIcon,
  Filter,
  BookOpen,
  Award,
  Target
} from 'lucide-react';
import { getChartColors, chartPalettes } from '@/lib/chartColors';

const ReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  // Enhanced data for charts with better structure
  const attendanceData = [
    { name: 'سبتمبر', students: 92, teachers: 98 },
    { name: 'أكتوبر', students: 89, teachers: 95 },
    { name: 'نوفمبر', students: 94, teachers: 97 },
    { name: 'ديسمبر', students: 91, teachers: 99 },
    { name: 'يناير', students: 93, teachers: 96 },
    { name: 'فبراير', students: 90, teachers: 94 },
    { name: 'مارس', students: 95, teachers: 98 },
    { name: 'أبريل', students: 88, teachers: 92 },
  ];

  const gradeDistribution = [
    { name: 'ممتاز', value: 45, color: getChartColors.performance('excellent') },
    { name: 'جيد جداً', value: 78, color: getChartColors.performance('good') },
    { name: 'جيد', value: 52, color: getChartColors.performance('average') },
    { name: 'مقبول', value: 23, color: getChartColors.performance('poor') },
  ];

  const performanceData = [
    { name: 'الرياضيات', value: 85 },
    { name: 'العلوم', value: 78 },
    { name: 'العربية', value: 92 },
    { name: 'الإنجليزية', value: 76 },
    { name: 'التاريخ', value: 88 },
    { name: 'الجغرافيا', value: 82 },
    { name: 'الفيزياء', value: 79 },
    { name: 'الكيمياء', value: 81 },
  ];

  const studentEnrollment = [
    { name: 'الصف الأول', value: 156 },
    { name: 'الصف الثاني', value: 142 },
    { name: 'الصف الثالث', value: 138 },
    { name: 'الصف الرابع', value: 145 },
    { name: 'الصف الخامس', value: 132 },
    { name: 'الصف السادس', value: 128 },
  ];

  const teacherPerformance = [
    { name: 'أحمد محمد', value: 94 },
    { name: 'فاطمة علي', value: 88 },
    { name: 'محمد حسن', value: 91 },
    { name: 'عائشة أحمد', value: 86 },
    { name: 'علي محمود', value: 89 },
    { name: 'خديجة سعيد', value: 92 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          التقارير والإحصائيات
        </h1>
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 ml-2" />
            تصفية
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Download className="w-4 h-4 ml-2" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* Period Selection */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-3">
            {[
              { key: 'weekly', label: 'أسبوعي' },
              { key: 'monthly', label: 'شهري' },
              { key: 'quarterly', label: 'ربع سنوي' },
              { key: 'yearly', label: 'سنوي' }
            ].map(period => (
              <Button
                key={period.key}
                variant={selectedPeriod === period.key ? 'default' : 'outline'}
                onClick={() => setSelectedPeriod(period.key)}
                className={selectedPeriod === period.key ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
              >
                {period.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="animate-slide-in-right">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">معدل الحضور</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">92%</p>
                <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +5% من الشهر الماضي
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">متوسط الدرجات</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">85.2</p>
                <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +2.1 من الشهر الماضي
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">الطلاب النشطين</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">1,198</p>
                <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +47 من الشهر الماضي
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">التقارير المُنشأة</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">156</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  هذا الشهر
                </p>
              </div>
              <FileText className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Chart */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              معدل الحضور الشهري
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChart
              data={attendanceData}
              index="name"
              categories={["students", "teachers"]}
              colors={[
                getChartColors.academic('students'),
                getChartColors.academic('teachers')
              ]}
              valueFormatter={(value) => `${value}%`}
              height={350}
              palette="academic"
            />
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              توزيع الدرجات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart
              data={gradeDistribution}
              index="name"
              category="value"
              colors={gradeDistribution.map(item => item.color)}
              valueFormatter={(value) => `${value}%`}
              height={350}
              palette="performance"
            />
          </CardContent>
        </Card>

        {/* Subject Performance */}
        <Card className="lg:col-span-2 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              أداء المواد الدراسية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={performanceData}
              index="name"
              categories={["value"]}
              colors={[getChartColors.academic('performance')]}
              valueFormatter={(value) => `${value}%`}
              height={300}
              palette="academic"
            />
          </CardContent>
        </Card>
      </div>

      {/* Additional Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Enrollment by Grade */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              توزيع الطلاب حسب الصف
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={studentEnrollment}
              index="name"
              categories={["value"]}
              colors={[getChartColors.academic('students')]}
              valueFormatter={(value) => value.toString()}
              height={300}
              palette="academic"
            />
          </CardContent>
        </Card>

        {/* Teacher Performance */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              أداء المعلمين
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={teacherPerformance}
              index="name"
              categories={["value"]}
              colors={[getChartColors.academic('teachers')]}
              valueFormatter={(value) => `${value}%`}
              height={300}
              palette="academic"
            />
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            التقارير الحديثة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'تقرير الحضور الشهري', date: '2024-01-15', type: 'attendance', status: 'completed' },
              { name: 'تقرير الدرجات النهائية', date: '2024-01-14', type: 'grades', status: 'completed' },
              { name: 'تقرير أداء المعلمين', date: '2024-01-13', type: 'performance', status: 'pending' },
              { name: 'تقرير الميزانية', date: '2024-01-12', type: 'financial', status: 'completed' },
              { name: 'تقرير الأنشطة الطلابية', date: '2024-01-11', type: 'activities', status: 'completed' },
              { name: 'تقرير الصيانة', date: '2024-01-10', type: 'maintenance', status: 'in-progress' },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{report.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{report.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={report.status === 'completed' ? 'default' : report.status === 'pending' ? 'secondary' : 'outline'}
                    className={
                      report.status === 'completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : report.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                    }
                  >
                    {report.status === 'completed' ? 'مكتمل' : report.status === 'pending' ? 'في الانتظار' : 'قيد التنفيذ'}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;
