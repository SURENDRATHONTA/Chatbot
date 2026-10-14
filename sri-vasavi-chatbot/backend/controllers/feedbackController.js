import { isMongoConnected } from '../config/db.js';
import { Feedback } from '../models/index.js';
import { memoryFeedback } from '../services/memoryStore.js';

export const submitFeedback = async (req, res, next) => {
  try {
    const { question, response, isHelpful } = req.body;
    if (typeof question !== 'string' || typeof response !== 'string' || typeof isHelpful !== 'boolean') {
      return res.status(400).json({ success: false, message: 'Question, response, and helpfulness rating are required.' });
    }

    const feedback = {
      question: question.slice(0, 2000),
      response: response.slice(0, 10000),
      isHelpful,
      createdAt: new Date()
    };
    const saved = isMongoConnected ? await Feedback.create(feedback) : feedback;
    if (!isMongoConnected) memoryFeedback.push(saved);
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    next(error);
  }
};

export const getFeedbackList = async (req, res, next) => {
  try {
    const feedback = isMongoConnected
      ? await Feedback.find({}).sort({ createdAt: -1 }).limit(500).lean()
      : memoryFeedback.slice(-500).reverse();
    res.json({ success: true, data: feedback });
  } catch (error) {
    next(error);
  }
};
