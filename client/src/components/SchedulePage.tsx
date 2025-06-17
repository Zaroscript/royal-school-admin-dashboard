import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Bell,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  Star,
  Target,
  TrendingUp,
  BarChart,
  PieChart,
  Activity,
  GraduationCap,
  Award,
  Book,
  FileText,
  Download,
  Upload,
  Settings,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  User,
  UserCheck,
  UserX,
  Mail,
  Phone,
  MessageSquare,
  Video,
  Mic,
  MicOff,
  VideoOff,
  Wifi,
  WifiOff,
  Battery,
  BatteryCharging,
  Signal,
  SignalHigh,
  SignalLow,
  SignalMedium,
  SignalZero,
  Wifi as WifiIcon,
  WifiOff as WifiOffIcon,
  Battery as BatteryIcon,
  BatteryCharging as BatteryChargingIcon,
  Signal as SignalIcon,
  SignalHigh as SignalHighIcon,
  SignalLow as SignalLowIcon,
  SignalMedium as SignalMediumIcon,
  SignalZero as SignalZeroIcon
} from 'lucide-react';

interface ScheduleEvent {
  id: string;
  title: string;
  teacher: string;
  subject: string;
  time: string;
  duration: string;
  room: string;
  grade: string;
  day: string;
  type: 'lecture' | 'exam' | 'meeting' | 'event';
}

const SchedulePage = () => {
  const [selectedDay, setSelectedDay] = useState('السبت');
  const [schedule] = useState<ScheduleEvent[]>([
    {
      id: '1',
      title: 'حصة الرياضيات',
      teacher: 'د. أحمد محمود',
      subject: 'الرياضيات',
      time: '08:00',
      duration: '45 دقيقة',
      room: 'الفصل 101',
      grade: 'الثالث الثانوي',
      day: 'السبت',
      type: 'lecture'
    },
    {
      id: '2',
      title: 'امتحان اللغة العربية',
      teacher: 'أ. فاطمة السيد',
      subject: 'اللغة العربية',
      time: '10:00',
      duration: '90 دقيقة',
      room: 'قاعة الامتحانات',
      grade: 'الثاني الثانوي',
      day: 'السبت',
      type: 'exam'
    },
    {
      id: '3',
      title: 'حصة الفيزياء',
      teacher: 'د. محمد علي',
      subject: 'الفيزياء',
      time: '12:00',
      duration: '45 دقيقة',
      room: 'مختبر الفيزياء',
      grade: 'الثالث الثانوي',
      day: 'السبت',
      type: 'lecture'
    }
  ]);

  const days = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];
  
  const filteredSchedule = schedule.filter(event => event.day === selectedDay);

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'lecture': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'exam': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'meeting': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'event': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getEventTypeText = (type: string) => {
    switch (type) {
      case 'lecture': return 'حصة';
      case 'exam': return 'امتحان';
      case 'meeting': return 'اجتماع';
      case 'event': return 'فعالية';
      default: return 'غير محدد';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          الجدول الدراسي
        </h1>
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 ml-2" />
            تصفية
          </Button>
          <Button className="bg-gradient-to-r from-school-blue-500 to-school-red-500 hover:from-school-blue-600 hover:to-school-red-600">
            <Plus className="w-4 h-4 ml-2" />
            إضافة حدث
          </Button>
        </div>
      </div>

      {/* Weekly Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            نظرة عامة على الأسبوع
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {days.map((day) => (
              <Button
                key={day}
                variant={selectedDay === day ? 'default' : 'outline'}
                onClick={() => setSelectedDay(day)}
                className={`h-16 ${selectedDay === day ? 'bg-gradient-to-r from-school-blue-500 to-school-red-500' : ''}`}
              >
                <div className="text-center">
                  <div className="font-medium">{day}</div>
                  <div className="text-xs opacity-70">
                    {schedule.filter(event => event.day === day).length} حدث
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Schedule */}
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              جدول يوم {selectedDay}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredSchedule.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                لا توجد أحداث في هذا اليوم
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSchedule.map((event, index) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-all duration-300 hover-scale"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex-shrink-0 text-center">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {event.time}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {event.duration}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {event.title}
                        </h3>
                        <Badge className={getEventTypeColor(event.type)}>
                          {getEventTypeText(event.type)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{event.subject}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{event.teacher}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{event.room}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{event.grade}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="animate-slide-in-right">
          <CardContent className="p-6 text-center">
            <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">156</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">حصص هذا الأسبوع</div>
          </CardContent>
        </Card>
        <Card className="animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">12</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">امتحانات مجدولة</div>
          </CardContent>
        </Card>
        <Card className="animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">8</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">اجتماعات</div>
          </CardContent>
        </Card>
        <Card className="animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
          <CardContent className="p-6 text-center">
            <CalendarIcon className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">3</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">فعاليات خاصة</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SchedulePage;
