import apiClient from './client';
import { User } from './auth';

export type { User };

export interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  specialty?: string;
  role?: 'admin' | 'artisan';
}

export const usersApi = {
  getAll: async (): Promise<User[]> => {
    const { data } = await apiClient.get('/users');
    return data;
  },

  getMe: async (): Promise<User> => {
    const { data } = await apiClient.get('/users/me');
    return data;
  },

  getById: async (id: string): Promise<User> => {
    const { data } = await apiClient.get(`/users/${id}`);
    return data;
  },

  update: async (id: string, userData: UpdateUserData): Promise<User> => {
    const { data } = await apiClient.put(`/users/${id}`, userData);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },
};
