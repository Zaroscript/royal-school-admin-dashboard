import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Settings,
  User,
  Bell,
  Shield,
  Database,
  Mail,
  Palette,
  Globe,
  Save,
  Search,
  Filter,
  Download,
  Upload,
  Check,
  X,
  AlertCircle,
  Calendar as CalendarIcon
} from 'lucide-react';

const SettingsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  const [generalSettings, setGeneralSettings] = useState({
    schoolName: 'مدرسة المستقبل',
    schoolAddress: 'الرياض، المملكة العربية السعودية',
    phoneNumber: '+966123456789',
    email: 'info@future-school.edu.sa',
    website: 'www.future-school.edu.sa',
    establishmentYear: '2010',
    studentCapacity: '500',
    currentStudents: '425'
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    weeklyReports: true,
    attendanceAlerts: true,
    gradeUpdates: true,
    parentNotifications: true,
    teacherNotifications: false
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 3,
    dataEncryption: true,
    auditLogging: true
  });

  const [systemHealth] = useState({
    database: 95,
    server: 98,
    storage: 87,
    backup: 100
  });

  const recentActivities = [
    { id: 1, action: 'تسجيل دخول مدير', user: 'أحمد محمد', time: '10:30 ص', status: 'success' },
    { id: 2, action: 'تحديث بيانات طالب', user: 'فاطمة السيد', time: '09:45 ص', status: 'success' },
    { id: 3, action: 'محاولة دخول فاشلة', user: 'مجهول', time: '09:20 ص', status: 'warning' },
    { id: 4, action: 'نسخ احتياطي', user: 'النظام', time: '02:00 ص', status: 'success' }
  ];

  const filteredActivities = recentActivities.filter(activity => {
    const matchesSearch = activity.action.includes(searchTerm) || activity.user.includes(searchTerm);
    const matchesFilter = activeFilter === 'all' || activity.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleSaveSettings = (settingType: string) => {
    // Simulate API call
    console.log(`حفظ إعدادات ${settingType}`);
    // Here you would connect to your backend
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-red-500 rounded-xl">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              إعدادات النظام
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              إدارة وتخصيص إعدادات المدرسة والنظام
            </p>
          </div>
        </div>
        
        {/* System Health Indicators */}
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
            النظام متصل
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            آخر نسخة احتياطية: اليوم
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          <TabsTrigger value="general" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">عام</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">الإشعارات</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">الأمان</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">المظهر</span>
          </TabsTrigger>
          <TabsTrigger value="backup" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            <Database className="w-4 h-4" />
            <span className="hidden sm:inline">النسخ الاحتياطي</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            <CalendarIcon className="w-4 h-4" />
            <span className="hidden sm:inline">السجل</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="animate-slide-in-right hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    الإعدادات العامة للمدرسة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="schoolName">اسم المدرسة</Label>
                      <Input
                        id="schoolName"
                        value={generalSettings.schoolName}
                        onChange={(e) => setGeneralSettings({...generalSettings, schoolName: e.target.value})}
                        className="bg-gray-50 dark:bg-gray-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input
                        id="email"
                        type="email"
                        value={generalSettings.email}
                        onChange={(e) => setGeneralSettings({...generalSettings, email: e.target.value})}
                        className="bg-gray-50 dark:bg-gray-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الهاتف</Label>
                      <Input
                        id="phone"
                        value={generalSettings.phoneNumber}
                        onChange={(e) => setGeneralSettings({...generalSettings, phoneNumber: e.target.value})}
                        className="bg-gray-50 dark:bg-gray-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">الموقع الإلكتروني</Label>
                      <Input
                        id="website"
                        value={generalSettings.website}
                        onChange={(e) => setGeneralSettings({...generalSettings, website: e.target.value})}
                        className="bg-gray-50 dark:bg-gray-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="establishmentYear">سنة التأسيس</Label>
                      <Input
                        id="establishmentYear"
                        value={generalSettings.establishmentYear}
                        onChange={(e) => setGeneralSettings({...generalSettings, establishmentYear: e.target.value})}
                        className="bg-gray-50 dark:bg-gray-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="studentCapacity">السعة القصوى للطلاب</Label>
                      <Input
                        id="studentCapacity"
                        value={generalSettings.studentCapacity}
                        onChange={(e) => setGeneralSettings({...generalSettings, studentCapacity: e.target.value})}
                        className="bg-gray-50 dark:bg-gray-800"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">العنوان</Label>
                    <Input
                      id="address"
                      value={generalSettings.schoolAddress}
                      onChange={(e) => setGeneralSettings({...generalSettings, schoolAddress: e.target.value})}
                      className="bg-gray-50 dark:bg-gray-800"
                    />
                  </div>
                  <Button 
                    onClick={() => handleSaveSettings('عام')}
                    className="bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600 text-white ripple"
                  >
                    <Save className="w-4 h-4 ml-2" />
                    حفظ التغييرات
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* System Health Card */}
            <div className="space-y-6">
              <Card className="animate-slide-in-left">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    حالة النظام
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(systemHealth).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {key === 'database' && 'قاعدة البيانات'}
                          {key === 'server' && 'الخادم'}
                          {key === 'storage' && 'التخزين'}
                          {key === 'backup' && 'النسخ الاحتياطي'}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{value}%</span>
                      </div>
                      <Progress value={value} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="animate-slide-in-left stagger-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    إحصائيات سريعة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {generalSettings.currentStudents}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">طالب مسجل</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {parseInt(generalSettings.studentCapacity) - parseInt(generalSettings.currentStudents)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">مقعد متاح</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Enhanced Notifications Settings */}
        <TabsContent value="notifications">
          <Card className="animate-slide-in-right hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                إعدادات الإشعارات المتقدمة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[
                  { key: 'emailNotifications', label: 'إشعارات البريد الإلكتروني', desc: 'تلقي الإشعارات عبر البريد الإلكتروني', icon: Mail },
                  { key: 'smsNotifications', label: 'إشعارات الرسائل النصية', desc: 'تلقي الإشعارات عبر الرسائل النصية', icon: Bell },
                  { key: 'pushNotifications', label: 'الإشعارات الفورية', desc: 'تلقي الإشعارات الفورية في المتصفح', icon: Globe },
                  { key: 'weeklyReports', label: 'التقارير الأسبوعية', desc: 'تلقي تقارير أسبوعية عن أداء المدرسة', icon: CalendarIcon },
                  { key: 'attendanceAlerts', label: 'تنبيهات الحضور', desc: 'تنبيهات عند تسجيل غياب الطلاب', icon: User },
                  { key: 'gradeUpdates', label: 'تحديثات الدرجات', desc: 'إشعارات عند تحديث درجات الطلاب', icon: Settings },
                  { key: 'parentNotifications', label: 'إشعارات أولياء الأمور', desc: 'إرسال إشعارات لأولياء الأمور', icon: User },
                  { key: 'teacherNotifications', label: 'إشعارات المعلمين', desc: 'إرسال إشعارات للمعلمين', icon: User }
                ].map((setting) => {
                  const Icon = setting.icon;
                  return (
                    <div key={setting.key} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors card-hover">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                          <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{setting.label}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{setting.desc}</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications[setting.key as keyof typeof notifications]}
                        onCheckedChange={(checked) => setNotifications({...notifications, [setting.key]: checked})}
                      />
                    </div>
                  );
                })}
              </div>
              <Button 
                onClick={() => handleSaveSettings('الإشعارات')}
                className="bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600 text-white ripple"
              >
                <Save className="w-4 h-4 ml-2" />
                حفظ إعدادات الإشعارات
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced Security Settings */}
        <TabsContent value="security">
          <Card className="animate-slide-in-right hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                إعدادات الأمان المتقدمة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">المصادقة الثنائية</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">تفعيل طبقة حماية إضافية للحساب</p>
                    </div>
                    <Switch
                      checked={security.twoFactorAuth}
                      onCheckedChange={(checked) => setSecurity({...security, twoFactorAuth: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">تشفير البيانات</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">تشفير جميع البيانات الحساسة</p>
                    </div>
                    <Switch
                      checked={security.dataEncryption}
                      onCheckedChange={(checked) => setSecurity({...security, dataEncryption: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">سجل التدقيق</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">تسجيل جميع العمليات الحساسة</p>
                    </div>
                    <Switch
                      checked={security.auditLogging}
                      onCheckedChange={(checked) => setSecurity({...security, auditLogging: checked})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">انتهاء الجلسة (دقيقة)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={security.sessionTimeout}
                      onChange={(e) => setSecurity({...security, sessionTimeout: parseInt(e.target.value)})}
                      className="bg-gray-50 dark:bg-gray-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passwordExpiry">انتهاء كلمة المرور (يوم)</Label>
                    <Input
                      id="passwordExpiry"
                      type="number"
                      value={security.passwordExpiry}
                      onChange={(e) => setSecurity({...security, passwordExpiry: parseInt(e.target.value)})}
                      className="bg-gray-50 dark:bg-gray-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loginAttempts">محاولات تسجيل الدخول</Label>
                    <Input
                      id="loginAttempts"
                      type="number"
                      value={security.loginAttempts}
                      onChange={(e) => setSecurity({...security, loginAttempts: parseInt(e.target.value)})}
                      className="bg-gray-50 dark:bg-gray-800"
                    />
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => handleSaveSettings('الأمان')}
                className="bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600 text-white ripple"
              >
                <Save className="w-4 h-4 ml-2" />
                حفظ إعدادات الأمان
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card className="animate-slide-in-right">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                إعدادات المظهر
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">الألوان الأساسية</h4>
                  <div className="grid grid-cols-4 gap-4">
                    {[
                      { name: 'أزرق', color: 'bg-blue-500' },
                      { name: 'أحمر', color: 'bg-red-500' },
                      { name: 'أخضر', color: 'bg-green-500' },
                      { name: 'بنفسجي', color: 'bg-purple-500' }
                    ].map((colorOption) => (
                      <div key={colorOption.name} className="text-center">
                        <div className={`w-12 h-12 ${colorOption.color} rounded-lg mx-auto mb-2 cursor-pointer hover:scale-110 transition-transform`}></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{colorOption.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">اللغة</h4>
                  <div className="flex gap-4">
                    <Button variant="default" className="bg-gradient-to-r from-school-blue-500 to-school-red-500">
                      العربية
                    </Button>
                    <Button variant="outline">English</Button>
                  </div>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-school-blue-500 to-school-red-500 hover:from-school-blue-600 hover:to-school-red-600">
                <Save className="w-4 h-4 ml-2" />
                حفظ إعدادات المظهر
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup Settings */}
        <TabsContent value="backup">
          <Card className="animate-slide-in-right">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                النسخ الاحتياطي والاستعادة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">النسخ الاحتياطي التلقائي</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    آخر نسخة احتياطية: 2024-01-15 - 02:30 ص
                  </p>
                  <div className="flex gap-3">
                    <Button className="bg-gradient-to-r from-school-blue-500 to-school-red-500 hover:from-school-blue-600 hover:to-school-red-600">
                      إنشاء نسخة احتياطية الآن
                    </Button>
                    <Button variant="outline">
                      استعادة من نسخة احتياطية
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">تصدير البيانات</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    تصدير بيانات المدرسة بصيغات مختلفة
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline">تصدير Excel</Button>
                    <Button variant="outline">تصدير PDF</Button>
                    <Button variant="outline">تصدير CSV</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* New Activity Log Tab */}
        <TabsContent value="activity">
          <Card className="animate-slide-in-right hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                سجل النشاطات
              </CardTitle>
              
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="البحث في السجل..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10 bg-gray-50 dark:bg-gray-800"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={activeFilter === 'all' ? 'default' : 'outline'}
                    onClick={() => setActiveFilter('all')}
                    size="sm"
                  >
                    الكل
                  </Button>
                  <Button
                    variant={activeFilter === 'success' ? 'default' : 'outline'}
                    onClick={() => setActiveFilter('success')}
                    size="sm"
                  >
                    نجح
                  </Button>
                  <Button
                    variant={activeFilter === 'warning' ? 'default' : 'outline'}
                    onClick={() => setActiveFilter('warning')}
                    size="sm"
                  >
                    تحذير
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                {filteredActivities.map((activity, index) => (
                  <div 
                    key={activity.id} 
                    className={`flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors animate-fade-in-up stagger-${index + 1}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        activity.status === 'success' ? 'bg-green-100 dark:bg-green-900/20' :
                        activity.status === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                        'bg-red-100 dark:bg-red-900/20'
                      }`}>
                        {activity.status === 'success' ? (
                          <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                        ) : activity.status === 'warning' ? (
                          <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                        ) : (
                          <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{activity.action}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">بواسطة: {activity.user}</p>
                      </div>
                    </div>
                    <div className="text-left">
                      <Badge variant={activity.status === 'success' ? 'default' : 'destructive'}>
                        {activity.status === 'success' ? 'نجح' : activity.status === 'warning' ? 'تحذير' : 'خطأ'}
                      </Badge>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {filteredActivities.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  لم يتم العثور على نشاطات مطابقة للبحث
                </div>
              )}

              <div className="flex justify-center mt-6">
                <Button variant="outline">
                  <Download className="w-4 h-4 ml-2" />
                  تصدير السجل
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
