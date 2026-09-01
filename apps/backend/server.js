import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.route.js';
import todoRoutes from './routes/todo.route.js';
import cors from 'cors';
import logger from './utils/logger.js';
import errorHandler from './middleware/error.middleware.js';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
//app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('API Todo App is running smoothly! 🚀');
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: 'Connected 🍃',
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  logger.info(`Server is running on port ${PORT}`);
});