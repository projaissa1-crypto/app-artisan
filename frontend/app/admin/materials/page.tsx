'use client';

import { useState, useEffect } from 'react';
import { materialsApi, Material } from '@/lib/api/materials';
import { categoriesApi, Category } from '@/lib/api/categories';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Plus, Trash2, Edit, Search } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

export default function MaterialsPage() {
  const { t, language } = useI18n();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    categoryId: '',
    nameAr: '',
    nameFr: '',
    descriptionAr: '',
    descriptionFr: '',
    unit: 'piece',
    defaultPrice: 0,
    sku: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [materialsData, categoriesData] = await Promise.all([
        materialsApi.getAll(),
        categoriesApi.getAll(),
      ]);
      setMaterials(materialsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        await materialsApi.update(editingId, formData);
      } else {
        await materialsApi.create(formData);
      }
      
      resetForm();
      loadData();
    } catch (error) {
      console.error('Error saving material:', error);
    }
  };

  const handleEdit = (material: Material) => {
    setFormData({
      categoryId: material.categoryId,
      nameAr: material.nameAr,
      nameFr: material.nameFr,
      descriptionAr: material.descriptionAr || '',
      descriptionFr: material.descriptionFr || '',
      unit: material.unit,
      defaultPrice: material.defaultPrice || 0,
      sku: material.sku || '',
    });
    setEditingId(material.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه المادة؟')) return;
    
    try {
      await materialsApi.delete(id);
      loadData();
    } catch (error) {
      console.error('Error deleting material:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      categoryId: '',
      nameAr: '',
      nameFr: '',
      descriptionAr: '',
      descriptionFr: '',
      unit: 'piece',
      defaultPrice: 0,
      sku: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  const filteredMaterials = materials.filter((m) =>
    m.nameAr.includes(searchQuery) || m.nameFr.includes(searchQuery)
  );

  if (loading) {
    return <div className="text-center py-12">{t('common.loading')}</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{t('admin.materials')}</h1>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {t('admin.addMaterial')}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{editingId ? 'تعديل مادة' : t('admin.addMaterial')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">التصنيف</label>
                  <select
                    className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    required
                  >
                    <option value="">اختر تصنيف</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {language === 'ar' ? cat.nameAr : cat.nameFr}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">الوحدة</label>
                  <select
                    className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    required
                  >
                    <option value="piece">قطعة</option>
                    <option value="meter">متر</option>
                    <option value="kg">كيلوغرام</option>
                    <option value="box">علبة</option>
                    <option value="roll">لفة</option>
                  </select>
                </div>
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
                <Input
                  label="السعر الافتراضي (درهم)"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.defaultPrice}
                  onChange={(e) => setFormData({ ...formData, defaultPrice: parseFloat(e.target.value) })}
                />
                <Input
                  label="رمز المنتج (SKU)"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                />
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

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                className="w-full pr-10 rounded-md border border-input bg-white px-3 py-2 text-sm"
                placeholder="ابحث عن مادة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-right text-sm font-semibold">الاسم</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">التصنيف</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">الوحدة</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">السعر</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">SKU</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredMaterials.map((material) => {
                  const category = categories.find((c) => c.id === material.categoryId);
                  return (
                    <tr key={material.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        {language === 'ar' ? material.nameAr : material.nameFr}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {category && (language === 'ar' ? category.nameAr : category.nameFr)}
                      </td>
                      <td className="px-4 py-3 text-sm">{material.unit}</td>
                      <td className="px-4 py-3 text-sm">
                        {material.defaultPrice ? `${material.defaultPrice} درهم` : '-'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{material.sku || '-'}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(material)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(material.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
