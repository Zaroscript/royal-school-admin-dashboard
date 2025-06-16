
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Upload,
  Download,
  Search,
  Filter,
  Eye,
  Trash2,
  FolderOpen,
  Image,
  FileSpreadsheet,
  File
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'image' | 'excel' | 'other';
  size: string;
  uploadDate: string;
  category: string;
  uploadedBy: string;
  status: 'active' | 'archived';
}

const DocumentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [documents] = useState<Document[]>([
    {
      id: '1',
      name: 'تقرير الحضور الشهري.pdf',
      type: 'pdf',
      size: '2.5 MB',
      uploadDate: '2024-01-15',
      category: 'reports',
      uploadedBy: 'أحمد محمد',
      status: 'active'
    },
    {
      id: '2',
      name: 'جدول الامتحانات النهائية.xlsx',
      type: 'excel',
      size: '1.8 MB',
      uploadDate: '2024-01-14',
      category: 'schedules',
      uploadedBy: 'فاطمة السيد',
      status: 'active'
    },
    {
      id: '3',
      name: 'صور الرحلة المدرسية.jpg',
      type: 'image',
      size: '5.2 MB',
      uploadDate: '2024-01-13',
      category: 'events',
      uploadedBy: 'محمد علي',
      status: 'active'
    },
    {
      id: '4',
      name: 'نتائج الطلاب الفصل الأول.doc',
      type: 'doc',
      size: '890 KB',
      uploadDate: '2024-01-12',
      category: 'results',
      uploadedBy: 'أحمد محمد',
      status: 'active'
    }
  ]);

  const categories = [
    { key: 'all', label: 'جميع الفئات' },
    { key: 'reports', label: 'التقارير' },
    { key: 'schedules', label: 'الجداول' },
    { key: 'results', label: 'النتائج' },
    { key: 'events', label: 'الفعاليات' },
    { key: 'policies', label: 'السياسات' }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-6 h-6 text-red-500" />;
      case 'doc': return <FileText className="w-6 h-6 text-blue-500" />;
      case 'excel': return <FileSpreadsheet className="w-6 h-6 text-green-500" />;
      case 'image': return <Image className="w-6 h-6 text-purple-500" />;
      default: return <File className="w-6 h-6 text-gray-500" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    const cat = categories.find(c => c.key === category);
    return cat ? cat.label : category;
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          إدارة المستندات
        </h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="البحث في المستندات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 w-full sm:w-64"
            />
          </div>
          <Button className="bg-gradient-to-r from-school-blue-500 to-school-red-500 hover:from-school-blue-600 hover:to-school-red-600">
            <Upload className="w-4 h-4 ml-2" />
            رفع مستند
          </Button>
        </div>
      </div>

      {/* Category Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category.key}
                variant={selectedCategory === category.key ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.key)}
                className={`${selectedCategory === category.key ? 'bg-gradient-to-r from-school-blue-500 to-school-red-500' : ''}`}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="animate-slide-in-right">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي المستندات</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">234</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">رُفعت هذا الشهر</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">42</p>
              </div>
              <Upload className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">المساحة المستخدمة</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">1.2 GB</p>
              </div>
              <FolderOpen className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">التحميلات اليوم</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">18</p>
              </div>
              <Download className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            المستندات
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              لا توجد مستندات تطابق البحث
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDocuments.map((doc, index) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all duration-300 hover-scale"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4 flex-1">
                    {getFileIcon(doc.type)}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                        {doc.name}
                      </h4>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>الحجم: {doc.size}</span>
                        <span>رفع بواسطة: {doc.uploadedBy}</span>
                        <span>التاريخ: {doc.uploadDate}</span>
                        <Badge variant="outline">
                          {getCategoryLabel(doc.category)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upload Area */}
      <Card className="border-dashed border-2">
        <CardContent className="p-12">
          <div className="text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              رفع مستندات جديدة
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              اسحب وأفلت الملفات هنا أو انقر للاختيار
            </p>
            <Button className="bg-gradient-to-r from-school-blue-500 to-school-red-500 hover:from-school-blue-600 hover:to-school-red-600">
              اختر الملفات
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentsPage;
