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
  Star,
  Zap,
  Target,
  Trophy,
  Award,
  BookOpen,
  GraduationCap,
  Activity,
  FileText,
  Settings,
  Eye,
  Edit,
  Trash2,
  Filter,
  Search,
  Download,
  Upload
} from 'lucide-react';

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
  ];

  const eventTypes = [
    { id: 'all', name: 'جميع الأحداث', count: events.length, color: 'bg-royal-blue/10 text-royal-blue border border-royal-blue/20' },
    { id: 'meeting', name: 'اجتماعات', count: events.filter(e => e.type === 'meeting').length, color: 'bg-royal-blue/10 text-royal-blue border border-royal-blue/20' },
    { id: 'event', name: 'أنشطة', count: events.filter(e => e.type === 'event').length, color: 'bg-royal-green/10 text-royal-green border border-royal-green/20' },
    { id: 'exam', name: 'امتحانات', count: events.filter(e => e.type === 'exam').length, color: 'bg-royal-red/10 text-royal-red border border-royal-red/20' },
    { id: 'trip', name: 'رحلات', count: events.filter(e => e.type === 'trip').length, color: 'bg-royal-orange/10 text-royal-orange border border-royal-orange/20' },
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-royal-blue/10 text-royal-blue border border-royal-blue/20';
      case 'event': return 'bg-royal-green/10 text-royal-green border border-royal-green/20';
      case 'exam': return 'bg-royal-red/10 text-royal-red border border-royal-red/20';
      case 'trip': return 'bg-royal-orange/10 text-royal-orange border border-royal-orange/20';
      default: return 'bg-neutral-100 text-neutral-600 border border-neutral-200';
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
      case 'high': return 'bg-royal-red/10 text-royal-red border border-royal-red/20';
      case 'medium': return 'bg-royal-orange/10 text-royal-orange border border-royal-orange/20';
      case 'low': return 'bg-royal-green/10 text-royal-green border border-royal-green/20';
      default: return 'bg-neutral-100 text-neutral-600 border border-neutral-200';
    }
  };

  const filteredEvents = selectedEventType === 'all' 
    ? events 
    : events.filter(event => event.type === selectedEventType);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex justify-between items-center animate-slide-in-bottom">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-royal-dark">
            الأحداث والفعاليات
          </h1>
          <p className="text-muted-foreground">
            إدارة وتنظيم الأحداث المدرسية والفعاليات
          </p>
        </div>
        <div className="flex items-center space-x-2 space-x-reverse">
          <Button variant="outline" className="hover-glow border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-royal-white">
            <Download className="h-4 w-4 ml-2" />
            تصدير التقويم
          </Button>
          <Button className="btn-royal hover-glow">
            <PlusCircle className="h-4 w-4 ml-2" />
            إضافة حدث جديد
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-hover animate-slide-in-bottom stagger-1 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الأحداث</CardTitle>
            <div className="p-2 rounded-lg bg-royal-blue/10 animate-pulse-slow">
              <CalendarIcon className="h-4 w-4 text-royal-blue" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-royal-blue">{events.length}</div>
            <p className="text-xs text-muted-foreground">
              +3 أحداث هذا الشهر
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover animate-slide-in-bottom stagger-2 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">الأحداث القادمة</CardTitle>
            <div className="p-2 rounded-lg bg-royal-blue/10 animate-heart-beat">
              <Bell className="h-4 w-4 text-royal-blue" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-royal-blue">8</div>
            <p className="text-xs text-muted-foreground">
              في الأسبوع القادم
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover animate-slide-in-bottom stagger-3 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">معدل الحضور</CardTitle>
            <div className="p-2 rounded-lg bg-royal-green/10 animate-bounce-gentle">
              <Users className="h-4 w-4 text-royal-green" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-royal-green">87%</div>
            <p className="text-xs text-muted-foreground">+5% مقارنة بالشهر الماضي</p>
          </CardContent>
        </Card>

        <Card className="card-hover animate-slide-in-bottom stagger-4 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">أحداث عاجلة</CardTitle>
            <div className="p-2 rounded-lg bg-royal-red/10 animate-float">
              <AlertCircle className="h-4 w-4 text-royal-red" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-royal-red">3</div>
            <p className="text-xs text-muted-foreground">
              تحتاج إلى اهتمام فوري
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Calendar Section */}
        <div className="col-span-12 lg:col-span-8">
          <Card className="card-hover animate-slide-in-bottom stagger-5">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <div className="p-2 rounded-lg bg-royal-blue/10 animate-pulse-slow">
                  <CalendarIcon className="h-5 w-5 text-royal-blue" />
                </div>
                <span>التقويم المدرسي</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-2/3">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 hover-glow"
                  />
                </div>
                <div className="lg:w-1/3 space-y-4">
                  <h3 className="font-semibold flex items-center space-x-2 space-x-reverse">
                    <Clock className="h-4 w-4 text-royal-blue" />
                    <span>أحداث {date.toLocaleDateString('ar-SA')}</span>
                  </h3>
                  <div className="space-y-3">
                    {filteredEvents
                      .filter(event => event.date === date.toISOString().split('T')[0])
                      .map((event, index) => (
                        <Card 
                          key={event.id} 
                          className="hover-lift animate-slide-in-left"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                        <CardContent className="p-4">
                            <div className="space-y-3">
                            <div className="flex justify-between items-start">
                                <h4 className="font-medium hover-scale">{event.title}</h4>
                                <Badge className={`${getEventTypeColor(event.type)} hover-scale`}>
                                  {getEventTypeText(event.type)}
                              </Badge>
                            </div>
                              <p className="text-sm text-muted-foreground">{event.description}</p>
                              <div className="flex items-center space-x-3 space-x-reverse text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1 space-x-reverse">
                                  <Clock className="h-4 w-4" />
                                  <span>{event.time}</span>
                                </div>
                                <div className="flex items-center space-x-1 space-x-reverse">
                                  <MapPin className="h-4 w-4" />
                                  <span>{event.location}</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-1 space-x-reverse text-sm text-muted-foreground">
                                  <Users className="h-4 w-4" />
                                  <span>{event.attendees} مشارك</span>
                                </div>
                                <Badge className={`${getPriorityColor(event.priority)} text-xs`}>
                                  {event.priority === 'high' ? 'عالي' : event.priority === 'medium' ? 'متوسط' : 'منخفض'}
                                </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {filteredEvents.filter(event => event.date === date.toISOString().split('T')[0]).length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <CalendarIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>لا توجد أحداث في هذا اليوم</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Add New Event */}
          <Card className="card-hover animate-slide-in-bottom stagger-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <div className="p-2 rounded-lg bg-royal-blue/10 animate-pulse-slow">
                  <PlusCircle className="h-5 w-5 text-royal-blue" />
                </div>
                <span>إضافة حدث جديد</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">عنوان الحدث</label>
                  <Input placeholder="أدخل عنوان الحدث" className="royal-input hover-glow" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">نوع الحدث</label>
                  <Select>
                    <SelectTrigger className="royal-select hover-glow">
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
                  <label className="text-sm font-medium">التاريخ</label>
                    <Input type="date" className="royal-input hover-glow" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">الوقت</label>
                    <Input type="time" className="royal-input hover-glow" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">المكان</label>
                  <Input placeholder="أدخل مكان الحدث" className="royal-input hover-glow" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">الوصف</label>
                  <Textarea placeholder="أدخل وصف الحدث" rows={3} className="royal-input hover-glow" />
                </div>

                <Button className="w-full btn-royal hover-glow">
                  <PlusCircle className="h-4 w-4 ml-2" />
                  إضافة حدث
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Event Categories */}
          <Card className="card-hover animate-slide-in-bottom stagger-7">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <div className="p-2 rounded-lg bg-royal-blue/10 animate-bounce-gentle">
                  <Filter className="h-5 w-5 text-royal-blue" />
                </div>
                <span>تصنيفات الأحداث</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eventTypes.map((type, index) => (
                  <div 
                    key={type.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer hover-lift animate-slide-in-left"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setSelectedEventType(type.id)}
                  >
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className={`w-3 h-3 rounded-full ${type.color}`}></div>
                      <span className="text-sm font-medium">{type.name}</span>
                </div>
                    <Badge variant="outline" className="text-xs hover-scale border-royal-blue text-royal-blue">
                      {type.count}
                  </Badge>
                </div>
                ))}
                <Separator />
                <div className="pt-2">
                  <div className="text-sm font-medium mb-2">الأحداث القادمة</div>
                  <div className="text-2xl font-bold text-royal-blue">10</div>
                  <div className="text-sm text-muted-foreground">في الشهر القادم</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="card-hover animate-slide-in-bottom stagger-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <div className="p-2 rounded-lg bg-royal-green/10 animate-heart-beat">
                  <Zap className="h-5 w-5 text-royal-green" />
                </div>
                <span>إجراءات سريعة</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start hover-glow border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-royal-white">
                <Download className="h-4 w-4 ml-2" />
                تصدير التقويم
              </Button>
              <Button variant="outline" className="w-full justify-start hover-glow border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-royal-white">
                <Bell className="h-4 w-4 ml-2" />
                إعداد التذكيرات
              </Button>
              <Button variant="outline" className="w-full justify-start hover-glow border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-royal-white">
                <Users className="h-4 w-4 ml-2" />
                إدارة المشاركين
              </Button>
              <Button variant="outline" className="w-full justify-start hover-glow border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-royal-white">
                <Settings className="h-4 w-4 ml-2" />
                إعدادات التقويم
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
