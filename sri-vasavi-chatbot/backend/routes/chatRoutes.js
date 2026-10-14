import express from 'express';
import { askQuestion, getChatLogs } from '../controllers/chatController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/ask', askQuestion);
router.get('/logs', protectAdmin, getChatLogs);

export default router;
