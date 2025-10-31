import express from 'express';
import db from '../db/index.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Create admin user (temp - works with lowdb)
router.post('/create-admin-temp', async (req, res) => {
  try {
    // Check if admin already exists
    const existingAdmin = db.data.users.find(u => u.email === 'admin@admin.com');
    
    if (existingAdmin) {
      // Update existing user to admin
      existingAdmin.role = 'admin';
      await db.write();
      
      return res.json({ 
        success: true, 
        message: 'تم تحديث المستخدم إلى مدير',
        credentials: {
          email: 'admin@admin.com',
          password: 'استخدم كلمة المرور التي سجلت بها'
        }
      });
    }

    // Create new admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = {
      id: db.data.users.length + 1,
      email: 'admin@admin.com',
      password: hashedPassword,
      name: 'المدير',
      role: 'admin',
      created_at: new Date().toISOString()
    };

    db.data.users.push(admin);
    await db.write();

    res.json({ 
      success: true, 
      message: 'تم إنشاء حساب المدير بنجاح',
      credentials: {
        email: 'admin@admin.com',
        password: 'admin123'
      }
    });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
