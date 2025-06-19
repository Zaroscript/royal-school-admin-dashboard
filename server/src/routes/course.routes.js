import express from 'express';
import { 
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseStudents,
  addStudentToCourse,
  removeStudentFromCourse
} from '../controllers/course.controller.js';
import { authMiddleware, moderatorMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

// Protected routes - require authentication
router.use(authMiddleware);

// Course management routes
router.get('/', moderatorMiddleware, getAllCourses);
router.get('/:id', moderatorMiddleware, getCourseById);
router.post('/', moderatorMiddleware, createCourse);
router.put('/:id', moderatorMiddleware, updateCourse);
router.delete('/:id', moderatorMiddleware, deleteCourse);

// Course student management
router.get('/:id/students', moderatorMiddleware, getCourseStudents);
router.post('/:id/students', moderatorMiddleware, addStudentToCourse);
router.delete('/:id/students/:studentId', moderatorMiddleware, removeStudentFromCourse);

export default router; 