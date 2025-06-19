import express from 'express';
import { 
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getTeacherProfile,
  getTeacherCourses,
  uploadTeacherPhoto
} from '../controllers/teacher.controller.js';
import { authMiddleware, moderatorMiddleware } from '../middleware/auth.middleware.js';
import upload from '../middleware/upload.middleware.js';

const router = express.Router();

// Protected routes - require authentication
router.use(authMiddleware);

// Teacher management routes
router.get('/', moderatorMiddleware, getAllTeachers);
router.get('/:id', moderatorMiddleware, getTeacherById);
router.post('/', moderatorMiddleware, createTeacher);
router.put('/:id', moderatorMiddleware, updateTeacher);
router.delete('/:id', moderatorMiddleware, deleteTeacher);

// Teacher profile and related data
router.get('/:id/profile', moderatorMiddleware, getTeacherProfile);
router.get('/:id/courses', moderatorMiddleware, getTeacherCourses);

// File upload
router.post('/:id/photo', moderatorMiddleware, upload.single('photo'), uploadTeacherPhoto);

export default router; 