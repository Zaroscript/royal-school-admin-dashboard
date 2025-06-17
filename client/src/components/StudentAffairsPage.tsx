import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  PlusCircle,
  Search,
  Users,
  Filter,
  Calendar,
  MessageSquare,
  Flag,
  AlertTriangle,
  User,
  BookOpen,
  GraduationCap,
  Settings,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  Activity,
  Zap,
  Star
} from 'lucide-react';

// Mock data for demonstration
const mockCases = [
  {
    id: '1',
    title: 'مشكلة سلوكية في الفصل',
    description: 'الطالب يسبب إزعاجاً في الفصل الدراسي',
    studentName: 'أحمد محمد',
    type: 'behavioral',
    status: 'open',
    priority: 'high',
    createdAt: '2024-01-15',
    assignedTo: 'سارة أحمد'
  },
  {
    id: '2',
    title: 'طلب إجازة طبية',
    description: 'الطالب يحتاج إلى إجازة طبية لمدة أسبوع',
    studentName: 'فاطمة علي',
    type: 'medical',
    status: 'pending',
    priority: 'medium',
    createdAt: '2024-01-14',
    assignedTo: 'محمد حسن'
  },
  {
    id: '3',
    title: 'مشكلة أكاديمية',
    description: 'الطالب يواجه صعوبة في مادة الرياضيات',
    studentName: 'علي أحمد',
    type: 'academic',
    status: 'resolved',
    priority: 'low',
    createdAt: '2024-01-10',
    assignedTo: 'أحمد سعيد'
  },
  {
    id: '4',
    title: 'شكوى من زميل',
    description: 'الطالب يشكو من سلوك زميله في المدرسة',
    studentName: 'مريم خالد',
    type: 'complaint',
    status: 'open',
    priority: 'high',
    createdAt: '2024-01-13',
    assignedTo: 'فاطمة محمد'
  }
];

const StudentAffairsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [cases, setCases] = useState(mockCases);

  // Filter cases based on search and filter
  const filteredCases = cases.filter(case_ => {
    const matchesSearch = case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || case_.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'medium': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'behavioral': return <AlertTriangle className="h-4 w-4" />;
      case 'medical': return <User className="h-4 w-4" />;
      case 'academic': return <BookOpen className="h-4 w-4" />;
      case 'complaint': return <Flag className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'behavioral': return 'سلوكي';
      case 'medical': return 'طبي';
      case 'academic': return 'أكاديمي';
      case 'complaint': return 'شكوى';
      default: return 'أخرى';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'مفتوح';
      case 'pending': return 'قيد الانتظار';
      case 'resolved': return 'تم الحل';
      default: return 'غير محدد';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'عالي';
      case 'medium': return 'متوسط';
      case 'low': return 'منخفض';
      default: return 'غير محدد';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
          {/* Header */}
      <div className="flex justify-between items-center animate-slide-in-bottom stagger-1">
            <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            شؤون الطلاب
          </h1>
              <p className="text-muted-foreground">
                إدارة وتتبع حالات الطلاب والتواصل مع المشرفين
              </p>
            </div>
        <Button className="gap-2 btn-royal hover-glow animate-scale-in stagger-2">
              <PlusCircle className="w-4 h-4" />
              حالة جديدة
            </Button>
      </div>

          {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-hover animate-slide-in-bottom stagger-1 hover-lift">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">إجمالي الحالات</CardTitle>
            <div className="p-2 rounded-lg bg-primary/10 animate-pulse-slow">
              <FileText className="h-4 w-4 text-primary" />
            </div>
                </CardHeader>
                <CardContent>
            <div className="text-2xl font-bold text-primary">{cases.length}</div>
                  <p className="text-xs text-muted-foreground">
              {cases.filter(c => c.status === 'open').length} حالات مفتوحة
                  </p>
                </CardContent>
              </Card>

        <Card className="card-hover animate-slide-in-bottom stagger-2 hover-lift">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">حالات عاجلة</CardTitle>
            <div className="p-2 rounded-lg bg-red-500/10 animate-heart-beat">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
            </div>
                </CardHeader>
                <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {cases.filter(c => c.priority === 'high').length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    تحتاج إلى اهتمام فوري
                  </p>
                </CardContent>
              </Card>

        <Card className="card-hover animate-slide-in-bottom stagger-3 hover-lift">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">متوسط وقت الحل</CardTitle>
            <div className="p-2 rounded-lg bg-blue-500/10 animate-float">
              <Clock className="h-4 w-4 text-blue-500" />
            </div>
                </CardHeader>
                <CardContent>
            <div className="text-2xl font-bold text-blue-500">3.2 يوم</div>
                  <p className="text-xs text-muted-foreground">
                    للحالات المغلقة
                  </p>
                </CardContent>
              </Card>

        <Card className="card-hover animate-slide-in-bottom stagger-4 hover-lift">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">معدل الحل</CardTitle>
            <div className="p-2 rounded-lg bg-green-500/10 animate-bounce-gentle">
                  <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
                </CardHeader>
                <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {cases.length > 0
                      ? Math.round((cases.filter(c => c.status === 'resolved').length / cases.length) * 100)
                      : 0}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    من الحالات تم حلها
                  </p>
                </CardContent>
              </Card>
      </div>

          {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 animate-slide-in-bottom stagger-5">
            <div className="flex-1">
              <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث في الحالات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 royal-input hover-glow focus:scale-105"
                />
              </div>
            </div>
            <div className="flex gap-2">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-0 focus:border-0 royal-select hover-glow focus:scale-105"
          >
            <option value="all">جميع الحالات</option>
            <option value="open">مفتوح</option>
            <option value="pending">قيد الانتظار</option>
            <option value="resolved">تم الحل</option>
          </select>
          <Button variant="outline" className="gap-2 hover-glow">
            <Filter className="h-4 w-4" />
            فلتر
          </Button>
        </div>
            </div>

          {/* Cases List */}
      <div className="grid gap-4">
        {filteredCases.map((case_, index) => (
          <Card 
            key={case_.id} 
            className="card-hover hover-lift animate-slide-in-bottom"
            style={{ animationDelay: `${(index + 1) * 0.1}s` }}
          >
                      <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 hover-rotate">
                    {getTypeIcon(case_.type)}
                          </div>
                  <div className="space-y-2">
                    <CardTitle className="text-lg hover-scale">{case_.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{case_.description}</p>
                    <div className="flex items-center space-x-3 space-x-reverse text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <User className="h-4 w-4" />
                        <span>{case_.studentName}</span>
                        </div>
                      <span>•</span>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Calendar className="h-4 w-4" />
                        <span>{case_.createdAt}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Badge className={`${getStatusColor(case_.status)} hover-scale`}>
                    {getStatusText(case_.status)}
                  </Badge>
                  <Badge className={`${getPriorityColor(case_.priority)} hover-scale`}>
                    {getPriorityText(case_.priority)}
                  </Badge>
                </div>
                </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="flex items-center space-x-2 space-x-reverse text-sm text-muted-foreground">
                    <GraduationCap className="h-4 w-4" />
                    <span>المسؤول: {case_.assignedTo}</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse text-sm text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    <span>0 تعليقات</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-1 hover-glow hover-bounce"
                  >
                    <Eye className="h-3 w-3" />
                    عرض
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-1 hover-glow hover-bounce"
                  >
                    <Edit className="h-3 w-3" />
                    تعديل
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-1 text-red-600 hover:text-red-700 hover-glow hover-bounce"
                  >
                    <Trash2 className="h-3 w-3" />
                    حذف
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="text-center py-12 animate-zoom-in">
          <div className="p-4 rounded-full bg-muted/50 w-20 h-20 mx-auto mb-4 flex items-center justify-center animate-float">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            لا توجد حالات
          </h3>
          <p className="text-muted-foreground">
            لا توجد حالات تطابق معايير البحث المحددة
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentAffairsPage;