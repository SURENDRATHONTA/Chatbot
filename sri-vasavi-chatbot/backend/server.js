import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import { connectDatabase, isMongoConnected } from './config/db.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import infoRoutes from './routes/infoRoutes.js';

dotenv.config({ path: fileURLToPath(new URL('./services/.env', import.meta.url)) });

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(cors({ origin: ['http://localhost:3000', 'http://127.0.0.1:3000'] }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'ok', database: isMongoConnected ? 'connected' : 'offline' });
});
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/info', infoRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API endpoint not found.' });
});

app.use((error, req, res, next) => {
  console.error(`[API] ${error.message}`);
  if (res.headersSent) return next(error);
  res.status(error.status || 500).json({
    success: false,
    message: error.status && error.status < 500 ? error.message : 'An unexpected server error occurred.'
  });
});

const server = app.listen(port, () => {
  console.log(`[Server] Sri Vasavi chatbot API listening on port ${port}.`);
  connectDatabase().then(async (connected) => {
    if (!connected) return;
    const { seedDatabase } = await import('./services/seedData.js');
    await seedDatabase();
  }).catch((error) => {
    console.error(`[Database] Startup failed: ${error.message}`);
  });
});

const shutdown = async () => {
  server.close(async () => {
    const mongoose = await import('mongoose');
    await mongoose.default.disconnect();
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
