import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar } from './ui/calendar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Calendar as CalendarIcon,
  Users, 
  Clock, 
  TrendingUp, 
  BarChart, 
  PieChart, 
  Activity, 
  GraduationCap, 
  Award, 
  Book, 
  FileText, 
  Settings, 
  Bell, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Info, 
  ChevronUp, 
  ChevronDown, 
  ArrowUp, 
  ArrowDown, 
  ArrowRight, 
  ArrowLeft, 
  Home, 
  Lock, 
  Unlock, 
  Shield, 
  Database, 
  Server, 
  HardDrive, 
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
  SignalZero as SignalZeroIcon,
  Plus,
  Download,
  Upload,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2,
  Target,
  Zap,
  Star,
  Crown,
  Trophy
} from 'lucide-react';

const AttendancePage = () => {
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [selectedTab, setSelectedTab] = useState('daily');

  // Mock data - replace with actual API calls
  const classes = [
    { id: '1', name: 'الصف الأول أ', students: 25, attendance: 92 },
    { id: '2', name: 'الصف الثاني ب', students: 28, attendance: 89 },
    { id: '3', name: 'الصف الثالث ج', students: 30, attendance: 95 },
  ];

  const students = [
    { id: 1, name: 'أحمد محمد', status: 'present', time: '07:45', avatar: 'AM' },
    { id: 2, name: 'سارة أحمد', status: 'absent', time: '-', avatar: 'SA' },
    { id: 3, name: 'عمر خالد', status: 'late', time: '08:15', avatar: 'OK' },
    { id: 4, name: 'فاطمة علي', status: 'present', time: '07:30', avatar: 'FA' },
    { id: 5, name: 'محمد حسن', status: 'present', time: '07:40', avatar: 'MH' },
  ];

  const attendanceData = [
    { date: '2024-01-15', present: 22, absent: 3, late: 2 },
    { date: '2024-01-16', present: 24, absent: 1, late: 1 },
    { date: '2024-01-17', present: 23, absent: 2, late: 2 },
    { date: '2024-01-18', present: 25, absent: 0, late: 1 },
    { date: '2024-01-19', present: 21, absent: 4, late: 1 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-royal-green/10 text-royal-green border border-royal-green/20';
      case 'absent': return 'bg-royal-red/10 text-royal-red border border-royal-red/20';
      case 'late': return 'bg-royal-orange/10 text-royal-orange border border-royal-orange/20';
      default: return 'bg-neutral-100 text-neutral-600 border border-neutral-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'present': return 'حاضر';
      case 'absent': return 'غائب';
      case 'late': return 'متأخر';
      default: return 'غير محدد';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex justify-between items-center animate-slide-in-bottom">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-royal-dark">
            الحضور والغياب
          </h1>
          <p className="text-muted-foreground">
            تتبع وإدارة حضور الطلاب
          </p>
        </div>
        <div className="flex items-center space-x-2 space-x-reverse">
          <Button variant="outline" className="hover-glow border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-royal-white">
            <Download className="h-4 w-4 ml-2" />
            تصدير التقرير
          </Button>
          <Button className="btn-royal hover-glow">
            <Plus className="h-4 w-4 ml-2" />
            تسجيل حضور جديد
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-hover animate-slide-in-bottom stagger-1 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الطلاب</CardTitle>
            <div className="p-2 rounded-lg bg-royal-blue/10 animate-pulse-slow">
              <Users className="h-4 w-4 text-royal-blue" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-royal-blue">1,247</div>
            <p className="text-xs text-muted-foreground">
              +12 طالب هذا الشهر
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover animate-slide-in-bottom stagger-2 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">نسبة الحضور</CardTitle>
            <div className="p-2 rounded-lg bg-royal-green/10 animate-heart-beat">
              <CheckCircle className="h-4 w-4 text-royal-green" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-royal-green">94.2%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% مقارنة بالأسبوع الماضي
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover animate-slide-in-bottom stagger-3 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">الغياب اليوم</CardTitle>
            <div className="p-2 rounded-lg bg-royal-red/10 animate-bounce-gentle">
              <XCircle className="h-4 w-4 text-royal-red" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-royal-red">23</div>
            <p className="text-xs text-muted-foreground">
              -5 مقارنة بالأمس
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover animate-slide-in-bottom stagger-4 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">التأخير</CardTitle>
            <div className="p-2 rounded-lg bg-royal-orange/10 animate-float">
              <Clock className="h-4 w-4 text-royal-orange" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-royal-orange">8</div>
            <p className="text-xs text-muted-foreground">
              -2 مقارنة بالأمس
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <div className="lg:col-span-1">
          <Card className="card-hover animate-slide-in-bottom stagger-5">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <div className="p-2 rounded-lg bg-royal-blue/10 animate-pulse-slow">
                  <CalendarIcon className="h-5 w-5 text-royal-blue" />
                </div>
                <span>تقويم الحضور</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 hover-glow"
                />
                
                {/* Quick Stats for Selected Date */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">إحصائيات {date.toLocaleDateString('ar-SA')}</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 rounded-lg bg-royal-green/10 border border-royal-green/20">
                      <div className="text-lg font-bold text-royal-green">24</div>
                      <div className="text-xs text-royal-green">حاضر</div>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-royal-red/10 border border-royal-red/20">
                      <div className="text-lg font-bold text-royal-red">1</div>
                      <div className="text-xs text-royal-red">غائب</div>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-royal-orange/10 border border-royal-orange/20">
                      <div className="text-lg font-bold text-royal-orange">2</div>
                      <div className="text-xs text-royal-orange">متأخر</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Table */}
        <div className="lg:col-span-2">
          <Card className="card-hover animate-slide-in-bottom stagger-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>سجل الحضور والغياب</CardTitle>
                <div className="flex items-center space-x-2 space-x-reverse">
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-[180px] royal-select hover-glow">
                    <SelectValue placeholder="اختر الصف" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{cls.name}</span>
                            <Badge variant="outline" className="text-xs border-royal-blue text-royal-blue">
                              {cls.attendance}%
                            </Badge>
                          </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                  <Button variant="outline" className="hover-glow border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-royal-white">
                    <Filter className="h-4 w-4 ml-2" />
                    فلتر
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table className="royal-table">
                <TableHeader>
                  <TableRow>
                    <TableHead>الطالب</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>وقت الحضور</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student, index) => (
                    <TableRow 
                      key={student.id}
                      className="animate-slide-in-left hover-lift"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <TableCell>
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="w-8 h-8 rounded-full bg-royal-blue flex items-center justify-center text-royal-white text-sm font-medium">
                            {student.avatar}
                          </div>
                          <span className="font-medium hover-scale">{student.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(student.status)} hover-scale`}>
                          {getStatusText(student.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className={student.time === '-' ? 'text-muted-foreground' : 'text-foreground'}>
                            {student.time}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover-glow hover-bounce"
                            onClick={() => {}}
                          >
                            <CheckCircle className="h-4 w-4 text-royal-green" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover-glow hover-bounce"
                            onClick={() => {}}
                          >
                            <XCircle className="h-4 w-4 text-royal-red" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover-glow hover-bounce"
                            onClick={() => {}}
                          >
                            <AlertCircle className="h-4 w-4 text-royal-orange" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-hover animate-slide-in-bottom stagger-7">
            <CardHeader>
            <CardTitle className="flex items-center space-x-2 space-x-reverse">
              <div className="p-2 rounded-lg bg-royal-blue/10 animate-bounce-gentle">
                <BarChart className="h-5 w-5 text-royal-blue" />
              </div>
              <span>معدل الحضور الأسبوعي</span>
            </CardTitle>
            </CardHeader>
            <CardContent>
            <div className="space-y-4">
              {attendanceData.map((data, index) => (
                <div key={data.date} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{new Date(data.date).toLocaleDateString('ar-SA', { weekday: 'short' })}</span>
                    <span className="font-medium">{Math.round((data.present / (data.present + data.absent + data.late)) * 100)}%</span>
                </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-royal-blue h-2 rounded-full animate-progress" 
                      style={{ 
                        width: `${(data.present / (data.present + data.absent + data.late)) * 100}%`,
                        animationDelay: `${index * 0.2}s`
                      }}
                    ></div>
                </div>
                </div>
              ))}
              </div>
            </CardContent>
          </Card>

        <Card className="card-hover animate-slide-in-bottom stagger-8">
            <CardHeader>
            <CardTitle className="flex items-center space-x-2 space-x-reverse">
              <div className="p-2 rounded-lg bg-royal-green/10 animate-heart-beat">
                <PieChart className="h-5 w-5 text-royal-green" />
              </div>
              <span>توزيع الحضور</span>
            </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-3 h-3 bg-royal-green rounded-full"></div>
                  <span className="text-sm">حاضر</span>
                </div>
                <span className="font-medium">85%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-3 h-3 bg-royal-red rounded-full"></div>
                  <span className="text-sm">غائب</span>
                </div>
                <span className="font-medium">10%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-3 h-3 bg-royal-orange rounded-full"></div>
                  <span className="text-sm">متأخر</span>
                </div>
                <span className="font-medium">5%</span>
                </div>
              </div>
            </CardContent>
          </Card>
      </div>
    </div>
  );
};

export default AttendancePage;
