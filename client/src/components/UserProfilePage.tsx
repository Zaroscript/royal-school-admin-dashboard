import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import type { User as UserType } from '@/contexts/AuthContext';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Mail,
  Phone,
  MapPin,
  Settings,
  User,
  Lock,
  Bell,
  Shield,
  Key,
  Camera,
  Edit2,
  Save,
  CheckCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserPreferences{
  emailNotifications: boolean;
  smsNotifications: boolean;
  language: 'ar' | 'en';
  theme: 'light' | 'dark';
  twoFactorEnabled: boolean;
}

interface ExtendedUserInfo extends UserType {
  phone?: string;
  title?: string;
  bio?: string;
  joinedDate?: string;
}

const UserProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);

  // Mock extended user info - in a real app, this would come from the backend
  const [extendedUser, setExtendedUser] = useState<ExtendedUserInfo>({
    ...user!,
    phone: '0123456789',
    title: 'مسؤول النظام',
    bio: 'مطور ومسؤول نظام متحمس للتعليم الإلكتروني',
    joinedDate: '2024'
  });

  // Mock user preferences - in a real app, these would come from the backend
  const [preferences, setPreferences] = useState<UserPreferences>({
    emailNotifications: true,
    smsNotifications: false,
    language: 'ar',
    theme: 'light',
    twoFactorEnabled: false
  });

  const handleSave = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);      toast({
        title: "تم الحفظ بنجاح",
        description: "تم حفظ التغييرات في ملفك الشخصي"
      });
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من حفظ التغييرات. يرجى المحاولة مرة أخرى.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50">
      {/* Hero Section */}
      <div className="relative h-[200px] lg:h-[250px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600">
          <div className="absolute inset-0 bg-[url('/assets/img/grid-pattern.svg')] opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 -mt-24 relative z-10 pb-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Profile Section */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative group">                    <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-800 shadow-xl">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="text-3xl bg-blue-500 text-white">
                        {user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute bottom-0 right-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex-1 text-center md:text-right">
                    <h1 className="text-3xl font-bold">{user?.name}</h1>
                    <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-end mt-3">                      <Badge variant="secondary">{extendedUser.role === 'admin' ? 'مسؤول النظام' : 'مشرف'}</Badge>
                      <Badge variant="outline">عضو منذ {extendedUser.joinedDate}</Badge>
                    </div>
                  </div>                  <Button
                    variant="outline"
                    onClick={isEditing ? handleSave : () => setIsEditing(true)}
                    className="w-full md:w-auto"
                    disabled={loading}
                  >
                    {isEditing ? (
                      <>
                        <Save className={cn("w-4 h-4 mr-2", loading && "animate-spin")} />
                        {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                      </>
                    ) : (
                      <>
                        <Edit2 className="w-4 h-4 mr-2" />
                        تعديل الملف الشخصي
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <Tabs defaultValue="profile" className="space-y-6">
                  <TabsList className="grid grid-cols-4 gap-4 bg-gray-100 dark:bg-gray-800 p-1">
                    <TabsTrigger value="profile" onClick={() => setActiveTab('profile')}>
                      الملف الشخصي
                    </TabsTrigger>
                    <TabsTrigger value="security" onClick={() => setActiveTab('security')}>
                      الأمان
                    </TabsTrigger>
                    <TabsTrigger value="notifications" onClick={() => setActiveTab('notifications')}>
                      الإشعارات
                    </TabsTrigger>
                    <TabsTrigger value="preferences" onClick={() => setActiveTab('preferences')}>
                      التفضيلات
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormItem>
                          <FormLabel>الاسم</FormLabel>
                          <FormControl>                            <Input
                              disabled={!isEditing}
                              value={extendedUser.name}
                              onChange={(e) => setExtendedUser(prev => ({ ...prev, name: e.target.value }))}
                              placeholder="الاسم الكامل"
                            />
                          </FormControl>
                        </FormItem>

                        <FormItem>
                          <FormLabel>البريد الإلكتروني</FormLabel>
                          <FormControl>                            <Input
                              disabled={!isEditing}
                              value={extendedUser.email}
                              onChange={(e) => setExtendedUser(prev => ({ ...prev, email: e.target.value }))}
                              type="email"
                              placeholder="البريد الإلكتروني"
                            />
                          </FormControl>
                        </FormItem>

                        <FormItem>
                          <FormLabel>رقم الهاتف</FormLabel>
                          <FormControl>                            <Input
                              disabled={!isEditing}
                              value={extendedUser.phone}
                              onChange={(e) => setExtendedUser(prev => ({ ...prev, phone: e.target.value }))}
                              placeholder="رقم الهاتف"
                            />
                          </FormControl>
                        </FormItem>

                        <FormItem>
                          <FormLabel>المسمى الوظيفي</FormLabel>
                          <FormControl>                            <Input
                              disabled={!isEditing}
                              value={extendedUser.title}
                              onChange={(e) => setExtendedUser(prev => ({ ...prev, title: e.target.value }))}
                              placeholder="المسمى الوظيفي"
                            />
                          </FormControl>
                        </FormItem>

                        <FormItem className="col-span-2">
                          <FormLabel>نبذة شخصية</FormLabel>
                          <FormControl>                            <Textarea
                              disabled={!isEditing}
                              value={extendedUser.bio}
                              onChange={(e) => setExtendedUser(prev => ({ ...prev, bio: e.target.value }))}
                              placeholder="اكتب نبذة عنك..."
                              className="min-h-[100px]"
                            />
                          </FormControl>
                        </FormItem>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="security">
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <div className="flex items-center gap-2">
                            <Lock className="w-5 h-5 text-blue-600" />
                            <CardTitle>تغيير كلمة المرور</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <FormItem>
                              <FormLabel>كلمة المرور الحالية</FormLabel>
                              <FormControl>
                                <Input type="password" />
                              </FormControl>
                            </FormItem>
                            <FormItem>
                              <FormLabel>كلمة المرور الجديدة</FormLabel>
                              <FormControl>
                                <Input type="password" />
                              </FormControl>
                            </FormItem>
                            <FormItem>
                              <FormLabel>تأكيد كلمة المرور الجديدة</FormLabel>
                              <FormControl>
                                <Input type="password" />
                              </FormControl>
                            </FormItem>
                            <Button>تغيير كلمة المرور</Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-green-600" />
                            <CardTitle>المصادقة الثنائية</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">حماية إضافية لحسابك</p>
                              <p className="text-sm text-gray-500">
                                قم بتفعيل المصادقة الثنائية للحصول على مستوى إضافي من الأمان
                              </p>
                            </div>
                            <Button variant={preferences.twoFactorEnabled ? "destructive" : "default"}>
                              {preferences.twoFactorEnabled ? "تعطيل" : "تفعيل"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="notifications">
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <div className="flex items-center gap-2">
                            <Bell className="w-5 h-5 text-yellow-600" />
                            <CardTitle>إعدادات الإشعارات</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between py-3">
                              <div>
                                <p className="font-medium">إشعارات البريد الإلكتروني</p>
                                <p className="text-sm text-gray-500">
                                  استلام التنبيهات عبر البريد الإلكتروني
                                </p>
                              </div>
                              <Button variant={preferences.emailNotifications ? "default" : "outline"}>
                                {preferences.emailNotifications ? "مفعل" : "معطل"}
                              </Button>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between py-3">
                              <div>
                                <p className="font-medium">إشعارات الرسائل القصيرة</p>
                                <p className="text-sm text-gray-500">
                                  استلام التنبيهات عبر الرسائل القصيرة
                                </p>
                              </div>
                              <Button variant={preferences.smsNotifications ? "default" : "outline"}>
                                {preferences.smsNotifications ? "مفعل" : "معطل"}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="preferences">
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <div className="flex items-center gap-2">
                            <Settings className="w-5 h-5 text-purple-600" />
                            <CardTitle>تفضيلات النظام</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">                        <div className="flex items-center justify-between py-3">
                          <div>
                            <p className="font-medium">إشعارات البريد الإلكتروني</p>
                            <p className="text-sm text-gray-500">استلام التنبيهات عبر البريد الإلكتروني</p>
                          </div>
                          <Switch
                            checked={preferences.emailNotifications}
                            onCheckedChange={(checked) =>
                              setPreferences(prev => ({ ...prev, emailNotifications: checked }))
                            }
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between py-3">
                          <div>
                            <p className="font-medium">إشعارات الرسائل القصيرة</p>
                            <p className="text-sm text-gray-500">استلام التنبيهات عبر الرسائل القصيرة</p>
                          </div>
                          <Switch
                            checked={preferences.smsNotifications}
                            onCheckedChange={(checked) =>
                              setPreferences(prev => ({ ...prev, smsNotifications: checked }))
                            }
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between py-3">
                          <div>
                            <p className="font-medium">المظهر</p>
                            <p className="text-sm text-gray-500">تخصيص مظهر التطبيق</p>
                          </div>
                          <select
                            className="p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                            value={preferences.theme}
                            onChange={(e) => setPreferences(prev => ({ ...prev, theme: e.target.value as 'light' | 'dark' }))}
                          >
                            <option value="light">فاتح</option>
                            <option value="dark">داكن</option>
                          </select>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between py-3">
                          <div>
                            <p className="font-medium">اللغة</p>
                            <p className="text-sm text-gray-500">تغيير لغة التطبيق</p>
                          </div>
                          <select
                            className="p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                            value={preferences.language}
                            onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value as 'ar' | 'en' }))}
                          >
                            <option value="ar">العربية</option>
                            <option value="en">English</option>
                          </select>
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
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>معلومات الأنشطة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">آخر تسجيل دخول</p>
                    <p className="text-sm font-medium">اليوم، 10:30 ص</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">الجهاز</p>
                    <p className="text-sm font-medium">Windows 10</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">المتصفح</p>
                    <p className="text-sm font-medium">Chrome</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">الموقع</p>
                    <p className="text-sm font-medium">القاهرة، مصر</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>إجراءات سريعة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Key className="w-4 h-4 mr-2" />
                    تغيير كلمة المرور
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    تفعيل المصادقة الثنائية
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="w-4 h-4 mr-2" />
                    إدارة الإشعارات
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
