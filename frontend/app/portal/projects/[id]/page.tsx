'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { projectsApi, Project, ProjectItem } from '@/lib/api/projects';
import { materialsApi, Material } from '@/lib/api/materials';
import { categoriesApi, Category } from '@/lib/api/categories';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { ArrowRight, Plus, Trash2, Download, Search } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { t, language } = useI18n();
  const [project, setProject] = useState<Project | null>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newItem, setNewItem] = useState({
    materialId: '',
    quantity: 1,
    unit: '',
    customPrice: 0,
  });

  useEffect(() => {
    loadData();
  }, [params.id]);

  const loadData = async () => {
    try {
      const [projectData, materialsData, categoriesData] = await Promise.all([
        projectsApi.getDetails(params.id as string),
        materialsApi.getAll(),
        categoriesApi.getAll(),
      ]);
      setProject(projectData);
      setMaterials(materialsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async () => {
    if (!newItem.materialId) return;

    try {
      await projectsApi.addItem(params.id as string, {
        materialId: newItem.materialId,
        quantity: newItem.quantity,
        unit: newItem.unit,
        customPrice: newItem.customPrice || undefined,
      });
      
      setNewItem({ materialId: '', quantity: 1, unit: '', customPrice: 0 });
      setShowAddMaterial(false);
      loadData();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await projectsApi.removeItem(params.id as string, itemId);
      loadData();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleUpdateItemQuantity = async (itemId: string, quantity: number) => {
    try {
      await projectsApi.updateItem(params.id as string, itemId, { quantity });
      loadData();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleUpdateItemPrice = async (itemId: string, customPrice: number) => {
    try {
      await projectsApi.updateItem(params.id as string, itemId, { customPrice });
      loadData();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleExportJSON = async () => {
    try {
      const blob = await projectsApi.exportJSON(params.id as string);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `project-${params.id}.json`;
      a.click();
    } catch (error) {
      console.error('Error exporting JSON:', error);
    }
  };

  const handleExportCSV = async () => {
    try {
      const blob = await projectsApi.exportCSV(params.id as string);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `project-${params.id}.csv`;
      a.click();
    } catch (error) {
      console.error('Error exporting CSV:', error);
    }
  };

  const filteredMaterials = materials.filter((m) => {
    const matchesSearch = searchQuery
      ? m.nameAr.includes(searchQuery) || m.nameFr.includes(searchQuery)
      : true;
    const matchesCategory = selectedCategory ? m.categoryId === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const calculateTotal = () => {
    return project?.items.reduce((sum, item) => {
      const price = item.customPrice || item.material?.defaultPrice || 0;
      return sum + item.quantity * price;
    }, 0) || 0;
  };

  if (loading) {
    return <div className="text-center py-12">{t('common.loading')}</div>;
  }

  if (!project) {
    return <div className="text-center py-12">المشروع غير موجود</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2"
      >
        <ArrowRight className="w-4 h-4" />
        {t('common.back')}
      </Button>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {language === 'ar' ? project.nameAr : project.nameFr}
            </CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleExportJSON}>
                <Download className="w-4 h-4 ml-2" />
                JSON
              </Button>
              <Button size="sm" variant="outline" onClick={handleExportCSV}>
                <Download className="w-4 h-4 ml-2" />
                CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            {project.descriptionAr && (
              <div>
                <span className="font-medium">الوصف: </span>
                {language === 'ar' ? project.descriptionAr : project.descriptionFr}
              </div>
            )}
            {project.clientName && (
              <div>
                <span className="font-medium">العميل: </span>
                {project.clientName}
              </div>
            )}
            {project.clientPhone && (
              <div>
                <span className="font-medium">الهاتف: </span>
                {project.clientPhone}
              </div>
            )}
            {project.clientAddress && (
              <div>
                <span className="font-medium">العنوان: </span>
                {project.clientAddress}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{t('portal.materials')}</CardTitle>
            <Button
              size="sm"
              onClick={() => setShowAddMaterial(!showAddMaterial)}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              {t('portal.addMaterial')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showAddMaterial && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-4">إضافة مادة جديدة</h4>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">البحث</label>
                  <div className="relative">
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
                <div>
                  <label className="block text-sm font-medium mb-1">التصنيف</label>
                  <select
                    className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">جميع التصنيفات</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {language === 'ar' ? cat.nameAr : cat.nameFr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">المادة</label>
                  <select
                    className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
                    value={newItem.materialId}
                    onChange={(e) => {
                      const material = materials.find((m) => m.id === e.target.value);
                      setNewItem({
                        ...newItem,
                        materialId: e.target.value,
                        unit: material?.unit || '',
                        customPrice: material?.defaultPrice || 0,
                      });
                    }}
                  >
                    <option value="">اختر مادة</option>
                    {filteredMaterials.map((material) => (
                      <option key={material.id} value={material.id}>
                        {language === 'ar' ? material.nameAr : material.nameFr}
                        {material.defaultPrice && ` - ${material.defaultPrice} درهم`}
                      </option>
                    ))}
                  </select>
                </div>
                <Input
                  label={t('portal.quantity')}
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: parseFloat(e.target.value) })}
                />
                <Input
                  label={t('portal.price')}
                  type="number"
                  min="0"
                  step="0.01"
                  value={newItem.customPrice}
                  onChange={(e) => setNewItem({ ...newItem, customPrice: parseFloat(e.target.value) })}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAddItem} disabled={!newItem.materialId}>
                  {t('common.add')}
                </Button>
                <Button variant="outline" onClick={() => setShowAddMaterial(false)}>
                  {t('common.cancel')}
                </Button>
              </div>
            </div>
          )}

          {project.items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              لا توجد مواد في هذا المشروع
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-right text-sm font-semibold">المادة</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold">الكمية</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold">الوحدة</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold">السعر</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold">المجموع</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {project.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-3">
                        {language === 'ar' ? item.material?.nameAr : item.material?.nameFr}
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="0.01"
                          step="0.01"
                          className="w-20 rounded border border-input px-2 py-1 text-sm"
                          value={item.quantity}
                          onChange={(e) => handleUpdateItemQuantity(item.id!, parseFloat(e.target.value))}
                        />
                      </td>
                      <td className="px-4 py-3 text-sm">{item.unit}</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-24 rounded border border-input px-2 py-1 text-sm"
                          value={item.customPrice || item.material?.defaultPrice || 0}
                          onChange={(e) => handleUpdateItemPrice(item.id!, parseFloat(e.target.value))}
                        />
                      </td>
                      <td className="px-4 py-3 font-medium">
                        {(item.quantity * (item.customPrice || item.material?.defaultPrice || 0)).toFixed(2)} درهم
                      </td>
                      <td className="px-4 py-3">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRemoveItem(item.id!)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={4} className="px-4 py-3 text-right font-bold">
                      المجموع الكلي:
                    </td>
                    <td className="px-4 py-3 font-bold text-lg">
                      {calculateTotal().toFixed(2)} درهم
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
