import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database(path.join(__dirname, '../database.sqlite'));

async function seed() {
  console.log('🌱 Seeding database...');

  try {
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
        'INSERT INTO categories (name, description) VALUES (?, ?)'
      ).run(cat.name, cat.description);
      categoryIds.push(result.lastInsertRowid);
      console.log(`✅ Created category: ${cat.name}`);
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
        'INSERT INTO materials (name, unit, quantity, price) VALUES (?, ?, ?, ?)'
      ).run(mat.name, mat.unit, mat.quantity, mat.price);
      console.log(`✅ Created material: ${mat.name}`);
    }

    console.log('✅ Seed completed successfully!');
  } catch (error) {
    console.error('❌ Seed failed:', error);
  } finally {
    db.close();
  }
}

seed();
