import db from '../db/index.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Material from '../models/Material.js';

async function seed() {
  console.log('🌱 Starting database seeding...');
  
  try {
    // Clear existing data
    db.data = {
      users: [],
      categories: [],
      materials: [],
      projects: []
    };
    await db.write();
    
    // Create admin user
    console.log('Creating admin user...');
    const admin = await User.create({
      email: 'admin@artisan.ma',
      password: 'admin123',
      name: 'Administrator',
      role: 'admin'
    });
    console.log('✓ Admin created:', admin.email);
    
    // Create artisan user
    console.log('Creating artisan user...');
    const artisan = await User.create({
      email: 'artisan@artisan.ma',
      password: 'artisan123',
      name: 'Mohammed El Fassi',
      role: 'artisan',
      phone: '+212600000000',
      specialty: 'electrician-residential'
    });
    console.log('✓ Artisan created:', artisan.email);
    
    // Create categories
    console.log('Creating categories...');
    
    const electricalCategory = await Category.create({
      nameAr: 'المعدات الكهربائية',
      nameFr: 'Équipement électrique',
      descriptionAr: 'جميع المعدات والأدوات الكهربائية',
      descriptionFr: 'Tous les équipements et outils électriques'
    });
    console.log('✓ Category created:', electricalCategory.nameFr);
    
    const cablesCategory = await Category.create({
      nameAr: 'الكابلات والأسلاك',
      nameFr: 'Câbles et fils',
      descriptionAr: 'كابلات وأسلاك كهربائية',
      descriptionFr: 'Câbles et fils électriques',
      parentId: electricalCategory.id
    });
    console.log('✓ Subcategory created:', cablesCategory.nameFr);
    
    const switchesCategory = await Category.create({
      nameAr: 'المفاتيح والمقابس',
      nameFr: 'Interrupteurs et prises',
      descriptionAr: 'مفاتيح ومقابس كهربائية',
      descriptionFr: 'Interrupteurs et prises électriques',
      parentId: electricalCategory.id
    });
    console.log('✓ Subcategory created:', switchesCategory.nameFr);
    
    const lightingCategory = await Category.create({
      nameAr: 'الإضاءة',
      nameFr: 'Éclairage',
      descriptionAr: 'معدات الإضاءة',
      descriptionFr: 'Équipement d\'éclairage',
      parentId: electricalCategory.id
    });
    console.log('✓ Subcategory created:', lightingCategory.nameFr);
    
    // Create materials
    console.log('Creating materials...');
    
    const materials = [
      // Cables
      {
        categoryId: cablesCategory.id,
        nameAr: 'كابل كهربائي 2.5 مم²',
        nameFr: 'Câble électrique 2.5 mm²',
        descriptionAr: 'كابل نحاسي معزول للاستخدام المنزلي',
        descriptionFr: 'Câble en cuivre isolé pour usage domestique',
        unit: 'meter',
        defaultPrice: 8.5,
        sku: 'CAB-2.5MM'
      },
      {
        categoryId: cablesCategory.id,
        nameAr: 'كابل كهربائي 1.5 مم²',
        nameFr: 'Câble électrique 1.5 mm²',
        descriptionAr: 'كابل نحاسي معزول للإضاءة',
        descriptionFr: 'Câble en cuivre isolé pour éclairage',
        unit: 'meter',
        defaultPrice: 6.0,
        sku: 'CAB-1.5MM'
      },
      {
        categoryId: cablesCategory.id,
        nameAr: 'كابل كهربائي 4 مم²',
        nameFr: 'Câble électrique 4 mm²',
        descriptionAr: 'كابل نحاسي معزول للأحمال الثقيلة',
        descriptionFr: 'Câble en cuivre isolé pour charges lourdes',
        unit: 'meter',
        defaultPrice: 12.0,
        sku: 'CAB-4MM'
      },
      // Switches and sockets
      {
        categoryId: switchesCategory.id,
        nameAr: 'مفتاح بسيط',
        nameFr: 'Interrupteur simple',
        descriptionAr: 'مفتاح كهربائي بسيط أبيض',
        descriptionFr: 'Interrupteur électrique simple blanc',
        unit: 'piece',
        defaultPrice: 15.0,
        sku: 'SW-SIMPLE'
      },
      {
        categoryId: switchesCategory.id,
        nameAr: 'مفتاح مزدوج',
        nameFr: 'Interrupteur double',
        descriptionAr: 'مفتاح كهربائي مزدوج أبيض',
        descriptionFr: 'Interrupteur électrique double blanc',
        unit: 'piece',
        defaultPrice: 22.0,
        sku: 'SW-DOUBLE'
      },
      {
        categoryId: switchesCategory.id,
        nameAr: 'مقبس كهربائي',
        nameFr: 'Prise électrique',
        descriptionAr: 'مقبس كهربائي 16A',
        descriptionFr: 'Prise électrique 16A',
        unit: 'piece',
        defaultPrice: 18.0,
        sku: 'SOCKET-16A'
      },
      {
        categoryId: switchesCategory.id,
        nameAr: 'مقبس مزدوج',
        nameFr: 'Prise double',
        descriptionAr: 'مقبس كهربائي مزدوج 16A',
        descriptionFr: 'Prise électrique double 16A',
        unit: 'piece',
        defaultPrice: 28.0,
        sku: 'SOCKET-DOUBLE'
      },
      // Lighting
      {
        categoryId: lightingCategory.id,
        nameAr: 'لمبة LED 9W',
        nameFr: 'Ampoule LED 9W',
        descriptionAr: 'لمبة LED موفرة للطاقة 9 واط',
        descriptionFr: 'Ampoule LED économique 9W',
        unit: 'piece',
        defaultPrice: 25.0,
        sku: 'LED-9W'
      },
      {
        categoryId: lightingCategory.id,
        nameAr: 'لمبة LED 12W',
        nameFr: 'Ampoule LED 12W',
        descriptionAr: 'لمبة LED موفرة للطاقة 12 واط',
        descriptionFr: 'Ampoule LED économique 12W',
        unit: 'piece',
        defaultPrice: 32.0,
        sku: 'LED-12W'
      },
      {
        categoryId: lightingCategory.id,
        nameAr: 'سبوت LED قابل للتوجيه',
        nameFr: 'Spot LED orientable',
        descriptionAr: 'سبوت LED قابل للتوجيه 7W',
        descriptionFr: 'Spot LED orientable 7W',
        unit: 'piece',
        defaultPrice: 45.0,
        sku: 'SPOT-LED-7W'
      },
      {
        categoryId: lightingCategory.id,
        nameAr: 'ثريا LED حديثة',
        nameFr: 'Lustre LED moderne',
        descriptionAr: 'ثريا LED حديثة للصالون',
        descriptionFr: 'Lustre LED moderne pour salon',
        unit: 'piece',
        defaultPrice: 350.0,
        sku: 'CHANDELIER-LED'
      }
    ];
    
    for (const materialData of materials) {
      const material = await Material.create(materialData);
      console.log('✓ Material created:', material.nameFr);
    }
    
    console.log('\n✅ Database seeding completed successfully!');
    console.log('\n📝 Login credentials:');
    console.log('Admin: admin@artisan.ma / admin123');
    console.log('Artisan: artisan@artisan.ma / artisan123');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
