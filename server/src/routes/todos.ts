import { Router, Request, Response } from 'express';
import { TodoModel, Todo } from '../models/Todo';
import { TagModel } from '../models/Tag';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, status, priority, due_date, category } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const todo: Todo = {
      title,
      description: description || undefined,
      status: status || 'pending',
      priority: priority || 'medium',
      due_date: due_date || undefined,
      category: category || undefined,
    };

    const id = await TodoModel.create(todo);
    return res.status(201).json({ id, ...todo });
  } catch (error) {
    console.error('Create todo error:', error);
    return res.status(500).json({ error: 'Failed to create todo' });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const status = req.query.status as any;
    const priority = req.query.priority as any;
    const category = req.query.category as any;
    const filter = {
      status: Array.isArray(status) ? status[0] : (typeof status === 'string' ? status : undefined),
      priority: Array.isArray(priority) ? priority[0] : (typeof priority === 'string' ? priority : undefined),
      category: Array.isArray(category) ? category[0] : (typeof category === 'string' ? category : undefined),
    };

    const todos = await TodoModel.getAll(filter);
    return res.json(todos);
  } catch (error) {
    console.error('Get todos error:', error);
    return res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

router.get('/search', async (req: Request, res: Response) => {
  try {
    const q = req.query.q as any;

    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const query = Array.isArray(q) ? q[0] : (typeof q === 'string' ? q : '');
    const todos = await TodoModel.search(query);
    return res.json(todos);
  } catch (error) {
    console.error('Search todos error:', error);
    return res.status(500).json({ error: 'Failed to search todos' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idNum = Array.isArray(id) ? parseInt(id[0]) : parseInt(id);
    const todo = await TodoModel.getById(idNum);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const tags = await TagModel.getTodoTags(idNum);
    return res.json({ ...todo, tags });
  } catch (error) {
    console.error('Get todo error:', error);
    return res.status(500).json({ error: 'Failed to fetch todo' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idNum = Array.isArray(id) ? parseInt(id[0]) : parseInt(id);
    const updates = req.body;

    const success = await TodoModel.update(idNum, updates);

    if (!success) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const updatedTodo = await TodoModel.getById(idNum);
    return res.json(updatedTodo);
  } catch (error) {
    console.error('Update todo error:', error);
    return res.status(500).json({ error: 'Failed to update todo' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idNum = Array.isArray(id) ? parseInt(id[0]) : parseInt(id);
    const success = await TodoModel.delete(idNum);

    if (!success) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    return res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Delete todo error:', error);
    return res.status(500).json({ error: 'Failed to delete todo' });
  }
});

router.patch('/:id/complete', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idNum = Array.isArray(id) ? parseInt(id[0]) : parseInt(id);
    const newStatus = req.body.status || 'completed';

    const success = await TodoModel.update(idNum, { status: newStatus as 'pending' | 'completed' });

    if (!success) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const updatedTodo = await TodoModel.getById(idNum);
    return res.json(updatedTodo);
  } catch (error) {
    console.error('Complete todo error:', error);
    return res.status(500).json({ error: 'Failed to complete todo' });
  }
});

export default router;
