import db from '../db/index.js';

class Project {
  static async create(projectData) {
    const {
      userId,
      nameAr,
      nameFr,
      descriptionAr,
      descriptionFr,
      clientName,
      clientPhone,
      clientAddress,
      items = [] // Array of { materialId, quantity, unit, customPrice }
    } = projectData;
    
    const project = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      userId,
      nameAr,
      nameFr,
      descriptionAr: descriptionAr || null,
      descriptionFr: descriptionFr || null,
      clientName: clientName || null,
      clientPhone: clientPhone || null,
      clientAddress: clientAddress || null,
      items, // Each item: { materialId, quantity, unit, customPrice }
      status: 'draft', // draft, submitted, completed
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    db.data.projects.push(project);
    await db.write();
    return project;
  }
  
  static async findById(id) {
    return db.data.projects.find(p => p.id === id);
  }
  
  static async getAll() {
    return db.data.projects;
  }
  
  static async getByUserId(userId) {
    return db.data.projects.filter(p => p.userId === userId);
  }
  
  static async update(id, updates) {
    const index = db.data.projects.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    db.data.projects[index] = {
      ...db.data.projects[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    await db.write();
    return db.data.projects[index];
  }
  
  static async delete(id) {
    const index = db.data.projects.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    db.data.projects.splice(index, 1);
    await db.write();
    return true;
  }
  
  static async addItem(projectId, item) {
    const project = await this.findById(projectId);
    if (!project) return null;
    
    project.items.push({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      ...item
    });
    
    return this.update(projectId, { items: project.items });
  }
  
  static async updateItem(projectId, itemId, updates) {
    const project = await this.findById(projectId);
    if (!project) return null;
    
    const itemIndex = project.items.findIndex(i => i.id === itemId);
    if (itemIndex === -1) return null;
    
    project.items[itemIndex] = {
      ...project.items[itemIndex],
      ...updates
    };
    
    return this.update(projectId, { items: project.items });
  }
  
  static async removeItem(projectId, itemId) {
    const project = await this.findById(projectId);
    if (!project) return null;
    
    project.items = project.items.filter(i => i.id !== itemId);
    return this.update(projectId, { items: project.items });
  }
}

export default Project;
