import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Book, Clock, RefreshCcw } from 'lucide-react';

const LibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual API calls
  const books = [
    {
      id: 1,
      title: 'الرياضيات المتقدمة',
      author: 'د. أحمد محمد',
      category: 'تعليمي',
      status: 'available',
      dueDate: null,
    },
    {
      id: 2,
      title: 'العلوم الحديثة',
      author: 'د. سارة أحمد',
      category: 'تعليمي',
      status: 'borrowed',
      dueDate: '2025-06-30',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>المكتبة المدرسية</CardTitle>
                <div className="flex gap-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="بحث عن كتاب..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 w-[300px]"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="تصفية حسب" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الكتب</SelectItem>
                      <SelectItem value="available">المتوفرة</SelectItem>
                      <SelectItem value="borrowed">المستعارة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>العنوان</TableHead>
                    <TableHead>المؤلف</TableHead>
                    <TableHead>التصنيف</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>تاريخ الإعادة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {books.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{book.category}</TableCell>
                      <TableCell>
                        <Badge
                          variant={book.status === 'available' ? 'outline' : 'secondary'}
                        >
                          {book.status === 'available' ? 'متوفر' : 'مستعار'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {book.dueDate ? book.dueDate : '-'}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={book.status !== 'available'}
                        >
                          استعارة
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إضافة كتاب جديد</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">عنوان الكتاب</label>
                  <Input placeholder="أدخل عنوان الكتاب" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">المؤلف</label>
                  <Input placeholder="اسم المؤلف" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">التصنيف</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر التصنيف" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="educational">تعليمي</SelectItem>
                      <SelectItem value="science">علوم</SelectItem>
                      <SelectItem value="literature">أدب</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">
                  <Book className="h-4 w-4 mr-2" />
                  إضافة كتاب
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>الإحصائيات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                    <Book className="h-5 w-5 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-blue-600">150</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      إجمالي الكتب
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                    <Clock className="h-5 w-5 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold text-green-600">45</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      معارة حالياً
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="text-sm font-medium mb-2">الكتب الأكثر استعارة</div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">الرياضيات المتقدمة</span>
                      <Badge variant="outline">32 مرة</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">العلوم الحديثة</span>
                      <Badge variant="outline">28 مرة</Badge>
                    </div>
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

export default LibraryPage;
