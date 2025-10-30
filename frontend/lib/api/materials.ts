import apiClient from './client';

export interface Material {
  id: string;
  categoryId: string;
  nameAr: string;
  nameFr: string;
  descriptionAr?: string;
  descriptionFr?: string;
  unit: string;
  defaultPrice?: number;
  sku?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMaterialData {
  categoryId: string;
  nameAr: string;
  nameFr: string;
  descriptionAr?: string;
  descriptionFr?: string;
  unit: string;
  defaultPrice?: number;
  sku?: string;
  imageUrl?: string;
}

export const materialsApi = {
  getAll: async (params?: { categoryId?: string; search?: string; lang?: string }): Promise<Material[]> => {
    const { data } = await apiClient.get('/materials', { params });
    return data;
  },

  getById: async (id: string): Promise<Material> => {
    const { data } = await apiClient.get(`/materials/${id}`);
    return data;
  },

  create: async (materialData: CreateMaterialData): Promise<Material> => {
    const { data } = await apiClient.post('/materials', materialData);
    return data;
  },

  update: async (id: string, materialData: Partial<CreateMaterialData>): Promise<Material> => {
    const { data } = await apiClient.put(`/materials/${id}`, materialData);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/materials/${id}`);
  },
};
