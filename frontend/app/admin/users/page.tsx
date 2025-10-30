'use client';

import { useState, useEffect } from 'react';
import { usersApi, User } from '@/lib/api/users';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Trash2, Shield, User as UserIcon } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

export default function UsersPage() {
  const { t } = useI18n();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await usersApi.getAll();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return;
    
    try {
      await usersApi.delete(id);
      loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-12">{t('common.loading')}</div>;
  }

  const admins = users.filter((u) => u.role === 'admin');
  const artisans = users.filter((u) => u.role === 'artisan');

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{t('admin.users')}</h1>
        <div className="text-sm text-gray-600">
          إجمالي المستخدمين: <span className="font-bold">{users.length}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-500" />
              المديرين ({admins.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {admins.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 bg-blue-50 rounded-md"
                >
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                    {user.phone && (
                      <div className="text-xs text-gray-500 mt-1">{user.phone}</div>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-green-500" />
              الحرفيين ({artisans.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {artisans.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 bg-green-50 rounded-md"
                >
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                    {user.phone && (
                      <div className="text-xs text-gray-500 mt-1">{user.phone}</div>
                    )}
                    {user.specialty && (
                      <div className="text-xs text-green-600 mt-1">
                        التخصص: {user.specialty}
                      </div>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
