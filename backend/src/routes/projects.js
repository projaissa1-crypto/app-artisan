import express from 'express';
import { body, validationResult } from 'express-validator';
import Project from '../models/Project.js';
import Material from '../models/Material.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get all projects
router.get('/', authenticate, async (req, res) => {
  try {
    let projects;
    
    if (req.user.role === 'admin') {
      projects = await Project.getAll();
    } else {
      projects = await Project.getByUserId(req.user.id);
    }
    
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get project by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Check access
    if (req.user.role !== 'admin' && project.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get project with populated materials
router.get('/:id/details', authenticate, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Check access
    if (req.user.role !== 'admin' && project.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    // Populate materials
    const itemsWithDetails = await Promise.all(
      project.items.map(async (item) => {
        const material = await Material.findById(item.materialId);
        return {
          ...item,
          material
        };
      })
    );
    
    res.json({
      ...project,
      items: itemsWithDetails
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create project
router.post('/',
  authenticate,
  [
    body('nameAr').notEmpty().trim(),
    body('nameFr').notEmpty().trim()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
      const projectData = {
        ...req.body,
        userId: req.user.id
      };
      
      const project = await Project.create(projectData);
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Update project
router.put('/:id', authenticate, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Check access
    if (req.user.role !== 'admin' && project.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const updated = await Project.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete project
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Check access
    if (req.user.role !== 'admin' && project.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const deleted = await Project.delete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add item to project
router.post('/:id/items', authenticate, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Check access
    if (req.user.role !== 'admin' && project.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const updated = await Project.addItem(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update project item
router.put('/:id/items/:itemId', authenticate, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Check access
    if (req.user.role !== 'admin' && project.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const updated = await Project.updateItem(req.params.id, req.params.itemId, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove item from project
router.delete('/:id/items/:itemId', authenticate, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Check access
    if (req.user.role !== 'admin' && project.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const updated = await Project.removeItem(req.params.id, req.params.itemId);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export project as JSON
router.get('/:id/export/json', authenticate, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Check access
    if (req.user.role !== 'admin' && project.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    // Populate materials
    const itemsWithDetails = await Promise.all(
      project.items.map(async (item) => {
        const material = await Material.findById(item.materialId);
        return {
          ...item,
          material
        };
      })
    );
    
    const exportData = {
      ...project,
      items: itemsWithDetails
    };
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=project-${project.id}.json`);
    res.json(exportData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export project as CSV
router.get('/:id/export/csv', authenticate, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Check access
    if (req.user.role !== 'admin' && project.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    // Populate materials
    const itemsWithDetails = await Promise.all(
      project.items.map(async (item) => {
        const material = await Material.findById(item.materialId);
        return {
          ...item,
          material
        };
      })
    );
    
    // Generate CSV
    const headers = 'Material Name (AR),Material Name (FR),Quantity,Unit,Price,Total\n';
    const rows = itemsWithDetails.map(item => {
      const price = item.customPrice || item.material?.defaultPrice || 0;
      const total = item.quantity * price;
      return `"${item.material?.nameAr || ''}","${item.material?.nameFr || ''}",${item.quantity},${item.unit},${price},${total}`;
    }).join('\n');
    
    const csv = headers + rows;
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=project-${project.id}.csv`);
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
