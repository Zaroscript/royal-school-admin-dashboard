import express from 'express';
import { authMiddleware, requireRole } from '../middleware/auth.middleware.js';
import { 
  createExam, 
  getAllExams, 
  getExamById, 
  updateExam, 
  deleteExam,
  getExamsByCourse,
  getExamsByTeacher
} from '../controllers/exam.controller.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Exam routes
router.post('/', requireRole(['admin', 'moderator']), createExam);
router.get('/', getAllExams);
router.get('/course/:courseId', getExamsByCourse);
router.get('/teacher/:teacherId', getExamsByTeacher);
router.get('/:id', getExamById);
router.put('/:id', requireRole(['admin', 'moderator']), updateExam);
router.delete('/:id', requireRole(['admin']), deleteExam);

export default router; 