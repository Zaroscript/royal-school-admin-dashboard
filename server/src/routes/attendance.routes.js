import express from 'express';
import { 
  getAllAttendance,
  getAttendanceById,
  createAttendance,
  updateAttendance,
  deleteAttendance,
  getAttendanceByDate,
  getAttendanceByStudent,
  getAttendanceByCourse
} from '../controllers/attendance.controller.js';
import { authMiddleware, moderatorMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

// Protected routes - require authentication
router.use(authMiddleware);

// Attendance management routes
router.get('/', moderatorMiddleware, getAllAttendance);
router.get('/:id', moderatorMiddleware, getAttendanceById);
router.post('/', moderatorMiddleware, createAttendance);
router.put('/:id', moderatorMiddleware, updateAttendance);
router.delete('/:id', moderatorMiddleware, deleteAttendance);

// Attendance queries
router.get('/date/:date', moderatorMiddleware, getAttendanceByDate);
router.get('/student/:studentId', moderatorMiddleware, getAttendanceByStudent);
router.get('/course/:courseId', moderatorMiddleware, getAttendanceByCourse);

export default router; 