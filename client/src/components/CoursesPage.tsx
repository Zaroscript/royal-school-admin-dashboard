
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Plus,
  Search,
  BookOpen,
  Users,
  Clock,
  Calendar,
  TrendingUp,
  BarChart3
} from 'lucide-react';

interface Course {
  id: string;
  name: string;
  description: string;
  teacher: string;
  studentsCount: number;
  totalHours: number;
  completedHours: number;
  status: 'active' | 'completed' | 'draft';
  startDate: string;
  endDate: string;
  grade: string;
}

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [courses] = useState<Course[]>([
    {
      id: '1',
      name: 'الرياضيات المتقدمة',
      description: 'مقرر الرياضيات للصف الثالث الثانوي',
      teacher: 'د. أحمد محمود',
      studentsCount: 32,
      totalHours: 120,
      completedHours: 85,
      status: 'active',
      startDate: '2024-09-01',
      endDate: '2024-12-20',
      grade: 'الثالث الثانوي'
    },
    {
      id: '2',
      name: 'اللغة العربية',
      description: 'مقرر اللغة العربية للصف الثاني الثانوي',
      teacher: 'أ. فاطمة السيد',
      studentsCount: 28,
      totalHours: 100,
      completedHours: 60,
      status: 'active',
      startDate: '2024-09-01',
      endDate: '2024-12-20',
      grade: 'الثاني الثانوي'
    },
    {
      id: '3',
      name: 'الفيزياء التطبيقية',
      description: 'مقرر الفيزياء للصف الثالث الثانوي',
      teacher: 'د. محمد علي',
      studentsCount: 25,
      totalHours: 90,
      completedHours: 90,
      status: 'completed',
      startDate: '2024-09-01',
      endDate: '2024-11-30',
      grade: 'الثالث الثانوي'
    }
  ]);

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'completed': return 'مكتمل';
      case 'draft': return 'مسودة';
      default: return 'غير محدد';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          إدارة المواد الدراسية
        </h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="البحث عن مادة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 w-full sm:w-64"
            />
          </div>
          <Button className="bg-gradient-to-r from-school-blue-500 to-school-red-500 hover:from-school-blue-600 hover:to-school-red-600">
            <Plus className="w-4 h-4 ml-2" />
            إضافة مادة
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="animate-slide-in-right">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي المواد</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">المواد النشطة</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">18</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">المواد المكتملة</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">6</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">معدل الإنجاز</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">75%</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <Card key={course.id} className="hover:shadow-lg transition-all duration-300 hover-scale">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{course.name}</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{course.description}</p>
                </div>
                <Badge className={getStatusColor(course.status)}>
                  {getStatusText(course.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>{course.studentsCount} طالب</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{course.totalHours} ساعة</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">التقدم</span>
                  <span className="text-sm text-gray-500">
                    {Math.round((course.completedHours / course.totalHours) * 100)}%
                  </span>
                </div>
                <Progress value={(course.completedHours / course.totalHours) * 100} className="h-2" />
              </div>

              <div className="pt-2 border-t">
                <p className="text-sm text-gray-600 dark:text-gray-400">المعلم: {course.teacher}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">الصف: {course.grade}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
