import db from '../db/index.js';

class Category {
  static async create(categoryData) {
    const { nameAr, nameFr, descriptionAr, descriptionFr, parentId = null } = categoryData;
    
    const category = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      nameAr,
      nameFr,
      descriptionAr: descriptionAr || null,
      descriptionFr: descriptionFr || null,
      parentId, // For subcategories
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    db.data.categories.push(category);
    await db.write();
    return category;
  }
  
  static async findById(id) {
    return db.data.categories.find(c => c.id === id);
  }
  
  static async getAll() {
    return db.data.categories;
  }
  
  static async getByParentId(parentId) {
    return db.data.categories.filter(c => c.parentId === parentId);
  }
  
  static async update(id, updates) {
    const index = db.data.categories.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    db.data.categories[index] = {
      ...db.data.categories[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    await db.write();
    return db.data.categories[index];
  }
  
  static async delete(id) {
    const index = db.data.categories.findIndex(c => c.id === id);
    if (index === -1) return false;
    
    // Check if category has materials
    const hasMaterials = db.data.materials.some(m => m.categoryId === id);
    if (hasMaterials) {
      throw new Error('Cannot delete category with materials');
    }
    
    // Delete subcategories
    db.data.categories = db.data.categories.filter(c => c.parentId !== id && c.id !== id);
    await db.write();
    return true;
  }
}

export default Category;
