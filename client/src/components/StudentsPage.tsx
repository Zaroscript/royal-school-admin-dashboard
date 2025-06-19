import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Search, Edit, Trash2, Eye, GraduationCap, Filter, Download, AlertTriangle, Upload, Pencil, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useStudentStore } from '../store/useStudentStore';
import Loader from '@/components/ui/loader';
import { CheckCircle } from 'lucide-react';
import type { Student } from '@/types/student';

const StudentsPage = () => {
  const { students, fetchStudents, loading, error, createStudent, updateStudent, deleteStudent, forceDeleteStudent, total, hasMore, loadMoreStudents } = useStudentStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [showDialogOpen, setShowDialogOpen] = useState(false);
  const [viewedStudent, setViewedStudent] = useState<any>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<any>(null);
  const [importedStudents, setImportedStudents] = useState<any[]>([]);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editStudent, setEditStudent] = useState<any>(null);
  const [importLoading, setImportLoading] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [duplicateIndex, setDuplicateIndex] = useState<number | null>(null);
  const [duplicateError, setDuplicateError] = useState<string | null>(null);

  // Refs for form fields
  const formRef = useRef<HTMLDivElement>(null);
  // State for select fields
  const [formSelects, setFormSelects] = useState({
    gender: '',
    grade: '',
    section: '',
    bloodType: '',
    academicYear: '',
    specialization: '',
    parentRelation: '',
  });
  const [birthDate, setBirthDate] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Add at the top-level of StudentsPage component:
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  useEffect(() => {
    if (error) {
      toast({
        title: 'خطأ في تحميل بيانات الطلاب',
        description: error,
        variant: 'destructive',
      });
    }
  }, [error]);

  if (loading) return <Loader variant="royal" text="جاري تحميل بيانات الطلاب..." />;
  if (error) return null;

  const filteredStudents = students.filter(student => {
    const matchesSearch = (student.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (student.studentId?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || student.grade === selectedGrade;
    const matchesStatus = selectedStatus === 'all' || student?.status === selectedStatus;
    return matchesSearch && matchesGrade && matchesStatus;
  });

  const handleAddStudent = () => {
    setSelectedStudent(null);
    setIsDialogOpen(true);
  };

  const handleEditStudent = (student: any) => {
    setSelectedStudent(student);
    setBirthDate(student.birthDate || '');
    setFormSelects({
      gender: student.gender || '',
      grade: student.grade || '',
      section: student.section || '',
      bloodType: student.bloodType || '',
      academicYear: student.academicYear || '',
      specialization: student.specialization || '',
      parentRelation: student.parentRelation || '',
    });
    setIsDialogOpen(true);
  };

  const handleDeleteStudent = async (studentId: string) => {
    if (!window.confirm('هل أنت متأكد أنك تريد حذف هذا الطالب؟')) return;
    try {
      await deleteStudent(studentId);
      toast({
        title: 'تم حذف الطالب',
        description: 'تم حذف الطالب بنجاح',
        variant: 'default',
      });
    } catch (err: any) {
      const backendMsg = err?.response?.data?.message || err?.message || 'حدث خطأ أثناء حذف الطالب';
      toast({
        title: 'تعذر حذف الطالب',
        description: backendMsg.includes('بيانات مرتبطة')
          ? 'لا يمكن حذف الطالب لوجود بيانات مرتبطة به (درجات، حضور، أو غيرها). يرجى حذف هذه البيانات أولاً.'
          : backendMsg,
        variant: 'destructive',
      });
    }
  };

  const handleShowStudent = (student: any) => {
    setViewedStudent(student);
    setShowDialogOpen(true);
  };

  const handleForceDeleteStudent = (student: any) => {
    setStudentToDelete(student);
    setDeleteDialogOpen(true);
  };

  const confirmForceDeleteStudent = async () => {
    if (!studentToDelete) return;
    try {
      await forceDeleteStudent(studentToDelete.id);
      toast({
        title: 'تم حذف الطالب وكل بياناته',
        description: 'تم حذف الطالب وجميع البيانات المرتبطة به بنجاح.',
        variant: 'default',
      });
    } catch (err: any) {
      toast({
        title: 'خطأ في الحذف',
        description: err?.response?.data?.message || err?.message || 'حدث خطأ أثناء حذف الطالب وبياناته.',
        variant: 'destructive',
      });
    } finally {
      setDeleteDialogOpen(false);
      setStudentToDelete(null);
    }
  };

  // Helper to generate next student number
  function getNextStudentId() {
    if (!students || students.length === 0) return 'STU001';
    // Find the highest numeric part of studentId
    const maxNum = students.reduce((max, s) => {
      const match = (s.studentId || '').match(/(\d+)$/);
      const num = match ? parseInt(match[1], 10) : 0;
      return num > max ? num : max;
    }, 0);
    const nextNum = (maxNum + 1).toString().padStart(3, '0');
    return `STU${nextNum}`;
  }

  const handleSaveStudent = async () => {
    if (!formRef.current) return;
    setSubmitLoading(true);
    const getValue = (id: string) => (formRef.current?.querySelector(`#${id}`) as HTMLInputElement | HTMLTextAreaElement)?.value || '';
    const getSelect = (id: keyof typeof formSelects) => formSelects[id] || '';
    let studentIdValue = getValue('studentId').trim();
    if (!studentIdValue) {
      studentIdValue = getNextStudentId();
    }
    let birthDateValue = birthDate;
    if (birthDateValue) {
      const d = new Date(birthDateValue);
      if (!isNaN(d.getTime())) {
        birthDateValue = d.toISOString().slice(0, 10);
      }
    }
    const student = {
      name: getValue('name').trim(),
      studentId: studentIdValue,
      birthDate: birthDateValue,
      email: getValue('email').trim(),
      phone: getValue('phone').trim(),
      gender: formSelects.gender,
      address: getValue('address').trim(),
      grade: getSelect('grade'),
      section: getSelect('section'),
      parentName: getValue('parentName').trim(),
      parentPhone: getValue('parentPhone').trim(),
      parentEmail: getValue('parentEmail').trim(),
      emergencyContact: getValue('emergencyContact').trim(),
      medicalNotes: getValue('medicalNotes').trim(),
      photo: '',
      status: 'نشط',
    };
    console.log('Submitting student:', student);

    // Field-level validation
    const errors: Record<string, string> = {};
    if (!student.name) errors.name = 'يرجى إدخال اسم الطالب';
    if (!student.studentId) errors.studentId = 'يرجى إدخال رقم الطالب';
    if (!birthDateValue) errors.birthDate = 'يرجى إدخال تاريخ الميلاد';
    else if (isNaN(Date.parse(birthDateValue))) errors.birthDate = 'يرجى إدخال تاريخ ميلاد صحيح (YYYY-MM-DD)';
    if (!student.gender) errors.gender = 'يرجى اختيار الجنس';
    if (!student.grade) errors.grade = 'يرجى اختيار الصف';
    if (!student.section) errors.section = 'يرجى اختيار الشعبة';
    if (!student.parentName) errors.parentName = 'يرجى إدخال اسم ولي الأمر';
    if (!student.parentPhone) errors.parentPhone = 'يرجى إدخال رقم هاتف ولي الأمر';
    if (!student.address) errors.address = 'يرجى إدخال العنوان';
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) {
      setSubmitLoading(false);
      return;
    }
    setValidationErrors({});
    try {
      if (selectedStudent) {
        await updateStudent(selectedStudent._id || selectedStudent.id, student);
        toast({
          title: 'تم تحديث بيانات الطالب',
          description: 'تم تحديث بيانات الطالب بنجاح',
          variant: 'default',
        });
      } else {
        await createStudent(student);
        toast({
          title: 'تم إضافة الطالب',
          description: 'تم إضافة الطالب الجديد بنجاح',
          variant: 'default',
        });
      }
      setIsDialogOpen(false);
      setSelectedStudent(null);
      setBirthDate('');
      setFormSelects({
        gender: '',
        grade: '',
        section: '',
        bloodType: '',
        academicYear: '',
        specialization: '',
        parentRelation: '',
      });
      setValidationErrors({});
    } catch (err: any) {
      const backendMsg = err?.response?.data?.message || err?.message || 'حدث خطأ أثناء حفظ بيانات الطالب';
      toast({
        title: selectedStudent ? 'خطأ في تحديث بيانات الطالب' : 'خطأ في إضافة الطالب',
        description: backendMsg,
        variant: 'destructive',
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  // Stats calculations
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s?.status === 'نشط').length;
  const absentStudents = students.filter(s => s?.status === 'غائب').length;
  const now = new Date();
  const newStudentsThisMonth = students.filter(s => {
    if (!s?.createdAt) return false;
    const created = new Date(s.createdAt);
    return created.getFullYear() === now.getFullYear() && created.getMonth() === now.getMonth();
  }).length;

  // Move handleImportExcel here so it can access fileInputRef
  const handleImportExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      // Dynamically import xlsx only when needed
      // @ts-ignore: No types for dynamic import
      const XLSX = await import('xlsx');
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      if (!json.length) {
        toast({ title: 'الملف فارغ', description: 'لم يتم العثور على بيانات في الملف.', variant: 'destructive' });
        return;
      }
      const fieldMap: Record<string, string> = {
        'name': 'name', 'الاسم': 'name',
        'studentId': 'studentId', 'رقم الطالب': 'studentId',
        'email': 'email', 'البريد الإلكتروني': 'email',
        'phone': 'phone', 'رقم الهاتف': 'phone',
        'birthDate': 'birthDate', 'تاريخ الميلاد': 'birthDate',
        'gender': 'gender', 'الجنس': 'gender',
        'address': 'address', 'العنوان': 'address',
        'grade': 'grade', 'الصف': 'grade',
        'section': 'section', 'الشعبة': 'section',
        'parentName': 'parentName', 'اسم ولي الأمر': 'parentName',
        'parentPhone': 'parentPhone', 'هاتف ولي الأمر': 'parentPhone',
        'parentEmail': 'parentEmail', 'بريد ولي الأمر': 'parentEmail',
        'emergencyContact': 'emergencyContact', 'رقم الطوارئ': 'emergencyContact',
        'medicalNotes': 'medicalNotes', 'ملاحظات طبية': 'medicalNotes',
      };
      const students: any[] = [];
      for (const row of json) {
        const student: any = {};
        if (typeof row === 'object' && row !== null) {
          for (const key in row as Record<string, any>) {
            const mapped = fieldMap[key.trim()];
            if (mapped) student[mapped] = row[key];
          }
        }
        student.status = 'نشط';
        students.push(student);
      }
      setImportedStudents(students);
      setIsImportDialogOpen(true);
      toast({ title: 'تم استيراد الملف', description: `تم استيراد ${students.length} طالب. يمكنك مراجعتهم قبل التأكيد.`, variant: 'default' });
    } catch (err) {
    toast({
        title: 'خطأ في استيراد الملف',
        description: 'تأكد من أن الملف بصيغة Excel وصحيح.',
        variant: 'destructive',
      });
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Edit student in review dialog
  const handleEditImported = (index: number) => {
    setEditIndex(index);
    setEditStudent({ ...importedStudents[index] });
  };
  const handleSaveEditImported = () => {
    if (editIndex === null || !editStudent) return;
    const updated = [...importedStudents];
    updated[editIndex] = editStudent;
    setImportedStudents(updated);
    setEditIndex(null);
    setEditStudent(null);
    setDuplicateError(null);
    setDuplicateIndex(null);
  };
  const handleDeleteImported = (index: number) => {
    const updated = [...importedStudents];
    updated.splice(index, 1);
    setImportedStudents(updated);
    setDuplicateError(null);
    setDuplicateIndex(null);
  };
  const handleChangeEditField = (field: string, value: string) => {
    setEditStudent((prev: any) => ({ ...prev, [field]: value }));
  };
  // Confirm import: upload all reviewed students
  const handleConfirmImport = async () => {
    // Check for duplicates in current students
    const existingIds = students.map(s => s.studentId);
    const existingEmails = students.map(s => s.email).filter(Boolean);
    const existingPhones = students.map(s => s.phone).filter(Boolean);
    // Check for duplicates within imported students
    const seenIds = new Set();
    const seenEmails = new Set();
    const seenPhones = new Set();
    for (let i = 0; i < importedStudents.length; i++) {
      const s = importedStudents[i];
      if (existingIds.includes(s.studentId)) {
        setDuplicateIndex(i);
        setDuplicateError(`رقم الطالب ${s.studentId} مسجل مسبقًا في النظام.`);
        return;
      }
      if (s.email && existingEmails.includes(s.email)) {
        setDuplicateIndex(i);
        setDuplicateError(`البريد الإلكتروني ${s.email} مسجل مسبقًا في النظام.`);
        return;
      }
      if (s.phone && existingPhones.includes(s.phone)) {
        setDuplicateIndex(i);
        setDuplicateError(`رقم الهاتف ${s.phone} مسجل مسبقًا في النظام.`);
        return;
      }
      // Check for duplicates within imported students
      if (seenIds.has(s.studentId)) {
        setDuplicateIndex(i);
        setDuplicateError(`رقم الطالب ${s.studentId} مكرر في ملف الاستيراد.`);
        return;
      }
      if (s.email && seenEmails.has(s.email)) {
        setDuplicateIndex(i);
        setDuplicateError(`البريد الإلكتروني ${s.email} مكرر في ملف الاستيراد.`);
        return;
      }
      if (s?.phone && seenPhones.has(s.phone)) {
        setDuplicateIndex(i);
        setDuplicateError(`رقم الهاتف ${s.phone} مكرر في ملف الاستيراد.`);
        return;
      }
      seenIds.add(s.studentId);
      if (s.email) seenEmails.add(s.email);
      if (s.phone) seenPhones.add(s.phone);
    }
    setDuplicateIndex(null);
    setImportLoading(true);
    setImportSuccess(false);
    let imported = 0, skipped = 0;
    for (const student of importedStudents) {
      if (!student.name || !student.studentId || !student.grade || !student.gender || !student.parentName || !student.parentPhone || !student.address) {
        skipped++;
        continue;
      }
      try {
        // eslint-disable-next-line no-await-in-loop
        await createStudent(student);
        imported++;
      } catch {
        skipped++;
      }
    }
    setImportLoading(false);
    setImportSuccess(true);
    setTimeout(() => {
      setIsImportDialogOpen(false);
      setImportedStudents([]);
      setImportSuccess(false);
    }, 1200);
    toast({
      title: 'تم رفع البيانات',
      description: `تم رفع ${imported} طالب${imported !== 1 ? 'اً' : ''}. ${skipped ? `تم تخطي ${skipped} صفوف لوجود نقص في البيانات أو خطأ.` : ''}`,
      variant: imported ? 'default' : 'destructive',
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="animate-slide-in-right">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">إدارة الطلاب</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">إدارة بيانات الطلاب وتتبع حالتهم الأكاديمية</p>
        </div>
        <div className="flex gap-3 items-center">
          <Button 
            onClick={handleAddStudent} 
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-4 h-4 ml-2" />
            إضافة طالب جديد
          </Button>
          <div>
            <Button
              type="button"
              variant="outline"
              className="flex items-center gap-2 hover:text-white"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4" />
              استيراد من Excel
            </Button>
            <input
              type="file"
              accept=".xlsx,.xls"
              ref={fileInputRef}
              onChange={handleImportExcel}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 px-1">
        <Card className="card-hover animate-fade-in-up stagger-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">إجمالي الطلاب</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover animate-fade-in-up stagger-2">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                <Badge className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">الطلاب النشطين</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover animate-fade-in-up stagger-3">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl flex items-center justify-center">
                <Badge className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">الطلاب الغائبين</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{absentStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover animate-fade-in-up stagger-4">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                <Plus className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">طلاب جدد هذا الشهر</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{newStudentsThisMonth}</p>
                </div>
              </div>
            </CardContent>
          </Card>
      </div>

      {/* Enhanced Filters */}
      <Card className="card-hover animate-scale-in sticky top-0 z-20 md:static md:z-auto">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:flex-row md:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="البحث عن طالب بالاسم أو رقم الطالب..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-12 h-10 md:h-12 text-base md:text-lg w-full"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:gap-3 w-full md:w-auto">
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger className="w-full md:w-48 h-10 md:h-12">
                  <SelectValue placeholder="اختر الصف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الصفوف</SelectItem>
                  <SelectItem value="الصف الأول الثانوي">الصف الأول الثانوي</SelectItem>
                  <SelectItem value="الصف الثاني الثانوي">الصف الثاني الثانوي</SelectItem>
                  <SelectItem value="الصف الثالث الثانوي">الصف الثالث الثانوي</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-32 h-10 md:h-12">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="نشط">نشط</SelectItem>
                  <SelectItem value="غائب">غائب</SelectItem>
                  <SelectItem value="متوقف">متوقف</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="h-10 md:h-12 px-3 md:px-4 w-full md:w-auto">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card className="card-hover animate-fade-in-up stagger-5">
        <CardHeader>
          <CardTitle className="text-base md:text-xl">قائمة الطلاب ({total})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto w-full">
            {duplicateError && (
              <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl bg-gradient-to-r from-rose-100 to-red-50 dark:from-rose-900/30 dark:to-red-900/20 border border-rose-300 dark:border-rose-700 shadow-lg animate-fade-in">
                <AlertTriangle className="w-6 h-6 text-rose-500" />
                <span className="text-rose-700 dark:text-rose-300 font-semibold">{duplicateError}</span>
                <button onClick={() => { setDuplicateError(null); setDuplicateIndex(null); }} className="ml-auto text-rose-400 hover:text-rose-600 text-lg font-bold px-2">×</button>
              </div>
            )}
            <Table className="min-w-[600px] md:min-w-0 text-sm md:text-base">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right font-semibold">الطالب</TableHead>
                  <TableHead className="text-right font-semibold">رقم الطالب</TableHead>
                  <TableHead className="text-right font-semibold">الصف</TableHead>
                  <TableHead className="text-right font-semibold">الشعبة</TableHead>
                  <TableHead className="text-right font-semibold">الحالة</TableHead>
                  <TableHead className="text-right font-semibold">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student, index) => (
                  <TableRow key={student.id} className={`animate-fade-in-up stagger-${index % 5 + 1} hover:bg-gray-50 dark:hover:bg-gray-800/50`}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                            {student.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{student.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{student.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">{student.studentId}</TableCell>
                    <TableCell>{student.grade}</TableCell>
                    <TableCell className="font-semibold">{student.section ?? ''}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={student?.status === 'نشط' ? 'default' : 'destructive'}
                        className={`${student?.status === 'نشط' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        } hover-scale`}
                      >
                        {student?.status ?? 'غير محدد'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleEditStudent(student)} className="hover-scale">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleShowStudent(student)} className="hover-scale">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleForceDeleteStudent(student)} className="hover-scale text-red-800">
                          <Trash2 className="w-4 h-4" />
                          <span className="sr-only">حذف نهائي</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {hasMore && (
              <div className="flex justify-center mt-6">
                <Button
                  onClick={loadMoreStudents}
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-2 rounded-lg font-semibold shadow-md transition-all duration-200"
                >
                  {loading ? 'جاري التحميل...' : 'تحميل المزيد'}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Add/Edit Student Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" ref={formRef}>
          <DialogHeader>
            <DialogTitle className="text-xl">
              {selectedStudent ? 'تعديل بيانات الطالب' : 'إضافة طالب جديد'}
            </DialogTitle>
            <DialogDescription>
              {selectedStudent ? 'قم بتعديل البيانات المطلوبة' : 'أدخل جميع البيانات المطلوبة لإضافة الطالب'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">المعلومات الشخصية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="name">اسم الطالب *</Label>
                  <Input id="name" defaultValue={selectedStudent?.name} placeholder="الاسم الكامل" className={validationErrors.name ? 'border-red-500' : ''}
                    onChange={() => setValidationErrors((e) => ({ ...e, name: undefined }))}
                  />
                  {validationErrors.name && <div className="text-xs text-red-600 mt-1 animate-fade-in-left">{validationErrors.name}</div>}
                </div>
                <div>
                  <Label htmlFor="studentId">رقم الطالب *</Label>
                  <Input id="studentId" defaultValue={selectedStudent?.studentId} placeholder="STU001" className={validationErrors.studentId ? 'border-red-500' : ''}
                    onChange={() => setValidationErrors((e) => ({ ...e, studentId: undefined }))}
                  />
                </div>
                <div>
                  <Label htmlFor="birthDate">تاريخ الميلاد *</Label>
                  <Input id="birthDate" type="date" value={birthDate} onChange={e => { setBirthDate(e.target.value); setValidationErrors((v) => ({ ...v, birthDate: undefined })); }} className={validationErrors.birthDate ? 'border-red-500' : ''} />
                  {validationErrors.birthDate && <div className="text-xs text-red-600 mt-1 animate-fade-in-left">{validationErrors.birthDate}</div>}
                </div>
                <div>
                  <Label htmlFor="nationalId">رقم الهوية الوطنية</Label>
                  <Input id="nationalId" placeholder="1234567890123" />
                </div>
                <div>
                  <Label htmlFor="bloodType">فصيلة الدم</Label>
                  <Select value={formSelects.bloodType} onValueChange={v => { setFormSelects(s => ({ ...s, bloodType: v })); setValidationErrors(e => ({ ...e, bloodType: undefined })); }}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر فصيلة الدم" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="gender">الجنس *</Label>
                  <Select value={formSelects.gender} onValueChange={v => { setFormSelects(s => ({ ...s, gender: v })); setValidationErrors(e => ({ ...e, gender: undefined })); }}>
                    <SelectTrigger className={validationErrors.gender ? 'border-red-500' : ''}>
                      <SelectValue placeholder="اختر الجنس" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ذكر">ذكر</SelectItem>
                      <SelectItem value="أنثى">أنثى</SelectItem>
                    </SelectContent>
                  </Select>
                  {validationErrors.gender && <div className="text-xs text-red-600 mt-1 animate-fade-in-left">{validationErrors.gender}</div>}
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">المعلومات الأكاديمية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="grade">الصف *</Label>
                  <Select value={formSelects.grade} onValueChange={v => { setFormSelects(s => ({ ...s, grade: v })); setValidationErrors(e => ({ ...e, grade: undefined })); }}>
                    <SelectTrigger className={validationErrors.grade ? 'border-red-500' : ''}>
                      <SelectValue placeholder="اختر الصف" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="الصف الأول الثانوي">الصف الأول الثانوي</SelectItem>
                      <SelectItem value="الصف الثاني الثانوي">الصف الثاني الثانوي</SelectItem>
                      <SelectItem value="الصف الثالث الثانوي">الصف الثالث الثانوي</SelectItem>
                    </SelectContent>
                  </Select>
                  {validationErrors.grade && <div className="text-xs text-red-600 mt-1 animate-fade-in-left">{validationErrors.grade}</div>}
                </div>
                <div>
                  <Label htmlFor="section">الشعبة *</Label>
                  <Select value={formSelects.section} onValueChange={v => { setFormSelects(s => ({ ...s, section: v })); setValidationErrors(e => ({ ...e, section: undefined })); }}>
                    <SelectTrigger className={validationErrors.section ? 'border-red-500' : ''}>
                      <SelectValue placeholder="اختر الشعبة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="أ">أ</SelectItem>
                      <SelectItem value="ب">ب</SelectItem>
                      <SelectItem value="ج">ج</SelectItem>
                      <SelectItem value="د">د</SelectItem>
                    </SelectContent>
                  </Select>
                  {validationErrors.section && <div className="text-xs text-red-600 mt-1 animate-fade-in-left">{validationErrors.section}</div>}
                </div>
                <div>
                  <Label htmlFor="enrollmentDate">تاريخ التسجيل</Label>
                  <Input id="enrollmentDate" type="date" defaultValue={selectedStudent?.enrollmentDate} />
                </div>
                <div>
                  <Label htmlFor="academicYear">العام الدراسي</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر العام الدراسي" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2023-2024">2023-2024</SelectItem>
                      <SelectItem value="2024-2025">2024-2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="previousSchool">المدرسة السابقة</Label>
                  <Input id="previousSchool" placeholder="اسم المدرسة السابقة" />
                </div>
                <div>
                  <Label htmlFor="specialization">التخصص</Label>
                  <Select value={formSelects.specialization} onValueChange={v => { setFormSelects(s => ({ ...s, specialization: v })); setValidationErrors(e => ({ ...e, specialization: undefined })); }}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر التخصص" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="علمي">علمي</SelectItem>
                      <SelectItem value="أدبي">أدبي</SelectItem>
                      <SelectItem value="تجاري">تجاري</SelectItem>
                      <SelectItem value="صناعي">صناعي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">معلومات الاتصال</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input id="email" type="email" defaultValue={selectedStudent?.email} placeholder="example@school.com" />
                </div>
                <div>
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input id="phone" defaultValue={selectedStudent?.phone} placeholder="01234567890" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">العنوان *</Label>
                  <Textarea id="address" defaultValue={selectedStudent?.address} placeholder="العنوان الكامل" className={validationErrors.address ? 'border-red-500' : ''}
                    onChange={() => setValidationErrors((e) => ({ ...e, address: undefined }))}
                  />
                  {validationErrors.address && <div className="text-xs text-red-600 mt-1 animate-fade-in-left">{validationErrors.address}</div>}
                </div>
              </div>
            </div>

            {/* Guardian Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">معلومات ولي الأمر</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="parentName">اسم ولي الأمر *</Label>
                  <Input id="parentName" defaultValue={selectedStudent?.parentName} placeholder="اسم الوالد أو الوصي" className={validationErrors.parentName ? 'border-red-500' : ''}
                    onChange={() => setValidationErrors((e) => ({ ...e, parentName: undefined }))}
                  />
                  {validationErrors.parentName && <div className="text-xs text-red-600 mt-1 animate-fade-in-left">{validationErrors.parentName}</div>}
                </div>
                <div>
                  <Label htmlFor="parentPhone">رقم هاتف ولي الأمر *</Label>
                  <Input id="parentPhone" defaultValue={selectedStudent?.parentPhone} placeholder="01234567890" className={validationErrors.parentPhone ? 'border-red-500' : ''}
                    onChange={() => setValidationErrors((e) => ({ ...e, parentPhone: undefined }))}
                  />
                  {validationErrors.parentPhone && <div className="text-xs text-red-600 mt-1 animate-fade-in-left">{validationErrors.parentPhone}</div>}
                </div>
                <div>
                  <Label htmlFor="parentEmail">بريد ولي الأمر الإلكتروني</Label>
                  <Input id="parentEmail" type="email" placeholder="parent@example.com" />
                </div>
                <div>
                  <Label htmlFor="parentJob">وظيفة ولي الأمر</Label>
                  <Input id="parentJob" placeholder="المهنة" />
                </div>
                <div>
                  <Label htmlFor="parentRelation">صلة القرابة</Label>
                  <Select value={formSelects.parentRelation} onValueChange={v => { setFormSelects(s => ({ ...s, parentRelation: v })); setValidationErrors(e => ({ ...e, parentRelation: undefined })); }}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر صلة القرابة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="father">الوالد</SelectItem>
                      <SelectItem value="mother">الوالدة</SelectItem>
                      <SelectItem value="brother">الأخ</SelectItem>
                      <SelectItem value="sister">الأخت</SelectItem>
                      <SelectItem value="uncle">العم</SelectItem>
                      <SelectItem value="aunt">العمة</SelectItem>
                      <SelectItem value="other">أخرى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="emergencyContact">جهة اتصال طوارئ</Label>
                  <Input id="emergencyContact" placeholder="01234567890" />
                </div>
              </div>
            </div>

            {/* Medical & Notes */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">المعلومات الطبية والملاحظات</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="medicalNotes">الملاحظات الطبية</Label>
                  <Textarea id="medicalNotes" defaultValue={selectedStudent?.medicalNotes} placeholder="أي حالات طبية خاصة أو حساسية" />
                </div>
                <div>
                  <Label htmlFor="generalNotes">ملاحظات عامة</Label>
                  <Textarea id="generalNotes" placeholder="ملاحظات إضافية حول الطالب" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={handleSaveStudent} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white" disabled={submitLoading}>
                {submitLoading ? <span className="loader mr-2"></span> : null}
                {selectedStudent ? 'حفظ التغييرات' : 'إضافة الطالب'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Show Student Dialog */}
      <Dialog open={showDialogOpen} onOpenChange={setShowDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>بيانات الطالب</DialogTitle>
          </DialogHeader>
          {viewedStudent && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={viewedStudent.avatar} />
                  <AvatarFallback>{viewedStudent.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-bold text-lg">{viewedStudent.name}</div>
                  <div className="text-sm text-gray-500">{viewedStudent.studentId}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div><b>الصف:</b> {viewedStudent.grade}</div>
                <div><b>الشعبة:</b> {viewedStudent.section}</div>
                <div><b>تاريخ الميلاد:</b> {viewedStudent.birthDate}</div>
                <div><b>الجنس:</b> {viewedStudent.gender}</div>
                <div><b>الهاتف:</b> {viewedStudent.phone}</div>
                <div><b>العنوان:</b> {viewedStudent.address}</div>
                <div><b>ولي الأمر:</b> {viewedStudent.parentName}</div>
                <div><b>هاتف ولي الأمر:</b> {viewedStudent.parentPhone}</div>
                <div><b>ملاحظات طبية:</b> {viewedStudent.medicalNotes}</div>
                {/* Add more fields as needed */}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      {deleteDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 max-w-md w-full text-center relative animate-fade-in">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-red-700 mb-2">تحذير: حذف الطالب نهائياً</h2>
            <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
              هل أنت متأكد أنك تريد حذف الطالب <span className="font-bold text-red-700">{studentToDelete?.name}</span> وجميع بياناته المرتبطة (الدرجات، الحضور، إلخ)؟<br />
              <span className="text-red-600 font-semibold">لا يمكن التراجع عن هذا الإجراء.</span>
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="px-4 py-2 rounded border border-gray-300 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                onClick={() => { setDeleteDialogOpen(false); setStudentToDelete(null); }}
              >
                إلغاء
              </button>
              <button
                className="px-4 py-2 rounded bg-gradient-to-r from-red-600 to-red-800 text-white font-bold hover:from-red-700 hover:to-red-900 transition"
                onClick={confirmForceDeleteStudent}
              >
                نعم، حذف نهائي
              </button>
            </div>
            <button
              className="absolute top-2 left-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={() => { setDeleteDialogOpen(false); setStudentToDelete(null); }}
              aria-label="إغلاق"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Import Review Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-auto bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-2xl shadow-2xl border-0 p-0">
          <DialogHeader className="rounded-t-2xl bg-gradient-to-r from-blue-500/80 to-purple-500/80 px-8 py-6">
            <DialogTitle className="text-white text-2xl flex items-center gap-3">
              <Upload className="w-7 h-7 text-green-200 animate-bounce-gentle" />
              مراجعة بيانات الطلاب المستوردين
            </DialogTitle>
            <DialogDescription className="text-blue-100 mt-2">يمكنك تعديل أو حذف أي طالب قبل رفع البيانات. الحقول الأساسية مطلوبة.</DialogDescription>
          </DialogHeader>
          <div className="p-6">
            {duplicateError && (
              <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl bg-gradient-to-r from-rose-100 to-red-50 dark:from-rose-900/30 dark:to-red-900/20 border border-rose-300 dark:border-rose-700 shadow-lg animate-fade-in">
                <AlertTriangle className="w-6 h-6 text-rose-500" />
                <span className="text-rose-700 dark:text-rose-300 font-semibold">{duplicateError}</span>
                <button onClick={() => { setDuplicateError(null); setDuplicateIndex(null); }} className="ml-auto text-rose-400 hover:text-rose-600 text-lg font-bold px-2">×</button>
              </div>
            )}
            <div className="overflow-x-auto rounded-xl shadow-inner bg-white/80 dark:bg-slate-900/80">
              <table className="min-w-full text-sm rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 text-blue-900 dark:text-blue-200">
                    <th className="p-3 font-bold">#</th>
                    <th className="p-3 font-bold">الاسم</th>
                    <th className="p-3 font-bold">رقم الطالب</th>
                    <th className="p-3 font-bold">الصف</th>
                    <th className="p-3 font-bold">الجنس</th>
                    <th className="p-3 font-bold">اسم ولي الأمر</th>
                    <th className="p-3 font-bold">هاتف ولي الأمر</th>
                    <th className="p-3 font-bold">العنوان</th>
                    <th className="p-3 font-bold">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {importedStudents.map((student, idx) => (
                    editIndex === idx ? (
                      <tr key={idx} className={
                        (editIndex === idx
                          ? 'bg-yellow-50 dark:bg-yellow-900/20 border-b border-blue-100 dark:border-blue-900 animate-pulse'
                          : duplicateIndex === idx
                            ? 'bg-red-100 dark:bg-red-900/30 border-b border-red-400 dark:border-red-700 animate-shake'
                            : 'border-b border-blue-50 dark:border-blue-900 hover:bg-blue-50/60 dark:hover:bg-blue-900/20 transition-all')
                      }>
                        <td className="p-2 text-center">{idx + 1}</td>
                        <td className="p-2"><input className="input input-sm w-28 rounded-lg border-blue-300 focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 dark:bg-slate-800 dark:text-white" value={editStudent.name} onChange={e => handleChangeEditField('name', e.target.value)} /></td>
                        <td className="p-2"><input className="input input-sm w-20 rounded-lg border-blue-300 focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 dark:bg-slate-800 dark:text-white" value={editStudent.studentId} onChange={e => handleChangeEditField('studentId', e.target.value)} /></td>
                        <td className="p-2"><input className="input input-sm w-24 rounded-lg border-blue-300 focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 dark:bg-slate-800 dark:text-white" value={editStudent.grade} onChange={e => handleChangeEditField('grade', e.target.value)} /></td>
                        <td className="p-2"><input className="input input-sm w-16 rounded-lg border-blue-300 focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 dark:bg-slate-800 dark:text-white" value={editStudent.gender} onChange={e => handleChangeEditField('gender', e.target.value)} /></td>
                        <td className="p-2"><input className="input input-sm w-28 rounded-lg border-blue-300 focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 dark:bg-slate-800 dark:text-white" value={editStudent.parentName} onChange={e => handleChangeEditField('parentName', e.target.value)} /></td>
                        <td className="p-2"><input className="input input-sm w-24 rounded-lg border-blue-300 focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 dark:bg-slate-800 dark:text-white" value={editStudent.parentPhone} onChange={e => handleChangeEditField('parentPhone', e.target.value)} /></td>
                        <td className="p-2"><input className="input input-sm w-32 rounded-lg border-blue-300 focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 dark:bg-slate-800 dark:text-white" value={editStudent.address} onChange={e => handleChangeEditField('address', e.target.value)} /></td>
                        <td className="p-2 text-center">
                          <button className="text-green-600 font-bold mr-2 hover:underline" onClick={handleSaveEditImported}>حفظ</button>
                          <button className="text-gray-500 font-bold hover:underline" onClick={() => { setEditIndex(null); setEditStudent(null); }}>إلغاء</button>
                        </td>
                      </tr>
                    ) : (
                      <tr key={idx} className={
                        (editIndex === idx
                          ? 'bg-yellow-50 dark:bg-yellow-900/20 border-b border-blue-100 dark:border-blue-900 animate-pulse'
                          : duplicateIndex === idx
                            ? 'bg-red-100 dark:bg-red-900/30 border-b border-red-400 dark:border-red-700 animate-shake'
                            : 'border-b border-blue-50 dark:border-blue-900 hover:bg-blue-50/60 dark:hover:bg-blue-900/20 transition-all')
                      }>
                        <td className="p-2 text-center font-bold text-blue-700 dark:text-blue-200">{idx + 1}</td>
                        <td className="p-2">{student.name}</td>
                        <td className="p-2">{student.studentId}</td>
                        <td className="p-2">{student.grade}</td>
                        <td className="p-2">{student.gender}</td>
                        <td className="p-2">{student.parentName}</td>
                        <td className="p-2">{student.parentPhone}</td>
                        <td className="p-2">{student.address}</td>
                        <td className="p-2 text-center">
                          <button className="text-blue-600 font-bold mr-2 hover:underline flex items-center gap-1" onClick={() => handleEditImported(idx)}><Pencil className="inline w-4 h-4" />تعديل</button>
                          <button className="text-red-600 font-bold hover:underline flex items-center gap-1" onClick={() => handleDeleteImported(idx)}><X className="inline w-4 h-4" />حذف</button>
                        </td>
                      </tr>
                    )
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">عدد الطلاب: <b className="text-blue-600 dark:text-blue-300">{importedStudents.length}</b></span>
              </div>
              <div className="flex gap-2">
                <button
                  className="btn btn-primary px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 disabled:opacity-60"
                  onClick={handleConfirmImport}
                  disabled={importLoading || importSuccess}
                >
                  {importLoading && <Loader variant="royal" className="w-5 h-5 mr-2" />}
                  {importSuccess && <CheckCircle className="w-5 h-5 text-green-300 animate-pulse" />}
                  {!importLoading && !importSuccess && 'تأكيد الاستيراد'}
                  {importLoading && 'جاري الرفع...'}
                  {importSuccess && 'تم الرفع!'}
                </button>
                <button
                  className="btn px-6 py-2 rounded-lg bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-300 dark:hover:bg-slate-600 transition-all"
                  onClick={() => setIsImportDialogOpen(false)}
                  disabled={importLoading}
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentsPage;
