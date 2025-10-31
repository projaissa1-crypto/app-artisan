import express from 'express';
import db from '../db/index.js';

const router = express.Router();

router.post('/seed-temp', async (req, res) => {
  try {
    console.log('🌱 Seeding database (temp)...');

    // Check if already seeded
    if (db.data.categories && db.data.categories.length > 0) {
      return res.json({ 
        success: true, 
        message: 'البيانات موجودة بالفعل',
        data: {
          categories: db.data.categories.length,
          materials: db.data.materials.length
        }
      });
    }

    // Create categories
    const categories = [
      { id: 1, name: 'نجارة', description: 'أعمال النجارة والخشب' },
      { id: 2, name: 'حدادة', description: 'أعمال الحديد والمعادن' },
      { id: 3, name: 'كهرباء', description: 'التركيبات الكهربائية' },
      { id: 4, name: 'سباكة', description: 'أعمال السباكة والصرف' },
      { id: 5, name: 'دهان', description: 'أعمال الدهان والديكور' },
      { id: 6, name: 'بناء', description: 'أعمال البناء والتشييد' },
    ];

    // Create materials
    const materials = [
      { id: 1, name: 'خشب', unit: 'متر', quantity: 50, price: 150 },
      { id: 2, name: 'حديد', unit: 'كيلو', quantity: 100, price: 25 },
      { id: 3, name: 'أسمنت', unit: 'كيس', quantity: 30, price: 45 },
      { id: 4, name: 'دهان', unit: 'لتر', quantity: 20, price: 80 },
      { id: 5, name: 'أسلاك كهربائية', unit: 'متر', quantity: 200, price: 5 },
      { id: 6, name: 'مواسير', unit: 'متر', quantity: 40, price: 35 },
    ];

    db.data.categories = categories;
    db.data.materials = materials;
    await db.write();

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
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
