import express from 'express';
import {
  getAdminStats, createCategoryItem, updateCategoryItem, deleteCategoryItem
} from '../controllers/adminController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protectAdmin); // All admin routes require JWT authorization

router.get('/stats', getAdminStats);
router.post('/manage/:category', createCategoryItem);
router.put('/manage/:category/:id', updateCategoryItem);
router.delete('/manage/:category/:id', deleteCategoryItem);

export default router;
