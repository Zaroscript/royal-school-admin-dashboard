import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus,
  Search,
  BookOpen,
  Users,
  Clock,
  Calendar as CalendarIcon,
  TrendingUp,
  BarChart3,
  Filter,
  Download,
  Edit,
  Eye,
  Trash2,
  Star,
  Award,
  Target,
  CheckCircle2,
  FileText,
  Video,
  BookMarked
} from 'lucide-react';

interface Course {
  id: string;
  name: string;
  description: string;
  teacher: string;
  teacherAvatar?: string;
  studentsCount: number;
  totalHours: number;
  completedHours: number;
  status: 'active' | 'completed' | 'draft' | 'paused';
  startDate: string;
  endDate: string;
  grade: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  reviewsCount: number;
  modules: number;
  assignments: number;
  materials: number;
  lastUpdated: string;
  tags: string[];
}

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  const [courses] = useState<Course[]>([
    {
      id: '1',
      name: 'الرياضيات المتقدمة',
      description: 'مقرر شامل في الرياضيات للصف الثالث الثانوي يشمل الجبر والهندسة والتفاضل والتكامل',
      teacher: 'د. أحمد محمود',
      teacherAvatar: '/api/placeholder/40/40',
      studentsCount: 32,
      totalHours: 120,
      completedHours: 85,
      status: 'active',
      startDate: '2024-09-01',
      endDate: '2024-12-20',
      grade: 'الثالث الثانوي',
      category: 'الرياضيات',
      difficulty: 'advanced',
      rating: 4.8,
      reviewsCount: 24,
      modules: 12,
      assignments: 8,
      materials: 45,
      lastUpdated: '2024-01-15',
      tags: ['الجبر', 'الهندسة', 'التفاضل']
    },
    {
      id: '2',
      name: 'اللغة العربية والأدب',
      description: 'مقرر شامل في اللغة العربية يشمل النحو والصرف والبلاغة والأدب العربي',
      teacher: 'أ. فاطمة السيد',
      teacherAvatar: '/api/placeholder/40/40',
      studentsCount: 28,
      totalHours: 100,
      completedHours: 60,
      status: 'active',
      startDate: '2024-09-01',
      endDate: '2024-12-20',
      grade: 'الثاني الثانوي',
      category: 'اللغة العربية',
      difficulty: 'intermediate',
      rating: 4.6,
      reviewsCount: 18,
      modules: 10,
      assignments: 6,
      materials: 38,
      lastUpdated: '2024-01-12',
      tags: ['النحو', 'الصرف', 'البلاغة']
    },
    {
      id: '3',
      name: 'الفيزياء التطبيقية',
      description: 'مقرر الفيزياء الحديثة مع التركيز على التطبيقات العملية والمختبرات',
      teacher: 'د. محمد علي',
      teacherAvatar: '/api/placeholder/40/40',
      studentsCount: 25,
      totalHours: 90,
      completedHours: 90,
      status: 'completed',
      startDate: '2024-09-01',
      endDate: '2024-11-30',
      grade: 'الثالث الثانوي',
      category: 'العلوم',
      difficulty: 'advanced',
      rating: 4.9,
      reviewsCount: 22,
      modules: 8,
      assignments: 5,
      materials: 32,
      lastUpdated: '2024-01-10',
      tags: ['الميكانيكا', 'الكهرباء', 'الطاقة']
    },
    {
      id: '4',
      name: 'اللغة الإنجليزية',
      description: 'مقرر شامل في اللغة الإنجليزية يشمل القواعد والمحادثة والكتابة',
      teacher: 'أ. سارة أحمد',
      teacherAvatar: '/api/placeholder/40/40',
      studentsCount: 35,
      totalHours: 80,
      completedHours: 45,
      status: 'active',
      startDate: '2024-09-01',
      endDate: '2024-12-20',
      grade: 'الأول الثانوي',
      category: 'اللغات',
      difficulty: 'intermediate',
      rating: 4.5,
      reviewsCount: 16,
      modules: 9,
      assignments: 7,
      materials: 42,
      lastUpdated: '2024-01-14',
      tags: ['القواعد', 'المحادثة', 'الكتابة']
    },
    {
      id: '5',
      name: 'الكيمياء العضوية',
      description: 'مقرر متخصص في الكيمياء العضوية مع التركيز على التفاعلات الكيميائية',
      teacher: 'د. خالد حسن',
      teacherAvatar: '/api/placeholder/40/40',
      studentsCount: 20,
      totalHours: 110,
      completedHours: 0,
      status: 'draft',
      startDate: '2024-02-01',
      endDate: '2024-05-30',
      grade: 'الثالث الثانوي',
      category: 'العلوم',
      difficulty: 'advanced',
      rating: 0,
      reviewsCount: 0,
      modules: 0,
      assignments: 0,
      materials: 0,
      lastUpdated: '2024-01-08',
      tags: ['العضوية', 'التفاعلات', 'المركبات']
    },
    {
      id: '6',
      name: 'التاريخ الإسلامي',
      description: 'مقرر شامل في التاريخ الإسلامي من العهد النبوي حتى العصر الحديث',
      teacher: 'أ. عمر محمد',
      teacherAvatar: '/api/placeholder/40/40',
      studentsCount: 30,
      totalHours: 70,
      completedHours: 35,
      status: 'paused',
      startDate: '2024-09-01',
      endDate: '2024-12-20',
      grade: 'الثاني الثانوي',
      category: 'العلوم الاجتماعية',
      difficulty: 'intermediate',
      rating: 4.7,
      reviewsCount: 12,
      modules: 6,
      assignments: 4,
      materials: 28,
      lastUpdated: '2024-01-05',
      tags: ['العهد النبوي', 'الخلافة', 'التاريخ الحديث']
    }
  ]);

  const categories = ['all', 'الرياضيات', 'اللغة العربية', 'العلوم', 'اللغات', 'العلوم الاجتماعية'];
  const statuses = ['all', 'active', 'completed', 'draft', 'paused'];
  const grades = ['all', 'الأول الثانوي', 'الثاني الثانوي', 'الثالث الثانوي'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.grade.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || course.status === selectedStatus;
    const matchesGrade = selectedGrade === 'all' || course.grade === selectedGrade;
    const matchesTab = activeTab === 'all' || course.status === activeTab;

    return matchesSearch && matchesCategory && matchesStatus && matchesGrade && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'completed': return 'bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'draft': return 'bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      case 'paused': return 'bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-900/30 dark:to-slate-900/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'completed': return 'مكتمل';
      case 'draft': return 'مسودة';
      case 'paused': return 'متوقف مؤقتاً';
      default: return 'غير محدد';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 dark:text-green-400';
      case 'intermediate': return 'text-blue-600 dark:text-blue-400';
      case 'advanced': return 'text-purple-600 dark:text-purple-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'مبتدئ';
      case 'intermediate': return 'متوسط';
      case 'advanced': return 'متقدم';
      default: return 'غير محدد';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="animate-slide-in-right">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">إدارة المواد الدراسية</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">إدارة وتنظيم المواد الدراسية والمقررات التعليمية</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-transparent border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300 hover:scale-105">
            <Download className="w-4 h-4 ml-2" />
            تصدير البيانات
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-300 hover:scale-105">
            <Plus className="w-4 h-4 ml-2" />
            إضافة مادة جديدة
          </Button>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'إجمالي المواد', value: courses.length, icon: BookOpen, color: 'blue', delay: 'stagger-1' },
          { title: 'المواد النشطة', value: courses.filter(c => c.status === 'active').length, icon: TrendingUp, color: 'green', delay: 'stagger-2' },
          { title: 'المواد المكتملة', value: courses.filter(c => c.status === 'completed').length, icon: CheckCircle2, color: 'purple', delay: 'stagger-3' },
          { title: 'معدل الإنجاز', value: `${Math.round((courses.filter(c => c.status === 'completed').length / courses.length) * 100)}%`, icon: Target, color: 'orange', delay: 'stagger-4' }
        ].map((stat, index) => (
          <Card key={index} className={`card-hover animate-fade-in-up ${stat.delay}`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-gradient-to-r from-${stat.color}-100 to-${stat.color === 'blue' ? 'purple' : stat.color}-100 dark:from-${stat.color}-900/30 dark:to-${stat.color === 'blue' ? 'purple' : stat.color}-900/30 rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Filters */}
      <Card className="card-hover animate-scale-in">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="البحث عن مادة بالاسم أو المعلم أو الصف..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-12 h-12 text-lg"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-gray-700 dark:text-gray-300 focus:border-blue-500 focus:outline-none transition-all duration-300"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'جميع التصنيفات' : category}
                  </option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-gray-700 dark:text-gray-300 focus:border-blue-500 focus:outline-none transition-all duration-300"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'جميع الحالات' : getStatusText(status)}
                  </option>
                ))}
              </select>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-gray-700 dark:text-gray-300 focus:border-blue-500 focus:outline-none transition-all duration-300"
              >
                {grades.map(grade => (
                  <option key={grade} value={grade}>
                    {grade === 'all' ? 'جميع الصفوف' : grade}
                  </option>
                ))}
              </select>
              <Button variant="outline" className="h-12 px-4">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-1 rounded-lg">
          <TabsTrigger value="paused" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-500 data-[state=active]:to-slate-600 data-[state=active]:text-white transition-all duration-300">
            متوقفة
          </TabsTrigger>
          <TabsTrigger value="draft" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-600 data-[state=active]:text-white transition-all duration-300">
            مسودات
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300">
            مكتملة
          </TabsTrigger>
          <TabsTrigger value="active" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300">
            نشطة
          </TabsTrigger>
          <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300">
            جميع المواد
          </TabsTrigger>

        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {/* Courses Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <Card key={course.id} className={`card-hover animate-fade-in-up stagger-${index % 5 + 1} hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/10 dark:hover:to-purple-900/10 transition-all duration-300`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2 text-gray-900 dark:text-white">{course.name}</CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{course.description}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getStatusColor(course.status)}>
                          {getStatusText(course.status)}
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${getDifficultyColor(course.difficulty)} border-current`}>
                          {getDifficultyText(course.difficulty)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Teacher Info */}
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={course.teacherAvatar} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                        {course.teacher.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{course.teacher}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{course.category}</p>
                    </div>
                  </div>

                  {/* Course Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{course.studentsCount}</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">طالب</p>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Clock className="w-4 h-4 text-purple-500" />
                        <span className="text-lg font-bold text-purple-600 dark:text-purple-400">{course.totalHours}</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">ساعة</p>
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">التقدم</span>
                      <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        {Math.round((course.completedHours / course.totalHours) * 100)}%
                      </span>
                    </div>
                    <Progress value={(course.completedHours / course.totalHours) * 100} className="h-2 bg-blue-100 dark:bg-blue-900/30" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{course.completedHours} ساعة مكتملة</span>
                      <span>{course.totalHours - course.completedHours} ساعة متبقية</span>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <FileText className="w-4 h-4 text-blue-500" />
                        <span>{course.modules} وحدة</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <BookMarked className="w-4 h-4 text-purple-500" />
                        <span>{course.assignments} مهمة</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Video className="w-4 h-4 text-green-500" />
                        <span>{course.materials} مادة</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{course.rating.toFixed(1)} ({course.reviewsCount})</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {course.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                        {tag}
                      </Badge>
                    ))}
                    {course.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                        +{course.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Course Info */}
                  <div className="pt-3 border-t border-blue-100 dark:border-blue-800">
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <span>الصف: {course.grade}</span>
                      <span>آخر تحديث: {course.lastUpdated}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>من: {course.startDate}</span>
                      <span>إلى: {course.endDate}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-3 border-t border-blue-100 dark:border-blue-800">
                    <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-300 hover:scale-105" size="sm">
                      <Eye className="w-4 h-4 ml-2" />
                      عرض التفاصيل
                    </Button>
                    <Button variant="outline" size="sm" className="px-3 bg-transparent border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300 hover:scale-105">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="px-3 bg-transparent border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-600 hover:text-white hover:border-transparent transition-all duration-300 hover:scale-105">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">لا توجد مواد</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">لم يتم العثور على مواد تطابق معايير البحث المحددة</p>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
              <Plus className="w-4 h-4 ml-2" />
              إضافة مادة جديدة
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CoursesPage;