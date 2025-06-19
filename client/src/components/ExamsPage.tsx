import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  PlusCircle, 
  FileText, 
  Download, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Award, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  Edit, 
  Trash2, 
  Eye, 
  BarChart3, 
  PieChart, 
  Filter,
  Search,
  MoreVertical,
  BookOpen,
  GraduationCap,
  Target,
  Zap,
  Star,
  Trophy,
  Activity,
  Bell,
  Settings,
  Upload,
  Share2,
  Printer,
  Copy,
  ExternalLink
} from 'lucide-react';
import Loader from '@/components/ui/loader';
import { formatDate } from '@/lib/utils';

const ExamsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddExamOpen, setIsAddExamOpen] = useState(false);

  // Enhanced mock data
  const examStats = {
    totalExams: 45,
    upcomingExams: 8,
    completedExams: 37,
    averageScore: 82.5,
    passRate: 94.2,
    totalStudents: 1247,
    totalSubjects: 12
  };

  const upcomingExams = [
    {
      id: 1,
      subject: 'الرياضيات',
      class: 'الصف الثالث أ',
      date: '2025-01-20',
      time: '09:00',
      duration: 120,
      location: 'قاعة 101',
      students: 28,
      status: 'scheduled',
      type: 'midterm',
      teacher: 'أ. أحمد محمد',
      notes: 'امتحان منتصف الفصل الدراسي'
    },
    {
      id: 2,
      subject: 'العلوم',
      class: 'الصف الثاني ب',
      date: '2025-01-21',
      time: '10:30',
      duration: 90,
      location: 'قاعة 102',
      students: 32,
      status: 'scheduled',
      type: 'quiz',
      teacher: 'أ. فاطمة السيد',
      notes: 'اختبار قصير - الوحدة الثالثة'
    },
    {
      id: 3,
      subject: 'اللغة العربية',
      class: 'الصف الأول ج',
      date: '2025-01-22',
      time: '08:00',
      duration: 60,
      location: 'قاعة 103',
      students: 25,
      status: 'scheduled',
      type: 'final',
      teacher: 'أ. خالد عبدالله',
      notes: 'امتحان نهائي - الفصل الأول'
    }
  ];

  const completedExams = [
    {
      id: 4,
      subject: 'اللغة الإنجليزية',
      class: 'الصف الثالث ب',
      date: '2025-01-15',
      averageScore: 85.2,
      highestScore: 98,
      lowestScore: 65,
      passRate: 96.3,
      totalStudents: 30,
      passedStudents: 29,
      status: 'completed',
      type: 'midterm',
      teacher: 'أ. سارة أحمد'
    },
    {
      id: 5,
      subject: 'الدراسات الاجتماعية',
      class: 'الصف الثاني أ',
      date: '2025-01-12',
      averageScore: 78.5,
      highestScore: 95,
      lowestScore: 58,
      passRate: 89.7,
      totalStudents: 35,
      passedStudents: 31,
      status: 'completed',
      type: 'quiz',
      teacher: 'أ. محمد علي'
    },
    {
      id: 6,
      subject: 'الرياضيات',
      class: 'الصف الأول أ',
      date: '2025-01-10',
      averageScore: 91.8,
      highestScore: 100,
      lowestScore: 72,
      passRate: 100,
      totalStudents: 28,
      passedStudents: 28,
      status: 'completed',
      type: 'final',
      teacher: 'أ. أحمد محمد'
    }
  ];

  const examTypes = [
    { value: 'midterm', label: 'امتحان منتصف الفصل', color: 'bg-blue-500' },
    { value: 'final', label: 'امتحان نهائي', color: 'bg-red-500' },
    { value: 'quiz', label: 'اختبار قصير', color: 'bg-green-500' },
    { value: 'assignment', label: 'واجب منزلي', color: 'bg-purple-500' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">مجدول</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">مكتمل</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">ملغي</Badge>;
      default:
        return <Badge variant="outline">غير محدد</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    const examType = examTypes.find(t => t.value === type);
    return examType ? (
      <Badge className={`${examType.color} text-white`}>
        {examType.label}
      </Badge>
    ) : <Badge variant="outline">{type}</Badge>;
  };

  const filteredUpcomingExams = upcomingExams.filter(exam =>
    exam.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exam.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exam.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCompletedExams = completedExams.filter(exam =>
    exam.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exam.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exam.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-2xl text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse-slow"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">نظام إدارة الامتحانات</h1>
              <p className="text-blue-100">إدارة الامتحانات والنتائج والتحليلات</p>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              <Button 
                onClick={() => setIsAddExamOpen(true)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/30 hover-lift"
              >
                <PlusCircle className="h-4 w-4 ml-2" />
                إضافة امتحان جديد
              </Button>
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Calendar className="h-5 w-5 text-blue-200" />
                <span className="text-sm text-blue-100">الامتحانات القادمة</span>
              </div>
              <p className="text-2xl font-bold">{examStats.upcomingExams}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center space-x-2 space-x-reverse">
                <CheckCircle className="h-5 w-5 text-green-200" />
                <span className="text-sm text-blue-100">المكتملة</span>
              </div>
              <p className="text-2xl font-bold">{examStats.completedExams}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center space-x-2 space-x-reverse">
                <TrendingUp className="h-5 w-5 text-yellow-200" />
                <span className="text-sm text-blue-100">متوسط الدرجات</span>
              </div>
              <p className="text-2xl font-bold">{examStats.averageScore}%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Trophy className="h-5 w-5 text-orange-200" />
                <span className="text-sm text-blue-100">نسبة النجاح</span>
              </div>
              <p className="text-2xl font-bold">{examStats.passRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-3 space-x-reverse flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="البحث في الامتحانات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-600"
            />
          </div>
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-40 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الامتحانات</SelectItem>
              <SelectItem value="midterm">امتحانات منتصف الفصل</SelectItem>
              <SelectItem value="final">امتحانات نهائية</SelectItem>
              <SelectItem value="quiz">اختبارات قصيرة</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse">
          <Button variant="outline" className="border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700">
            <Download className="h-4 w-4 ml-2" />
            تصدير التقرير
          </Button>
          <Button variant="outline" className="border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700">
            <Printer className="h-4 w-4 ml-2" />
            طباعة
          </Button>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
          <TabsTrigger value="analytics" className="hover-glow">التحليلات</TabsTrigger>
          <TabsTrigger value="completed" className="hover-glow">الامتحانات المكتملة</TabsTrigger>
          <TabsTrigger value="upcoming" className="hover-glow">الامتحانات القادمة</TabsTrigger>
          <TabsTrigger value="overview" className="hover-glow">نظرة عامة</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upcoming Exams Card */}
            <Card className="card-hover">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-start space-x-2 space-x-reverse text-lg">
                  <span>الامتحانات القادمة</span>
                  <Calendar className="h-5 w-5 text-blue-500" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingExams.slice(0, 3).map((exam) => (
                  <div key={exam.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{exam.subject}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{exam.class}</p>
                      <div className="flex items-center space-x-2 space-x-reverse mt-1">
                        <Clock className="h-3 w-3 text-slate-400" />
                        <span className="text-xs text-slate-500">{formatDate(exam.date)} - {exam.time}</span>
                      </div>
                    </div>
                    {getTypeBadge(exam.type)}
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-3">
                  <Eye className="h-4 w-4 ml-2" />
                  عرض الكل
                </Button>
              </CardContent>
            </Card>

            {/* Recent Results Card */}
            <Card className="card-hover">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 space-x-reverse text-lg">
                  <Award className="h-5 w-5 text-green-500" />
                  <span>أحدث النتائج</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {completedExams.slice(0, 3).map((exam) => (
                  <div key={exam.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{exam.subject}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{exam.class}</p>
                      <div className="flex items-center space-x-2 space-x-reverse mt-1">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-slate-500">متوسط: {exam.averageScore}%</span>
                      </div>
                    </div>
                    <Badge className={`${exam.passRate >= 90 ? 'bg-green-100 text-green-800' : exam.passRate >= 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {exam.passRate}%
                    </Badge>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-3">
                  <BarChart3 className="h-4 w-4 ml-2" />
                  عرض التحليلات
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card className="card-hover">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 space-x-reverse text-lg">
                  <Zap className="h-5 w-5 text-purple-500" />
                  <span>إجراءات سريعة</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => setIsAddExamOpen(true)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <PlusCircle className="h-4 w-4 ml-2" />
                  إضافة امتحان جديد
                </Button>
                <Button variant="outline" className="w-full">
                  <Upload className="h-4 w-4 ml-2" />
                  رفع النتائج
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 ml-2" />
                  مشاركة النتائج
                </Button>
                <Button variant="outline" className="w-full">
                  <Bell className="h-4 w-4 ml-2" />
                  إعداد التذكيرات
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Upcoming Exams Tab */}
        <TabsContent value="upcoming" className="space-y-6">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <Calendar className="h-5 w-5 text-blue-500" />
                <span>الامتحانات القادمة</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المادة</TableHead>
                        <TableHead>الصف</TableHead>
                      <TableHead>المعلم</TableHead>
                      <TableHead>التاريخ والوقت</TableHead>
                      <TableHead>المدة</TableHead>
                        <TableHead>القاعة</TableHead>
                      <TableHead>الطلاب</TableHead>
                      <TableHead>النوع</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {filteredUpcomingExams.map((exam) => (
                      <TableRow key={exam.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                        <TableCell className="font-medium">{exam.subject}</TableCell>
                          <TableCell>{exam.class}</TableCell>
                        <TableCell>{exam.teacher}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            <span>{formatDate(exam.date)}</span>
                            <Clock className="h-4 w-4 text-slate-400" />
                            <span>{exam.time}</span>
                          </div>
                        </TableCell>
                        <TableCell>{exam.duration} دقيقة</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <MapPin className="h-4 w-4 text-slate-400" />
                            <span>{exam.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Users className="h-4 w-4 text-slate-400" />
                            <span>{exam.students}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getTypeBadge(exam.type)}</TableCell>
                          <TableCell>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <MoreVertical className="h-4 w-4" />
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
                </TabsContent>

        {/* Completed Exams Tab */}
        <TabsContent value="completed" className="space-y-6">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>الامتحانات المكتملة</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المادة</TableHead>
                        <TableHead>الصف</TableHead>
                      <TableHead>المعلم</TableHead>
                        <TableHead>التاريخ</TableHead>
                        <TableHead>متوسط الدرجات</TableHead>
                      <TableHead>نسبة النجاح</TableHead>
                      <TableHead>أعلى/أقل درجة</TableHead>
                      <TableHead>النوع</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {filteredCompletedExams.map((exam) => (
                      <TableRow key={exam.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                        <TableCell className="font-medium">{exam.subject}</TableCell>
                          <TableCell>{exam.class}</TableCell>
                        <TableCell>{exam.teacher}</TableCell>
                          <TableCell>{formatDate(exam.date)}</TableCell>
                          <TableCell>
                          <Badge className={`${exam.averageScore >= 90 ? 'bg-green-100 text-green-800' : exam.averageScore >= 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                            {exam.averageScore}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${exam.passRate >= 90 ? 'bg-green-100 text-green-800' : exam.passRate >= 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                            {exam.passRate}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="text-green-600">{exam.highestScore}%</div>
                            <div className="text-red-600">{exam.lowestScore}%</div>
                          </div>
                          </TableCell>
                        <TableCell>{getTypeBadge(exam.type)}</TableCell>
                          <TableCell>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Button variant="outline" size="sm">
                              <BarChart3 className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <MoreVertical className="h-4 w-4" />
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
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Overview */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 space-x-reverse">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  <span>نظرة عامة على الأداء</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                      <Target className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">متوسط عام</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{examStats.averageScore}%</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                      <Trophy className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">نسبة النجاح</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">{examStats.passRate}%</p>
                  </div>
        </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                    <span className="text-sm">إجمالي الامتحانات</span>
                    <Badge>{examStats.totalExams}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                    <span className="text-sm">إجمالي الطلاب</span>
                    <Badge>{examStats.totalStudents}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                    <span className="text-sm">المواد الدراسية</span>
                    <Badge>{examStats.totalSubjects}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subject Performance */}
            <Card className="card-hover">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2 space-x-reverse">
                  <BookOpen className="h-5 w-5 text-purple-500" />
                  <span>أداء المواد الدراسية</span>
                </CardTitle>
            </CardHeader>
              <CardContent className="space-y-4">
                {completedExams.map((exam) => (
                  <div key={exam.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{exam.subject}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{exam.class}</p>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="text-right">
                        <p className="text-sm font-medium">{exam.averageScore}%</p>
                        <p className="text-xs text-slate-500">متوسط</p>
                      </div>
                      <div className="w-16 h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            exam.averageScore >= 90 ? 'bg-green-500' : 
                            exam.averageScore >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${exam.averageScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Exam Dialog */}
      <Dialog open={isAddExamOpen} onOpenChange={setIsAddExamOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 space-x-reverse">
              <PlusCircle className="h-5 w-5 text-blue-500" />
              <span>إضافة امتحان جديد</span>
            </DialogTitle>
            <DialogDescription>
              قم بإدخال تفاصيل الامتحان الجديد
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
              <Label htmlFor="subject">المادة الدراسية</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المادة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">الرياضيات</SelectItem>
                      <SelectItem value="science">العلوم</SelectItem>
                      <SelectItem value="arabic">اللغة العربية</SelectItem>
                  <SelectItem value="english">اللغة الإنجليزية</SelectItem>
                  <SelectItem value="social">الدراسات الاجتماعية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
              <Label htmlFor="class">الصف الدراسي</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الصف" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1a">الصف الأول أ</SelectItem>
                  <SelectItem value="1b">الصف الأول ب</SelectItem>
                  <SelectItem value="2a">الصف الثاني أ</SelectItem>
                      <SelectItem value="2b">الصف الثاني ب</SelectItem>
                  <SelectItem value="3a">الصف الثالث أ</SelectItem>
                  <SelectItem value="3b">الصف الثالث ب</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">نوع الامتحان</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر النوع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="midterm">امتحان منتصف الفصل</SelectItem>
                  <SelectItem value="final">امتحان نهائي</SelectItem>
                  <SelectItem value="quiz">اختبار قصير</SelectItem>
                  <SelectItem value="assignment">واجب منزلي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
              <Label htmlFor="date">التاريخ</Label>
                  <Input type="date" />
                </div>

                <div className="space-y-2">
              <Label htmlFor="time">الوقت</Label>
                  <Input type="time" />
                </div>

                <div className="space-y-2">
              <Label htmlFor="duration">المدة (دقيقة)</Label>
              <Input type="number" min="30" step="15" placeholder="120" />
                </div>

                <div className="space-y-2">
              <Label htmlFor="location">القاعة</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر القاعة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="101">قاعة 101</SelectItem>
                      <SelectItem value="102">قاعة 102</SelectItem>
                      <SelectItem value="103">قاعة 103</SelectItem>
                  <SelectItem value="104">قاعة 104</SelectItem>
                  <SelectItem value="105">قاعة 105</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

            <div className="space-y-2">
              <Label htmlFor="teacher">المعلم المسؤول</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المعلم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ahmed">أ. أحمد محمد</SelectItem>
                  <SelectItem value="fatima">أ. فاطمة السيد</SelectItem>
                  <SelectItem value="khaled">أ. خالد عبدالله</SelectItem>
                  <SelectItem value="sara">أ. سارة أحمد</SelectItem>
                  <SelectItem value="mohamed">أ. محمد علي</SelectItem>
                </SelectContent>
              </Select>
                </div>
              </div>

          <div className="space-y-2">
            <Label htmlFor="notes">ملاحظات إضافية</Label>
            <Textarea placeholder="أي ملاحظات أو تعليمات خاصة بالامتحان..." />
        </div>

          <div className="flex items-center justify-end space-x-2 space-x-reverse">
            <Button variant="outline" onClick={() => setIsAddExamOpen(false)}>
              إلغاء
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <PlusCircle className="h-4 w-4 ml-2" />
              إضافة الامتحان
            </Button>
      </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExamsPage;
