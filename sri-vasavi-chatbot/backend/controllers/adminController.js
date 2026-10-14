import mongoose from 'mongoose';
import { isMongoConnected } from '../config/db.js';
import { adminModels, ChatLog, Feedback } from '../models/index.js';
import {
  addMemoryRecord, memoryChatLogs, memoryFeedback,
  removeMemoryRecord, updateMemoryRecord, getMemoryCollection
} from '../services/memoryStore.js';

const getModel = (category) => adminModels[category];

export const getAdminStats = async (req, res, next) => {
  try {
    let totalQueries;
    let totalDepartments;
    let totalCourses;
    let feedback;
    if (isMongoConnected) {
      [totalQueries, totalDepartments, totalCourses, feedback] = await Promise.all([
        ChatLog.countDocuments(),
        adminModels.department.countDocuments(),
        adminModels.course.countDocuments(),
        Feedback.find({}).select('isHelpful').lean()
      ]);
    } else {
      totalQueries = memoryChatLogs.length;
      totalDepartments = getMemoryCollection('departments').length;
      totalCourses = getMemoryCollection('courses').length;
      feedback = memoryFeedback;
    }
    const satisfactionRate = feedback.length
      ? Math.round((feedback.filter(item => item.isHelpful).length / feedback.length) * 100)
      : 0;
    res.json({
      success: true,
      stats: { totalQueries, totalDepartments, totalCourses, satisfactionRate }
    });
  } catch (error) {
    next(error);
  }
};

export const createCategoryItem = async (req, res, next) => {
  try {
    const Model = getModel(req.params.category);
    if (!Model) {
      return res.status(400).json({ success: false, message: 'Unsupported category.' });
    }
    if (!req.body || !Object.keys(req.body).length) {
      return res.status(400).json({ success: false, message: 'Provide record fields to create.' });
    }
    const record = isMongoConnected
      ? await Model.create(req.body)
      : addMemoryRecord(req.params.category === 'department' ? 'departments'
        : req.params.category === 'course' ? 'courses'
          : req.params.category === 'notification' ? 'notifications' : 'faqs', req.body);
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

export const updateCategoryItem = async (req, res, next) => {
  try {
    const Model = getModel(req.params.category);
    if (!Model) return res.status(400).json({ success: false, message: 'Unsupported category.' });
    if (isMongoConnected && !mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid record ID.' });
    }
    const record = isMongoConnected
      ? await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      : updateMemoryRecord(categoryCollection(req.params.category), req.params.id, req.body);
    if (!record) return res.status(404).json({ success: false, message: 'Record not found.' });
    res.json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

export const deleteCategoryItem = async (req, res, next) => {
  try {
    const Model = getModel(req.params.category);
    if (!Model) return res.status(400).json({ success: false, message: 'Unsupported category.' });
    if (isMongoConnected && !mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid record ID.' });
    }
    const deleted = isMongoConnected
      ? await Model.findByIdAndDelete(req.params.id)
      : removeMemoryRecord(categoryCollection(req.params.category), req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Record not found.' });
    res.json({ success: true, message: 'Record deleted.' });
  } catch (error) {
    next(error);
  }
};

function categoryCollection(category) {
  return {
    department: 'departments',
    course: 'courses',
    notification: 'notifications',
    faq: 'faqs'
  }[category];
}
