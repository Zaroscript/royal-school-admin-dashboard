import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Users,
  Star,
  Award,
  Clock,
  FileText,
  GraduationCap,
  Presentation,
  Book,
  Target,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  ChevronUp,
  ChevronDown,
  BarChart,
  Download
} from 'lucide-react';

interface TeacherProfile {
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
  address: string;
  bio: string;
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  performance: {
    monthlyRating: number[];
    studentProgress: number;
    attendanceRate: number;
    classesCompleted: number;
    averageScore: number;
  };
  schedule: {
    day: string;
    classes: {
      time: string;
      subject: string;
      class: string;
      students: number;
    }[];
  }[];
}

const mockTeacherProfile: TeacherProfile = {
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
  specializations: ['الجبر', 'الهندسة', 'التفاضل والتكامل', 'الإحصاء'],
  achievements: ['معلم العام 2024', 'أفضل نتائج امتحانات', 'جائزة التميز التعليمي'],
  upcomingClasses: 3,
  lastActive: '5 دقائق مضت',
  certifications: ['شهادة التدريس المتقدم', 'دورة التعليم الإلكتروني', 'شهادة المعلم المحترف'],
  address: 'القاهرة، مصر',
  bio: 'معلم رياضيات ذو خبرة 8 سنوات في التدريس. متخصص في تبسيط المفاهيم الرياضية المعقدة وتطوير مهارات الطلاب في حل المشكلات.',
  education: [
    {
      degree: 'دكتوراه في تعليم الرياضيات',
      institution: 'جامعة القاهرة',
      year: '2020'
    },
    {
      degree: 'ماجستير في الرياضيات',
      institution: 'جامعة عين شمس',
      year: '2016'
    }
  ],
  performance: {
    monthlyRating: [4.7, 4.8, 4.9, 4.8, 4.7, 4.8],
    studentProgress: 85,
    attendanceRate: 98,
    classesCompleted: 450,
    averageScore: 92
  },
  schedule: [
    {
      day: 'الأحد',
      classes: [
        {
          time: '09:00 - 10:30',
          subject: 'الجبر',
          class: 'الصف الثالث',
          students: 25
        },
        {
          time: '11:00 - 12:30',
          subject: 'الهندسة',
          class: 'الصف الثاني',
          students: 28
        }
      ]
    },
    {
      day: 'الثلاثاء',
      classes: [
        {
          time: '08:30 - 10:00',
          subject: 'التفاضل',
          class: 'الصف الثالث',
          students: 22
        }
      ]
    }
  ]
};

