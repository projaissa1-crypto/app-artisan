import apiClient from './client';

export interface Category {
  id: string;
  nameAr: string;
  nameFr: string;
  descriptionAr?: string;
  descriptionFr?: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryData {
  nameAr: string;
  nameFr: string;
  descriptionAr?: string;
  descriptionFr?: string;
  parentId?: string;
}

export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    const { data } = await apiClient.get('/categories');
    return data;
  },

  getById: async (id: string): Promise<Category> => {
    const { data } = await apiClient.get(`/categories/${id}`);
    return data;
  },

  getSubcategories: async (id: string): Promise<Category[]> => {
    const { data } = await apiClient.get(`/categories/${id}/subcategories`);
    return data;
  },

  create: async (categoryData: CreateCategoryData): Promise<Category> => {
    const { data } = await apiClient.post('/categories', categoryData);
    return data;
  },

  update: async (id: string, categoryData: Partial<CreateCategoryData>): Promise<Category> => {
    const { data } = await apiClient.put(`/categories/${id}`, categoryData);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/categories/${id}`);
  },
};
