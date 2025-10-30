import apiClient from './client';
import { Material } from './materials';

export interface ProjectItem {
  id?: string;
  materialId: string;
  quantity: number;
  unit: string;
  customPrice?: number;
  material?: Material;
}

export interface Project {
  id: string;
  userId: string;
  nameAr: string;
  nameFr: string;
  descriptionAr?: string;
  descriptionFr?: string;
  clientName?: string;
  clientPhone?: string;
  clientAddress?: string;
  items: ProjectItem[];
  status: 'draft' | 'submitted' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectData {
  nameAr: string;
  nameFr: string;
  descriptionAr?: string;
  descriptionFr?: string;
  clientName?: string;
  clientPhone?: string;
  clientAddress?: string;
  items?: ProjectItem[];
}

export const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    const { data } = await apiClient.get('/projects');
    return data;
  },

  getById: async (id: string): Promise<Project> => {
    const { data } = await apiClient.get(`/projects/${id}`);
    return data;
  },

  getDetails: async (id: string): Promise<Project> => {
    const { data } = await apiClient.get(`/projects/${id}/details`);
    return data;
  },

  create: async (projectData: CreateProjectData): Promise<Project> => {
    const { data } = await apiClient.post('/projects', projectData);
    return data;
  },

  update: async (id: string, projectData: Partial<CreateProjectData>): Promise<Project> => {
    const { data } = await apiClient.put(`/projects/${id}`, projectData);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/projects/${id}`);
  },

  addItem: async (projectId: string, item: Omit<ProjectItem, 'id'>): Promise<Project> => {
    const { data } = await apiClient.post(`/projects/${projectId}/items`, item);
    return data;
  },

  updateItem: async (projectId: string, itemId: string, item: Partial<ProjectItem>): Promise<Project> => {
    const { data } = await apiClient.put(`/projects/${projectId}/items/${itemId}`, item);
    return data;
  },

  removeItem: async (projectId: string, itemId: string): Promise<Project> => {
    const { data } = await apiClient.delete(`/projects/${projectId}/items/${itemId}`);
    return data;
  },

  exportJSON: async (id: string): Promise<Blob> => {
    const { data } = await apiClient.get(`/projects/${id}/export/json`, {
      responseType: 'blob',
    });
    return data;
  },

  exportCSV: async (id: string): Promise<Blob> => {
    const { data } = await apiClient.get(`/projects/${id}/export/csv`, {
      responseType: 'blob',
    });
    return data;
  },
};
