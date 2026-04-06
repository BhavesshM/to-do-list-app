import { Router, Request, Response } from 'express';
import { TagModel } from '../models/Tag';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Tag name is required' });
    }

    const id = await TagModel.create(name);
    return res.status(201).json({ id, name });
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Tag already exists' });
    }
    console.error('Create tag error:', error);
    return res.status(500).json({ error: 'Failed to create tag' });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const tags = await TagModel.getAll();
    return res.json(tags);
  } catch (error) {
    console.error('Get tags error:', error);
    return res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idNum = Array.isArray(id) ? parseInt(id[0]) : parseInt(id);
    const tag = await TagModel.getById(idNum);

    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    return res.json(tag);
  } catch (error) {
    console.error('Get tag error:', error);
    return res.status(500).json({ error: 'Failed to fetch tag' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idNum = Array.isArray(id) ? parseInt(id[0]) : parseInt(id);
    const success = await TagModel.delete(idNum);

    if (!success) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    return res.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    console.error('Delete tag error:', error);
    return res.status(500).json({ error: 'Failed to delete tag' });
  }
});

router.post('/:todoId/tags/:tagId', async (req: Request, res: Response) => {
  try {
    const { todoId, tagId } = req.params;
    const todoIdNum = Array.isArray(todoId) ? parseInt(todoId[0]) : parseInt(todoId);
    const tagIdNum = Array.isArray(tagId) ? parseInt(tagId[0]) : parseInt(tagId);
    await TagModel.addToTodo(todoIdNum, tagIdNum);
    return res.json({ message: 'Tag added to todo' });
  } catch (error) {
    console.error('Add tag to todo error:', error);
    return res.status(500).json({ error: 'Failed to add tag' });
  }
});

router.delete('/:todoId/tags/:tagId', async (req: Request, res: Response) => {
  try {
    const { todoId, tagId } = req.params;
    const todoIdNum = Array.isArray(todoId) ? parseInt(todoId[0]) : parseInt(todoId);
    const tagIdNum = Array.isArray(tagId) ? parseInt(tagId[0]) : parseInt(tagId);
    await TagModel.removeFromTodo(todoIdNum, tagIdNum);
    return res.json({ message: 'Tag removed from todo' });
  } catch (error) {
    console.error('Remove tag from todo error:', error);
    return res.status(500).json({ error: 'Failed to remove tag' });
  }
});

export default router;
