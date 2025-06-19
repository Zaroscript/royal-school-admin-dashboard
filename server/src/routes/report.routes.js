import express from 'express';
import { authMiddleware, requireRole } from '../middleware/auth.middleware.js';
import { 
  generateAttendanceReport,
  generateGradeReport,
  generateFinanceReport,
  generateStudentReport,
  generateTeacherReport,
  generateExamReport,
  generateGeneralReport
} from '../controllers/report.controller.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Report routes - admin and moderator only
router.get('/attendance', requireRole(['admin', 'moderator']), generateAttendanceReport);
router.get('/grades', requireRole(['admin', 'moderator']), generateGradeReport);
router.get('/finance', requireRole(['admin', 'moderator']), generateFinanceReport);
router.get('/students', requireRole(['admin', 'moderator']), generateStudentReport);
router.get('/teachers', requireRole(['admin', 'moderator']), generateTeacherReport);
router.get('/exams', requireRole(['admin', 'moderator']), generateExamReport);
router.get('/general', requireRole(['admin', 'moderator']), generateGeneralReport);

export default router; 