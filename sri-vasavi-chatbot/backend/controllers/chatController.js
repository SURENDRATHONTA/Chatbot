import { isMongoConnected } from '../config/db.js';
import { ChatLog } from '../models/index.js';
import { memoryChatLogs } from '../services/memoryStore.js';
import { processUserQuery } from '../services/nlpEngine.js';

export const askQuestion = async (req, res, next) => {
  try {
    const { question, sessionId = '' } = req.body;
    if (typeof question !== 'string' || question.trim().length === 0 || question.length > 2000) {
      return res.status(400).json({ success: false, message: 'Enter a question of 1 to 2000 characters.' });
    }

    const result = await processUserQuery(question.trim());
    const log = {
      question: question.trim(),
      answer: result.answer,
      category: result.category,
      found: result.found,
      sessionId: typeof sessionId === 'string' ? sessionId.slice(0, 100) : '',
      createdAt: new Date()
    };

    if (isMongoConnected) {
      await ChatLog.create(log);
    } else {
      memoryChatLogs.push(log);
    }

    res.json({ success: true, ...result, timestamp: log.createdAt });
  } catch (error) {
    next(error);
  }
};

export const getChatLogs = async (req, res, next) => {
  try {
    const logs = isMongoConnected
      ? await ChatLog.find({}).sort({ createdAt: -1 }).limit(500).lean()
      : memoryChatLogs.slice(-500).reverse();
    res.json({ success: true, data: logs });
  } catch (error) {
    next(error);
  }
};
