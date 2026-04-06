import { pool } from './config/database';
import dotenv from 'dotenv';

dotenv.config();

async function seedDatabase() {
  try {
    const connection = await pool.getConnection();

    console.log('Seeding database with sample data...');

    await connection.execute(`
      INSERT INTO todos (title, description, status, priority, due_date, category)
      VALUES
        ('Design new dashboard', 'Create a modern UI for the dashboard', 'pending', 'high', DATE_ADD(NOW(), INTERVAL 3 DAY), 'Design'),
        ('Review project proposal', 'Go through the Q1 project proposal', 'completed', 'high', DATE_ADD(NOW(), INTERVAL -1 DAY), 'Work'),
        ('Update documentation', 'Update API documentation for v2', 'pending', 'medium', DATE_ADD(NOW(), INTERVAL 7 DAY), 'Documentation'),
        ('Fix login bug', 'Users unable to login with special characters', 'pending', 'high', DATE_ADD(NOW(), INTERVAL 1 DAY), 'Bug Fixes'),
        ('Schedule team meeting', 'Arrange weekly standup meeting', 'pending', 'low', DATE_ADD(NOW(), INTERVAL 2 DAY), 'Meetings'),
        ('Refactor authentication service', 'Improve code quality and performance', 'in progress', 'medium', DATE_ADD(NOW(), INTERVAL 5 DAY), 'Development'),
        ('Buy groceries', 'Milk, eggs, bread, vegetables', 'pending', 'medium', DATE_ADD(NOW(), INTERVAL 0 DAY), 'Personal'),
        ('Call dentist', 'Schedule appointment for next month', 'pending', 'low', DATE_ADD(NOW(), INTERVAL 10 DAY), 'Health'),
        ('Write blog post', 'Article on modern web development practices', 'pending', 'medium', DATE_ADD(NOW(), INTERVAL 4 DAY), 'Writing')
    `);

    await connection.execute(`
      INSERT INTO categories (name, color)
      VALUES
        ('Work', '#3B82F6'),
        ('Personal', '#10B981'),
        ('Design', '#8B5CF6'),
        ('Development', '#F59E0B'),
        ('Documentation', '#EF4444'),
        ('Bug Fixes', '#DC2626'),
        ('Meetings', '#6366F1'),
        ('Health', '#EC4899'),
        ('Writing', '#14B8A6')
    `);

    await connection.execute(`
      INSERT INTO tags (name)
      VALUES
        ('urgent'),
        ('important'),
        ('review'),
        ('frontend'),
        ('backend'),
        ('database'),
        ('testing'),
        ('deployment'),
        ('brainstorm')
    `);

    connection.release();
    console.log('✓ Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
