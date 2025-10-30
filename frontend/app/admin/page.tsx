'use client';

import { useState, useEffect } from 'react';
import { usersApi, User } from '@/lib/api/users';
import { projectsApi, Project } from '@/lib/api/projects';
import { materialsApi, Material } from '@/lib/api/materials';
import { categoriesApi, Category } from '@/lib/api/categories';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Users, FolderOpen, Package, Grid3x3 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

export default function AdminDashboard() {
  const { t } = useI18n();
  const [stats, setStats] = useState({
    users: 0,
    projects: 0,
    materials: 0,
    categories: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [users, projects, materials, categories] = await Promise.all([
        usersApi.getAll(),
        projectsApi.getAll(),
        materialsApi.getAll(),
        categoriesApi.getAll(),
      ]);

      setStats({
        users: users.length,
        projects: projects.length,
        materials: materials.length,
        categories: categories.length,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: t('admin.users'),
      value: stats.users,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: t('admin.projects'),
      value: stats.projects,
      icon: FolderOpen,
      color: 'bg-green-500',
    },
    {
      title: t('admin.materials'),
      value: stats.materials,
      icon: Package,
      color: 'bg-purple-500',
    },
    {
      title: t('admin.categories'),
      value: stats.categories,
      icon: Grid3x3,
      color: 'bg-orange-500',
    },
  ];

  if (loading) {
    return <div className="text-center py-12">{t('common.loading')}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{t('admin.dashboard')}</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>نظرة عامة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">إجمالي المستخدمين</span>
                <span className="font-semibold">{stats.users}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">المشاريع النشطة</span>
                <span className="font-semibold">{stats.projects}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">المواد المتاحة</span>
                <span className="font-semibold">{stats.materials}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">التصنيفات</span>
                <span className="font-semibold">{stats.categories}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>روابط سريعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <a
                href="/admin/users"
                className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <span>إدارة المستخدمين</span>
                </div>
              </a>
              <a
                href="/admin/materials"
                className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-primary" />
                  <span>إدارة المواد</span>
                </div>
              </a>
              <a
                href="/admin/categories"
                className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Grid3x3 className="w-5 h-5 text-primary" />
                  <span>إدارة التصنيفات</span>
                </div>
              </a>
              <a
                href="/admin/projects"
                className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FolderOpen className="w-5 h-5 text-primary" />
                  <span>عرض جميع المشاريع</span>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
