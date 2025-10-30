'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { projectsApi, Project } from '@/lib/api/projects';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Plus, FileText, Calendar, Trash2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

export default function PortalPage() {
  const router = useRouter();
  const { t, language } = useI18n();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await projectsApi.getAll();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المشروع؟')) return;
    
    try {
      await projectsApi.delete(id);
      loadProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-12">{t('common.loading')}</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{t('portal.myProjects')}</h1>
        <Button
          onClick={() => router.push('/portal/projects/new')}
          className="flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {t('portal.newProject')}
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">لا توجد مشاريع بعد</p>
            <p className="text-sm mt-2">ابدأ بإنشاء مشروعك الأول</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === 'ar' ? project.nameAr : project.nameFr}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {project.descriptionAr && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {language === 'ar' ? project.descriptionAr : project.descriptionFr}
                    </p>
                  )}
                  
                  {project.clientName && (
                    <div className="text-sm">
                      <span className="font-medium">العميل: </span>
                      {project.clientName}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {new Date(project.createdAt).toLocaleDateString('ar-MA')}
                  </div>
                  
                  <div className="text-sm">
                    <span className="font-medium">المواد: </span>
                    {project.items.length}
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      onClick={() => router.push(`/portal/projects/${project.id}`)}
                      className="flex-1"
                    >
                      عرض
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(project.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
