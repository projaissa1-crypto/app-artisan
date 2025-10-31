import express from 'express';
import db from '../config/database.js';

const router = express.Router();

router.post('/seed', async (req, res) => {
  try {
    console.log('🌱 Seeding database...');

    // Create categories
    const categories = [
      { name: 'نجارة', description: 'أعمال النجارة والخشب' },
      { name: 'حدادة', description: 'أعمال الحديد والمعادن' },
      { name: 'كهرباء', description: 'التركيبات الكهربائية' },
      { name: 'سباكة', description: 'أعمال السباكة والصرف' },
      { name: 'دهان', description: 'أعمال الدهان والديكور' },
      { name: 'بناء', description: 'أعمال البناء والتشييد' },
    ];

    const categoryIds = [];
    for (const cat of categories) {
      const result = db.prepare(
        'INSERT OR IGNORE INTO categories (name, description) VALUES (?, ?)'
      ).run(cat.name, cat.description);
      categoryIds.push(result.lastInsertRowid);
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

    for (const mat of materials) {
      db.prepare(
        'INSERT OR IGNORE INTO materials (name, unit, quantity, price) VALUES (?, ?, ?, ?)'
      ).run(mat.name, mat.unit, mat.quantity, mat.price);
    }

    res.json({ 
      success: true, 
      message: 'تم إضافة البيانات التجريبية بنجاح',
      data: {
        categories: categories.length,
        materials: materials.length
      }
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
