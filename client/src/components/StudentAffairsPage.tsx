import React, { useState, useEffect } from 'react';
import { useSchoolStore } from '@/store';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  PlusCircle,
  Search,
  UserCog,
  Users,
  Filter,
  SlidersHorizontal,
  Calendar,
  MessageSquare,
  Paperclip,
  Flag,
  AlertTriangle,
} from 'lucide-react';
import { StudentAffairsCase, CaseType, CaseStatus, CasePriority } from '@/types';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

// Custom error boundary component for StudentAffairsPage
class StudentAffairsErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('StudentAffairsPage Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center">
          <h2 className="text-xl font-bold text-red-500 mb-4">
            عذراً، حدث خطأ غير متوقع
          </h2>
          <p className="text-gray-600 mb-4">
            يرجى تحديث الصفحة أو المحاولة مرة أخرى لاحقاً
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-primary text-white"
          >
            تحديث الصفحة
          </Button>
          {process.env.NODE_ENV === 'development' && (
            <pre className="mt-4 p-4 bg-gray-100 rounded text-left text-sm">
              {this.state.error?.message}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

const StudentAffairsPage: React.FC = () => {
  // Add error state
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [isAddingCase, setIsAddingCase] = useState(false);
  const [selectedCase, setSelectedCase] = useState<StudentAffairsCase | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    priority: '',
    status: '',
    dateRange: 'all',
  });

  // Error handling effect
  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      setError(error.message);
      console.error('StudentAffairsPage Error:', error);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);
  const [newCase, setNewCase] = useState<Partial<StudentAffairsCase>>({
    type: 'behavioral',
    status: 'open',
    priority: 'medium',
    title: '',
    description: '',
    studentId: '',
    confidentialityLevel: 'normal',
  });

  // Get store state and methods
  const {
    cases = [],
    students = [],
    addCase,
    updateCase,
    deleteCase,
    getStudent,
  } = useSchoolStore();

  // Apply filters to cases with proper error handling
  const filteredCases = React.useMemo(() => {
    try {
      if (!Array.isArray(cases)) {
        console.error('Cases is not an array:', cases);
        return [];
      }

      return cases
        .filter((case_) => {
          if (!case_) return false;
          if (!searchTerm) return true;
          
          try {
            const student = getStudent(case_.studentId);
            const searchLower = searchTerm.toLowerCase();
            return (
              (case_.title || '').toLowerCase().includes(searchLower) ||
              (student?.name || '').toLowerCase().includes(searchLower) ||
              (case_.description || '').toLowerCase().includes(searchLower)
            );
          } catch (error) {
            console.error('Error during search filtering:', error);
            return false;
          }
        })
        .filter((case_) => {
          if (!case_) return false;
          return !filters.type || case_.type === filters.type;
        })
        .filter((case_) => {
          if (!case_) return false;
          return !filters.priority || case_.priority === filters.priority;
        })
        .filter((case_) => {
          if (!case_) return false;
          return !filters.status || case_.status === filters.status;
        })
        .filter((case_) => {
          if (!case_ || !case_.createdAt) return false;
          if (filters.dateRange === 'all') return true;

          try {
            const date = new Date(case_.createdAt);
            const now = new Date();
            
            switch (filters.dateRange) {
              case 'today': {
                return date.toDateString() === now.toDateString();
              }
              case 'week': {
                const weekAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
                return date >= weekAgo;
              }
              case 'month': {
                const monthAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
                return date >= monthAgo;
              }
              default: {
                return true;
              }
            }
          } catch (error) {
            console.error('Error during date filtering:', error);
            return false;
          }
        });
    } catch (error) {
      console.error('Error during filtering:', error);
      return [];
    }
  }, [cases, searchTerm, filters, getStudent]);

  // Handle adding a new case
  const handleAddCase = () => {
    if (newCase.studentId && newCase.title && newCase.description) {
      addCase({
        ...newCase,
        status: 'open',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: [],
        attachments: [],
        comments: [],
        relatedCases: [],
        assignedTo: [],
        history: [],
        metrics: {
          daysOpen: 0,
          responseTime: 0,
          totalComments: 0,
          totalAttachments: 0,
        }
      } as Omit<StudentAffairsCase, 'id'>);
      setIsAddingCase(false);
      setNewCase({
        type: 'behavioral',
        status: 'open',
        priority: 'medium',
        title: '',
        description: '',
        studentId: '',
        confidentialityLevel: 'normal',
      });
    }
  };

  // Handle status update
  const handleStatusUpdate = (caseId: string, newStatus: CaseStatus) => {
    updateCase(caseId, {
      status: newStatus,
      updatedAt: new Date().toISOString(),
    });
  };

  // Wrap the return statement with error boundary
  return (
    <StudentAffairsErrorBoundary>
      {error ? (
        <div className="p-6 text-center">
          <h2 className="text-xl font-bold text-red-500 mb-4">
            عذراً، حدث خطأ
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-primary text-white"
          >
            تحديث الصفحة
          </Button>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="container mx-auto p-6 space-y-6"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="flex justify-between items-center"
          >
            <div className="space-y-1">
              <h1 className="text-3xl font-bold">شؤون الطلاب</h1>
              <p className="text-muted-foreground">
                إدارة وتتبع حالات الطلاب والتواصل مع المشرفين
              </p>
            </div>
            <Button onClick={() => setIsAddingCase(true)} className="gap-2">
              <PlusCircle className="w-4 h-4" />
              حالة جديدة
            </Button>
          </motion.div>

          {/* Statistics Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <motion.div variants={itemVariants}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">إجمالي الحالات</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{Array.isArray(cases) ? cases.length : 0}</div>
                  <p className="text-xs text-muted-foreground">
                    {Array.isArray(cases) ? cases.filter(c => c.status === 'open').length : 0} حالات مفتوحة
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">حالات عاجلة</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Array.isArray(cases) ? cases.filter(c => c.priority === 'urgent').length : 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    تحتاج إلى اهتمام فوري
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">متوسط وقت الحل</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.2 يوم</div>
                  <p className="text-xs text-muted-foreground">
                    للحالات المغلقة
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">معدل الحل</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Array.isArray(cases) && cases.length > 0
                      ? Math.round((cases.filter(c => c.status === 'resolved').length / cases.length) * 100)
                      : 0}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    من الحالات تم حلها
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Filters and Search */}
          <motion.div 
            variants={containerVariants}
            className="flex flex-col md:flex-row gap-4"
          >
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="البحث في الحالات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filters.type} onValueChange={(value) => setFilters(f => ({ ...f, type: value }))}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="نوع الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">جميع الأنواع</SelectItem>
                  <SelectItem value="behavioral">سلوكية</SelectItem>
                  <SelectItem value="academic">أكاديمية</SelectItem>
                  <SelectItem value="attendance">حضور</SelectItem>
                  <SelectItem value="health">صحية</SelectItem>
                  <SelectItem value="family">عائلية</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.priority} onValueChange={(value) => setFilters(f => ({ ...f, priority: value }))}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="الأولوية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">جميع الأولويات</SelectItem>
                  <SelectItem value="low">منخفضة</SelectItem>
                  <SelectItem value="medium">متوسطة</SelectItem>
                  <SelectItem value="high">عالية</SelectItem>
                  <SelectItem value="urgent">عاجلة</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.status} onValueChange={(value) => setFilters(f => ({ ...f, status: value }))}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">جميع الحالات</SelectItem>
                  <SelectItem value="open">مفتوحة</SelectItem>
                  <SelectItem value="in-progress">قيد المعالجة</SelectItem>
                  <SelectItem value="resolved">تم الحل</SelectItem>
                  <SelectItem value="closed">مغلقة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Cases List */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <AnimatePresence>
              {Array.isArray(filteredCases) && filteredCases.length > 0 ? (
                filteredCases.map((case_) => (
                  <motion.div
                    key={case_.id}
                    variants={itemVariants}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 100 }}
                  >
                    <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={() => setSelectedCase(case_)}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{case_.title || 'Untitled Case'}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {(() => {
                                try {
                                  const student = getStudent(case_.studentId);
                                  return student?.name || 'Student not found';
                                } catch (error) {
                                  console.error('Error getting student:', error);
                                  return 'Error loading student';
                                }
                              })()}
                            </p>
                          </div>
                          <Badge
                            variant={
                              case_.priority === 'urgent'
                                ? 'destructive'
                                : case_.priority === 'high'
                                ? 'default'
                                : 'secondary'
                            }
                          >
                            {case_.priority || 'unknown'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm line-clamp-2">{case_.description || 'No description provided'}</p>
                        <div className="flex gap-2 mt-4">
                          <Badge variant="outline">{case_.type || 'unspecified'}</Badge>
                          <Badge
                            variant={
                              case_.status === 'resolved'
                                ? 'default'
                                : case_.status === 'in-progress'
                                ? 'secondary'
                                : 'outline'
                            }
                          >
                            {case_.status || 'unknown'}
                          </Badge>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          {case_.comments?.length || 0}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {(() => {
                            try {
                              return new Date(case_.createdAt).toLocaleDateString();
                            } catch (error) {
                              console.error('Error formatting date:', error);
                              return 'Invalid date';
                            }
                          })()}
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  variants={itemVariants}
                  className="col-span-full text-center p-8"
                >
                  <p className="text-muted-foreground">لا توجد حالات تطابق معايير البحث</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Case Details Dialog */}
          <Dialog open={selectedCase !== null} onOpenChange={() => setSelectedCase(null)}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>تفاصيل الحالة</DialogTitle>
                <DialogDescription>
                  عرض وتحديث تفاصيل الحالة
                </DialogDescription>
              </DialogHeader>
              {selectedCase ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>الطالب</Label>
                      <p className="text-lg font-medium">
                        {(() => {
                          try {
                            const student = getStudent(selectedCase.studentId);
                            return student?.name || 'Student not found';
                          } catch (error) {
                            console.error('Error getting student:', error);
                            return 'Error loading student';
                          }
                        })()}
                      </p>
                    </div>
                    <div>
                      <Label>الحالة والأولوية</Label>
                      <div className="flex gap-2 mt-1">
                        <Badge>{selectedCase.status || 'unknown'}</Badge>
                        <Badge variant="outline">{selectedCase.priority || 'unknown'}</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>الوصف</Label>
                    <p className="mt-1">{selectedCase.description || 'No description provided'}</p>
                  </div>

                  {/* Timeline */}
                  <div>
                    <Label>المتابعة</Label>
                    <div className="mt-2 space-y-2">
                      {selectedCase.history && selectedCase.history.length > 0 ? (
                        selectedCase.history.map((event) => (
                          event && (
                            <motion.div
                              key={event.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="text-sm flex items-start gap-2 p-2 border rounded"
                            >
                              <Clock className="w-4 h-4 mt-0.5" />
                              <div>
                                <p>{event.action || 'Unknown action'}</p>
                                <span className="text-xs text-muted-foreground">
                                  {(() => {
                                    try {
                                      return new Date(event.timestamp).toLocaleString();
                                    } catch (error) {
                                      console.error('Error formatting date:', error);
                                      return 'Invalid date';
                                    }
                                  })()}
                                </span>
                              </div>
                            </motion.div>
                          )
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">لا يوجد سجل للمتابعة</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-4">
                  <p className="text-muted-foreground">حدث خطأ في تحميل تفاصيل الحالة</p>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Add New Case Dialog */}
          <Dialog open={isAddingCase} onOpenChange={setIsAddingCase}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>إضافة حالة جديدة</DialogTitle>
                <DialogDescription>
                  أضف حالة جديدة مع كافة التفاصيل المطلوبة
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>الطالب</Label>
                  <Select
                    value={newCase.studentId || ''}
                    onValueChange={(value) => setNewCase(prev => ({ ...prev, studentId: value }))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="اختر طالباً" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.isArray(students) && students.length > 0 ? (
                        students.map((student) => (
                          student && (
                            <SelectItem key={student.id} value={student.id}>
                              {student.name || 'Unnamed Student'}
                            </SelectItem>
                          )
                        ))
                      ) : (
                        <SelectItem value="" disabled>
                          No students available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>عنوان الحالة</Label>
                  <Input
                    placeholder="أدخل عنواناً للحالة"
                    value={newCase.title || ''}
                    onChange={(e) => setNewCase(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>الوصف</Label>
                  <Textarea
                    placeholder="أدخل وصفاً تفصيلياً للحالة"
                    value={newCase.description || ''}
                    onChange={(e) => setNewCase(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>نوع الحالة</Label>
                    <Select
                      value={newCase.type || 'behavioral'}
                      onValueChange={(value) => setNewCase(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="اختر نوع الحالة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="behavioral">سلوكية</SelectItem>
                        <SelectItem value="academic">أكاديمية</SelectItem>
                        <SelectItem value="attendance">حضور</SelectItem>
                        <SelectItem value="health">صحية</SelectItem>
                        <SelectItem value="family">عائلية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>أولوية الحالة</Label>
                    <Select
                      value={newCase.priority || 'medium'}
                      onValueChange={(value) => setNewCase(prev => ({ ...prev, priority: value }))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="اختر أولوية الحالة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">منخفضة</SelectItem>
                        <SelectItem value="medium">متوسطة</SelectItem>
                        <SelectItem value="high">عالية</SelectItem>
                        <SelectItem value="urgent">عاجلة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddingCase(false)}>
                    إلغاء
                  </Button>
                  <Button 
                    onClick={handleAddCase}
                    disabled={!newCase.studentId || !newCase.title || !newCase.description}
                  >
                    حفظ
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      )}
    </StudentAffairsErrorBoundary>
  );
};

export default StudentAffairsPage;
