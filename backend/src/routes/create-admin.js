import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Create admin user (one-time use)
router.post('/create-admin', async (req, res) => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findByEmail('admin@admin.com');
    
    if (existingAdmin) {
      return res.json({ 
        success: false, 
        message: 'المدير موجود بالفعل',
        email: 'admin@admin.com'
      });
    }

    // Create admin user
    const admin = await User.create({
      email: 'admin@admin.com',
      password: 'admin123',
      name: 'المدير',
      role: 'admin',
      specialties: []
    });

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
