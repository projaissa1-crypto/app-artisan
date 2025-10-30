import db from '../db/index.js';

class Material {
  static async create(materialData) {
    const {
      categoryId,
      nameAr,
      nameFr,
      descriptionAr,
      descriptionFr,
      unit, // e.g., 'piece', 'meter', 'kg'
      defaultPrice,
      sku,
      imageUrl
    } = materialData;
    
    const material = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      categoryId,
      nameAr,
      nameFr,
      descriptionAr: descriptionAr || null,
      descriptionFr: descriptionFr || null,
      unit,
      defaultPrice: defaultPrice || null,
      sku: sku || null,
      imageUrl: imageUrl || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    db.data.materials.push(material);
    await db.write();
    return material;
  }
  
  static async findById(id) {
    return db.data.materials.find(m => m.id === id);
  }
  
  static async getAll() {
    return db.data.materials;
  }
  
  static async getByCategoryId(categoryId) {
    return db.data.materials.filter(m => m.categoryId === categoryId);
  }
  
  static async search(query, lang = 'ar') {
    const searchField = lang === 'ar' ? 'nameAr' : 'nameFr';
    return db.data.materials.filter(m => 
      m[searchField].toLowerCase().includes(query.toLowerCase())
    );
  }
  
  static async update(id, updates) {
    const index = db.data.materials.findIndex(m => m.id === id);
    if (index === -1) return null;
    
    db.data.materials[index] = {
      ...db.data.materials[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    await db.write();
    return db.data.materials[index];
  }
  
  static async delete(id) {
    const index = db.data.materials.findIndex(m => m.id === id);
    if (index === -1) return false;
    
    db.data.materials.splice(index, 1);
    await db.write();
    return true;
  }
}

export default Material;
