import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';

const EventsPage = () => {
  const [date, setDate] = useState<Date>(new Date());

  // Mock data - replace with actual API calls
  const events = [
    {
      id: 1,
      title: 'اجتماع أولياء الأمور',
      date: '2025-06-20',
      time: '16:00',
      type: 'meeting',
      location: 'القاعة الرئيسية',
    },
    {
      id: 2,
      title: 'المعرض العلمي السنوي',
      date: '2025-06-25',
      time: '09:00',
      type: 'event',
      location: 'صالة الأنشطة',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Calendar Section */}
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>التقويم المدرسي</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-2/3">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    className="rounded-md border"
                  />
                </div>
                <div className="lg:w-1/3 space-y-4">
                  <h3 className="font-semibold">أحداث اليوم</h3>
                  <div className="space-y-3">
                    {events.map((event) => (
                      <Card key={event.id}>
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">{event.title}</h4>
                              <Badge variant="outline">
                                {event.type === 'meeting' ? 'اجتماع' : 'نشاط'}
                              </Badge>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-2" />
                              {event.time}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-4 w-4 mr-2" />
                              {event.location}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إضافة حدث جديد</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">عنوان الحدث</label>
                  <Input placeholder="أدخل عنوان الحدث" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">نوع الحدث</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الحدث" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meeting">اجتماع</SelectItem>
                      <SelectItem value="event">نشاط</SelectItem>
                      <SelectItem value="exam">امتحان</SelectItem>
                      <SelectItem value="holiday">عطلة</SelectItem>
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
                  <label className="text-sm font-medium">المكان</label>
                  <Input placeholder="أدخل مكان الحدث" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">الوصف</label>
                  <Textarea placeholder="أدخل وصف الحدث" rows={4} />
                </div>

                <Button className="w-full">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  إضافة حدث
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>تصنيفات الأحداث</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className="w-24 justify-center">اجتماعات</Badge>
                  <span className="text-sm text-gray-600">5 أحداث قادمة</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="w-24 justify-center">
                    أنشطة
                  </Badge>
                  <span className="text-sm text-gray-600">3 أحداث قادمة</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="w-24 justify-center">
                    امتحانات
                  </Badge>
                  <span className="text-sm text-gray-600">2 أحداث قادمة</span>
                </div>
                <Separator />
                <div className="pt-2">
                  <div className="text-sm font-medium mb-2">الأحداث القادمة</div>
                  <div className="text-2xl font-bold">10</div>
                  <div className="text-sm text-gray-600">في الشهر القادم</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
