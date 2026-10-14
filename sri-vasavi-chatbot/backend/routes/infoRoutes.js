import express from 'express';
import {
  getCollegeOverview, getDepartments, getCourses, getFaculty,
  getAdmissions, getPlacements, getFacilities, getScholarships,
  getNotifications, getFAQs
} from '../controllers/infoController.js';

const router = express.Router();

router.get('/overview', getCollegeOverview);
router.get('/departments', getDepartments);
router.get('/courses', getCourses);
router.get('/faculty', getFaculty);
router.get('/admissions', getAdmissions);
router.get('/placements', getPlacements);
router.get('/facilities', getFacilities);
router.get('/scholarships', getScholarships);
router.get('/notifications', getNotifications);
router.get('/faqs', getFAQs);

export default router;
