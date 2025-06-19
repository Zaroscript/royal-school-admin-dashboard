import express from 'express';
import { 
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentProfile,
  getStudentAttendance,
  getStudentGrades,
  getStudentCourses,
  uploadStudentPhoto,
  forceDeleteStudent
} from '../controllers/student.controller.js';
import { authMiddleware, moderatorMiddleware } from '../middleware/auth.middleware.js';
import upload from '../middleware/upload.middleware.js';

const router = express.Router();

// Protected routes - require authentication
router.use(authMiddleware);

// Student management routes
router.get('/', moderatorMiddleware, getAllStudents);
router.get('/:id', moderatorMiddleware, getStudentById);
router.post('/', moderatorMiddleware, createStudent);
router.put('/:id', moderatorMiddleware, updateStudent);
router.delete('/:id', moderatorMiddleware, deleteStudent);
router.delete('/:id/force', moderatorMiddleware, forceDeleteStudent);

// Student profile and related data
router.get('/:id/profile', moderatorMiddleware, getStudentProfile);
router.get('/:id/attendance', moderatorMiddleware, getStudentAttendance);
router.get('/:id/grades', moderatorMiddleware, getStudentGrades);
router.get('/:id/courses', moderatorMiddleware, getStudentCourses);

// File upload
router.post('/:id/photo', moderatorMiddleware, upload.single('photo'), uploadStudentPhoto);

export default router; 