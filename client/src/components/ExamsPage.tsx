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
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, FileText, Download } from 'lucide-react';

const ExamsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  // Mock data - replace with actual API calls
  const upcomingExams = [
    {
      id: 1,
      subject: 'الرياضيات',
      class: 'الصف الثالث أ',
      date: '2025-06-20',
      time: '09:00',
      duration: '120',
      location: 'قاعة 101',
    },
    {
      id: 2,
      subject: 'العلوم',
      class: 'الصف الثاني ب',
      date: '2025-06-21',
      time: '10:30',
      duration: '90',
      location: 'قاعة 102',
    },
  ];

  const completedExams = [
    {
      id: 3,
      subject: 'اللغة العربية',
      class: 'الصف الأول ج',
      date: '2025-06-15',
      averageScore: 85,
      highestScore: 98,
      lowestScore: 65,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>نظام الامتحانات</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 w-[400px]">
                  <TabsTrigger value="upcoming">الامتحانات القادمة</TabsTrigger>
                  <TabsTrigger value="completed">الامتحانات المكتملة</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المادة</TableHead>
                        <TableHead>الصف</TableHead>
                        <TableHead>التاريخ</TableHead>
                        <TableHead>الوقت</TableHead>
                        <TableHead>المدة (دقيقة)</TableHead>
                        <TableHead>القاعة</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingExams.map((exam) => (
                        <TableRow key={exam.id}>
                          <TableCell>{exam.subject}</TableCell>
                          <TableCell>{exam.class}</TableCell>
                          <TableCell>{exam.date}</TableCell>
                          <TableCell>{exam.time}</TableCell>
                          <TableCell>{exam.duration}</TableCell>
                          <TableCell>{exam.location}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-2" />
                              التفاصيل
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="completed">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المادة</TableHead>
                        <TableHead>الصف</TableHead>
                        <TableHead>التاريخ</TableHead>
                        <TableHead>متوسط الدرجات</TableHead>
                        <TableHead>أعلى درجة</TableHead>
                        <TableHead>أقل درجة</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {completedExams.map((exam) => (
                        <TableRow key={exam.id}>
                          <TableCell>{exam.subject}</TableCell>
                          <TableCell>{exam.class}</TableCell>
                          <TableCell>{exam.date}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{exam.averageScore}%</Badge>
                          </TableCell>
                          <TableCell>{exam.highestScore}%</TableCell>
                          <TableCell>{exam.lowestScore}%</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              النتائج
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إضافة امتحان جديد</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">المادة</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المادة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">الرياضيات</SelectItem>
                      <SelectItem value="science">العلوم</SelectItem>
                      <SelectItem value="arabic">اللغة العربية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">الصف</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الصف" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1a">الصف الأول أ</SelectItem>
                      <SelectItem value="2b">الصف الثاني ب</SelectItem>
                      <SelectItem value="3c">الصف الثالث ج</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">التاريخ</label>
                  <Input type="date" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">الوقت</label>
                  <Input type="time" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">المدة (دقيقة)</label>
                  <Input type="number" min="30" step="15" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">القاعة</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر القاعة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="101">قاعة 101</SelectItem>
                      <SelectItem value="102">قاعة 102</SelectItem>
                      <SelectItem value="103">قاعة 103</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  إضافة امتحان
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>إحصائيات سريعة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">امتحانات هذا الشهر</span>
                  <Badge>12</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">متوسط الدرجات</span>
                  <Badge variant="outline">82%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">نسبة النجاح</span>
                  <Badge variant="outline">95%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExamsPage;
