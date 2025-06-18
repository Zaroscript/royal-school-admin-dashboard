import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Calendar } from './ui/calendar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { CheckCircle, XCircle, AlertCircle, Calendar as CalendarIcon, Users, Clock, Download, Plus, Filter, Info, MoreHorizontal, BarChart3, PieChart, TrendingUp, TrendingDown, Search, Eye, Edit, Trash2, Bell, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';
import { ar } from 'date-fns/locale';

const AttendancePage = () => {
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState('');

  const classes = [
    { id: '1', name: 'الصف الأول أ', students: 25, attendance: 92, teacher: 'أ. أحمد محمد' },
    { id: '2', name: 'الصف الثاني ب', students: 28, attendance: 89, teacher: 'أ. فاطمة السيد' },
    { id: '3', name: 'الصف الثالث ج', students: 30, attendance: 95, teacher: 'د. محمد علي' },
  ];

  const students = [
    { id: 1, name: 'أحمد محمد علي', status: 'present', time: '07:45', avatar: 'AM', grade: 'الصف الأول أ', attendanceRate: 95 },
    { id: 2, name: 'سارة أحمد محمود', status: 'absent', time: '-', avatar: 'SA', grade: 'الصف الأول أ', attendanceRate: 78 },
    { id: 3, name: 'عمر خالد محمد', status: 'late', time: '08:15', avatar: 'OK', grade: 'الصف الأول أ', attendanceRate: 82 },
    { id: 4, name: 'فاطمة علي حسن', status: 'present', time: '07:30', avatar: 'FA', grade: 'الصف الأول أ', attendanceRate: 98 },
    { id: 5, name: 'محمد حسن أحمد', status: 'present', time: '07:40', avatar: 'MH', grade: 'الصف الأول أ', attendanceRate: 91 },
    { id: 6, name: 'نور الدين محمد', status: 'excused', time: '-', avatar: 'ND', grade: 'الصف الأول أ', attendanceRate: 85 },
  ];

  const weeklyData = [
    { day: 'الأحد', present: 22, absent: 2, late: 1, rate: 88 },
    { day: 'الاثنين', present: 24, absent: 1, late: 0, rate: 96 },
    { day: 'الثلاثاء', present: 23, absent: 1, late: 1, rate: 92 },
    { day: 'الأربعاء', present: 25, absent: 0, late: 0, rate: 100 },
    { day: 'الخميس', present: 21, absent: 3, late: 1, rate: 84 },
    { day: 'الجمعة', present: 20, absent: 2, late: 2, rate: 80 },
    { day: 'السبت', present: 24, absent: 1, late: 0, rate: 96 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800';
      case 'absent': return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
      case 'late': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800';
      case 'excused': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
      default: return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'present': return 'حاضر';
      case 'absent': return 'غائب';
      case 'late': return 'متأخر';
      case 'excused': return 'معذور';
      default: return 'غير محدد';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4" />;
      case 'absent': return <XCircle className="w-4 h-4" />;
      case 'late': return <AlertCircle className="w-4 h-4" />;
      case 'excused': return <Info className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const totalStudents = students.length;
  const presentToday = students.filter(s => s.status === 'present').length;
  const absentToday = students.filter(s => s.status === 'absent').length;
  const lateToday = students.filter(s => s.status === 'late').length;
  const excusedToday = students.filter(s => s.status === 'excused').length;

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigateMonth = (direction: 'prev' | 'next') => {
    setDate(direction === 'next' ? addMonths(date, 1) : subMonths(date, 1));
  };

  const goToToday = () => {
    setDate(new Date());
  };

  // Generate calendar days for the current month
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get attendance data for each day (mock data)
  const getAttendanceForDay = (day: Date) => {
    // Mock attendance data - replace with actual API call
    const dayString = format(day, 'yyyy-MM-dd');
    const randomAttendance = Math.floor(Math.random() * 25) + 20; // 20-45 students
    const randomAbsent = Math.floor(Math.random() * 5) + 1; // 1-5 absent
    const randomLate = Math.floor(Math.random() * 3); // 0-2 late
    
    return {
      present: randomAttendance,
      absent: randomAbsent,
      late: randomLate,
      total: randomAttendance + randomAbsent + randomLate,
      rate: Math.round((randomAttendance / (randomAttendance + randomAbsent + randomLate)) * 100)
    };
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <CalendarIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            الحضور والغياب
          </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                      إدارة وتتبع حضور الطلاب
          </p>
        </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="border-slate-300 dark:border-slate-600 hover:bg-slate-50 hover:text-blue-600 dark:hover:bg-slate-700 transition-all duration-300">
                  <Download className="w-4 h-4 ml-2" />
            تصدير التقرير
          </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Plus className="w-4 h-4 ml-2" />
            تسجيل حضور جديد
          </Button>
              </div>
            </div>
        </div>
      </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'إجمالي الطلاب',
              value: totalStudents,
              icon: Users,
              color: 'blue',
              trend: '+12',
              trendText: 'هذا الشهر',
              bgGradient: 'from-blue-500 to-indigo-600'
            },
            {
              title: 'نسبة الحضور',
              value: `${Math.round((presentToday / totalStudents) * 100)}%`,
              icon: CheckCircle,
              color: 'emerald',
              trend: '+2.1%',
              trendText: 'مقارنة بالأمس',
              bgGradient: 'from-emerald-500 to-green-600'
            },
            {
              title: 'الغياب اليوم',
              value: absentToday,
              icon: XCircle,
              color: 'red',
              trend: '-5',
              trendText: 'مقارنة بالأمس',
              bgGradient: 'from-red-500 to-pink-600'
            },
            {
              title: 'التأخير اليوم',
              value: lateToday,
              icon: Clock,
              color: 'amber',
              trend: '-2',
              trendText: 'مقارنة بالأمس',
              bgGradient: 'from-amber-500 to-orange-600'
            }
          ].map((stat, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-500 hover:scale-105 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6 relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.bgGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-r ${stat.bgGradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400">
                        <TrendingUp className="w-4 h-4" />
                        <span>{stat.trend}</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{stat.trendText}</p>
            </div>
            </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.title}</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
            </div>
            </div>
          </CardContent>
        </Card>
          ))}
      </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Enhanced Calendar */}
          <div className="xl:col-span-4 ">
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <CalendarIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">تقويم الحضور</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">اختر التاريخ لعرض التفاصيل</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Calendar Navigation */}
                <div className="flex items-center justify-between bg-gradient-to-r from-blue-100 via-purple-100 to-indigo-100 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-indigo-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigateMonth('prev')}
                    className="hover:bg-white/60 dark:hover:bg-slate-700/60 transition-all duration-200 text-blue-600 dark:text-blue-400"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                      {format(date, 'MMMM yyyy', { locale: ar })}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {format(date, 'EEEE', { locale: ar })}
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigateMonth('next')}
                    className="hover:bg-white/60 dark:hover:bg-slate-700/60 transition-all duration-200 text-blue-600 dark:text-blue-400"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </div>

                {/* Professional Calendar Grid */}
                <div className="bg-white/90 dark:bg-slate-800/90 rounded-xl p-6 border border-slate-200 dark:border-slate-600 shadow-md">
                  {/* Calendar Header */}
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map((day) => (
                      <div key={day} className="text-center py-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, index) => {
                      const dayAttendance = getAttendanceForDay(day);
                      const isSelected = isSameDay(day, date);
                      const isCurrentDay = isToday(day);
                      
                      return (
                        <div
                          key={index}
                          onClick={() => setDate(day)}
                          className={`
                            relative min-h-[80px] p-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105
                            ${isSelected 
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                              : isCurrentDay 
                                ? 'bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 border-2 border-blue-300 dark:border-blue-600' 
                                : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20'
                            }
                          `}
                        >
                          <div className="text-sm font-medium mb-1">
                            {format(day, 'd')}
                          </div>
                          
                          {/* Attendance Indicators */}
                          <div className="space-y-1">
                            <div className={`
                              text-xs px-1 py-0.5 rounded text-center font-medium
                              ${isSelected 
                                ? 'bg-white/20 text-white' 
                                : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              }
                            `}>
                              {dayAttendance.rate}%
                            </div>
                            <div className={`
                              text-xs px-1 py-0.5 rounded text-center
                              ${isSelected 
                                ? 'bg-white/20 text-white' 
                                : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                              }
                            `}>
                              {dayAttendance.present}/{dayAttendance.total}
                            </div>
                    </div>
                    </div>
                      );
                    })}
                    </div>

                  {/* Today Button */}
                  <div className="mt-4 text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToToday}
                      className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border-blue-200 dark:border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all duration-200"
                    >
                      الذهاب إلى اليوم
                    </Button>
                  </div>
                </div>

                {/* Enhanced Quick Stats */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      إحصائيات {format(date, 'EEEE، d MMMM yyyy', { locale: ar })}
                    </h4>
                    <Badge variant="outline" className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                      {Math.round((presentToday / totalStudents) * 100)}% حضور
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'حاضر', count: presentToday, color: 'emerald' },
                      { label: 'غائب', count: absentToday, color: 'red' },
                      { label: 'متأخر', count: lateToday, color: 'amber' },
                      { label: 'معذور', count: excusedToday, color: 'blue' }
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className={`text-center p-3 bg-${stat.color}-50 dark:bg-${stat.color}-900/20 rounded-xl border border-${stat.color}-100 dark:border-${stat.color}-800 hover:scale-105 transition-transform duration-300 cursor-pointer`}
                      >
                        <div className={`text-lg font-bold text-${stat.color}-600 dark:text-${stat.color}-400`}>{stat.count}</div>
                        <div className={`text-xs text-${stat.color}-700 dark:text-${stat.color}-300`}>{stat.label}</div>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

          {/* Enhanced Table and Charts */}
          <div className="xl:col-span-4 space-y-6">
            {/* Enhanced Attendance Table */}
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
              <CardHeader className="pb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="space-y-2">
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">سجل الحضور والغياب</CardTitle>
                    <p className="text-slate-600 dark:text-slate-400">
                      تفاصيل حضور الطلاب ليوم {format(date, 'EEEE، d MMMM yyyy', { locale: ar })}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    {/* Enhanced Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="البحث عن طالب..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                      <SelectTrigger className="w-[200px] bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="اختر الصف" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                          <div className="flex items-center justify-between w-full">
                              <div>
                                <span className="font-medium">{cls.name}</span>
                                <p className="text-xs text-slate-600 dark:text-slate-400">{cls.teacher}</p>
                              </div>
                              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
                              {cls.attendance}%
                            </Badge>
                          </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                    <Button variant="outline" className="border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700">
                      <Filter className="w-4 h-4 ml-2" />
                    فلتر
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                <TableHeader>
                      <TableRow className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-700 dark:to-blue-900/20 border-0">
                        <TableHead className="text-right font-semibold text-slate-900 dark:text-white py-4">الطالب</TableHead>
                        <TableHead className="text-right font-semibold text-slate-900 dark:text-white py-4">الحالة</TableHead>
                        <TableHead className="text-right font-semibold text-slate-900 dark:text-white py-4">وقت الحضور</TableHead>
                        <TableHead className="text-right font-semibold text-slate-900 dark:text-white py-4">نسبة الحضور</TableHead>
                        <TableHead className="text-right font-semibold text-slate-900 dark:text-white py-4">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                      {filteredStudents.map((student, index) => (
                    <TableRow 
                      key={student.id}
                          className="hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50 dark:hover:from-slate-700 dark:hover:to-blue-900/10 transition-all duration-300 border-0"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                          <TableCell className="py-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="w-12 h-12 ring-2 ring-blue-100 dark:ring-blue-900/30 shadow-lg">
                                <AvatarImage src={student.avatar} />
                                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium text-lg">
                            {student.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-semibold text-slate-900 dark:text-white text-lg">{student.name}</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">{student.grade}</div>
                          </div>
                        </div>
                      </TableCell>
                          <TableCell className="py-4">
                            <Badge className={`${getStatusColor(student.status)} hover:scale-105 transition-transform duration-200 px-3 py-1 shadow-sm`}>
                              <div className="flex items-center gap-2">
                                {getStatusIcon(student.status)}
                          {getStatusText(student.status)}
                              </div>
                        </Badge>
                      </TableCell>
                          <TableCell className="py-4">
                            <div className="flex items-center gap-3">
                              <Clock className="w-5 h-5 text-slate-500" />
                              <span className={`font-medium ${student.time === '-' ? 'text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                            {student.time}
                          </span>
                        </div>
                      </TableCell>
                          <TableCell className="py-4">
                            <div className="flex items-center gap-3">
                              <Progress value={student.attendanceRate} className="w-20 h-3 bg-slate-200 dark:bg-slate-700" />
                              <span className={`text-sm font-semibold ${student.attendanceRate >= 90 ? 'text-emerald-600 dark:text-emerald-400' : student.attendanceRate >= 80 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>
                                {student.attendanceRate}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:scale-110 transition-all duration-200 rounded-xl">
                                <CheckCircle className="w-5 h-5 text-emerald-600" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-red-100 dark:hover:bg-red-900/30 hover:scale-110 transition-all duration-200 rounded-xl">
                                <XCircle className="w-5 h-5 text-red-600" />
                          </Button>
                              <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:scale-110 transition-all duration-200 rounded-xl">
                                <AlertCircle className="w-5 h-5 text-amber-600" />
                          </Button>
                              <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-slate-100 dark:hover:bg-slate-700 hover:scale-110 transition-all duration-200 rounded-xl">
                                <MoreHorizontal className="w-5 h-5 text-slate-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
                </div>
            </CardContent>
          </Card>

            {/* Enhanced Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
            <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">معدل الحضور الأسبوعي</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">آخر 7 أيام</p>
              </div>
            </CardTitle>
            </CardHeader>
            <CardContent>
                  <div className="space-y-6">
                    {weeklyData.map((data, index) => (
                      <div key={data.day} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-slate-900 dark:text-white">{data.day}</span>
                          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{data.rate}%</span>
                </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                    <div 
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-1000 ease-out shadow-lg"
                      style={{ 
                              width: `${data.rate}%`,
                              animationDelay: `${index * 0.1}s`
                      }}
                    ></div>
                </div>
                        <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                          <span>حاضر: {data.present}</span>
                          <span>غائب: {data.absent}</span>
                          <span>متأخر: {data.late}</span>
                </div>
                </div>
              ))}
              </div>
            </CardContent>
          </Card>

              <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
            <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                      <PieChart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">توزيع الحضور</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">إحصائيات اليوم</p>
              </div>
            </CardTitle>
            </CardHeader>
            <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800 hover:scale-105 transition-transform duration-300">
                        <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                          {Math.round((presentToday / totalStudents) * 100)}%
                        </div>
                        <div className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">حاضر</div>
                      </div>
                      <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800 hover:scale-105 transition-transform duration-300">
                        <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                          {Math.round((absentToday / totalStudents) * 100)}%
                        </div>
                        <div className="text-sm text-red-700 dark:text-red-300 font-medium">غائب</div>
                      </div>
                </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800 hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-amber-500 rounded-full shadow-sm"></div>
                          <span className="text-sm font-medium text-slate-900 dark:text-white">متأخر</span>
              </div>
                        <span className="font-bold text-amber-600 dark:text-amber-400">
                          {Math.round((lateToday / totalStudents) * 100)}%
                        </span>
                </div>
                      <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800 hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full shadow-sm"></div>
                          <span className="text-sm font-medium text-slate-900 dark:text-white">معذور</span>
              </div>
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                          {Math.round((excusedToday / totalStudents) * 100)}%
                        </span>
                </div>
                </div>
              </div>
            </CardContent>
          </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;