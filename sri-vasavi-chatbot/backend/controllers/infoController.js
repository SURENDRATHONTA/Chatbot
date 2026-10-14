import { isMongoConnected } from '../config/db.js';
import { knowledgeModels } from '../models/index.js';
import { getMemoryCollection } from '../services/memoryStore.js';

const sendCollection = (name) => async (req, res, next) => {
  try {
    const Model = knowledgeModels[name];
    const data = isMongoConnected
      ? await Model.find({}).sort({ createdAt: -1 }).lean()
      : getMemoryCollection(name);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getCollegeOverview = sendCollection('collegeInfo');
export const getDepartments = sendCollection('departments');
export const getCourses = sendCollection('courses');
export const getFaculty = sendCollection('faculty');
export const getAdmissions = sendCollection('admissions');
export const getPlacements = sendCollection('placements');
export const getFacilities = sendCollection('facilities');
export const getScholarships = sendCollection('scholarships');
export const getNotifications = sendCollection('notifications');
export const getFAQs = sendCollection('faqs');
