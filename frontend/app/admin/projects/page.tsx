'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { projectsApi, Project } from '@/lib/api/projects';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Eye, Calendar, User } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

export default function AdminProjectsPage() {
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

  if (loading) {
    return <div className="text-center py-12">{t('common.loading')}</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{t('admin.projects')}</h1>
        <div className="text-sm text-gray-600">
          إجمالي المشاريع: <span className="font-bold">{projects.length}</span>
        </div>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            لا توجد مشاريع بعد
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">
                      {language === 'ar' ? project.nameAr : project.nameFr}
                    </h3>
                    
                    {project.descriptionAr && (
                      <p className="text-sm text-gray-600 mb-3">
                        {language === 'ar' ? project.descriptionAr : project.descriptionFr}
                      </p>
                    )}

                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      {project.clientName && (
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">العميل:</span>
                          <span className="font-medium">{project.clientName}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">التاريخ:</span>
                        <span className="font-medium">
                          {new Date(project.createdAt).toLocaleDateString('ar-MA')}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">المواد:</span>
                        <span className="font-medium">{project.items.length}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        project.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                        project.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {project.status === 'draft' ? 'مسودة' :
                         project.status === 'submitted' ? 'مقدم' : 'مكتمل'}
                      </span>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => router.push(`/portal/projects/${project.id}`)}
                    className="flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    عرض
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
