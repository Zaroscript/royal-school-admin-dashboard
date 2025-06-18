import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Calendar as CalendarIcon,
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
  Download,
  Edit,
  ArrowLeft,
  Share2,
  Activity,
  Zap,
  Shield,
  Trophy,
  Bookmark,
  MessageSquare,
  Settings,
  Eye,
  Plus,
  MoreVertical,
  Heart,
  ThumbsUp,
  TrendingDown,
  Minus,
  Percent,
  Hash,
  Calculator,
  ClipboardList,
  FileCheck,
  FileX,
  FilePlus,
  FileMinus,
  FileEdit,
  FileSearch,
  FileBarChart,
  FileSpreadsheet,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileCode,
  FileJson,
  FileTextIcon,
  FileType,
  FileDigit,
  FileSymlink,
  FileHeart,
  FileWarning,
  FileQuestion,
  FileLock,
  FileKey,
  UserPlus,
  Cpu,
  HardDrive,
  Globe,
  Wifi,
  Battery,
  Volume2,
  VolumeX,
  Moon,
  Sunrise,
  Sunset,
  Clock4,
  CalendarDays,
  PieChart,
  LineChart,
  AreaChart,
  ScatterChart
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
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const teacher = mockTeacherProfile; // In a real app, fetch based on ID

  const getStatusColor = (status: TeacherProfile['status']) => {
    return status === 'active' ? 'bg-emerald-500' : 'bg-slate-400';
  };

  const quickStats = [
    {
      title: 'إجمالي الطلاب',
      value: teacher.studentsCount.toString(),
      change: '+12%',
      changeType: 'increase',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-500/10',
      gradient: 'from-blue-500/20 to-blue-500/5'
    },
    {
      title: 'سنوات الخبرة',
      value: `${teacher.experience} سنوات`,
      change: '+2',
      changeType: 'increase',
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-500/10',
      gradient: 'from-purple-500/20 to-purple-500/5'
    },
    {
      title: 'معدل الإنجاز',
      value: `${teacher.completionRate}%`,
      change: '+5%',
      changeType: 'increase',
      icon: Target,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-500/10',
      gradient: 'from-indigo-500/20 to-indigo-500/5'
    },
    {
      title: 'الحصص القادمة',
      value: teacher.upcomingClasses.toString(),
      change: 'اليوم',
      changeType: 'neutral',
      icon: Clock,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-500/10',
      gradient: 'from-cyan-500/20 to-cyan-500/5'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Enhanced Hero Section */}
      <div className="relative h-[280px] lg:h-[320px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
        </div>
        
        {/* Back Button */}
        <div className="absolute top-6 right-6 z-20">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/teachers')}
            className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
          >
            <ArrowLeft className="h-4 w-4 ml-2" />
            العودة للمعلمين
          </Button>
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 animate-slide-in-bottom">
              ملف المعلم الشخصي
            </h1>
            <p className="text-xl text-white/90 animate-slide-in-bottom stagger-1">
              نظرة شاملة على أداء وإنجازات المعلم
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 -mt-24 relative z-10 pb-8">
        {/* Enhanced Quick Stats - Full Width */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={index} 
                className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{stat.title}</p>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
                      <div className="flex items-center gap-1 mt-2">
                        {stat.changeType === 'increase' ? (
                          <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                            <TrendingUp className="h-3 w-3" />
                            <span className="text-xs font-medium">{stat.change}</span>
                          </div>
                        ) : stat.changeType === 'decrease' ? (
                          <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                            <TrendingDown className="h-3 w-3" />
                            <span className="text-xs font-medium">{stat.change}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-500 dark:text-slate-400">{stat.change}</span>
                        )}
                      </div>
                    </div>
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${stat.gradient}`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar - Profile and Skills Cards */}
          <div className="col-span-12 lg:col-span-5 space-y-6">
            {/* Enhanced Profile Card */}
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="relative">
                      <Avatar className="w-36 h-36 border-4 border-white dark:border-slate-700 shadow-2xl">
                        <AvatarImage src={teacher.avatar} alt={teacher.name} />
                        <AvatarFallback className="text-4xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                          {teacher.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span 
                        className={`absolute bottom-4 right-4 w-6 h-6 rounded-full border-4 border-white dark:border-slate-700 
                        ${getStatusColor(teacher.status)} ${teacher.status === 'active' ? 'animate-pulse' : ''}`}
                      />
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{teacher.name}</h2>
                  <p className="text-slate-600 dark:text-slate-400 text-lg mb-4">مدرس {teacher.subject}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < Math.floor(teacher.rating) ? 
                          'text-amber-400 fill-amber-400' : 'text-slate-300'}`} 
                      />
                    ))}
                    <span className="mr-3 text-lg font-semibold text-slate-700 dark:text-slate-300">{teacher.rating}/5.0</span>
                  </div>

                  {/* Status Badge */}
                  <Badge 
                    variant={teacher.status === 'active' ? 'default' : 'secondary'}
                    className={`mb-6 ${teacher.status === 'active' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`}
                  >
                    {teacher.status === 'active' ? 'نشط' : 'غير نشط'}
                  </Badge>
                </div>

                <Separator className="my-8" />

                {/* Contact Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                    <div className="p-3 bg-blue-500/10 rounded-lg flex-shrink-0">
                      <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-500 dark:text-slate-400 text-right">البريد الإلكتروني</p>
                      <p className="font-medium text-slate-900 dark:text-white text-right break-all">{teacher.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors">
                    <div className="p-3 bg-emerald-500/10 rounded-lg flex-shrink-0">
                      <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-500 dark:text-slate-400 text-right">رقم الهاتف</p>
                      <p className="font-medium text-slate-900 dark:text-white text-right">{teacher.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                    <div className="p-3 bg-purple-500/10 rounded-lg flex-shrink-0">
                      <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-500 dark:text-slate-400 text-right">العنوان</p>
                      <p className="font-medium text-slate-900 dark:text-white text-right">{teacher.address}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 space-y-3">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <CalendarIcon className="w-4 h-4 ml-2" />
                    جدول الحصص
                  </Button>
                  <Button variant="outline" className="w-full hover:bg-slate-50 dark:hover:bg-slate-700">
                    <Download className="w-4 h-4 ml-2" />
                    تحميل السيرة الذاتية
                  </Button>
                </div>

                <div className="flex items-center justify-center text-sm text-slate-500 dark:text-slate-400 mt-6">
                  <CalendarIcon className="w-4 h-4 ml-2" />
                  تاريخ الانضمام: {teacher.joinDate}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Skills & Certifications Card */}
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-500/10 rounded-lg">
                    <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  المهارات والشهادات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3 text-right">التخصصات</h4>
                  <div className="flex flex-wrap gap-2 justify-end">
                    {teacher.specializations.map((spec, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3 text-right">الشهادات</h4>
                  <div className="space-y-3">
                    {teacher.certifications.map((cert, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-700 dark:text-slate-300 text-right">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-7 space-y-6">
            {/* Enhanced Main Tabs */}
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl">
              <CardContent className="p-6">
                <Tabs defaultValue="overview" className="space-y-6">
                  <TabsList className="grid grid-cols-4 gap-4 bg-slate-100 dark:bg-slate-700 p-1 rounded-xl">
                    
                    
                    
                    <TabsTrigger 
                      value="documents" 
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 rounded-lg"
                    >
                      المستندات
                    </TabsTrigger>
                    <TabsTrigger 
                      value="performance" 
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 rounded-lg"
                    >
                      الأداء
                    </TabsTrigger>
                    <TabsTrigger 
                      value="schedule" 
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 rounded-lg"
                    >
                      الجدول
                    </TabsTrigger>
                    <TabsTrigger 
                      value="overview" 
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 rounded-lg"
                    >
                      نظرة عامة
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white text-right">نبذة شخصية</h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg text-right">
                          {teacher.bio}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Enhanced Education History */}
                        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                          <CardHeader>
                            <div className="flex items-center justify-end gap-2">
                              <CardTitle className="text-lg text-slate-900 dark:text-white">المؤهلات العلمية</CardTitle>
                              <div className="p-2 bg-blue-500/10 rounded-lg">
                                <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <ScrollArea className="h-[200px] pr-4">
                              <div className="space-y-4">
                                {teacher.education.map((edu, index) => (
                                  <div key={index} className="relative pr-4 pb-4 border-r-2 border-blue-200 dark:border-blue-700 last:pb-0">
                                    <div className="absolute right-[-9px] top-0 w-4 h-4 rounded-full bg-blue-500" />
                                    <h4 className="font-medium text-blue-600 dark:text-blue-400 text-right">{edu.degree}</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 text-right">{edu.institution}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-500 text-right">{edu.year}</p>
                                  </div>
                                ))}
                              </div>
                            </ScrollArea>
                          </CardContent>
                        </Card>

                        {/* Enhanced Achievements */}
                        <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20">
                          <CardHeader>
                            <div className="flex items-center justify-end gap-2">
                              <CardTitle className="text-lg text-slate-900 dark:text-white">الإنجازات</CardTitle>
                              <div className="p-2 bg-amber-500/10 rounded-lg">
                                <Trophy className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <ScrollArea className="h-[200px] pr-4">
                              <div className="space-y-4">
                                {teacher.achievements.map((achievement, index) => (
                                  <div key={index} className="flex items-start gap-3 p-4 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                                    <Star className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 text-right">{achievement}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </ScrollArea>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Enhanced Performance Overview */}
                      <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                        <CardHeader>
                          <div className="flex items-center justify-end gap-2">
                            <CardTitle className="text-lg text-slate-900 dark:text-white">ملخص الأداء</CardTitle>
                            <div className="p-2 bg-purple-500/10 rounded-lg">
                              <BarChart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 text-right">تقدم الطلاب</p>
                              <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                  <div>
                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30">
                                      جيد جداً
                                    </span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-xs font-semibold inline-block text-emerald-600 dark:text-emerald-400">
                                      {teacher.performance.studentProgress}%
                                    </span>
                                  </div>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-emerald-100 dark:bg-emerald-900/30">
                                  <div style={{ width: `${teacher.performance.studentProgress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 text-right">نسبة الحضور</p>
                              <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                  <div>
                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-100 dark:bg-blue-900/30">
                                      ممتاز
                                    </span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-xs font-semibold inline-block text-blue-600 dark:text-blue-400">
                                      {teacher.performance.attendanceRate}%
                                    </span>
                                  </div>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100 dark:bg-blue-900/30">
                                  <div style={{ width: `${teacher.performance.attendanceRate}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-blue-600"></div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 text-right">متوسط الدرجات</p>
                              <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                  <div>
                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-100 dark:bg-purple-900/30">
                                      متميز
                                    </span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-xs font-semibold inline-block text-purple-600 dark:text-purple-400">
                                      {teacher.performance.averageScore}%
                                    </span>
                                  </div>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-100 dark:bg-purple-900/30">
                                  <div style={{ width: `${teacher.performance.averageScore}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-purple-500 to-purple-600"></div>
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
                      {/* Enhanced Weekly Schedule */}
                      {teacher.schedule.map((day, index) => (
                        <Card key={index} className="border-0 shadow-lg overflow-hidden bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700">
                          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                            <CardTitle className="text-lg text-right">{day.day}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-6">
                            <div className="space-y-4">
                              {day.classes.map((cls, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-600 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                >
                                  <div className="p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl">
                                    <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-medium text-slate-900 dark:text-white text-right">{cls.subject}</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 text-right">{cls.class}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium text-slate-900 dark:text-white">{cls.time}</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">{cls.students} طالب</p>
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
                      <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20">
                        <CardHeader>
                          <div className="flex items-center justify-end gap-2">
                            <CardTitle className="text-slate-900 dark:text-white">تحليل الأداء الشهري</CardTitle>
                            <div className="p-2 bg-indigo-500/10 rounded-lg">
                              <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                          </div>
                          <CardDescription className="text-slate-600 dark:text-slate-400 text-right">
                            متابعة تطور أداء المعلم خلال الأشهر الماضية
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] flex items-center justify-center text-slate-500 dark:text-slate-400">
                            <div className="text-center">
                              <BarChart className="w-16 h-16 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
                              <p className="text-right">سيتم إضافة الرسوم البيانية للأداء قريباً</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
                          <CardHeader>
                            <CardTitle className="text-lg text-slate-900 dark:text-white text-right">نسبة النجاح</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-center">
                              <div className="relative w-24 h-24">
                                <svg className="w-24 h-24 transform -rotate-90">
                                  <circle
                                    className="text-slate-200 dark:text-slate-700"
                                    strokeWidth="8"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="44"
                                    cx="48"
                                    cy="48"
                                  />
                                  <circle
                                    className="text-emerald-500"
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
                                  <span className="text-2xl font-bold text-slate-900 dark:text-white">{teacher.performance.studentProgress}%</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                          <CardHeader>
                            <CardTitle className="text-lg text-slate-900 dark:text-white text-right">الحصص المكتملة</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-center">
                              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{teacher.performance.classesCompleted}</span>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 text-right">من إجمالي {teacher.performance.classesCompleted + 50} حصة</p>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20">
                          <CardHeader>
                            <CardTitle className="text-lg text-slate-900 dark:text-white text-right">متوسط التقييم</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-center">
                              <div className="flex items-center justify-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-6 h-6 ${i < Math.floor(teacher.rating)
                                      ? 'text-amber-400 fill-amber-400'
                                      : 'text-slate-300 dark:text-slate-600'
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 text-right">{teacher.rating} من 5.0</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="documents">
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          
                          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                            <FileText className="w-4 h-4 ml-2" />
                            رفع مستند
                          </Button>
                          <div className="flex items-center justify-end gap-2">
                            <CardTitle className="text-slate-900 dark:text-white">المستندات والموارد</CardTitle>
                            <div className="p-2 bg-slate-500/10 rounded-lg">
                              <FileText className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-12">
                          <FileText className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-6" />
                          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2 text-right">
                            لا توجد مستندات حالياً
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 text-right">
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