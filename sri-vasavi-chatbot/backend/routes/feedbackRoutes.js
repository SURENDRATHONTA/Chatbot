import express from 'express';
import { submitFeedback, getFeedbackList } from '../controllers/feedbackController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/submit', submitFeedback);
router.get('/list', protectAdmin, getFeedbackList);

export default router;
