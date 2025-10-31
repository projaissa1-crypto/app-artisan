import express from 'express';
import db from '../config/database.js';

const router = express.Router();

router.post('/seed', async (req, res) => {
  try {
    console.log('🌱 Seeding database...');

    // Check if already seeded
    const existingCategories = db.prepare('SELECT COUNT(*) as count FROM categories').get();
    if (existingCategories.count > 0) {
      return res.json({ 
        success: true, 
        message: 'البيانات موجودة بالفعل',
        data: {
          categories: existingCategories.count,
          materials: db.prepare('SELECT COUNT(*) as count FROM materials').get().count
        }
      });
    }

    // Create categories
    const categories = [
      { name: 'نجارة', description: 'أعمال النجارة والخشب' },
      { name: 'حدادة', description: 'أعمال الحديد والمعادن' },
      { name: 'كهرباء', description: 'التركيبات الكهربائية' },
      { name: 'سباكة', description: 'أعمال السباكة والصرف' },
      { name: 'دهان', description: 'أعمال الدهان والديكور' },
      { name: 'بناء', description: 'أعمال البناء والتشييد' },
    ];

    let addedCategories = 0;
    for (const cat of categories) {
      try {
        db.prepare(
          'INSERT INTO categories (name, description) VALUES (?, ?)'
        ).run(cat.name, cat.description);
        addedCategories++;
      } catch (e) {
        console.log(`Category ${cat.name} already exists`);
      }
    }

    // Create materials
    const materials = [
      { name: 'خشب', unit: 'متر', quantity: 50, price: 150 },
      { name: 'حديد', unit: 'كيلو', quantity: 100, price: 25 },
      { name: 'أسمنت', unit: 'كيس', quantity: 30, price: 45 },
      { name: 'دهان', unit: 'لتر', quantity: 20, price: 80 },
      { name: 'أسلاك كهربائية', unit: 'متر', quantity: 200, price: 5 },
      { name: 'مواسير', unit: 'متر', quantity: 40, price: 35 },
    ];

    let addedMaterials = 0;
    for (const mat of materials) {
      try {
        db.prepare(
          'INSERT INTO materials (name, unit, quantity, price) VALUES (?, ?, ?, ?)'
        ).run(mat.name, mat.unit, mat.quantity, mat.price);
        addedMaterials++;
      } catch (e) {
        console.log(`Material ${mat.name} already exists`);
      }
    }

    res.json({ 
      success: true, 
      message: 'تم إضافة البيانات التجريبية بنجاح',
      data: {
        categories: addedCategories,
        materials: addedMaterials
      }
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
