import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Calendar } from './ui/calendar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  PlusCircle, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin,
  Users,
  Bell,
  AlertCircle,
  Zap,
  Filter,
  Download,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';
import { ar } from 'date-fns/locale';

const EventsPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedEventType, setSelectedEventType] = useState<string>('all');

  // Mock data - replace with actual API calls
  const events = [
    {
      id: 1,
      title: 'اجتماع أولياء الأمور',
      date: '2024-01-20',
      time: '16:00',
      type: 'meeting',
      location: 'القاعة الرئيسية',
      attendees: 45,
      priority: 'high',
      description: 'اجتماع دوري مع أولياء الأمور لمناقشة تقدم الطلاب'
    },
    {
      id: 2,
      title: 'المعرض العلمي السنوي',
      date: '2024-01-25',
      time: '09:00',
      type: 'event',
      location: 'صالة الأنشطة',
      attendees: 120,
      priority: 'medium',
      description: 'معرض للمشاريع العلمية للطلاب'
    },
    {
      id: 3,
      title: 'امتحانات منتصف الفصل',
      date: '2024-01-30',
      time: '08:00',
      type: 'exam',
      location: 'الفصول الدراسية',
      attendees: 250,
      priority: 'high',
      description: 'امتحانات منتصف الفصل الدراسي الثاني'
    },
    {
      id: 4,
      title: 'رحلة مدرسية',
      date: '2024-02-05',
      time: '07:30',
      type: 'trip',
      location: 'المتحف الوطني',
      attendees: 80,
      priority: 'low',
      description: 'رحلة تعليمية للمتحف الوطني'
    },
    {
      id: 5,
      title: 'حفل التخرج',
      date: '2024-02-15',
      time: '18:00',
      type: 'event',
      location: 'المسرح المدرسي',
      attendees: 300,
      priority: 'high',
      description: 'حفل تخرج الطلاب المتفوقين'
    },
    {
      id: 6,
      title: 'ورشة عمل للمعلمين',
      date: '2024-02-20',
      time: '14:00',
      type: 'meeting',
      location: 'قاعة التدريب',
      attendees: 25,
      priority: 'medium',
      description: 'ورشة عمل حول طرق التدريس الحديثة'
    }
  ];

  const eventTypes = [
    { id: 'all', name: 'جميع الأحداث', count: events.length, color: 'bg-blue-500/10 text-blue-600 border border-blue-200' },
    { id: 'meeting', name: 'اجتماعات', count: events.filter(e => e.type === 'meeting').length, color: 'bg-blue-500/10 text-blue-600 border border-blue-200' },
    { id: 'event', name: 'أنشطة', count: events.filter(e => e.type === 'event').length, color: 'bg-green-500/10 text-green-600 border border-green-200' },
    { id: 'exam', name: 'امتحانات', count: events.filter(e => e.type === 'exam').length, color: 'bg-red-500/10 text-red-600 border border-red-200' },
    { id: 'trip', name: 'رحلات', count: events.filter(e => e.type === 'trip').length, color: 'bg-orange-500/10 text-orange-600 border border-orange-200' },
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-500/10 text-blue-600 border border-blue-200';
      case 'event': return 'bg-green-500/10 text-green-600 border border-green-200';
      case 'exam': return 'bg-red-500/10 text-red-600 border border-red-200';
      case 'trip': return 'bg-orange-500/10 text-orange-600 border border-orange-200';
      default: return 'bg-gray-100 text-gray-600 border border-gray-200';
    }
  };

  const getEventTypeText = (type: string) => {
    switch (type) {
      case 'meeting': return 'اجتماع';
      case 'event': return 'نشاط';
      case 'exam': return 'امتحان';
      case 'trip': return 'رحلة';
      default: return 'حدث';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/10 text-red-600 border border-red-200';
      case 'medium': return 'bg-orange-500/10 text-orange-600 border border-orange-200';
      case 'low': return 'bg-green-500/10 text-green-600 border border-green-200';
      default: return 'bg-gray-100 text-gray-600 border border-gray-200';
    }
  };

  const filteredEvents = selectedEventType === 'all' 
    ? events 
    : events.filter(event => event.type === selectedEventType);

  const todayEvents = filteredEvents.filter(event => event.date === format(date, 'yyyy-MM-dd'));

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

  // Get events for each day
  const getEventsForDay = (day: Date) => {
    const dayString = format(day, 'yyyy-MM-dd');
    return events.filter(event => event.date === dayString);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
            الأحداث والفعاليات
          </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
            إدارة وتنظيم الأحداث المدرسية والفعاليات
          </p>
        </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="bg-white/80 dark:bg-slate-800/80 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 hover:scale-105 shadow-md"
            >
            <Download className="h-4 w-4 ml-2" />
            تصدير التقويم
          </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
            <PlusCircle className="h-4 w-4 ml-2" />
            إضافة حدث جديد
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">إجمالي الأحداث</CardTitle>
              <div className="p-2 rounded-lg bg-blue-500/10">
                <CalendarIcon className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">6</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
              +3 أحداث هذا الشهر
            </p>
          </CardContent>
        </Card>

          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">الأحداث القادمة</CardTitle>
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Bell className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">8</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
              في الأسبوع القادم
            </p>
          </CardContent>
        </Card>

          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">معدل الحضور</CardTitle>
              <div className="p-2 rounded-lg bg-green-500/10">
                <Users className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">87%</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">+5% مقارنة بالشهر الماضي</p>
          </CardContent>
        </Card>

          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">أحداث عاجلة</CardTitle>
              <div className="p-2 rounded-lg bg-red-500/10">
                <AlertCircle className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">3</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
              تحتاج إلى اهتمام فوري
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-12 gap-6">
          {/* Enhanced School Calendar Section */}
        <div className="col-span-12 lg:col-span-8">
            <Card className="border-0 shadow-lg bg-transparent">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2 space-x-reverse text-slate-800 dark:text-slate-200">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                      <CalendarIcon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold">التقويم المدرسي</span>
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-white/80 dark:bg-slate-800/80 border-blue-200 dark:border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 transition-all duration-200"
                    >
                      اليوم
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-white/80 dark:bg-slate-800/80 border-purple-200 dark:border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 transition-all duration-200"
                    >
                      الأسبوع
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-white/80 dark:bg-slate-800/80 border-indigo-200 dark:border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-300 transition-all duration-200"
                    >
                      الشهر
                    </Button>
                  </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
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
                        const dayEvents = getEventsForDay(day);
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
                            
                            {/* Event Indicators */}
                            {dayEvents.length > 0 && (
                              <div className="space-y-1">
                                {dayEvents.slice(0, 2).map((event) => (
                                  <div
                                    key={event.id}
                                    className={`
                                      text-xs px-1 py-0.5 rounded truncate
                                      ${isSelected 
                                        ? 'bg-white/20 text-white' 
                                        : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                      }
                                    `}
                                    title={event.title}
                                  >
                                    {event.title}
                                  </div>
                                ))}
                                {dayEvents.length > 2 && (
                                  <div className={`
                                    text-xs px-1 py-0.5 rounded text-center
                                    ${isSelected 
                                      ? 'bg-white/20 text-white' 
                                      : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                                    }
                                  `}>
                                    +{dayEvents.length - 2} أكثر
                                  </div>
                                )}
                              </div>
                            )}
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

                  {/* Today's Events */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center space-x-2 space-x-reverse">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span>أحداث {format(date, 'EEEE، d MMMM yyyy', { locale: ar })}</span>
                  </h3>
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow-md">
                        {todayEvents.length} حدث
                      </Badge>
                    </div>
                    
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {todayEvents.map((event, index) => (
                        <Card 
                          key={event.id} 
                          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-600 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer hover:border-blue-300 dark:hover:border-blue-500"
                        >
                        <CardContent className="p-4">
                            <div className="space-y-3">
                            <div className="flex justify-between items-start">
                                <h4 className="font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                  {event.title}
                                </h4>
                                <Badge className={`${getEventTypeColor(event.type)} text-xs shadow-sm`}>
                                  {getEventTypeText(event.type)}
                              </Badge>
                            </div>
                              <p className="text-sm text-slate-600 dark:text-slate-400">{event.description}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 space-x-reverse text-sm text-slate-500 dark:text-slate-400">
                                <div className="flex items-center space-x-1 space-x-reverse">
                                    <Clock className="h-4 w-4 text-blue-500" />
                                  <span>{event.time}</span>
                                </div>
                                <div className="flex items-center space-x-1 space-x-reverse">
                                    <MapPin className="h-4 w-4 text-purple-500" />
                                  <span>{event.location}</span>
                                </div>
                                  <div className="flex items-center space-x-1 space-x-reverse">
                                    <Users className="h-4 w-4 text-indigo-500" />
                                    <span>{event.attendees} مشارك</span>
                              </div>
                                </div>
                                <Badge className={`${getPriorityColor(event.priority)} text-xs shadow-sm`}>
                                  {event.priority === 'high' ? 'عالي' : event.priority === 'medium' ? 'متوسط' : 'منخفض'}
                                </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                      {todayEvents.length === 0 && (
                        <div className="text-center py-12 text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-600">
                          <CalendarIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-medium">لا توجد أحداث في هذا اليوم</p>
                          <p className="text-sm">اضغط على "إضافة حدث جديد" لإنشاء حدث</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

          {/* Enhanced Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Enhanced Add New Event Form */}
            <Card className="border-0 shadow-lg bg-transparent">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 space-x-reverse text-slate-800 dark:text-slate-200">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                    <PlusCircle className="h-5 w-5 text-white" />
                </div>
                  <span className="text-lg font-bold">إضافة حدث جديد</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">عنوان الحدث</label>
                    <Input 
                      placeholder="أدخل عنوان الحدث" 
                      className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-slate-200 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 shadow-sm" 
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">نوع الحدث</label>
                  <Select>
                      <SelectTrigger className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-slate-200 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 shadow-sm">
                      <SelectValue placeholder="اختر نوع الحدث" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meeting">اجتماع</SelectItem>
                      <SelectItem value="event">نشاط</SelectItem>
                      <SelectItem value="exam">امتحان</SelectItem>
                      <SelectItem value="trip">رحلة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">التاريخ</label>
                      <Input 
                        type="date" 
                        className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-slate-200 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 shadow-sm" 
                      />
                </div>
                <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">الوقت</label>
                      <Input 
                        type="time" 
                        className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-slate-200 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 shadow-sm" 
                      />
                  </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">المكان</label>
                    <Input 
                      placeholder="أدخل مكان الحدث" 
                      className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-slate-200 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 shadow-sm" 
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">الوصف</label>
                    <Textarea 
                      placeholder="أدخل وصف الحدث" 
                      rows={3} 
                      className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-slate-200 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 resize-none shadow-sm" 
                    />
                </div>

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 font-semibold">
                  <PlusCircle className="h-4 w-4 ml-2" />
                  إضافة حدث
                </Button>
              </form>
            </CardContent>
          </Card>

            {/* Enhanced Event Categories */}
            <Card className="border-0 shadow-lg bg-transparent">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 space-x-reverse text-slate-800 dark:text-slate-200">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                    <Filter className="h-5 w-5 text-white" />
                </div>
                  <span className="text-lg font-bold">تصنيفات الأحداث</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                {eventTypes.map((type, index) => (
                  <div 
                    key={type.id}
                      className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 cursor-pointer hover:scale-105 border ${
                        selectedEventType === type.id 
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border-blue-300 dark:border-blue-600 shadow-md' 
                          : 'bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-600 hover:border-blue-200 dark:hover:border-blue-500 hover:shadow-md'
                      }`}
                    onClick={() => setSelectedEventType(type.id)}
                  >
                    <div className="flex items-center space-x-3 space-x-reverse">
                        <div className={`w-4 h-4 rounded-full ${type.color} shadow-sm`}></div>
                        <div>
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{type.name}</span>
                          <p className="text-xs text-slate-500 dark:text-slate-400">أحداث من هذا النوع</p>
                        </div>
                </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs font-semibold shadow-sm ${
                          selectedEventType === type.id 
                            ? 'border-blue-300 text-blue-600 bg-blue-50 dark:bg-blue-900/30' 
                            : 'border-slate-200 text-slate-600'
                        }`}
                      >
                      {type.count}
                  </Badge>
                </div>
                ))}
                  
                  <Separator className="my-4" />
                  
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg p-4 border border-blue-200 dark:border-blue-600 shadow-md">
                    <div className="text-sm font-semibold mb-2 text-slate-700 dark:text-slate-200">الأحداث القادمة</div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">10</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">في الشهر القادم</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-transparent">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 space-x-reverse text-slate-800 dark:text-slate-200">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-500">
                    <Zap className="h-5 w-5 text-white" />
                </div>
                  <span className="text-lg font-bold">إجراءات سريعة</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-blue-200 dark:border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 transition-all duration-200 hover:scale-105 shadow-sm"
                >
                <Download className="h-4 w-4 ml-2" />
                تصدير التقويم
              </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-purple-200 dark:border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 transition-all duration-200 hover:scale-105 shadow-sm"
                >
                <Bell className="h-4 w-4 ml-2" />
                إعداد التذكيرات
              </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-indigo-200 dark:border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-300 transition-all duration-200 hover:scale-105 shadow-sm"
                >
                <Users className="h-4 w-4 ml-2" />
                إدارة المشاركين
              </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:border-slate-300 transition-all duration-200 hover:scale-105 shadow-sm"
                >
                <Settings className="h-4 w-4 ml-2" />
                إعدادات التقويم
              </Button>
            </CardContent>
          </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
