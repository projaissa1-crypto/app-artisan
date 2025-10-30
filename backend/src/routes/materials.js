import express from 'express';
import { body, validationResult } from 'express-validator';
import Material from '../models/Material.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get all materials
router.get('/', authenticate, async (req, res) => {
  try {
    const { categoryId, search, lang } = req.query;
    
    let materials;
    if (search) {
      materials = await Material.search(search, lang);
    } else if (categoryId) {
      materials = await Material.getByCategoryId(categoryId);
    } else {
      materials = await Material.getAll();
    }
    
    res.json(materials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get material by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }
    res.json(material);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create material (Admin only)
router.post('/',
  authenticate,
  authorize('admin'),
  [
    body('categoryId').notEmpty(),
    body('nameAr').notEmpty().trim(),
    body('nameFr').notEmpty().trim(),
    body('unit').notEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
      const material = await Material.create(req.body);
      res.status(201).json(material);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Update material (Admin only)
router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const material = await Material.update(req.params.id, req.body);
    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }
    res.json(material);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete material (Admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const deleted = await Material.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Material not found' });
    }
    res.json({ message: 'Material deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
