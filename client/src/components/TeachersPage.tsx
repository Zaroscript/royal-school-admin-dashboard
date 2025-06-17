import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Plus,
  Search,
  Mail,
  Phone,
  MapPin,
  Calendar as CalendarIcon,
  BookOpen,
  Users,
  Filter,
  Star,
  Award,
  TrendingUp,
  Clock,
  MoreVertical,
  CheckCircle2,
  Eye,
  Edit,
  MinusCircle,
  Trash2
} from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  experience: number;
  studentsCount: number;
  avatar?: string;
  status: 'active' | 'inactive';
  joinDate: string;
  rating: number;
  completionRate: number;
  specializations: string[];
  achievements: string[];
  upcomingClasses: number;
  lastActive: string;
  certifications: string[];
}

const TeachersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [teachers] = useState<Teacher[]>([
    {
      id: '1',
      name: 'د. أحمد محمود',
      email: 'ahmed.mahmoud@school.com',
      phone: '01234567890',
      subject: 'الرياضيات',
      experience: 8,
      studentsCount: 120,
      avatar: '/assets/img/profiles/avatar-02.jpg',
      status: 'active',
      joinDate: '2023-01-15',
      rating: 4.8,
      completionRate: 95,
      specializations: ['الجبر', 'الهندسة', 'التفاضل'],
      achievements: ['معلم العام 2024', 'أفضل نتائج امتحانات'],
      upcomingClasses: 3,
      lastActive: '5 دقائق مضت',
      certifications: ['شهادة التدريس المتقدم', 'دورة التعليم الإلكتروني']
    },
    {
      id: '2',
      name: 'أ. فاطمة السيد',
      email: 'fatima.elsayed@school.com',
      phone: '01234567891',
      subject: 'اللغة العربية',
      experience: 12,
      studentsCount: 95,
      avatar: '/api/placeholder/40/40',
      status: 'active',
      joinDate: '2018-09-01',
      rating: 4.5,
      completionRate: 90,
      specializations: ['النحو', 'الصرف', 'البلاغة'],
      achievements: ['أفضل معلم مبتكر 2023'],
      upcomingClasses: 2,
      lastActive: '10 دقائق مضت',
      certifications: ['شهادة التميز في التدريس']
    },
    {
      id: '3',
      name: 'د. محمد علي',
      email: 'mohamed.ali@school.com',
      phone: '01234567892',
      subject: 'الفيزياء',
      experience: 6,
      studentsCount: 85,
      avatar: '/api/placeholder/40/40',
      status: 'active',
      joinDate: '2022-02-15',
      rating: 4.7,
      completionRate: 92,
      specializations: ['الميكانيكا', 'الكهرباء', 'الطاقة'],
      achievements: ['جائزة أفضل معلم 2022'],
      upcomingClasses: 1,
      lastActive: '15 دقيقة مضت',
      certifications: ['دورة الفيزياء المتقدمة']
    }
  ]);

  const getStatusColor = (status: Teacher['status']) => {
    return status === 'active' ? 'bg-green-500' : 'bg-gray-400';
  };

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || teacher.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">المعلمون</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">إدارة وعرض معلومات المعلمين</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          إضافة معلم جديد
        </Button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي المعلمين</p>
              <h3 className="text-2xl font-bold">{teachers.length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-300" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">المعلمين النشطين</p>
              <h3 className="text-2xl font-bold">{teachers.filter(t => t.status === 'active').length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
              <BookOpen className="w-6 h-6 text-yellow-600 dark:text-yellow-300" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">المواد الدراسية</p>
              <h3 className="text-2xl font-bold">{new Set(teachers.map(t => t.subject)).size}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
              <Star className="w-6 h-6 text-purple-600 dark:text-purple-300" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">متوسط التقييم</p>
              <h3 className="text-2xl font-bold">{(teachers.reduce((acc, t) => acc + t.rating, 0) / teachers.length).toFixed(1)}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Section */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[300px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              className="pl-10"
              placeholder="البحث عن معلم..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={selectedStatus === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedStatus('all')}
          >
            الكل
          </Button>
          <Button 
            variant={selectedStatus === 'active' ? 'default' : 'outline'}
            onClick={() => setSelectedStatus('active')}
          >
            نشط
          </Button>
          <Button 
            variant={selectedStatus === 'inactive' ? 'default' : 'outline'}
            onClick={() => setSelectedStatus('inactive')}
          >
            غير نشط
          </Button>
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <Card key={teacher.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <CardHeader className="relative pb-0">
              <div className="absolute top-4 right-4 z-10">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="hover:bg-black/5">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to={`/teachers/${teacher.id}`} className="flex items-center">
                        <Eye className="w-4 h-4 mr-2" />
                        عرض الملف الشخصي
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      تعديل البيانات
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      جدول الحصص
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <MinusCircle className="w-4 h-4 mr-2" />
                      إلغاء التفعيل
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={teacher.avatar} alt={teacher.name} />
                    <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span 
                    className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(teacher.status)}`}
                  />
                </div>
                <CardTitle className="mt-4 text-xl">{teacher.name}</CardTitle>
                <CardDescription className="text-center">
                  {teacher.subject}
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{teacher.rating}</span>
                  </div>
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Progress Section */}
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">نسبة إكمال المنهج</span>
                    <span className="font-medium">{teacher.completionRate}%</span>
                  </div>
                  <Progress value={teacher.completionRate} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">نسبة إكمال الدروس</span>
                    <span className="font-medium">{teacher.completionRate}%</span>
                  </div>
                  <Progress value={teacher.completionRate} className="h-2" />
                </div>

                <div className="flex flex-wrap gap-2">
                  {teacher.specializations.map((spec, index) => (
                    <Badge key={index} variant="secondary">
                      {spec}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Mail className="w-4 h-4" />
                    {teacher.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Phone className="w-4 h-4" />
                    {teacher.phone}
                  </div>
                </div>

                {teacher.achievements.length > 0 && (
                  <div className="border-t pt-4 mt-4">
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4 text-yellow-500" />
                      الإنجازات
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {teacher.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Star className="w-3 h-3" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center text-sm text-gray-500">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {teacher.joinDate}
                </div>
              </div>
            </CardContent>
            <div className="mt-auto">
              {/* Quick Stats Bar */}
              <div className="grid grid-cols-3 border-t border-b dark:border-gray-700">
                <div className="p-3 text-center border-r dark:border-gray-700">
                  <div className="text-2xl font-semibold text-blue-500">{teacher.studentsCount}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">الطلاب</div>
                </div>
                <div className="p-3 text-center border-r dark:border-gray-700">
                  <div className="text-2xl font-semibold text-green-500">{teacher.experience}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">سنوات الخبرة</div>
                </div>
                <div className="p-3 text-center">
                  <div className="text-2xl font-semibold text-yellow-500">{teacher.rating}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">التقييم</div>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${teacher.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {teacher.status === 'active' ? 'متاح الآن' : 'غير متاح'}
                    </span>
                  </div>
                  <Badge variant="outline" className="font-normal">
                    <Clock className="w-3 h-3 mr-1" />
                    آخر نشاط: {teacher.lastActive}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white" size="sm">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    عرض الجدول
                  </Button>
                  <Button variant="outline" size="sm" className="px-3">
                    <Mail className="w-4 h-4 text-gray-600" />
                  </Button>
                  <Button variant="outline" size="sm" className="px-3">
                    <Phone className="w-4 h-4 text-gray-600" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeachersPage;
