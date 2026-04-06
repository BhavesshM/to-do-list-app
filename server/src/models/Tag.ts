import { pool } from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export interface Tag {
  id?: number;
  name: string;
  created_at?: string;
}

export class TagModel {
  static async create(name: string): Promise<number> {
    const query = 'INSERT INTO tags (name) VALUES (?)';
    const [result] = await pool.execute<ResultSetHeader>(query, [name]);
    return result.insertId;
  }

  static async getAll(): Promise<Tag[]> {
    const query = 'SELECT * FROM tags ORDER BY name ASC';
    const [rows] = await pool.execute<RowDataPacket[]>(query);
    return rows as Tag[];
  }

  static async getById(id: number): Promise<Tag | null> {
    const query = 'SELECT * FROM tags WHERE id = ?';
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
    return (rows[0] as Tag) || null;
  }

  static async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM tags WHERE id = ?';
    const [result] = await pool.execute<ResultSetHeader>(query, [id]);
    return result.affectedRows > 0;
  }

  static async addToTodo(todoId: number, tagId: number): Promise<void> {
    const query = 'INSERT INTO todo_tags (todo_id, tag_id) VALUES (?, ?)';
    await pool.execute(query, [todoId, tagId]);
  }

  static async removeFromTodo(todoId: number, tagId: number): Promise<void> {
    const query = 'DELETE FROM todo_tags WHERE todo_id = ? AND tag_id = ?';
    await pool.execute(query, [todoId, tagId]);
  }

  static async getTodoTags(todoId: number): Promise<Tag[]> {
    const query = `
      SELECT t.* FROM tags t
      JOIN todo_tags tt ON t.id = tt.tag_id
      WHERE tt.todo_id = ?
    `;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [todoId]);
    return rows as Tag[];
  }
}
