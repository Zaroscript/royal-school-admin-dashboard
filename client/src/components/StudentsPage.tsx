import React, { useState } from 'react';
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
import { Plus, Search, Edit, Trash2, Eye, GraduationCap, Filter, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const StudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const students = [
    {
      id: 1,
      name: 'أحمد محمد علي',
      grade: 'الصف الثالث الثانوي',
      section: 'أ',
      studentId: 'STU001',
      phone: '01234567890',
      email: 'ahmed@example.com',
      status: 'نشط',
      avatar: null,
      parentName: 'محمد علي',
      parentPhone: '01123456789',
      address: 'القاهرة، مصر',
      birthDate: '2005-05-15',
      enrollmentDate: '2023-09-01',
      bloodType: 'O+',
      medicalNotes: 'لا يوجد'
    },
    {
      id: 2,
      name: 'فاطمة أحمد',
      grade: 'الصف الثاني الثانوي',
      section: 'ب',
      studentId: 'STU002',
      phone: '01123456789',
      email: 'fatima@example.com',
      status: 'نشط',
      avatar: null,
      parentName: 'أحمد محمود',
      address: 'الجيزة، مصر',
      birthDate: '2006-03-20',
      enrollmentDate: '2023-09-01'
    },
    {
      id: 3,
      name: 'محمد حسن',
      grade: 'الصف الأول الثانوي',
      section: 'أ',
      studentId: 'STU003',
      phone: '01098765432',
      email: 'mohamed@example.com',
      status: 'غائب',
      avatar: null,
      parentName: 'حسن محمد',
      address: 'الإسكندرية، مصر',
      birthDate: '2007-08-10',
      enrollmentDate: '2023-09-01'
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || student.grade === selectedGrade;
    const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;
    return matchesSearch && matchesGrade && matchesStatus;
  });

  const handleAddStudent = () => {
    setSelectedStudent(null);
    setIsDialogOpen(true);
  };

  const handleEditStudent = (student: any) => {
    setSelectedStudent(student);
    setIsDialogOpen(true);
  };

  const handleDeleteStudent = (studentId: number) => {
    toast({
      title: "تم حذف الطالب",
      description: "تم حذف الطالب بنجاح",
    });
  };

  const handleSaveStudent = () => {
    toast({
      title: selectedStudent ? "تم تحديث الطالب" : "تم إضافة الطالب",
      description: selectedStudent ? "تم تحديث بيانات الطالب بنجاح" : "تم إضافة الطالب الجديد بنجاح",
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="animate-slide-in-right">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">إدارة الطلاب</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">إدارة بيانات الطلاب وتتبع حالتهم الأكاديمية</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="hover-lift">
            <Download className="w-4 h-4 ml-2" />
            تصدير البيانات
          </Button>
          <Button 
            onClick={handleAddStudent} 
            className="bg-gradient-to-r from-school-blue-500 to-school-red-500 hover:from-school-blue-600 hover:to-school-red-600 text-white hover-scale animate-gradient"
          >
            <Plus className="w-4 h-4 ml-2" />
            إضافة طالب جديد
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'إجمالي الطلاب', value: '1,245', icon: GraduationCap, color: 'blue', delay: 'stagger-1' },
          { title: 'الطلاب النشطين', value: '1,180', icon: Badge, color: 'green', delay: 'stagger-2' },
          { title: 'الطلاب الغائبين', value: '65', icon: Badge, color: 'yellow', delay: 'stagger-3' },
          { title: 'طلاب جدد هذا الشهر', value: '23', icon: Plus, color: 'purple', delay: 'stagger-4' }
        ].map((stat, index) => (
          <Card key={index} className={`card-hover animate-fade-in-up ${stat.delay}`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/20 rounded-xl flex items-center justify-center`}>
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
                  placeholder="البحث عن طالب بالاسم أو رقم الطالب..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-12 h-12 text-lg"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger className="w-48 h-12">
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
                <SelectTrigger className="w-32 h-12">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="نشط">نشط</SelectItem>
                  <SelectItem value="غائب">غائب</SelectItem>
                  <SelectItem value="متوقف">متوقف</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="h-12 px-4">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card className="card-hover animate-fade-in-up stagger-5">
        <CardHeader>
          <CardTitle className="text-xl">قائمة الطلاب ({filteredStudents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
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
                    <TableCell className="font-semibold">{student.section}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={student.status === 'نشط' ? 'default' : 'destructive'}
                        className={`${student.status === 'نشط' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        } hover-scale`}
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleEditStudent(student)} className="hover-scale">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover-scale">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteStudent(student.id)} className="hover-scale text-red-600">
                          <Trash2 className="w-4 h-4" />
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

      {/* Enhanced Add/Edit Student Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
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
                  <Input id="name" defaultValue={selectedStudent?.name} placeholder="الاسم الكامل" />
                </div>
                <div>
                  <Label htmlFor="studentId">رقم الطالب *</Label>
                  <Input id="studentId" defaultValue={selectedStudent?.studentId} placeholder="STU001" />
                </div>
                <div>
                  <Label htmlFor="birthDate">تاريخ الميلاد *</Label>
                  <Input id="birthDate" type="date" defaultValue={selectedStudent?.birthDate} />
                </div>
                <div>
                  <Label htmlFor="nationalId">رقم الهوية الوطنية</Label>
                  <Input id="nationalId" placeholder="1234567890123" />
                </div>
                <div>
                  <Label htmlFor="bloodType">فصيلة الدم</Label>
                  <Select defaultValue={selectedStudent?.bloodType}>
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
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الجنس" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">ذكر</SelectItem>
                      <SelectItem value="female">أنثى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">المعلومات الأكاديمية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="grade">الصف *</Label>
                  <Select defaultValue={selectedStudent?.grade}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الصف" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="الصف الأول الثانوي">الصف الأول الثانوي</SelectItem>
                      <SelectItem value="الصف الثاني الثانوي">الصف الثاني الثانوي</SelectItem>
                      <SelectItem value="الصف الثالث الثانوي">الصف الثالث الثانوي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="section">الشعبة *</Label>
                  <Select defaultValue={selectedStudent?.section}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الشعبة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="أ">أ</SelectItem>
                      <SelectItem value="ب">ب</SelectItem>
                      <SelectItem value="ج">ج</SelectItem>
                      <SelectItem value="د">د</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Select>
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
                  <Label htmlFor="address">العنوان</Label>
                  <Textarea id="address" defaultValue={selectedStudent?.address} placeholder="العنوان الكامل" />
                </div>
              </div>
            </div>

            {/* Guardian Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">معلومات ولي الأمر</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="parentName">اسم ولي الأمر *</Label>
                  <Input id="parentName" defaultValue={selectedStudent?.parentName} placeholder="اسم الوالد أو الوصي" />
                </div>
                <div>
                  <Label htmlFor="parentPhone">رقم هاتف ولي الأمر *</Label>
                  <Input id="parentPhone" defaultValue={selectedStudent?.parentPhone} placeholder="01234567890" />
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
                  <Select>
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
              <Button onClick={handleSaveStudent} className="bg-gradient-to-r from-school-blue-500 to-school-red-500 hover:from-school-blue-600 hover:to-school-red-600 text-white">
                {selectedStudent ? 'حفظ التغييرات' : 'إضافة الطالب'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentsPage;
