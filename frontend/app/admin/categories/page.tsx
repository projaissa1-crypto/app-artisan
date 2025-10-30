'use client';

import { useState, useEffect } from 'react';
import { categoriesApi, Category } from '@/lib/api/categories';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Plus, Trash2, Edit } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

export default function CategoriesPage() {
  const { t, language } = useI18n();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nameAr: '',
    nameFr: '',
    descriptionAr: '',
    descriptionFr: '',
    parentId: '',
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await categoriesApi.getAll();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        await categoriesApi.update(editingId, formData);
      } else {
        await categoriesApi.create(formData);
      }
      
      resetForm();
      loadCategories();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleEdit = (category: Category) => {
    setFormData({
      nameAr: category.nameAr,
      nameFr: category.nameFr,
      descriptionAr: category.descriptionAr || '',
      descriptionFr: category.descriptionFr || '',
      parentId: category.parentId || '',
    });
    setEditingId(category.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا التصنيف؟')) return;
    
    try {
      await categoriesApi.delete(id);
      loadCategories();
    } catch (error: any) {
      alert(error.response?.data?.error || 'فشل حذف التصنيف');
    }
  };

  const resetForm = () => {
    setFormData({
      nameAr: '',
      nameFr: '',
      descriptionAr: '',
      descriptionFr: '',
      parentId: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  const rootCategories = categories.filter((c) => !c.parentId);

  if (loading) {
    return <div className="text-center py-12">{t('common.loading')}</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{t('admin.categories')}</h1>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {t('admin.addCategory')}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{editingId ? 'تعديل تصنيف' : t('admin.addCategory')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">التصنيف الأب (اختياري)</label>
                <select
                  className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
                  value={formData.parentId}
                  onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                >
                  <option value="">تصنيف رئيسي</option>
                  {rootCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {language === 'ar' ? cat.nameAr : cat.nameFr}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="الاسم (عربي)"
                  value={formData.nameAr}
                  onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                  required
                />
                <Input
                  label="Nom (français)"
                  value={formData.nameFr}
                  onChange={(e) => setFormData({ ...formData, nameFr: e.target.value })}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">الوصف (عربي)</label>
                  <textarea
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    rows={3}
                    value={formData.descriptionAr}
                    onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description (français)</label>
                  <textarea
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    rows={3}
                    value={formData.descriptionFr}
                    onChange={(e) => setFormData({ ...formData, descriptionFr: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit">{t('common.save')}</Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  {t('common.cancel')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {rootCategories.map((category) => {
          const subcategories = categories.filter((c) => c.parentId === category.id);
          return (
            <Card key={category.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {language === 'ar' ? category.nameAr : category.nameFr}
                    </h3>
                    {category.descriptionAr && (
                      <p className="text-sm text-gray-600 mt-1">
                        {language === 'ar' ? category.descriptionAr : category.descriptionFr}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(category)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(category.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {subcategories.length > 0 && (
                  <div className="mt-4 pr-6 border-r-2 border-gray-200">
                    <p className="text-sm font-medium text-gray-600 mb-2">التصنيفات الفرعية:</p>
                    <div className="space-y-2">
                      {subcategories.map((sub) => (
                        <div
                          key={sub.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                        >
                          <div>
                            <span className="font-medium">
                              {language === 'ar' ? sub.nameAr : sub.nameFr}
                            </span>
                            {sub.descriptionAr && (
                              <p className="text-xs text-gray-600 mt-1">
                                {language === 'ar' ? sub.descriptionAr : sub.descriptionFr}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(sub)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(sub.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
