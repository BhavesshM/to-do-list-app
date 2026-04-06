import { pool } from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export interface Category {
  id?: number;
  name: string;
  color?: string;
  created_at?: string;
}

export class CategoryModel {
  static async create(name: string, color: string = '#3B82F6'): Promise<number> {
    const query = 'INSERT INTO categories (name, color) VALUES (?, ?)';
    const [result] = await pool.execute<ResultSetHeader>(query, [name, color]);
    return result.insertId;
  }

  static async getAll(): Promise<Category[]> {
    const query = 'SELECT * FROM categories ORDER BY name ASC';
    const [rows] = await pool.execute<RowDataPacket[]>(query);
    return rows as Category[];
  }

  static async getById(id: number): Promise<Category | null> {
    const query = 'SELECT * FROM categories WHERE id = ?';
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
    return (rows[0] as Category) || null;
  }

  static async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM categories WHERE id = ?';
    const [result] = await pool.execute<ResultSetHeader>(query, [id]);
    return result.affectedRows > 0;
  }
}
