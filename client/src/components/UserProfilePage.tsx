import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import type { User as UserType } from '@/contexts/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { toast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  Calendar,
  Monitor,
  Globe,
  Activity,
  Clock,
  Smartphone,
  MapPin as LocationIcon,
} from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';

interface UserPreferences {
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
  location?: string;
  department?: string;
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
    bio: 'مطور ومسؤول نظام متحمس للتعليم الإلكتروني ومؤمن بأهمية التكنولوجيا في تطوير العملية التعليمية',
    joinedDate: '2024',
    location: 'القاهرة، مصر',
    department: 'تقنية المعلومات'
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
      setIsEditing(false);
      toast({
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

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values
    setExtendedUser({
      ...user!,
      phone: '0123456789',
      title: 'مسؤول النظام',
      bio: 'مطور ومسؤول نظام متحمس للتعليم الإلكتروني ومؤمن بأهمية التكنولوجيا في تطوير العملية التعليمية',
      joinedDate: '2024',
      location: 'القاهرة، مصر',
      department: 'تقنية المعلومات'
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="animate-slide-in-right">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">الملف الشخصي</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">إدارة معلوماتك الشخصية وإعدادات الحساب</p>
        </div>
        <div className="flex gap-3">
          {isEditing && (
            <Button variant="outline" onClick={handleCancel} disabled={loading}>
              إلغاء
            </Button>
          )}
          <Button 
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            disabled={loading}
          >
            {isEditing ? (
              <>
                <Save className={cn("w-4 h-4 ml-2", loading && "animate-spin")} />
                {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4 ml-2" />
                تعديل الملف الشخصي
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-2">
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

                <TabsContent value="profile" className="space-y-6">
                  {/* Profile Header */}
                  <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                    <div className="relative group">
                      <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-800 shadow-xl">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                          {user?.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute bottom-0 right-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Camera className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="flex-1 text-center md:text-right">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{extendedUser.name}</h2>
                      <p className="text-gray-600 dark:text-gray-400">{extendedUser.title}</p>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-end mt-3">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                          {extendedUser.role === 'admin' ? 'مسؤول النظام' : 'مشرف'}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          عضو منذ {formatDate(extendedUser.joinedDate)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">الاسم الكامل</Label>
                        <Input
                          id="name"
                          disabled={!isEditing}
                          value={extendedUser.name}
                          onChange={(e) => setExtendedUser(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="الاسم الكامل"
                          className="text-right"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">البريد الإلكتروني</Label>
                        <Input
                          id="email"
                          disabled={!isEditing}
                          value={extendedUser.email}
                          onChange={(e) => setExtendedUser(prev => ({ ...prev, email: e.target.value }))}
                          type="email"
                          placeholder="البريد الإلكتروني"
                          className="text-right"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">رقم الهاتف</Label>
                        <Input
                          id="phone"
                          disabled={!isEditing}
                          value={extendedUser.phone}
                          onChange={(e) => setExtendedUser(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="رقم الهاتف"
                          className="text-right"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="title">المسمى الوظيفي</Label>
                        <Input
                          id="title"
                          disabled={!isEditing}
                          value={extendedUser.title}
                          onChange={(e) => setExtendedUser(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="المسمى الوظيفي"
                          className="text-right"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="department">القسم</Label>
                        <Input
                          id="department"
                          disabled={!isEditing}
                          value={extendedUser.department}
                          onChange={(e) => setExtendedUser(prev => ({ ...prev, department: e.target.value }))}
                          placeholder="القسم"
                          className="text-right"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">الموقع</Label>
                        <Input
                          id="location"
                          disabled={!isEditing}
                          value={extendedUser.location}
                          onChange={(e) => setExtendedUser(prev => ({ ...prev, location: e.target.value }))}
                          placeholder="الموقع"
                          className="text-right"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">نبذة شخصية</Label>
                      <Textarea
                        id="bio"
                        disabled={!isEditing}
                        value={extendedUser.bio}
                        onChange={(e) => setExtendedUser(prev => ({ ...prev, bio: e.target.value }))}
                        placeholder="اكتب نبذة عنك..."
                        className="min-h-[100px] text-right"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Lock className="w-5 h-5 text-red-600 dark:text-red-400" />
                        <CardTitle>تغيير كلمة المرور</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">كلمة المرور الحالية</Label>
                          <Input id="currentPassword" type="password" className="text-right" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">كلمة المرور الجديدة</Label>
                          <Input id="newPassword" type="password" className="text-right" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">تأكيد كلمة المرور الجديدة</Label>
                          <Input id="confirmPassword" type="password" className="text-right" />
                        </div>
                        <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white">
                          تغيير كلمة المرور
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <CardTitle>المصادقة الثنائية</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">حماية إضافية لحسابك</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            قم بتفعيل المصادقة الثنائية للحصول على مستوى إضافي من الأمان
                          </p>
                        </div>
                        <Button 
                          variant={preferences.twoFactorEnabled ? "destructive" : "default"}
                          className={preferences.twoFactorEnabled ? "" : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"}
                        >
                          {preferences.twoFactorEnabled ? "تعطيل" : "تفعيل"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Bell className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        <CardTitle>إعدادات الإشعارات</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-3">
                          <div>
                            <p className="font-medium">إشعارات البريد الإلكتروني</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              استلام التنبيهات عبر البريد الإلكتروني
                            </p>
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
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              استلام التنبيهات عبر الرسائل القصيرة
                            </p>
                          </div>
                          <Switch
                            checked={preferences.smsNotifications}
                            onCheckedChange={(checked) =>
                              setPreferences(prev => ({ ...prev, smsNotifications: checked }))
                            }
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preferences" className="space-y-6">
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Settings className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        <CardTitle>تفضيلات النظام</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-3">
                          <div>
                            <p className="font-medium">المظهر</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">تخصيص مظهر التطبيق</p>
                          </div>
                          <Select
                            value={preferences.theme}
                            onValueChange={(value) => setPreferences(prev => ({ ...prev, theme: value as 'light' | 'dark' }))}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">فاتح</SelectItem>
                              <SelectItem value="dark">داكن</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between py-3">
                          <div>
                            <p className="font-medium">اللغة</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">تغيير لغة التطبيق</p>
                          </div>
                          <Select
                            value={preferences.language}
                            onValueChange={(value) => setPreferences(prev => ({ ...prev, language: value as 'ar' | 'en' }))}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ar">العربية</SelectItem>
                              <SelectItem value="en">English</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Activity Info */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <CardTitle>معلومات الأنشطة</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">آخر تسجيل دخول</p>
                  </div>
                  <p className="text-sm font-medium">اليوم، 10:30 ص</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-gray-500" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">الجهاز</p>
                  </div>
                  <p className="text-sm font-medium">Windows 10</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-500" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">المتصفح</p>
                  </div>
                  <p className="text-sm font-medium">Chrome</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <LocationIcon className="w-4 h-4 text-gray-500" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">الموقع</p>
                  </div>
                  <p className="text-sm font-medium">القاهرة، مصر</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <CardTitle>إجراءات سريعة</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start hover:bg-blue-50 dark:hover:bg-blue-900/20">
                  <Key className="w-4 h-4 ml-2" />
                  تغيير كلمة المرور
                </Button>
                <Button variant="outline" className="w-full justify-start hover:bg-green-50 dark:hover:bg-green-900/20">
                  <Shield className="w-4 h-4 ml-2" />
                  تفعيل المصادقة الثنائية
                </Button>
                <Button variant="outline" className="w-full justify-start hover:bg-yellow-50 dark:hover:bg-yellow-900/20">
                  <Bell className="w-4 h-4 ml-2" />
                  إدارة الإشعارات
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Profile Completion */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <CardTitle>اكتمال الملف الشخصي</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={85} className="w-full" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  85% مكتمل - قم بإضافة المزيد من المعلومات لتحسين ملفك الشخصي
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
