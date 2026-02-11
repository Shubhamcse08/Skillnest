import express from 'express';
import {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  getEnrolledCourses
} from '../controllers/course.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';

const router = express.Router();

// Public routes
router.get('/all', getAllCourses);
router.get('/:id', getCourse);

// Protected routes
router.get('/enrolled/my-courses', authMiddleware, getEnrolledCourses);
router.post('/:courseId/enroll', authMiddleware, enrollInCourse);

// Admin routes
router.post('/', authMiddleware, adminMiddleware, createCourse);
router.put('/:id', authMiddleware, adminMiddleware, updateCourse);
router.delete('/:id', authMiddleware, adminMiddleware, deleteCourse);

export default router;