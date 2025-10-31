import express from 'express';
import db from '../config/database.js';

const router = express.Router();

// Get all specialties
router.get('/', (req, res) => {
  try {
    const specialties = db.prepare('SELECT * FROM specialties ORDER BY name').all();
    res.json(specialties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create specialty (Admin only)
router.post('/', (req, res) => {
  try {
    const { name, description, icon } = req.body;
    
    const result = db.prepare(
      'INSERT INTO specialties (name, description, icon) VALUES (?, ?, ?)'
    ).run(name, description, icon || null);
    
    const specialty = db.prepare('SELECT * FROM specialties WHERE id = ?').get(result.lastInsertRowid);
    
    res.status(201).json(specialty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
