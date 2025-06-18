import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AreaChart } from '@/components/ui/charts/area-chart';
import { BarChart } from '@/components/ui/charts/bar-chart';
import { PieChart } from '@/components/ui/charts/pie-chart';
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
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  CreditCard,
  Receipt,
  Download,
  Filter,
  Eye,
  Wallet,
  PiggyBank,
  Target,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { getChartColors, chartPalettes } from '@/lib/chartColors';

interface Transaction {
  id: number;
  type: 'income' | 'expense';
  description: string;
  amount: number;
  date: string;
  category: string;
  status: string;
  paymentMethod: string;
}

const FinancePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // Enhanced financial data with better structure
  const monthlyData = [
    { name: 'يناير', income: 150000, expenses: 120000, profit: 30000 },
    { name: 'فبراير', income: 165000, expenses: 125000, profit: 40000 },
    { name: 'مارس', income: 180000, expenses: 135000, profit: 45000 },
    { name: 'أبريل', income: 175000, expenses: 140000, profit: 35000 },
    { name: 'مايو', income: 190000, expenses: 145000, profit: 45000 },
    { name: 'يونيو', income: 200000, expenses: 150000, profit: 50000 },
    { name: 'يوليو', income: 185000, expenses: 130000, profit: 55000 },
    { name: 'أغسطس', income: 210000, expenses: 155000, profit: 55000 },
  ];

  const expenseCategories = [
    { name: 'الرواتب', value: 45, color: getChartColors.financial('expense') },
    { name: 'المرافق', value: 20, color: getChartColors.financial('cost') },
    { name: 'الصيانة', value: 15, color: getChartColors.financial('budget') },
    { name: 'المواد التعليمية', value: 12, color: getChartColors.financial('balance') },
    { name: 'أخرى', value: 8, color: getChartColors.category(4) },
  ];

  const incomeSources = [
    { name: 'رسوم دراسية', value: 65, color: getChartColors.financial('income') },
    { name: 'رسوم إضافية', value: 20, color: getChartColors.financial('revenue') },
    { name: 'تبرعات', value: 10, color: getChartColors.financial('budget') },
    { name: 'أخرى', value: 5, color: getChartColors.category(3) },
  ];

  const transactions: Transaction[] = [
    {
      id: 1,
      type: 'income',
      description: 'رسوم دراسية - الصف الثالث الثانوي',
      amount: 25000,
      date: '2024-01-15',
      category: 'رسوم دراسية',
      status: 'مكتمل',
      paymentMethod: 'نقداً'
    },
    {
      id: 2,
      type: 'expense',
      description: 'راتب المعلمين - يناير',
      amount: 85000,
      date: '2024-01-01',
      category: 'الرواتب',
      status: 'مكتمل',
      paymentMethod: 'تحويل بنكي'
    },
    {
      id: 3,
      type: 'income',
      description: 'رسوم الكتب والمواد',
      amount: 15000,
      date: '2024-01-10',
      category: 'رسوم إضافية',
      status: 'مكتمل',
      paymentMethod: 'بطاقة ائتمان'
    },
    {
      id: 4,
      type: 'expense',
      description: 'فاتورة الكهرباء',
      amount: 8500,
      date: '2024-01-05',
      category: 'المرافق',
      status: 'مكتمل',
      paymentMethod: 'نقداً'
    },
    {
      id: 5,
      type: 'income',
      description: 'تبرع من جمعية خيرية',
      amount: 50000,
      date: '2024-01-20',
      category: 'تبرعات',
      status: 'مكتمل',
      paymentMethod: 'تحويل بنكي'
    },
    {
      id: 6,
      type: 'expense',
      description: 'صيانة المختبر العلمي',
      amount: 12000,
      date: '2024-01-12',
      category: 'الصيانة',
      status: 'مكتمل',
      paymentMethod: 'شيك'
    },
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || transaction.type === selectedType;
    return matchesSearch && matchesType;
  });

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const netProfit = totalIncome - totalExpenses;

  const handleAddTransaction = () => {
    setSelectedTransaction(null);
    setIsDialogOpen(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDialogOpen(true);
  };

  const handleSaveTransaction = () => {
    toast({
      title: selectedTransaction ? "تم تحديث المعاملة" : "تم إضافة المعاملة",
      description: selectedTransaction ? "تم تحديث المعاملة المالية بنجاح" : "تم إضافة المعاملة المالية الجديدة بنجاح",
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="animate-slide-in-right">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">الإدارة المالية</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">إدارة الأموال والمعاملات المالية للمدرسة</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="hover-lift">
            <Download className="w-4 h-4 ml-2" />
            تصدير التقرير
          </Button>
          <Button 
            onClick={handleAddTransaction} 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover-scale animate-gradient"
          >
            <Plus className="w-4 h-4 ml-2" />
            إضافة معاملة
          </Button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: 'إجمالي الإيرادات', 
            value: `${totalIncome.toLocaleString()} ج.م`, 
            icon: TrendingUp, 
            color: 'green',
            trend: '+12%',
            delay: 'stagger-1'
          },
          { 
            title: 'إجمالي المصروفات', 
            value: `${totalExpenses.toLocaleString()} ج.م`, 
            icon: TrendingDown, 
            color: 'red',
            trend: '+5%',
            delay: 'stagger-2'
          },
          { 
            title: 'صافي الربح', 
            value: `${netProfit.toLocaleString()} ج.م`, 
            icon: DollarSign, 
            color: 'blue',
            trend: '+18%',
            delay: 'stagger-3'
          },
          { 
            title: 'الرصيد المتاح', 
            value: '125,000 ج.م', 
            icon: Wallet, 
            color: 'purple',
            trend: '+8%',
            delay: 'stagger-4'
          }
        ].map((stat, index) => (
          <Card key={index} className={`card-hover animate-fade-in-up ${stat.delay}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className={`text-sm text-${stat.color}-600 dark:text-${stat.color}-400 font-medium`}>
                    {stat.trend} من الشهر الماضي
                  </p>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/20 rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Financial Overview */}
        <Card className="card-hover animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChartIcon className="w-5 h-5" />
              نظرة عامة على الأداء المالي الشهري
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChart
              data={monthlyData}
              index="name"
              categories={["income", "expenses", "profit"]}
              colors={[
                getChartColors.financial('income'),
                getChartColors.financial('expense'),
                getChartColors.financial('profit')
              ]}
              valueFormatter={(value) => `${(value / 1000).toFixed(0)}ك`}
              height={350}
              palette="financial"
            />
          </CardContent>
        </Card>

        {/* Expense Categories */}
        <Card className="card-hover animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="w-5 h-5" />
              توزيع المصروفات حسب الفئة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart
              data={expenseCategories}
              index="name"
              category="value"
              colors={expenseCategories.map(item => item.color)}
              valueFormatter={(value) => `${value}%`}
              height={350}
            />
          </CardContent>
        </Card>
      </div>

      {/* Additional Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income Sources */}
        <Card className="card-hover animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              مصادر الإيرادات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={incomeSources}
              index="name"
              categories={["value"]}
              colors={incomeSources.map(item => item.color)}
              valueFormatter={(value) => `${value}%`}
              height={300}
              palette="financial"
            />
          </CardContent>
        </Card>

        {/* Monthly Profit Trend */}
        <Card className="card-hover animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              اتجاه الأرباح الشهرية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChart
              data={monthlyData}
              index="name"
              categories={["profit"]}
              colors={[getChartColors.financial('profit')]}
              valueFormatter={(value) => `${(value / 1000).toFixed(0)}ك`}
              height={300}
              palette="financial"
            />
          </CardContent>
        </Card>
      </div>

      {/* Financial Management Tabs */}
      <Card className="card-hover animate-fade-in-up stagger-5">
        <CardContent className="p-6">
          <Tabs defaultValue="transactions" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="transactions">المعاملات</TabsTrigger>
              <TabsTrigger value="invoices">الفواتير</TabsTrigger>
              <TabsTrigger value="budgets">الميزانيات</TabsTrigger>
              <TabsTrigger value="reports">التقارير</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions" className="space-y-4">
              {/* Filters */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="البحث في المعاملات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-12"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="نوع المعاملة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع المعاملات</SelectItem>
                      <SelectItem value="income">إيرادات</SelectItem>
                      <SelectItem value="expense">مصروفات</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="الشهر" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأشهر</SelectItem>
                      <SelectItem value="1">يناير</SelectItem>
                      <SelectItem value="2">فبراير</SelectItem>
                      <SelectItem value="3">مارس</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">النوع</TableHead>
                      <TableHead className="text-right">الوصف</TableHead>
                      <TableHead className="text-right">المبلغ</TableHead>
                      <TableHead className="text-right">التاريخ</TableHead>
                      <TableHead className="text-right">الفئة</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction, index) => (
                      <TableRow key={transaction.id} className={`animate-fade-in-up stagger-${index % 5 + 1}`}>
                        <TableCell>
                          <Badge 
                            variant={transaction.type === 'income' ? 'default' : 'destructive'}
                            className={transaction.type === 'income' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'}
                          >
                            {transaction.type === 'income' ? 'إيراد' : 'مصروف'}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium text-right">{transaction.description}</TableCell>
                        <TableCell className={`font-bold ${transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toLocaleString()} ج.م
                        </TableCell>
                        <TableCell className="text-right">{transaction.date}</TableCell>
                        <TableCell className="text-right">{transaction.category}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                            {transaction.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEditTransaction(transaction)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="invoices" className="space-y-4">
              <div className="text-center py-12">
                <Receipt className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">لا توجد فواتير حالياً</h3>
                <p className="text-gray-500 dark:text-gray-400">سيتم عرض الفواتير هنا عند إنشائها</p>
              </div>
            </TabsContent>

            <TabsContent value="budgets" className="space-y-4">
              <div className="text-center py-12">
                <Target className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">لا توجد ميزانيات حالياً</h3>
                <p className="text-gray-500 dark:text-gray-400">سيتم عرض الميزانيات هنا عند إنشائها</p>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <div className="text-center py-12">
                <BarChartIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">لا توجد تقارير حالياً</h3>
                <p className="text-gray-500 dark:text-gray-400">سيتم عرض التقارير هنا عند إنشائها</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Add Transaction Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedTransaction ? 'تعديل المعاملة' : 'إضافة معاملة جديدة'}</DialogTitle>
            <DialogDescription>
              {selectedTransaction ? 'قم بتعديل تفاصيل المعاملة المالية' : 'أدخل تفاصيل المعاملة المالية الجديدة'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">النوع</Label>
              <Select defaultValue="income">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر النوع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">إيراد</SelectItem>
                  <SelectItem value="expense">مصروف</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">المبلغ</Label>
              <Input id="amount" type="number" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">الوصف</Label>
              <Textarea id="description" className="col-span-3" />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleSaveTransaction}>
              {selectedTransaction ? 'تحديث' : 'إضافة'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FinancePage;
