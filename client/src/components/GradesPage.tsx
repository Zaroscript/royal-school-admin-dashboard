import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Download, TrendingUp, Activity } from 'lucide-react';

const GradesPage = () => {
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<string>('');

  // Mock data - replace with actual API calls
  const students = [
    {
      id: '1',
      name: 'أحمد محمد',
      class: 'الصف الثالث أ',
      grades: {
        math: 92,
        science: 88,
        arabic: 95,
        english: 85,
      },
      attendance: 95,
      behavior: 'excellent',
    },
    // Add more students...
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>الدرجات والتقدم</CardTitle>
                <div className="flex gap-4">
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="اختر الصف" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3a">الصف الثالث أ</SelectItem>
                      <SelectItem value="3b">الصف الثالث ب</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="اختر الطالب" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">أحمد محمد</SelectItem>
                      <SelectItem value="2">سارة أحمد</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="grades">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="grades">الدرجات</TabsTrigger>
                  <TabsTrigger value="progress">التقدم</TabsTrigger>
                  <TabsTrigger value="reports">التقارير</TabsTrigger>
                </TabsList>

                <TabsContent value="grades">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المادة</TableHead>
                        <TableHead>الدرجة</TableHead>
                        <TableHead>التقدير</TableHead>
                        <TableHead>المتوسط</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(students[0].grades).map(([subject, grade]) => (
                        <TableRow key={subject}>
                          <TableCell className="font-medium">
                            {subject === 'math'
                              ? 'الرياضيات'
                              : subject === 'science'
                              ? 'العلوم'
                              : subject === 'arabic'
                              ? 'اللغة العربية'
                              : 'اللغة الإنجليزية'}
                          </TableCell>
                          <TableCell>{grade}%</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                grade >= 90
                                  ? 'default'
                                  : grade >= 80
                                  ? 'secondary'
                                  : 'outline'
                              }
                            >
                              {grade >= 90
                                ? 'ممتاز'
                                : grade >= 80
                                ? 'جيد جداً'
                                : 'جيد'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={grade} className="w-[60px]" />
                              <span className="text-sm text-gray-500">{grade}%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="progress">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">التقدم الأكاديمي</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>الرياضيات</span>
                                <span>90%</span>
                              </div>
                              <Progress value={90} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>العلوم</span>
                                <span>85%</span>
                              </div>
                              <Progress value={85} className="h-2" />
                            </div>
                            {/* Add more subjects */}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">المهارات الشخصية</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>التعاون</span>
                                <span>95%</span>
                              </div>
                              <Progress value={95} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>المشاركة</span>
                                <span>88%</span>
                              </div>
                              <Progress value={88} className="h-2" />
                            </div>
                            {/* Add more skills */}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">ملاحظات المعلمين</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="border-r-2 border-blue-500 pr-4">
                            <p className="text-sm">متميز في المشاركة الصفية والتفاعل مع زملائه</p>
                            <span className="text-xs text-gray-500">- معلم الرياضيات</span>
                          </div>
                          <div className="border-r-2 border-green-500 pr-4">
                            <p className="text-sm">يحتاج إلى تحسين في مهارات الكتابة</p>
                            <span className="text-xs text-gray-500">- معلم اللغة العربية</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="reports">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button className="w-full" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        تقرير الفصل الأول
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        تقرير الفصل الثاني
                      </Button>
                    </div>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">المعدل التراكمي</span>
                            <Badge variant="outline">90%</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">الترتيب على الفصل</span>
                            <Badge>3</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">عدد أيام الغياب</span>
                            <Badge variant="outline">5</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>نظرة عامة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                    <BarChart className="h-5 w-5 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-blue-600">90%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      المعدل العام
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                    <TrendingUp className="h-5 w-5 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold text-green-600">95%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      نسبة الحضور
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">المواد الأعلى تقديراً</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">الرياضيات</span>
                      <Badge variant="outline">95%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">العلوم</span>
                      <Badge variant="outline">92%</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">التوصيات</h4>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      • يحتاج إلى تركيز أكثر في مادة اللغة الإنجليزية
                    </p>
                    <p className="text-sm text-gray-600">
                      • مستوى متميز في الرياضيات، ننصح بالمشاركة في المسابقات
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GradesPage;
