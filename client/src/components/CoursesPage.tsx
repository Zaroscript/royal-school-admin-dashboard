import React, { useState, useEffect } from 'react';
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
import { toast } from '@/hooks/use-toast';
import { useCourseStore } from '../store/useCourseStore';
import Loader from '@/components/ui/loader';
import { formatDate } from '@/lib/utils';

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
  const { courses, fetchCourses, loading, error } = useCourseStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTeacher, setSelectedTeacher] = useState('all');

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  if (loading) return <Loader variant="royal" text="جاري تحميل المواد الدراسية..." />;
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-blue-50 to-green-50 dark:from-red-950/20 dark:via-blue-950/20 dark:to-green-950/20">
      <div className="max-w-md w-full p-8 bg-white/90 dark:bg-slate-900/90 rounded-xl shadow-2xl border border-royal-blue/20 text-center space-y-6 animate-fade-in-up">
        <div className="flex justify-center mb-4">
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-royal-orange animate-pulse-slow"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <h2 className="text-2xl font-bold text-royal-dark dark:text-royal-white">حدث خطأ أثناء تحميل المواد الدراسية</h2>
        <p className="text-base text-muted-foreground">{error}</p>
        <button
          className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold shadow hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
          onClick={() => fetchCourses()}
        >
          إعادة المحاولة
        </button>
      </div>
    </div>
  );

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
    const matchesTeacher = selectedTeacher === 'all' || 
                          (typeof course.teacher === 'object' && course.teacher._id === selectedTeacher);

    return matchesSearch && matchesCategory && matchesStatus && matchesGrade && matchesTab && matchesTeacher;
  });

  // Get unique teachers for filter
  const teacherOptions = Array.from(new Set(courses.map(course => typeof course.teacher === 'object' ? course.teacher.name : course.teacher).filter(Boolean)));

  // Defensive: fallback for empty or undefined fields
  const safe = (val, fallback = '') => (val !== undefined && val !== null ? val : fallback);

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
              <select
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-gray-700 dark:text-gray-300 focus:border-blue-500 focus:outline-none transition-all duration-300"
              >
                <option value="all">جميع المعلمين</option>
                {teacherOptions.map((teacher) => (
                  <option key={teacher} value={teacher}>{teacher}</option>
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
          {filteredCourses.length === 0 ? (
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
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <Card key={course.id} className={`card-hover animate-fade-in-up stagger-${index % 5 + 1} hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/10 dark:hover:to-purple-900/10 transition-all duration-300`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2 text-gray-900 dark:text-white">{safe(course.name, 'بدون اسم')}</CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{safe(course.description, 'لا يوجد وصف')}</p>
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
                          {safe(typeof course.teacher === 'object' ? course.teacher.name : course.teacher, 'م')?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{safe(typeof course.teacher === 'object' ? course.teacher.name : course.teacher, 'بدون معلم')}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{safe(course.category, 'بدون تصنيف')}</p>
                      </div>
                    </div>

                    {/* Course Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Users className="w-4 h-4 text-blue-500" />
                          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{safe(course.studentsCount, 0)}</span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">طالب</p>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Clock className="w-4 h-4 text-purple-500" />
                          <span className="text-lg font-bold text-purple-600 dark:text-purple-400">{safe(course.totalHours, 0)}</span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">ساعة</p>
                      </div>
                    </div>

                    {/* Progress Section */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">التقدم</span>
                        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                          {safe(Math.round((course.completedHours / (course.totalHours || 1)) * 100), 0)}%
                        </span>
                      </div>
                      <Progress value={safe((course.completedHours / (course.totalHours || 1)) * 100, 0)} className="h-2 bg-blue-100 dark:bg-blue-900/30" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{safe(course.completedHours, 0)} ساعة مكتملة</span>
                        <span>{safe(course.totalHours - course.completedHours, 0)} ساعة متبقية</span>
                      </div>
                    </div>

                    {/* Course Details */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <FileText className="w-4 h-4 text-blue-500" />
                          <span>{safe(course.modules, 0)} وحدة</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <BookMarked className="w-4 h-4 text-purple-500" />
                          <span>{safe(course.assignments, 0)} مهمة</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Video className="w-4 h-4 text-green-500" />
                          <span>{safe(course.materials, 0)} مادة</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{safe(course.rating, 0).toFixed(1)} ({safe(course.reviewsCount, 0)})</span>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {Array.isArray(course.tags) && course.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                          {tag}
                        </Badge>
                      ))}
                      {Array.isArray(course.tags) && course.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                          +{course.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Course Dates */}
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400 items-center">
                      <span className="flex items-center gap-1"><CalendarIcon className="w-3 h-3 text-blue-400" />بداية: {formatDate(course.startDate, 'd MMMM yyyy')}</span>
                      <span className="flex items-center gap-1"><CalendarIcon className="w-3 h-3 text-purple-400" />نهاية: {formatDate(course.endDate, 'd MMMM yyyy')}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-yellow-400" />آخر تحديث: {formatDate(course.lastUpdated, 'EEEE، d MMMM yyyy')}</span>
                    </div>

                    {/* Course Info */}
                    <div className="pt-3 border-t border-blue-100 dark:border-blue-800">
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <span>الصف: {safe(course.grade, 'غير محدد')}</span>
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
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CoursesPage;