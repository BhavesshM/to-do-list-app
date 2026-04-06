import { Router, Request, Response } from 'express';
import { CategoryModel } from '../models/Category';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, color } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const id = await CategoryModel.create(name, color || '#3B82F6');
    return res.status(201).json({ id, name, color: color || '#3B82F6' });
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Category already exists' });
    }
    console.error('Create category error:', error);
    return res.status(500).json({ error: 'Failed to create category' });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.getAll();
    return res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    return res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idNum = Array.isArray(id) ? parseInt(id[0]) : parseInt(id);
    const category = await CategoryModel.getById(idNum);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    return res.json(category);
  } catch (error) {
    console.error('Get category error:', error);
    return res.status(500).json({ error: 'Failed to fetch category' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idNum = Array.isArray(id) ? parseInt(id[0]) : parseInt(id);
    const success = await CategoryModel.delete(idNum);

    if (!success) {
      return res.status(404).json({ error: 'Category not found' });
    }

    return res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete category error:', error);
    return res.status(500).json({ error: 'Failed to delete category' });
  }
});

export default router;
