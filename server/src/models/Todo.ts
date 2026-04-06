import { pool } from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export interface Todo {
  id?: number;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  priority: 'low' | 'medium' | 'high';
  due_date?: string;
  category?: string;
  created_at?: string;
  updated_at?: string;
}

export class TodoModel {
  static async create(todo: Todo): Promise<number> {
    const { title, description, status, priority, due_date, category } = todo;
    const query = `
      INSERT INTO todos (title, description, status, priority, due_date, category)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute<ResultSetHeader>(query, [
      title,
      description || null,
      status,
      priority,
      due_date || null,
      category || null,
    ]);
    return result.insertId;
  }

  static async getAll(
    filter?: { status?: string; priority?: string; category?: string }
  ): Promise<Todo[]> {
    let query = 'SELECT * FROM todos';
    const params: (string | null | undefined)[] = [];

    if (filter) {
      const conditions = [];
      if (filter.status) {
        conditions.push('status = ?');
        params.push(filter.status);
      }
      if (filter.priority) {
        conditions.push('priority = ?');
        params.push(filter.priority);
      }
      if (filter.category) {
        conditions.push('category = ?');
        params.push(filter.category);
      }
      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }
    }

    query += ' ORDER BY due_date ASC, priority DESC';
    const [rows] = await pool.execute<RowDataPacket[]>(query, params as any);
    return rows as Todo[];
  }

  static async getById(id: number): Promise<Todo | null> {
    const query = 'SELECT * FROM todos WHERE id = ?';
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
    return (rows[0] as Todo) || null;
  }

  static async update(id: number, todo: Partial<Todo>): Promise<boolean> {
    const allowedFields = ['title', 'description', 'status', 'priority', 'due_date', 'category'];
    const updates: string[] = [];
    const params: (string | number | null | undefined)[] = [];

    for (const [key, value] of Object.entries(todo)) {
      if (allowedFields.includes(key)) {
        updates.push(`${key} = ?`);
        params.push(value);
      }
    }

    if (updates.length === 0) return false;

    params.push(id);
    const query = `UPDATE todos SET ${updates.join(', ')} WHERE id = ?`;
    const [result] = await pool.execute<ResultSetHeader>(query, params as any);
    return result.affectedRows > 0;
  }

  static async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM todos WHERE id = ?';
    const [result] = await pool.execute<ResultSetHeader>(query, [id]);
    return result.affectedRows > 0;
  }

  static async search(query: string): Promise<Todo[]> {
    const searchQuery = `
      SELECT * FROM todos
      WHERE title LIKE ? OR description LIKE ?
      ORDER BY due_date ASC, priority DESC
    `;
    const searchTerm = `%${query}%`;
    const [rows] = await pool.execute<RowDataPacket[]>(searchQuery, [searchTerm, searchTerm]);
    return rows as Todo[];
  }
}
