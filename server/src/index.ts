import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { testConnection } from './config/database';
import { errorHandler } from './middleware/errorHandler';
import todosRouter from './routes/todos';
import tagsRouter from './routes/tags';
import categoriesRouter from './routes/categories';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/todos', todosRouter);
app.use('/api/tags', tagsRouter);
app.use('/api/categories', categoriesRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.use(errorHandler);

async function startServer() {
  try {
    await testConnection();
    app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
      console.log('✓ Use /api/todos, /api/tags, /api/categories endpoints');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