const TeacherProfilePage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const teacher = mockTeacherProfile; // In a real app, fetch based on ID

  const getStatusColor = (status: TeacherProfile['status']) => {
    return status === 'active' ? 'bg-green-500' : 'bg-gray-400';
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50">
      {/* Hero Section */}
      <div className="relative h-[250px] lg:h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600">
          <div className="absolute inset-0 bg-[url('/assets/img/grid-pattern.svg')] opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 -mt-32 relative z-10 pb-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Profile Card */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-800 shadow-xl">
                      <AvatarImage src={teacher.avatar} alt={teacher.name} />
                      <AvatarFallback className="text-3xl">{teacher.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span 
                      className={`absolute bottom-3 right-3 w-5 h-5 rounded-full border-4 border-white 
                      ${getStatusColor(teacher.status)} ${teacher.status === 'active' ? 'animate-pulse' : ''}`}
                    />
                  </div>
                  <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100">{teacher.name}</h2>
                  <p className="text-gray-500 dark:text-gray-400">مدرس {teacher.subject}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(teacher.rating) ? 
                          'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium">{teacher.rating}/5.0</span>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
                      <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400">البريد الإلكتروني</p>
                      <p className="font-medium">{teacher.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 dark:bg-green-900/50 rounded-lg">
                      <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1 text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400">رقم الهاتف</p>
                      <p className="font-medium">{teacher.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 dark:bg-purple-900/50 rounded-lg">
                      <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1 text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400">العنوان</p>
                      <p className="font-medium">{teacher.address}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <Button className="w-full" size="lg">
                    <Calendar className="w-4 h-4 mr-2" />
                    جدول الحصص
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <Download className="w-4 h-4 mr-2" />
                    تحميل السيرة الذاتية
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Skills & Certifications Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>المهارات والشهادات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">التخصصات</h4>
                    <div className="flex flex-wrap gap-2">
                      {teacher.specializations.map((spec, index) => (
                        <Badge key={index} variant="secondary" className="px-3 py-1">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">الشهادات</h4>
                    <div className="space-y-2">
                      {teacher.certifications.map((cert, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                          <span className="text-sm">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">الطلاب</p>
                      <h3 className="text-2xl font-bold mt-1">{teacher.studentsCount}</h3>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/50 rounded-xl">
                      <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <Progress value={75} className="h-1 mt-4" />
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">الخبرة</p>
                      <h3 className="text-2xl font-bold mt-1">{teacher.experience} سنوات</h3>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/50 rounded-xl">
                      <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <Progress value={90} className="h-1 mt-4" />
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">الإنجاز</p>
                      <h3 className="text-2xl font-bold mt-1">{teacher.completionRate}%</h3>
                    </div>
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/50 rounded-xl">
                      <Target className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                  </div>
                  <Progress value={teacher.completionRate} className="h-1 mt-4" />
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">الدروس</p>
                      <h3 className="text-2xl font-bold mt-1">{teacher.upcomingClasses}</h3>
                    </div>
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/50 rounded-xl">
                      <Book className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <Progress value={60} className="h-1 mt-4" />
                </CardContent>
              </Card>
            </div>

            {/* Main Tabs */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <Tabs defaultValue="overview" className="space-y-6">
                  <TabsList className="grid grid-cols-4 gap-4 bg-gray-100 dark:bg-gray-800 p-1">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">نظرة عامة</TabsTrigger>
                    <TabsTrigger value="schedule" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">الجدول</TabsTrigger>
                    <TabsTrigger value="performance" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">الأداء</TabsTrigger>
                    <TabsTrigger value="documents" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">المستندات</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">نبذة شخصية</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {teacher.bio}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Education History */}
                        <Card>
                          <CardHeader>
                            <div className="flex items-center gap-2">
                              <GraduationCap className="w-5 h-5 text-blue-600" />
                              <CardTitle className="text-lg">المؤهلات العلمية</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <ScrollArea className="h-[200px] pr-4">
                              <div className="space-y-4">
                                {teacher.education.map((edu, index) => (
                                  <div key={index} className="relative pr-4 pb-4 border-r-2 border-blue-200 dark:border-blue-800 last:pb-0">
                                    <div className="absolute right-[-9px] top-0 w-4 h-4 rounded-full bg-blue-500" />
                                    <h4 className="font-medium text-blue-600 dark:text-blue-400">{edu.degree}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{edu.institution}</p>
                                    <p className="text-sm text-gray-500">{edu.year}</p>
                                  </div>
                                ))}
                              </div>
                            </ScrollArea>
                          </CardContent>
                        </Card>

                        {/* Achievements */}
                        <Card>
                          <CardHeader>
                            <div className="flex items-center gap-2">
                              <Award className="w-5 h-5 text-yellow-600" />
                              <CardTitle className="text-lg">الإنجازات</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <ScrollArea className="h-[200px] pr-4">
                              <div className="space-y-4">
                                {teacher.achievements.map((achievement, index) => (
                                  <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                    <Star className="w-5 h-5 text-yellow-600 mt-0.5" />
                                    <div>
                                      <p className="text-sm font-medium">{achievement}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </ScrollArea>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Performance Overview */}
                      <Card>
                        <CardHeader>
                          <div className="flex items-center gap-2">
                            <BarChart className="w-5 h-5 text-purple-600" />
                            <CardTitle className="text-lg">ملخص الأداء</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <p className="text-sm text-gray-500 mb-2">تقدم الطلاب</p>
                              <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                  <div>
                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                                      جيد جداً
                                    </span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-xs font-semibold inline-block text-green-600">
                                      {teacher.performance.studentProgress}%
                                    </span>
                                  </div>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                                  <div style={{ width: `${teacher.performance.studentProgress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm text-gray-500 mb-2">نسبة الحضور</p>
                              <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                  <div>
                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                      ممتاز
                                    </span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-xs font-semibold inline-block text-blue-600">
                                      {teacher.performance.attendanceRate}%
                                    </span>
                                  </div>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                                  <div style={{ width: `${teacher.performance.attendanceRate}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm text-gray-500 mb-2">متوسط الدرجات</p>
                              <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                  <div>
                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                                      متميز
                                    </span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-xs font-semibold inline-block text-purple-600">
                                      {teacher.performance.averageScore}%
                                    </span>
                                  </div>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
                                  <div style={{ width: `${teacher.performance.averageScore}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="schedule">
                    <div className="space-y-6">
                      {/* Weekly Schedule */}
                      {teacher.schedule.map((day, index) => (
                        <Card key={index} className="overflow-hidden">
                          <CardHeader className="bg-gray-50 dark:bg-gray-800/50">
                            <CardTitle className="text-lg">{day.day}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              {day.classes.map((cls, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                                >
                                  <div className="p-3 bg-blue-50 dark:bg-blue-900/50 rounded-xl">
                                    <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-medium">{cls.subject}</h4>
                                    <p className="text-sm text-gray-500">{cls.class}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium">{cls.time}</p>
                                    <p className="text-sm text-gray-500">{cls.students} طالب</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="performance">
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>تحليل الأداء الشهري</CardTitle>
                          <CardDescription>
                            متابعة تطور أداء المعلم خلال الأشهر الماضية
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] flex items-center justify-center text-gray-500">
                            سيتم إضافة الرسوم البيانية للأداء قريباً
                          </div>
                        </CardContent>
                      </Card>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">نسبة النجاح</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-center">
                              <div className="relative w-24 h-24">
                                <svg className="w-24 h-24 transform -rotate-90">
                                  <circle
                                    className="text-gray-200"
                                    strokeWidth="8"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="44"
                                    cx="48"
                                    cy="48"
                                  />
                                  <circle
                                    className="text-green-500"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="44"
                                    cx="48"
                                    cy="48"
                                    style={{
                                      strokeDasharray: `${2 * Math.PI * 44}`,
                                      strokeDashoffset: `${2 * Math.PI * 44 * (1 - teacher.performance.studentProgress / 100)}`
                                    }}
                                  />
                                </svg>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                  <span className="text-2xl font-bold">{teacher.performance.studentProgress}%</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">الحصص المكتملة</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-center">
                              <span className="text-3xl font-bold text-blue-600">{teacher.performance.classesCompleted}</span>
                              <p className="text-sm text-gray-500 mt-2">من إجمالي {teacher.performance.classesCompleted + 50} حصة</p>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">متوسط التقييم</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-center">
                              <div className="flex items-center justify-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-6 h-6 ${i < Math.floor(teacher.rating)
                                      ? 'text-yellow-400 fill-yellow-400'
                                      : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="text-sm text-gray-500 mt-2">{teacher.rating} من 5.0</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="documents">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>المستندات والموارد</CardTitle>
                          <Button>
                            <FileText className="w-4 h-4 mr-2" />
                            رفع مستند
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-12">
                          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                            لا توجد مستندات حالياً
                          </h3>
                          <p className="text-gray-500">
                            قم برفع المستندات والموارد التعليمية هنا
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfilePage;
